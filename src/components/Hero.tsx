import { ArrowRight, Play, ShieldCheck, Star, Zap, Lock } from "lucide-react";
import Terminal from "./Terminal";
import { Reveal, Counter } from "../lib";

export default function Hero() {
  return (
    <section id="top" className="noise relative overflow-hidden pt-[150px] pb-16 sm:pt-[168px] lg:pb-24">
      {/* ambient background */}
      <div className="grid-bg absolute inset-0" aria-hidden="true" />
      <div className="absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-[#b8f135]/[0.09] blur-[140px]" aria-hidden="true" style={{ animation: "glowPulse 6s ease-in-out infinite" }} />
      <div className="absolute top-40 -left-40 h-96 w-96 rounded-full bg-[#2ee6a8]/[0.07] blur-[110px]" aria-hidden="true" />
      <div className="absolute top-64 -right-32 h-96 w-96 rounded-full bg-[#b8f135]/[0.05] blur-[110px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_.98fr] lg:gap-10">
          {/* Copy */}
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-[12px] font-medium text-white/75">
                <span className="flex text-[#b8f135]">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
                </span>
                4.9/5 from 12,400+ traders
                <span className="h-3 w-px bg-white/20" />
                <span className="text-[#b8f135]">Fund III open</span>
              </span>
            </Reveal>

            <Reveal delay={90}>
              <h1 className="mt-6 font-display text-[42px] font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-[68px]">
                Trade crypto like an <span className="text-gradient">institution.</span>
                <br className="hidden sm:block" /> Keep the upside.
              </h1>
            </Reveal>

            <Reveal delay={180}>
              <p className="mt-6 max-w-xl text-[16.5px] leading-relaxed text-white/60 sm:text-lg">
                Apex Quant is a crypto-native trading firm that runs professional-grade
                strategies — market-neutral, trend-following and volatility-harvest — so you
                can invest alongside the desk, not against it. No lock-ups. No black boxes.
                Just disciplined execution, transparent reporting and returns that compound.
              </p>
            </Reveal>

            <Reveal delay={270}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a href="#cta" className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#b8f135] px-7 py-4 text-[15px] font-semibold text-black shadow-[0_0_36px_rgba(184,241,53,.3)] transition hover:bg-[#d9ff7a] hover:shadow-[0_0_48px_rgba(184,241,53,.5)] hover:-translate-y-0.5">
                  Invest with Apex
                  <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
                </a>
                <a href="#platform" className="group inline-flex items-center justify-center gap-2.5 rounded-full glass px-7 py-4 text-[15px] font-semibold text-white transition hover:bg-white/[0.08]">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-[#b8f135]/15 text-[#b8f135] transition group-hover:scale-110">
                    <Play className="h-3 w-3 fill-current" />
                  </span>
                  Watch the desk (2 min)
                </a>
              </div>
            </Reveal>

            <Reveal delay={360}>
              <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-white/55">
                <li className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-[#2ee6a8]" /> Audited custody</li>
                <li className="flex items-center gap-1.5"><Lock className="h-4 w-4 text-[#2ee6a8]" /> SOC 2 Type II</li>
                <li className="flex items-center gap-1.5"><Zap className="h-4 w-4 text-[#2ee6a8]" /> Withdraw in &lt; 24h</li>
              </ul>
            </Reveal>

            {/* Stats */}
            <Reveal delay={450}>
              <dl className="mt-10 grid grid-cols-3 divide-x divide-white/[0.08] rounded-2xl glass py-5">
                {[
                  { v: 847, prefix: "$", suffix: "M", label: "AUM under management", dec: 0 },
                  { v: 38.4, prefix: "", suffix: "%", label: "2024 net return*", dec: 1 },
                  { v: 12400, prefix: "", suffix: "+", label: "Investors worldwide", dec: 0 },
                ].map((s) => (
                  <div key={s.label} className="px-4 text-center sm:px-6">
                    <dd className="font-display text-xl font-bold sm:text-[26px]">
                      <Counter value={s.v} prefix={s.prefix} suffix={s.suffix} decimals={s.dec} />
                    </dd>
                    <dt className="mt-1 text-[11px] leading-tight text-white/45 sm:text-xs">{s.label}</dt>
                  </div>
                ))}
              </dl>
              <p className="mt-2 text-[10px] text-white/30">*Past performance does not guarantee future results. See disclosures.</p>
            </Reveal>
          </div>

          {/* Terminal */}
          <Reveal delay={250} className="relative">
            <div className="absolute -inset-6 rounded-[36px] bg-gradient-to-br from-[#b8f135]/15 via-transparent to-[#2ee6a8]/10 blur-2xl" aria-hidden="true" />
            <div className="relative animate-float-slow">
              <Terminal />
            </div>
            {/* floating cards */}
            <div className="glass-strong absolute -left-3 top-16 hidden animate-float items-center gap-3 rounded-2xl px-4 py-3 shadow-xl sm:flex lg:-left-10" aria-hidden="true">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#2ee6a8]/15 text-[#2ee6a8]"><Zap className="h-4.5 w-4.5" /></span>
              <div>
                <p className="text-xs font-semibold">Fill in 12ms</p>
                <p className="font-mono text-[10px] text-white/45">co-located · 14 venues</p>
              </div>
            </div>
            <div className="glass-strong absolute -right-2 bottom-24 hidden animate-float items-center gap-3 rounded-2xl px-4 py-3 shadow-xl sm:flex lg:-right-6" style={{ animationDelay: "1.4s" }} aria-hidden="true">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#b8f135]/15 text-[#b8f135]"><ShieldCheck className="h-4.5 w-4.5" /></span>
              <div>
                <p className="text-xs font-semibold">Max drawdown −6.2%</p>
                <p className="font-mono text-[10px] text-white/45">trailing 36 months</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
