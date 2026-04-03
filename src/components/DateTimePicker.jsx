import { motion } from 'framer-motion';
import { DayPicker } from 'react-day-picker';
import { es } from 'date-fns/locale';
import { format } from 'date-fns';
import { TRIP_TYPES, INTERCITY_ROUTES } from '../data/pricing';

const TIME_SLOTS = [];
for (let h = 5; h <= 22; h++) {
  for (let m = 0; m < 60; m += 30) {
    TIME_SLOTS.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
  }
}

export default function DateTimePicker({ booking, updateBooking }) {
  const tripConfig = TRIP_TYPES.find(t => t.id === booking.tripType);

  if (booking.tripType === 'interurbano') {
    return (
      <div>
        <h3 className="step-card__title">Ruta</h3>
        <p className="step-card__subtitle">Selecciona tu trayecto</p>
        <div>
          {INTERCITY_ROUTES.map((route) => (
            <button
              key={route.id}
              className={`route-btn ${booking.route === route.id ? 'active' : ''}`}
              onClick={() => updateBooking('route', route.id)}
            >
              <span className="route-btn__label">{route.from} → {route.to}</span>
              <span className="route-btn__price">${route.price[booking.serviceType]}</span>
            </button>
          ))}
        </div>

        {booking.route && (
          <div style={{ marginTop: 24 }}>
            <h3 className="step-card__title">Fecha de salida</h3>
            <div className="booking-card__calendar" style={{ marginTop: 12 }}>
              <DayPicker
                mode="single"
                selected={booking.date}
                onSelect={(d) => updateBooking('date', d)}
                locale={es}
                disabled={{ before: new Date() }}
                className="rdp-luxury"
              />
            </div>
            <TimeSelector time={booking.time} onChange={(t) => updateBooking('time', t)} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <h3 className="step-card__title">
        {tripConfig?.needsDateRange ? 'Fechas del alquiler' : 'Fecha y hora'}
      </h3>
      <p className="step-card__subtitle">
        {tripConfig?.needsDateRange ? 'Selecciona inicio y fin' : 'Elige cuándo te recogemos'}
      </p>

      <div className="booking-card__calendar">
        {tripConfig?.needsDateRange ? (
          <DayPicker
            mode="range"
            selected={booking.dateRange}
            onSelect={(range) => updateBooking('dateRange', range || { from: null, to: null })}
            locale={es}
            disabled={{ before: new Date() }}
            numberOfMonths={1}
            className="rdp-luxury"
          />
        ) : (
          <DayPicker
            mode="single"
            selected={booking.date}
            onSelect={(d) => updateBooking('date', d)}
            locale={es}
            disabled={{ before: new Date() }}
            className="rdp-luxury"
          />
        )}
      </div>

      {tripConfig?.needsDateRange && booking.dateRange.from && booking.dateRange.to && (
        <div className="date-summary">
          <p>
            {format(booking.dateRange.from, 'dd MMM', { locale: es })} → {format(booking.dateRange.to, 'dd MMM yyyy', { locale: es })}
          </p>
        </div>
      )}

      <TimeSelector time={booking.time} onChange={(t) => updateBooking('time', t)} />

      {tripConfig?.needsHours && (
        <div className="hours-slider">
          <div className="hours-slider__header">
            <span className="hours-slider__label">Cantidad de horas</span>
            <span className="hours-slider__value">{booking.hours}h</span>
          </div>
          <input
            type="range"
            min={tripConfig.minHours}
            max={tripConfig.maxHours}
            value={booking.hours}
            onChange={(e) => updateBooking('hours', parseInt(e.target.value))}
          />
          <div className="hours-slider__range">
            <span>{tripConfig.minHours}h mín</span>
            <span>{tripConfig.maxHours}h máx</span>
          </div>
        </div>
      )}
    </div>
  );
}

function TimeSelector({ time, onChange }) {
  return (
    <div style={{ marginTop: 20 }}>
      <label className="step-card__subtitle" style={{ display: 'block', marginBottom: 10 }}>Hora</label>
      <div className="time-grid">
        {TIME_SLOTS.map((slot) => (
          <button
            key={slot}
            className={`time-btn ${time === slot ? 'active' : ''}`}
            onClick={() => onChange(slot)}
          >
            {slot}
          </button>
        ))}
      </div>
    </div>
  );
}
