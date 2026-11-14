import { useState } from "react";
import { ArrowRight, CheckCircle2, ShieldCheck, Clock, Eye } from "lucide-react";
import { Reveal } from "../lib";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setDone(true);
  };

  return (
    <section id="cta" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="noise relative overflow-hidden rounded-[36px] border border-[#b8f135]/25 bg-gradient-to-br from-[#b8f135]/[0.12] via-[#0a0e13] to-[#0a0e13] px-6 py-16 text-center sm:px-12 sm:py-20">
            <div className="grid-bg absolute inset-0 opacity-60" aria-hidden="true" />
            <div className="absolute -top-32 left-1/2 h-72 w-[560px] -translate-x-1/2 rounded-full bg-[#b8f135]/20 blur-[100px]" aria-hidden="true" style={{ animation: "glowPulse 5s ease-in-out infinite" }} />
            <div className="relative mx-auto max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-white/75">
                <span className="h-1.5 w-1.5 rounded-full bg-[#b8f135] animate-pulse-dot" />
                Fund III — 73% allocated · closes in 12 days
              </span>
              <h2 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
                Your capital deserves<br />a <span className="text-gradient">professional desk.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-[15.5px] leading-relaxed text-white/60">
                Join 12,400+ traders investing alongside Apex. Start from $10,000, withdraw
                anytime, and watch every trade in real time. Onboarding takes 10 minutes.
              </p>

              {done ? (
                <div className="mx-auto mt-9 flex max-w-md items-center gap-3 rounded-2xl border border-[#2ee6a8]/30 bg-[#2ee6a8]/[0.08] px-5 py-4 text-left" role="status">
                  <CheckCircle2 className="h-6 w-6 shrink-0 text-[#2ee6a8]" />
                  <div>
                    <p className="text-sm font-semibold">You’re on the list.</p>
                    <p className="text-xs text-white/55">Check <span className="text-[#b8f135]">{email}</span> for your onboarding link and fund documents.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={submit} className="mx-auto mt-9 max-w-lg" noValidate>
                  <div className="flex flex-col gap-3 sm:flex-row sm:rounded-full sm:glass sm:p-2">
                    <label htmlFor="cta-email" className="sr-only">Email address</label>
                    <input
                      id="cta-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@fund.vc"
                      className="w-full flex-1 rounded-full glass px-5 py-4 text-sm text-white placeholder:text-white/35 sm:border-0 sm:bg-transparent sm:py-3 sm:backdrop-blur-none"
                      aria-describedby={error ? "cta-error" : undefined}
                    />
                    <button type="submit" className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#b8f135] px-7 py-4 text-sm font-semibold text-black shadow-[0_0_32px_rgba(184,241,53,.35)] transition hover:bg-[#d9ff7a] hover:shadow-[0_0_44px_rgba(184,241,53,.5)] sm:py-3">
                      Get started
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>
                  {error && <p id="cta-error" role="alert" className="mt-3 text-xs text-[#ff8fa3]">{error}</p>}
                  <p className="mt-3 text-[11px] text-white/35">No spam. Fund documents and onboarding link only.</p>
                </form>
              )}

              <ul className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/50">
                <li className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-[#2ee6a8]" /> Audited custody</li>
                <li className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-[#2ee6a8]" /> Withdraw in &lt; 24h</li>
                <li className="flex items-center gap-1.5"><Eye className="h-4 w-4 text-[#2ee6a8]" /> Full transparency</li>
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
