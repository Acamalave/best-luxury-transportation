import { motion } from 'framer-motion';
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
    <section className="py-12 sm:py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold text-white">
            Cadillac Escalade <span className="text-[#C9A84C]">2016</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-white/40 max-w-lg mx-auto">
            El ícono del lujo americano. Presencia imponente, confort insuperable.
          </p>
        </div>

        {/* Image gallery */}
        <div className="flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
          {images.map((img, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-64 sm:w-80 snap-center"
            >
              <img
                src={img}
                alt={`Escalade ${i + 1}`}
                className="w-full h-40 sm:h-56 object-cover rounded-xl sm:rounded-2xl"
              />
            </div>
          ))}
        </div>

        {/* Specs grid */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-6 sm:mt-10">
          {specs.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="bg-white/[0.03] border border-white/[0.05] rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center"
            >
              <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-[#C9A84C] mx-auto mb-1.5" />
              <div className="text-white font-semibold text-xs sm:text-sm">{value}</div>
              <div className="text-white/30 text-[10px] sm:text-xs mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-6 sm:mt-10">
          {['Mantenimiento certificado', 'Vehículos impecables', 'Seguro incluido'].map((badge) => (
            <div
              key={badge}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#C9A84C]/8 border border-[#C9A84C]/15"
            >
              <Shield className="w-3 h-3 text-[#C9A84C]" />
              <span className="text-[10px] sm:text-xs text-[#C9A84C]/80 font-medium">{badge}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
