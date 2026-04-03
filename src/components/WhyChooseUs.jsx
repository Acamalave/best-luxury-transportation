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
    <section className="py-16 sm:py-24 px-5 sm:px-6">
      <div className="max-w-5xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            ¿Por qué <span className="text-[#C9A84C]">elegirnos</span>?
          </h2>
          <p className="mt-3 text-sm text-white/40 leading-relaxed">Más que transporte, una experiencia</p>
        </div>

        {/* Features — 2x2 grid with generous spacing */}
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-white/[0.03] border border-white/[0.05] rounded-2xl p-5 sm:p-6"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#C9A84C]/10 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#C9A84C]" />
              </div>
              <h3 className="text-white font-semibold text-[15px] sm:text-base mb-1.5">{title}</h3>
              <p className="text-xs sm:text-sm text-white/35 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-12 sm:my-16 border-t border-white/[0.04]" />

        {/* Testimonials */}
        <div className="text-center mb-8 sm:mb-10">
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Lo que dicen <span className="text-[#C9A84C]">nuestros clientes</span>
          </h3>
        </div>

        <div className="space-y-4 sm:grid sm:grid-cols-3 sm:gap-5 sm:space-y-0">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white/[0.03] border border-white/[0.05] rounded-2xl p-5 sm:p-6"
            >
              <Quote className="w-5 h-5 text-[#C9A84C]/25 mb-4" />
              <p className="text-sm text-white/55 leading-relaxed mb-5">"{t.text}"</p>
              <div className="pt-4 border-t border-white/[0.05]">
                <div className="text-sm font-semibold text-white">{t.name}</div>
                <div className="text-xs text-white/30 mt-0.5">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
