import axios, { AxiosRequestConfig } from "axios";
import { ACCESS_TOKEN_KEY } from "src/constants/localStorage";

const defaultAxiosSettings: AxiosRequestConfig = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN_KEY),
  },
};

const axiosMaqasid = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  ...defaultAxiosSettings,
});

export default axiosMaqasid;

export const axiosFormData = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    ...defaultAxiosSettings.headers,
    Accept: "*/*",
    "Content-Type": "multipart/form-data",
  },
});
