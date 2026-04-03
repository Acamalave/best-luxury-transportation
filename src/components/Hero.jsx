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
      {/* Background — Mountains */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80"
          alt="El Ávila Venezuela"
          className="w-full h-full object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/50 to-[#0A0A0A]" />
      </div>

      {/* Escalade — bottom overlay */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 pointer-events-none w-[600px] sm:w-[800px] lg:w-[1000px]">
        <img
          src="https://images.unsplash.com/photo-1612544448445-b8232cff3b6c?w=1200&q=80"
          alt="Cadillac Escalade"
          className="w-full h-auto opacity-40 lg:opacity-50"
          style={{
            maskImage: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 40%, transparent 75%)',
            WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 40%, transparent 75%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 flex-1 flex flex-col px-5 sm:px-6 pt-14 sm:pt-20 pb-6 max-w-6xl mx-auto w-full">
        <div className="flex-1 flex flex-col lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">

          {/* Left — Branding */}
          <div className="text-center lg:text-left mb-8 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/10 mb-5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
              <span className="text-[#C9A84C] text-[11px] font-medium tracking-widest uppercase">Servicio Exclusivo</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]"
            >
              Best Luxury
              <span className="block text-[#C9A84C] mt-1">Transportation</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="mt-4 text-[15px] sm:text-base text-white/50 font-light leading-relaxed"
            >
              Transporte ejecutivo con chofer privado en Venezuela
            </motion.p>

            {/* Trust indicators — desktop */}
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
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <div className="bg-black/40 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border border-white/[0.08] p-5 sm:p-7 shadow-2xl shadow-black/40">

              <h2 className="text-white font-semibold text-base mb-5 flex items-center gap-2.5">
                <Calendar className="w-4.5 h-4.5 text-[#C9A84C]" />
                Reserva tu viaje
              </h2>

              {/* Service Type Pills */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                {SERVICE_TYPES.map((type) => {
                  const isSelected = booking.serviceType === type.id;
                  const Icon = type.id === 'con-chofer' ? UserCheck : Car;
                  return (
                    <button
                      key={type.id}
                      onClick={() => updateBooking('serviceType', type.id)}
                      className={`relative flex items-center gap-2.5 px-4 py-3 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#C9A84C]/50 bg-[#C9A84C]/15'
                          : 'border-white/[0.08] bg-white/[0.03] hover:border-white/[0.15]'
                      }`}
                    >
                      {type.recommended && (
                        <span className="absolute -top-2 right-2 text-[8px] font-bold tracking-wider bg-[#C9A84C] text-black px-2 py-0.5 rounded-full leading-none">
                          TOP
                        </span>
                      )}
                      <Icon className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-[#C9A84C]' : 'text-white/40'}`} />
                      <span className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-white/60'}`}>
                        {type.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Calendar */}
              <div className="bg-white/[0.03] rounded-2xl p-4 border border-white/[0.05]">
                <DayPicker
                  mode="single"
                  selected={booking.date}
                  onSelect={(d) => {
                    updateBooking('date', d);
                    if (d) setTimeout(scrollToBooking, 400);
                  }}
                  locale={es}
                  disabled={{ before: new Date() }}
                  className="!bg-transparent rdp-luxury rdp-compact"
                />
              </div>

              {/* Selected date feedback */}
              {booking.date ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-4 p-4 bg-[#C9A84C]/10 rounded-xl border border-[#C9A84C]/20 flex items-center justify-between gap-4"
                >
                  <div className="min-w-0">
                    <div className="text-[10px] text-[#C9A84C]/60 uppercase tracking-wide mb-0.5">Fecha seleccionada</div>
                    <div className="text-sm font-semibold text-[#C9A84C] truncate">
                      {format(booking.date, "EEEE d 'de' MMMM", { locale: es })}
                    </div>
                  </div>
                  <button
                    onClick={scrollToBooking}
                    className="px-5 py-2.5 bg-[#C9A84C] text-black text-xs font-bold rounded-xl hover:bg-[#b8953e] transition-colors cursor-pointer whitespace-nowrap flex-shrink-0"
                  >
                    Continuar
                  </button>
                </motion.div>
              ) : (
                <p className="mt-4 text-center text-xs text-white/20">
                  Selecciona una fecha para comenzar
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-20 pb-6 flex justify-center">
        <ChevronDown className="w-4 h-4 text-white/15 animate-bounce" />
      </div>
    </section>
  );
}
