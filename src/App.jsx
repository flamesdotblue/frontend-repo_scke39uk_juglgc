import { useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import HeroCover from './components/HeroCover';
import RouteInput from './components/RouteInput';
import FeatureGrid from './components/FeatureGrid';
import StorePreview from './components/StorePreview';
import { User, ShoppingCart, Map, Home, ChevronRight, BadgeCheck } from 'lucide-react';

function Shell({ children, cartCount = 0 }) {
  return (
    <div className="min-h-screen w-full bg-[#0b0b0f] text-white">
      <header className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 font-bold">NP</div>
          <span className="text-lg font-semibold tracking-tight">Nearbuy Pick</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-white/80 sm:flex">
          <Link to="/" className="hover:text-white inline-flex items-center gap-1">
            <Home className="h-4 w-4" /> Home
          </Link>
          <Link to="/enter" className="hover:text-white inline-flex items-center gap-1">
            <Map className="h-4 w-4" /> Enter Trip
          </Link>
          <Link to="/stores" className="hover:text-white">Stores</Link>
          <Link to="/track" className="hover:text-white">Track</Link>
          <Link to="/profile" className="hover:text-white">Profile</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/checkout" className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium hover:bg-white/10">
            <ShoppingCart className="h-4 w-4" />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="ml-1 rounded-md bg-orange-500 px-1.5 py-0.5 text-xs font-semibold text-white">{cartCount}</span>
            )}
          </Link>
          <Link to="/login" className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium hover:bg-white/10">
            <User className="h-4 w-4" />
            Login
          </Link>
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

function HomePage({ onGetStarted, onSubmitRoute, lastSearch, onSelectStore }) {
  return (
    <>
      <HeroCover onGetStarted={onGetStarted} />

      <div id="route">
        <RouteInput onSubmit={onSubmitRoute} />
      </div>

      {lastSearch && (
        <p className="mx-auto mt-3 w-full max-w-4xl text-sm text-white/70">
          Showing results for {lastSearch.busNumber || 'your route'} from {lastSearch.origin || 'current location'} to {lastSearch.destination || 'destination'}.
        </p>
      )}

      <FeatureGrid />

      <div id="stores">
        <StorePreview onSelectStore={onSelectStore} />
      </div>
    </>
  );
}

function EnterPage({ onSubmitRoute }) {
  const navigate = useNavigate();
  return (
    <section className="mx-auto w-full max-w-4xl">
      <div className="mb-6 flex items-center gap-2 text-white/80">
        <Map className="h-5 w-5 text-orange-400" />
        <h1 className="text-xl font-semibold">Enter Travel Info</h1>
      </div>
      <RouteInput
        onSubmit={(payload) => {
          onSubmitRoute(payload);
          navigate('/stores');
        }}
      />
      <p className="mt-4 text-sm text-white/70">After submitting, you will see stores available along your route.</p>
    </section>
  );
}

function StoresPage({ onSelectStore }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Stores on Route</h1>
        <p className="text-sm text-white/60">Pick a store to view menu</p>
      </div>
      <StorePreview
        onSelectStore={(s) => {
          onSelectStore(s);
          navigate(`/menu/${s.id}`);
        }}
      />
    </>
  );
}

const demoItems = [
  { id: 'i1', name: 'Iced Coffee', price: 3.99, desc: 'Chilled brew, 12oz' },
  { id: 'i2', name: 'Chicken Sandwich', price: 5.49, desc: 'Fresh & to-go' },
  { id: 'i3', name: 'Protein Bar', price: 2.29, desc: 'Chocolate chip' },
  { id: 'i4', name: 'Water 500ml', price: 1.49, desc: 'Still, chilled' },
];

