import { useEffect, useState, useContext } from "react";
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { AuthContext } from '../../context/auth';
import { CinemaLayout } from '../../components/layouts';
import { PageLoader, Loader1 } from '../../components/ui';
import { cinemaApi } from '../../api';
import { BookingUUIDResponse, BookingBookerResponse } from '../../interfaces';
import styles from './index.module.css';

const BookingPage = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [myBookings, setMyBookings] = useState<BookingBookerResponse[]>([]);
  const [filmData, setFilmData] = useState<BookingUUIDResponse>();
  const [activeBooking, setActiveBooking] = useState<string>();

  useEffect(() => {
    const fetchData = async(token:string) => {
      try{
        const headers = {Authorization:`Bearer ${token}`};
        const {data} = await cinemaApi.get<BookingBookerResponse[]>('/bookings', {headers, params:{booker:user?.id}});
        setMyBookings(data);
        if(data.length)
          setActiveBooking(data[0].uuid);
      }catch(e){
        router.push("/auth/login");
      }
    };

    setIsLoading(true);
    const token = Cookies.get('token');
    if(token)  //Si hay token...
      fetchData(token);
    else
      router.push("/");
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if(activeBooking){
      const fetchData = async() => {
          const headers = {Authorization:`Bearer ${Cookies.get('token')}`};
          const {data} = await cinemaApi.get<BookingUUIDResponse>(`/bookings/${activeBooking}`, {headers});
          setFilmData(data);
      };
      fetchData();
    }
  }, [activeBooking]);

  return (
    <CinemaLayout title="Mis reservaciones" pageDescription="Detalle de mis reservaciones">
      {isLoading ?
        <PageLoader /> :
        myBookings.length ?
          <div>
            <p className={styles['main-title']}>Mis Reservaciones</p>
            <div className={styles['main-container']}>
              <div className={styles['left-container']}>
                {myBookings.map(data => 
                  <div key={data.uuid} onClick={ev => setActiveBooking(data.uuid)} className={`${styles['booking-container']} ${data.uuid===activeBooking && styles['active-booking-container']}`}>
                    <div>
                      <p className={styles['subtitle']}>Id de reservación</p>
                      <p className={styles['title']}>{data.uuid}</p>
                    </div>
                    <div>
                      <p className={styles['subtitle']}>Fecha de reservación</p>
                      <p className={styles['title']}>{data.createdDate}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className={styles['right-container']}>
                {!filmData ? 
                  <div className={styles['film-loader-container']}>
                    <Loader1 />
                  </div> :
                  <>
                    <p className={styles['film-title']}>{filmData.movie.title}</p>
                    <div className={styles['img']} style={{backgroundImage:`url(${filmData.movie.image})`}} />
                    <div className={styles['container2']}>
                      <div>
                        <p className={styles['subtitle']}>Sala</p>
                        <p className={styles['title']}>{filmData.auditorium.split(' ')[1]}</p>
                      </div>
                      <div>
                        <p className={styles['subtitle']}>Hora</p>
                        <p className={styles['title']}>{filmData.hour}</p>
                      </div>
                      <div>
                        <p className={styles['subtitle']}>Asiento(s)</p>
                        <p className={`${styles['title']} ${styles['title2']}`}>{filmData.seats.join(', ')}</p>
                      </div>
                    </div>
                    <p className={styles['subtitle']}>Contacto</p>
                    <p className={styles['title']}>{filmData.email}</p>
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