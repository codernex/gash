import { createContext, useContext, useMemo, useState, useEffect } from 'react';

import { useRouter } from 'next/router';

import api from '../api';

const AuthContext = createContext<AuthContext>({
  isAuthenticated: false,
  user: null,
  login: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
  signUp: async () => {},
  token: null
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
      setIsAuthenticated(true);
    } else {
      setToken(null);
      setIsAuthenticated(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data } = await api.post('/user/login', { email, password });
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(data.user));
      if (data.token) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
      }
      setLoading(false);
      router.push('/');
    } catch (error) {
      setLoading(false);
    }
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    try {
      await api.post('/user/logout');
      setIsAuthenticated(false);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setLoading(false);
      router.push('/login');
    } catch (error) {
      setLoading(false);
    }
    setLoading(false);
  };

  const signUp = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const { data } = await api.post('/user', { name, email, password });
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(data.user));
      if (data.token) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
      }
      setLoading(false);
      router.push('/');
    } catch (error) {
      setLoading(false);
    }
    setLoading(false);
  };

  const memorizedValue = useMemo(() => {
    return {
      isAuthenticated,
      user,
      login,
      logout,
      error,
      loading,
      signUp,
      token
    };
  }, [isAuthenticated, user, loading]);

  return (
    <AuthContext.Provider value={memorizedValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
