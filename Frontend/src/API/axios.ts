import axios, { AxiosRequestConfig } from "axios";

const defaultAxiosSettings: AxiosRequestConfig = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    // Authorization: "Bearer " + localStorage.getItem("accessToken"), // TODO: Use this when authentication is implemented
  },
  // withCredentials: true, // TODO: Use this when authentication is implemented
};

const axiosMaqasid = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  ...defaultAxiosSettings,
});

export default axiosMaqasid;
