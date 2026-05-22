
import axios from "axios"

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

// Add a response interceptor
axiosInstant.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {

    if (error.response.status === 500 && error.response.data.message === "jwt expired") {

      try {
        const result = await axiosInstant.post("/auth/refresh-token")

        console.log("New Token is ready :", result);
      } catch (error) {

        console.log("Error From Refresh Token", error)
      }

    }
    console.log(error);

    return Promise.reject(error);
  }
);
