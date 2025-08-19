"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    if (!token) {
      router.replace("/login");
      setAuthorized(false);
      setChecking(false);
      return;
    }
    // Validate token by calling a protected endpoint
    fetch(`${API_BASE}/api/auth/profile`, {
      headers: { Authorization: token },
    })
      .then((res) => {
        if (cancelled) return;
        if (res.status === 401) {
          // Clear any stale token and redirect
          try {
            localStorage.removeItem("access_token");
          } catch {}
          setAuthorized(false);
          router.replace("/login");
        } else {
          setAuthorized(true);
        }
      })
      .catch(() => {
        if (cancelled) return;
        setAuthorized(false);
        router.replace("/login");
      })
      .finally(() => {
        if (!cancelled) setChecking(false);
      });
    return () => {
      cancelled = true;
    };
  }, [router]);

  // While checking auth or when not authorized, don't render children to avoid layout/design flash
  if (checking || !authorized) return null;
  return <>{children}</>;
}
