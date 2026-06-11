'use client'
import { useState, useEffect } from 'react'

interface User {
  id: string
  email: string
  name: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkSession = () => {
      setUser({
        id: 'usr_2026',
        email: 'demo@businessos.com',
        name: 'Guest Business Owner'
      })
      setLoading(false)
    }
    const timer = setTimeout(checkSession, 500)
    return () => clearTimeout(timer)
  }, [])

  const login = async () => {
    setLoading(true)
    setUser({ id: 'usr_2026', email: 'demo@businessos.com', name: 'Guest Business Owner' })
    setLoading(false)
  }

  const logout = async () => {
    setLoading(true)
    setUser(null)
    setLoading(false)
  }

  return { user, loading, login, logout, isAuthenticated: !!user }
}
  
