
import axios, { type AxiosRequestConfig } from "axios"
import { el, is } from "date-fns/locale";
import { promise } from "zod";

export const axiosInstant = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true
})

// Add a request interceptor
axiosInstant.interceptors.request.use(function (config) {
  // Do something before request is sent
  // console.log("Axios:" , config)
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
},
);

let isRefreshing = false;

let pendingQueue: {
  resolve: (value: unknown) => void;
  reject: (reason: unknown) => void;
}[] = []

const processQueue = (error: unknown) => {
  pendingQueue.forEach((promise) => {
    if (error) {
      promise.reject(error)
    } else {
      promise.resolve(null)
    }
  })
  pendingQueue = []
}

// Add a response interceptor
axiosInstant.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {

    const originalRequest = error.config as AxiosRequestConfig;

    if (error.response.status === 500 && error.response.data.message === "jwt expired") {


      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingQueue.push({ resolve, reject })
        })
          .then(() => axiosInstant(originalRequest))
          .catch((err) => Promise.reject(err))
      }

      isRefreshing = true;
      try {
        const result = await axiosInstant.post("/auth/refresh-token")
        console.log("New Token is ready :", result);
        processQueue(null)
        return axiosInstant(originalRequest);
      } catch (error) {
        processQueue(error)
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }

    }
    console.log(error);

    return Promise.reject(error);
  }
);
