import { motion } from 'framer-motion';
import { Plane, Clock, Calendar, MapPin } from 'lucide-react';
import { TRIP_TYPES } from '../data/pricing';

const icons = { plane: Plane, clock: Clock, calendar: Calendar, 'map-pin': MapPin };

export default function TripTypeSelector({ selected, onSelect }) {
  return (
    <div>
      <h3 className="step-card__title">Tipo de viaje</h3>
      <p className="step-card__subtitle">¿Qué necesitas?</p>
      <div className="option-grid">
        {TRIP_TYPES.map((type) => {
          const Icon = icons[type.icon];
          return (
            <button
              key={type.id}
              className={`option-btn ${selected === type.id ? 'active' : ''}`}
              onClick={() => onSelect(type.id)}
            >
              <Icon />
              <div className="option-btn__label">{type.label}</div>
              <div className="option-btn__desc">{type.description}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
