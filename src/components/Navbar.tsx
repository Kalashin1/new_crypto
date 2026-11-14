import { useEffect, useState } from "react";
import { ArrowRight, Menu, X, TrendingUp } from "lucide-react";
import { useLiveCoins, fmtPrice } from "../lib";

const links = [
  { label: "Platform", href: "#platform" },
  { label: "Strategies", href: "#strategies" },
  { label: "Why Apex", href: "#why" },
  { label: "Returns", href: "#calculator" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#top" className={`group flex items-center gap-2.5 ${className}`} aria-label="Apex Quant home">
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-[#b8f135] text-black shadow-[0_0_24px_rgba(184,241,53,.35)] transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105">
        <TrendingUp className="h-5 w-5" strokeWidth={2.6} />
      </span>
      <span className="font-display text-[17px] font-bold leading-none tracking-tight">
        <span className="font-bold">APEX</span>
        <span className="ml-1.5 font-medium text-white/50">QUANT</span>
      </span>
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const coins = useLiveCoins(3000);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Live ticker strip */}
      <div className="border-b border-white/[0.06] bg-black/60 backdrop-blur-xl" aria-hidden="true">
        <div className="mx-auto flex max-w-7xl items-center gap-6 overflow-hidden px-4 py-1.5 sm:px-6">
          <span className="flex shrink-0 items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#b8f135]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#b8f135] animate-pulse-dot" /> Live
          </span>
          <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_4%,black_96%,transparent)]">
            <div className="flex w-max animate-marquee gap-8 pr-8">
              {[...coins, ...coins].map((c, i) => (
                <span key={i} className="flex items-center gap-2 font-mono text-[11px] whitespace-nowrap">
                  <span className="font-semibold text-white/80">{c.sym}</span>
                  <span className="text-white/60">${fmtPrice(c.price)}</span>
                  <span className={c.change >= 0 ? "text-[#b8f135]" : "text-[#ff5c7a]"}>
                    {c.change >= 0 ? "▲" : "▼"} {Math.abs(c.change).toFixed(2)}%
                  </span>
                </span>
              ))}
            </div>
          </div>
          <span className="hidden shrink-0 font-mono text-[10px] text-white/40 md:block">BTC DOM 54.2%</span>
        </div>
      </div>

      {/* Nav bar */}
      <div className={`transition-all duration-500 ${scrolled ? "glass-strong shadow-[0_12px_40px_rgba(0,0,0,.45)]" : "bg-transparent border-b border-transparent"}`}>
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6" aria-label="Main">
          <Logo />
          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="rounded-full px-3.5 py-2 text-[13.5px] font-medium text-white/65 transition hover:bg-white/[0.06] hover:text-white">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="hidden items-center gap-2.5 lg:flex">
            <a href="#pricing" className="rounded-full px-4 py-2 text-[13.5px] font-medium text-white/70 transition hover:text-white">Sign in</a>
            <a href="#cta" className="group inline-flex items-center gap-1.5 rounded-full bg-[#b8f135] px-5 py-2.5 text-[13.5px] font-semibold text-black shadow-[0_0_28px_rgba(184,241,53,.28)] transition hover:bg-[#d9ff7a] hover:shadow-[0_0_36px_rgba(184,241,53,.45)]">
              Start investing
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
          <button
            className="grid h-10 w-10 place-items-center rounded-xl glass lg:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <div className={`fixed inset-0 top-[104px] z-40 bg-[#05070a]/95 backdrop-blur-2xl transition-all duration-300 lg:hidden ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}>
        <nav className="flex h-full flex-col px-6 py-8" aria-label="Mobile">
          <ul className="space-y-1">
            {links.map((l, i) => (
              <li key={l.href} style={{ transitionDelay: `${i * 40}ms` }} className={`transition-all duration-500 ${open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}>
                <a href={l.href} onClick={() => setOpen(false)} className="flex items-center justify-between border-b border-white/[0.06] py-4 font-display text-2xl font-semibold text-white/85">
                  {l.label} <ArrowRight className="h-5 w-5 text-[#b8f135]" />
                </a>
              </li>
            ))}
          </ul>
          <a href="#cta" onClick={() => setOpen(false)} className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[#b8f135] px-6 py-4 font-semibold text-black">
            Start investing <ArrowRight className="h-4 w-4" />
          </a>
          <p className="mt-4 text-center text-xs text-white/40">No lock-up · Withdraw anytime · From $10,000</p>
        </nav>
      </div>
    </header>
  );
}
