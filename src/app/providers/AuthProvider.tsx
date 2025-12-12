import React, { createContext, useContext, useState } from 'react';
import { USERS } from '../../shared/constants/data';

type UserRole = 'dispatcher' | 'driver' | null;

interface AuthContextType {
  user: any;
  login: (role: 'dispatcher' | 'driver') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  const login = (role: 'dispatcher' | 'driver') => {
    setUser(role === 'dispatcher' ? USERS.DISPATCHER : USERS.DRIVER);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
