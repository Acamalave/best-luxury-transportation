import { motion, AnimatePresence } from 'framer-motion';
import TripTypeSelector from './TripTypeSelector';
import DateTimePicker from './DateTimePicker';
import LocationPicker from './LocationPicker';
import ExtrasSelector from './ExtrasSelector';
import PriceSummary from './PriceSummary';
import { RotateCcw } from 'lucide-react';

const stepVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

export default function BookingConfigurator({ bookingState }) {
  const { booking, price, days, currentStep, isComplete, updateBooking, toggleExtra, reset } = bookingState;

  const showConfigurator = booking.serviceType || booking.date;

  return (
    <section id="booking" className="relative py-14 sm:py-20 px-5 sm:px-6">
      <div className="max-w-5xl mx-auto">

        {/* Progress bar */}
        {showConfigurator && (
          <div className="flex gap-1.5 mb-8 max-w-lg mx-auto lg:mx-0 lg:max-w-none">
            {[1, 2, 3, 4, 5].map(step => (
              <div
                key={step}
                className={`h-0.5 flex-1 rounded-full transition-all duration-500 ${
                  step <= currentStep ? 'bg-[#C9A84C]' : 'bg-white/[0.06]'
                }`}
              />
            ))}
          </div>
        )}

        <div className="lg:grid lg:grid-cols-5 lg:gap-8">
          {/* Configurator steps */}
          <div className="lg:col-span-3 space-y-5">

            {/* Trip Type — shows after service type selected */}
            <AnimatePresence>
              {booking.serviceType && (
                <motion.div
                  key="trip"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="bg-white/[0.03] rounded-2xl p-5 sm:p-6 border border-white/[0.05]"
                >
                  <TripTypeSelector
                    selected={booking.tripType}
                    onSelect={(v) => updateBooking('tripType', v)}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Date/Time or Route */}
            <AnimatePresence>
              {booking.tripType && (
                <motion.div
                  key="datetime"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="bg-white/[0.03] rounded-2xl p-5 sm:p-6 border border-white/[0.05]"
                >
                  <DateTimePicker booking={booking} updateBooking={updateBooking} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Location (not for intercity) */}
            <AnimatePresence>
              {booking.tripType && booking.tripType !== 'interurbano' && (
                (booking.tripType === 'por-dias' ? (booking.dateRange.from && booking.dateRange.to) : booking.date) ||
                booking.tripType === 'por-horas'
              ) && (
                <motion.div
                  key="location"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="bg-white/[0.03] rounded-2xl p-5 sm:p-6 border border-white/[0.05]"
                >
                  <LocationPicker booking={booking} updateBooking={updateBooking} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Extras */}
            <AnimatePresence>
              {(currentStep >= 5 || (booking.tripType === 'interurbano' && booking.route)) && (
                <motion.div
                  key="extras"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="bg-white/[0.03] rounded-2xl p-5 sm:p-6 border border-white/[0.05]"
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
                className="flex items-center gap-1.5 text-xs text-white/20 hover:text-white/50 transition-colors mx-auto cursor-pointer mt-2"
              >
                <RotateCcw className="w-3 h-3" />
                Empezar de nuevo
              </motion.button>
            )}

            {/* Spacer for mobile fixed bottom bar */}
            {price.total > 0 && <div className="h-28 lg:hidden" />}
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
