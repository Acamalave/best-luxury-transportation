import { Fuel, Users, Volume2, Shield, Gauge, Snowflake } from 'lucide-react';

const specs = [
  { icon: Fuel, label: 'Motor', value: '6.2L V8' },
  { icon: Users, label: 'Pasajeros', value: 'Hasta 7' },
  { icon: Volume2, label: 'Audio', value: 'Bose Premium' },
  { icon: Shield, label: 'Seguridad', value: 'Blindaje opcional' },
  { icon: Gauge, label: 'Potencia', value: '420 HP' },
  { icon: Snowflake, label: 'Clima', value: 'Tri-zona' },
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

        {/* Vehicle image */}
        <div className="showcase__hero-img">
          <img src="/escalade-cutout.png" alt="Cadillac Escalade" />
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
