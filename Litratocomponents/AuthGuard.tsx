"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000";

export default function AuthGuard() {
  const router = useRouter();

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    if (!token) {
      router.replace("/login");
      return;
    }
    // Validate token by calling a protected endpoint
    fetch(`${API_BASE}/api/auth/profile`, {
      headers: { Authorization: token },
    })
      .then((res) => {
        if (res.status === 401) {
          // Clear any stale token and redirect
          try { localStorage.removeItem("access_token"); } catch {}
          router.replace("/login");
        }
      })
      .catch(() => {
        router.replace("/login");
      });
  }, [router]);

  return null;
}
