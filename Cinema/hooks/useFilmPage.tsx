import { useEffect, useState, useContext, FormEvent } from "react";
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { cinemaApi } from '../api';
import { AuthContext } from '../context/auth';
import { FilmResponse, Schedule, ScheduleResponse, BookingUUIDResponse, BookingResponse } from '../interfaces';

const useFilmPage = (id:string) => {
  const router = useRouter();
  const { user, isLoggedIn } = useContext(AuthContext);
  const [data, setData] = useState<FilmResponse>();
  const [auditoriums, setAuditoriums] = useState<string[]>([]);
  const [activeAuditorium, setActiveAuditorium] = useState<string>('');
  const [seats, setSeats] = useState<number[]>([]);
  const [busySeats, setBusySeats] = useState<number[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [activeSchedule, setActiveSchedule] = useState<number>();
  const [isBooking, setIsBooking] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>('');
  const [confirmation, setConfirmation] = useState<BookingUUIDResponse|undefined>();

  useEffect(() => {
    fetchData();
  }, []);

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
  }, [activeSchedule, data]);

  const fetchData = async() => {
    const {data} = await cinemaApi.get<FilmResponse>(`/movies/${id}`);
    const auditoriums = Object.keys(data.auditoriums);
    const activeAuditorium = auditoriums[0];
    const seats = data?.auditoriums[activeAuditorium].seats||0;

    setData(data);
    setAuditoriums(auditoriums);
    setActiveAuditorium(auditoriums[0]);
    setSeats(Array.from(Array(seats).keys()));
  };

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
      console.log('user -> ', user);
      /*const {data:{id, uuid}} = await cinemaApi.post<BookingResponse>('/bookings', {booker:user?.id, schedule:activeSchedule}, {headers});
      for(const n of selectedSeats)
        await cinemaApi.post('/seats', {n, booking:id}, {headers});
      const {data} = await cinemaApi.get<BookingUUIDResponse>(`/bookings/${uuid}`, {headers});
      setConfirmation(data);
      await fetchData();*/
    }catch(e){
      setMsg('Error al reservar');
    }finally{
      setSelectedSeats([]);
      setIsBooking(false);
    }
  }

  const handleAccept = () => {
    setConfirmation(undefined);
  }

  return { data, auditoriums, activeAuditorium, seats, busySeats, selectedSeats, schedules, activeSchedule, isBooking, msg, confirmation, setActiveAuditorium, addRemoveSeat, setActiveSchedule, handleSubmit, handleAccept };
}

export default useFilmPage;