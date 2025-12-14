export interface IResponse<T> {
  success: boolean
  message: string
  data: T
}

export interface IPaginatedResponse<T> {
  data: T;
  meta: {
    page: number;
    limit: number;
    totalDocument: number;
    totalPage: number;
  };
}
