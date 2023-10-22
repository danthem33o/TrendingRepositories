import axios from "axios";
import { ApiResponse } from "./types";

export class Api {
  public static async get<TData>(
    endpoint: string
  ): Promise<ApiResponse<TData>> {
    return await axios.get<TData>(endpoint);
  }
}
