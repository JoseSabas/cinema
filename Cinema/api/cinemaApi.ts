import axios from 'axios';

const cinemaApi = axios.create({baseURL:'http://localhost:3000'});

export default cinemaApi;