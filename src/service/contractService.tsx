import contractABI from "../abi/PollingSys.json";
import {
  BrowserProvider,
  Contract,
  JsonRpcSigner,
  ContractRunner,
} from "ethers";
import { ListResultsResponseSm } from "../typeObject";

let provider: BrowserProvider;
let signer: JsonRpcSigner | ContractRunner | null | undefined;
let contract: Contract;
const CONTRACT_ADDRESS = '0xC213bbcca3dDebD9409C53204A253b61E3482945'

// Function to initialize the provider, signer, and contract
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

// Function to request a single account
// export const requestAccount = async (): Promise<string | null> => {
//   try {
//     const accounts = await provider.send("eth_requestAccounts", []);
//     return accounts[0]; // Return the first account
//   } catch (error) {
//     console.error("Error requesting account:", error);
//     return null;
//   }
// };

// Function to check ETH balance
// export const checkEthBalance = async (): Promise<boolean> => {
//   if (!signer) {
//     console.error("Signer not initialized. Please connect MetaMask.");
//     return false;
//   }
//   const address = await signer.getAddress();
//   const balance = await provider.getBalance(address);
//   const ethBalance = parseFloat(formatEther(balance));

//   if (ethBalance < 0.01) { // Minimum ETH balance threshold
//     console.error("Not enough ETH balance. At least 0.01 ETH is required.");
//     return false;
//   }
//   return true;
// };

// Function to create a poll
// export const createPollSm = async (title: string): Promise<number | undefined> => {
//     if (!contract) return;
  
//     try {
//       // Gửi giao dịch tạo poll
//       const tx = await contract.createPoll(title);
//       console.log(`Transaction sent: ${tx.hash}`);
      
//       // Chờ giao dịch hoàn tất
//       const receipt = await tx.wait();
//       console.log("Transaction mined:", receipt);
  
//       // Tìm sự kiện PollCreated trong log giao dịch
//       const event = receipt.logs
//         .map((log: { topics: ReadonlyArray<string>; data: string; }) => contract.interface.parseLog(log))
//         .find((parsedLog: { name: string; }) => parsedLog.name === "PollCreated");
        
//     const parsedLogs = receipt.logs.map((log: { topics: ReadonlyArray<string>; data: string; }) => {
//             try {
//               return contract.interface.parseLog(log);
//             } catch (err) {
//               console.error("Error parsing log:", log, err);
//               return null;
//             }
//           });
//     console.log("Parsed logs:", parsedLogs);
//       if (event) {
//         const pollId = event.args?.pollId;
//         console.log("Poll created with ID:", pollId);
//         return pollId;
//       } else {
//         console.error("PollCreated event not found in transaction logs");
//         return undefined;
//       }
//     } catch (error) {
//       console.error("Error creating poll:", error);
//       return undefined;
//     }
//   };
  

// // Function to add options to a poll
// export const addOptionToPoll = async (pollId: number, optionName: string): Promise<void> => {
//   if (!contract) return;
//   try {
//     // const hasBalance = await checkEthBalance();
//     // if (!hasBalance) return;

//     const tx = await contract.addOptionsToPoll(pollId, optionName);
//     await tx.wait();
//     console.log(`Option '${optionName}' added to poll ${pollId}`);
//   } catch (error) {
//     console.error("Error adding option to poll:", error);
//   }
// };
// Function to create a poll and add options
export const createPollWithOptions = async (
    title: string,
    options: { contentOption: string }[]
  ): Promise<number | undefined> => {
    if (!contract) return;
  
    try {
      // Gửi giao dịch tạo poll
      const tx = await contract.createPoll(title);
      console.log(`Transaction sent: ${tx.hash}`);
  
      // Chờ giao dịch hoàn tất
      const receipt = await tx.wait();
      console.log("Transaction mined:", receipt);
  
      // Tìm sự kiện PollCreated trong log giao dịch
      const event = receipt.logs
        .map((log: { topics: ReadonlyArray<string>; data: string; }) => contract.interface.parseLog(log))
        .find((parsedLog: { name: string; }) => parsedLog.name === "PollCreated");
        
        const parsedLogs = receipt.logs.map((log: { topics: ReadonlyArray<string>; data: string; }) => {
            try {
              return contract.interface.parseLog(log);
            } catch (err) {
              console.error("Error parsing log:", log, err);
              return null;
            }
          });
        console.log("Parsed logs:", parsedLogs);
  
      if (event) {
        const pollId = event.args?.pollId;
        console.log("Poll created with ID:", pollId);
  
        // Thêm từng option vào poll
       // Thêm từng option vào poll
for (const option of options) {
    try {
      const optionTx = await contract.addOptionsToPoll(pollId, option.contentOption); // Sửa từ `optionName` thành `option.contentOption`
      await optionTx.wait();
      console.log(`Option '${option.contentOption}' added to poll ${pollId}`);
    } catch (error) {
      console.error(`Error adding option '${option.contentOption}' to poll:`, error);
    }
  }
  
  
        return pollId; // Trả về ID của poll sau khi thêm option
      } else {
        console.error("PollCreated event not found in transaction logs");
        return undefined;
      }
    } catch (error) {
      console.error("Error creating poll:", error);
      return undefined;
    }
  };
  
// Function to vote for an option in a poll
export const voteSmartcontract = async (pollId: number, optionId: number): Promise<void> => {
  if (!contract) return;
  try {
    // const hasBalance = await checkEthBalance();
    // if (!hasBalance) return;

    const tx = await contract.vote(pollId, optionId);
    await tx.wait();
    console.log(`Voted for option ${optionId} in poll ${pollId}`);
  } catch (error) {
    console.error("Error voting in poll:", error);
  }
};

// Function to get poll results
export const getPollResult = async (
    pollId: number
  ): Promise<ListResultsResponseSm[] | null> => {
    if (!contract) return null;
  
    try {
      const result = await contract.getPollResult(pollId);
  
      // Kết hợp optionIds và voteCounts thành mảng các object theo interface
      const combinedResults: ListResultsResponseSm[] = result.optionIds.map(
        (id: string, index: number) => ({
          optionIds: Number(id), // chuyển đổi thành số
          voteCounts: Number(result.voteCounts[index]), // chuyển đổi thành số
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
    // const hasBalance = await checkEthBalance();
    // if (!hasBalance) return;

    const tx = await contract.changePollState(pollId, newState);
    await tx.wait();
    console.log(`Poll ${pollId} state changed to ${newState}`);
  } catch (error) {
    console.error("Error changing poll state:", error);
  }
};
