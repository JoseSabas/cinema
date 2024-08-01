import { CinemaLayout } from '../../components/layouts';
import { Loader } from '../../components/ui';
import useBookingsPage from '../../hooks/useBookingsPage';
import styles from './index.module.css';

const BookingPage = () => {
  const { isLoading, myBookings, activeBooking, filmData, setActiveBooking } = useBookingsPage();

  return (
    <CinemaLayout title="Mis reservaciones" pageDescription="Detalle de mis reservaciones">
      {isLoading ?
        <Loader type="page" /> :
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
                    <Loader type="A" />
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