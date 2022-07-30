interface User {
  name: string;
  email: string;
  isAdmin: boolean;
  role: string;
}

interface AuthContext {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  loading: boolean;
  error: any;
  token: string | null;
}
