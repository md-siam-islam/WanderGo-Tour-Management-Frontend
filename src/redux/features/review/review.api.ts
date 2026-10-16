import baseApi from "@/redux/baseApi";

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReviewsByTour: builder.query({
      query: (tourId: string) => ({
        url: `/review?tour=${tourId}`,
        method: "GET",
      }),
      providesTags: ["REVIEW"],
    }),

    addReview: builder.mutation({
      query: (data: { tour: string; rating: number; comment: string }) => ({
        url: "/review",
        method: "POST",
        data,
      }),
      invalidatesTags: ["REVIEW", "TOUR"],
    }),

    deleteReview: builder.mutation({
      query: (reviewId: string) => ({
        url: `/review/${reviewId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["REVIEW", "TOUR"],
    }),
  }),
});

export const {
  useGetReviewsByTourQuery,
  useAddReviewMutation,
  useDeleteReviewMutation,
} = reviewApi;
