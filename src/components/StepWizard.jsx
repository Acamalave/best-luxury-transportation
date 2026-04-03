import { motion, AnimatePresence } from 'framer-motion';
import { DayPicker } from 'react-day-picker';
import { es } from 'date-fns/locale';
import { format } from 'date-fns';
import {
  Calendar, UserCheck, Car, Plane, Clock, CalendarDays, MapPin,
  Wine, Wifi, Shield, Languages, Sparkles, Baby,
  ChevronLeft, ChevronRight, RotateCcw, Check
} from 'lucide-react';
import { SERVICE_TYPES, TRIP_TYPES, INTERCITY_ROUTES } from '../data/pricing';
import { LOCATIONS } from '../data/locations';
import { EXTRAS } from '../data/extras';

const tripIcons = { plane: Plane, clock: Clock, calendar: CalendarDays, 'map-pin': MapPin };
const extraIcons = { wine: Wine, wifi: Wifi, shield: Shield, languages: Languages, sparkles: Sparkles, baby: Baby };

const WHATSAPP_NUMBER = '584121234567';

const TIME_SLOTS = [];
for (let h = 5; h <= 22; h++) {
  for (let m = 0; m < 60; m += 30) {
    TIME_SLOTS.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
  }
}

const stepAnim = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, x: -40, transition: { duration: 0.2 } },
};

function buildWhatsAppMessage(booking, price, days) {
  const service = SERVICE_TYPES.find(s => s.id === booking.serviceType);
  const trip = TRIP_TYPES.find(t => t.id === booking.tripType);
  const location = LOCATIONS.find(l => l.id === booking.location);
  let lines = ['🚘 *RESERVA - Best Luxury Transportation*', '', `📋 *Servicio:* ${service?.label}`, `🗺️ *Tipo:* ${trip?.label}`];
  if (booking.tripType === 'interurbano' && booking.route) {
    const route = INTERCITY_ROUTES.find(r => r.id === booking.route);
    lines.push(`📍 *Ruta:* ${route?.from} → ${route?.to}`);
  }
  if (booking.tripType === 'por-dias' && booking.dateRange.from && booking.dateRange.to) {
    lines.push(`📅 *Desde:* ${format(booking.dateRange.from, 'dd MMM yyyy', { locale: es })}`, `📅 *Hasta:* ${format(booking.dateRange.to, 'dd MMM yyyy', { locale: es })} (${days} días)`);
  } else if (booking.date) {
    lines.push(`📅 *Fecha:* ${format(booking.date, 'dd MMM yyyy', { locale: es })}`);
  }
  lines.push(`🕐 *Hora:* ${booking.time}`);
  if (booking.tripType === 'por-horas') lines.push(`⏱️ *Duración:* ${booking.hours} horas`);
  if (location) lines.push(`📍 *Recogida:* ${location.label}${booking.location === 'custom' ? ` - ${booking.customAddress}` : ''}`);
  if (booking.selectedExtras.length > 0) {
    lines.push('', '✨ *Extras:*');
    booking.selectedExtras.forEach(e => lines.push(`  • ${e.label} ($${e.price}${e.perDay ? '/día' : ''})`));
  }
  lines.push('', `💰 *Total estimado: $${price.total} USD*`);
  if (price.discount > 0) lines.push(`🏷️ Descuento: -$${price.discount}`);
  return encodeURIComponent(lines.join('\n'));
}

