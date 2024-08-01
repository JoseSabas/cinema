import { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { AuthContext } from '../../context/auth';
import styles from './Navbar.module.css';

export const Navbar = () => {
  const router = useRouter();
  const { user, isLoggedIn, logout } = useContext(AuthContext);
  const [pathname, setPathname] = useState<string|undefined>();

  useEffect(() => {
    setPathname(router.pathname);
  }, []);

  return (
    <nav className={styles['main-container']}>
      <div onClick={ev => router.push("/")} className={styles['logo-container']}>
        <Image src={"/film.png"} width="35" height="35" objectFit="cover" />
        <div className={styles['logo-title']}>Cinema</div>
      </div>
      { isLoggedIn ? 
        <>
          <span className={styles['name-container']}>Bienvenido <b>{user?.name}</b></span>
          <div>
            {pathname &&
              <>
                {isLoggedIn&&!pathname?.includes("auth") && <button onClick={() => router.push("/bookings") } className={`${styles['button']} ${styles['button2']}`}>Mis reservaciones</button>}
                <button onClick={logout} className={styles['button']}>Salir</button>
              </>
            }
          </div>
        </> :
        <>
          {!pathname?.includes("auth") && <button onClick={() => router.push("/auth/login") } className={styles['button']}>Ingresar</button>}
        </>
      }
    </nav>
  )
}