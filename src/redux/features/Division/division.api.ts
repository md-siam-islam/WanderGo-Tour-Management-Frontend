import baseApi from "@/redux/baseApi";

export const divisionApi = baseApi.injectEndpoints({

    endpoints : (builder) => ({

        addDivision : builder.mutation({
            query : (divisionData) => ({
                url : "/division/create",
                method :"POST",
                data : divisionData
            })
        })
    })
})

export const {useAddDivisionMutation} = divisionApi