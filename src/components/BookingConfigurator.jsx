import { motion, AnimatePresence } from 'framer-motion';
import ServiceTypeSelector from './ServiceTypeSelector';
import TripTypeSelector from './TripTypeSelector';
import DateTimePicker from './DateTimePicker';
import LocationPicker from './LocationPicker';
import ExtrasSelector from './ExtrasSelector';
import PriceSummary from './PriceSummary';
import { useBooking } from '../hooks/useBooking';
import { RotateCcw } from 'lucide-react';

const stepVariants = {
  hidden: { opacity: 0, y: 20, height: 0 },
  visible: { opacity: 1, y: 0, height: 'auto', transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function BookingConfigurator() {
  const { booking, price, days, currentStep, isComplete, updateBooking, toggleExtra, reset } = useBooking();

  return (
    <section id="booking" className="relative py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold text-white"
          >
            Configura tu <span className="text-[#C9A84C]">experiencia</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-3 text-white/50 max-w-md mx-auto"
          >
            Personaliza cada detalle de tu viaje en pocos pasos
          </motion.p>
        </div>

        <div className="lg:grid lg:grid-cols-5 lg:gap-8">
          {/* Configurator steps */}
          <div className="lg:col-span-3 space-y-6">
            {/* Progress bar */}
            <div className="flex gap-1.5 mb-8">
              {[1, 2, 3, 4, 5].map(step => (
                <div
                  key={step}
                  className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                    step <= currentStep ? 'bg-[#C9A84C]' : 'bg-white/10'
                  }`}
                />
              ))}
            </div>

            {/* Step 1: Service Type - Always visible */}
            <div className="bg-white/[0.03] backdrop-blur-sm rounded-2xl p-5 border border-white/[0.06]">
              <ServiceTypeSelector
                selected={booking.serviceType}
                onSelect={(v) => updateBooking('serviceType', v)}
              />
            </div>

            {/* Step 2: Trip Type */}
            <AnimatePresence>
              {booking.serviceType && (
                <motion.div
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  className="bg-white/[0.03] backdrop-blur-sm rounded-2xl p-5 border border-white/[0.06]"
                >
                  <TripTypeSelector
                    selected={booking.tripType}
                    onSelect={(v) => updateBooking('tripType', v)}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 3: Date/Time or Route */}
            <AnimatePresence>
              {booking.tripType && (
                <motion.div
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  className="bg-white/[0.03] backdrop-blur-sm rounded-2xl p-5 border border-white/[0.06]"
                >
                  <DateTimePicker booking={booking} updateBooking={updateBooking} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 4: Location (not for intercity) */}
            <AnimatePresence>
              {booking.tripType && booking.tripType !== 'interurbano' && (
                (booking.tripType === 'por-dias' ? (booking.dateRange.from && booking.dateRange.to) : booking.date) ||
                booking.tripType === 'por-horas'
              ) && (
                <motion.div
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  className="bg-white/[0.03] backdrop-blur-sm rounded-2xl p-5 border border-white/[0.06]"
                >
                  <LocationPicker booking={booking} updateBooking={updateBooking} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 5: Extras */}
            <AnimatePresence>
              {(currentStep >= 5 || (booking.tripType === 'interurbano' && booking.route)) && (
                <motion.div
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  className="bg-white/[0.03] backdrop-blur-sm rounded-2xl p-5 border border-white/[0.06]"
                >
                  <ExtrasSelector booking={booking} toggleExtra={toggleExtra} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Reset */}
            {booking.serviceType && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={reset}
                className="flex items-center gap-2 text-sm text-white/30 hover:text-white/60 transition-colors mx-auto cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Empezar de nuevo
              </motion.button>
            )}

            {/* Spacer for mobile fixed bottom bar */}
            {price.total > 0 && <div className="h-32 lg:hidden" />}
          </div>

          {/* Desktop sidebar price */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="sticky top-6">
              {price.total > 0 && (
                <PriceSummary
                  booking={booking}
                  price={price}
                  days={days}
                  isComplete={isComplete}
                />
              )}
            </div>
          </div>
        </div>

        {/* Mobile fixed bottom price */}
        <div className="lg:hidden">
          <PriceSummary
            booking={booking}
            price={price}
            days={days}
            isComplete={isComplete}
          />
        </div>
      </div>
    </section>
  );
}
