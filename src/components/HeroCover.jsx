import Spline from '@splinetool/react-spline';
import { Rocket, Map, ShoppingCart, Bell } from 'lucide-react';

export default function HeroCover({ onGetStarted }) {
  return (
    <section className="relative h-[72vh] min-h-[540px] w-full overflow-hidden rounded-2xl bg-black">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/O-AdlP9lTPNz-i8a/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/80" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center text-white">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 backdrop-blur">
          <Rocket className="h-4 w-4 text-orange-300" />
          <span className="text-xs font-medium tracking-wide">Nearbuy Pick · Travel smarter</span>
        </div>
        <h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
          Order ahead along your route
        </h1>
        <p className="mt-4 max-w-2xl text-base text-white/80 sm:text-lg">
          Discover stores and hotels on your path, pre‑order, pay, and pick up when your bus stops. Fast, safe, and effortless.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onGetStarted}
            className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:-translate-y-0.5 hover:bg-orange-600"
          >
            <Map className="h-4 w-4" />
            Get started
          </button>
          <a
            href="#features"
            className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
          >
            <ShoppingCart className="h-4 w-4" />
            How it works
          </a>
          <a
            href="#notifications"
            className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
          >
            <Bell className="h-4 w-4" />
            Alerts
          </a>
        </div>
      </div>
    </section>
  );
}
