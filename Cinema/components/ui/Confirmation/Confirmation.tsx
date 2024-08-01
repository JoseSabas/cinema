import { FC } from 'react';
import { BookingUUIDResponse } from '../../../interfaces';
import styles from './Confirmation.module.css';

interface Props {
  data: BookingUUIDResponse;
  onAccept: Function;
}

export const Confirmation:FC<Props> = ({data, onAccept}) => {
  return (
    <div className={`${styles['modal-background']} ${styles['fade-in']}`}>
      <div className={styles['modal-container']}>
        <p className={styles['main-title']}>¡Ya tienes tus boletos!</p>
        <p className={styles['subtitle']}>Id de Reservación</p>
        <p className={styles['title']}>{data.uuid}</p>
        <div className={styles['film-container']}>
          <p className={styles['film-title']}>{data.movie.title}</p>
          <div className={styles['img']} style={{backgroundImage:`url(${data.movie.image})`}} />
        </div>
        <div className={styles['container2']}>
          <div>
            <p className={styles['subtitle']}>Sala</p>
            <p className={styles['title']}>{data.auditorium.split(' ')[1]}</p>
          </div>
          <div>
            <p className={styles['subtitle']}>Hora</p>
            <p className={styles['title']}>{data.hour}</p>
          </div>
          <div>
            <p className={styles['subtitle']}>Asiento(s)</p>
            <p className={`${styles['title']} ${styles['title2']}`}>{data.seats.join(', ')}</p>
          </div>
        </div>
        <p className={styles['subtitle']}>Contacto</p>
        <p className={styles['title']}>{data.email}</p>
        <div className={styles['button-container']}>
          <button onClick={ev => onAccept()} className={styles['button']}>Aceptar</button>
        </div>
      </div>
    </div>
  )
}