import type { DisplayableError } from "~/utils";

export interface ApiErrorResponse {
  data?: null;
  error: DisplayableError;
  // meta?: undefined;
}
export interface ApiSuccessResponse<R> {
  data: R;
  error?: null;
  // meta?: ApiResponseMeta;
}

export type ApiResponse<R> = ApiSuccessResponse<R> | ApiErrorResponse;

/*
// will enable this if/when we have any paginated endpoints
export type PagedApiResponse<R extends any[]> =
  | (ApiSuccessResponse<R> & { meta: ApiResponseMeta })
  | ApiErrorResponse;

export interface ApiResponseMeta {
  total: number;
  page: number;
  rowsPerPage: number;
  pageCount: number;
}*/
