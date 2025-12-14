import type { IPaginatedResponse, IResponse } from "@/Alltypes/Response.type";
import type { ITourresponse } from "@/Alltypes/tour.type";
import baseApi from "@/redux/baseApi";

export interface ITourApiResponse {
  data: ITourresponse[];
  meta: any; 

}

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
        getAlltour : builder.query<IResponse<ITourApiResponse>, void>({
            query : () => ({
                url : "/tour",
                method : "GET",
            }),
            providesTags : ["TOUR"],
        }),
        getsingleTour : builder.mutation ({
            query : (id) => ({
                url : `/tour/${id}`,
                method : "GET"

            }),
        })
    })
})


export const { useCreateTourMutation , useGetAlltourQuery , useGetsingleTourMutation} = TourApi;