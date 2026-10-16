import { createApi} from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from './axiosBaseQuery'

const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: axiosBaseQuery(),
    tagTypes : ["USER", "TOUR-TYPE", "DIVISION", "TOUR", "BOOKING", "WISHLIST", "REVIEW", "COUPON", "STATS"],
    endpoints: () => ({})
})

export default baseApi