function MenuPage({ selectedStore, onAdd }) {
  const { storeId } = useParams();
  const resolvedStore = selectedStore || { id: storeId, name: 'Selected Store' };
  const navigate = useNavigate();
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">{resolvedStore.name}</h1>
          <p className="text-sm text-white/60">Browse items and add to cart</p>
        </div>
        <button onClick={() => navigate('/checkout')} className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold hover:bg-orange-600">
          Go to Checkout <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {demoItems.map((it) => (
          <div key={it.id} className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-5">
            <div>
              <h3 className="text-lg font-semibold">{it.name}</h3>
              <p className="mt-1 text-sm text-white/70">{it.desc}</p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-white/90">${it.price.toFixed(2)}</span>
              <button onClick={() => onAdd({ ...it, storeId: resolvedStore.id, storeName: resolvedStore.name })} className="rounded-lg bg-white/10 px-3 py-2 text-sm hover:bg-white/20">Add</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CheckoutPage({ cart, onRemove, onClear }) {
  const navigate = useNavigate();
  const total = useMemo(() => cart.reduce((sum, i) => sum + i.price, 0), [cart]);
  return (
    <section className="mx-auto w-full max-w-3xl">
      <h1 className="mb-4 text-xl font-semibold">Cart & Checkout</h1>
      {cart.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white/70">
          Your cart is empty. <button onClick={() => navigate('/stores')} className="text-orange-400 underline">Find stores</button>
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
                <button onClick={() => onRemove(idx)} className="text-sm text-white/70 hover:text-white">Remove</button>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
            <span className="font-semibold">Total</span>
            <span className="font-semibold">${total.toFixed(2)}</span>
          </div>
          <button
            onClick={() => {
              onClear();
              navigate('/track');
            }}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-3 font-semibold hover:bg-orange-600"
          >
            Pay with Stripe (Test)
          </button>
          <p className="text-xs text-white/60">Payment is simulated for this demo. In production this will open a secure Stripe Checkout.</p>
        </div>
      )}
    </section>
  );
}

function TrackPage() {
  return (
    <section className="mx-auto w-full max-w-4xl">
      <h1 className="text-xl font-semibold">Order Tracking</h1>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:col-span-2">
          <div className="mb-3 text-sm text-white/70">Live route map preview</div>
          <div className="h-64 w-full rounded-xl bg-gradient-to-br from-slate-800 to-slate-900" />
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h3 className="font-semibold">Status</h3>
          <ul className="mt-2 space-y-2 text-sm text-white/80">
            <li className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-green-400" /> Order confirmed</li>
            <li className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-green-400" /> Being prepared</li>
            <li className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-green-400" /> Ready for pickup</li>
          </ul>
          <div className="mt-4 rounded-lg bg-black/40 p-3 text-xs text-white/60">ETA aligns with your bus stop timing.</div>
        </div>
      </div>
    </section>
  );
}

function ProfilePage() {
  const demoHistory = [
    { id: 'o123', date: '2024-08-11', store: 'Transit Mart – Central Plaza', total: 12.77, status: 'Completed' },
    { id: 'o124', date: '2024-09-02', store: 'Runway Inn Café', total: 7.48, status: 'Completed' },
  ];
  return (
    <section className="mx-auto w-full max-w-4xl">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Profile & Order History</h1>
        <Link to="/login" className="text-sm text-white/70 hover:text-white">Logout</Link>
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <h3 className="font-semibold">Recent Orders</h3>
        <div className="mt-3 divide-y divide-white/10 text-sm">
          {demoHistory.map((o) => (
            <div key={o.id} className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium">{o.store}</p>
                <p className="text-xs text-white/60">{o.date} • {o.id}</p>
              </div>
              <div className="text-right">
                <p>${o.total.toFixed(2)}</p>
                <p className="text-xs text-green-400">{o.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LoginPage() {
  const navigate = useNavigate();
  return (
    <section className="mx-auto w-full max-w-md">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold">Welcome back</h1>
        <p className="mt-1 text-white/70">Sign in to manage your trips and orders</p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate('/profile');
        }}
        className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6"
      >
        <div>
          <label className="mb-2 block text-sm text-white/70">Email</label>
          <input type="email" required className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none placeholder:text-white/40" placeholder="you@example.com" />
        </div>
        <div>
          <label className="mb-2 block text-sm text-white/70">Password</label>
          <input type="password" required className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none placeholder:text-white/40" placeholder="••••••••" />
        </div>
        <button type="submit" className="inline-flex w-full items-center justify-center rounded-lg bg-orange-500 px-4 py-2 font-semibold hover:bg-orange-600">Sign in</button>
        <p className="text-center text-xs text-white/60">New here? Use the Enter Trip flow to start browsing.</p>
      </form>
    </section>
  );
}

function App() {
  const [lastSearch, setLastSearch] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);
  const [cart, setCart] = useState([]);

  const handleRouteSubmit = (payload) => {
    setLastSearch(payload);
  };

  const addToCart = (item) => setCart((c) => [...c, item]);
  const removeFromCart = (idx) => setCart((c) => c.filter((_, i) => i !== idx));
  const clearCart = () => setCart([]);

  return (
    <BrowserRouter>
      <Shell cartCount={cart.length}>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onGetStarted={() => {
                  const el = document.getElementById('route');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                onSubmitRoute={handleRouteSubmit}
                lastSearch={lastSearch}
                onSelectStore={(s) => setSelectedStore(s)}
              />
            }
          />
          {/* 1. Welcome / Login */}
          <Route path="/login" element={<LoginPage />} />
          {/* 2. Enter Travel Info */}
          <Route path="/enter" element={<EnterPage onSubmitRoute={handleRouteSubmit} />} />
          {/* 3. Stores on Route */}
          <Route path="/stores" element={<StoresPage onSelectStore={(s) => setSelectedStore(s)} />} />
          {/* 4. Store Menu / Items */}
          <Route path="/menu/:storeId" element={<MenuPage selectedStore={selectedStore} onAdd={addToCart} />} />
          {/* 5. Cart & Checkout */}
          <Route path="/checkout" element={<CheckoutPage cart={cart} onRemove={removeFromCart} onClear={clearCart} />} />
          {/* 6. Order Tracking */}
          <Route path="/track" element={<TrackPage />} />
          {/* 7. Profile & Order History */}
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Shell>
    </BrowserRouter>
  );
}

export default App;
