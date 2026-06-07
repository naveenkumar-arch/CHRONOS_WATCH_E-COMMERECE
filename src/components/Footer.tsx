import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-neutral-950 pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="Chronos Logo" className="h-9 w-9 rounded-full object-cover border border-amber-400/60" />
              <span className="text-lg font-semibold tracking-[0.25em] text-white">CHRONOS</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-400">
              Timeless craftsmanship for the modern collector. Designed in Geneva, worn worldwide.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-white">Shop</h4>
            <ul className="mt-4 space-y-3 text-sm text-neutral-400">
              <li><Link to="/" className="transition hover:text-amber-400">New Arrivals</Link></li>
              <li><Link to="/#bestsellers" className="transition hover:text-amber-400">Best Sellers</Link></li>
              <li><Link to="/?category=Chronograph" className="transition hover:text-amber-400">Chronographs</Link></li>
              <li><Link to="/?category=Diver" className="transition hover:text-amber-400">Diver Watches</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-white">Company</h4>
            <ul className="mt-4 space-y-3 text-sm text-neutral-400">
              <li><Link to="/our-story" className="transition hover:text-amber-400">Our Story</Link></li>
              <li><Link to="/craftsmanship" className="transition hover:text-amber-400">Craftsmanship</Link></li>
              <li><Link to="/boutiques" className="transition hover:text-amber-400">Boutiques</Link></li>
              <li><Link to="/careers" className="transition hover:text-amber-400">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-white">Stay in time</h4>
            <p className="mt-4 text-sm text-neutral-400">Subscribe for new releases and private previews.</p>
            <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Email address"
                className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder-neutral-500 outline-none transition focus:border-amber-400/50"
              />
              <button type="submit" className="shrink-0 rounded-full bg-amber-400 px-6 py-2 text-sm font-medium text-neutral-950 transition hover:bg-amber-300">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center justify-between border-t border-white/10 pt-8 sm:flex-row text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} Chronos Watchmakers. All rights reserved.</p>
          <div className="mt-4 flex gap-6 sm:mt-0">
            <Link to="#" className="transition hover:text-white">Privacy Policy</Link>
            <Link to="#" className="transition hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
