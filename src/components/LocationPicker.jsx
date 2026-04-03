import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { LOCATIONS } from '../data/locations';

export default function LocationPicker({ booking, updateBooking }) {
  const categories = [...new Set(LOCATIONS.map(l => l.category))];

  return (
    <div>
      <h3 className="step-card__title">Punto de recogida</h3>
      <p className="step-card__subtitle">¿Dónde te buscamos?</p>

      {categories.map(cat => (
        <div key={cat}>
          <p className="location-group__title">{cat}</p>
          {LOCATIONS.filter(l => l.category === cat).map(loc => (
            <button
              key={loc.id}
              className={`location-btn ${booking.location === loc.id ? 'active' : ''}`}
              onClick={() => updateBooking('location', loc.id)}
            >
              <MapPin />
              <span className="location-btn__label">{loc.label}</span>
            </button>
          ))}
        </div>
      ))}

      {booking.location === 'custom' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <input
            type="text"
            placeholder="Escribe la dirección completa..."
            value={booking.customAddress}
            onChange={(e) => updateBooking('customAddress', e.target.value)}
            className="location-input"
          />
        </motion.div>
      )}
    </div>
  );
}
