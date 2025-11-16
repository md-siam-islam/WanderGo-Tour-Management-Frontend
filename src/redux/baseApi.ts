import { createApi} from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from './axiosBaseQuery'

const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: axiosBaseQuery(),
    tagTypes : ["USER"],
    endpoints: (builder) => ({})
})

export default baseApi