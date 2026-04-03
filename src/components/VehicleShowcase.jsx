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
  'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80',
  'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
];

export default function VehicleShowcase() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Cadillac Escalade <span className="text-[#C9A84C]">2016</span>
          </h2>
          <p className="mt-3 text-white/50 max-w-lg mx-auto">
            El ícono del lujo americano. Presencia imponente, confort insuperable.
          </p>
        </motion.div>

        {/* Image gallery */}
        <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              
              transition={{ delay: i * 0.1 }}
              className="flex-shrink-0 w-72 sm:w-80 snap-center"
            >
              <img
                src={img}
                alt={`Escalade ${i + 1}`}
                className="w-full h-48 sm:h-56 object-cover rounded-2xl"
              />
            </motion.div>
          ))}
        </div>

        {/* Specs grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-10">
          {specs.map(({ icon: Icon, label, value }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              
              transition={{ delay: i * 0.05 }}
              className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 text-center"
            >
              <Icon className="w-6 h-6 text-[#C9A84C] mx-auto mb-2" />
              <div className="text-white font-semibold text-sm">{value}</div>
              <div className="text-white/40 text-xs mt-0.5">{label}</div>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          {['Mantenimiento certificado', 'Vehículos impecables', 'Seguro incluido'].map((badge, i) => (
            <motion.div
              key={badge}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/20"
            >
              <Shield className="w-3.5 h-3.5 text-[#C9A84C]" />
              <span className="text-xs text-[#C9A84C] font-medium">{badge}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
