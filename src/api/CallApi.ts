import axios from "axios";
import {
  ListTheNewResponse,
  TheNew,
  UserUpdate,
  CreateTheNew,
  UserResponse,
  TheNewResponse,
  ListVotePollidResponse,
  UserCreate,
  VoteResultResponse,
  ListResultsResponse,
  CheckPrivateResponse,
  ResultCheckVoteSm,
} from "../typeObject"; // Nhập các định nghĩa từ tệp chung
import { ListVoteResponse } from "../typeObject";
import { VoteResponse } from "../typeObject";
import { PollCreate } from "../typeObject";
import { Vote } from "../typeObject";
import { PollResponse } from "../typeObject";
import Cookies from "universal-cookie";

// const API_USER = "http://localhost:3000/api/user";
// const API_VOTE = "http://localhost:3000/api/vote";
// const API_POLL = "http://localhost:3000/api/poll";
// const API_SSO = "http://localhost:3000/api/auth";
// const API_TheNew = "http://localhost:3000/api/theNew";
// const API_UPLOAD = "http://localhost:3000/api/upload";
// const API_PRIVATE = "http://localhost:3000/api/private";
// const API_AI = "http://localhost:3000/api/ai";

const API_USER = "https://api-1.pollweb.io.vn/api/user";
const API_VOTE = "https://api-1.pollweb.io.vn/api/vote";
const API_POLL = "https://api-1.pollweb.io.vn/api/poll";
const API_SSO = "https://api-1.pollweb.io.vn/api/auth";
const API_TheNew = "https://api-1.pollweb.io.vn/api/theNew";
const API_UPLOAD = "https://api-1.pollweb.io.vn/api/upload";
const API_AI = "https://api-1.pollweb.io.vn/api/ai";
const API_PRIVATE = "https://api-1.pollweb.io.vn/api/private";

// kiểm tra xem ví có vote chưa

// hàm thêm pollid vào listVote
export const addPollIdToListVote = async (data: {
  pollId: string;
  id: string;
}): Promise<boolean> => {
  try {
    const response = await axios.post(`${API_USER}/add_pollid_to_listvote`, data);
    return response.status === 200;
  } catch (error) {
    console.error("Error addPollIdToListVote:", error);
    return false;
  }
};


// hàm kiểm tra vote private
export const checkVotePrivate = async (data: Vote): Promise<CheckPrivateResponse> => {
  const response = await axios.post(`${API_VOTE}/check_vote_private`, data);
  return response.data;
};

export const checkVoteAddress = async (data: {
  pollId: number;
  voter: string;
}): Promise<ResultCheckVoteSm> => {
  console.log("data checkVoteAddress:", data);
  const response = await axios.get(`${API_PRIVATE}/checkVoted`,  { data });
  return response.data;
};

// hàm logout 

export const logout = async (id:string): Promise<boolean> => {
  try {
    const response = await axios.post(`${API_USER}/logout`, { id });
    return response.status === 200;
  } catch (error) {
    console.error("Error logout:", error);
    return false;
  }
};

// lấy thông tin cuộc bình chọn qua blockchain
export const getPollResultsBlockChain = async ( pollId: string): Promise<ListResultsResponse> => {
  const response = await axios.get(`${API_PRIVATE}/getPollResult/${pollId}`);
  return response.data;
}

// Hàm cập nhật tài khoản người dùng
export const updateUser = async (data: UserUpdate): Promise<UserResponse> => {

    const response = await axios.put(`${API_USER}/update_user`, data); // Sử dụng PUT
    return response.data; // Trả về dữ liệu từ backend
  
};
// Hàm reset mật khẩu
export const resetPassword = async (data: UserCreate): Promise<boolean> => {
  try {
    const response = await axios.put(`${API_USER}/resetPassword`, data);
    return response.status === 200;
  } catch (error) {
    console.error("Error reset password:", error);
    return false;
  }
};
// xoá poll 
export const deletePoll = async (id: string): Promise<boolean> => {
  try {
    const response = await axios.post(`${API_POLL}/delete_poll`, { id });
    console.log("API response:", response.status); // In mã trạng thái API ra console
    return response.status === 200;
  } catch (error) {
    console.error("Error deleting the document:", error);
    return false;
  }
};


