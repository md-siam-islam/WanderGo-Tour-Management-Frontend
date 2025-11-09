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


const authApi = baseApi.injectEndpoints({
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
        })
    })
})

export const {useRegisterMutation , useLoginMutation , useSendotpMutation , useVerifyotpMutation} = authApi