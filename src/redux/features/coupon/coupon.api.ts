import baseApi from "@/redux/baseApi";

export interface ICoupon {
  _id: string;
  code: string;
  discountType: "PERCENTAGE" | "FIXED";
  discountValue: number;
  minBookingAmount?: number;
  maxDiscountAmount?: number;
  expiryDate: string;
  usageLimit?: number;
  usedCount: number;
  isActive: boolean;
  createdAt: string;
}

export interface IApplyCouponResponse {
  success: boolean;
  message: string;
  data: {
    code: string;
    discountAmount: number;
    finalAmount: number;
  };
}

export interface IApplyCouponPayload {
  code: string;
  amount: number;
}

export const couponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getActiveCoupons: builder.query<{ success: boolean; data: ICoupon[] }, void>({
      query: () => ({
        url: "/coupon/active",
        method: "GET",
      }),
      providesTags: ["COUPON"],
    }),

    getAllCoupons: builder.query<{ success: boolean; data: ICoupon[] }, void>({
      query: () => ({
        url: "/coupon",
        method: "GET",
      }),
      providesTags: ["COUPON"],
    }),

    createCoupon: builder.mutation({
      query: (couponData: Partial<ICoupon>) => ({
        url: "/coupon/create",
        method: "POST",
        data: couponData,
      }),
      invalidatesTags: ["COUPON"],
    }),

    updateCoupon: builder.mutation({
      query: ({ id, data }: { id: string; data: Partial<ICoupon> }) => ({
        url: `/coupon/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["COUPON"],
    }),

    deleteCoupon: builder.mutation({
      query: (id: string) => ({
        url: `/coupon/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["COUPON"],
    }),

    applyCoupon: builder.mutation<IApplyCouponResponse, IApplyCouponPayload>({
      query: ({ code, amount }) => ({
        url: "/coupon/apply",
        method: "POST",
        data: { code, amount },
      }),
    }),
  }),
});

export const {
  useGetActiveCouponsQuery,
  useGetAllCouponsQuery,
  useCreateCouponMutation,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
  useApplyCouponMutation,
} = couponApi;
