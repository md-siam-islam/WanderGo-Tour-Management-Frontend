import baseApi from "@/redux/baseApi";

export const couponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCoupons: builder.query({
      query: () => ({
        url: "/coupon",
        method: "GET",
      }),
      providesTags: ["COUPON"],
    }),

    createCoupon: builder.mutation({
      query: (couponData) => ({
        url: "/coupon",
        method: "POST",
        data: couponData,
      }),
      invalidatesTags: ["COUPON"],
    }),

    applyCoupon: builder.mutation({
      query: ({ code, amount }: { code: string; amount: number }) => ({
        url: "/coupon/apply",
        method: "POST",
        data: { code, amount },
      }),
    }),
  }),
});

export const {
  useGetAllCouponsQuery,
  useCreateCouponMutation,
  useApplyCouponMutation,
} = couponApi;
