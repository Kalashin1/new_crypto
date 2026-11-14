import { useState } from "react";
import { ArrowUpRight, ArrowDownRight, PieChart, LineChart, Repeat, Wallet, Check } from "lucide-react";
import { Reveal } from "../lib";

type Tab = { id: string; label: string; icon: typeof LineChart; headline: string; desc: string; points: string[] };

const tabs: Tab[] = [
  {
    id: "strategies", label: "Strategies", icon: LineChart,
    headline: "Three engines. One goal: asymmetric returns.",
    desc: "Each strategy is run by a dedicated pod with its own risk budget. Capital flows to whichever engine has the edge — automatically.",
    points: ["Market-neutral basis & funding harvest", "Trend-following momentum (BTC/ETH/SOL)", "Volatility selling with tail hedges"],
  },
  {
    id: "portfolio", label: "Portfolio", icon: PieChart,
    headline: "See exactly where every dollar sits.",
    desc: "A live, auditable view of allocations, exposure and P&L attribution — down to the individual trade.",
    points: ["Real-time allocation & beta breakdown", "Strategy-level P&L attribution", "Exportable tax reports (CSV / API)"],
  },
  {
    id: "automation", label: "Automation", icon: Repeat,
    headline: "Set your mandate. The desk does the rest.",
    desc: "Choose a risk profile once. Our execution layer rebalances, hedges and harvests carry around the clock — even while you sleep.",
    points: ["One-click risk profiles: Steady / Balanced / Bold", "Auto-rebalance with 0.25% bands", "Kill-switch: pause everything in one tap"],
  },
  {
    id: "wallet", label: "Wallet & custody", icon: Wallet,
    headline: "Your assets. Regulated vaults. Zero surprises.",
    desc: "Deposits land in segregated wallets with regulated custodians. Withdrawals settle within 24 hours, no questions, no lock-ups.",
    points: ["Segregated wallets · never rehypothecated", "Multi-sig cold storage + $250M insurance", "Withdrawals in < 24h, 7 days a week"],
  },
];

const perfData = [12, 18, 15, 24, 22, 31, 29, 38, 36, 44, 52, 58, 64, 72, 78, 86, 92, 101, 108, 118, 126, 138, 147, 158];

