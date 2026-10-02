import React, { createContext, useState, useEffect } from 'react';
import { User, AuthState } from '../types/auth';

interface AuthContextType extends AuthState {
  loginDemo: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    // Check saved session
    const savedToken = localStorage.getItem('cybernex_token');
    const savedUser = localStorage.getItem('cybernex_user');

    if (savedToken && savedUser) {
      setState({
        user: JSON.parse(savedUser),
        token: savedToken,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      // Default to Active Demo Session for immediate platform interaction
      loginDemo();
    }
  }, []);

  const loginDemo = () => {
    const demoUser: User = {
      id: 'usr_demo_101',
      email: 'analyst@cybernex.ai',
      full_name: 'Lead Security Analyst',
      role: 'admin',
      created_at: new Date().toISOString(),
    };
    const demoToken = 'demo_jwt_token_cybernex_ai';

    localStorage.setItem('cybernex_token', demoToken);
    localStorage.setItem('cybernex_user', JSON.stringify(demoUser));

    setState({
      user: demoUser,
      token: demoToken,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const logout = () => {
    localStorage.removeItem('cybernex_token');
    localStorage.removeItem('cybernex_user');
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...state, loginDemo, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
