import type { Product } from "../data/products";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/format";
import Stars from "./Stars";

type Props = {
  product: Product;
  onView: (p: Product) => void;
};

export default function ProductCard({ product, onView }: Props) {
  const { addToCart } = useCart();

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/60 transition hover:border-amber-400/40 hover:shadow-2xl hover:shadow-black/40">
      <div className="relative aspect-square cursor-pointer overflow-hidden" onClick={() => onView(product)}>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="rounded-full bg-amber-400 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-950">
              New
            </span>
          )}
          {product.bestSeller && (
            <span className="rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-950">
              Best Seller
            </span>
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onView(product);
          }}
          className="absolute inset-x-3 bottom-3 translate-y-4 rounded-full bg-white/95 py-2 text-sm font-medium text-neutral-950 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100"
        >
          Quick View
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-widest text-amber-400/80">{product.brand}</span>
          <span className="text-xs text-neutral-500">{product.category}</span>
        </div>
        <h3 className="mt-1 text-base font-semibold text-white">{product.name}</h3>
        <div className="mt-1.5 flex items-center gap-2">
          <Stars rating={product.rating} />
          <span className="text-xs text-neutral-500">({product.reviews})</span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-lg font-semibold text-white">{formatPrice(product.price)}</span>
          <button
            onClick={() => addToCart(product)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-400 text-neutral-950 transition hover:bg-amber-300"
            aria-label={`Add ${product.name} to cart`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="h-4 w-4">
              <path d="M12 5v14M5 12h14" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
