import { FC } from 'react';
import styles from './Loader.module.css';

interface Props {
  type: 'button'|'page'|'A';
}

export const Loader:FC<Props> = ({type}) => {
  return (
    <div className={styles[type]} />
  )
}