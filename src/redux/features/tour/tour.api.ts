import type { IPaginatedResponse, IResponse } from "@/Alltypes/Response.type";
import type { ITourresponse } from "@/Alltypes/tour.type";
import baseApi from "@/redux/baseApi";

export interface ITourApiResponse {
  data: ITourresponse[];
  meta: any; 

}

type TourQueryParams = {
  division?: string;
  tourType?: string;
  searchTerm?: string;
  sort?: string;
  page?: number;
  limit?: number;
  minPrice?: string;
  maxPrice?: string;
};


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
        getAlltour : builder.query<IResponse<ITourApiResponse>, TourQueryParams | void>({
            query : (params) => ({
                url : "/tour",
                method : "GET",
                params
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