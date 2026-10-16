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
        url: "/booking/my-booking",
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

    initPayment: builder.mutation({
      query: (bookingId: string) => ({
        url: "/payment/init-payment",
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
  useInitPaymentMutation,
} = bookingApi;