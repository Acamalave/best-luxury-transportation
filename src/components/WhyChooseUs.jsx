import { Clock, ShieldCheck, EyeOff, Star } from 'lucide-react';

const features = [
  { icon: Clock, title: 'Puntualidad', description: 'Tu chofer estará esperándote antes de la hora acordada.' },
  { icon: ShieldCheck, title: 'Seguridad', description: 'Vehículos con mantenimiento al día y choferes verificados.' },
  { icon: EyeOff, title: 'Discreción', description: 'Servicio confidencial para ejecutivos y personalidades.' },
  { icon: Star, title: 'Experiencia Premium', description: 'Cada detalle pensado para un viaje de primer nivel.' },
];

export default function WhyChooseUs() {
  return (
    <section className="section">
      <div className="container">
        <div className="section__header">
          <h2 className="section__title">
            ¿Por qué <span className="gold">elegirnos</span>?
          </h2>
          <p className="section__subtitle">Más que transporte, una experiencia</p>
        </div>

        <div className="features-grid">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="feature-card">
              <div className="feature-card__icon"><Icon /></div>
              <h3 className="feature-card__title">{title}</h3>
              <p className="feature-card__desc">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
