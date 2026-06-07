import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/format";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CheckoutModal({ isOpen, onClose }: Props) {
  const { subtotal, clearCart, setOpen: setCartOpen } = useCart();
  const [step, setStep] = useState<"details" | "processing" | "success">("details");
  
  const shipping = subtotal > 5000 || subtotal === 0 ? 0 : 35;
  const total = subtotal + shipping;

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && step !== "processing") onClose();
    }
    if (isOpen) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, step]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("processing");
    setTimeout(() => {
      clearCart();
      setStep("success");
    }, 2000);
  };

  const handleClose = () => {
    if (step === "success") {
      setCartOpen(false); // Ensure cart is also closed behind it
    }
    onClose();
    setTimeout(() => setStep("details"), 300); // reset state after animation
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity" onClick={step !== "processing" ? handleClose : undefined} />
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 shadow-2xl">
        
        {step !== "processing" && (
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 transition hover:bg-white/10 hover:text-white"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>
        )}

        <div className="p-8">
          {step === "details" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-semibold text-white">Checkout</h2>
              <p className="mt-1 text-sm text-neutral-400">Total to pay: <span className="font-medium text-white">{formatPrice(total)}</span></p>

              <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5">
                <div>
                  <h3 className="mb-3 text-sm font-medium text-white border-b border-white/10 pb-2">Shipping Details</h3>
                  <div className="grid gap-3">
                    <input required type="text" placeholder="Full Name" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-neutral-600 outline-none transition focus:border-amber-400/50" />
                    <input required type="text" placeholder="Address" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-neutral-600 outline-none transition focus:border-amber-400/50" />
                    <div className="grid grid-cols-2 gap-3">
                      <input required type="text" placeholder="City" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-neutral-600 outline-none transition focus:border-amber-400/50" />
                      <input required type="text" placeholder="Zip Code" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-neutral-600 outline-none transition focus:border-amber-400/50" />
                    </div>
                  </div>
                </div>

                <div className="mt-2">
                  <h3 className="mb-3 text-sm font-medium text-white border-b border-white/10 pb-2">Payment Details</h3>
                  <div className="grid gap-3">
                    <input required type="text" placeholder="Card Number (0000 0000 0000 0000)" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-neutral-600 outline-none transition focus:border-amber-400/50" />
                    <div className="grid grid-cols-2 gap-3">
                      <input required type="text" placeholder="MM/YY" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-neutral-600 outline-none transition focus:border-amber-400/50" />
                      <input required type="text" placeholder="CVC" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-neutral-600 outline-none transition focus:border-amber-400/50" />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-4 w-full rounded-full bg-amber-400 py-3.5 text-sm font-semibold text-neutral-950 transition hover:bg-amber-300"
                >
                  Pay {formatPrice(total)}
                </button>
              </form>
            </div>
          )}

          {step === "processing" && (
            <div className="flex flex-col items-center justify-center py-12 text-center animate-in zoom-in-95 duration-300">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-amber-400/20 border-t-amber-400" />
              <h3 className="mt-6 text-lg font-semibold text-white">Processing Payment</h3>
              <p className="mt-2 text-sm text-neutral-400">Please do not close this window.</p>
            </div>
          )}

          {step === "success" && (
            <div className="flex flex-col items-center justify-center py-10 text-center animate-in zoom-in-95 duration-500">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-400 text-neutral-950">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-8 w-8">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-white">Payment Successful</h3>
              <p className="mt-2 text-sm text-neutral-400">
                Your order has been placed. We've sent a receipt to your email.
              </p>
              <button
                onClick={handleClose}
                className="mt-8 rounded-full border border-white/20 px-8 py-3 text-sm font-medium text-white transition hover:border-amber-400/50 hover:text-amber-400"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
