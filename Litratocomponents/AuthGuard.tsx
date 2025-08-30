'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5000'

type Role = 'admin' | 'employee' | 'customer'

export default function AuthGuard({
  children,
  requiredRole,
}: {
  children: React.ReactNode
  requiredRole?: Role
}) {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    let cancelled = false
    const token =
      typeof window !== 'undefined'
        ? localStorage.getItem('access_token')
        : null
    if (!token) {
      router.replace('/login')
      setAuthorized(false)
      setChecking(false)
      return
    }

    // Validate token against the correct protected endpoint and format header properly
    fetch(`${API_BASE}/api/auth/getProfile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (cancelled) return
        if (res.status === 401) {
          try {
            localStorage.removeItem('access_token')
          } catch {}
          setAuthorized(false)
          router.replace('/login')
          return
        }
        const data = await res.json().catch(() => ({}))
        const userRole: Role | undefined = data?.role

        if (requiredRole && userRole && userRole !== requiredRole) {
          // Redirect users who don't have permission to a sensible destination
          const byRole: Record<string, string> = {
            admin: '/admin',
            employee: '/employee',
            customer: '/customer/dashboard',
          }
          router.replace(byRole[userRole] || '/')
          setAuthorized(false)
          return
        }
        setAuthorized(true)
      })
      .catch(() => {
        if (cancelled) return
        setAuthorized(false)
        router.replace('/login')
      })
      .finally(() => {
        if (!cancelled) setChecking(false)
      })

    return () => {
      cancelled = true
    }
  }, [router, requiredRole])

  // While checking or not authorized, avoid flashing protected UI
  if (checking || !authorized) return null
  return <>{children}</>
}
