import baseApi from "@/redux/baseApi";


export const TourApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({

        createTour : builder.mutation({
            query : (tourData) => ({
                url : "/tour/create",
                method : "POST",
                data : tourData
            }),
            invalidatesTags: ["TOUR"]
        }),
        getAlltour : builder.query({
            query : () => ({
                url : "/tour",
                method : "GET",
            }),
            providesTags : ["TOUR"]
        })
    })
})


export const { useCreateTourMutation , useGetAlltourQuery } = TourApi;