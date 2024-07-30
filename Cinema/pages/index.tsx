import type { NextPage } from 'next';
import { CinemaLayout } from '../components/layouts';
import { FilmList } from '../components/film';

const HomePage:NextPage = () => {
  return (
    <CinemaLayout title={'Cinema - Home'} pageDescription={'Ve los mejores estrenos aquí'}>
      <FilmList />
    </CinemaLayout>
  )
}

export default HomePage