import baseApi from "@/redux/baseApi";
interface Iotp {
    email : string
}
interface verifyOtp {
    email : string,
    otp : string
}

export interface IOtpResult {
  success: boolean
  message: string
  data: null
}


export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register : builder.mutation({
            query: (userInfo) => ({
                 url: "/user/register",
                method: "POST",
                data: userInfo
            })
        }),
        login : builder.mutation({
            query: (userInfo) => ({
                url : "auth/login",
                method: "POST",
                data : userInfo
            })
        }),
        logout : builder.mutation({
            query: () => ({
                url : "auth/logout",
                method: "POST"
            }),
            invalidatesTags : ["USER"]
        }),
        sendotp : builder.mutation<IOtpResult,Iotp >({
            query: (userInfo) => ({
                url : "/otp/send",
                method: "POST",
                data : userInfo
            })
        }),
        verifyotp : builder.mutation<IOtpResult,verifyOtp >({
            query: (userInfo) => ({
                url : "/otp/verify",
                method: "POST",
                data : userInfo
            })
        }),
        userInfo : builder.query({
            query : () => ({
                url :"user/me",
                method : "GET"
            }),
            providesTags : ["USER"]
        }),

        userUpdate : builder.mutation({
            query: ({id , userinfo}) => ({
                url : `user/${id}`,
                method : "PATCH",
                data : userinfo
            }),
            invalidatesTags : ["USER"]
        })

    })
})

export const {useRegisterMutation , useLoginMutation , useSendotpMutation , useVerifyotpMutation , useUserInfoQuery , useLogoutMutation , useUserUpdateMutation} = authApi