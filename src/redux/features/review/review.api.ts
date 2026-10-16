import baseApi from "@/redux/baseApi";

export interface IReview {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    picture?: string;
  };
  tour: string | {
    _id: string;
    title: string;
    images?: string[];
  };
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReviewsByTour: builder.query<{ success: boolean; data: IReview[] }, string>({
      query: (tourId: string) => ({
        url: `/review/tour/${tourId}`,
        method: "GET",
      }),
      providesTags: ["REVIEW"],
    }),

    getMyReviews: builder.query<{ success: boolean; data: IReview[] }, void>({
      query: () => ({
        url: "/review/my-reviews",
        method: "GET",
      }),
      providesTags: ["REVIEW"],
    }),

    getAllReviews: builder.query<{ success: boolean; data: IReview[] }, void>({
      query: () => ({
        url: "/review/all-reviews",
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

    updateReview: builder.mutation({
      query: ({ id, data }: { id: string; data: { rating?: number; comment?: string } }) => ({
        url: `/review/${id}`,
        method: "PATCH",
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
  useGetMyReviewsQuery,
  useGetAllReviewsQuery,
  useAddReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewApi;
