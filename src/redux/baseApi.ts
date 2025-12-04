import { createApi} from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from './axiosBaseQuery'

const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: axiosBaseQuery(),
    tagTypes : ["USER" ,"TOUR-TYPE" , "DIVISION" , "TOUR" , "BOOKING"],
    endpoints: (builder) => ({})
})

export default baseApi