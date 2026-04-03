import { motion, AnimatePresence } from 'framer-motion';
import TripTypeSelector from './TripTypeSelector';
import DateTimePicker from './DateTimePicker';
import LocationPicker from './LocationPicker';
import ExtrasSelector from './ExtrasSelector';
import PriceSummary from './PriceSummary';
import { RotateCcw } from 'lucide-react';

const variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

export default function BookingConfigurator({ bookingState }) {
  const { booking, price, days, currentStep, isComplete, updateBooking, toggleExtra, reset } = bookingState;

  return (
    <section id="booking" className="configurator">
      <div className="configurator__inner">

        {(booking.serviceType || booking.date) && (
          <div className="configurator__progress">
            {[1, 2, 3, 4, 5].map(step => (
              <div key={step} className={`configurator__progress-bar ${step <= currentStep ? 'active' : ''}`} />
            ))}
          </div>
        )}

        <div className="configurator__layout">
          <div className="configurator__steps">

            <AnimatePresence>
              {booking.serviceType && (
                <motion.div key="trip" variants={variants} initial="hidden" animate="visible" exit="exit">
                  <div className="step-card">
                    <TripTypeSelector selected={booking.tripType} onSelect={(v) => updateBooking('tripType', v)} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {booking.tripType && (
                <motion.div key="datetime" variants={variants} initial="hidden" animate="visible" exit="exit">
                  <div className="step-card">
                    <DateTimePicker booking={booking} updateBooking={updateBooking} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {booking.tripType && booking.tripType !== 'interurbano' && (
                (booking.tripType === 'por-dias' ? (booking.dateRange.from && booking.dateRange.to) : booking.date) ||
                booking.tripType === 'por-horas'
              ) && (
                <motion.div key="location" variants={variants} initial="hidden" animate="visible" exit="exit">
                  <div className="step-card">
                    <LocationPicker booking={booking} updateBooking={updateBooking} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {(currentStep >= 5 || (booking.tripType === 'interurbano' && booking.route)) && (
                <motion.div key="extras" variants={variants} initial="hidden" animate="visible" exit="exit">
                  <div className="step-card">
                    <ExtrasSelector booking={booking} toggleExtra={toggleExtra} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {booking.serviceType && (
              <div style={{ textAlign: 'center', marginTop: 8 }}>
                <button className="btn btn--ghost" onClick={reset}>
                  <RotateCcw size={12} /> Empezar de nuevo
                </button>
              </div>
            )}

            {price.total > 0 && <div className="mobile-spacer" />}
          </div>

          <div className="desktop-sidebar">
            {price.total > 0 && (
              <PriceSummary booking={booking} price={price} days={days} isComplete={isComplete} />
            )}
          </div>
        </div>

        <div className="mobile-only">
          <PriceSummary booking={booking} price={price} days={days} isComplete={isComplete} />
        </div>
      </div>
    </section>
  );
}
