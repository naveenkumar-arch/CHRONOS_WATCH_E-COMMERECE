import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { categories } from "../data/products";
import AuthModal from "./AuthModal";
import ProfileModal from "./ProfileModal";

export default function Navbar() {
  const { count, setOpen } = useCart();
  const { user, logout } = useAuth();
  const [isAuthOpen, setAuthOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const active = searchParams.get("category") || "All";

  function handleSelect(c: string) {
    if (c === "All") {
      navigate("/");
    } else {
      navigate(`/?category=${c}`);
    }
  }

  function handleSearch(q: string) {
    if (q) {
      navigate(`/?q=${q}`);
    } else {
      navigate("/");
    }
  }

  return (
    <>
    <header className="sticky top-0 z-40 border-b border-white/10 bg-neutral-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src="/logo.png" alt="Chronos Logo" className="h-9 w-9 rounded-full object-cover border border-amber-400/60" />
          <span className="text-xl font-semibold tracking-[0.25em] text-white">CHRONOS</span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-8 lg:flex">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => handleSelect(c)}
              className={`text-sm tracking-wide transition hover:text-amber-400 ${
                active === c ? "text-amber-400 font-medium" : "text-neutral-400"
              }`}
            >
              {c}
            </button>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-4 lg:flex-none">
          <div className="relative hidden sm:block">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search timepieces..."
              onChange={(e) => handleSearch(e.target.value)}
              className="w-48 rounded-full border border-white/10 bg-white/5 py-1.5 pl-9 pr-4 text-sm text-white placeholder-neutral-500 outline-none transition focus:border-amber-400/50 focus:w-64"
            />
          </div>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-neutral-300 hidden md:block">Hi, {user.name}</span>
              <button
                onClick={() => setProfileOpen(true)}
                className="rounded-full border border-white/20 px-4 py-1.5 text-xs font-medium text-white transition hover:border-amber-400/50 hover:text-amber-400"
              >
                Profile
              </button>
              <button
                onClick={logout}
                className="rounded-full border border-white/20 px-4 py-1.5 text-xs font-medium text-neutral-400 transition hover:border-red-400/50 hover:text-red-400"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => setAuthOpen(true)}
              className="rounded-full bg-white/10 px-5 py-2 text-sm font-medium text-white transition hover:bg-amber-400 hover:text-neutral-950"
            >
              Sign In
            </button>
          )}

          <button
            onClick={() => setOpen(true)}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white transition hover:border-amber-400/50 hover:text-amber-400"
            aria-label="Open cart"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
              <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[10px] font-bold text-neutral-950">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="flex gap-1 overflow-x-auto px-5 pb-3 lg:hidden">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => handleSelect(c)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm transition ${
              active === c ? "bg-amber-400 text-neutral-950 font-medium" : "text-neutral-300 bg-white/5"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
    </header>
    <AuthModal isOpen={isAuthOpen} onClose={() => setAuthOpen(false)} />
    <ProfileModal isOpen={isProfileOpen} onClose={() => setProfileOpen(false)} />
    </>
  );
}
