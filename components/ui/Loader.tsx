'use client'
import { motion } from 'framer-motion'

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  fullScreen?: boolean
}

export default function Loader({ size = 'md', text, fullScreen }: LoaderProps) {
  const sizes = { sm: 'w-6 h-6', md: 'w-10 h-10', lg: 'w-16 h-16' }

  const content = (
    <div className="flex flex-col items-center gap-4">
      <div className={`relative ${sizes[size]}`}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className={`${sizes[size]} border-2 border-white/10 border-t-indigo-500 rounded-full`}
        />
        <div className="absolute inset-2 bg-brand-gradient rounded-full opacity-30 animate-pulse" />
      </div>
      {text && (
        <div className="flex flex-col items-center gap-2">
          <p className="text-slate-300 text-sm font-medium">{text}</p>
          <div className="flex gap-1">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                className="w-1.5 h-1.5 bg-indigo-500 rounded-full"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 animated-bg flex items-center justify-center">
        {content}
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center py-12">
      {content}
    </div>
  )
}