export default function Showcase() {
  const [active, setActive] = useState(tabs[0]);
  const [hover, setHover] = useState<number | null>(null);

  const W = 640, H = 200;
  const min = Math.min(...perfData), max = Math.max(...perfData);
  const pts = perfData.map((v, i) => `${(i / (perfData.length - 1)) * W},${H - ((v - min) / (max - min)) * (H - 24) - 8}`);
  const line = `M${pts.join(" L")}`;
  const area = `${line} L${W},${H} L0,${H} Z`;

  return (
    <section id="strategies" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute right-0 top-24 h-96 w-96 rounded-full bg-[#b8f135]/[0.05] blur-[120px]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#b8f135]">Product showcase</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">One dashboard.<br />Total command.</h2>
            </Reveal>
          </div>
          <Reveal delay={160}>
            <p className="max-w-md text-[15px] leading-relaxed text-white/55">
              No spreadsheets. No Telegram signals. A single, beautiful command center for your
              crypto capital — designed for traders who think in basis points.
            </p>
          </Reveal>
        </div>

        {/* Tabs */}
        <Reveal delay={120}>
          <div className="mt-10 flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="tablist" aria-label="Product areas">
            {tabs.map((t) => (
              <button
                key={t.id} role="tab" aria-selected={active.id === t.id} onClick={() => setActive(t)}
                className={`flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${active.id === t.id ? "bg-[#b8f135] text-black shadow-[0_0_24px_rgba(184,241,53,.3)]" : "glass text-white/60 hover:text-white"}`}
              >
                <t.icon className="h-4 w-4" /> {t.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_1.15fr]">
          {/* Copy panel */}
          <Reveal>
            <div key={active.id} className="flex h-full flex-col rounded-3xl glass p-7 sm:p-9" style={{ animation: "fadeUp .5s cubic-bezier(.22,1,.36,1)" }}>
              <h3 className="font-display text-2xl font-bold leading-snug sm:text-[28px]">{active.headline}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-white/55">{active.desc}</p>
              <ul className="mt-6 space-y-3">
                {active.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-white/75">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#b8f135]/15 text-[#b8f135]"><Check className="h-3 w-3" strokeWidth={3} /></span>
                    {p}
                  </li>
                ))}
              </ul>
              <a href="#cta" className="group mt-auto inline-flex items-center gap-1.5 pt-8 text-sm font-semibold text-[#b8f135]">
                Explore {active.label.toLowerCase()}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </Reveal>

          {/* Visual panel */}
          <Reveal delay={120}>
            <div className="glass-strong relative h-full overflow-hidden rounded-3xl p-6 sm:p-8">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b8f135]/60 to-transparent" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">Cumulative net return · Fund II</p>
                  <p className="mt-1 font-display text-3xl font-bold">+158.2% <span className="text-sm font-medium text-white/40">since inception</span></p>
                </div>
                <span className="flex items-center gap-1 rounded-full bg-[#b8f135]/10 px-3 py-1.5 font-mono text-xs font-semibold text-[#b8f135]">
                  <ArrowUpRight className="h-3.5 w-3.5" /> +38.4% in 2024
                </span>
              </div>

              <svg viewBox={`0 0 ${W} ${H}`} className="mt-6 w-full" role="img" aria-label="Cumulative fund performance chart"
                onMouseLeave={() => setHover(null)}>
                <defs>
                  <linearGradient id="perfArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#b8f135" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#b8f135" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[0.33, 0.66].map((f) => (
                  <line key={f} x1="0" x2={W} y1={H * f} y2={H * f} stroke="rgba(255,255,255,.05)" strokeDasharray="3 6" />
                ))}
                <path d={area} fill="url(#perfArea)" />
                <path d={line} fill="none" stroke="#b8f135" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" />
                {hover !== null && (
                  <g>
                    <line x1={pts[hover].split(",")[0]} x2={pts[hover].split(",")[0]} y1="0" y2={H} stroke="rgba(255,255,255,.15)" />
                    <circle cx={pts[hover].split(",")[0]} cy={pts[hover].split(",")[1]} r="5" fill="#b8f135" stroke="#05070a" strokeWidth="2" />
                  </g>
                )}
                {perfData.map((_, i) => (
                  <rect key={i} x={(i / (perfData.length - 1)) * W - 12} y="0" width="24" height={H} fill="transparent"
                    onMouseEnter={() => setHover(i)} />
                ))}
              </svg>
              <div className="mt-2 flex justify-between font-mono text-[10px] text-white/35">
                <span>Jan ’23</span>
                <span className="text-[#b8f135]">{hover !== null ? `Month ${hover + 1} · +${perfData[hover]}%` : "Hover to inspect"}</span>
                <span>Dec ’24</span>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/[0.07] pt-5">
                {[
                  { l: "Sharpe ratio", v: "2.41", up: true },
                  { l: "Sortino", v: "3.18", up: true },
                  { l: "Max drawdown", v: "−6.2%", up: false },
                ].map((s) => (
                  <div key={s.l} className="rounded-2xl bg-white/[0.03] p-3.5 text-center">
                    <p className="font-display text-lg font-bold">{s.v}</p>
                    <p className="mt-0.5 flex items-center justify-center gap-1 text-[10px] text-white/40">
                      {s.up ? <ArrowUpRight className="h-3 w-3 text-[#b8f135]" /> : <ArrowDownRight className="h-3 w-3 text-[#2ee6a8]" />} {s.l}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* allocation strip */}
        <Reveal delay={150}>
          <div className="mt-5 rounded-3xl glass p-6 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-display text-base font-semibold">Current allocation</p>
              <p className="font-mono text-[11px] text-white/40">Rebalanced 4h ago · next in 3h 42m</p>
            </div>
            <div className="mt-5 flex h-4 w-full overflow-hidden rounded-full" role="img" aria-label="Allocation: 42 percent market neutral, 31 percent trend, 18 percent volatility, 9 percent cash">
              <div className="bg-[#b8f135] transition-all duration-700" style={{ width: "42%" }} />
              <div className="bg-[#2ee6a8] transition-all duration-700" style={{ width: "31%" }} />
              <div className="bg-white/70 transition-all duration-700" style={{ width: "18%" }} />
              <div className="bg-white/15 transition-all duration-700" style={{ width: "9%" }} />
            </div>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/55">
              <li className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm bg-[#b8f135]" /> Market-neutral 42%</li>
              <li className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm bg-[#2ee6a8]" /> Trend-following 31%</li>
              <li className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm bg-white/70" /> Volatility 18%</li>
              <li className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm bg-white/15" /> Cash / stable 9%</li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
