import Hero from './components/Hero';
import BookingConfigurator from './components/BookingConfigurator';
import VehicleShowcase from './components/VehicleShowcase';
import WhyChooseUs from './components/WhyChooseUs';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import { useBooking } from './hooks/useBooking';

function SectionDivider() {
  return (
    <div className="py-4 sm:py-6 px-5 sm:px-6">
      <div className="max-w-xs mx-auto">
        <div className="border-t border-white/[0.06]" />
      </div>
    </div>
  );
}

function App() {
  const bookingState = useBooking();

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Hero bookingState={bookingState} />
      <BookingConfigurator bookingState={bookingState} />
      <SectionDivider />
      <VehicleShowcase />
      <SectionDivider />
      <WhyChooseUs />
      <SectionDivider />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
