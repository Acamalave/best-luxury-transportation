import { motion } from 'framer-motion';
import { Clock, ShieldCheck, EyeOff, Star, Quote } from 'lucide-react';

const features = [
  {
    icon: Clock,
    title: 'Puntualidad',
    description: 'Siempre a tiempo. Tu chofer estará esperándote antes de la hora acordada.',
  },
  {
    icon: ShieldCheck,
    title: 'Seguridad',
    description: 'Vehículos con mantenimiento al día y choferes profesionales verificados.',
  },
  {
    icon: EyeOff,
    title: 'Discreción',
    description: 'Servicio confidencial para ejecutivos, diplomáticos y personalidades.',
  },
  {
    icon: Star,
    title: 'Experiencia Premium',
    description: 'Cada detalle pensado para que tu viaje sea una experiencia de primer nivel.',
  },
];

const testimonials = [
  {
    name: 'Carlos M.',
    role: 'CEO, Grupo Altamira',
    text: 'Servicio impecable. Uso Best Luxury para todos mis traslados ejecutivos en Caracas.',
  },
  {
    name: 'María G.',
    role: 'Organizadora de eventos',
    text: 'La decoración especial para la boda de mi hija fue espectacular. Profesionalismo total.',
  },
  {
    name: 'Roberto P.',
    role: 'Empresario',
    text: 'La mejor opción para viajes interurbanos. Comodidad y seguridad garantizada.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-transparent via-[#C9A84C]/[0.02] to-transparent">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}

          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            ¿Por qué <span className="text-[#C9A84C]">elegirnos</span>?
          </h2>
          <p className="mt-3 text-white/50">Más que transporte, una experiencia</p>
        </motion.div>

        {/* Features */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {features.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
    
              transition={{ delay: i * 0.1 }}
              className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#C9A84C]/10 flex items-center justify-center mx-auto mb-3">
                <Icon className="w-6 h-6 text-[#C9A84C]" />
              </div>
              <h3 className="text-white font-semibold mb-1">{title}</h3>
              <p className="text-xs text-white/40 leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid sm:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
    
              transition={{ delay: i * 0.1 }}
              className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5"
            >
              <Quote className="w-5 h-5 text-[#C9A84C]/40 mb-3" />
              <p className="text-sm text-white/70 leading-relaxed mb-4">"{t.text}"</p>
              <div>
                <div className="text-sm font-semibold text-white">{t.name}</div>
                <div className="text-xs text-white/40">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
