import axios from "axios";

const baseURL = "http://192.168.1.10:3333/api/v1";

const api = axios.create({
  baseURL,
});

export default api;
