import { useState } from 'react';
import { motion } from 'framer-motion';
import { DayPicker } from 'react-day-picker';
import { es } from 'date-fns/locale';
import { format } from 'date-fns';
import { TRIP_TYPES, INTERCITY_ROUTES } from '../data/pricing';

const TIME_SLOTS = [];
for (let h = 5; h <= 22; h++) {
  for (let m = 0; m < 60; m += 30) {
    const time = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    TIME_SLOTS.push(time);
  }
}

export default function DateTimePicker({ booking, updateBooking }) {
  const tripConfig = TRIP_TYPES.find(t => t.id === booking.tripType);
  const [showCalendar, setShowCalendar] = useState(true);

  if (booking.tripType === 'interurbano') {
    return (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        transition={{ duration: 0.4 }}
      >
        <h3 className="text-lg font-semibold text-white mb-1">Ruta</h3>
        <p className="text-sm text-white/50 mb-4">Selecciona tu trayecto</p>
        <div className="space-y-2">
          {INTERCITY_ROUTES.map((route) => (
            <button
              key={route.id}
              onClick={() => updateBooking('route', route.id)}
              className={`w-full p-3 rounded-xl border-2 text-left transition-all cursor-pointer ${
                booking.route === route.id
                  ? 'border-[#C9A84C] bg-[#C9A84C]/10'
                  : 'border-white/10 bg-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-white font-medium">{route.from} → {route.to}</span>
                <span className="text-[#C9A84C] font-semibold">
                  ${route.price[booking.serviceType]}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Date and time for intercity */}
        {booking.route && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-white mb-1">Fecha de salida</h3>
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 mt-3">
              <DayPicker
                mode="single"
                selected={booking.date}
                onSelect={(d) => updateBooking('date', d)}
                locale={es}
                disabled={{ before: new Date() }}
                className="!bg-transparent rdp-luxury"
              />
            </div>
            <TimeSelector time={booking.time} onChange={(t) => updateBooking('time', t)} />
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="text-lg font-semibold text-white mb-1">
        {tripConfig?.needsDateRange ? 'Fechas del alquiler' : 'Fecha y hora'}
      </h3>
      <p className="text-sm text-white/50 mb-4">
        {tripConfig?.needsDateRange ? 'Selecciona inicio y fin' : 'Elige cuándo te recogemos'}
      </p>

      <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
        {tripConfig?.needsDateRange ? (
          <DayPicker
            mode="range"
            selected={booking.dateRange}
            onSelect={(range) => updateBooking('dateRange', range || { from: null, to: null })}
            locale={es}
            disabled={{ before: new Date() }}
            numberOfMonths={1}
            className="!bg-transparent rdp-luxury"
          />
        ) : (
          <DayPicker
            mode="single"
            selected={booking.date}
            onSelect={(d) => updateBooking('date', d)}
            locale={es}
            disabled={{ before: new Date() }}
            className="!bg-transparent rdp-luxury"
          />
        )}
      </div>

      {/* Selected dates summary */}
      {tripConfig?.needsDateRange && booking.dateRange.from && booking.dateRange.to && (
        <div className="mt-3 p-3 bg-[#C9A84C]/10 rounded-xl border border-[#C9A84C]/20">
          <p className="text-sm text-[#C9A84C]">
            {format(booking.dateRange.from, 'dd MMM', { locale: es })} → {format(booking.dateRange.to, 'dd MMM yyyy', { locale: es })}
          </p>
        </div>
      )}

      <TimeSelector time={booking.time} onChange={(t) => updateBooking('time', t)} />

      {tripConfig?.needsHours && (
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-white/70">Cantidad de horas</span>
            <span className="text-[#C9A84C] font-semibold">{booking.hours}h</span>
          </div>
          <input
            type="range"
            min={tripConfig.minHours}
            max={tripConfig.maxHours}
            value={booking.hours}
            onChange={(e) => updateBooking('hours', parseInt(e.target.value))}
            className="w-full accent-[#C9A84C] bg-white/10 rounded-full h-2 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-[#C9A84C] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
          />
          <div className="flex justify-between text-xs text-white/30 mt-1">
            <span>{tripConfig.minHours}h mín</span>
            <span>{tripConfig.maxHours}h máx</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}

function TimeSelector({ time, onChange }) {
  return (
    <div className="mt-4">
      <label className="text-sm text-white/70 mb-2 block">Hora</label>
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-40 overflow-y-auto pr-1 custom-scrollbar">
        {TIME_SLOTS.map((slot) => (
          <button
            key={slot}
            onClick={() => onChange(slot)}
            className={`py-2 px-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
              time === slot
                ? 'bg-[#C9A84C] text-black'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            {slot}
          </button>
        ))}
      </div>
    </div>
  );
}
