'use client'
import React from 'react'
import { 
  BarChart3, Search, Globe, Zap, LineChart, 
  Users, FileText, CreditCard, ArrowRight, CheckCircle2 
} from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen font-sans selection:bg-sky-500/20 selection:text-slate-900 overflow-x-hidden">
      
      {/* Premium Subdued Sky Linear Subtle Pattern background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#fff_70%,transparent_100%)] pointer-events-none z-0 opacity-60" />

      {/* Top Banner Navigation Bar */}
      <nav className="relative z-10 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 w-full shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-sky-600 rounded-xl shadow-md shadow-sky-600/20">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-xl text-slate-900 tracking-tight">Traxivo</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#features" className="hover:text-sky-600 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-sky-600 transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">Sign In</button>
            <button className="bg-sky-600 hover:bg-sky-500 text-white text-sm font-bold px-4 py-2 rounded-xl transition-all shadow-md shadow-sky-600/10">
              Get Started Free
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section Element Area */}
      <section className="relative z-10 max-w-5xl mx-auto text-center pt-20 pb-16 px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-50 border border-sky-200 rounded-full text-sky-700 text-xs font-bold mb-6">
          <Zap className="w-3.5 h-3.5 text-sky-600" />
          Standalone Business OS for Modern Agencies
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] max-w-3xl mx-auto">
          Your agency, <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-indigo-600">operating at peak</span>
        </h1>
        <p className="text-slate-500 text-base sm:text-lg mt-6 max-w-2xl mx-auto leading-relaxed font-medium">
          Traxivo unifies SEO audits, rank tracking, lead generation, CRM, proposals, and invoicing into one seamless platform — powered by blazing fast native logic, no expensive API keys required.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <button className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-8 py-4 rounded-xl transition-all shadow-lg shadow-slate-900/10 flex items-center justify-center gap-2 group">
            Start Free — No Card Needed
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="w-full sm:w-auto bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-sm px-8 py-4 rounded-xl transition-all shadow-sm">
            Watch Live Demo
          </button>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs text-slate-400 font-semibold">
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Free forever plan</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Secure platform build</span>
        </div>
      </section>

      {/* Mockup Premium Slate Layout Card Panel */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 mb-24">
        <div className="bg-white border border-slate-200 rounded-2xl p-2 sm:p-4 shadow-xl shadow-slate-200/50">
          <div className="bg-slate-50 rounded-xl border border-slate-100 p-4 sm:p-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Revenue MTD</p>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">$84,320</h3>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded mt-1.5 inline-block">+18% this month</span>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Active Leads</p>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">1,240</h3>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded mt-1.5 inline-block">+31% this month</span>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Proposals Sent</p>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">48</h3>
              <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded mt-1.5 inline-block">+9% this month</span>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Avg. SEO Score</p>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">87/100</h3>
              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded mt-1.5 inline-block">+5pt this month</span>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Matrix Feature Area */}
      <section id="features" className="relative z-10 max-w-6xl mx-auto px-4 py-12 border-t border-slate-200">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">One platform. Every tool you need.</h2>
          <p className="text-slate-500 text-sm mt-2 font-medium">Real business mechanics. Built for setups that value execution over manual tasks.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Analytics Dashboard', desc: 'Real-time KPIs, revenue trends, and performance metrics in one unified view.', icon: <BarChart3 className="w-5 h-5 text-sky-600" /> },
            { title: 'SEO Audit Engine', desc: 'Deep crawl, technical analysis, and actionable meta recommendations instantly.', icon: <Search className="w-5 h-5 text-indigo-600" /> },
            { title: 'Website Analyzer', desc: 'Core Web Vitals, accessibility scores, and speed breakdowns at a glance.', icon: <Globe className="w-5 h-5 text-emerald-600" /> },
            { title: 'Leads Finder Engine', desc: 'Pinpoint high-intent enterprise prospects with powered search mapping discovery.', icon: <Zap className="w-5 h-5 text-amber-600" /> },
            { title: 'Rank Tracker', desc: 'Live SERP monitoring across devices, locations, and 50+ search engines.', icon: <LineChart className="w-5 h-5 text-rose-600" /> },
            { title: 'CRM Pipeline', desc: 'Visual pipeline management, contact history, and deal tracking — all connected.', icon: <Users className="w-5 h-5 text-blue-600" /> },
            { title: 'Proposal Builder', desc: 'Beautifully structured, branded business proposals that close deals in under 2 minutes.', icon: <FileText className="w-5 h-5 text-violet-600" /> },
            { title: 'Invoice System', desc: 'Professional invoicing with auto-reminders, lightning ledger payment tracking, and receipts.', icon: <CreditCard className="w-5 h-5 text-teal-600" /> }
          ].map((feat, idx) => (
            <div key={idx} className="bg-white border border-slate-200 p-6 rounded-2xl hover:border-sky-300 transition-all group hover:-translate-y-0.5 shadow-sm">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 w-fit mb-4 group-hover:bg-sky-50 transition-all">
                {feat.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors">{feat.title}</h3>
              <p className="text-slate-500 text-xs mt-2 leading-relaxed font-medium">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Configuration Block */}
      <section id="pricing" className="relative z-10 max-w-6xl mx-auto px-4 py-20 border-t border-slate-200">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">Simple, honest pricing</h2>
          <p className="text-slate-500 text-sm mt-2 font-medium">Start free, scale when you are ready. Absolute freedom without hidden operational charges.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Starter</h3>
              <p className="text-slate-500 text-xs mt-1">Perfect for freelancers getting started.</p>
              <div className="my-6">
                <span className="text-3xl font-black text-slate-900">Free</span>
                <span className="text-slate-400 text-xs font-semibold">/forever</span>
              </div>
              <ul className="space-y-3 border-t border-slate-100 pt-6 text-xs text-slate-600 font-medium">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0" /> 5 SEO audits / month</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0" /> Rank tracker (10 keywords)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0" /> Basic CRM Modules</li>
              </ul>
            </div>
            <button className="w-full mt-8 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-3 rounded-xl transition-all">Get Started Free</button>
          </div>

          <div className="bg-white border-2 border-sky-500 rounded-2xl p-6 flex flex-col justify-between relative shadow-md shadow-sky-100 transform lg:-translate-y-1">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sky-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Most Popular</div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Growth</h3>
              <p className="text-slate-500 text-xs mt-1">For agencies ready to scale fast.</p>
              <div className="my-6">
                <span className="text-3xl font-black text-slate-900">$49</span>
                <span className="text-slate-400 text-xs font-semibold">/month</span>
              </div>
              <ul className="space-y-3 border-t border-slate-100 pt-6 text-xs text-slate-600 font-medium">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0" /> Unlimited SEO audits</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0" /> Rank tracker (500 keywords)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0" /> Full CRM pipeline ledger</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0" /> Enterprise Leads Finder</li>
              </ul>
            </div>
            <button className="w-full mt-8 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-md shadow-sky-600/20">Start 14-day free trial</button>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Enterprise</h3>
              <p className="text-slate-500 text-xs mt-1">For setups with custom scaling needs.</p>
              <div className="my-6">
                <span className="text-3xl font-black text-slate-900">Custom</span>
              </div>
              <ul className="space-y-3 border-t border-slate-100 pt-6 text-xs text-slate-600 font-medium">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-slate-400 flex-shrink-0" /> Everything in Growth plan</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-slate-400 flex-shrink-0" /> Custom integrations options</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-slate-400 flex-shrink-0" /> Dedicated SLA guarantee nodes</li>
              </ul>
            </div>
            <button className="w-full mt-8 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-3 rounded-xl transition-all">Talk to Sales</button>
          </div>
        </div>
      </section>

      {/* Global Interface Footer */}
      <footer className="border-t border-slate-200 bg-white py-12 relative z-10 text-xs text-slate-400 font-medium">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 text-left">
          <div>
            <span className="font-bold text-slate-800 block mb-3">Product</span>
            <div className="space-y-2 flex flex-col">
              <a href="#" className="hover:text-slate-600">Features</a>
              <a href="#" className="hover:text-slate-600">Pricing</a>
            </div>
          </div>
          <div>
            <span className="font-bold text-slate-800 block mb-3">Company</span>
            <div className="space-y-2 flex flex-col">
              <a href="#" className="hover:text-slate-600">About</a>
              <a href="#" className="hover:text-slate-600">Careers</a>
            </div>
          </div>
          <div>
            <span className="font-bold text-slate-800 block mb-3">Legal</span>
            <div className="space-y-2 flex flex-col">
              <a href="#" className="hover:text-slate-600">Privacy</a>
              <a href="#" className="hover:text-slate-600">Terms</a>
            </div>
          </div>
          <div>
            <span className="font-bold text-slate-800 block mb-3">Traxivo</span>
            <p className="leading-relaxed">The all-in-one standalone business operating system built for hyper scale.</p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <span>© 2026 Traxivo. All rights reserved.</span>
          <span className="text-emerald-600 flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> All systems operational</span>
        </div>
      </footer>

    </div>
  )
                  }
