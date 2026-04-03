import { motion } from 'framer-motion';
import { Clock, ShieldCheck, EyeOff, Star, Quote } from 'lucide-react';

const features = [
  {
    icon: Clock,
    title: 'Puntualidad',
    description: 'Tu chofer estará esperándote antes de la hora acordada.',
  },
  {
    icon: ShieldCheck,
    title: 'Seguridad',
    description: 'Vehículos con mantenimiento al día y choferes verificados.',
  },
  {
    icon: EyeOff,
    title: 'Discreción',
    description: 'Servicio confidencial para ejecutivos y personalidades.',
  },
  {
    icon: Star,
    title: 'Experiencia Premium',
    description: 'Cada detalle pensado para un viaje de primer nivel.',
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
    <section className="py-12 sm:py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold text-white">
            ¿Por qué <span className="text-[#C9A84C]">elegirnos</span>?
          </h2>
          <p className="mt-2 text-sm text-white/40">Más que transporte, una experiencia</p>
        </div>

        {/* Features — 2x2 grid */}
        <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-10 sm:mb-16">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-white/[0.03] border border-white/[0.05] rounded-xl sm:rounded-2xl p-4 sm:p-5"
            >
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#C9A84C]/10 flex items-center justify-center mb-2.5 sm:mb-3">
                <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-[#C9A84C]" />
              </div>
              <h3 className="text-white font-semibold text-sm sm:text-base mb-0.5">{title}</h3>
              <p className="text-[11px] sm:text-xs text-white/35 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="space-y-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white/[0.03] border border-white/[0.05] rounded-xl sm:rounded-2xl p-4 sm:p-5"
            >
              <Quote className="w-4 h-4 text-[#C9A84C]/30 mb-2" />
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed mb-3">"{t.text}"</p>
              <div>
                <div className="text-xs sm:text-sm font-semibold text-white">{t.name}</div>
                <div className="text-[10px] sm:text-xs text-white/30">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
