import baseApi from "@/redux/baseApi";

export const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAnalytics: builder.query({
      query: () => ({
        url: "/stats/analytics",
        method: "GET",
      }),
      providesTags: ["STATS"],
    }),
  }),
});

export const { useGetAnalyticsQuery } = statsApi;
