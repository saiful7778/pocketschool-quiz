import axios, { type AxiosInstance } from "axios";

const axiosConfig: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

export default axiosConfig;
