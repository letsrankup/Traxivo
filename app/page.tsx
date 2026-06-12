'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import {
  BarChart3, Search, Globe, Users, TrendingUp,
  FileText, DollarSign, Zap, ArrowRight, CheckCircle,
  Star, Shield, Sparkles, ChevronRight, Play, Menu, X,
  MousePointer2, Layers, Activity, Clock
} from 'lucide-react'

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS = ['Features', 'Pricing', 'About', 'Blog']

const FEATURES = [
  {
    icon: BarChart3,
    label: 'Analytics Dashboard',
    desc: 'Real-time KPIs, revenue trends, and performance metrics in one unified view.',
    color: '#6366f1',
    bg: 'rgba(99,102,241,0.08)',
    border: 'rgba(99,102,241,0.2)',
  },
  {
    icon: Search,
    label: 'SEO Audit Engine',
    desc: 'Deep crawl, technical analysis, and actionable recommendations — instantly.',
    color: '#a855f7',
    bg: 'rgba(168,85,247,0.08)',
    border: 'rgba(168,85,247,0.2)',
  },
  {
    icon: Globe,
    label: 'Website Analyzer',
    desc: 'Core Web Vitals, accessibility scores, and speed breakdowns at a glance.',
    color: '#06b6d4',
    bg: 'rgba(6,182,212,0.08)',
    border: 'rgba(6,182,212,0.2)',
  },
  {
    icon: Zap,
    label: 'AI Leads Finder',
    desc: 'Pinpoint high-intent prospects with AI-powered discovery and scoring.',
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.08)',
    border: 'rgba(245,158,11,0.2)',
  },
  {
    icon: TrendingUp,
    label: 'Rank Tracker',
    desc: 'Live SERP monitoring across devices, locations, and 50+ search engines.',
    color: '#10b981',
    bg: 'rgba(16,185,129,0.08)',
    border: 'rgba(16,185,129,0.2)',
  },
  {
    icon: Users,
    label: 'CRM Pipeline',
    desc: 'Visual pipeline management, contact history, and deal tracking — all connected.',
    color: '#ec4899',
    bg: 'rgba(236,72,153,0.08)',
    border: 'rgba(236,72,153,0.2)',
  },
  {
    icon: FileText,
    label: 'Proposal Builder',
    desc: 'AI-generated, branded proposals that close deals — sent in under 2 minutes.',
    color: '#3b82f6',
    bg: 'rgba(59,130,246,0.08)',
    border: 'rgba(59,130,246,0.2)',
  },
  {
    icon: DollarSign,
    label: 'Invoice System',
    desc: 'Professional invoicing with auto-reminders, payment tracking, and receipts.',
    color: '#14b8a6',
    bg: 'rgba(20,184,166,0.08)',
    border: 'rgba(20,184,166,0.2)',
  },
]

const STATS = [
  { value: '150+', label: 'Integrated tools', icon: Layers },
  { value: '99.9%', label: 'Uptime SLA', icon: Shield },
  { value: '10x', label: 'Faster insights', icon: Activity },
  { value: '<2min', label: 'Avg. onboarding', icon: Clock },
]

const TESTIMONIALS = [
  {
    name: 'Sarah Chen',
    role: 'Head of Growth · Bloom Agency',
    avatar: 'SC',
    text: 'Traxivo replaced five separate tools. Our team saves 12+ hours every week and closes 40% more proposals.',
    rating: 5,
  },
  {
    name: 'Marcus Webb',
    role: 'Founder · Velocity SEO',
    avatar: 'MW',
    text: "The SEO audit engine is frighteningly good. I've tried everything — nothing comes close to this depth.",
    rating: 5,
  },
  {
    name: 'Priya Nair',
    role: 'Digital Strategist · NovaGroup',
    avatar: 'PN',
    text: 'Finally, a platform that actually connects my pipeline to my invoices. The AI proposals alone pay for it.',
    rating: 5,
  },
]

