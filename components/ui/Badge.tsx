import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple'
  size?: 'sm' | 'md'
  dot?: boolean
}

const variants = {
  default: 'bg-slate-500/15 text-slate-300 border-slate-500/20',
  success: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  warning: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
  danger:  'bg-red-500/15 text-red-400 border-red-500/20',
  info:    'bg-blue-500/15 text-blue-400 border-blue-500/20',
  purple:  'bg-purple-500/15 text-purple-400 border-purple-500/20',
}

const dotColors = {
  default: 'bg-slate-400',
  success: 'bg-emerald-400',
  warning: 'bg-amber-400',
  danger:  'bg-red-400',
  info:    'bg-blue-400',
  purple:  'bg-purple-400',
}

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
}

export default function Badge({
  children, variant = 'default', size = 'md', dot
}: BadgeProps) {
  return (
    <span className={`
      inline-flex items-center gap-1.5 font-medium rounded-full border
      ${variants[variant]} ${sizes[size]}
    `}>
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotColors[variant]}`} />
      )}
      {children}
    </span>
  )
}
