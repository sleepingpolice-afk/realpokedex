import { createContext, useState, useEffect, ReactNode } from 'react';
import { login as apiLogin, register as apiRegister } from '../services/auth';

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean; // This will be true if initial auth check is happening OR if login/register API is in progress
  error: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  isLoading: true, // Default to true as app initially loads auth state
  error: null,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true); // For initial localStorage check
  const [isLoadingApi, setIsLoadingApi] = useState<boolean>(false); // For login/register API calls
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsAuthLoading(true);
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Validate the structure of parsedUser to match User interface
        if (parsedUser && typeof parsedUser.id === 'string' && 
            typeof parsedUser.username === 'string' && 
            typeof parsedUser.email === 'string') {
          setUser(parsedUser as User);
        } else {
          console.warn('Invalid user object in localStorage:', parsedUser);
          localStorage.removeItem('user');
          setUser(null);
        }
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
        localStorage.removeItem('user');
        setUser(null);
      }
    } else {
      setUser(null); // No user in localStorage
    }
    setIsAuthLoading(false);
  }, []);

  const isAuthenticated = !!(user && user.id && user.username && user.email);

  const login = async (email: string, password: string) => {
    setIsLoadingApi(true);
    setError(null);
    try {
      const response = await apiLogin(email, password);
      const userData = response.data;
      const loggedInUser: User = {
        id: String(userData.user_id), // Use user_id from backend
        username: userData.username,
        email: userData.email,
      };
      setUser(loggedInUser);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
      // Consider clearing user state if a previous user was set and login fails
      // setUser(null); 
      // localStorage.removeItem('user');
    } finally {
      setIsLoadingApi(false);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    setIsLoadingApi(true);
    setError(null);
    try {
      // Assuming apiRegister takes (username, email, password, confirm_password)
      // Backend doesn't use confirm_password, so sending password again is fine.
      const response = await apiRegister(username, email, password, password);
      const userData = response.data;
      const registeredUser: User = {
        id: String(userData.user_id), // Use user_id from backend
        username: userData.username,
        email: userData.email,
      };
      setUser(registeredUser);
      localStorage.setItem('user', JSON.stringify(registeredUser));
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setIsLoadingApi(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    // Optionally, redirect to login page or home page after logout
    // navigate('/login'); // If using useNavigate hook here
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
        isLoading: isAuthLoading || isLoadingApi, // Combined loading state
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; // Exporting AuthContext for use with useContext
// Export useAuth hook from useAuth.tsx if preferred for consuming context