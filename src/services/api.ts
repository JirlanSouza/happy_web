import axios from 'axios';

const api = axios.create({
    baseURL: 'https://happy-be.herokuapp.com/',
});

export default api;