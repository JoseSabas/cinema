import { AuthState } from './';

type AuthActionType = | {type:'[Auth] - Login'} | {type:'[Auth] - Logout'};

export const authReducer = (state:AuthState, action:AuthActionType):AuthState => {
  switch(action.type){
    case '[Auth] - Login':
      return {...state, isLoggedIn:true};
    case '[Auth] - Logout':
      return {...state, isLoggedIn:false};
    default:
      return state;
  }
}