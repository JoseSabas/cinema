import NextLink from 'next/link';
import Image from 'next/image';
import { CinemaLayout } from '../../components/layouts';
import { Loader } from '../../components/ui';
import { validations } from '../../utils';
import useAuth from '../../hooks/useAuth';
import styles from './form.module.css';

const RegisterPage = () => {
  const { islogin, isPwd, errors, errorMsg, handleSubmit, handleAuth, register, setIsPwd } = useAuth();

  return (
    <CinemaLayout title="Ingresar" pageDescription="Ingresar">
      <form onSubmit={handleSubmit(handleAuth)} noValidate className={styles['main-container']}>
        <p className={styles['title']}>Crear cuenta</p>
        <label className={styles['input-text']}>Name</label>
        <div className={styles['input-container']}>
          <input type="text" autoComplete="off" {...register("name", {required:'Este campo es requerido', minLength:{value:1, message:'Mínimo 1 caracter'}})} className={styles['input']} />
        </div>
        {!!errors.name && <p className={styles['error-msg']}>{errors.name.message}</p>}
        <label className={styles['input-text']}>Email</label>
        <div className={styles['input-container']}>
          <input type="text" autoComplete="off" {...register("email", {required:'Este campo es requerido', validate:validations.isEmail})} className={styles['input']} />
        </div>
        {!!errors.email && <p className={styles['error-msg']}>{errors.email.message}</p>}
        <label className={styles['input-text']}>Password</label>
        <div className={styles['input-container']}>
          <input type={isPwd?'password':'text'} autoComplete="off" {...register("password", {required:'Este campo es requerido', minLength:{value:6, message:'Mínimo 6 caracteres'}})} className={styles['input']} />
          <Image src={`/${isPwd?'show':'hide'}.png`} onClick={ev => setIsPwd(prev => !prev)} width="18" height="15" objectFit="cover" />
        </div>
        {!!errors.password && <p className={styles['error-msg']}>{errors.password.message}</p>}
        <button type="submit" className={styles['button']}>
          {islogin ? <Loader type='button' /> : 'Ingresar'}
        </button>
        <NextLink href='/auth/login' passHref>
          <div className={styles['link']}>
            <span className={styles['link-text']}>¿Ya tienes cuenta?</span>
          </div>
        </NextLink>
        {errorMsg && <p className={styles['error-msg']}>{errorMsg}</p>}
      </form>
    </CinemaLayout>
  )
}

export default RegisterPage;