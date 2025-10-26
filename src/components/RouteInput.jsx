import { useState } from 'react';
import { MapPin, Navigation, Search, Bus, ArrowRight } from 'lucide-react';

export default function RouteInput({ onSubmit }) {
  const [busNumber, setBusNumber] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ busNumber, origin, destination });
  };

  const fillDemo = () => {
    setBusNumber('NB-42');
    setOrigin('Downtown Central');
    setDestination('Airport T3');
  };

  return (
    <section className="mx-auto mt-10 w-full max-w-4xl rounded-2xl border border-white/10 bg-white/5 p-6 text-white backdrop-blur">
      <div className="mb-6 flex items-center gap-2">
        <Navigation className="h-5 w-5 text-orange-400" />
        <h2 className="text-lg font-semibold">Enter your travel info</h2>
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-12">
        <div className="md:col-span-3">
          <label className="mb-2 block text-sm text-white/70">Bus number</label>
          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/30 px-3 py-2">
            <Bus className="h-4 w-4 text-white/50" />
            <input
              type="text"
              value={busNumber}
              onChange={(e) => setBusNumber(e.target.value)}
              placeholder="e.g., NB-42"
              className="w-full bg-transparent text-sm outline-none placeholder:text-white/40"
            />
          </div>
        </div>
        <div className="md:col-span-4">
          <label className="mb-2 block text-sm text-white/70">Origin</label>
          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/30 px-3 py-2">
            <MapPin className="h-4 w-4 text-white/50" />
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="Where are you boarding?"
              className="w-full bg-transparent text-sm outline-none placeholder:text-white/40"
            />
          </div>
        </div>
        <div className="md:col-span-4">
          <label className="mb-2 block text-sm text-white/70">Destination</label>
          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/30 px-3 py-2">
            <MapPin className="h-4 w-4 rotate-180 text-white/50" />
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Where are you going?"
              className="w-full bg-transparent text-sm outline-none placeholder:text-white/40"
            />
          </div>
        </div>
        <div className="flex items-end gap-3 md:col-span-1">
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            <Search className="h-4 w-4" />
          </button>
        </div>
      </form>
      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-white/70">
        <button
          onClick={fillDemo}
          className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 transition hover:bg-white/10"
        >
          Quick demo
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={() => onSubmit({ busNumber: '', origin: 'Use GPS', destination: '' })}
          className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 transition hover:bg-white/10"
        >
          Detect via GPS
        </button>
      </div>
    </section>
  );
}
