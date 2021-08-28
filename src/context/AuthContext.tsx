import { createContext, useState, useContext } from 'react';

type User = {
  id: string;
  name: string;
  access_token: string;
};

type authContextType = {
  user: User | null;
  signIn: (u: User) => void;
  signUp: () => void;
  signOut: () => void;
};

type SignInProps = {
  id: string;
  name: string;
  access_token: string;
};

const initialState = {
  id: '0',
  name: 'initial',
  access_token: '',
};

function createCtx<ContextType>() {
  const ctx = createContext<ContextType | undefined>(undefined);
  function useCtx() {
    const c = useContext(ctx);
    if (!c) throw new Error('useCtx must be inside a Provider with a value');
    return c;
  }
  return [useCtx, ctx.Provider] as const;
}

export const [useAuth, SetAuthProvider] = createCtx<authContextType>();

export const AuthProvider: React.FC = (props) => {
  const auth = useAuthCtx();
  return <SetAuthProvider value={auth}>{props.children}</SetAuthProvider>;
};

const useAuthCtx = (): authContextType => {
  const [user, setUser] = useState<User>(initialState);
  const signIn = ({ id, name, access_token }: SignInProps) => {
    setUser({ id: id, name: name, access_token: access_token });
    sessionStorage.setItem('user_id', id);
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('access_token', access_token);
  };
  const signUp = () => {
    // Some sign up action
  };
  const signOut = () => {
    // Some sign out action
    sessionStorage.removeItem('user_id');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('access_token');
  };
  return { user, signIn, signUp, signOut };
};
