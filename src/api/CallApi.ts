import axios from 'axios';
import { UserResponse } from '../typeObject'; // Nhập các định nghĩa từ tệp chung
import { ListVoteResponse } from '../typeObject';
import { VoteResponse } from '../typeObject';
import { PollCreate } from '../typeObject';
import { Vote } from "../typeObject";
import { PollResponse } from "../typeObject";

const API_URL = 'http://localhost:3000/api/user';

// Hàm đăng nhập người dùng
export const loginUser = async (data: { email: string; password: string }): Promise<UserResponse> => {
  const response = await axios.post(`${API_URL}/login`, data);
  return response.data;
};
// Thay đổi kiểu trả về thành `Promise<{ status: string; message: string; data: Vote[] }>`
export const getAllVoteUser = async (authorId: string): Promise<ListVoteResponse> => {
  const response = await axios.get(`${API_URL}/find_all_polling_user/${authorId}`);
  return response.data;
}
// Thay đổi kiểu trả về thành `Promise<{ status: string; message: string; data: Vote[] }>`
export const getAllVotes = async (): Promise<ListVoteResponse> => {
  const response = await axios.get(`${API_URL}/find_all_polling`);
  return response.data;
}
// hàm trả về một bầu chọn dựa trên id
export const getVoteById = async (id : string): Promise<PollResponse> => {
  const response = await axios.get(`${API_URL}/find_by_id_polling/${id}`);
  return response.data;
}
// tạo cuộc bình chọn
export const createPoll = async (data: PollCreate): Promise<PollResponse> => {
  const response = await axios.post(`${API_URL}/create_polling`, data );
  return response.data;
}
// lấy thông tin của người tạo bình chọn
export const getInforAuthor = async (id: string): Promise<UserResponse> => {
  const response = await axios.post(`${API_URL}/findByIdUser`, { id });
  return response.data;
};
// vote
export const postVote = async (data: Vote): Promise<VoteResponse> =>{
  const response = await axios.post(`${API_URL}/vote`, data );
  return response.data;
}