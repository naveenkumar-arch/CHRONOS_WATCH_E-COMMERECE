import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { formatPrice } from "../utils/format";
import CheckoutModal from "./CheckoutModal";

export default function CartDrawer() {
  const { items, isOpen, setOpen, updateQty, removeFromCart, subtotal, count } = useCart();
  const { user } = useAuth();
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);
  const [authError, setAuthError] = useState(false);

  const shipping = subtotal > 5000 || subtotal === 0 ? 0 : 35;
  const total = subtotal + shipping;

  function checkout() {
    if (!user) {
      setAuthError(true);
      setTimeout(() => setAuthError(false), 3000);
      return;
    }
    setCheckoutOpen(true);
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/70 transition-opacity ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-neutral-950 shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h2 className="text-lg font-semibold text-white">
            Your Cart {count > 0 && <span className="text-amber-400">({count})</span>}
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-400 transition hover:bg-white/10 hover:text-white"
            aria-label="Close cart"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 text-neutral-500">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
                <path d="M6 6h15l-1.5 9h-12z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 6 5 3H3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-neutral-400">Your cart is empty</p>
            <button
              onClick={() => setOpen(false)}
              className="rounded-full border border-white/20 px-6 py-2.5 text-sm font-medium text-white transition hover:border-amber-400/50 hover:text-amber-400"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 shrink-0 rounded-xl object-cover"
                    />
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between gap-2">
                        <div>
                          <p className="text-sm font-medium text-white">{item.name}</p>
                          <p className="text-xs text-neutral-500">{item.brand}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-neutral-500 transition hover:text-red-400"
                          aria-label="Remove"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
                            <path d="M5 7h14M9 7V5h6v2M10 11v6M14 11v6M6 7l1 13h10l1-13" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center rounded-full border border-white/15">
                          <button
                            onClick={() => updateQty(item.id, item.qty - 1)}
                            className="flex h-7 w-7 items-center justify-center text-neutral-300 transition hover:text-white"
                          >
                            −
                          </button>
                          <span className="w-6 text-center text-sm text-white">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.id, item.qty + 1)}
                            className="flex h-7 w-7 items-center justify-center text-neutral-300 transition hover:text-white"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-sm font-semibold text-white">
                          {formatPrice(item.price * item.qty)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-white/10 px-5 py-4">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span className="text-white">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Shipping</span>
                  <span className="text-white">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-2 text-base font-semibold text-white">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
              <button
                onClick={checkout}
                className="mt-4 w-full rounded-full bg-amber-400 py-3.5 text-sm font-semibold text-neutral-950 transition hover:bg-amber-300"
              >
                Checkout
              </button>
              {authError && (
                <p className="mt-3 text-center text-xs text-red-400 animate-pulse">
                  Please sign in to continue with checkout.
                </p>
              )}
            </div>
          </>
        )}
      </aside>

      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setCheckoutOpen(false)} />
    </>
  );
}
