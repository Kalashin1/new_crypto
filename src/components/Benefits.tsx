import { Check, X, Clock, Eye, Scale, Headset } from "lucide-react";
import { Reveal } from "../lib";

const benefits = [
  { icon: Clock, title: "No lock-ups, ever", desc: "Your capital, your call. Request a withdrawal any day — settled within 24 hours. We earn our fee by performing, not by trapping you." },
  { icon: Eye, title: "Radical transparency", desc: "Live positions, real fills, monthly proof-of-reserves from an independent auditor. If we can’t show it, we don’t claim it." },
  { icon: Scale, title: "Aligned incentives", desc: "We invest our own capital in every fund and only earn a performance fee when you’re in profit. High-water mark, always." },
  { icon: Headset, title: "Desk-level support", desc: "Talk to the traders running your money — not a chatbot. Median response time: 11 minutes, 24/7." },
];

const rows: { label: string; apex: string | boolean; diy: string | boolean; exchange: string | boolean }[] = [
  { label: "Median fill latency", apex: "12ms", diy: "180ms+", exchange: "90ms" },
  { label: "Market-neutral strategy", apex: true, diy: false, exchange: false },
  { label: "Live position transparency", apex: true, diy: true, exchange: true },
  { label: "Risk engine & auto-hedging", apex: true, diy: false, exchange: false },
  { label: "Withdraw anytime", apex: true, diy: true, exchange: true },
  { label: "Dedicated trader support", apex: true, diy: false, exchange: false },
  { label: "Performance fee only when profitable", apex: true, diy: "—", exchange: "—" },
];

function Cell({ v, highlight }: { v: string | boolean; highlight?: boolean }) {
  if (v === true) return <span className={`inline-grid h-6 w-6 place-items-center rounded-full ${highlight ? "bg-[#b8f135] text-black" : "bg-white/[0.08] text-white/60"}`}><Check className="h-3.5 w-3.5" strokeWidth={3} /></span>;
  if (v === false) return <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-white/[0.04] text-white/30"><X className="h-3.5 w-3.5" /></span>;
  return <span className={`font-mono text-xs ${highlight ? "font-semibold text-[#b8f135]" : "text-white/45"}`}>{v}</span>;
}

export default function Benefits() {
  return (
    <section id="why" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: benefits */}
          <div>
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#b8f135]">Why Apex</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
                The edge of a trading firm,<br /><span className="text-white/45">without the gatekeeping.</span>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 max-w-lg text-[15.5px] leading-relaxed text-white/55">
                Most crypto “funds” are a wallet and a promise. Apex is a 40-person quant desk
                with co-located servers, a risk team that sleeps in shifts, and a track record
                audited by people who don’t take our word for it.
              </p>
            </Reveal>
            <div className="mt-9 space-y-3">
              {benefits.map((b, i) => (
                <Reveal key={b.title} delay={i * 80}>
                  <div className="group flex gap-4 rounded-3xl glass p-5 transition-all duration-300 hover:border-[#b8f135]/25 hover:bg-[#b8f135]/[0.04]">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#b8f135]/12 text-[#b8f135] transition-transform duration-300 group-hover:scale-110">
                      <b.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-[16px] font-semibold">{b.title}</h3>
                      <p className="mt-1 text-[13.5px] leading-relaxed text-white/55">{b.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right: comparison */}
          <Reveal delay={150}>
            <div className="glass-strong relative overflow-hidden rounded-3xl p-6 sm:p-8 lg:sticky lg:top-32">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b8f135]/60 to-transparent" />
              <h3 className="font-display text-xl font-bold">Apex vs. going it alone</h3>
              <p className="mt-1 text-sm text-white/50">Why traders move capital to the desk.</p>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[420px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.08] text-[11px] uppercase tracking-wider text-white/40">
                      <th scope="col" className="pb-3 font-medium">Capability</th>
                      <th scope="col" className="pb-3 text-center font-semibold text-[#b8f135]">Apex</th>
                      <th scope="col" className="pb-3 text-center font-medium">DIY trading</th>
                      <th scope="col" className="pb-3 text-center font-medium">Exchange</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r) => (
                      <tr key={r.label} className="border-b border-white/[0.05] transition hover:bg-white/[0.02]">
                        <td className="py-3.5 pr-3 text-white/70">{r.label}</td>
                        <td className="py-3.5 text-center"><Cell v={r.apex} highlight /></td>
                        <td className="py-3.5 text-center"><Cell v={r.diy} /></td>
                        <td className="py-3.5 text-center"><Cell v={r.exchange} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 rounded-2xl border border-[#b8f135]/20 bg-[#b8f135]/[0.06] p-4">
                <p className="text-[13px] leading-relaxed text-white/70">
                  <span className="font-semibold text-[#b8f135]">The math:</span> the average active
                  retail trader underperforms buy-and-hold by 21% a year after fees and slippage.
                  Apex’s market-neutral core targets steady compounding instead.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
