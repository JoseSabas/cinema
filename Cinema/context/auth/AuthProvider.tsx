import { FC, useReducer } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { AuthContext, authReducer } from './';
import { cinemaApi } from '../../api';
import { UserResponse } from '../../interfaces';

export interface AuthState {
  isLoggedIn: boolean;
}

const AUTH_INITIAL_STATE:AuthState = {isLoggedIn:false};

export const AuthProvider:FC = ({children}) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  const loginUser = async(email:string, password:string):Promise<boolean> => {
    try{
      const { data:{token} } = await cinemaApi.post('/auth/login', {email, password});
      Cookies.set('token', token);
      dispatch({type:'[Auth] - Login'});
      return true;
    }catch(error){
      return false;
    }
  }

  const registerUser = async(email:string, password:string):Promise<{hasError:boolean; message?:string}> => {
    try{
      const { data:{token} } = await cinemaApi.post<UserResponse>('/auth/register', {email, password});
      Cookies.set('token', token );
      dispatch({type:'[Auth] - Login'});
      return {hasError:false};
    }catch(error){
      if(axios.isAxiosError(error))
        return {hasError:true, message:error.response?.data.message};
      return {hasError:true, message:'No se pudo crear el usuario - intente de nuevo'};
    }
  }

  const logout = () => {
    console.log('logout')
    Cookies.remove('token');
  }

  return (
    <AuthContext.Provider value={{...state, loginUser, registerUser, logout}}>
      {children}
    </AuthContext.Provider>
  )
};