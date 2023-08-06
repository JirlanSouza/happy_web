import axios from "axios";

const api = axios.create({
    baseURL: "https://happy-backend-3c6ab.rj.r.appspot.com/",
});

export default api;
