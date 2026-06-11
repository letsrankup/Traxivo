'use client'
import { createContext, useContext } from 'react'

const AppGlobalStateContext = createContext<any>(null)

export const AppStateProvider = AppGlobalStateContext.Provider

export function useGlobalAppState() {
  const context = useContext(AppGlobalStateContext)
  return context || {}
}
