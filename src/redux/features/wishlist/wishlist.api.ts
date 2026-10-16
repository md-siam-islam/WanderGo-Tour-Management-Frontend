import baseApi from "@/redux/baseApi";

export const wishlistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyWishlist: builder.query({
      query: () => ({
        url: "/wishlist",
        method: "GET",
      }),
      providesTags: ["WISHLIST"],
    }),

    addToWishlist: builder.mutation({
      query: (tourId: string) => ({
        url: "/wishlist",
        method: "POST",
        data: { tour: tourId },
      }),
      invalidatesTags: ["WISHLIST"],
    }),

    removeFromWishlist: builder.mutation({
      query: (tourId: string) => ({
        url: `/wishlist/${tourId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["WISHLIST"],
    }),
  }),
});

export const {
  useGetMyWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} = wishlistApi;
