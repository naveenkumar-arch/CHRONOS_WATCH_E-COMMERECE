export default function Hero({ onShop }: { onShop: () => void }) {
  return (
    <section id="home" className="relative overflow-hidden border-b border-white/10">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/13273980/pexels-photo-13273980.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1400)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/85 to-neutral-950/30" />

      <div className="relative mx-auto flex max-w-7xl flex-col justify-center px-5 py-24 sm:py-32 lg:py-40">
        <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-amber-300">
          Swiss-Inspired Craftsmanship
        </span>
        <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-white sm:text-6xl">
          Time, perfected.
          <span className="block text-amber-400">Worn with intention.</span>
        </h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-neutral-300 sm:text-lg">
          Discover a curated collection of automatic, chronograph, and diamond timepieces — engineered to last
          generations and designed to be admired.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <button
            onClick={onShop}
            className="rounded-full bg-amber-400 px-8 py-3.5 text-sm font-semibold text-neutral-950 transition hover:bg-amber-300"
          >
            Explore Collection
          </button>
          <a
            href="#bestsellers"
            className="rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-white transition hover:border-amber-400/50 hover:text-amber-400"
          >
            Best Sellers
          </a>
        </div>

        <div className="mt-14 flex flex-wrap gap-x-10 gap-y-4 text-white">
          {[
            ["12+", "Signature models"],
            ["5yr", "Movement warranty"],
            ["24/7", "Concierge support"],
          ].map(([n, l]) => (
            <div key={l}>
              <div className="text-2xl font-semibold text-amber-400">{n}</div>
              <div className="text-sm text-neutral-400">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
