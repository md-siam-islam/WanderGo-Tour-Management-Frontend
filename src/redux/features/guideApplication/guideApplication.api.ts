import baseApi from "@/redux/baseApi";

export interface IGuideApplication {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    picture?: string;
    phone?: string;
    role: string;
    isActive?: string;
  };
  fullName: string;
  email: string;
  phone: string;
  nidOrPassport: string;
  experienceYears: number;
  specialties: string[];
  languages: string[];
  bio: string;
  portfolioUrl?: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  adminFeedback?: string;
  reviewedBy?: {
    _id: string;
    name: string;
    email: string;
  };
  reviewedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export const guideApplicationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    applyForGuide: builder.mutation({
      query: (data) => ({
        url: "/guide-application/apply",
        method: "POST",
        data,
      }),
      invalidatesTags: ["GUIDE_APPLICATION", "USER"],
    }),

    getMyGuideApplication: builder.query({
      query: () => ({
        url: "/guide-application/my-application",
        method: "GET",
      }),
      providesTags: ["GUIDE_APPLICATION"],
    }),

    getAllGuideApplications: builder.query({
      query: (params?: Record<string, any>) => ({
        url: "/guide-application/all",
        method: "GET",
        params,
      }),
      providesTags: ["GUIDE_APPLICATION"],
    }),

    reviewGuideApplication: builder.mutation({
      query: ({ id, data }: { id: string; data: { status: "APPROVED" | "REJECTED"; adminFeedback?: string } }) => ({
        url: `/guide-application/review/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["GUIDE_APPLICATION", "USER"],
    }),

    deleteGuideApplication: builder.mutation({
      query: (id: string) => ({
        url: `/guide-application/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["GUIDE_APPLICATION"],
    }),
  }),
});

export const {
  useApplyForGuideMutation,
  useGetMyGuideApplicationQuery,
  useGetAllGuideApplicationsQuery,
  useReviewGuideApplicationMutation,
  useDeleteGuideApplicationMutation,
} = guideApplicationApi;
