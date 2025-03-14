import { createContext } from 'react';
import { User } from '../../interfaces';

interface ContextProps {
  isLoggedIn: boolean;
  user?: User;
  
  loginUser: (email:string, password:string) => Promise<boolean>;
  registerUser: (name:string, email:string, password:string) => Promise<{hasError:boolean; message?:string;}>;
  logout: () => void;
}

export const AuthContext = createContext({} as ContextProps);