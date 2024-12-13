import contractABI from "../abi/PollingSys.json"; 
import { BrowserProvider, Contract, JsonRpcSigner, ContractRunner } from "ethers";
import { ListResultsResponseSm } from "../typeObject";

let provider: BrowserProvider;
let signer: JsonRpcSigner | ContractRunner | null | undefined;
let contract: Contract;
// const CONTRACT_ADDRESS = '0xC213bbcca3dDebD9409C53204A253b61E3482945' // đang dùng của mình
// const CONTRACT_ADDRESS = '0x9F04e24B3F0eF0Edbe768E3E557A60b8Bfc8fF73' // Mai tạo hồi chiều 12/12
// mới tạo Thái
// const CONTRACT_ADDRESS = '0xFD60f9F233C728Ed0a0Ea50082B7d6995066EBB2'
const CONTRACT_ADDRESS = '0x59B16aF9ED5Bf04BD17Df18ECBaA392172Cc528f'


// Initialize provider, signer, and contract
const initialize = async () => {
  if (typeof window.ethereum !== "undefined") {
    provider = new BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    contract = new Contract(CONTRACT_ADDRESS, contractABI.abi, signer);
  } else {
    console.error("Please install MetaMask!");
  }
};

// Call initialize at the beginning
initialize();

// Function to create a poll and add options
export const createPollWithOptions = async (
  title: string,
  options: { contentOption: string }[]
): Promise<number | undefined> => {
  if (!contract) {
    console.error("Contract is not available");
    return;
  }

  try {
    // Gửi giao dịch tạo poll
    const tx = await contract.create(title);
    console.log(`Transaction sent: ${tx.hash}`);

    // Chờ giao dịch được khai thác
    const receipt = await tx.wait();
    console.log("Transaction mined:", receipt);

    // Kiểm tra nếu giao dịch bị huỷ hoặc thất bại
    if (receipt.status !== 1) {
      console.error("Transaction failed or was cancelled.");
      return undefined;
    }

    // Tìm sự kiện PollCreated trong logs
    const event = receipt.logs
      .map((log: { topics: ReadonlyArray<string>; data: string }) =>
        contract.interface.parseLog(log)
      )
      .find((parsedLog: { name: string }) => parsedLog.name === "PollCreated");

    if (event) {
      const pollId = event.args?.pollId;
      console.log("Poll created with ID:", pollId);

      // Thêm các options vào poll
      for (const option of options) {
        try {
          const optionTx = await contract.add(pollId, option.contentOption);
          await optionTx.wait();
          console.log(`Option '${option.contentOption}' added to poll ${pollId}`);
        } catch (error) {
          console.error(`Error adding option '${option.contentOption}' to poll:`, error);
          // Nếu thêm option thất bại, hủy poll đã tạo
          try {
            await contract.removePoll(pollId);  // Giả sử contract có phương thức này để hủy poll
          } catch (removeError) {
            console.error("Error removing poll:", removeError);
          }
          return undefined; // Trả về undefined nếu có lỗi trong việc thêm options
        }
      }

      return pollId; // Trả về pollId nếu thành công
    } else {
      console.error("PollCreated event not found in transaction logs");
      return undefined;
    }
  } catch (error) {
    console.error("Error creating poll:", error);
    return undefined; // Trả về undefined nếu có lỗi
  }
};


// Function to vote for an option in a poll
export const voteSmartcontract = async (pollId: number, optionId: number): Promise<boolean> => {
  if (!contract) return false;

  try {
    const tx = await contract.vote(pollId, optionId);
    console.log(`Transaction sent: ${tx.hash}`);
    const receipt = await tx.wait();
    console.log("Transaction mined:", receipt);

    if (receipt.status === 0) {
      console.error("Transaction failed with status 0");
      return false; // Giao dịch thất bại
    }
    return true; // Thành công
  } catch (error) {
    console.error("Error in transaction:", error);
    return false; // Lỗi trong giao dịch
  }
};


// Function to get poll results
export const getPollResult = async (
  pollId: number
): Promise<ListResultsResponseSm[] | null> => {
  if (!contract) return null;

  try {
    const result = await contract.getPollResult(pollId);

    // Combine optionIds and voteCounts into an array of objects
    const combinedResults: ListResultsResponseSm[] = result.optionIds.map(
      (id: string, index: number) => ({
        optionIds: Number(id), // Convert to number
        voteCounts: Number(result.voteCounts[index]), // Convert to number
      })
    );

    return combinedResults;
  } catch (error) {
    console.error("Error fetching poll results:", error);
    return null;
  }
};

// Function to get vote count for a specific option
export const getVoteCount = async (pollId: number, optionId: number): Promise<number | null> => {
  if (!contract) return null;

  try {
    const voteCount = await contract.getVoteCount(pollId, optionId);
    return Number(voteCount);
  } catch (error) {
    console.error("Error fetching vote count:", error);
    return null;
  }
};

// Function to get an option by its ID
export const getOptionById = async (pollId: number, optionId: number): Promise<{ id: number; name: string; voteCount: number } | null> => {
  if (!contract) return null;

  try {
    const option = await contract.getOptionById(pollId, optionId);
    return {
      id: Number(option.id),
      name: option.name,
      voteCount: Number(option.voteCount),
    };
  } catch (error) {
    console.error("Error fetching option by ID:", error);
    return null;
  }
};

// Function to change poll state
export const changePollState = async (pollId: number, newState: number): Promise<void> => {
  if (!contract) return;

  try {
    const tx = await contract.state(pollId, newState);
    await tx.wait();
    console.log(`Poll ${pollId} state changed to ${newState}`);
  } catch (error) {
    console.error("Error changing poll state:", error);
  }
};
