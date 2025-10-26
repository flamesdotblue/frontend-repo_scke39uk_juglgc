import { Clock, CreditCard, Shield, Store } from 'lucide-react';

const features = [
  {
    icon: Store,
    title: 'Stores along your route',
    desc: 'Discover convenience stores and hotels near upcoming stops with distance and ETA.',
  },
  {
    icon: CreditCard,
    title: 'Secure payments',
    desc: 'Pay in seconds with modern, PCI-compliant checkout. Test mode ready.',
  },
  {
    icon: Clock,
    title: 'Pickup just in time',
    desc: 'Your order is timed with your bus arrival so you never miss it.',
  },
  {
    icon: Shield,
    title: 'Trusted & verified',
    desc: 'Ratings, reviews, and verified partners keep your journey worry-free.',
  },
];

export default function FeatureGrid() {
  return (
    <section id="features" className="mx-auto mt-16 max-w-7xl px-6 text-white">
      <h2 className="text-center text-2xl font-semibold">Why Nearbuy Pick?</h2>
      <p className="mx-auto mt-2 max-w-2xl text-center text-white/70">
        A modern ordering experience designed for travelers. No detours, no delays.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <div
            key={f.title}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-5 transition hover:from-white/20 hover:to-white/10"
          >
            <f.icon className="h-6 w-6 text-orange-400" />
            <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
            <p className="mt-1 text-sm text-white/70">{f.desc}</p>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-orange-500/0 via-orange-500/60 to-orange-500/0 opacity-0 transition group-hover:opacity-100" />
          </div>
        ))}
      </div>
    </section>
  );
}
