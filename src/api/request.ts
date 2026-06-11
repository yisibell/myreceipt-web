import { ofetch } from "ofetch";

// ============================================================
// Base instance
// ============================================================

export const request = ofetch.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  credentials: "include", // session cookie
});

// ============================================================
// Response wrapper
// ============================================================

export interface ApiResponse<T> {
  code: number;
  data: T;
  msg: string;
}

export async function unwrap<T>(response: ApiResponse<T>): Promise<T> {
  if (response.code !== 0) {
    throw new Error(response.msg || "请求失败");
  }
  return response.data;
}
