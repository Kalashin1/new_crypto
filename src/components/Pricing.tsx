import { useState } from "react";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Reveal } from "../lib";

const tiers = [
  {
    name: "Launch", min: "$10,000", mgmt: "1.00%", perf: "10%", popular: false,
    desc: "For traders testing the desk with real capital.",
    features: ["All 3 risk profiles", "Live dashboard & reporting", "Monthly proof-of-reserves", "Withdraw anytime (< 24h)", "Community support"],
  },
  {
    name: "Pro", min: "$100,000", mgmt: "0.75%", perf: "8%", popular: true,
    desc: "Our most-chosen tier — lower fees, priority everything.",
    features: ["Everything in Launch", "Priority desk support (11-min median)", "Quarterly strategy deep-dives", "API access & tax exports", "Early access to new strategies"],
  },
  {
    name: "Institution", min: "$1,000,000+", mgmt: "Custom", perf: "Custom", popular: false,
    desc: "For family offices, funds and serious allocators.",
    features: ["Everything in Pro", "Dedicated portfolio manager", "Custom mandates & reporting", "OTC execution desk", "ISDA / prime brokerage terms"],
  },
];

export default function Pricing() {
  const [billing, setBilling] = useState<"monthly" | "annual">("annual");

  return (
    <section id="pricing" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute left-1/2 top-20 h-80 w-[700px] -translate-x-1/2 rounded-full bg-[#b8f135]/[0.05] blur-[130px]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#b8f135]">Fee structure</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">We only win<br />when you do.</h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 text-[15.5px] leading-relaxed text-white/55">
              A modest management fee covers the desk. The performance fee is charged only above
              your high-water mark — if we don’t make you money, we don’t get paid. Simple as that.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-7 inline-flex items-center rounded-full glass p-1" role="group" aria-label="Billing period">
              {(["monthly", "annual"] as const).map((b) => (
                <button key={b} onClick={() => setBilling(b)} aria-pressed={billing === b}
                  className={`rounded-full px-5 py-2 text-sm font-medium capitalize transition-all duration-300 ${billing === b ? "bg-[#b8f135] font-semibold text-black" : "text-white/55 hover:text-white"}`}>
                  {b} {b === "annual" && <span className="ml-1 text-[10px] opacity-70">−20% mgmt fee</span>}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {tiers.map((t, i) => {
            const mgmt = t.mgmt === "Custom" ? "Custom" : billing === "annual" ? (parseFloat(t.mgmt) * 0.8).toFixed(2) + "%" : t.mgmt;
            return (
              <Reveal key={t.name} delay={i * 100}>
                <article className={`relative flex h-full flex-col rounded-[28px] p-7 transition-all duration-500 hover:-translate-y-1.5 sm:p-8 ${t.popular ? "border border-[#b8f135]/40 bg-gradient-to-b from-[#b8f135]/[0.1] to-white/[0.02] shadow-[0_24px_70px_rgba(184,241,53,.1)]" : "glass hover:border-white/[0.16]"}`}>
                  {t.popular && (
                    <span className="absolute -top-3.5 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-[#b8f135] px-4 py-1.5 text-[11px] font-bold uppercase tracking-wide text-black shadow-lg">
                      <Sparkles className="h-3.5 w-3.5" /> Most popular
                    </span>
                  )}
                  <h3 className="font-display text-xl font-bold">{t.name}</h3>
                  <p className="mt-1.5 text-sm text-white/50">{t.desc}</p>
                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="font-display text-4xl font-bold">{t.min}</span>
                    <span className="text-xs text-white/40">minimum</span>
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-black/30 p-3.5 text-center">
                      <p className="font-display text-lg font-bold text-[#b8f135]">{mgmt}</p>
                      <p className="text-[10px] text-white/40">management / yr</p>
                    </div>
                    <div className="rounded-2xl bg-black/30 p-3.5 text-center">
                      <p className="font-display text-lg font-bold text-[#b8f135]">{t.perf}</p>
                      <p className="text-[10px] text-white/40">performance fee</p>
                    </div>
                  </div>
                  <ul className="mt-6 flex-1 space-y-2.5">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-[13.5px] text-white/70">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#b8f135]" strokeWidth={3} /> {f}
                      </li>
                    ))}
                  </ul>
                  <a href="#cta" className={`group mt-7 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition ${t.popular ? "bg-[#b8f135] text-black hover:bg-[#d9ff7a]" : "glass hover:bg-white/[0.08]"}`}>
                    Start with {t.name}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={200}>
          <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-white/35">
            Fees are illustrative of the standard schedule. Performance fees apply only to profits
            above the investor’s high-water mark. No hidden spreads, no withdrawal fees, no
            lock-ups. Full fee schedule in the fund documents.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
