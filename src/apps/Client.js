import axios from "axios";
import { AuthInterceptor } from "../shared/interceptor/AuthInterceptor";

const AxiosClient = axios.create({
   baseURL: process.env.REACT_APP_BASE_URL,
   headers: {
      "content-type": "application/json"
   },
   responseType: "json"
});
AxiosClient.interceptors.request.use(AuthInterceptor);

export default AxiosClient;