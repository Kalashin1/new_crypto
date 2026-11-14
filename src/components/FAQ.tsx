import { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import { Reveal } from "../lib";

const faqs = [
  {
    q: "How does Apex actually make money?",
    a: "We run three strategy pods — market-neutral basis/funding harvest, trend-following momentum, and volatility selling — across 14 venues. Capital is allocated dynamically between pods based on regime signals. Your dashboard shows exactly which pod earned what, down to the trade level.",
  },
  {
    q: "Is my money safe? Who holds it?",
    a: "Assets are held in segregated wallets with regulated custodians (BitGo and Fireblocks), never rehypothecated or lent out. Storage is multi-sig cold storage covered by $250M in crime insurance, and we publish monthly third-party proof-of-reserves. Apex itself never has custody of your keys.",
  },
  {
    q: "Can I withdraw anytime?",
    a: "Yes. There are no lock-ups, gates or notice periods. Submit a withdrawal request any day and funds settle within 24 hours (typically same-day for stablecoins). We charge no withdrawal fees — the only costs are the management and performance fees in your tier.",
  },
  {
    q: "What are the risks?",
    a: "Crypto is volatile and you can lose capital. Our market-neutral core is designed to dampen drawdowns (max −6.2% over 36 months), but no strategy is immune to black-swan events, exchange failures or smart-contract risk. The Bold profile carries materially higher variance. Read the risk disclosures before investing.",
  },
  {
    q: "How is the performance fee calculated?",
    a: "Only on profits above your personal high-water mark. If the fund drops 10% and then recovers 10%, you pay no performance fee on the recovery — we only earn when you’re at a new peak. Management fees are charged monthly on assets under management.",
  },
  {
    q: "Who can invest, and how do I start?",
    a: "Anyone 18+ in supported jurisdictions can start from $10,000. Onboarding takes about 10 minutes: verify your identity, choose a risk profile, fund via bank transfer or crypto, and your capital is allocated to the desk. Institution tier ($1M+) includes a dedicated manager and custom mandates.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#b8f135]">FAQ</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">Questions traders<br />actually ask us.</h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-white/55">
                Straight answers, no marketing fog. Anything else — our desk team replies in
                about 11 minutes, around the clock.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <a href="#cta" className="group mt-7 inline-flex items-center gap-2.5 rounded-full glass px-6 py-3.5 text-sm font-semibold transition hover:bg-white/[0.08]">
                <MessageCircle className="h-4.5 w-4.5 text-[#b8f135]" />
                Chat with the desk
                <span className="flex items-center gap-1.5 text-xs font-medium text-[#2ee6a8]"><span className="h-1.5 w-1.5 rounded-full bg-[#2ee6a8] animate-pulse-dot" /> Online now</span>
              </a>
            </Reveal>
          </div>

          <div className="space-y-3">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={f.q} delay={i * 60}>
                  <div className={`overflow-hidden rounded-3xl border transition-all duration-300 ${isOpen ? "border-[#b8f135]/30 bg-[#b8f135]/[0.04]" : "glass hover:border-white/[0.14]"}`}>
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <span className="font-display text-[15.5px] font-semibold sm:text-base">{f.q}</span>
                      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300 ${isOpen ? "rotate-180 bg-[#b8f135] text-black" : "bg-white/[0.07] text-white/60"}`}>
                        <ChevronDown className="h-4 w-4" />
                      </span>
                    </button>
                    <div id={`faq-panel-${i}`} className={`grid transition-all duration-500 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                      <div className="overflow-hidden">
                        <p className="px-6 pb-6 text-[14px] leading-relaxed text-white/60">{f.a}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
