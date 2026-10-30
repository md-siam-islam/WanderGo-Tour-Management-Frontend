import baseApi from "@/redux/baseApi";

export interface IPaymentRecord {
  _id: string;
  booking: {
    _id: string;
    guestCount: number;
    totalAmount: number;
    status: string;
    user?: {
      _id: string;
      name: string;
      email: string;
      phone?: string;
      picture?: string;
    };
    tour?: {
      _id: string;
      title: string;
      location?: string;
      costFrom?: number;
      images?: string[];
    };
  };
  transactionId: string;
  amount: number;
  status: "PAID" | "UNPAID" | "CANCEL" | "FAILED";
  paymentGatewayData?: any;
  createdAt: string;
  updatedAt: string;
}

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPayments: builder.query<{
      success: boolean;
      data: IPaymentRecord[];
      meta?: {
        total: number;
        page: number;
        limit: number;
        totalPage: number;
      };
    }, Record<string, any> | void>({
      query: (params) => ({
        url: "/payment/all-payments",
        method: "GET",
        params: params || {},
      }),
      providesTags: ["PAYMENT"],
    }),

    getSinglePayment: builder.query<{
      success: boolean;
      data: IPaymentRecord;
    }, string>({
      query: (id: string) => ({
        url: `/payment/${id}`,
        method: "GET",
      }),
      providesTags: ["PAYMENT"],
    }),
  }),
});

export const {
  useGetAllPaymentsQuery,
  useGetSinglePaymentQuery,
} = paymentApi;
