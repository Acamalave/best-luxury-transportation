import { Fuel, Users, Volume2, Shield, Gauge, Snowflake } from 'lucide-react';

const specs = [
  { icon: Fuel, label: 'Motor', value: '6.2L V8' },
  { icon: Users, label: 'Pasajeros', value: 'Hasta 7' },
  { icon: Volume2, label: 'Audio', value: 'Bose Premium' },
  { icon: Shield, label: 'Seguridad', value: 'Blindaje opcional' },
  { icon: Gauge, label: 'Potencia', value: '420 HP' },
  { icon: Snowflake, label: 'Clima', value: 'Tri-zona' },
];

const images = [
  '/escalade.jpg',
  'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80',
  'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80',
];

export default function VehicleShowcase() {
  return (
    <section className="section">
      <div className="container">
        <div className="section__header">
          <h2 className="section__title">
            Cadillac <span className="gold">Escalade</span>
          </h2>
          <p className="section__subtitle">
            El ícono del lujo americano. Presencia imponente, confort insuperable.
          </p>
        </div>

        <div className="showcase__gallery">
          {images.map((img, i) => (
            <div key={i} className="showcase__gallery-item">
              <img src={img} alt={`Escalade ${i + 1}`} />
            </div>
          ))}
        </div>

        <div className="specs-grid">
          {specs.map(({ icon: Icon, label, value }) => (
            <div key={label} className="spec-card">
              <Icon />
              <div className="spec-card__value">{value}</div>
              <div className="spec-card__label">{label}</div>
            </div>
          ))}
        </div>

        <div className="trust-badges">
          {['Mantenimiento certificado', 'Vehículos impecables', 'Seguro incluido'].map((badge) => (
            <div key={badge} className="trust-badge">
              <Shield />
              <span>{badge}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
