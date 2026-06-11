import { ofetch } from "ofetch";

export const api = ofetch.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "/api",
  headers: {
    "Content-Type": "application/json",
  },
  onResponseError({ response }) {
    if (response.status === 401) {
      // Handle unauthorized
    }
  },
});
