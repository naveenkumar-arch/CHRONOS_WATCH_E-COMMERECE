export default function Boutiques() {
  return (
    <div className="animate-in fade-in duration-700">
      <div className="relative h-[40vh] w-full bg-neutral-900 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1034008/pexels-photo-1034008.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt="Boutiques"
          className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-overlay"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-semibold tracking-widest text-white sm:text-6xl uppercase text-center px-4">Our Boutiques</h1>
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-5 py-24">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {[
            { city: "Geneva", address: "Rue du Rhône 14, 1204 Genève, Switzerland" },
            { city: "New York", address: "Fifth Avenue, New York, NY 10022, USA" },
            { city: "London", address: "New Bond St, Mayfair, London W1S, UK" },
            { city: "Tokyo", address: "Ginza, Chuo City, Tokyo 104-0061, Japan" },
            { city: "Dubai", address: "Financial Center Rd, Downtown Dubai, UAE" },
            { city: "Paris", address: "Place Vendôme, 75001 Paris, France" },
          ].map((b) => (
            <div key={b.city} className="rounded-2xl border border-white/10 bg-white/5 p-8 transition hover:border-amber-400/50">
              <h3 className="text-2xl font-semibold text-amber-400 mb-2">{b.city}</h3>
              <p className="text-neutral-400">{b.address}</p>
              <button className="mt-6 text-sm font-medium text-white border-b border-amber-400 pb-1 hover:text-amber-400">
                Book Appointment
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
