export const REGIONS = {
  venezuela: {
    id: 'venezuela',
    label: 'Venezuela',
    flag: '🇻🇪',
    currency: 'USD',
    whatsapp: '584121234567',
    vehicle: { name: 'Cadillac Escalade', image: '/escalade-cutout.png' },
    coverage: ['Caracas', 'Valencia', 'Maracaibo', 'Margarita', 'Mérida', 'Puerto La Cruz'],
    locations: [
      { id: 'maiquetia', label: 'Aeropuerto Internacional de Maiquetía', category: 'Aeropuerto' },
      { id: 'ccs-altamira', label: 'Altamira, Caracas', category: 'Caracas' },
      { id: 'ccs-chacao', label: 'Chacao, Caracas', category: 'Caracas' },
      { id: 'ccs-las-mercedes', label: 'Las Mercedes, Caracas', category: 'Caracas' },
      { id: 'ccs-el-rosal', label: 'El Rosal, Caracas', category: 'Caracas' },
      { id: 'ccs-la-castellana', label: 'La Castellana, Caracas', category: 'Caracas' },
      { id: 'ccs-ccct', label: 'CCCT, Caracas', category: 'Caracas' },
      { id: 'ccs-sambil', label: 'Sambil, Caracas', category: 'Caracas' },
      { id: 'valencia', label: 'Valencia', category: 'Otras Ciudades' },
      { id: 'maracaibo', label: 'Maracaibo', category: 'Otras Ciudades' },
      { id: 'margarita', label: 'Isla de Margarita', category: 'Otras Ciudades' },
      { id: 'custom', label: 'Otra dirección...', category: 'Personalizado' },
    ],
    pricing: {
      aeropuerto: { 'con-chofer': 120, 'sin-chofer': 85 },
      'por-horas': { 'con-chofer': 50, 'sin-chofer': 35 },
      'por-dias': { 'con-chofer': 280, 'sin-chofer': 200 },
    },
    intercityRoutes: [
      { id: 'ccs-vlc', from: 'Caracas', to: 'Valencia', price: { 'con-chofer': 350, 'sin-chofer': 260 } },
      { id: 'ccs-mcbo', from: 'Caracas', to: 'Maracaibo', price: { 'con-chofer': 550, 'sin-chofer': 420 } },
      { id: 'ccs-mrg', from: 'Caracas', to: 'Margarita', price: { 'con-chofer': 480, 'sin-chofer': 370 } },
      { id: 'ccs-mrd', from: 'Caracas', to: 'Mérida', price: { 'con-chofer': 520, 'sin-chofer': 400 } },
      { id: 'vlc-mcbo', from: 'Valencia', to: 'Maracaibo', price: { 'con-chofer': 450, 'sin-chofer': 340 } },
      { id: 'ccs-pto', from: 'Caracas', to: 'Puerto La Cruz', price: { 'con-chofer': 420, 'sin-chofer': 310 } },
    ],
  },
  orlando: {
    id: 'orlando',
    label: 'Orlando, FL',
    flag: '🇺🇸',
    currency: 'USD',
    whatsapp: '584121234567',
    vehicle: { name: 'Flota Premium', image: '/escalade-cutout.png' },
    coverage: ['Orlando', 'Kissimmee', 'Lake Buena Vista', 'International Drive', 'Downtown Orlando'],
    locations: [
      { id: 'mco', label: 'Orlando International Airport (MCO)', category: 'Airport' },
      { id: 'disney', label: 'Walt Disney World Area', category: 'Tourist Areas' },
      { id: 'universal', label: 'Universal Studios Area', category: 'Tourist Areas' },
      { id: 'idrive', label: 'International Drive', category: 'Tourist Areas' },
      { id: 'downtown', label: 'Downtown Orlando', category: 'City' },
      { id: 'kissimmee', label: 'Kissimmee', category: 'City' },
      { id: 'lake-buena-vista', label: 'Lake Buena Vista', category: 'City' },
      { id: 'sanford', label: 'Sanford Airport (SFB)', category: 'Airport' },
      { id: 'custom-orl', label: 'Other address...', category: 'Custom' },
    ],
    pricing: {
      aeropuerto: { 'con-chofer': 140, 'sin-chofer': 100 },
      'por-horas': { 'con-chofer': 75, 'sin-chofer': 55 },
      'por-dias': { 'con-chofer': 350, 'sin-chofer': 260 },
    },
    intercityRoutes: [
      { id: 'orl-mia', from: 'Orlando', to: 'Miami', price: { 'con-chofer': 580, 'sin-chofer': 440 } },
      { id: 'orl-tpa', from: 'Orlando', to: 'Tampa', price: { 'con-chofer': 350, 'sin-chofer': 260 } },
      { id: 'orl-jax', from: 'Orlando', to: 'Jacksonville', price: { 'con-chofer': 480, 'sin-chofer': 360 } },
    ],
  },
};

export function getRegionData(regionId) {
  return REGIONS[regionId] || REGIONS.venezuela;
}
