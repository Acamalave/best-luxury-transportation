import Hero from './components/Hero';
import VehicleShowcase from './components/VehicleShowcase';
import WhyChooseUs from './components/WhyChooseUs';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import { useBooking } from './hooks/useBooking';

function App() {
  const bookingState = useBooking();

  return (
    <div className="app">
      <Hero bookingState={bookingState} />
      <hr className="section-divider" />
      <VehicleShowcase />
      <hr className="section-divider" />
      <WhyChooseUs />
      <hr className="section-divider" />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
