import Hero from './components/Hero';
import VehicleShowcase from './components/VehicleShowcase';
import WhyChooseUs from './components/WhyChooseUs';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import { RegionOverlay } from './components/RegionSelector';
import { RegionProvider, useRegion } from './hooks/useRegion';
import { useBooking } from './hooks/useBooking';

function AppContent() {
  const { hasSelected, regionData } = useRegion();
  const bookingState = useBooking(regionData);

  if (!hasSelected) return <RegionOverlay />;

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

function App() {
  return (
    <RegionProvider>
      <AppContent />
    </RegionProvider>
  );
}

export default App;
