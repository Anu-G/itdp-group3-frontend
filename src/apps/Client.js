import axios from "axios";

const client = axios.create({
   baseURL: process.env.REACT_APP_BASE_URL,
   headers: {
      "content-type": "application/json"
   },
   responseType: "json"
});

export default client;