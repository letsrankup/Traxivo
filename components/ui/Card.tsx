'use client'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
  onClick?: () => void
  padding?: 'sm' | 'md' | 'lg' | 'none'
}

const paddings = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export default function Card({
  children, className = '', hover, glow, onClick, padding = 'md'
}: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -2, scale: 1.005 } : undefined}
      onClick={onClick}
      className={`
        glass rounded-2xl border border-white/5
        ${hover ? 'cursor-pointer hover:border-indigo-500/20 hover:shadow-brand transition-all duration-300' : ''}
        ${glow ? 'shadow-brand border-indigo-500/20' : ''}
        ${paddings[padding]}
        ${className}
      `}
    >
      {children}
    </motion.div>
  )
}