const PRICING = [
  {
    name: 'Starter',
    price: 'Free',
    period: 'forever',
    desc: 'Perfect for freelancers getting started.',
    features: ['5 SEO audits / month', 'Rank tracker (10 keywords)', 'Basic CRM', '2 proposals / month', 'Email support'],
    cta: 'Get started free',
    highlight: false,
  },
  {
    name: 'Growth',
    price: '$49',
    period: 'per month',
    desc: 'For agencies ready to scale fast.',
    features: ['Unlimited SEO audits', 'Rank tracker (500 keywords)', 'Full CRM + pipeline', 'Unlimited proposals', 'AI Leads Finder', 'Priority support'],
    cta: 'Start 14-day trial',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'pricing',
    desc: 'For teams with custom requirements.',
    features: ['Everything in Growth', 'White-label reports', 'Custom integrations', 'Dedicated CSM', 'SLA guarantee', 'Team training'],
    cta: 'Talk to sales',
    highlight: false,
  },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
})

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
})

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRow({ count = 5 }: { count?: number }) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
      ))}
    </span>
  )
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase"
      style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)', color: '#a5b4fc' }}>
      {children}
    </div>
  )
}

// ─── Sections ─────────────────────────────────────────────────────────────────

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(5,5,8,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg,#6366f1,#a855f7)', boxShadow: '0 0 20px rgba(99,102,241,0.4)' }}>
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold text-white tracking-tight">Traxivo</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <Link key={link} href={`#${link.toLowerCase()}`}
              className="text-sm text-slate-400 hover:text-white transition-colors duration-200 font-medium">
              {link}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login"
            className="text-sm text-slate-400 hover:text-white transition-colors font-medium px-3 py-2">
            Sign in
          </Link>
          <Link href="/register"
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg,#6366f1,#a855f7)',
              boxShadow: '0 0 24px rgba(99,102,241,0.35)',
            }}>
            Get started free <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button className="md:hidden text-slate-400 hover:text-white" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-4"
          style={{ background: 'rgba(5,5,8,0.97)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          {NAV_LINKS.map(link => (
            <Link key={link} href={`#${link.toLowerCase()}`}
              className="text-slate-300 text-sm font-medium py-1" onClick={() => setOpen(false)}>
              {link}
            </Link>
          ))}
          <Link href="/register"
            className="mt-2 px-5 py-3 rounded-xl text-sm font-semibold text-white text-center"
            style={{ background: 'linear-gradient(135deg,#6366f1,#a855f7)' }}>
            Get started free
          </Link>
        </div>
      )}
    </nav>
  )
}

