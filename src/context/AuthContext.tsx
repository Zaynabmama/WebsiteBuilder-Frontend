'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import { loginService } from '@/services/auth';

interface AuthContextType {
  user: any;
  handleLogin: (email: string, password: string) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<any>(null); 

  const handleLogin = async (email: string, password: string) => {
    const { user: loggedInUser } = await loginService(email, password);
    setUser(loggedInUser);
    console.log('logged in:', loggedInUser); 
    localStorage.setItem('role', loggedInUser.role);
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
