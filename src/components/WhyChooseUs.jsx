import { Clock, ShieldCheck, EyeOff, Star, Quote } from 'lucide-react';

const features = [
  { icon: Clock, title: 'Puntualidad', description: 'Tu chofer estará esperándote antes de la hora acordada.' },
  { icon: ShieldCheck, title: 'Seguridad', description: 'Vehículos con mantenimiento al día y choferes verificados.' },
  { icon: EyeOff, title: 'Discreción', description: 'Servicio confidencial para ejecutivos y personalidades.' },
  { icon: Star, title: 'Experiencia Premium', description: 'Cada detalle pensado para un viaje de primer nivel.' },
];

const testimonials = [
  { name: 'Carlos M.', role: 'CEO, Grupo Altamira', text: 'Servicio impecable. Uso Best Luxury para todos mis traslados ejecutivos en Caracas.' },
  { name: 'María G.', role: 'Organizadora de eventos', text: 'La decoración especial para la boda de mi hija fue espectacular. Profesionalismo total.' },
  { name: 'Roberto P.', role: 'Empresario', text: 'La mejor opción para viajes interurbanos. Comodidad y seguridad garantizada.' },
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

        <div className="testimonials__header">
          <h3 className="testimonials__title">
            Lo que dicen <span className="gold">nuestros clientes</span>
          </h3>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <div key={t.name} className="testimonial-card">
              <Quote size={20} className="testimonial-card__quote" />
              <p className="testimonial-card__text">"{t.text}"</p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__name">{t.name}</div>
                <div className="testimonial-card__role">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
