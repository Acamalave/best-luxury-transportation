import { motion } from 'framer-motion';
import { Wine, Wifi, Shield, Languages, Sparkles, Baby } from 'lucide-react';
import { EXTRAS } from '../data/extras';

const icons = {
  wine: Wine,
  wifi: Wifi,
  shield: Shield,
  languages: Languages,
  sparkles: Sparkles,
  baby: Baby,
};

export default function ExtrasSelector({ booking, toggleExtra }) {
  const availableExtras = EXTRAS.filter(e => {
    if (e.requiresChofer && booking.serviceType === 'sin-chofer') return false;
    return true;
  });

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="text-lg font-semibold text-white mb-1">Extras</h3>
      <p className="text-sm text-white/50 mb-4">Personaliza tu experiencia</p>

      <div className="space-y-2">
        {availableExtras.map((extra) => {
          const Icon = icons[extra.icon];
          const isSelected = booking.selectedExtras.some(e => e.id === extra.id);
          return (
            <motion.button
              key={extra.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => toggleExtra(extra)}
              className={`w-full flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all text-left cursor-pointer ${
                isSelected
                  ? 'border-[#C9A84C] bg-[#C9A84C]/10'
                  : 'border-white/10 bg-white/5 hover:border-white/20'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isSelected ? 'bg-[#C9A84C]/20' : 'bg-white/5'
              }`}>
                <Icon className={`w-5 h-5 ${isSelected ? 'text-[#C9A84C]' : 'text-white/50'}`} />
              </div>
              <div className="flex-1">
                <div className={`font-medium text-sm ${isSelected ? 'text-white' : 'text-white/80'}`}>
                  {extra.label}
                </div>
                <div className="text-xs text-white/40">
                  ${extra.price}{extra.perDay ? '/día' : ''}
                </div>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                isSelected ? 'border-[#C9A84C] bg-[#C9A84C]' : 'border-white/20'
              }`}>
                {isSelected && (
                  <svg className="w-3.5 h-3.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
