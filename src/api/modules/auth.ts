import { request, unwrap, type ApiResponse } from "@/api/request";
import type { User } from "@/api/interfaces/auth";

export type { User };

// ============================================================
// Auth API
// ============================================================

export async function login(username: string, password: string) {
  return unwrap(
    await request<ApiResponse<User>>("/auth/login", {
      method: "POST",
      body: { username, password },
    })
  );
}

export async function register(username: string, email: string, password: string) {
  return unwrap(
    await request<ApiResponse<User>>("/auth/register", {
      method: "POST",
      body: { username, email, password },
    })
  );
}

export async function logout() {
  return unwrap(
    await request<ApiResponse<{ message: string }>>("/auth/logout", { method: "POST" })
  );
}

export async function fetchMe() {
  return unwrap(await request<ApiResponse<User>>("/auth/me"));
}
