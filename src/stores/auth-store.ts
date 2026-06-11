import { create } from "zustand";
import {
  login as loginApi,
  register as registerApi,
  logout as logoutApi,
  fetchMe,
  type User,
} from "@/api/modules/auth";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  async login(username, password) {
    const user = await loginApi(username, password);
    set({ user, isAuthenticated: true });
  },

  async register(username, email, password) {
    const user = await registerApi(username, email, password);
    set({ user, isAuthenticated: true });
  },

  async logout() {
    await logoutApi().catch(() => {});
    set({ user: null, isAuthenticated: false });
  },

  async checkSession() {
    set({ isLoading: true });
    try {
      const user = await fetchMe();
      set({ user, isAuthenticated: true, isLoading: false });
    } catch {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },
}));
