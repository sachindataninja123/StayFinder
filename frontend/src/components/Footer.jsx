import React from "react";
import { Link } from "react-router-dom";
import { Globe, DollarSign, } from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const FOOTER_LINKS = [
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "AirCover Protection", href: "/aircover" },
      { label: "Anti-discrimination", href: "/anti-discrimination" },
      { label: "Disability support", href: "/accessibility" },
      { label: "Cancellation options", href: "/cancellations" },
    ],
  },
  {
    title: "Hosting",
    links: [
      { label: "StayHaven your home", href: "/host" },
      { label: "AirCover for Hosts", href: "/host/aircover" },
      { label: "Hosting resources", href: "/host/resources" },
      { label: "Community forum", href: "/community" },
      { label: "Hosting responsibly", href: "/host/responsibility" },
    ],
  },
  {
    title: "StayHaven",
    links: [
      { label: "Newsroom", href: "/news" },
      { label: "New features", href: "/features" },
      { label: "Careers", href: "/careers" },
      { label: "Investors", href: "/investors" },
      { label: "Gift cards", href: "/giftcards" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="border-t border-slate-200/80 bg-slate-50 text-slate-600">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Navigation Sections */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {FOOTER_LINKS.map((column, idx) => (
            <div key={idx} className="flex flex-col gap-3">
              <h4 className="text-sm font-bold text-slate-900">{column.title}</h4>
              <ul className="space-y-2.5 text-sm">
                {column.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link
                      to={link.href}
                      className="transition-colors hover:text-slate-900 hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200/80 pt-8 sm:flex-row text-sm">
          <div className="flex flex-wrap items-center gap-2 text-slate-500">
            <span>© 2026 StayHaven, Inc.</span>
            <span>·</span>
            <Link to="/privacy" className="hover:underline">Privacy</Link>
            <span>·</span>
            <Link to="/terms" className="hover:underline">Terms</Link>
            <span>·</span>
            <Link to="/sitemap" className="hover:underline">Sitemap</Link>
          </div>

          <div className="flex items-center gap-6 font-medium text-slate-800">
            <button className="flex items-center gap-2 hover:underline">
              <Globe className="h-4 w-4" />
              <span>English (US)</span>
            </button>
            <button className="flex items-center gap-1 hover:underline">
              <DollarSign className="h-4 w-4" />
              <span>USD</span>
            </button>
            <div className="flex items-center gap-3 text-slate-600">
              <a href="#" className="hover:text-slate-900"><FaFacebookF className="h-4 w-4" /></a>
              <a href="#" className="hover:text-slate-900"><FaXTwitter className="h-4 w-4" /></a>
              <a href="#" className="hover:text-slate-900"><FaInstagram className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;