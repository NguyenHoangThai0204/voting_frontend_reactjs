import { createContext, useState, ReactNode } from 'react';
import { User } from '../typeObject'; // Nhập các định nghĩa từ tệp chung

interface AuthContextType {
  isLogged: boolean;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  walletAddress: string | null; // Thêm trường để lưu địa chỉ ví
  setWalletAddress: (address: string) => void; // Thêm hàm để cập nhật địa chỉ ví
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null); // Thêm state để quản lý địa chỉ ví

  const login = (userData: User) => {
    setIsLogged(true);
    setUser(userData);
  };


  const logout = () => {
    setIsLogged(false);
    setUser(null);
    setWalletAddress(null); // Xóa địa chỉ ví khi logout
  };

  return (
    <AuthContext.Provider value={{ isLogged, user, login, logout, walletAddress, setWalletAddress }}>
      {children}
    </AuthContext.Provider>
  );
};