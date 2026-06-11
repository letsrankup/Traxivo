'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Zap, Mail, Lock, User, Eye, EyeOff, ArrowRight, CheckCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import toast from 'react-hot-toast'

const perks = [
  'SEO Audit & Website Analyzer',
  'AI Lead Finder (No API key)',
  'CRM + Proposal Builder',
  'Invoice System + Reports',
]

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleRegister = async () => {
    if (!name || !email || !password) return toast.error('Fill all fields')
    if (password.length < 6) return toast.error('Password min 6 characters')
    setLoading(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name },
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      })
      if (error) throw error
      toast.success('Account created! Check your email.')
      router.push('/dashboard')
    } catch (err: any) {
      toast.error(err.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen animated-bg flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left - Perks */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden md:block"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-brand-gradient flex items-center justify-center glow-brand">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-black gradient-text">Traxivo</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">
            The Business OS<br />
            <span className="gradient-text">Built for Winners</span>
          </h2>
          <p className="text-slate-400 mb-8 leading-relaxed">
            Everything you need to find leads, close deals, and grow your business — powered by live data and AI.
          </p>
          <div className="space-y-3">
            {perks.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-3"
              >
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-slate-300 text-sm">{p}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right - Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-6 md:hidden">
            <div className="inline-flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-brand-gradient flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-black gradient-text">Traxivo</span>
            </div>
          </div>

          <div className="glass rounded-3xl p-8 border border-white/8 shadow-glass">
            <h1 className="text-xl font-bold text-white mb-1">Create Account</h1>
            <p className="text-slate-400 text-sm mb-6">Free forever. No credit card.</p>

            <div className="space-y-4 mb-6">
              {/* Name */}
              <div>
                <label className="text-slate-400 text-xs font-medium mb-2 block">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="John Smith"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-brand/50 transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-slate-400 text-xs font-medium mb-2 block">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-brand/50 transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-slate-400 text-xs font-medium mb-2 block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleRegister()}
                    placeholder="Min 6 characters"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-10 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-brand/50 transition-all"
                  />
                  <button
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-brand-gradient text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all glow-brand disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Create Free Account <ArrowRight className="w-4 h-4" /></>
              )}
            </button>

            <p className="text-center text-slate-500 text-xs mt-4">
              By signing up you agree to our Terms & Privacy Policy
            </p>

            <p className="text-center text-slate-500 text-sm mt-4">
              Have account?{' '}
              <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
                                                }
