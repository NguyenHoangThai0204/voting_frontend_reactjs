import axios from 'axios';
import { UserResponse } from '../typeObject'; // Nhập các định nghĩa từ tệp chung
import { VoteResponse } from '../typeObject';
const API_URL = 'http://localhost:3000/api/user';

// Hàm đăng nhập người dùng
export const loginUser = async (data: { email: string; password: string }): Promise<UserResponse> => {
  const response = await axios.post(`${API_URL}/login`, data);
  return response.data;
};

// Thay đổi kiểu trả về thành `Promise<{ status: string; message: string; data: Vote[] }>`
export const getAllVotes = async (authorId: string): Promise<VoteResponse> => {
  const response = await axios.get(`${API_URL}/find_all_voting/${authorId}`);
  return response.data;
}
