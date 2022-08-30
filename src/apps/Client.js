import axios from "axios";
import { AuthInterceptor } from "../shared/interceptor/AuthInterceptor";

export const AxiosClient = axios.create({
   baseURL: "https://toktok-app-backend.herokuapp.com",
   headers: {
      "Content-Type": "application/json"
   },
   responseType: "json"
});
AxiosClient.interceptors.request.use(AuthInterceptor);

export const AxiosImageClient = axios.create({
   baseURL: "https://toktok-app-backend.herokuapp.com",
   headers: {
      "Content-Type": "multipart/form-data"
   },
   responseType: "json"
});
AxiosImageClient.interceptors.request.use(AuthInterceptor);