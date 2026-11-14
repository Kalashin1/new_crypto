import { useEffect, useRef, useState, type ReactNode } from "react";

/* ---------- Scroll reveal wrapper ---------- */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ---------- Animated counter ---------- */
export function useCountUp(target: number, duration = 1800, decimals = 0) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 4);
            setVal(parseFloat((target * eased).toFixed(decimals)));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration, decimals]);
  return { ref, val };
}

export function Counter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  className = "",
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const { ref, val } = useCountUp(value, 1900, decimals);
  const formatted = val.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

/* ---------- Live simulated prices ---------- */
export type Coin = { sym: string; name: string; price: number; change: number; spark: number[] };

const seed: Coin[] = [
  { sym: "BTC", name: "Bitcoin", price: 97420, change: 2.84, spark: [62, 64, 63, 66, 68, 67, 71, 74, 73, 78, 81, 84] },
  { sym: "ETH", name: "Ethereum", price: 3420, change: 3.12, spark: [40, 42, 41, 44, 43, 47, 49, 48, 52, 54, 53, 57] },
  { sym: "SOL", name: "Solana", price: 214.6, change: -1.42, spark: [58, 56, 57, 54, 55, 52, 53, 50, 51, 48, 49, 46] },
  { sym: "XRP", name: "Ripple", price: 2.41, change: 5.67, spark: [30, 33, 32, 36, 38, 37, 41, 44, 43, 48, 50, 54] },
  { sym: "DOGE", name: "Dogecoin", price: 0.32, change: -0.88, spark: [44, 43, 45, 42, 43, 41, 42, 40, 41, 39, 40, 38] },
  { sym: "ADA", name: "Cardano", price: 0.98, change: 1.24, spark: [36, 38, 37, 40, 39, 42, 41, 44, 43, 46, 45, 48] },
  { sym: "AVAX", name: "Avalanche", price: 38.2, change: 4.31, spark: [28, 30, 29, 33, 32, 36, 35, 39, 38, 42, 41, 45] },
  { sym: "LINK", name: "Chainlink", price: 22.7, change: 1.96, spark: [42, 44, 43, 46, 45, 48, 47, 50, 49, 52, 51, 54] },
  { sym: "TON", name: "Toncoin", price: 5.84, change: -2.15, spark: [50, 48, 49, 46, 47, 44, 45, 42, 43, 40, 41, 38] },
  { sym: "NEAR", name: "Near Protocol", price: 5.12, change: 6.08, spark: [24, 27, 26, 30, 29, 33, 32, 36, 35, 39, 38, 43] },
];

export function useLiveCoins(intervalMs = 2200) {
  const [coins, setCoins] = useState<Coin[]>(seed);
  useEffect(() => {
    const id = setInterval(() => {
      setCoins((prev) =>
        prev.map((c) => {
          const drift = (Math.random() - 0.47) * 0.006;
          const price = Math.max(c.price * (1 + drift), 0.0001);
          const change = c.change + drift * 100;
          const spark = [...c.spark.slice(1), c.spark[c.spark.length - 1] + drift * 800];
          return { ...c, price, change, spark };
        })
      );
    }, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return coins;
}

export function fmtPrice(p: number) {
  if (p >= 1000) return p.toLocaleString("en-US", { maximumFractionDigits: 0 });
  if (p >= 10) return p.toFixed(2);
  if (p >= 1) return p.toFixed(2);
  return p.toFixed(4);
}

/* ---------- Sparkline path ---------- */
export function sparkPath(data: number[], w = 72, h = 24) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  return data
    .map((v, i) => `${i === 0 ? "M" : "L"}${((i / (data.length - 1)) * w).toFixed(1)},${(h - ((v - min) / range) * (h - 4) - 2).toFixed(1)}`)
    .join(" ");
}