function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
      {/* Ambient background orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(ellipse,rgba(99,102,241,0.12) 0%,transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[400px]"
          style={{ background: 'radial-gradient(ellipse,rgba(168,85,247,0.08) 0%,transparent 70%)' }} />
        <div className="absolute top-0 right-0 w-[400px] h-[400px]"
          style={{ background: 'radial-gradient(ellipse,rgba(6,182,212,0.06) 0%,transparent 70%)' }} />
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)',
            backgroundSize: '80px 80px',
          }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div {...fadeUp(0)} className="mb-6">
          <Badge>
            <Sparkles className="w-3 h-3" />
            AI-Powered Business OS for Modern Agencies
          </Badge>
        </motion.div>

        <motion.h1 {...fadeUp(0.08)}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[82px] font-black leading-[1.05] tracking-tight mb-6">
          <span className="text-white">Your agency, </span>
          <span style={{ background: 'linear-gradient(135deg,#6366f1 0%,#a855f7 50%,#06b6d4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            operating at peak
          </span>
        </motion.h1>

        <motion.p {...fadeUp(0.14)}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10 font-light">
          Traxivo unifies SEO audits, rank tracking, lead generation, CRM, proposals,
          and invoicing into one seamless platform — powered by AI, no API keys required.
        </motion.p>

        <motion.div {...fadeUp(0.2)} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link href="/register"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-white font-semibold text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg,#6366f1,#a855f7)',
              boxShadow: '0 0 40px rgba(99,102,241,0.4), inset 0 1px 0 rgba(255,255,255,0.15)',
            }}>
            Start free — no card needed <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/dashboard"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-base text-white transition-all duration-300 hover:border-indigo-500/50"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <Play className="w-4 h-4 fill-white" /> Watch demo
          </Link>
        </motion.div>

        {/* Trust bar */}
        <motion.div {...fadeIn(0.3)} className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-slate-500">
          {[
            { icon: CheckCircle, text: 'Free forever plan' },
            { icon: Shield, text: 'SOC 2 compliant' },
            { icon: Star, text: '4.9/5 from 600+ reviews' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2">
              <Icon className="w-4 h-4 text-indigo-400" />
              <span>{text}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Hero dashboard preview mockup */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mt-20 max-w-5xl w-full mx-auto px-4">
        <div className="rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 40px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
          }}>
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-5 py-3.5"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
            <span className="w-3 h-3 rounded-full bg-red-500/70" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <span className="w-3 h-3 rounded-full bg-green-500/70" />
            <div className="ml-4 flex-1 max-w-xs h-6 rounded-lg"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center h-full px-3 text-xs text-slate-500">app.traxivo.io/dashboard</div>
            </div>
          </div>
          {/* Mock dashboard content */}
          <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Revenue MTD', value: '$84,320', change: '+18%', color: '#6366f1' },
              { label: 'Active Leads', value: '1,240', change: '+31%', color: '#10b981' },
              { label: 'Proposals Sent', value: '48', change: '+9%', color: '#a855f7' },
              { label: 'Avg. SEO Score', value: '87/100', change: '+5pt', color: '#f59e0b' },
            ].map(card => (
              <div key={card.label} className="rounded-xl p-4"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="text-xs text-slate-500 mb-2">{card.label}</div>
                <div className="text-xl font-bold text-white mb-1">{card.value}</div>
                <div className="text-xs font-semibold" style={{ color: card.color }}>{card.change} this month</div>
              </div>
            ))}
          </div>
          {/* Mock chart bar */}
          <div className="px-6 pb-6">
            <div className="rounded-xl p-4"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="text-xs text-slate-500 mb-4">Revenue last 7 days</div>
              <div className="flex items-end gap-2 h-20">
                {[40, 65, 50, 80, 60, 90, 75].map((h, i) => (
                  <div key={i} className="flex-1 rounded-md transition-all"
                    style={{
                      height: `${h}%`,
                      background: i === 5
                        ? 'linear-gradient(180deg,#6366f1,#a855f7)'
                        : 'rgba(99,102,241,0.2)',
                    }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

function StatsBar() {
  return (
    <section className="py-12 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {STATS.map((s, i) => (
          <motion.div key={i} {...fadeUp(i * 0.07)} className="flex flex-col items-center text-center gap-2 py-4">
            <s.icon className="w-5 h-5 text-indigo-400 mb-1" />
            <div className="text-3xl font-black text-white tracking-tight">{s.value}</div>
            <div className="text-sm text-slate-500">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp()} className="text-center mb-16">
          <Badge><Layers className="w-3 h-3" /> Platform features</Badge>
          <h2 className="mt-5 text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            One platform.<br />
            <span style={{ background: 'linear-gradient(135deg,#6366f1,#a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Every tool you need.
            </span>
          </h2>
          <p className="mt-4 text-slate-400 text-lg max-w-xl mx-auto">
            Real data. Zero fluff. Built for agencies that value speed and results over everything.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f, i) => (
            <motion.div key={i} {...fadeUp(i * 0.06)}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative rounded-2xl p-6 cursor-pointer transition-all duration-300"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: `1px solid rgba(255,255,255,0.08)`,
              }}>
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `radial-gradient(circle at 30% 30%,${f.color}08,transparent 60%)`, border: `1px solid ${f.border}` }} />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: f.bg, border: `1px solid ${f.border}` }}>
                  <f.icon className="w-5 h-5" style={{ color: f.color }} />
                </div>
                <h3 className="text-white font-semibold text-base mb-2 leading-snug">{f.label}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>

                <div className="mt-5 flex items-center gap-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ color: f.color }}>
                  Explore <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section className="py-24 px-6" style={{ background: 'rgba(255,255,255,0.015)' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeUp()} className="text-center mb-14">
          <Badge><Star className="w-3 h-3 fill-current" /> Customer stories</Badge>
          <h2 className="mt-5 text-4xl md:text-5xl font-black text-white tracking-tight">
            Agencies love Traxivo
          </h2>
          <p className="mt-3 text-slate-400 text-lg">Don't take our word for it.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={i} {...fadeUp(i * 0.1)}
              className="relative rounded-2xl p-7 flex flex-col gap-4"
              style={{
                background: 'rgba(255,255,255,0.035)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}>
              <StarRow count={t.rating} />
              <p className="text-slate-300 text-sm leading-relaxed flex-1">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg,#6366f1,#a855f7)' }}>
                  {t.avatar}
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">{t.name}</div>
                  <div className="text-slate-500 text-xs">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeUp()} className="text-center mb-14">
          <Badge><DollarSign className="w-3 h-3" /> Pricing</Badge>
          <h2 className="mt-5 text-4xl md:text-5xl font-black text-white tracking-tight">
            Simple, honest pricing
          </h2>
          <p className="mt-3 text-slate-400 text-lg max-w-md mx-auto">Start free, scale when you're ready. No hidden fees, ever.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {PRICING.map((plan, i) => (
            <motion.div key={i} {...fadeUp(i * 0.1)}
              className="relative rounded-2xl p-8"
              style={{
                background: plan.highlight
                  ? 'linear-gradient(145deg,rgba(99,102,241,0.15),rgba(168,85,247,0.08))'
                  : 'rgba(255,255,255,0.03)',
                border: plan.highlight ? '1px solid rgba(99,102,241,0.4)' : '1px solid rgba(255,255,255,0.08)',
                boxShadow: plan.highlight ? '0 0 60px rgba(99,102,241,0.12)' : 'none',
              }}>
              {plan.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white"
                  style={{ background: 'linear-gradient(135deg,#6366f1,#a855f7)', boxShadow: '0 0 20px rgba(99,102,241,0.4)' }}>
                  Most popular
                </div>
              )}
              <div className="mb-6">
                <div className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2">{plan.name}</div>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-4xl font-black text-white">{plan.price}</span>
                  <span className="text-slate-500 text-sm mb-1">/{plan.period}</span>
                </div>
                <p className="text-slate-500 text-sm">{plan.desc}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feat, fi) => (
                  <li key={fi} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>

              <Link href="/register"
                className="block w-full text-center py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90"
                style={plan.highlight
                  ? { background: 'linear-gradient(135deg,#6366f1,#a855f7)', color: '#fff', boxShadow: '0 0 24px rgba(99,102,241,0.3)' }
                  : { background: 'rgba(255,255,255,0.06)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}>
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div {...fadeUp()}
          className="relative rounded-3xl px-8 py-16 text-center overflow-hidden"
          style={{
            background: 'linear-gradient(135deg,rgba(99,102,241,0.15),rgba(168,85,247,0.1))',
            border: '1px solid rgba(99,102,241,0.25)',
            boxShadow: '0 0 80px rgba(99,102,241,0.1)',
          }}>
          {/* Background accent */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-1/3 w-64 h-64 rounded-full"
              style={{ background: 'radial-gradient(circle,rgba(168,85,247,0.12),transparent 70%)' }} />
            <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full"
              style={{ background: 'radial-gradient(circle,rgba(6,182,212,0.08),transparent 70%)' }} />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
              style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', color: '#a5b4fc' }}>
              <Sparkles className="w-3 h-3" /> Join 2,000+ growing agencies
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight leading-tight">
              Ready to run your agency<br />smarter?
            </h2>
            <p className="text-slate-400 text-lg max-w-lg mx-auto mb-10">
              Get started in minutes. No credit card, no commitment — just results.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register"
                className="flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: 'linear-gradient(135deg,#6366f1,#a855f7)',
                  boxShadow: '0 0 40px rgba(99,102,241,0.4), inset 0 1px 0 rgba(255,255,255,0.15)',
                }}>
                Start free today <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact"
                className="flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-slate-300 transition-all duration-300 hover:text-white"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <MousePointer2 className="w-4 h-4" /> Talk to sales
              </Link>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm text-slate-500">
              {['No credit card required', 'Cancel anytime', '14-day free trial on Growth'].map(text => (
                <div key={text} className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-indigo-400" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Footer() {
  const links = {
    Product: ['Features', 'Pricing', 'Changelog', 'Roadmap'],
    Company: ['About', 'Blog', 'Careers', 'Press'],
    Resources: ['Docs', 'API Reference', 'Status', 'Community'],
    Legal: ['Privacy', 'Terms', 'Security', 'Cookies'],
  }

  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }} className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg,#6366f1,#a855f7)' }}>
                <Zap className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-bold text-white">Traxivo</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              The all-in-one business OS for digital agencies. Built for scale.
            </p>
          </div>
          {/* Link columns */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <div className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">{title}</div>
              <ul className="space-y-2.5">
                {items.map(item => (
                  <li key={item}>
                    <Link href="#" className="text-sm text-slate-500 hover:text-slate-300 transition-colors duration-200">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <span className="text-slate-600 text-sm">© {new Date().getFullYear()} Traxivo. All rights reserved.</span>
          <div className="flex items-center gap-1.5 text-slate-600 text-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div style={{ background: '#050508', color: '#f1f5f9', fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
      className="min-h-screen antialiased">
      <Navbar />
      <Hero />
      <StatsBar />
      <Features />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  )
                  }
