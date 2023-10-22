import axios from "axios";
import { ApiClient, ApiResponse } from "./types";

export class Api implements ApiClient {
  public async get<TData>(url: string): Promise<ApiResponse<TData>> {
    return await axios.get<TData>(url);
  }

  public async put<TRequest, TResponse>(
    url: string,
    request: TRequest
  ): Promise<TResponse> {
    return await axios.post<TRequest, TResponse>(url, request);
  }
}
