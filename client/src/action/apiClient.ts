import axios, { AxiosHeaders } from "axios";
import { gateWayUrl } from "./baseUrl";


const apiClient = axios.create({
  baseURL: `${gateWayUrl}/api`,
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      const headers = new AxiosHeaders();
      headers.set("authorization", `Bearer ${accessToken}`);
      config.headers = headers;
    }
    return config;
  },
  (error) => Promise.reject(error)
);





export default apiClient;