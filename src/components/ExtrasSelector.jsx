import { motion } from 'framer-motion';
import { Wine, Wifi, Shield, Languages, Sparkles, Baby } from 'lucide-react';
import { EXTRAS } from '../data/extras';

const icons = { wine: Wine, wifi: Wifi, shield: Shield, languages: Languages, sparkles: Sparkles, baby: Baby };

export default function ExtrasSelector({ booking, toggleExtra }) {
  const availableExtras = EXTRAS.filter(e => {
    if (e.requiresChofer && booking.serviceType === 'sin-chofer') return false;
    return true;
  });

  return (
    <div>
      <h3 className="step-card__title">Extras</h3>
      <p className="step-card__subtitle">Personaliza tu experiencia</p>

      {availableExtras.map((extra) => {
        const Icon = icons[extra.icon];
        const isSelected = booking.selectedExtras.some(e => e.id === extra.id);
        return (
          <button
            key={extra.id}
            className={`extra-btn ${isSelected ? 'active' : ''}`}
            onClick={() => toggleExtra(extra)}
          >
            <div className="extra-btn__icon">
              <Icon />
            </div>
            <div className="extra-btn__info">
              <div className="extra-btn__name">{extra.label}</div>
              <div className="extra-btn__price">${extra.price}{extra.perDay ? '/día' : ''}</div>
            </div>
            <div className="extra-btn__check">
              {isSelected && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
