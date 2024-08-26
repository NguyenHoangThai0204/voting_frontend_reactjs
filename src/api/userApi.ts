// src/api/userApi.ts

import axios from 'axios';

// URL của backend API
const API_URL = 'http://localhost:3000/api/user';

// Định nghĩa kiểu dữ liệu cho tham số và kết quả trả về
interface User {
  _id: string;
  gmail: string;
  password?: string; // Nếu cần
  __v?: number; // Nếu cần
}

interface UserResponse {
  status: string;
  message: string;
  data: User;
}

// Hàm đăng ký người dùng
export const loginUser = async (data: { gmail: string; password: string }): Promise<UserResponse> => {
  const response = await axios.post(`${API_URL}/login`, data);
  return response.data;
};
