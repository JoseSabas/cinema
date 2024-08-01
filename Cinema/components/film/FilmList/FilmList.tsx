import { useEffect, useState } from "react";
import { FilmCard } from '../';
import { cinemaApi } from '../../../api';
import { Film } from '../../../interfaces';
import styles from './FilmList.module.css';

export const FilmList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [films, setFilms] = useState<Film[]>();

  useEffect(() => {
    const fetchData = async() => {
      setIsLoading(true);
      const {data} = await cinemaApi.get<Film[]>('/movies');
      setIsLoading(false);
      setFilms(data);
    };
    fetchData();
  }, []);

  return (
    <div className={styles['main-container']}>
      <div className={styles['title-container']}>Todas las películas</div>
      <div className={styles['films-container']}>
        {isLoading ?
          <div>Loading...</div> :
          films?.map(film => <FilmCard data={film} key={film.id} />)
        }
      </div>
    </div>
  )
}