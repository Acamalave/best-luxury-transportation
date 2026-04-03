import { MapPin, Phone, Mail, AtSign } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-8 sm:py-12 px-4 border-t border-white/[0.06]">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <h3 className="text-base sm:text-lg font-bold text-white mb-1.5">
              Best Luxury<span className="text-[#C9A84C]"> Transportation</span>
            </h3>
            <p className="text-xs sm:text-sm text-white/40 leading-relaxed">
              Servicio exclusivo de transporte de lujo con Cadillac Escalade en Venezuela.
            </p>
          </div>

          {/* Coverage */}
          <div>
            <h4 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">Cobertura</h4>
            <div className="space-y-2">
              {['Caracas', 'Valencia', 'Maracaibo', 'Margarita', 'Mérida', 'Puerto La Cruz'].map(city => (
                <div key={city} className="flex items-center gap-2 text-sm text-white/40">
                  <MapPin className="w-3 h-3 text-[#C9A84C]" />
                  {city}
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">Contacto</h4>
            <div className="space-y-2">
              <a href="tel:+584121234567" className="flex items-center gap-2 text-sm text-white/40 hover:text-[#C9A84C] transition-colors">
                <Phone className="w-3 h-3" />
                +58 412 123 4567
              </a>
              <a href="mailto:info@bestluxury.ve" className="flex items-center gap-2 text-sm text-white/40 hover:text-[#C9A84C] transition-colors">
                <Mail className="w-3 h-3" />
                info@bestluxury.ve
              </a>
              <a href="#" className="flex items-center gap-2 text-sm text-white/40 hover:text-[#C9A84C] transition-colors">
                <AtSign className="w-3 h-3" />
                @bestluxuryvzla
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/[0.06] text-center">
          <p className="text-xs text-white/20">
            © {new Date().getFullYear()} Best Luxury Transportation. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
