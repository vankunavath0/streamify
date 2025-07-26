import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" ? ":https://streamify-5tqj.onrender.com/api" : "/api";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // send cookies with the request
});
