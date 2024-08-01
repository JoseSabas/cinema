import { NextPage, GetServerSideProps } from 'next';
import { CinemaLayout } from '../../components/layouts';
import { Schedule } from '../../interfaces';
import useFilmPage from '../../hooks/useFilmPage';
import { ButtonLoader, Confirmation } from '../../components/ui';
import styles from './[id].module.css';

interface Props {
  id: string;
}

const RoomPage:NextPage<Props> = ({id}) => {
  const { data, auditoriums, activeAuditorium, seats, busySeats, selectedSeats, schedules, activeSchedule, isBooking, msg, confirmation, setActiveAuditorium, addRemoveSeat, setActiveSchedule, handleSubmit, handleAccept } = useFilmPage(id);

  return (
    <CinemaLayout title={`Sala ${id}`} pageDescription={`Horarios de la sala ${id}`}>
      <div className={styles['seats-main-container']}>
        <div className={styles['seats-container-inner']}>
          <div className={styles['seats-container']}>
            {seats.map(i => <div key={`seat${i}`} onClick={ev => addRemoveSeat(i+1)} className={`${styles['seat']} ${busySeats?.includes(i+1)&&styles['bussySeat']} ${selectedSeats.includes(i+1)&&styles['activeSeat']}`}>{i+1}</div>)}
          </div>
        </div>
        <div className={styles['screen']}>Pantalla</div>
        <div className={styles['legend-container']}>
          <div className={styles['legend-item']}>
            <div className={`${styles['legend-color']} ${styles['bussy-legend-color']}`}/>Ocupado
          </div>
          <div className={styles['legend-item']}>
            <div className={styles['legend-color']}/>Disponible
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit} className={styles['form-container']}>
        <p className={styles['form-title']}>{data?.title}</p>
        <p className={styles['form-description']}>{data?.description}</p>
        <p className={styles['form-subtitle']}>Selecciona una sala</p>
        <select value={activeAuditorium} onChange={e => setActiveAuditorium(e.target.value)} className={styles['form-select']}>
          {auditoriums.map(name => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
        <p className={styles['form-subtitle']}>Selecciona una horario</p>
        <div className={styles['shedules-container']}>
          {schedules.map(({id, hour}:Schedule) => (
            <div key={id} onClick={e => setActiveSchedule(id)} className={`${styles['shedule']} ${id===activeSchedule&&styles['activeShedule']}`}>
              {hour}
            </div>
          ))}
        </div>
        <p className={styles['form-subtitle']}>Boletos seleccionados</p>
        <div className={styles['sel-seats-cont']}>
          {selectedSeats.length ? 
            selectedSeats.map(seat => <span key={seat} className={styles['sel-seat']}>{seat}</span>) :
            '---'
          }
        </div>
        <button type="submit" className={styles['button']}>
          {isBooking ? <ButtonLoader /> : 'Reservar'}
        </button>
        {msg && <p className={styles['msg']}>{msg}</p>}
      </form>
      {confirmation && <Confirmation data={confirmation} onAccept={handleAccept} />}
    </CinemaLayout>
  )
}

export const getServerSideProps:GetServerSideProps = async({params}) => {
  const {id=''} = params as {id:string};

  return {
    props: { id }
  }
}

export default RoomPage;