// Hàm gửi OTP cho backend để xác minh
export const verifyOtp = async (email: string, otp: string): Promise<boolean> => {
  try {
    const response = await axios.post(`${API_USER}/verifyOTP`, { email, otp });

    if (response.data.success) {
      return true; // OTP verified successfully
    } else {
      return false; // OTP is invalid
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Lỗi trả về từ server
        if (error.response.status === 400) {
          // Nếu lỗi là 400 (OTP không hợp lệ), thông
          // báo cho người dùng
          throw new Error("Mã OTP không hợp lệ. Vui lòng thử lại.");
        }
        // Các lỗi khác
        throw new Error(error.response.data.message || "Có lỗi xảy ra.");
      } else if (error.request) {
        // Nếu không nhận được phản hồi từ server
        throw new Error(
          "Không nhận được phản hồi từ server. Vui lòng thử lại."
        );
      }
    }
    throw new Error('Lỗi không xác định.');
  }
};

export const forgotPassword = async (email: string): Promise<boolean> => {
  try {
    const response = await axios.post(`${API_USER}/forgotPassword`, { email });
    return response.status === 201;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

export const confirmGmail = async (data: {
  userMail: string;
}): Promise<boolean> => {
  try {
    const response = await axios.post(`${API_USER}/signUpGmail`, data);
    return response.status === 201;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

export const uploadImage = async (data: FormData): Promise<string | null> => {
  try {
    const response = await axios.post(`${API_UPLOAD}/uploadFile`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.fileUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};
export const getAICheckContent = async (text: string): Promise<string> => {
  const response = await axios.post(`${API_AI}/check_content_ai`, { text });
  return response.data.sentiment;
};

// Hàm đăng ký người dùng
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const registerUser = async (data: UserCreate): Promise<any> => {
  try {
    const response = await axios.post(`${API_USER}/signup`, data);
    return response; // Trả về toàn bộ response từ API
  } catch (error) {
    // Kiểm tra lỗi nếu có
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Lỗi trả về từ server
        if (error.response.status === 409) {
          // Nếu lỗi là 409 (email đã tồn tại), thông báo cho người dùng
          throw new Error("Email đã tồn tại. Vui lòng sử dụng email khác.");
        }
        // Các lỗi khác
        throw new Error(error.response.data.message || "Có lỗi xảy ra.");
      } else if (error.request) {
        // Nếu không nhận được phản hồi từ server
        throw new Error(
          "Không nhận được phản hồi từ server. Vui lòng thử lại."
        );
      } else {
        // Lỗi khác liên quan đến việc thiết lập yêu cầu
        throw new Error(`Lỗi: ${error.message}`);
      }
    }
    throw new Error("Lỗi không xác định.");
  }
};

// Hàm đăng nhập người dùng
export const loginUser = async (data: {
  email: string;
  password: string;
}): Promise<UserResponse> => {
  const response = await axios.post(`${API_USER}/login`, data);
  return response.data;
};


// Hàm tạo poll
export const createPrivatePoll = async (data: {
  title: string;
  author: string;
  options: {
    contentOption: string;
  }[];
}): Promise<string | null> => {
  // Trả về kiểu string hoặc null
  try {
    // Gửi request tạo poll
    const response = await axios.post(`${API_PRIVATE}/createPoll`, data);
    const pollId =
      response?.data?.transaction?.events?.PollCreated?.returnValues?.pollId;

    if (!pollId) {
      console.error("Poll ID not found in the response.");
      return null; // Trả về null nếu không tìm thấy pollId
    }

    // Kiểm tra nếu tạo poll thành công
    if (response.status === 200) {
      // Thêm từng option vào poll
      for (const option of data.options) {
        const resOption = await axios.post(`${API_PRIVATE}/addOption`, {
          pollId,
          name: option.contentOption,
          author: data.author,
        });

        if (resOption.status !== 200) {
          console.error("Error adding option:", option, resOption.data);
          return null; // Dừng và trả về null nếu có lỗi khi thêm option
        }
      }
      return pollId; // Trả về pollId nếu tạo poll và thêm option thành công
    } else {
      console.error("Failed to create poll or invalid response structure.");
      return null; // Trả về null nếu tạo poll không thành công
    }
  } catch (error) {
    console.error("Error during poll creation:", error);
    return null; // Trả về null nếu có lỗi xảy ra
  }
};
// đổi trang thái của sm
export const changeState = async ({
  pollIdSm,
  newState,
  author,
}: {
  pollIdSm: number;
  newState: number;
  author: string;
}): Promise<boolean> => {
  try {
    // Sử dụng pollIdSm trong URL thay vì id
    const response = await axios.post(
      `${API_PRIVATE}/poll/${pollIdSm}/change-state`,
      { newState, author }
    );
    // Nếu trạng thái là 200 (thành công), trả về `true`
    return response.status === 200;
  } catch (error) {
    console.error("Error changing state:", error);
    return false; // Trả về `false` nếu có lỗi
  }
};

// export const votePrivatePoll = async (data: { title: string; author: string }): Promise<boolean> => {
//   try {
//     const response = await axios.post(`${API_PRIVATE}/createPoll`, data);
//     return response.status === 200;
//   } catch (error) {
//    console.error("Error deleting the document:", error);
//     return false; // Trả về `false` nếu có lỗi
//   }
// };
// Hàm cập nhật timeend là time now
export const updateTimeEnd = async (id: string): Promise<UserResponse> => {
  const response = await axios.post(`${API_POLL}/update_timeEnd_poll/${id}`);
  return response.data;
};

// lấy ra vote từ userid và pollid
export const getVoteByUserIdAndPollId = async (data: {
  userId: string;
  pollId: string;
}): Promise<VoteResultResponse> => {
  const response = await axios.post(
    `${API_VOTE}/find_vote_byuserid_pollid`,
    data
  );
  return response.data;
};

// Thay đổi kiểu trả về thành `Promise<{ status: string; message: string; data: Vote[] }>`
export const getAllVoteUser = async (
  authorId: string
): Promise<ListVoteResponse> => {
  const response = await axios.get(
    `${API_POLL}/find_all_polling_user/${authorId}`
  );
  return response.data;
};
// get all vote by poll id
export const getAllVoteByPollid = async (
  pollId: string
): Promise<ListVotePollidResponse> => {
  const response = await axios.post(`${API_VOTE}/find_all_vote_bypollid`, {
    pollId, // Gửi pollId trong body
  });
  return response.data;
};
export const getAllVoteByUserid = async (
  userId: string
): Promise<ListVotePollidResponse> => {
  const response = await axios.post(`${API_VOTE}/find_all_vote_byuserid`, {
    userId, // Gửi pollId trong body
  });
  return response.data;
};
export const getAllTheNews = async (): Promise<ListTheNewResponse> => {
  const response = await axios.get(`${API_TheNew}/find_all_the_new`);
  return response.data;
};

// Thay đổi kiểu trả về thành `Promise<{ status: string; message: string; data: Vote[] }>`
export const getAllVotes = async (): Promise<ListVoteResponse> => {
  const response = await axios.get(`${API_POLL}/find_all_polling`);
  return response.data;
};
// hàm trả về một bầu chọn dựa trên id
export const getPollById = async (id: string): Promise<PollResponse> => {
  const response = await axios.get(`${API_POLL}/find_by_id_polling/${id}`);
  return response.data;
};
// tìm bài viết
export const getTheNewById = async (id: string): Promise<TheNewResponse> => {
  const response = await axios.get(`${API_TheNew}/find_the_new_by_id/${id}`);
  return response.data;
};
// xoá bài viết
export const deleteTheNewById = async (id: string): Promise<boolean> => {
  try {
    const response = await axios.post(`${API_TheNew}/delete_the_new/${id}`);
    // Nếu trạng thái là 200 (thành công), trả về `true`
    return response.status === 200;
  } catch (error) {
    console.error("Error deleting the document:", error);
    return false; // Trả về `false` nếu có lỗi
  }
};
// cập nhật bài viết
export const updateTheNew = async (id: string, updatedData: Partial<TheNew>): Promise<TheNew> => {
  const response = await axios.put(`${API_TheNew}/update_the_new/${id}`, updatedData);
  return response.data;
};

// tạo cuộc bình chọn
export const createPoll = async (data: PollCreate): Promise<PollResponse> => {
  const response = await axios.post(`${API_POLL}/create_polling`, data);
  return response.data;
};
export const createTheNew = async (data: CreateTheNew): Promise<TheNew> => {
  const response = await axios.post(`${API_TheNew}/create_the_new`, data);
  return response.data;
};
// lấy thông tin của người tạo bình chọn
export const getInforAuthor = async (id: string): Promise<UserResponse> => {
  const response = await axios.post(`${API_USER}/find_by_id_user`, { id });
  return response.data;
};
// vote
export const postVote = async (data: Vote): Promise<VoteResponse> => {
  const response = await axios.post(`${API_VOTE}/vote`, data);
  return response.data;
};
export const voteSm = async ({
  pollIdSm,
  optionId,
  author,
}: {
  pollIdSm: number;
  optionId: number;
  author: string;
}): Promise<boolean> => {
  try {
    // Sử dụng pollIdSm trong URL thay vì id
    const response = await axios.post(`${API_PRIVATE}/vote/${pollIdSm}`, {
      optionId,
      author,
    });
    // Nếu trạng thái là 200 (thành công), trả về `true`
    return response.status === 200;
  } catch (error) {
    console.error("Error changing state:", error);
    return false; // Trả về `false` nếu có lỗi
  }
};

export const postVotePrivate = async (data: Vote): Promise<VoteResponse> => {
  const response = await axios.post(`${API_VOTE}/vote_private`, data);
  return response.data;
};
// lấy thoogn tin của tất cả người dùng
export const getAllUser = async (): Promise<UserResponse> => {
  const response = await axios.get(`${API_USER}/find_all_user`);
  return response.data;
};
// Đổi trạng thái của người dùng qua id
export const changeStatusUser = async (id: string): Promise<UserResponse> => {
  const response = await axios.post(`${API_USER}/deleted_user`, { id });
  return response.data;
};
// Đổi trạng thái của người dùng qua id
export const changeStatusUserActive = async (
  id: string
): Promise<UserResponse> => {
  const response = await axios.post(`${API_USER}/undeleteUser`, { id });
  return response.data;
};
// Hàm đăng nhập Google
export const loginGoogle = async (
  token: string
): Promise<UserResponse | null> => {
  try {
    // Gửi token đến backend
    const response = await axios.post(`${API_SSO}/google`, { token });

    // Kiểm tra nếu đăng nhập thành công
    if (response.status === 200) {
      console.log("Google login success:", response.data);

      // Lưu JWT token vào cookie
      const cookies = new Cookies();
      cookies.set("token", token, { path: "/", maxAge: 3600, secure: true }); // Token tồn tại trong 1 giờ và thêm 'secure' nếu dùng HTTPS

      // Trả về dữ liệu người dùng
      return response.data;
    } else {
      console.error("Login failed:", response.data.message);
      return null;
    }
  } catch (error) {
    console.error("Google login error:", error);
    return null;
  }
};
