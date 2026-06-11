'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  BarChart3, Search, Globe, Users, TrendingUp,
  FileText, DollarSign, Zap, ArrowRight, CheckCircle, Star
} from 'lucide-react'

const features = [
  { icon: BarChart3, label: 'Dashboard', desc: 'Real-time business metrics & KPIs', color: '#6366f1' },
  { icon: Search, label: 'SEO Audit', desc: 'Deep technical SEO analysis', color: '#8b5cf6' },
  { icon: Globe, label: 'Website Analyzer', desc: 'Full site performance breakdown', color: '#06b6d4' },
  { icon: Zap, label: 'Leads Finder', desc: 'AI-powered prospect discovery', color: '#f59e0b' },
  { icon: TrendingUp, label: 'Rank Tracker', desc: 'Live SERP position monitoring', color: '#10b981' },
  { icon: Users, label: 'CRM', desc: 'Contact & pipeline management', color: '#ec4899' },
  { icon: FileText, label: 'Proposals', desc: 'AI-generated winning proposals', color: '#3b82f6' },
  { icon: DollarSign, label: 'Invoices', desc: 'Professional invoice system', color: '#14b8a6' },
]

const stats = [
  { value: '150+', label: 'Features' },
  { value: '99%', label: 'Uptime' },
  { value: '10x', label: 'Faster Insights' },
  { value: 'Free', label: 'Core Tools' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen animated-bg">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center glow-brand">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">Traxivo</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-slate-400 hover:text-white transition-colors text-sm">
              Login
            </Link>
            <Link href="/register"
              className="px-4 py-2 rounded-xl bg-brand-gradient text-white text-sm font-medium hover:opacity-90 transition-opacity glow-brand">
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-brand/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-brand/30 text-brand-300 text-sm mb-6">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span>AI-Powered Business Operating System</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="gradient-text">Grow Faster</span>
            <br />
            <span className="text-white">with Traxivo</span>
          </h1>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            All-in-one platform for SEO audits, lead generation, CRM, proposals,
            invoices and AI-powered business intelligence. No API keys needed.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/register"
              className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-brand-gradient text-white font-semibold text-lg hover:opacity-90 transition-all glow-brand">
              Start Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/dashboard"
              className="flex items-center gap-2 px-8 py-4 rounded-2xl glass border border-white/10 text-white font-semibold text-lg hover:border-brand/50 transition-all">
              Live Demo
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 text-center border border-white/5">
              <div className="text-3xl font-black gradient-text">{s.value}</div>
              <div className="text-slate-400 text-sm mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-4">
            Everything Your Business Needs
          </h2>
          <p className="text-slate-400 text-center mb-12">Real live data. No fake numbers. No API keys required.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.07 }}
                className="glass glass-hover rounded-2xl p-6 cursor-pointer border border-white/5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${f.color}20`, border: `1px solid ${f.color}40` }}>
                  <f.icon className="w-6 h-6" style={{ color: f.color }} />
                </div>
                <h3 className="text-white font-semibold mb-1">{f.label}</h3>
                <p className="text-slate-400 text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center glass rounded-3xl p-12 border border-brand/20">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Scale?</h2>
          <p className="text-slate-400 mb-8">Join businesses using Traxivo to dominate their market.</p>
          <Link href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-brand-gradient text-white font-semibold hover:opacity-90 transition glow-brand">
            Get Started Free <ArrowRight className="w-5 h-5" />
          </Link>
          <div className="mt-6 flex items-center justify-center gap-2 text-slate-500 text-sm">
            <CheckCircle className="w-4 h-4 text-green-400" />
            No credit card required
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/5 text-center text-slate-500 text-sm">
        © 2024 Traxivo. Built for modern businesses.
      </footer>
    </div>
  )
}
