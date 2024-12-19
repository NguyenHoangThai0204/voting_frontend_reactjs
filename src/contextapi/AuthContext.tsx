import { createContext, useState, ReactNode, useEffect } from 'react';
import { User } from '../typeObject'; // Nhập các định nghĩa từ tệp chung
import io from "socket.io-client";
import React from 'react';

// Khởi tạo socket
const socket = io("https://api-1.pollweb.io.vn", { transports: ["websocket"] });
// const socket = io("http://localhost:3000", { transports: ["websocket"] });

interface AuthContextType {
  isLogged: boolean;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (userData: User) => void;
  walletAddress: string | null; // Thêm trường để lưu địa chỉ ví
  setWalletAddress: (address: string) => void; // Thêm hàm để cập nhật địa chỉ ví
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false); // Trạng thái đăng nhập
  const [user, setUser] = useState<User | null>(null); // Thông tin người dùng
  const [walletAddress, setWalletAddress] = useState<string | null>(null); // Địa chỉ ví người dùng

  // Hàm đăng nhập
  const login = (userData: User) => {
    setIsLogged(true);
    setUser(userData);
  };

  // Hàm đăng xuất
  const logout = () => {
    setIsLogged(false);
    setUser(null);
    setWalletAddress(null); // Xóa địa chỉ ví khi logout
  };

  // Hàm cập nhật thông tin người dùng
  const updateUser = (userData: User) => {
    setUser(userData);
  };

  // Lắng nghe sự kiện `user-updated` qua socket
  useEffect(() => {
    if (user && isLogged) {
      socket.on("user-updated", (data) => {
        // Cập nhật thông tin user chỉ khi data khớp với user hiện tại
        if (data._id === user._id && user.role !== "admin") {
          setUser(data);
        }
      });
    }

    // Cleanup socket event khi component bị hủy
    return () => {
      socket.off("user-updated");
    };
  }, [user, isLogged]); // Theo dõi giá trị của `user` và `isLogged`

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        user,
        login,
        logout,
        walletAddress,
        setWalletAddress,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
