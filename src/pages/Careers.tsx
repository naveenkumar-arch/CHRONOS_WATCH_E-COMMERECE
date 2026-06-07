export default function Careers() {
  return (
    <div className="animate-in fade-in duration-700">
      <div className="relative h-[40vh] w-full bg-neutral-900 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1120275/pexels-photo-1120275.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt="Careers"
          className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-overlay"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-semibold tracking-widest text-white sm:text-6xl uppercase">Careers</h1>
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-5 py-24 text-center">
        <h2 className="text-3xl font-semibold text-white mb-6">Shape the Future of Time</h2>
        <p className="text-lg text-neutral-400 mb-10 leading-relaxed">
          We are always looking for passionate artisans, visionary designers, and dedicated professionals 
          to join our global family. At Chronos, we foster an environment of continuous learning, respect, 
          and creative freedom.
        </p>
        
        <div className="space-y-4 text-left">
          {[
            "Master Watchmaker (Geneva)",
            "Boutique Manager (New York)",
            "Client Experience Specialist (London)",
            "Horological Designer (Paris)"
          ].map((job) => (
            <div key={job} className="flex flex-col sm:flex-row items-center justify-between rounded-xl border border-white/10 bg-neutral-900 p-6">
              <span className="text-lg font-medium text-white mb-4 sm:mb-0">{job}</span>
              <button className="rounded-full bg-white/10 px-6 py-2 text-sm font-medium text-white transition hover:bg-amber-400 hover:text-neutral-950">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
