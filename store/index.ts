import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AppState {
  // UI
  sidebarOpen: boolean
  theme: 'dark' | 'light'
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void
  setTheme: (theme: 'dark' | 'light') => void

  // User settings
  companyName: string
  currency: string
  timezone: string
  setCompanyName: (name: string) => void
  setCurrency: (currency: string) => void
  setTimezone: (tz: string) => void

  // Recent activity
  recentSearches: string[]
  addRecentSearch: (url: string) => void
  clearRecentSearches: () => void

  // Notifications
  notifications: Array<{ id: string; message: string; type: 'success' | 'error' | 'info'; read: boolean }>
  addNotification: (message: string, type?: 'success' | 'error' | 'info') => void
  markNotificationRead: (id: string) => void
  clearNotifications: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      theme: 'dark',
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      setTheme: (theme) => set({ theme }),

      companyName: 'My Business',
      currency: 'USD',
      timezone: 'UTC',
      setCompanyName: (companyName) => set({ companyName }),
      setCurrency: (currency) => set({ currency }),
      setTimezone: (timezone) => set({ timezone }),

      recentSearches: [],
      addRecentSearch: (url) =>
        set((s) => ({ recentSearches: [url, ...s.recentSearches.filter(u => u !== url)].slice(0, 10) })),
      clearRecentSearches: () => set({ recentSearches: [] }),

      notifications: [],
      addNotification: (message, type = 'info') =>
        set((s) => ({
          notifications: [
            { id: Math.random().toString(36).slice(2), message, type, read: false },
            ...s.notifications,
          ].slice(0, 20),
        })),
      markNotificationRead: (id) =>
        set((s) => ({ notifications: s.notifications.map(n => n.id === id ? { ...n, read: true } : n) })),
      clearNotifications: () => set({ notifications: [] }),
    }),
    { name: 'business-os-store' }
  )
)
