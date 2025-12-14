import baseApi from "@/redux/baseApi";

export const divisionApi = baseApi.injectEndpoints({

    endpoints : (builder) => ({

        addDivision : builder.mutation({
            query : (divisionData) => ({
                url : "/division/create",
                method :"POST",
                data : divisionData
            }),
        invalidatesTags : ["DIVISION"],
        }),

        getDivisions : builder.query({
            query : () => ({
                url : "/division",
                method :"GET",
            }),
            providesTags : ["DIVISION"]
        }),
        
        getsingleDivisions : builder.mutation({
            query : (slug) => ({
                url : `/division/${slug}`,
                method :"GET",
            }),
        }),

        removeDivisions : builder.mutation({
            query : (divisionId) => ({
                url : `/division/${divisionId}`,
                method :"DELETE",
            }),
            invalidatesTags : ["DIVISION"],
        })
    })
})

export const {useAddDivisionMutation , useGetDivisionsQuery , useGetsingleDivisionsMutation , useRemoveDivisionsMutation} = divisionApi