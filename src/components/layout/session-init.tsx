"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth-store";

export function SessionInit() {
  const checkSession = useAuthStore((s) => s.checkSession);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  return null;
}
