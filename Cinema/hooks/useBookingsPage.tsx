import { useEffect, useState, useContext } from "react";
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { AuthContext } from '../context/auth';
import { cinemaApi } from '../api';
import { BookingUUIDResponse, BookingBookerResponse } from '../interfaces';

const useBookingsPage = () => {
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

  return { isLoading, myBookings, activeBooking, filmData, setActiveBooking };
}

export default useBookingsPage;