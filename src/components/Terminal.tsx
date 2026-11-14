import { useEffect, useMemo, useState } from "react";
import { ArrowDownRight, ArrowUpRight, CandlestickChart, ShieldCheck } from "lucide-react";
import { useLiveCoins, fmtPrice } from "../lib";

/* Generate a realistic candle series */
function genCandles(n = 42, seed = 7) {
  let price = 100;
  const out: { o: number; h: number; l: number; c: number }[] = [];
  let s = seed;
  const rnd = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  for (let i = 0; i < n; i++) {
    const o = price;
    const drift = (rnd() - 0.42) * 3.2;
    const c = o + drift;
    const h = Math.max(o, c) + rnd() * 1.4;
    const l = Math.min(o, c) - rnd() * 1.4;
    out.push({ o, h, l, c });
    price = c;
  }
  return out;
}

export default function Terminal() {
  const coins = useLiveCoins(2600);
  const btc = coins[0];
  const [tf, setTf] = useState("15m");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2800);
    return () => clearInterval(id);
  }, []);

  const candles = useMemo(() => genCandles(42, 7 + tick), [tick]);
  const W = 560, H = 220, PAD = 10;
  const max = Math.max(...candles.map((c) => c.h));
  const min = Math.min(...candles.map((c) => c.l));
  const range = max - min || 1;
  const x = (i: number) => PAD + (i / (candles.length - 1)) * (W - PAD * 2);
  const y = (v: number) => 14 + (1 - (v - min) / range) * (H - 34);
  const cw = (W - PAD * 2) / candles.length * 0.58;
  const linePath = candles.map((c, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(c.c).toFixed(1)}`).join(" ");
  const areaPath = `${linePath} L${x(candles.length - 1).toFixed(1)},${H - 8} L${x(0).toFixed(1)},${H - 8} Z`;
  const last = candles[candles.length - 1];
  const up = last.c >= candles[0].o;

  const bids = [
    { p: 97_310, s: 0.84 }, { p: 97_280, s: 1.32 }, { p: 97_240, s: 0.62 }, { p: 97_190, s: 2.10 }, { p: 97_150, s: 0.95 },
  ];
  const asks = [
    { p: 97_430, s: 1.05 }, { p: 97_470, s: 0.71 }, { p: 97_510, s: 1.88 }, { p: 97_560, s: 0.54 }, { p: 97_610, s: 1.24 },
  ];

  return (
    <div className="glass-strong relative overflow-hidden rounded-3xl shadow-[0_40px_90px_rgba(0,0,0,.55)]">
      {/* top glow line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b8f135]/70 to-transparent" />
      {/* header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#f7931a]/15 text-[#f7931a]">
            <CandlestickChart className="h-5 w-5" />
          </span>
          <div>
            <p className="font-display text-sm font-semibold leading-none">BTC / USDT <span className="ml-1 rounded bg-white/[0.07] px-1.5 py-0.5 text-[10px] font-medium text-white/50">PERP</span></p>
            <p className="mt-1 font-mono text-[11px] text-white/45">Apex Execution Engine · 12ms</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-mono text-lg font-semibold leading-none">${fmtPrice(btc.price)}</p>
          <p className={`mt-1 flex items-center justify-end gap-1 font-mono text-[11px] ${btc.change >= 0 ? "text-[#b8f135]" : "text-[#ff5c7a]"}`}>
            {btc.change >= 0 ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
            {btc.change >= 0 ? "+" : ""}{btc.change.toFixed(2)}% (24h)
          </p>
        </div>
      </div>

      {/* timeframe */}
      <div className="flex items-center gap-1 px-5 pt-4" role="tablist" aria-label="Timeframe">
        {["1m", "15m", "1H", "4H", "1D"].map((t) => (
          <button key={t} role="tab" aria-selected={tf === t} onClick={() => setTf(t)}
            className={`rounded-lg px-2.5 py-1 font-mono text-[11px] transition ${tf === t ? "bg-[#b8f135] font-semibold text-black" : "text-white/45 hover:bg-white/[0.06] hover:text-white"}`}>
            {t}
          </button>
        ))}
        <span className="ml-auto hidden items-center gap-1.5 font-mono text-[10px] text-white/40 sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2ee6a8] animate-pulse-dot" /> STREAMING
        </span>
      </div>

      {/* chart */}
      <div className="px-3 pt-1">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Live BTC price chart">
          <defs>
            <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={up ? "#b8f135" : "#ff5c7a"} stopOpacity="0.28" />
              <stop offset="100%" stopColor={up ? "#b8f135" : "#ff5c7a"} stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0.25, 0.5, 0.75].map((f) => (
            <line key={f} x1={PAD} x2={W - PAD} y1={H * f} y2={H * f} stroke="rgba(255,255,255,.05)" strokeDasharray="3 5" />
          ))}
          <path d={areaPath} fill="url(#area)" />
          {candles.map((c, i) => {
            const isUp = c.c >= c.o;
            const col = isUp ? "#b8f135" : "#ff5c7a";
            return (
              <g key={i} opacity="0.9">
                <line x1={x(i)} x2={x(i)} y1={y(c.h)} y2={y(c.l)} stroke={col} strokeWidth="1.2" />
                <rect x={x(i) - cw / 2} y={y(Math.max(c.o, c.c))} width={cw} height={Math.max(Math.abs(y(c.o) - y(c.c)), 1.6)} rx="1.5" fill={col} />
              </g>
            );
          })}
          <path d={linePath} fill="none" stroke={up ? "#d9ff7a" : "#ff8fa3"} strokeWidth="1.6" strokeLinejoin="round" opacity="0.85" />
          <circle cx={x(candles.length - 1)} cy={y(last.c)} r="4" fill={up ? "#b8f135" : "#ff5c7a"} stroke="#05070a" strokeWidth="2" />
          <circle cx={x(candles.length - 1)} cy={y(last.c)} r="9" fill="none" stroke={up ? "#b8f135" : "#ff5c7a"} opacity="0.35" />
        </svg>
      </div>

      {/* order book + position */}
      <div className="grid grid-cols-2 gap-4 border-t border-white/[0.07] px-5 py-4">
        <div>
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">Order book</p>
          <div className="space-y-1 font-mono text-[11px]">
            {asks.slice().reverse().map((a, i) => (
              <div key={i} className="relative flex justify-between overflow-hidden rounded px-1 py-0.5">
                <span className="absolute inset-y-0 right-0 bg-[#ff5c7a]/[0.08]" style={{ width: `${a.s * 28}%` }} />
                <span className="relative text-[#ff8fa3]">{a.p.toLocaleString()}</span><span className="relative text-white/55">{a.s.toFixed(2)}</span>
              </div>
            ))}
            <div className="my-1 border-y border-white/[0.06] py-1 text-center text-[10px] text-white/40">spread 0.12%</div>
            {bids.map((b, i) => (
              <div key={i} className="relative flex justify-between overflow-hidden rounded px-1 py-0.5">
                <span className="absolute inset-y-0 right-0 bg-[#b8f135]/[0.08]" style={{ width: `${b.s * 28}%` }} />
                <span className="relative text-[#b8f135]">{b.p.toLocaleString()}</span><span className="relative text-white/55">{b.s.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">Open position</p>
          <div className="rounded-2xl border border-[#b8f135]/20 bg-[#b8f135]/[0.05] p-3.5">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-[#b8f135] px-2 py-0.5 text-[10px] font-bold text-black">LONG 12.5×</span>
              <span className="font-mono text-[11px] text-white/50">BTC-PERP</span>
            </div>
            <p className="mt-3 font-mono text-xl font-semibold text-[#b8f135]">+$4,821.40</p>
            <p className="font-mono text-[11px] text-white/45">+18.4% · uPnL · liq. $71,204</p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
              <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-[#b8f135] to-[#2ee6a8]" />
            </div>
            <p className="mt-1.5 font-mono text-[10px] text-white/40">Margin health 92 / 100</p>
          </div>
          <p className="mt-3 flex items-center gap-1.5 text-[11px] text-white/45">
            <ShieldCheck className="h-3.5 w-3.5 text-[#2ee6a8]" /> Risk engine active · stop-loss armed
          </p>
        </div>
      </div>
    </div>
  );
}
