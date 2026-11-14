import { ArrowUpRight, AtSign, Globe, MessageSquare, Rss } from "lucide-react";
import { Logo } from "./Navbar";

const cols = [
  {
    title: "Platform",
    links: ["Strategies", "Risk engine", "Dashboard", "API access", "Mobile app", "Changelog"],
  },
  {
    title: "Company",
    links: ["About the desk", "Team", "Careers", "Press kit", "Blog", "Contact"],
  },
  {
    title: "Resources",
    links: ["Fund documents", "Proof of reserves", "Fee schedule", "Risk disclosures", "Tax guides", "Help center"],
  },
  {
    title: "Legal",
    links: ["Terms of service", "Privacy policy", "Disclosures", "Licensing", "Cookie settings"],
  },
];

const socials = [
  { icon: AtSign, label: "Apex Quant on X (Twitter)" },
  { icon: MessageSquare, label: "Apex Quant on Discord" },
  { icon: Globe, label: "Apex Quant blog" },
  { icon: Rss, label: "Apex Quant research feed" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-black/40">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/50">
              A crypto-native trading firm running institutional-grade strategies for
              everyone. Trade like an institution. Keep the upside.
            </p>
            <div className="mt-6 flex gap-2">
              {socials.map((s) => (
                <a key={s.label} href="#top" aria-label={s.label} className="grid h-10 w-10 place-items-center rounded-xl glass text-white/55 transition hover:border-[#b8f135]/40 hover:text-[#b8f135]">
                  <s.icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
            <div className="mt-7 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs text-white/55">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2ee6a8] animate-pulse-dot" />
              All systems operational · 99.98% uptime
            </div>
          </div>

          <nav className="grid grid-cols-2 gap-8 sm:grid-cols-4" aria-label="Footer">
            {cols.map((c) => (
              <div key={c.title}>
                <h3 className="font-display text-sm font-semibold text-white/85">{c.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a href="#top" className="group inline-flex items-center gap-1 text-[13px] text-white/45 transition hover:text-[#b8f135]">
                        {l}
                        <ArrowUpRight className="h-3 w-3 opacity-0 transition group-hover:opacity-100" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 border-t border-white/[0.06] pt-8">
          <p className="text-[11px] leading-relaxed text-white/35">
            <strong className="text-white/50">Risk disclosure:</strong> Apex Quant Capital operates
            discretionary crypto trading strategies. Cryptocurrency investments are highly volatile
            and involve substantial risk, including possible loss of principal. Past performance is
            not indicative of future results. Figures shown on this page are illustrative and based
            on historical fund performance net of fees. This site does not constitute investment
            advice or an offer to sell securities in any jurisdiction. Please read the fund
            documents and risk disclosures carefully before investing.
          </p>
          <div className="mt-6 flex flex-col items-center justify-between gap-3 text-xs text-white/40 sm:flex-row">
            <p>© {new Date().getFullYear()} Apex Quant Capital Ltd. All rights reserved.</p>
            <p className="font-mono">Built for traders · Est. 2021 · Singapore / Dubai / London</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
