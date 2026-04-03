import { motion } from 'framer-motion';
import { DayPicker } from 'react-day-picker';
import { es } from 'date-fns/locale';
import { format } from 'date-fns';
import { Calendar, UserCheck, Car, ChevronDown } from 'lucide-react';
import { SERVICE_TYPES } from '../data/pricing';

export default function Hero({ bookingState }) {
  const { booking, updateBooking } = bookingState;

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero">
      <div className="hero__bg">
        <img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80" alt="El Ávila Venezuela" />
        <div className="hero__bg-overlay" />
      </div>

      <img
        src="https://images.unsplash.com/photo-1612544448445-b8232cff3b6c?w=1200&q=80"
        alt="Cadillac Escalade"
        className="hero__car"
      />

      <div className="hero__content">
        <div className="hero__branding">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="hero__badge">
              <span className="hero__badge-dot" />
              <span className="hero__badge-text">Servicio Exclusivo</span>
            </div>
          </motion.div>

          <motion.h1 className="hero__title" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.08 }}>
            Best Luxury
            <span className="gold">Transportation</span>
          </motion.h1>

          <motion.p className="hero__subtitle" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.16 }}>
            Transporte ejecutivo con chofer privado en Venezuela
          </motion.p>

          <div className="hero__trust">
            {['Cadillac Escalade', 'Chofer profesional', 'Cobertura nacional'].map((item) => (
              <div key={item} className="hero__trust-item">
                <span className="hero__trust-dot" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}>
          <div className="booking-card">
            <h2 className="booking-card__title">
              <Calendar size={18} />
              Reserva tu viaje
            </h2>

            <div className="service-pills">
              {SERVICE_TYPES.map((type) => {
                const isSelected = booking.serviceType === type.id;
                const Icon = type.id === 'con-chofer' ? UserCheck : Car;
                return (
                  <button
                    key={type.id}
                    className={`service-pill ${isSelected ? 'active' : ''}`}
                    onClick={() => updateBooking('serviceType', type.id)}
                  >
                    {type.recommended && <span className="service-pill__badge">TOP</span>}
                    <Icon size={16} />
                    {type.label}
                  </button>
                );
              })}
            </div>

            <div className="booking-card__calendar">
              <DayPicker
                mode="single"
                selected={booking.date}
                onSelect={(d) => {
                  updateBooking('date', d);
                  if (d) setTimeout(scrollToBooking, 400);
                }}
                locale={es}
                disabled={{ before: new Date() }}
                className="rdp-luxury rdp-compact"
              />
            </div>

            {booking.date ? (
              <motion.div className="booking-card__date-selected" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <div>
                  <div className="booking-card__date-label">Fecha seleccionada</div>
                  <div className="booking-card__date-value">
                    {format(booking.date, "EEEE d 'de' MMMM", { locale: es })}
                  </div>
                </div>
                <button className="btn btn--gold" onClick={scrollToBooking}>Continuar</button>
              </motion.div>
            ) : (
              <p className="booking-card__hint">Selecciona una fecha para comenzar</p>
            )}
          </div>
        </motion.div>
      </div>

      <div className="hero__scroll">
        <ChevronDown size={18} />
      </div>
    </section>
  );
}
