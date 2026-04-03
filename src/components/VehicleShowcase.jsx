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
  'https://images.unsplash.com/photo-1612544448445-b8232cff3b6c?w=800&q=80',
  'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80',
  'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80',
];

export default function VehicleShowcase() {
  return (
    <section className="py-16 sm:py-24 px-5 sm:px-6">
      <div className="max-w-5xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Cadillac Escalade <span className="text-[#C9A84C]">2016</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/40 max-w-md mx-auto leading-relaxed">
            El ícono del lujo americano. Presencia imponente, confort insuperable.
          </p>
        </div>

        {/* Image gallery */}
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-5 px-5 sm:-mx-6 sm:px-6">
          {images.map((img, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[280px] sm:w-80 snap-center"
            >
              <img
                src={img}
                alt={`Escalade ${i + 1}`}
                className="w-full h-44 sm:h-56 object-cover rounded-2xl"
              />
            </div>
          ))}
        </div>

        {/* Specs grid */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-10 sm:mt-14">
          {specs.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="bg-white/[0.03] border border-white/[0.05] rounded-2xl p-4 sm:p-5 text-center"
            >
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#C9A84C] mx-auto mb-2.5" />
              <div className="text-white font-semibold text-xs sm:text-sm">{value}</div>
              <div className="text-white/30 text-[10px] sm:text-xs mt-1">{label}</div>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-3 mt-10 sm:mt-12">
          {['Mantenimiento certificado', 'Vehículos impecables', 'Seguro incluido'].map((badge) => (
            <div
              key={badge}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A84C]/[0.07] border border-[#C9A84C]/15"
            >
              <Shield className="w-3.5 h-3.5 text-[#C9A84C]" />
              <span className="text-[11px] sm:text-xs text-[#C9A84C]/80 font-medium">{badge}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
