  import axios from 'axios';
  import { UserResponse } from '../typeObject'; // Nhập các định nghĩa từ tệp chung
  import { ListVoteResponse } from '../typeObject';
  import { VoteResponse } from '../typeObject';
  import { PollCreate } from '../typeObject';
  import { Vote } from "../typeObject";
  import { PollResponse } from "../typeObject";
  import Cookies from 'universal-cookie';

  const API_USER = 'http://160.30.44.53:3000/api/user';
  const API_VOTE = 'http://160.30.44.53:3000/api/vote';
  const API_POLL = 'http://160.30.44.53:3000/api/poll';

  const API_SSO = "http://160.30.44.53:3000/api/auth";
  // const API_USER = 'http://13.229.71.25:3000/api/user';
  // const API_VOTE = 'http://13.229.71.25:3000/api/vote';
  // const API_POLL = 'http://13.229.71.25:3000/api/poll';

  // Hàm đăng nhập người dùng
  export const loginUser = async (data: { email: string; password: string }): Promise<UserResponse> => {
    const response = await axios.post(`${API_USER}/login`, data);
    return response.data;
  };
  // Thay đổi kiểu trả về thành `Promise<{ status: string; message: string; data: Vote[] }>`
  export const getAllVoteUser = async (authorId: string): Promise<ListVoteResponse> => {
    const response = await axios.get(`${API_POLL}/find_all_polling_user/${authorId}`);
    return response.data;
  }

  // Thay đổi kiểu trả về thành `Promise<{ status: string; message: string; data: Vote[] }>`
  export const getAllVotes = async (): Promise<ListVoteResponse> => {
    const response = await axios.get(`${API_POLL}/find_all_polling`);
    return response.data;
  }
  // hàm trả về một bầu chọn dựa trên id
  export const getPollById = async (id : string): Promise<PollResponse> => {
    const response = await axios.get(`${API_POLL}/find_by_id_polling/${id}`);
    return response.data;
  }
  // tạo cuộc bình chọn
  export const createPoll = async (data: PollCreate): Promise<PollResponse> => {
    const response = await axios.post(`${API_POLL}/create_polling`, data );
    return response.data;
  }
  // lấy thông tin của người tạo bình chọn
  export const getInforAuthor = async (id: string): Promise<UserResponse> => {
    const response = await axios.post(`${API_USER}/findByIdUser`, { id } );
    return response.data;
  };
  // vote
  export const postVote = async (data: Vote): Promise<VoteResponse> =>{
    const response = await axios.post(`${API_VOTE}/vote`, data );
    return response.data;
  }
  // lấy thoogn tin của tất cả người dùng
  export const getAllUser = async (): Promise<UserResponse> => {
    const response = await axios.get(`${API_USER}/findAllUser`);
    return response.data;
  }
  // Đổi trạng thái của người dùng qua id
  export const changeStatusUser = async (id: string): Promise<UserResponse> => {
    const response = await axios.post(`${API_USER}/deletedUser`, { id });
    return response.data;
  }
  // Đổi trạng thái của người dùng qua id
  export const changeStatusUserActive = async (id: string): Promise<UserResponse> => {
    const response = await axios.post(`${API_USER}/undeleteUser`, { id });
    return response.data;
  }
  // Hàm đăng nhập Google
export const loginGoogle = async (token: string): Promise<UserResponse | null> => {
  try {
    // Gửi token đến backend
    const response = await axios.post(`${API_SSO}/google`, { token });

    // Kiểm tra nếu đăng nhập thành công
    if (response.status === 200)  {
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