import { createContext, useState, ReactNode } from 'react';
import { User } from '../typeObject'; // Nhập các định nghĩa từ tệp chung

interface AuthContextType {
  isLogged: boolean;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setIsLogged(true);
    setUser(userData);
  };

  const logout = () => {
    setIsLogged(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLogged, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
