import baseApi from "@/redux/baseApi";

export const tourApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({

        addTourtype : builder.mutation({
            query : (tourTypename) => ({
                url : "/tour/create-tour-type",
                method :"POST",
                data : tourTypename
            })
        }),
        getTourtype : builder.query({
            query : () => ({
                url : "/tour/tour-types",
                method :"GET",
            })
        })
    })
})

export const {useAddTourtypeMutation , useGetTourtypeQuery} = tourApi