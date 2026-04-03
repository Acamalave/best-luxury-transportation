import { MapPin, Phone, Mail, AtSign } from 'lucide-react';
import { useRegion } from '../hooks/useRegion';

export default function Footer() {
  const { regionData } = useRegion();
  const coverage = regionData?.coverage || [];

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <div className="footer__brand-name">Best Luxury <span>Transportation</span></div>
          <p className="footer__brand-desc">
            Servicio exclusivo de transporte de lujo en {regionData?.label || 'Venezuela'}.
          </p>
        </div>

        <div>
          <h4 className="footer__heading">Cobertura</h4>
          <ul className="footer__list">
            {coverage.map(city => (
              <li key={city} className="footer__list-item">
                <MapPin /> {city}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="footer__heading">Contacto</h4>
          <ul className="footer__list">
            <li>
              <a href="tel:+584121234567" className="footer__link"><Phone /> +58 412 123 4567</a>
            </li>
            <li>
              <a href="mailto:info@bestluxury.ve" className="footer__link"><Mail /> info@bestluxury.ve</a>
            </li>
            <li>
              <a href="https://instagram.com/best_luxury_transportation" target="_blank" rel="noopener noreferrer" className="footer__link">
                <AtSign /> @best_luxury_transportation
              </a>
            </li>
          </ul>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            © {new Date().getFullYear()} Best Luxury Transportation. Todos los derechos reservados.
          </p>
          <p className="footer__dev">
            Desarrollado por{' '}
            <a href="https://wa.me/50768204698?text=Hola%2C%20vengo%20de%20Best%20Luxury%20Transportation" target="_blank" rel="noopener noreferrer">
              AcciosCore
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
