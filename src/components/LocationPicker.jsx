import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { LOCATIONS } from '../data/locations';

export default function LocationPicker({ booking, updateBooking }) {
  const categories = [...new Set(LOCATIONS.map(l => l.category))];

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="text-lg font-semibold text-white mb-1">Punto de recogida</h3>
      <p className="text-sm text-white/50 mb-4">¿Dónde te buscamos?</p>

      <div className="space-y-4">
        {categories.map(cat => (
          <div key={cat}>
            <p className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-2">{cat}</p>
            <div className="space-y-1.5">
              {LOCATIONS.filter(l => l.category === cat).map(loc => (
                <button
                  key={loc.id}
                  onClick={() => updateBooking('location', loc.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left cursor-pointer ${
                    booking.location === loc.id
                      ? 'border-[#C9A84C] bg-[#C9A84C]/10'
                      : 'border-white/5 bg-white/5 hover:border-white/15'
                  }`}
                >
                  <MapPin className={`w-4 h-4 flex-shrink-0 ${
                    booking.location === loc.id ? 'text-[#C9A84C]' : 'text-white/40'
                  }`} />
                  <span className={`text-sm ${
                    booking.location === loc.id ? 'text-white' : 'text-white/70'
                  }`}>
                    {loc.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {booking.location === 'custom' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-3"
        >
          <input
            type="text"
            placeholder="Escribe la dirección completa..."
            value={booking.customAddress}
            onChange={(e) => updateBooking('customAddress', e.target.value)}
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#C9A84C] transition-colors"
          />
        </motion.div>
      )}
    </motion.div>
  );
}
