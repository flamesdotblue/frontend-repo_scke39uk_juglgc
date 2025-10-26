import { useState } from 'react';
import HeroCover from './components/HeroCover';
import RouteInput from './components/RouteInput';
import FeatureGrid from './components/FeatureGrid';
import StorePreview from './components/StorePreview';
import { User } from 'lucide-react';

function App() {
  const [lastSearch, setLastSearch] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);

  const handleRouteSubmit = (payload) => {
    setLastSearch(payload);
    // In a full app, this would fetch stores along the route.
  };

  return (
    <div className="min-h-screen w-full bg-[#0b0b0f] text-white">
      <header className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 font-bold">NP</div>
          <span className="text-lg font-semibold tracking-tight">Nearbuy Pick</span>
        </div>
        <nav className="hidden items-center gap-6 text-sm text-white/80 sm:flex">
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#stores" className="hover:text-white">Stores</a>
          <a href="#notifications" className="hover:text-white">Notifications</a>
        </nav>
        <button className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium hover:bg-white/10">
          <User className="h-4 w-4" />
          Login
        </button>
      </header>

      <main className="mx-auto max-w-7xl px-6 pb-20">
        <HeroCover onGetStarted={() => {
          const el = document.getElementById('route');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }} />

        <div id="route">
          <RouteInput onSubmit={handleRouteSubmit} />
        </div>

        {lastSearch && (
          <p className="mx-auto mt-3 w-full max-w-4xl text-sm text-white/70">
            Showing results for {lastSearch.busNumber || 'your route'} from {lastSearch.origin || 'current location'} to {lastSearch.destination || 'destination'}.
          </p>
        )}

        <FeatureGrid />

        <div id="stores">
          <StorePreview onSelectStore={(s) => setSelectedStore(s)} />
        </div>

        {selectedStore && (
          <div className="mx-auto mt-6 w-full max-w-4xl rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
            <span className="font-semibold text-white">Selected:</span> {selectedStore.name}. Continue to checkout in the next step.
          </div>
        )}
      </main>

      <footer className="border-t border-white/10 bg-black/40 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm text-white/60 sm:flex-row">
          <p>© {new Date().getFullYear()} Nearbuy Pick. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
