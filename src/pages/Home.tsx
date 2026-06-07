import { useMemo, useRef, useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { products, type Product } from "../data/products";
import Hero from "../components/Hero";
import Features from "../components/Features";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
] as const;

export default function Home() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const category = searchParams.get("category") || "All";
  const search = searchParams.get("q") || "";
  
  const [sort, setSort] = useState<string>("featured");
  const [selected, setSelected] = useState<Product | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Scroll to grid if category or search changes via links
  useEffect(() => {
    if (location.search && gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.search]);

  // Scroll to bestsellers if hash is #bestsellers
  useEffect(() => {
    if (location.hash === "#bestsellers") {
      const el = document.getElementById("bestsellers");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.hash]);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const matchCat = category === "All" || p.category === category;
      const q = search.trim().toLowerCase();
      const matchSearch =
        !q || p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [category, search, sort]);

  const bestSellers = products.filter((p) => p.bestSeller);

  function scrollToGrid() {
    gridRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <Hero onShop={scrollToGrid} />
      <Features />

      {/* Best sellers strip */}
      <section id="bestsellers" className="mx-auto max-w-7xl px-5 py-14">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-amber-400">Most Coveted</span>
            <h2 className="mt-1 text-2xl font-semibold sm:text-3xl">Best Sellers</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-3">
          {bestSellers.map((p) => (
            <ProductCard key={p.id} product={p} onView={setSelected} />
          ))}
        </div>
      </section>

      {/* Full collection */}
      <section ref={gridRef} className="mx-auto max-w-7xl px-5 py-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-amber-400">The Collection</span>
            <h2 className="mt-1 text-2xl font-semibold sm:text-3xl">
              {category === "All" ? "All Timepieces" : category}
              <span className="ml-2 text-base font-normal text-neutral-500">({filtered.length})</span>
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-neutral-400">Sort</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none focus:border-amber-400/50"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value} className="bg-neutral-900">
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
            <p className="text-lg text-neutral-300">No timepieces found</p>
            <p className="text-sm text-neutral-500">Try adjusting your search or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} onView={setSelected} />
            ))}
          </div>
        )}
      </section>

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </>
  );
}
