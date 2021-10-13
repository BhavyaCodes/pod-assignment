import axios from 'axios';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useHistory } from 'react-router';

interface User {
  _id: string;
  username: string;
}

const UserContext = createContext<{
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  loading: boolean;
  logout: () => void;
  token: null | string;
  setToken: Dispatch<SetStateAction<string | null>>;
} | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const history = useHistory();
  // const token = window.localStorage.getItem('token');
  const [token, setToken] = useState<string | null>(
    window.localStorage.getItem('token'),
  );
  const [user, setUser] = useState<null | User>(null);
  if (!token) {
    <UserContext.Provider
      value={{ user: null, setUser, loading: false, logout, token, setToken }}
    >
      {children}
    </UserContext.Provider>;
  }
  // const [user, setUser] = useLocalstorage<null | User>('token', null);
  const [loading, setLoading] = useState<boolean>(true);
  const value = { user, setUser, loading, logout, token, setToken };

  useEffect(() => {
    axios
      .get<User>('/api/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
        setLoading(false);
      })
      .catch((e) => {
        setUser(null);
        setLoading(false);
      });
  }, [token]);

  function logout() {
    window.localStorage.removeItem('token');
    history.push('/login');
    setUser(null);
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within UserProvider');
  }
  if (context === null) {
    throw new Error('Context is null');
  }
  return context;
}

// export const getUser = () => useContext(UserContext);
