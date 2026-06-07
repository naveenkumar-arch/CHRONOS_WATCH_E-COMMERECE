import { useEffect } from "react";
import type { Product } from "../data/products";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/format";
import Stars from "./Stars";

type Props = {
  product: Product | null;
  onClose: () => void;
};

export default function ProductModal({ product, onClose }: Props) {
  const { addToCart } = useCart();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (product) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [product, onClose]);

  if (!product) return null;

  const specs = [
    ["Movement", product.movement],
    ["Case Size", product.caseSize],
    ["Water Resistance", product.waterResistance],
    ["Brand", product.brand],
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative grid max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 md:grid-cols-2">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/80"
          aria-label="Close"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
            <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
          </svg>
        </button>

        <div className="aspect-square md:aspect-auto">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        </div>

        <div className="flex flex-col overflow-y-auto p-7">
          <span className="text-xs uppercase tracking-[0.2em] text-amber-400">{product.brand}</span>
          <h2 className="mt-2 text-2xl font-semibold text-white">{product.name}</h2>
          <div className="mt-2 flex items-center gap-2">
            <Stars rating={product.rating} />
            <span className="text-sm text-neutral-400">
              {product.rating} · {product.reviews} reviews
            </span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-neutral-400">{product.description}</p>

          <dl className="mt-6 grid grid-cols-2 gap-3">
            {specs.map(([k, v]) => (
              <div key={k} className="rounded-xl border border-white/10 bg-white/5 p-3">
                <dt className="text-[11px] uppercase tracking-wider text-neutral-500">{k}</dt>
                <dd className="mt-0.5 text-sm font-medium text-white">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-auto pt-7">
            <div className="mb-4 text-3xl font-semibold text-white">{formatPrice(product.price)}</div>
            <button
              onClick={() => {
                addToCart(product);
                onClose();
              }}
              className="w-full rounded-full bg-amber-400 py-3.5 text-sm font-semibold text-neutral-950 transition hover:bg-amber-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
