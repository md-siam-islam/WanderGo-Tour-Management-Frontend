import baseApi from "@/redux/baseApi";

interface Iotp {
  email: string;
}

interface verifyOtp {
  email: string;
  otp: string;
}

export interface IOtpResult {
  success: boolean;
  message: string;
  data: null;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        data: userInfo,
      }),
    }),

    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
      invalidatesTags: ["USER"],
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),

    sendotp: builder.mutation<IOtpResult, Iotp>({
      query: (userInfo) => ({
        url: "/otp/send",
        method: "POST",
        data: userInfo,
      }),
    }),

    verifyotp: builder.mutation<IOtpResult, verifyOtp>({
      query: (userInfo) => ({
        url: "/otp/verify",
        method: "POST",
        data: userInfo,
      }),
      invalidatesTags: ["USER"],
    }),

    userInfo: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),

    userUpdate: builder.mutation({
      query: ({ id, userinfo }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        data: userinfo,
      }),
      invalidatesTags: ["USER"],
    }),

    getAllUsers: builder.query({
      query: () => ({
        url: "/user/all-user",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),

    getTourGuides: builder.query({
      query: () => ({
        url: "/user/guides",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),

    updateUserRoleStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/user/role-status-update/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["USER"],
    }),

    forgotPassword: builder.mutation({
      query: (userInfo: { email: string }) => ({
        url: "/auth/forgot-password",
        method: "POST",
        data: userInfo,
      }),
    }),

    resetPassword: builder.mutation({
      query: ({
        id,
        token,
        newPassword,
      }: {
        id: string;
        token: string;
        newPassword: string;
      }) => ({
        url: "/auth/reset-password",
        method: "POST",
        data: { id, newPassword },
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useSendotpMutation,
  useVerifyotpMutation,
  useUserInfoQuery,
  useLogoutMutation,
  useUserUpdateMutation,
  useGetAllUsersQuery,
  useGetTourGuidesQuery,
  useUpdateUserRoleStatusMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;