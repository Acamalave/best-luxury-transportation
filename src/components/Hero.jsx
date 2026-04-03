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
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background — El Avila / Caracas */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80"
          alt="Caracas y El Ávila"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-[#0A0A0A]" />
      </div>

      {/* Escalade overlay — positioned at bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl z-10 pointer-events-none hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=1200&q=80&fit=crop&crop=bottom"
          alt="Cadillac Escalade"
          className="w-full h-auto opacity-30 mix-blend-lighten"
          style={{ maskImage: 'linear-gradient(to top, black 20%, transparent 80%)', WebkitMaskImage: 'linear-gradient(to top, black 20%, transparent 80%)' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 flex-1 flex flex-col justify-center px-4 sm:px-5 pt-10 sm:pt-16 pb-4 sm:pb-8 max-w-6xl mx-auto w-full">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">

          {/* Left — Branding */}
          <div className="text-center lg:text-left mb-5 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/10 mb-3 sm:mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
                <span className="text-[#C9A84C] text-[10px] sm:text-xs font-medium tracking-widest uppercase">Servicio Exclusivo</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-2xl sm:text-4xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]"
            >
              Best Luxury
              <span className="block text-[#C9A84C]">Transportation</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-2 sm:mt-4 text-sm sm:text-lg text-white/60 font-light max-w-md mx-auto lg:mx-0"
            >
              Transporte ejecutivo con chofer privado en Venezuela
            </motion.p>

            {/* Trust indicators — desktop only */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="hidden lg:flex gap-6 mt-8"
            >
              {['Cadillac Escalade', 'Chofer profesional', 'Cobertura nacional'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-[#C9A84C]" />
                  <span className="text-xs text-white/40">{item}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Booking Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="bg-white/[0.04] backdrop-blur-xl rounded-3xl border border-white/[0.08] p-5 sm:p-6">
              <h2 className="text-white font-semibold text-base mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#C9A84C]" />
                Reserva tu viaje
              </h2>

              {/* Service Type Pills */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {SERVICE_TYPES.map((type) => {
                  const isSelected = booking.serviceType === type.id;
                  const Icon = type.id === 'con-chofer' ? UserCheck : Car;
                  return (
                    <button
                      key={type.id}
                      onClick={() => updateBooking('serviceType', type.id)}
                      className={`relative flex items-center gap-2 p-3 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#C9A84C]/60 bg-[#C9A84C]/15'
                          : 'border-white/[0.06] bg-white/[0.03] hover:border-white/[0.12]'
                      }`}
                    >
                      {type.recommended && (
                        <span className="absolute -top-2 right-2 text-[8px] font-bold tracking-wider bg-[#C9A84C] text-black px-1.5 py-0.5 rounded-full leading-none">
                          TOP
                        </span>
                      )}
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-[#C9A84C]' : 'text-white/40'}`} />
                      <div className="text-left">
                        <div className={`text-xs font-semibold ${isSelected ? 'text-white' : 'text-white/70'}`}>
                          {type.label}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Compact Calendar */}
              <div className="bg-white/[0.03] rounded-2xl p-3 border border-white/[0.05]">
                <DayPicker
                  mode="single"
                  selected={booking.date}
                  onSelect={(d) => {
                    updateBooking('date', d);
                    if (d) setTimeout(scrollToBooking, 300);
                  }}
                  locale={es}
                  disabled={{ before: new Date() }}
                  className="!bg-transparent rdp-luxury rdp-compact"
                />
              </div>

              {/* Selected date feedback */}
              {booking.date && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-3 p-3 bg-[#C9A84C]/10 rounded-xl border border-[#C9A84C]/20 flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs text-[#C9A84C]/70">Fecha seleccionada</div>
                    <div className="text-sm font-semibold text-[#C9A84C]">
                      {format(booking.date, "EEEE d 'de' MMMM", { locale: es })}
                    </div>
                  </div>
                  <button
                    onClick={scrollToBooking}
                    className="px-4 py-2 bg-[#C9A84C] text-black text-xs font-bold rounded-lg hover:bg-[#b8953e] transition-colors cursor-pointer"
                  >
                    Continuar
                  </button>
                </motion.div>
              )}

              {!booking.date && (
                <p className="mt-3 text-center text-xs text-white/25">
                  Selecciona una fecha para comenzar
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="relative z-20 pb-6 flex justify-center"
      >
        <ChevronDown className="w-5 h-5 text-white/20 animate-bounce" />
      </motion.div>
    </section>
  );
}
