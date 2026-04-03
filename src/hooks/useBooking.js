import { useState, useMemo, useCallback } from 'react';
import { calculatePrice } from '../data/pricing';
import { differenceInCalendarDays } from 'date-fns';

const initialState = {
  serviceType: null,
  tripType: null,
  date: null,
  dateRange: { from: null, to: null },
  time: '09:00',
  hours: 4,
  location: null,
  customAddress: '',
  route: null,
  selectedExtras: [],
};

export function useBooking() {
  const [booking, setBooking] = useState(initialState);

  const days = useMemo(() => {
    if (booking.tripType === 'por-dias' && booking.dateRange.from && booking.dateRange.to) {
      return Math.max(differenceInCalendarDays(booking.dateRange.to, booking.dateRange.from), 1);
    }
    return 1;
  }, [booking.tripType, booking.dateRange]);

  const price = useMemo(() => {
    return calculatePrice({
      serviceType: booking.serviceType,
      tripType: booking.tripType,
      hours: booking.hours,
      days,
      route: booking.route,
      extras: booking.selectedExtras,
    });
  }, [booking.serviceType, booking.tripType, booking.hours, days, booking.route, booking.selectedExtras]);

  const updateBooking = useCallback((field, value) => {
    setBooking(prev => {
      const next = { ...prev, [field]: value };
      if (field === 'serviceType') {
        next.selectedExtras = prev.selectedExtras.filter(e => {
          if (value === 'sin-chofer' && e.requiresChofer) return false;
          return true;
        });
      }
      if (field === 'tripType') {
        next.date = null;
        next.dateRange = { from: null, to: null };
        next.hours = 4;
        next.route = null;
      }
      return next;
    });
  }, []);

  const toggleExtra = useCallback((extra) => {
    setBooking(prev => {
      const exists = prev.selectedExtras.find(e => e.id === extra.id);
      return {
        ...prev,
        selectedExtras: exists
          ? prev.selectedExtras.filter(e => e.id !== extra.id)
          : [...prev.selectedExtras, extra],
      };
    });
  }, []);

  const reset = useCallback(() => setBooking(initialState), []);

  const currentStep = useMemo(() => {
    if (!booking.serviceType) return 1;
    if (!booking.tripType) return 2;
    if (booking.tripType === 'por-dias' && (!booking.dateRange.from || !booking.dateRange.to)) return 3;
    if (booking.tripType !== 'por-dias' && booking.tripType !== 'interurbano' && !booking.date) return 3;
    if (booking.tripType === 'interurbano' && !booking.route) return 3;
    if (!booking.location && booking.tripType !== 'interurbano') return 4;
    return 5;
  }, [booking]);

  const isComplete = useMemo(() => {
    if (!booking.serviceType || !booking.tripType) return false;
    if (booking.tripType === 'por-dias' && (!booking.dateRange.from || !booking.dateRange.to)) return false;
    if (booking.tripType === 'interurbano' && !booking.route) return false;
    if (booking.tripType !== 'por-dias' && booking.tripType !== 'interurbano' && !booking.date) return false;
    if (!booking.location && booking.tripType !== 'interurbano') return false;
    return true;
  }, [booking]);

  return { booking, price, days, currentStep, isComplete, updateBooking, toggleExtra, reset };
}
