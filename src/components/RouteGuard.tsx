import { useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'

interface RouteGuardProps {
  children: ReactNode
}

const publicPaths = ['/login', '/register']

export const RouteGuard = ({ children }: RouteGuardProps) => {
  const router = useRouter()
  const { user } = useAuth()
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    // If user is accessing a public path, don't check for auth
    if (publicPaths.includes(router.pathname)) {
      setAuthorized(true)
      return
    }

    // Check for auth
    if (!user) {
      setAuthorized(false)
      router.push('/login')
    }
  }, [user, router])

  return authorized ? <>{children}</> : null
}
