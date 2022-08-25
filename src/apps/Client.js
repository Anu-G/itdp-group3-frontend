import axios from "axios";

const AxiosClient = axios.create({
   baseURL: process.env.REACT_APP_BASE_URL,
   headers: {
      "content-type": "application/json"
   },
   responseType: "json"
});

export default AxiosClient;