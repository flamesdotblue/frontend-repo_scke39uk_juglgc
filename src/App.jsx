import { useMemo, useState } from 'react';
import HeroCover from './components/HeroCover';
import RouteInput from './components/RouteInput';
import FeatureGrid from './components/FeatureGrid';
import StorePreview from './components/StorePreview';
import { ShoppingCart, User, Home, Map } from 'lucide-react';

function Shell({ children, cartCount = 0 }) {
  return (
    <div className="min-h-screen w-full bg-[#0b0b0f] text-white">
      <header className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <a href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 font-bold">NP</div>
          <span className="text-lg font-semibold tracking-tight">Nearbuy Pick</span>
        </a>
        <nav className="hidden items-center gap-6 text-sm text-white/80 sm:flex">
          <a href="/" className="hover:text-white inline-flex items-center gap-1">
            <Home className="h-4 w-4" /> Home
          </a>
          <a href="#route" className="hover:text-white inline-flex items-center gap-1">
            <Map className="h-4 w-4" /> Enter Trip
          </a>
          <a href="#stores" className="hover:text-white">Stores</a>
        </nav>
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium">
            <ShoppingCart className="h-4 w-4" />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="ml-1 rounded-md bg-orange-500 px-1.5 py-0.5 text-xs font-semibold text-white">{cartCount}</span>
            )}
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium">
            <User className="h-4 w-4" />
            Login
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 pb-20">{children}</main>

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

export default function App() {
  const [lastSearch, setLastSearch] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);
  const [cart, setCart] = useState([]);

  const handleRouteSubmit = (payload) => {
    setLastSearch(payload);
    const el = document.getElementById('stores');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const addToCart = (item) => setCart((c) => [...c, item]);
  const removeFromCart = (idx) => setCart((c) => c.filter((_, i) => i !== idx));
  const clearCart = () => setCart([]);
  const total = useMemo(() => cart.reduce((sum, i) => sum + i.price, 0), [cart]);

  return (
    <Shell cartCount={cart.length}>
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
        <section className="mx-auto mt-12 w-full max-w-5xl rounded-2xl border border-white/10 bg-white/5 p-6 text-white">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Menu — {selectedStore.name}</h2>
            <button
              onClick={() => setSelectedStore(null)}
              className="text-sm text-white/70 hover:text-white"
            >
              Close
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { id: 'i1', name: 'Iced Coffee', price: 3.99, desc: 'Chilled brew, 12oz' },
              { id: 'i2', name: 'Chicken Sandwich', price: 5.49, desc: 'Fresh & to-go' },
              { id: 'i3', name: 'Protein Bar', price: 2.29, desc: 'Chocolate chip' },
              { id: 'i4', name: 'Water 500ml', price: 1.49, desc: 'Still, chilled' },
            ].map((it) => (
              <div key={it.id} className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-5">
                <div>
                  <h3 className="text-lg font-semibold">{it.name}</h3>
                  <p className="mt-1 text-sm text-white/70">{it.desc}</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-white/90">${it.price.toFixed(2)}</span>
                  <button
                    onClick={() => addToCart({ ...it, storeId: selectedStore.id, storeName: selectedStore.name })}
                    className="rounded-lg bg-white/10 px-3 py-2 text-sm hover:bg:white/20"
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto mt-12 w-full max-w-3xl">
        <h2 className="mb-3 text-lg font-semibold">Cart</h2>
        {cart.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white/70">
            Your cart is empty. Add items from a store.
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((i, idx) => (
              <div key={idx} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
                <div>
                  <p className="font-medium">{i.name}</p>
                  <p className="text-sm text-white/60">{i.storeName}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span>${i.price.toFixed(2)}</span>
                  <button onClick={() => removeFromCart(idx)} className="text-sm text-white/70 hover:text-white">Remove</button>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">${total.toFixed(2)}</span>
            </div>
            <button
              onClick={() => {
                clearCart();
                alert('Payment simulated. Order placed!');
              }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-3 font-semibold hover:bg-orange-600"
            >
              Pay with Stripe (Test)
            </button>
            <p className="text-xs text-white/60">Payment is simulated for this demo. In production this will open a secure Stripe Checkout.</p>
          </div>
        )}
      </section>
    </Shell>
  );
}
