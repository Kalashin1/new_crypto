import { Activity, BarChart3, Bot, Gauge, Layers, Lock, RefreshCw, ShieldCheck, Waves } from "lucide-react";
import { Reveal, Counter } from "../lib";

const features = [
  {
    icon: Bot, title: "Algorithmic execution", desc: "TWAP, VWAP and iceberg algorithms route every order across 14 venues for the tightest fill — never a market order in a thin book.",
    stat: "12ms", statLabel: "median fill latency", span: "md:col-span-2", accent: true,
  },
  {
    icon: ShieldCheck, title: "Real-time risk engine", desc: "Position, drawdown and exposure limits enforced in microseconds. The desk can’t blow up — by design, not by hope.",
    stat: "−6.2%", statLabel: "max drawdown (36m)", span: "",
  },
  {
    icon: Waves, title: "Market-neutral core", desc: "Long/short basis and funding-rate harvesting that earns in sideways markets — where most retail accounts bleed.",
    stat: "0.42", statLabel: "beta to BTC", span: "",
  },
  {
    icon: BarChart3, title: "Transparent reporting", desc: "Every position, fee and fill is visible in your dashboard. Third-party proof-of-reserves, monthly.",
    stat: "100%", statLabel: "position visibility", span: "",
  },
  {
    icon: Gauge, title: "Dynamic allocation", desc: "Capital rotates between strategies as regimes shift — momentum in trends, carry in ranges, cash in chaos.",
    stat: "24/7", statLabel: "regime monitoring", span: "",
  },
  {
    icon: Lock, title: "Institutional custody", desc: "Assets held with regulated custodians, multi-sig cold storage and $250M crime insurance. We never touch your keys.",
    stat: "$250M", statLabel: "insurance cover", span: "md:col-span-2",
  },
];

export default function Features() {
  return (
    <section id="platform" className="relative py-24 sm:py-32">
      <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#b8f135]">The platform</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Built like a hedge fund.<br /><span className="text-white/45">Open to anyone with conviction.</span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 text-[16px] leading-relaxed text-white/55">
              The same infrastructure our traders use to manage $847M — now packaged so you can
              allocate in minutes, watch every move, and withdraw whenever you want.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 70} className={f.span}>
              <article className={`group relative h-full overflow-hidden rounded-3xl border p-6 transition-all duration-500 hover:-translate-y-1.5 ${f.accent ? "border-[#b8f135]/25 bg-gradient-to-br from-[#b8f135]/[0.09] to-transparent" : "glass hover:border-white/[0.16]"}`}>
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#b8f135]/[0.07] blur-2xl opacity-0 transition duration-500 group-hover:opacity-100" aria-hidden="true" />
                <span className={`relative grid h-11 w-11 place-items-center rounded-2xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 ${f.accent ? "bg-[#b8f135] text-black" : "bg-white/[0.07] text-[#b8f135]"}`}>
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="relative mt-5 font-display text-[17px] font-semibold">{f.title}</h3>
                <p className="relative mt-2 text-[13.5px] leading-relaxed text-white/55">{f.desc}</p>
                <div className="relative mt-6 flex items-baseline gap-2 border-t border-white/[0.07] pt-4">
                  <span className="font-display text-2xl font-bold text-[#b8f135]">{f.stat}</span>
                  <span className="text-[11px] text-white/40">{f.statLabel}</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* mini strip */}
        <Reveal delay={200}>
          <div className="mt-4 flex flex-col items-center justify-between gap-4 rounded-3xl glass px-6 py-5 sm:flex-row">
            <p className="flex items-center gap-2.5 text-sm text-white/65">
              <Activity className="h-4.5 w-4.5 text-[#b8f135]" />
              <span><strong className="text-white">2.1M trades executed</strong> in the last 12 months · 99.98% uptime · zero missed risk checks</span>
            </p>
            <p className="flex items-center gap-2 font-mono text-xs text-white/45">
              <Layers className="h-4 w-4 text-[#2ee6a8]" /> 14 venues · 38 pairs · 6 strategies
              <RefreshCw className="h-3.5 w-3.5 animate-spin-slow text-white/30" />
            </p>
          </div>
        </Reveal>

        {/* counters row */}
        <div className="mt-14 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {[
            { v: 847, p: "$", s: "M", l: "Assets under management" },
            { v: 38.4, p: "", s: "%", l: "2024 net return" },
            { v: 6.2, p: "−", s: "%", l: "Worst drawdown, 36 months" },
            { v: 99.98, p: "", s: "%", l: "Platform uptime" },
          ].map((c, i) => (
            <Reveal key={c.l} delay={i * 80}>
              <div className="text-center">
                <p className="font-display text-3xl font-bold sm:text-4xl"><Counter value={c.v} prefix={c.p} suffix={c.s} decimals={c.v % 1 !== 0 ? 2 : 0} /></p>
                <p className="mt-1.5 text-xs text-white/45">{c.l}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
