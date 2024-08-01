import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { AuthContext } from '../context/auth';

type FormData = {
  name?: string,
  email: string,
  password: string
};

const useAuth = () => {
  const router = useRouter();
  const { loginUser, registerUser } = useContext(AuthContext);
  const [isPwd, setIsPwd] = useState<boolean>(true);
  const { register, handleSubmit, formState:{errors} } = useForm<FormData>();
  const [islogin, setIslogin] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleAuth = async({name, email, password}:FormData) => {
    if(islogin)
      return;
    setErrorMsg('');
    setIslogin(true);
    const res:any = await (name ? registerUser(name||'', email, password) : loginUser(email, password));
    const isCorrect = name ? !res.hasError : res;
    if(isCorrect)
      router.push("/");
    else
      setErrorMsg(name ? (res.message||'') : 'Credenciales no válidas');
    setIslogin(false);
  }

  return { islogin, isPwd, errors, errorMsg, handleSubmit, handleAuth, register, setIsPwd };
}

export default useAuth;