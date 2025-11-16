
import axios from "axios"

export const axiosInstant = axios.create({
    baseURL : "http://localhost:5000/api/v1",
    withCredentials : true
})

// Add a request interceptor
axiosInstant.interceptors.request.use(function (config) {
    // Do something before request is sent
    console.log("Axios:" , config)
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosInstant.interceptors.response.use(function onFulfilled(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log("Axios:" , response)
    return response;
  }, function onRejected(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });
