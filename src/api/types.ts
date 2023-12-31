export interface ApiClient {
  get<TData>(url: string): Promise<ApiResponse<TData>>;
  put<TRequest, TResponse>(url: string, request?: TRequest): Promise<TResponse>;
  delete<TResponse>(url: string): Promise<TResponse>;
}

export interface ApiResponse<TData> {
  data: TData;
}
