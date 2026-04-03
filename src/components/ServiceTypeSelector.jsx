import { motion } from 'framer-motion';
import { UserCheck, Car } from 'lucide-react';
import { SERVICE_TYPES } from '../data/pricing';

const icons = { 'user-check': UserCheck, car: Car };

export default function ServiceTypeSelector({ selected, onSelect }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-1">Tipo de servicio</h3>
      <p className="text-sm text-white/50 mb-4">Elige cómo quieres tu Escalade</p>
      <div className="grid grid-cols-2 gap-3">
        {SERVICE_TYPES.map((type) => {
          const Icon = icons[type.icon];
          const isSelected = selected === type.id;
          return (
            <motion.button
              key={type.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelect(type.id)}
              className={`relative p-4 rounded-2xl border-2 transition-all duration-300 text-left cursor-pointer ${
                isSelected
                  ? 'border-[#C9A84C] bg-[#C9A84C]/10'
                  : 'border-white/10 bg-white/5 hover:border-white/20'
              }`}
            >
              {type.recommended && (
                <span className="absolute -top-2.5 left-3 text-[10px] font-bold tracking-wider bg-[#C9A84C] text-black px-2 py-0.5 rounded-full">
                  RECOMENDADO
                </span>
              )}
              <Icon className={`w-6 h-6 mb-2 ${isSelected ? 'text-[#C9A84C]' : 'text-white/60'}`} />
              <div className={`font-semibold ${isSelected ? 'text-white' : 'text-white/80'}`}>{type.label}</div>
              <div className="text-xs text-white/40 mt-0.5">{type.description}</div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
