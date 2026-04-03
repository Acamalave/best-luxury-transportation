import { motion, AnimatePresence } from 'framer-motion';
import { useRegion } from '../hooks/useRegion';
import { REGIONS } from '../data/regions';
import { MapPin, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function RegionOverlay() {
  const { hasSelected, setRegion } = useRegion();

  if (hasSelected) return null;

  return (
    <motion.div
      className="region-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="region-overlay__content">
        <div className="region-overlay__icon">
          <MapPin size={28} />
        </div>
        <h2 className="region-overlay__title">¿Dónde necesitas el servicio?</h2>
        <p className="region-overlay__desc">Selecciona tu ubicación para ver precios y servicios disponibles</p>

        <div className="region-overlay__cards">
          {Object.values(REGIONS).map((r) => (
            <motion.button
              key={r.id}
              className="region-card"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setRegion(r.id)}
            >
              <span className="region-card__flag">{r.flag}</span>
              <span className="region-card__label">{r.label}</span>
              <span className="region-card__vehicle">{r.vehicle.name}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function RegionPill() {
  const { regionData, setRegion, hasSelected } = useRegion();
  const [open, setOpen] = useState(false);

  if (!hasSelected) return null;

  return (
    <div className="region-pill-wrapper">
      <button className="region-pill" onClick={() => setOpen(!open)}>
        <span className="region-pill__flag">{regionData.flag}</span>
        <span className="region-pill__label">{regionData.label}</span>
        <ChevronDown size={14} className={`region-pill__arrow ${open ? 'open' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="region-dropdown"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            {Object.values(REGIONS).filter(r => r.id !== regionData.id).map((r) => (
              <button
                key={r.id}
                className="region-dropdown__item"
                onClick={() => { setRegion(r.id); setOpen(false); }}
              >
                <span>{r.flag}</span>
                <span>{r.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
