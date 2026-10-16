import baseApi from "@/redux/baseApi";
import type { ITourresponse } from "@/Alltypes/tour.type";

export interface IWishlistItem {
  _id: string;
  user: string;
  tour: ITourresponse;
  createdAt: string;
}

export const wishlistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyWishlist: builder.query<{ success: boolean; data: IWishlistItem[] }, void>({
      query: () => ({
        url: "/wishlist/my-wishlist",
        method: "GET",
      }),
      providesTags: ["WISHLIST"],
    }),

    checkWishlistStatus: builder.query<{ success: boolean; data: { isWishlisted: boolean } }, string>({
      query: (tourId: string) => ({
        url: `/wishlist/check/${tourId}`,
        method: "GET",
      }),
      providesTags: ["WISHLIST"],
    }),

    toggleWishlist: builder.mutation({
      query: (tourId: string) => ({
        url: `/wishlist/toggle/${tourId}`,
        method: "POST",
      }),
      invalidatesTags: ["WISHLIST"],
    }),
  }),
});

export const {
  useGetMyWishlistQuery,
  useCheckWishlistStatusQuery,
  useToggleWishlistMutation,
} = wishlistApi;
