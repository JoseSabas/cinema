import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles['main-container']}>
      <div className={styles['links-container']}>
        <span className={styles['link']}>Condiciones de uso</span>
        <span>|</span>
        <span className={styles['link']}>Aviso de privacidad</span>
      </div>
      <div>© 1996-2024, Cinema.com, Inc. o sus afiliados</div>
    </footer>
  )
}