export default function StepWizard({ bookingState }) {
  const { booking, price, days, isComplete, updateBooking, toggleExtra, reset, wizardStep, totalSteps, nextStep, prevStep } = bookingState;

  const canNext = () => {
    switch (wizardStep) {
      case 0: return !!booking.date;
      case 1: return !!booking.serviceType;
      case 2: return !!booking.tripType;
      case 3: {
        if (booking.tripType === 'interurbano') return !!booking.route;
        if (booking.tripType === 'por-dias') return !!(booking.dateRange.from && booking.dateRange.to);
        return true; // time is pre-selected
      }
      case 4: {
        if (booking.tripType === 'interurbano') return true; // no location needed
        return !!booking.location;
      }
      case 5: return true; // extras are optional
      default: return false;
    }
  };

  const stepLabels = [
    { num: 1, title: '¿Cuándo necesitas el servicio?', desc: 'Selecciona la fecha de tu viaje' },
    { num: 2, title: '¿Cómo prefieres viajar?', desc: 'Elige si deseas un chofer profesional o conducir tú mismo' },
    { num: 3, title: '¿Qué tipo de traslado necesitas?', desc: 'Desde aeropuerto hasta viajes entre ciudades' },
    { num: 4, title: booking.tripType === 'interurbano' ? '¿Cuál es tu ruta?' : '¿A qué hora te recogemos?', desc: booking.tripType === 'interurbano' ? 'Selecciona origen y destino' : 'Elige la hora de recogida y detalles del viaje' },
    { num: 5, title: '¿Dónde te buscamos?', desc: 'Indica el punto exacto de recogida' },
    { num: 6, title: '¿Deseas personalizar tu experiencia?', desc: 'Agrega servicios premium a tu viaje' },
    { num: 7, title: 'Tu reserva está lista', desc: 'Revisa los detalles y confirma por WhatsApp' },
  ];

  const current = stepLabels[wizardStep];

  const handleWhatsApp = () => {
    const msg = buildWhatsAppMessage(booking, price, days);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  return (
    <div className="wizard">
      {/* Progress */}
      <div className="wizard__progress">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div key={i} className={`wizard__progress-dot ${i <= wizardStep ? 'active' : ''} ${i === wizardStep ? 'current' : ''}`} />
        ))}
      </div>

      {/* Step Header */}
      <div className="wizard__header">
        <span className="wizard__step-num">Paso {current.num} de {totalSteps}</span>
        <h2 className="wizard__title">{current.title}</h2>
        <p className="wizard__desc">{current.desc}</p>
      </div>

      {/* Step Content */}
      <div className="wizard__body">
        <AnimatePresence mode="wait">
          <motion.div key={wizardStep} {...stepAnim}>

            {/* Step 0: Date */}
            {wizardStep === 0 && (
              <div className="booking-card__calendar">
                <DayPicker
                  mode="single"
                  selected={booking.date}
                  onSelect={(d) => { updateBooking('date', d); if (d) setTimeout(nextStep, 300); }}
                  locale={es}
                  disabled={{ before: new Date() }}
                  className="rdp-luxury rdp-compact"
                />
              </div>
            )}

            {/* Step 1: Service Type */}
            {wizardStep === 1 && (
              <div className="wizard__options">
                {SERVICE_TYPES.map((type) => {
                  const isSelected = booking.serviceType === type.id;
                  const Icon = type.id === 'con-chofer' ? UserCheck : Car;
                  return (
                    <button key={type.id} className={`wizard__option-card ${isSelected ? 'active' : ''}`} onClick={() => { updateBooking('serviceType', type.id); setTimeout(nextStep, 250); }}>
                      <div className="wizard__option-icon"><Icon size={24} /></div>
                      <div className="wizard__option-info">
                        <div className="wizard__option-name">{type.label}</div>
                        <div className="wizard__option-desc">
                          {type.id === 'con-chofer' ? 'Un chofer profesional te lleva a tu destino con total comodidad' : 'Tú conduces la Escalade con total libertad y flexibilidad'}
                        </div>
                      </div>
                      {type.recommended && <span className="wizard__option-badge">Recomendado</span>}
                      {isSelected && <div className="wizard__option-check"><Check size={16} /></div>}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Step 2: Trip Type */}
            {wizardStep === 2 && (
              <div className="wizard__options">
                {TRIP_TYPES.map((type) => {
                  const Icon = tripIcons[type.icon];
                  const isSelected = booking.tripType === type.id;
                  const descriptions = {
                    'aeropuerto': 'Te recogemos o llevamos al aeropuerto con puntualidad garantizada',
                    'por-horas': 'Dispón de la Escalade por las horas que necesites (mínimo 4h)',
                    'por-dias': 'Alquila por uno o varios días para máxima flexibilidad',
                    'interurbano': 'Viaja cómodamente entre ciudades de Venezuela',
                  };
                  return (
                    <button key={type.id} className={`wizard__option-card ${isSelected ? 'active' : ''}`} onClick={() => { updateBooking('tripType', type.id); setTimeout(nextStep, 250); }}>
                      <div className="wizard__option-icon"><Icon size={22} /></div>
                      <div className="wizard__option-info">
                        <div className="wizard__option-name">{type.label}</div>
                        <div className="wizard__option-desc">{descriptions[type.id]}</div>
                      </div>
                      {isSelected && <div className="wizard__option-check"><Check size={16} /></div>}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Step 3: Time / Route / DateRange */}
            {wizardStep === 3 && (
              <div>
                {booking.tripType === 'interurbano' ? (
                  <div>
                    {INTERCITY_ROUTES.map((route) => (
                      <button key={route.id} className={`route-btn ${booking.route === route.id ? 'active' : ''}`} onClick={() => updateBooking('route', route.id)}>
                        <span className="route-btn__label">{route.from} → {route.to}</span>
                        <span className="route-btn__price">${route.price[booking.serviceType || 'con-chofer']}</span>
                      </button>
                    ))}
                  </div>
                ) : booking.tripType === 'por-dias' ? (
                  <div>
                    <div className="booking-card__calendar">
                      <DayPicker mode="range" selected={booking.dateRange} onSelect={(range) => updateBooking('dateRange', range || { from: null, to: null })} locale={es} disabled={{ before: new Date() }} numberOfMonths={1} className="rdp-luxury rdp-compact" />
                    </div>
                    {booking.dateRange.from && booking.dateRange.to && (
                      <div className="date-summary">
                        <p>{format(booking.dateRange.from, 'dd MMM', { locale: es })} → {format(booking.dateRange.to, 'dd MMM yyyy', { locale: es })}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <div className="time-grid">
                      {TIME_SLOTS.map((slot) => (
                        <button key={slot} className={`time-btn ${booking.time === slot ? 'active' : ''}`} onClick={() => updateBooking('time', slot)}>{slot}</button>
                      ))}
                    </div>
                    {booking.tripType === 'por-horas' && (
                      <div className="hours-slider">
                        <div className="hours-slider__header">
                          <span className="hours-slider__label">Duración</span>
                          <span className="hours-slider__value">{booking.hours}h</span>
                        </div>
                        <input type="range" min={4} max={12} value={booking.hours} onChange={(e) => updateBooking('hours', parseInt(e.target.value))} />
                        <div className="hours-slider__range"><span>4h mín</span><span>12h máx</span></div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Location */}
            {wizardStep === 4 && (
              <div>
                {booking.tripType === 'interurbano' ? (
                  <div className="wizard__skip-msg">
                    <p>Para viajes interurbanos, la recogida se coordina directamente por WhatsApp.</p>
                  </div>
                ) : (
                  <div className="wizard__locations">
                    {[...new Set(LOCATIONS.map(l => l.category))].map(cat => (
                      <div key={cat}>
                        <p className="location-group__title">{cat}</p>
                        {LOCATIONS.filter(l => l.category === cat).map(loc => (
                          <button key={loc.id} className={`location-btn ${booking.location === loc.id ? 'active' : ''}`} onClick={() => updateBooking('location', loc.id)}>
                            <MapPin size={16} />
                            <span className="location-btn__label">{loc.label}</span>
                          </button>
                        ))}
                      </div>
                    ))}
                    {booking.location === 'custom' && (
                      <input type="text" placeholder="Escribe la dirección completa..." value={booking.customAddress} onChange={(e) => updateBooking('customAddress', e.target.value)} className="location-input" />
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Step 5: Extras */}
            {wizardStep === 5 && (
              <div>
                {EXTRAS.filter(e => !(e.requiresChofer && booking.serviceType === 'sin-chofer')).map((extra) => {
                  const Icon = extraIcons[extra.icon];
                  const isSelected = booking.selectedExtras.some(e => e.id === extra.id);
                  return (
                    <button key={extra.id} className={`extra-btn ${isSelected ? 'active' : ''}`} onClick={() => toggleExtra(extra)}>
                      <div className="extra-btn__icon"><Icon size={20} /></div>
                      <div className="extra-btn__info">
                        <div className="extra-btn__name">{extra.label}</div>
                        <div className="extra-btn__price">${extra.price}{extra.perDay ? '/día' : ''}</div>
                      </div>
                      <div className="extra-btn__check">
                        {isSelected && <Check size={14} color="#000" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Step 6: Summary */}
            {wizardStep === 6 && (
              <div className="wizard__summary">
                <div className="wizard__summary-row">
                  <span>Servicio</span>
                  <strong>{SERVICE_TYPES.find(s => s.id === booking.serviceType)?.label}</strong>
                </div>
                <div className="wizard__summary-row">
                  <span>Tipo</span>
                  <strong>{TRIP_TYPES.find(t => t.id === booking.tripType)?.label}</strong>
                </div>
                {booking.date && (
                  <div className="wizard__summary-row">
                    <span>Fecha</span>
                    <strong>{format(booking.date, "d MMM yyyy", { locale: es })}</strong>
                  </div>
                )}
                {booking.tripType === 'por-dias' && booking.dateRange.from && (
                  <div className="wizard__summary-row">
                    <span>Período</span>
                    <strong>{format(booking.dateRange.from, 'd MMM', { locale: es })} → {booking.dateRange.to && format(booking.dateRange.to, 'd MMM', { locale: es })} ({days}d)</strong>
                  </div>
                )}
                <div className="wizard__summary-row">
                  <span>Hora</span>
                  <strong>{booking.time}</strong>
                </div>
                {booking.selectedExtras.length > 0 && (
                  <div className="wizard__summary-row">
                    <span>Extras</span>
                    <strong>{booking.selectedExtras.length} seleccionados</strong>
                  </div>
                )}

                <div className="wizard__summary-total">
                  <div>
                    <span className="wizard__summary-total-label">Total estimado</span>
                    <span className="wizard__summary-total-value">${price.total} <small>USD</small></span>
                  </div>
                  {price.discount > 0 && (
                    <div className="wizard__summary-discount">Descuento {Math.round(price.discountRate * 100)}%: -${price.discount}</div>
                  )}
                </div>

                <button className="btn btn--whatsapp" onClick={handleWhatsApp} disabled={!isComplete}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.612.638l4.694-1.387A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.239 0-4.332-.726-6.033-1.96l-.168-.122-3.476 1.027 1.073-3.322-.148-.186A9.935 9.935 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
                  </svg>
                  {isComplete ? 'Confirmar por WhatsApp' : 'Completa los datos'}
                </button>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="wizard__nav">
        {wizardStep > 0 ? (
          <button className="wizard__nav-btn wizard__nav-btn--back" onClick={prevStep}>
            <ChevronLeft size={16} /> Atrás
          </button>
        ) : (
          <div />
        )}

        {wizardStep < totalSteps - 1 ? (
          <button className="wizard__nav-btn wizard__nav-btn--next" onClick={nextStep} disabled={!canNext()}>
            Siguiente <ChevronRight size={16} />
          </button>
        ) : (
          <button className="wizard__nav-btn wizard__nav-btn--reset" onClick={reset}>
            <RotateCcw size={14} /> Nueva reserva
          </button>
        )}
      </div>
    </div>
  );
}
