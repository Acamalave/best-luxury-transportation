import Hero from './components/Hero';
import BookingConfigurator from './components/BookingConfigurator';
import VehicleShowcase from './components/VehicleShowcase';
import WhyChooseUs from './components/WhyChooseUs';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import { useBooking } from './hooks/useBooking';

function App() {
  const bookingState = useBooking();

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Hero bookingState={bookingState} />
      <BookingConfigurator bookingState={bookingState} />
      <VehicleShowcase />
      <WhyChooseUs />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
