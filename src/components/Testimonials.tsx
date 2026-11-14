import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star, BadgeCheck } from "lucide-react";
import { Reveal } from "../lib";

const testimonials = [
  {
    quote: "I traded for six years and still lost to slippage and my own emotions. Apex is the first time my capital compounded while I slept. The transparency sold me — I can see every fill.",
    name: "Marcus Chen", role: "Ex-prop trader · Singapore", initials: "MC", color: "from-[#b8f135] to-[#2ee6a8]",
    metric: "+41% in 14 months", tag: "Balanced profile",
  },
  {
    quote: "As a fund manager myself, I’m brutal about risk. Their max drawdown through the 2024 chop was −6%. I moved my family office’s crypto sleeve over in Q1 and haven’t looked back.",
    name: "Sofia Alvarez", role: "Family office CIO · Madrid", initials: "SA", color: "from-[#2ee6a8] to-[#7dd3fc]",
    metric: "−6.2% max drawdown", tag: "Steady profile",
  },
  {
    quote: "Withdrawals actually land in 24 hours. I tested it with a small amount first — skeptical, obviously. It hit my wallet the next morning. That’s when I went all in.",
    name: "James Okafor", role: "DeFi builder · Lagos", initials: "JO", color: "from-[#ffb86b] to-[#ff5c7a]",
    metric: "24h withdrawal, verified", tag: "Bold profile",
  },
  {
    quote: "The dashboard is what I always wanted from an exchange: live positions, strategy attribution, tax exports. It feels like Bloomberg for crypto, minus the $24k seat.",
    name: "Elena Petrova", role: "Quant researcher · Berlin", initials: "EP", color: "from-[#c4b5fd] to-[#b8f135]",
    metric: "Sharpe 2.41 (fund-level)", tag: "Balanced profile",
  },
  {
    quote: "Support replied in 8 minutes at 2am during the March volatility spike — from an actual trader on the desk. You can’t buy that on any exchange.",
    name: "David Kim", role: "Crypto native · Seoul", initials: "DK", color: "from-[#7dd3fc] to-[#c4b5fd]",
    metric: "8-min median response", tag: "Bold profile",
  },
  {
    quote: "I started with $10k to test the thesis. Eighteen months later it’s my largest single allocation. The high-water mark fee structure means they only win when I do.",
    name: "Amara Haddad", role: "Product lead · Dubai", initials: "AH", color: "from-[#b8f135] to-[#ffb86b]",
    metric: "$10k → $19.4k in 18 months", tag: "Balanced profile",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const visible = testimonials.slice(index, index + 2);
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIndex((i) => (i + 1) % testimonials.length);

  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#b8f135]">Trader stories</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">Traders who stopped<br />fighting the market.</h2>
            </Reveal>
          </div>
          <Reveal delay={160}>
            <div className="flex items-center gap-3">
              <div className="flex text-[#b8f135]" aria-label="4.9 out of 5 stars">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
              </div>
              <p className="text-sm text-white/55"><strong className="text-white">4.9 / 5</strong> · 12,400+ verified reviews</p>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {visible.map((t, i) => (
            <Reveal key={t.name + index} delay={i * 100}>
              <figure className="group relative flex h-full flex-col overflow-hidden rounded-3xl glass p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[#b8f135]/25 sm:p-8" style={{ animation: "fadeUp .5s cubic-bezier(.22,1,.36,1)" }}>
                <Quote className="absolute -right-3 -top-3 h-24 w-24 rotate-12 text-white/[0.04] transition group-hover:text-[#b8f135]/[0.07]" aria-hidden="true" />
                <div className="flex text-[#b8f135]">
                  {[...Array(5)].map((_, s) => <Star key={s} className="h-4 w-4 fill-current" />)}
                </div>
                <blockquote className="relative mt-4 flex-1 text-[15.5px] leading-relaxed text-white/80">“{t.quote}”</blockquote>
                <figcaption className="relative mt-6 flex flex-wrap items-center gap-3 border-t border-white/[0.07] pt-5">
                  <span className={`grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br ${t.color} font-display text-sm font-bold text-black`}>{t.initials}</span>
                  <div className="min-w-0">
                    <p className="flex items-center gap-1.5 text-sm font-semibold">{t.name} <BadgeCheck className="h-4 w-4 shrink-0 text-[#2ee6a8]" aria-label="Verified investor" /></p>
                    <p className="truncate text-xs text-white/45">{t.role}</p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="font-mono text-xs font-semibold text-[#b8f135]">{t.metric}</p>
                    <p className="text-[10px] text-white/40">{t.tag}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-2" role="tablist" aria-label="Testimonial pages">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setIndex(i)} aria-label={`Show testimonial ${i + 1}`} aria-selected={index === i}
                  className={`h-2 rounded-full transition-all duration-300 ${index === i ? "w-8 bg-[#b8f135]" : "w-2 bg-white/20 hover:bg-white/40"}`} />
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={prev} aria-label="Previous testimonials" className="grid h-11 w-11 place-items-center rounded-full glass transition hover:bg-white/[0.08] hover:text-[#b8f135]"><ChevronLeft className="h-5 w-5" /></button>
              <button onClick={next} aria-label="Next testimonials" className="grid h-11 w-11 place-items-center rounded-full glass transition hover:bg-white/[0.08] hover:text-[#b8f135]"><ChevronRight className="h-5 w-5" /></button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
