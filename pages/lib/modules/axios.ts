import axios from "axios";

const apiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
});

export default apiInstance;
