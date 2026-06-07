const features = [
  {
    title: "Free Worldwide Shipping",
    desc: "Insured delivery on every order over $5,000.",
    icon: (
      <path d="M3 13V6h11v7M14 9h4l3 4v3h-7M3 16h11M7 18a2 2 0 100-4 2 2 0 000 4zM18 18a2 2 0 100-4 2 2 0 000 4z" />
    ),
  },
  {
    title: "5-Year Warranty",
    desc: "Every movement backed by our master watchmakers.",
    icon: <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" />,
  },
  {
    title: "Authenticity Guaranteed",
    desc: "Each timepiece ships with a certificate of origin.",
    icon: <path d="M12 3l2.5 5 5.5.8-4 3.9 1 5.5L12 16l-5 2.6 1-5.5-4-3.9 5.5-.8z" />,
  },
  {
    title: "Lifetime Servicing",
    desc: "Complimentary cleaning and calibration, forever.",
    icon: <path d="M12 8v4l3 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
  },
];

export default function Features() {
  return (
    <section className="border-y border-white/10 bg-neutral-900/40">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <div key={f.title} className="flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-amber-400/40 text-amber-400">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                {f.icon}
              </svg>
            </span>
            <div>
              <h3 className="text-sm font-semibold text-white">{f.title}</h3>
              <p className="mt-0.5 text-sm text-neutral-400">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
