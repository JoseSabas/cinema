export interface Film {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface FilmResponse {
  title: string;
  description: string;
  auditoriums: Auditoriums;
}

interface Auditoriums {
  [key:string]: Sala;
}

interface Sala {
  seats: number;
  schedules: Schedule[];
}

export interface Schedule {
  id: number;
  hour: string;
}

export interface ScheduleResponse {
  seats: number[];
}