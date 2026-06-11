'use client'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  icon?: ReactNode
  className?: string
  fullWidth?: boolean
}

const variants = {
  primary: 'bg-brand-gradient text-white hover:opacity-90 glow-brand',
  secondary: 'bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20',
  ghost: 'text-slate-400 hover:text-white hover:bg-white/5',
  danger: 'bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20',
  success: 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20',
}

const sizes = {
  sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
  md: 'px-4 py-2.5 text-sm rounded-xl gap-2',
  lg: 'px-6 py-3.5 text-base rounded-2xl gap-2.5',
}

export default function Button({
  children, onClick, variant = 'primary', size = 'md',
  loading, disabled, icon, className = '', fullWidth
}: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.01 }}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center font-medium transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : icon ? (
        <span className="flex-shrink-0">{icon}</span>
      ) : null}
      {children}
    </motion.button>
  )
}
