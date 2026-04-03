export const SERVICE_TYPES = [
  {
    id: 'con-chofer',
    label: 'Con Chofer',
    description: 'Chofer profesional capacitado',
    icon: 'user-check',
    recommended: true,
  },
  {
    id: 'sin-chofer',
    label: 'Sin Chofer',
    description: 'Conduce tú mismo',
    icon: 'car',
    recommended: false,
  },
];

export const TRIP_TYPES = [
  {
    id: 'aeropuerto',
    label: 'Traslado Aeropuerto',
    description: 'Pickup o dropoff en el aeropuerto',
    icon: 'plane',
    needsDateRange: false,
    needsHours: false,
  },
  {
    id: 'por-horas',
    label: 'Por Horas',
    description: 'Mínimo 4 horas',
    icon: 'clock',
    needsDateRange: false,
    needsHours: true,
    minHours: 4,
    maxHours: 12,
  },
  {
    id: 'por-dias',
    label: 'Por Días',
    description: 'Alquiler de uno o más días',
    icon: 'calendar',
    needsDateRange: true,
    needsHours: false,
  },
  {
    id: 'interurbano',
    label: 'Viaje Interurbano',
    description: 'Traslado entre ciudades',
    icon: 'map-pin',
    needsDateRange: false,
    needsHours: false,
  },
];

export const INTERCITY_ROUTES = [
  { id: 'ccs-vlc', from: 'Caracas', to: 'Valencia', price: { 'con-chofer': 280, 'sin-chofer': 200 } },
  { id: 'ccs-mcbo', from: 'Caracas', to: 'Maracaibo', price: { 'con-chofer': 450, 'sin-chofer': 350 } },
  { id: 'ccs-mrg', from: 'Caracas', to: 'Margarita', price: { 'con-chofer': 400, 'sin-chofer': 300 } },
  { id: 'ccs-mrd', from: 'Caracas', to: 'Mérida', price: { 'con-chofer': 420, 'sin-chofer': 320 } },
  { id: 'vlc-mcbo', from: 'Valencia', to: 'Maracaibo', price: { 'con-chofer': 380, 'sin-chofer': 280 } },
  { id: 'ccs-pto', from: 'Caracas', to: 'Puerto La Cruz', price: { 'con-chofer': 350, 'sin-chofer': 250 } },
];

export const BASE_PRICES = {
  aeropuerto: { 'con-chofer': 80, 'sin-chofer': 60 },
  'por-horas': { 'con-chofer': 35, 'sin-chofer': 25 },
  'por-dias': { 'con-chofer': 200, 'sin-chofer': 150 },
};

export const DISCOUNTS = {
  3: 0.10,
  7: 0.20,
};

export function calculatePrice(booking, regionPricing, regionRoutes) {
  const { serviceType, tripType, hours, days, route, extras } = booking;
  if (!serviceType || !tripType) return { base: 0, extrasTotal: 0, discount: 0, total: 0 };

  const prices = regionPricing || BASE_PRICES;
  const routes = regionRoutes || INTERCITY_ROUTES;
  let base = 0;

  if (tripType === 'interurbano' && route) {
    const r = routes.find(r => r.id === route);
    base = r ? r.price[serviceType] : 0;
  } else if (tripType === 'por-horas') {
    const h = Math.max(hours || 4, 4);
    base = (prices['por-horas']?.[serviceType] || 35) * h;
  } else if (tripType === 'por-dias') {
    const d = Math.max(days || 1, 1);
    base = (prices['por-dias']?.[serviceType] || 200) * d;
  } else if (tripType === 'aeropuerto') {
    base = prices.aeropuerto?.[serviceType] || 80;
  }

  const extrasTotal = extras.reduce((sum, e) => {
    if (e.perDay && tripType === 'por-dias') {
      return sum + e.price * Math.max(days || 1, 1);
    }
    return sum + e.price;
  }, 0);

  let discountRate = 0;
  if (tripType === 'por-dias') {
    const d = days || 1;
    if (d >= 7) discountRate = DISCOUNTS[7];
    else if (d >= 3) discountRate = DISCOUNTS[3];
  }

  const discount = Math.round(base * discountRate);
  const total = base - discount + extrasTotal;

  return { base, extrasTotal, discount, discountRate, total };
}
