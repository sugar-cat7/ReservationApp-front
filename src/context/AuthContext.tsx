import { createContext, useState, useContext } from 'react';

type User = {
  id: string;
  name: string;
  passwordDigest: string;
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
  passwordDigest: string;
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
  const [user, setUser] = useState<User | null>(null);
  const signIn = ({ id, name, passwordDigest }: SignInProps) => {
    setUser({ id: id, name: name, passwordDigest: passwordDigest });
  };
  const signUp = () => {
    // Some sign up action
  };
  const signOut = () => {
    // Some sign out action
  };
  return { user, signIn, signUp, signOut };
};
