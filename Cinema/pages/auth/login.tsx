import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { AuthContext } from '../../context/auth';
import { CinemaLayout } from '../../components/layouts';
import { validations } from '../../utils';
import styles from './form.module.css';

type FormData = {
  email: string,
  password: string
};

const LoginPage = () => {
  const router = useRouter();
  const { isLoggedIn, loginUser } = useContext(AuthContext);

  const { register, handleSubmit, formState:{errors} } = useForm<FormData>();
  

  useEffect(() => {
    if(isLoggedIn)
      router.push("/");
  }, [isLoggedIn]);

  const handleAuth = async({email, password}:FormData) => {
    const isValidLogin = await loginUser(email, password);
    if(!isValidLogin)
      return;
  }
  
  return (
    <CinemaLayout title="Ingresar" pageDescription="Ingresar">
      <form onSubmit={handleSubmit(handleAuth)} noValidate className={styles['main-container']}>
        <p className={styles['title']}>Iniciar Sesión</p>
        <label className={styles['input-text']}>Email</label>
        <input type="text" {...register("email", {required:'Este campo es requerido', validate:validations.isEmail})} className={styles['input']} />
        {!!errors.email && <p className={styles['error-msg']}>{errors.email.message}</p>}
        <label htmlFor="password" className={styles['input-text']}>Password</label>
        <input type="text" {...register("password", {required:'Este campo es requerido', minLength:{value:6, message:'Mínimo 6 caracteres'}})} className={styles['input']} />
        {!!errors.password && <p className={styles['error-msg']}>{errors.password.message}</p>}
        <button type="submit" className={styles['button']}>Ingresar</button>
        <NextLink href='/auth/register' passHref>
          <div className={styles['link']}>
            <span className={styles['link-text']}>¿No tienes cuenta?</span>
          </div>
        </NextLink>
      </form>
    </CinemaLayout>
  )
}

export default LoginPage;