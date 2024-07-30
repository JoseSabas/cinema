import { FC } from 'react';
import NextLink from 'next/link';
import { Film } from '../../interfaces';
import styles from './FilmCard.module.css';

interface Props {
  data: Film;
}

export const FilmCard:FC<Props> = ({data}) => {
  return (
    <NextLink href={`/film/${data.id}`} passHref prefetch={false}>
      <div className={styles['main-container']} style={{backgroundImage:`url(${data.image})`}}>
        
      </div>
    </NextLink>
  )
}