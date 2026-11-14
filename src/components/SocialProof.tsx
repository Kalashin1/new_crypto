import { Reveal } from "../lib";

const press = [
  { name: "CoinDesk", note: "“The desk to watch in 2026”" },
  { name: "Bloomberg Crypto", note: "Top-10 quant fund ranking" },
  { name: "Forbes", note: "Best Crypto Funds 2025" },
  { name: "The Block", note: "Institutional pick of the year" },
  { name: "Decrypt", note: "“Apex rewrites the playbook”" },
  { name: "DL News", note: "Editor’s Choice — Risk" },
];

const partners = ["Coinbase Prime", "Binance VIP", "OKX Ventures", "Kraken", "BitGo", "Fireblocks", "Wintermute", "Galaxy Digital"];

export default function SocialProof() {
  return (
    <section className="relative border-y border-white/[0.06] bg-white/[0.015] py-12" aria-label="Social proof">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="text-center font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">
            Featured in · Trusted by desks at
          </p>
        </Reveal>
        <Reveal delay={100}>
          <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {press.map((p) => (
              <li key={p.name} className="group text-center">
                <span className="font-display text-[15px] font-semibold text-white/45 transition group-hover:text-white/85">{p.name}</span>
                <span className="block text-[11px] italic text-white/30">{p.note}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={180}>
          <div className="relative mt-9 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
            <div className="flex w-max animate-marquee gap-14 pr-14">
              {[...partners, ...partners].map((p, i) => (
                <span key={i} className="flex items-center gap-2 whitespace-nowrap text-[13px] font-medium text-white/35 transition hover:text-white/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#b8f135]/50" /> {p}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
