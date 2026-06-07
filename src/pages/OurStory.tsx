export default function OurStory() {
  return (
    <div className="animate-in fade-in duration-700">
      <div className="relative h-[40vh] w-full bg-neutral-900 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/277319/pexels-photo-277319.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt="Our Story"
          className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-overlay"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-semibold tracking-widest text-white sm:text-6xl uppercase">Our Story</h1>
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-5 py-24 text-neutral-300 leading-relaxed text-lg">
        <p className="mb-6">
          Founded in the heart of Geneva, Chronos was born out of a profound respect for the relentless passage of time.
          Our founders, visionary horologists, sought to create more than mere instruments of measurement; they aimed to 
          forge enduring companions for life's most defining moments.
        </p>
        <p className="mb-6">
          Every gear, every spring, and every polished surface tells a story of uncompromising dedication. 
          We believe that a watch is a bridge between generations, a silent witness to our triumphs, and a testament to 
          the art of slow, deliberate creation in a fast-paced world.
        </p>
        <p>
          Welcome to Chronos. Time, perfected.
        </p>
      </div>
    </div>
  );
}
