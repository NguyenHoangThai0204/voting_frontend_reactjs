import React, { createContext, useState, ReactNode } from 'react';

// Tạo Context
export const AuthContext = createContext<{
  isLogged: boolean;
  login: () => void;
  logout: () => void;
} | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

// Tạo Provider
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);

  const login = () => setIsLogged(true);
  const logout = () => setIsLogged(false);

  return (
    <AuthContext.Provider value={{ isLogged, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};