import axios from 'axios';
import { UserResponse } from '../typeObject'; // Nhập các định nghĩa từ tệp chung

const API_URL = 'http://localhost:3000/api/user';

// Hàm đăng ký người dùng
export const loginUser = async (data: { email: string; password: string }): Promise<UserResponse> => {
  const response = await axios.post(`${API_URL}/login`, data);
  return response.data;
};
