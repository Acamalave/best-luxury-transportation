import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DayPicker } from 'react-day-picker';
import { es } from 'date-fns/locale';
import { format } from 'date-fns';
import {
  UserCheck, Car, Plane, Clock, CalendarDays, MapPin,
  Wine, Wifi, Shield, Languages, Sparkles, Baby,
  ChevronLeft, ChevronRight, RotateCcw, Check, CreditCard, User, Phone, Mail
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

function buildWhatsAppMessage(booking, price, days, contact) {
  const service = SERVICE_TYPES.find(s => s.id === booking.serviceType);
  const trip = TRIP_TYPES.find(t => t.id === booking.tripType);
  const location = LOCATIONS.find(l => l.id === booking.location);
  let lines = [
    '🚘 *RESERVA - Best Luxury Transportation*', '',
    `👤 *Cliente:* ${contact.name}`,
    `📞 *Teléfono:* ${contact.phone}`,
    `📧 *Email:* ${contact.email}`, '',
    `📋 *Servicio:* ${service?.label}`,
    `🗺️ *Tipo:* ${trip?.label}`,
  ];
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

// STEP ORDER: 0=Service, 1=Trip, 2=DateTime, 3=Location, 4=Extras, 5=Summary, 6=Contact, 7=Payment
const TOTAL_STEPS = 8;

const STEP_META = [
  { title: '¿Cómo prefieres viajar?', desc: 'Elige si deseas un chofer profesional o conducir tú mismo' },
  { title: '¿Qué tipo de traslado necesitas?', desc: 'Desde aeropuerto hasta viajes entre ciudades' },
  { title: '¿Cuándo te recogemos?', desc: 'Selecciona fecha, hora y detalles de tu viaje' },
  { title: '¿Dónde te buscamos?', desc: 'Indica el punto exacto de recogida' },
  { title: '¿Deseas personalizar tu experiencia?', desc: 'Agrega servicios premium a tu viaje' },
  { title: 'Resumen de tu reserva', desc: 'Revisa los detalles antes de continuar' },
  { title: 'Datos de contacto', desc: 'Necesitamos tus datos para confirmar la reserva' },
  { title: 'Método de pago', desc: 'Ingresa los datos de tu tarjeta para completar' },
];

export default function StepWizard({ bookingState }) {
  const { booking, price, days, updateBooking, toggleExtra, reset, wizardStep, totalSteps: _, nextStep, prevStep, goToStep } = bookingState;
  const [contact, setContact] = useState({ name: '', phone: '', email: '' });
  const [card, setCard] = useState({ number: '', expiry: '', cvv: '', holder: '' });
  const [showPriceBar, setShowPriceBar] = useState(false);

  const step = wizardStep;
  const meta = STEP_META[step] || STEP_META[0];

  const canNext = () => {
    switch (step) {
      case 0: return !!booking.serviceType;
      case 1: return !!booking.tripType;
      case 2: {
        if (booking.tripType === 'interurbano') return !!booking.route;
        if (booking.tripType === 'por-dias') return !!(booking.dateRange.from && booking.dateRange.to);
        return !!booking.date;
      }
      case 3: {
        if (booking.tripType === 'interurbano') return true;
        return !!booking.location;
      }
      case 4: return true;
      case 5: return true;
      case 6: return contact.name.length > 1 && contact.phone.length > 5 && contact.email.includes('@');
      case 7: return card.number.length >= 16 && card.expiry.length >= 4 && card.cvv.length >= 3 && card.holder.length > 2;
      default: return false;
    }
  };

  const handleNext = () => {
    if (step === 4) setShowPriceBar(true);
    if (step === 7) {
      // Fake payment — send WhatsApp
      const msg = buildWhatsAppMessage(booking, price, days, contact);
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
      return;
    }
    nextStep();
  };

  const handlePrev = () => {
    if (step === 5) setShowPriceBar(false);
    prevStep();
  };

  const handleReset = () => {
    setContact({ name: '', phone: '', email: '' });
    setCard({ number: '', expiry: '', cvv: '', holder: '' });
    setShowPriceBar(false);
    reset();
  };

  return (
    <div className="wizard">
      {/* Progress */}
      <div className="wizard__progress">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div key={i} className={`wizard__progress-dot ${i <= step ? 'active' : ''} ${i === step ? 'current' : ''}`} />
        ))}
      </div>

      {/* Header */}
      <div className="wizard__header">
        <span className="wizard__step-num">Paso {step + 1} de {TOTAL_STEPS}</span>
        <h2 className="wizard__title">{meta.title}</h2>
        <p className="wizard__desc">{meta.desc}</p>
      </div>

      {/* Body */}
      <div className="wizard__body">
        <AnimatePresence mode="wait">
          <motion.div key={step} {...stepAnim}>

            {/* Step 0: Service Type */}
            {step === 0 && (
              <div className="wizard__options">
                {SERVICE_TYPES.map((type) => {
                  const isSelected = booking.serviceType === type.id;
                  const Icon = type.id === 'con-chofer' ? UserCheck : Car;
                  return (
                    <button key={type.id} className={`wizard__option-card ${isSelected ? 'active' : ''}`} onClick={() => { updateBooking('serviceType', type.id); setTimeout(nextStep, 250); }}>
                      {type.recommended && <span className="wizard__option-badge">Recomendado</span>}
                      <div className="wizard__option-icon"><Icon size={24} /></div>
                      <div className="wizard__option-info">
                        <div className="wizard__option-name">{type.label}</div>
                        <div className="wizard__option-desc">
                          {type.id === 'con-chofer' ? 'Un chofer profesional te lleva a tu destino con total comodidad' : 'Tú conduces la Escalade con total libertad y flexibilidad'}
                        </div>
                      </div>
                      {isSelected && <div className="wizard__option-check"><Check size={16} /></div>}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Step 1: Trip Type */}
            {step === 1 && (
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

            {/* Step 2: Date/Time/Route */}
            {step === 2 && (
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
                      <div className="date-summary"><p>{format(booking.dateRange.from, 'dd MMM', { locale: es })} → {format(booking.dateRange.to, 'dd MMM yyyy', { locale: es })} ({days} días)</p></div>
                    )}
                  </div>
                ) : (
                  <div>
                    <div className="booking-card__calendar">
                      <DayPicker mode="single" selected={booking.date} onSelect={(d) => updateBooking('date', d)} locale={es} disabled={{ before: new Date() }} className="rdp-luxury rdp-compact" />
                    </div>
                    {booking.date && (
                      <div style={{ marginTop: 16 }}>
                        <p className="wizard__desc" style={{ marginBottom: 10 }}>Hora de recogida</p>
                        <div className="time-grid">
                          {TIME_SLOTS.map((slot) => (
                            <button key={slot} className={`time-btn ${booking.time === slot ? 'active' : ''}`} onClick={() => updateBooking('time', slot)}>{slot}</button>
                          ))}
                        </div>
                      </div>
                    )}
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

            {/* Step 3: Location */}
            {step === 3 && (
              <div>
                {booking.tripType === 'interurbano' ? (
                  <div className="wizard__skip-msg"><p>Para viajes interurbanos, la recogida se coordina directamente.</p></div>
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

            {/* Step 4: Extras */}
            {step === 4 && (
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
                      <div className="extra-btn__check">{isSelected && <Check size={14} color="#000" />}</div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Step 5: Summary */}
            {step === 5 && (
              <div className="wizard__summary">
                <div className="wizard__summary-row"><span>Servicio</span><strong>{SERVICE_TYPES.find(s => s.id === booking.serviceType)?.label}</strong></div>
                <div className="wizard__summary-row"><span>Tipo</span><strong>{TRIP_TYPES.find(t => t.id === booking.tripType)?.label}</strong></div>
                {booking.date && <div className="wizard__summary-row"><span>Fecha</span><strong>{format(booking.date, "d MMM yyyy", { locale: es })}</strong></div>}
                {booking.tripType === 'por-dias' && booking.dateRange.from && (
                  <div className="wizard__summary-row"><span>Período</span><strong>{format(booking.dateRange.from, 'd MMM', { locale: es })} → {booking.dateRange.to && format(booking.dateRange.to, 'd MMM', { locale: es })}</strong></div>
                )}
                <div className="wizard__summary-row"><span>Hora</span><strong>{booking.time}</strong></div>
                {booking.location && <div className="wizard__summary-row"><span>Recogida</span><strong>{LOCATIONS.find(l => l.id === booking.location)?.label}</strong></div>}
                {booking.selectedExtras.length > 0 && <div className="wizard__summary-row"><span>Extras</span><strong>{booking.selectedExtras.map(e => e.label).join(', ')}</strong></div>}
                <div className="wizard__summary-total">
                  <span className="wizard__summary-total-label">Total estimado</span>
                  <span className="wizard__summary-total-value">${price.total} <small>USD</small></span>
                  {price.discount > 0 && <div className="wizard__summary-discount">Descuento {Math.round(price.discountRate * 100)}%: -${price.discount}</div>}
                </div>
              </div>
            )}

            {/* Step 6: Contact Form */}
            {step === 6 && (
              <div className="wizard__form">
                <div className="wizard__form-field">
                  <label><User size={14} /> Nombre completo</label>
                  <input type="text" placeholder="Tu nombre" value={contact.name} onChange={(e) => setContact(p => ({ ...p, name: e.target.value }))} />
                </div>
                <div className="wizard__form-field">
                  <label><Phone size={14} /> Teléfono</label>
                  <input type="tel" placeholder="+58 412 000 0000" value={contact.phone} onChange={(e) => setContact(p => ({ ...p, phone: e.target.value }))} />
                </div>
                <div className="wizard__form-field">
                  <label><Mail size={14} /> Correo electrónico</label>
                  <input type="email" placeholder="tu@email.com" value={contact.email} onChange={(e) => setContact(p => ({ ...p, email: e.target.value }))} />
                </div>
              </div>
            )}

            {/* Step 7: Fake Payment */}
            {step === 7 && (
              <div className="wizard__form">
                <div className="wizard__payment-total">
                  <span>Total a pagar</span>
                  <strong>${price.total} USD</strong>
                </div>
                <div className="wizard__form-field">
                  <label><CreditCard size={14} /> Número de tarjeta</label>
                  <input type="text" placeholder="0000 0000 0000 0000" maxLength={19} value={card.number} onChange={(e) => setCard(p => ({ ...p, number: e.target.value.replace(/[^0-9 ]/g, '') }))} />
                </div>
                <div className="wizard__form-row">
                  <div className="wizard__form-field">
                    <label>Vencimiento</label>
                    <input type="text" placeholder="MM/YY" maxLength={5} value={card.expiry} onChange={(e) => setCard(p => ({ ...p, expiry: e.target.value }))} />
                  </div>
                  <div className="wizard__form-field">
                    <label>CVV</label>
                    <input type="text" placeholder="***" maxLength={4} value={card.cvv} onChange={(e) => setCard(p => ({ ...p, cvv: e.target.value.replace(/[^0-9]/g, '') }))} />
                  </div>
                </div>
                <div className="wizard__form-field">
                  <label>Nombre del titular</label>
                  <input type="text" placeholder="Como aparece en la tarjeta" value={card.holder} onChange={(e) => setCard(p => ({ ...p, holder: e.target.value }))} />
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating price bar on extras step */}
      <AnimatePresence>
        {(step === 4 || showPriceBar) && step < 5 && price.total > 0 && (
          <motion.div className="wizard__price-float" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
            <span>Total: <strong>${price.total} USD</strong></span>
            {price.discount > 0 && <span className="wizard__price-float-discount">-{Math.round(price.discountRate * 100)}%</span>}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="wizard__nav">
        {step > 0 ? (
          <button className="wizard__nav-btn wizard__nav-btn--back" onClick={handlePrev}><ChevronLeft size={16} /> Atrás</button>
        ) : <div />}

        {step < TOTAL_STEPS - 1 ? (
          <button className="wizard__nav-btn wizard__nav-btn--next" onClick={handleNext} disabled={!canNext()}>
            {step === 5 ? 'Confirmar' : 'Siguiente'} <ChevronRight size={16} />
          </button>
        ) : (
          <button className="wizard__nav-btn wizard__nav-btn--next" onClick={handleNext} disabled={!canNext()}>
            <CreditCard size={16} /> Pagar ${price.total}
          </button>
        )}
      </div>

      {step > 0 && (
        <div style={{ textAlign: 'center', marginTop: 8 }}>
          <button className="wizard__nav-btn wizard__nav-btn--reset" onClick={handleReset}><RotateCcw size={12} /> Nueva reserva</button>
        </div>
      )}
    </div>
  );
}
