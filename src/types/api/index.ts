type BaseApiResponse = {
  success: boolean;
  status: number;
  message: string;
};

export type ApiSuccessResponse<T> = BaseApiResponse & {
  data: T;
};

export type ApiErrorResponse = BaseApiResponse & {
  errors: any[];
};

export type ApiResponse<T> = ApiSuccessResponse<T> & {
  errors: any[];
};
