import { motion, AnimatePresence } from 'framer-motion';
import { SERVICE_TYPES, TRIP_TYPES, INTERCITY_ROUTES } from '../data/pricing';
import { LOCATIONS } from '../data/locations';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const WHATSAPP_NUMBER = '584121234567'; // Replace with actual number

function buildWhatsAppMessage(booking, price, days) {
  const service = SERVICE_TYPES.find(s => s.id === booking.serviceType);
  const trip = TRIP_TYPES.find(t => t.id === booking.tripType);
  const location = LOCATIONS.find(l => l.id === booking.location);

  let lines = [
    '🚘 *RESERVA - Best Luxury Transportation*',
    '',
    `📋 *Servicio:* ${service?.label}`,
    `🗺️ *Tipo:* ${trip?.label}`,
  ];

  if (booking.tripType === 'interurbano' && booking.route) {
    const route = INTERCITY_ROUTES.find(r => r.id === booking.route);
    lines.push(`📍 *Ruta:* ${route?.from} → ${route?.to}`);
  }

  if (booking.tripType === 'por-dias' && booking.dateRange.from && booking.dateRange.to) {
    lines.push(`📅 *Desde:* ${format(booking.dateRange.from, 'dd MMM yyyy', { locale: es })}`);
    lines.push(`📅 *Hasta:* ${format(booking.dateRange.to, 'dd MMM yyyy', { locale: es })} (${days} días)`);
  } else if (booking.date) {
    lines.push(`📅 *Fecha:* ${format(booking.date, 'dd MMM yyyy', { locale: es })}`);
  }

  lines.push(`🕐 *Hora:* ${booking.time}`);

  if (booking.tripType === 'por-horas') {
    lines.push(`⏱️ *Duración:* ${booking.hours} horas`);
  }

  if (location) {
    lines.push(`📍 *Recogida:* ${location.label}${booking.location === 'custom' ? ` - ${booking.customAddress}` : ''}`);
  }

  if (booking.selectedExtras.length > 0) {
    lines.push('');
    lines.push('✨ *Extras:*');
    booking.selectedExtras.forEach(e => {
      lines.push(`  • ${e.label} ($${e.price}${e.perDay ? '/día' : ''})`);
    });
  }

  lines.push('');
  lines.push(`💰 *Total estimado: $${price.total} USD*`);
  if (price.discount > 0) {
    lines.push(`🏷️ Descuento aplicado: -$${price.discount}`);
  }

  return encodeURIComponent(lines.join('\n'));
}

export default function PriceSummary({ booking, price, days, isComplete }) {
  const handleWhatsApp = () => {
    const msg = buildWhatsAppMessage(booking, price, days);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  if (price.total === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 lg:sticky lg:top-6"
      >
        <div className="bg-[#111111]/95 backdrop-blur-xl border-t border-white/10 lg:border lg:rounded-2xl p-4 lg:p-6 safe-bottom">
          <div className="max-w-lg mx-auto lg:max-w-none">
            {/* Price breakdown */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="text-xs text-white/40 uppercase tracking-wider">Total estimado</div>
                <motion.div
                  key={price.total}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  className="text-3xl font-bold text-white"
                >
                  ${price.total}
                  <span className="text-sm font-normal text-white/40 ml-1">USD</span>
                </motion.div>
              </div>
              <div className="text-right space-y-0.5">
                {price.base > 0 && (
                  <div className="text-xs text-white/50">Base: ${price.base}</div>
                )}
                {price.extrasTotal > 0 && (
                  <div className="text-xs text-white/50">Extras: +${price.extrasTotal}</div>
                )}
                {price.discount > 0 && (
                  <div className="text-xs text-green-400">
                    Descuento {Math.round(price.discountRate * 100)}%: -${price.discount}
                  </div>
                )}
              </div>
            </div>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleWhatsApp}
              disabled={!isComplete}
              className={`w-full py-3.5 rounded-xl font-semibold text-base transition-all cursor-pointer flex items-center justify-center gap-2 ${
                isComplete
                  ? 'bg-[#25D366] hover:bg-[#20bd5a] text-white'
                  : 'bg-white/10 text-white/30 cursor-not-allowed'
              }`}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.612.638l4.694-1.387A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.239 0-4.332-.726-6.033-1.96l-.168-.122-3.476 1.027 1.073-3.322-.148-.186A9.935 9.935 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
              </svg>
              {isComplete ? 'Confirmar por WhatsApp' : 'Completa tu reserva'}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
