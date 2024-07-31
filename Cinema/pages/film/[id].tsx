import { useContext, useEffect, useState, ReactElement, FormEvent } from "react";
import { NextPage, GetServerSideProps } from 'next';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { AuthContext } from '../../context/auth';
import { CinemaLayout } from '../../components/layouts';
import { ButtonLoader, Confirmation } from '../../components/ui';
import { cinemaApi } from '../../api';
import { FilmResponse, Schedule, ScheduleResponse, BookingResponse, BookingUUIDResponse } from '../../interfaces';
import styles from './[id].module.css';

interface Props {
  id: String;
}

const RoomPage:NextPage<Props> = ({id}) => {
  const router = useRouter();
  const { user, isLoggedIn } = useContext(AuthContext);

  const [data, setData] = useState<FilmResponse>();
  const [auditoriums, setAuditoriums] = useState<string[]>([]);
  const [activeAuditorium, setActiveAuditorium] = useState<string>('');
  const [seats, setSeats] = useState<ReactElement[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [activeSchedule, setActiveSchedule] = useState<number>();
  const [busySeats, setBusySeats] = useState<number[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [isBooking, setIsBooking] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>('');
  const [confirmation, setConfirmation] = useState<BookingUUIDResponse|undefined>();

  useEffect(() => {
    const fetchData = async() => {
      const {data} = await cinemaApi.get<FilmResponse>(`/movies/${id}`);
      const auditoriums = Object.keys(data.auditoriums);

      setData(data);
      setAuditoriums(auditoriums);
      setActiveAuditorium(auditoriums[0]);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const seatsN = data?.auditoriums[activeAuditorium].seats||0;
    const seatElements = [];
      for(let i=0; i<seatsN; i++)
        seatElements.push(<div key={`seat${i}`} onClick={ev => addRemoveSeat(i+1)} className={`${styles['seat']} ${busySeats?.includes(i+1)&&styles['bussySeat']}`}>{i+1}</div>);
    setSeats(seatElements);
    setSelectedSeats([]);
  }, [busySeats]);

  useEffect(() => {
    const schedulesA = data?.auditoriums[activeAuditorium].schedules||[];
    setSchedules(schedulesA);
    setActiveSchedule(schedulesA[0]?.id);
  }, [activeAuditorium]);

  useEffect(() => {
    const fetchData = async() => {
      if(activeSchedule){
        const {data} = await cinemaApi.get<ScheduleResponse>(`/schedules/${activeSchedule}`);
        setBusySeats(data.seats);
      }
    };
    fetchData();
  }, [activeSchedule]);

  const addRemoveSeat = (id:number) => {
    setSelectedSeats(prev => {
      if(busySeats.includes(id))
        return prev;
      let seats = prev.includes(id) ? prev.filter(val => val!==id) : [...prev, id];
      return seats.sort(function(a, b){return a-b});
    });
  }

  const handleSubmit = async(event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMsg('');

    if(isBooking)
      return;

    if(!isLoggedIn){
      setIsBooking(false);
      return router.push("/auth/login");
    }

    if(selectedSeats.length===0){
      setIsBooking(false);
      return setMsg('Tienes que reservar almenos un asiento');
    }

    setIsBooking(true);
    const token = Cookies.get('token');
    const headers = {Authorization:`Bearer ${token}`};
    try{
      const {data:{id, uuid}} = await cinemaApi.post<BookingResponse>('/bookings', {booker:user?.id, schedule:activeSchedule}, {headers});
      for(const n of selectedSeats)
        await cinemaApi.post('/seats', {n, booking:id}, {headers});
      const {data} = await cinemaApi.get<BookingUUIDResponse>(`/bookings/${uuid}`, {headers});
      setConfirmation(data);
      //router.push("/");
    }catch(e){
      setMsg('Error al reservar');
    }finally{
      setIsBooking(false);
    }
  }

  const handleAccept = () => {
    setConfirmation(undefined);
  }

  return (
    <CinemaLayout title={`Sala ${id}`} pageDescription={`Horarios de la sala ${id}`}>
      <div className={styles['seats-main-container']}>
        <div className={styles['seats-container-inner']}>
          <div className={styles['seats-container']}>
            {seats}
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