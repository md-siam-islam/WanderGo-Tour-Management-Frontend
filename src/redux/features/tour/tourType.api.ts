import baseApi from "@/redux/baseApi";

interface ITourtype {
    name : string;
}

export const tourApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({

        addTourtype : builder.mutation({
            query : (tourTypename) => ({
                url : "/tour/create-tour-type",
                method :"POST",
                data : tourTypename
            }),

        invalidatesTags : ["TOUR-TYPE"],
        }),
        removeTourtype : builder.mutation({
            query : (tourId) => ({
                url : `/tour/tour-types/${tourId}`,
                method :"DELETE",
            }),
            invalidatesTags : ["TOUR-TYPE"],
        }),
        getSingleTourtype : builder.mutation({
            query : (tourId) => ({
                url : `/tour/tour-types/${tourId}`,
                method :"GET",
            }),
            invalidatesTags : ["TOUR-TYPE"],
        }),
        editTourtype : builder.mutation({
            query : ( {id, tourTypeData}) => ({
                
              url : `/tour/tour-types/${id}`,
              method :"PATCH",
              data : tourTypeData 
            }),
            invalidatesTags : ["TOUR-TYPE"],
        }),
        getTourtype : builder.query({
            query : () => ({
                url : "/tour/tour-types",
                method :"GET",
            }),
            providesTags : ["TOUR-TYPE"]
        })
    })
})

export const {useAddTourtypeMutation , useGetTourtypeQuery , useRemoveTourtypeMutation , useGetSingleTourtypeMutation , useEditTourtypeMutation} = tourApi