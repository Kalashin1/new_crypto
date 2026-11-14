import { useMemo, useState } from "react";
import { ArrowRight, Info, TrendingUp } from "lucide-react";
import { Reveal } from "../lib";

const profiles = {
  Steady: { apy: 14.2, range: [9, 19], color: "#2ee6a8", desc: "Market-neutral heavy · lowest drawdown" },
  Balanced: { apy: 24.6, range: [16, 34], color: "#b8f135", desc: "Neutral + trend blend · our most popular" },
  Bold: { apy: 38.4, range: [22, 58], color: "#ffb86b", desc: "Trend & volatility tilt · higher variance" },
} as const;

type ProfileKey = keyof typeof profiles;

export default function Calculator() {
  const [amount, setAmount] = useState(50000);
  const [profile, setProfile] = useState<ProfileKey>("Balanced");
  const [years, setYears] = useState(3);

  const p = profiles[profile];
  const calc = useMemo(() => {
    const future = amount * Math.pow(1 + p.apy / 100, years);
    const low = amount * Math.pow(1 + p.range[0] / 100, years);
    const high = amount * Math.pow(1 + p.range[1] / 100, years);
    return { future, low, high, gain: future - amount };
  }, [amount, profile, years]);

  const fill = ((amount - 1000) / (1000000 - 1000)) * 100;

  return (
    <section id="calculator" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute left-0 top-1/3 h-96 w-96 rounded-full bg-[#2ee6a8]/[0.05] blur-[120px]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#b8f135]">Model your returns</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">What could your capital do here?</h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 text-[15.5px] text-white/55">
              Drag the slider. Based on each profile’s historical net performance — not a promise,
              a starting point for the conversation.
            </p>
          </Reveal>
        </div>

        <Reveal delay={150}>
          <div className="glass-strong relative mx-auto mt-12 max-w-5xl overflow-hidden rounded-[32px] p-6 sm:p-10">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b8f135]/60 to-transparent" />
            <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr]">
              {/* Controls */}
              <div>
                <div className="flex items-end justify-between">
                  <label htmlFor="amount" className="text-sm font-medium text-white/65">Investment amount</label>
                  <p className="font-display text-3xl font-bold">${amount.toLocaleString()}</p>
                </div>
                <input
                  id="amount" type="range" min={1000} max={1000000} step={1000} value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="mt-4 w-full" style={{ ["--fill" as string]: `${fill}%` }}
                  aria-valuetext={`$${amount.toLocaleString()}`}
                />
                <div className="mt-2 flex justify-between font-mono text-[10px] text-white/35"><span>$1k</span><span>$250k</span><span>$1M</span></div>

                <fieldset className="mt-8">
                  <legend className="text-sm font-medium text-white/65">Risk profile</legend>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {(Object.keys(profiles) as ProfileKey[]).map((k) => (
                      <button key={k} onClick={() => setProfile(k)} aria-pressed={profile === k}
                        className={`rounded-2xl border px-3 py-3.5 text-left transition-all duration-300 ${profile === k ? "border-[#b8f135]/50 bg-[#b8f135]/[0.08]" : "border-white/[0.08] bg-white/[0.02] hover:border-white/20"}`}>
                        <span className="block font-display text-sm font-semibold" style={{ color: profile === k ? profiles[k].color : undefined }}>{k}</span>
                        <span className="mt-0.5 block font-mono text-[11px] text-white/45">{profiles[k].apy}% hist. APY</span>
                      </button>
                    ))}
                  </div>
                  <p className="mt-2.5 text-xs text-white/45">{p.desc}</p>
                </fieldset>

                <div className="mt-8">
                  <label htmlFor="years" className="text-sm font-medium text-white/65">Time horizon</label>
                  <div className="mt-3 flex gap-2">
                    {[1, 2, 3, 5].map((y) => (
                      <button key={y} onClick={() => setYears(y)} aria-pressed={years === y}
                        className={`flex-1 rounded-full py-2.5 text-sm font-medium transition ${years === y ? "bg-[#b8f135] font-semibold text-black" : "glass text-white/60 hover:text-white"}`}>
                        {y} yr{y > 1 ? "s" : ""}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Result */}
              <div className="flex flex-col rounded-3xl border border-white/[0.08] bg-black/30 p-6 sm:p-7">
                <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                  <TrendingUp className="h-3.5 w-3.5 text-[#b8f135]" /> Projected value · {profile}
                </p>
                <p className="mt-3 font-display text-4xl font-bold sm:text-[44px]" style={{ color: p.color }}>
                  ${Math.round(calc.future).toLocaleString()}
                </p>
                <p className="mt-1 font-mono text-sm text-white/50">
                  +${Math.round(calc.gain).toLocaleString()} · {p.apy}% APY (hist. avg)
                </p>
                <div className="mt-6 space-y-2.5 border-t border-white/[0.07] pt-5 text-sm">
                  <div className="flex justify-between"><span className="text-white/50">Conservative scenario</span><span className="font-mono font-medium">${Math.round(calc.low).toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-white/50">Base case</span><span className="font-mono font-medium text-[#b8f135]">${Math.round(calc.future).toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-white/50">Bull scenario</span><span className="font-mono font-medium">${Math.round(calc.high).toLocaleString()}</span></div>
                </div>
                <a href="#cta" className="group mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#b8f135] px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-[#d9ff7a]">
                  Start with ${amount.toLocaleString()}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
            <p className="mt-6 flex items-start gap-2 text-[11px] leading-relaxed text-white/35">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              Illustrative only. Projections use historical net returns of each profile and do not predict future performance. Crypto assets are volatile and you may lose capital. Read the fund documents before investing.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
