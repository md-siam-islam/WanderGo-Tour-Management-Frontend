import baseApi from "@/redux/baseApi";

export interface IDashboardStats {
  overview: {
    totalUsers: number;
    totalTours: number;
    totalBookings: number;
    completedBookings: number;
    pendingBookings: number;
    cancelledBookings: number;
    totalRevenue: number;
    last30DaysRevenue: number;
  };
  recentBookings: Array<{
    _id: string;
    guestCount: number;
    status: string;
    totalAmount?: number;
    createdAt: string;
    user?: {
      name: string;
      email: string;
      phone?: string;
      picture?: string;
    };
    tour?: {
      title: string;
      costFrom: number;
      images?: string[];
      location: string;
    };
    payment?: {
      amount: number;
      status: string;
      transactionId?: string;
    };
  }>;
}

export interface IMonthlyAnalytics {
  monthlyRevenue: Array<{
    _id: { year: number; month: number };
    revenue: number;
    count: number;
  }>;
  monthlyBookings: Array<{
    _id: { year: number; month: number };
    totalBookings: number;
  }>;
}

export interface IUserStats {
  totalUsers: number;
  totalActive: number;
  totalInactive: number;
  totalBlocked: number;
  newUsersInLast7Days: number;
  newUsersInLast30Days: number;
  userByRole: Array<{ _id: string; count: number }>;
}

export interface ITourDistributionStats {
  toursByDivision: Array<{ _id: string; name: string; count: number }>;
  toursByType: Array<{ _id: string; name: string; count: number }>;
}

export const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query<{ success: boolean; data: IDashboardStats }, void>({
      query: () => ({
        url: "/stats/dashboard",
        method: "GET",
      }),
      providesTags: ["STATS"],
    }),

    getMonthlyAnalytics: builder.query<{ success: boolean; data: IMonthlyAnalytics }, void>({
      query: () => ({
        url: "/stats/monthly-analytics",
        method: "GET",
      }),
      providesTags: ["STATS"],
    }),

    getUserStats: builder.query<{ success: boolean; data: IUserStats }, void>({
      query: () => ({
        url: "/stats/user",
        method: "GET",
      }),
      providesTags: ["STATS"],
    }),

    getTourDistribution: builder.query<{ success: boolean; data: ITourDistributionStats }, void>({
      query: () => ({
        url: "/stats/tour-distribution",
        method: "GET",
      }),
      providesTags: ["STATS"],
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
  useGetMonthlyAnalyticsQuery,
  useGetUserStatsQuery,
  useGetTourDistributionQuery,
} = statsApi;
