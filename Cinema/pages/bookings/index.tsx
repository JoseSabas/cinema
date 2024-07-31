import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { CinemaLayout } from '../../components/layouts';
import { PageLoader, Loader1 } from '../../components/ui';
import styles from './index.module.css';

const BookingPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFilmLoading, setIsFilmLoading] = useState<boolean>(false);
  const [myBookings, setMyBookings] = useState<any>([]);

  useEffect(() => {
    setIsLoading(true);
    if(Cookies.get('token')){  //Si hay token...
      //Aqui se traera data.. Si la peticion falla, redirigir al login
      setMyBookings([1])
    }else
      router.push("/");
    setIsLoading(false);
  }, []);

  return (
    <CinemaLayout title="Mis reservaciones" pageDescription="Detalle de mis reservaciones">
      {isLoading ?
        <PageLoader /> :
        myBookings.length ?
          <div>
            <p className={styles['main-title']}>Mis Reservaciones</p>
            <div className={styles['main-container']}>
              <div className={styles['left-container']}>
                <div className={styles['booking-container']}>
                  <div>
                    <p className={styles['subtitle']}>Id de reservación</p>
                    <p className={styles['title']}>4777e2ff-4056-4d4e-ad96-9888d6799253</p>
                  </div>
                  <div>
                    <p className={styles['subtitle']}>Fecha de reservación</p>
                    <p className={styles['title']}>31/07/2024</p>
                  </div>
                </div>
                <div className={styles['booking-container']}>
                  <div>
                    <p className={styles['subtitle']}>Id de reservación</p>
                    <p className={styles['title']}>4777e2ff-4056-4d4e-ad96-9888d6799253</p>
                  </div>
                  <div>
                    <p className={styles['subtitle']}>Fecha de reservación</p>
                    <p className={styles['title']}>31/07/2024</p>
                  </div>
                </div>
                <div className={styles['booking-container']}>
                  <div>
                    <p className={styles['subtitle']}>Id de reservación</p>
                    <p className={styles['title']}>4777e2ff-4056-4d4e-ad96-9888d6799253</p>
                  </div>
                  <div>
                    <p className={styles['subtitle']}>Fecha de reservación</p>
                    <p className={styles['title']}>31/07/2024</p>
                  </div>
                </div>
              </div>
              <div className={styles['right-container']}>
                {isFilmLoading ? 
                  <div className={styles['film-loader-container']}>
                    <Loader1 />
                  </div> :
                  <>
                    <p className={styles['film-title']}>{"Deadpool & Wolverine"}</p>
                    <div className={styles['img']} style={{backgroundImage:`url(${"https://statics.cinemex.com/movie_posters/8gKwoN7jSnXbvUs-360x540.jpg"})`}} />
                    <div className={styles['container2']}>
                      <div>
                        <p className={styles['subtitle']}>Sala</p>
                        <p className={styles['title']}>{"A"}</p>
                      </div>
                      <div>
                        <p className={styles['subtitle']}>Hora</p>
                        <p className={styles['title']}>{"15:00"}</p>
                      </div>
                      <div>
                        <p className={styles['subtitle']}>Asiento(s)</p>
                        <p className={`${styles['title']} ${styles['title2']}`}>{[1,2].join(', ')}</p>
                      </div>
                    </div>
                    <p className={styles['subtitle']}>Contacto</p>
                    <p className={styles['title']}>{"jose@gmail.com"}</p>
                  </>
                }
              </div>
            </div>
          </div> :
          <span className={styles['no-reservations']}>Sin reservaciones aún</span> 
      }
    </CinemaLayout>
  )
}

export default BookingPage;