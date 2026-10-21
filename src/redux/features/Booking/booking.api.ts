import baseApi from "@/redux/baseApi";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (bookingData) => ({
        url: "/booking",
        method: "POST",
        data: bookingData,
      }),
      invalidatesTags: ["BOOKING"],
    }),

    getMyBookings: builder.query({
      query: () => ({
        url: "/booking/myBooking",
        method: "GET",
      }),
      providesTags: ["BOOKING"],
    }),

    getAllBookings: builder.query({
      query: () => ({
        url: "/booking",
        method: "GET",
      }),
      providesTags: ["BOOKING"],
    }),

    getSingleBooking: builder.query({
      query: (bookingId: string) => ({
        url: `/booking/${bookingId}`,
        method: "GET",
      }),
      providesTags: ["BOOKING"],
    }),

    cancelBooking: builder.mutation({
      query: (bookingId: string) => ({
        url: `/booking/cancel/${bookingId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["BOOKING"],
    }),

    initPayment: builder.mutation({
      query: (bookingId: string) => ({
        url: `/payment/init-payment/${bookingId}`,
        method: "POST",
        data: { bookingId },
      }),
      invalidatesTags: ["BOOKING"],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetMyBookingsQuery,
  useGetAllBookingsQuery,
  useGetSingleBookingQuery,
  useCancelBookingMutation,
  useInitPaymentMutation,
} = bookingApi;