import { FC, useReducer, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Cookies from 'js-cookie';
import { AuthContext, authReducer } from './';
import { cinemaApi } from '../../api';
import { UserResponse, User } from '../../interfaces';

export interface AuthState {
  isLoggedIn: boolean;
  user?: User;
}

const AUTH_INITIAL_STATE:AuthState = {isLoggedIn:false, user:undefined};

export const AuthProvider:FC = ({children}) => {
  const router = useRouter();
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  const getJWTPayload = (token:string) => {
    token = token.split('.')[1];
    const base64 = token.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

  useEffect(() => {
    if(router.pathname.includes("auth"))
      logout();
    else{
      const token = Cookies.get('token');
      if(token){
        const {name, id} = getJWTPayload(token);
        dispatch({type:'[Auth] - Login', payload:{name, id}});
      }
    }
  }, []);

  const loginUser = async(email:string, password:string):Promise<boolean> => {
    try{
      const { data:{token, user} } = await cinemaApi.post<UserResponse>('/auth/login', {email, password});
      Cookies.set('token', token);
      dispatch({type:'[Auth] - Login', payload:user});
      return true;
    }catch(error){
      return false;
    }
  }

  const registerUser = async(name:string, email:string, password:string):Promise<{hasError:boolean; message?:string}> => {
    try{
      const {data} = await cinemaApi.post<UserResponse>('/auth/register', {name, email, password});
      Cookies.set('token', data.token );
      dispatch({type:'[Auth] - Login', payload:data.user});
      return {hasError:false};
    }catch(error){
      if(axios.isAxiosError(error))
        return {hasError:true, message:error.response?.data.message};
      return {hasError:true, message:'No se pudo crear el usuario - intente de nuevo'};
    }
  }

  const logout = () => {
    Cookies.remove('token');
    dispatch({type:'[Auth] - Logout'});
    router.push('/');
  }

  return (
    <AuthContext.Provider value={{...state, loginUser, registerUser, logout}}>
      {children}
    </AuthContext.Provider>
  )
};