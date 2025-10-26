import { Star, MapPin, Phone, ArrowRight } from 'lucide-react';

const demoStores = [
  {
    id: 's1',
    name: 'Transit Mart – Central Plaza',
    distance: '450 m from Stop A',
    eta: 'ETA 12 min',
    rating: 4.7,
    contact: '+1 (555) 012-3456',
    categories: ['Snacks', 'Beverages', 'Essentials'],
  },
  {
    id: 's2',
    name: 'Runway Inn Café',
    distance: '200 m from Airport T3 Gate',
    eta: 'ETA 28 min',
    rating: 4.5,
    contact: '+1 (555) 111-0999',
    categories: ['Coffee', 'Sandwiches', 'Desserts'],
  },
  {
    id: 's3',
    name: 'Lakeside Hotel Deli',
    distance: '100 m from Lakeside Stop',
    eta: 'ETA 44 min',
    rating: 4.8,
    contact: '+1 (555) 222-9876',
    categories: ['Hot Meals', 'Drinks', 'Souvenirs'],
  },
];

export default function StorePreview({ onSelectStore }) {
  return (
    <section className="mx-auto mt-12 max-w-7xl px-6 text-white">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Stores on your route</h2>
        <a href="#" className="text-sm text-orange-400 hover:underline">
          View all
        </a>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {demoStores.map((s) => (
          <div
            key={s.id}
            className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold">{s.name}</h3>
                  <div className="mt-1 flex items-center gap-2 text-sm text-white/70">
                    <MapPin className="h-4 w-4" />
                    <span>{s.distance}</span>
                    <span className="text-white/40">•</span>
                    <span>{s.eta}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-white/10 px-2 py-1 text-sm">
                  <Star className="h-4 w-4 text-yellow-300" />
                  <span>{s.rating}</span>
                </div>
              </div>
              <p className="mt-3 text-sm text-white/70">{s.categories.join(' • ')}</p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <a href={`tel:${s.contact}`} className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white">
                <Phone className="h-4 w-4" />
                {s.contact}
              </a>
              <button
                onClick={() => onSelectStore?.(s)}
                className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                Order
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
