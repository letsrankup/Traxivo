'use client'
import { ReactNode, InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: ReactNode
  suffix?: ReactNode
  hint?: string
}

export default function Input({
  label, error, icon, suffix, hint, className = '', ...props
}: InputProps) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="text-slate-400 text-xs font-medium block">{label}</label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          {...props}
          className={`
            w-full bg-white/5 border rounded-xl py-2.5 text-white placeholder-slate-600 text-sm
            focus:outline-none transition-all duration-200
            ${error
              ? 'border-red-500/50 focus:border-red-500'
              : 'border-white/10 focus:border-indigo-500/50 focus:bg-white/8'
            }
            ${icon ? 'pl-10' : 'pl-4'}
            ${suffix ? 'pr-10' : 'pr-4'}
            ${className}
          `}
        />
        {suffix && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
            {suffix}
          </div>
        )}
      </div>
      {error && <p className="text-red-400 text-xs">{error}</p>}
      {hint && !error && <p className="text-slate-500 text-xs">{hint}</p>}
    </div>
  )
}
