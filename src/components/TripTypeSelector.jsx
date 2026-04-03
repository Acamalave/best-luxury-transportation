import { motion } from 'framer-motion';
import { Plane, Clock, Calendar, MapPin } from 'lucide-react';
import { TRIP_TYPES } from '../data/pricing';

const icons = { plane: Plane, clock: Clock, calendar: Calendar, 'map-pin': MapPin };

export default function TripTypeSelector({ selected, onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <h3 className="text-lg font-semibold text-white mb-1">Tipo de viaje</h3>
      <p className="text-sm text-white/50 mb-4">¿Qué necesitas?</p>
      <div className="grid grid-cols-2 gap-3">
        {TRIP_TYPES.map((type) => {
          const Icon = icons[type.icon];
          const isSelected = selected === type.id;
          return (
            <motion.button
              key={type.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelect(type.id)}
              className={`p-4 rounded-2xl border-2 transition-all duration-300 text-left cursor-pointer ${
                isSelected
                  ? 'border-[#C9A84C] bg-[#C9A84C]/10'
                  : 'border-white/10 bg-white/5 hover:border-white/20'
              }`}
            >
              <Icon className={`w-5 h-5 mb-2 ${isSelected ? 'text-[#C9A84C]' : 'text-white/60'}`} />
              <div className={`font-semibold text-sm ${isSelected ? 'text-white' : 'text-white/80'}`}>{type.label}</div>
              <div className="text-xs text-white/40 mt-0.5">{type.description}</div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
