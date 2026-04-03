import { motion } from 'framer-motion';
import StepWizard from './StepWizard';
import { RegionPill } from './RegionSelector';

export default function Hero({ bookingState }) {
  return (
    <section className="hero">
      <div className="hero__bg">
        <img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80" alt="Mountains" />
        <div className="hero__bg-overlay" />
      </div>

      <div className="hero__content hero__content--wizard">
        <motion.div className="hero__branding hero__branding--compact" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <RegionPill />
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            <span className="hero__badge-text">Servicio Exclusivo</span>
          </div>
          <h1 className="hero__title hero__title--sm">
            Best Luxury <span className="gold">Transportation</span>
          </h1>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
          <StepWizard bookingState={bookingState} />
        </motion.div>
      </div>
    </section>
  );
}
