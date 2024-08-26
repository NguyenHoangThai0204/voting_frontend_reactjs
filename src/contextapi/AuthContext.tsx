import { createContext, useState, ReactNode } from 'react';

interface User {
  _id: string;
  gmail: string;
  password?: string; // Tùy chọn, nếu cần
  __v?: number; // Tùy chọn, nếu cần
}

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
