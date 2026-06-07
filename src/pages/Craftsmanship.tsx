export default function Craftsmanship() {
  return (
    <div className="animate-in fade-in duration-700">
      <div className="relative h-[40vh] w-full bg-neutral-900 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/380782/pexels-photo-380782.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt="Craftsmanship"
          className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-overlay"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-semibold tracking-widest text-white sm:text-6xl uppercase text-center px-4">Craftsmanship</h1>
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-5 py-24 text-neutral-300 leading-relaxed text-lg">
        <p className="mb-6">
          Excellence is not an act, but a habit. At Chronos, craftsmanship is the cornerstone of everything we do.
          Our master watchmakers assemble hundreds of microscopic components entirely by hand, ensuring unparalleled precision.
        </p>
        <ul className="list-disc pl-6 space-y-4 mb-6">
          <li><strong>Swiss Movements:</strong> The beating heart of our timepieces, engineered for lifelong accuracy.</li>
          <li><strong>Sapphire Crystal:</strong> Nearly scratch-proof, treated with anti-reflective coatings for flawless clarity.</li>
          <li><strong>Surgical-Grade Steel & Platinum:</strong> Hypoallergenic, robust materials polished to a mirror finish.</li>
        </ul>
        <p>
          When you wear a Chronos, you wear hundreds of hours of focused, obsessive perfectionism on your wrist.
        </p>
      </div>
    </div>
  );
}
