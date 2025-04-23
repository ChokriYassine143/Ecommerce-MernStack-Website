
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check for user in localStorage (mimicking persistence)
    const storedUser = localStorage.getItem('ecomm-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // Mock login - in a real app, this would be an API call
      if (email === 'admin@example.com' && password === 'admin123') {
        const adminUser = {
          id: '1',
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'admin' as const,
        };
        setUser(adminUser);
        localStorage.setItem('ecomm-user', JSON.stringify(adminUser));
        toast.success('Logged in as admin');
      } else if (email && password) {
        // For demo, accept any non-empty credentials
        const regularUser = {
          id: '2',
          name: 'Regular User',
          email,
          role: 'user' as const,
        };
        setUser(regularUser);
        localStorage.setItem('ecomm-user', JSON.stringify(regularUser));
        toast.success('Logged in successfully');
      } else {
        toast.error('Invalid credentials');
      }
    } catch (error) {
      toast.error('Login failed');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      setIsLoading(true);
      // Mock Google login - in a real app, this would use OAuth
      const googleUser = {
        id: Math.random().toString(36).substring(2, 9),
        name: 'Google User',
        email: 'google.user@example.com',
        avatar: 'https://lh3.googleusercontent.com/a/default-user',
        role: 'user' as const,
      };
      
      setUser(googleUser);
      localStorage.setItem('ecomm-user', JSON.stringify(googleUser));
      toast.success('Logged in with Google');
    } catch (error) {
      toast.error('Google login failed');
      console.error('Google login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      // Mock registration - in a real app, this would be an API call
      const newUser = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        email,
        role: 'user' as const,
      };
      
      setUser(newUser);
      localStorage.setItem('ecomm-user', JSON.stringify(newUser));
      toast.success('Registration successful');
    } catch (error) {
      toast.error('Registration failed');
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ecomm-user');
    toast.success('Logged out successfully');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        loginWithGoogle,
        register,
        logout,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
