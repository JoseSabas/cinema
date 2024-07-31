export interface BookingResponse {
  id: number;
  uuid: number;
}

export interface BookingUUIDResponse {
  uuid: string;
  createdDate: Date;
  email: string;
  hour: string;
  auditorium: string;
  movie: Movie;
  seats: number[];
}

interface Movie {
  title: string;
  image: string;
}

export interface BookingBookerResponse {
  uuid: string;
  createdDate: string;
}