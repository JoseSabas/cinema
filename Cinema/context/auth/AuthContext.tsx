import { createContext } from 'react';

interface ContextProps {
  isLoggedIn: boolean;
  loginUser: (email:string, password:string) => Promise<boolean>;
  registerUser: (email:string, password:string) => Promise<{hasError:boolean; message?:string;}>;
  logout: () => void;
}

export const AuthContext = createContext({} as ContextProps);