export interface User {
    _id: string;
    email: string;
    password?: string; // Tùy chọn, nếu cần
    fullName?: string;
    __v?: number; // Tùy chọn, nếu cần
  }
  
  export interface UserResponse {
    status: string;
    message: string;
    data: User;
  }
  