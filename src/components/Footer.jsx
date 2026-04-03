import { MapPin, Phone, Mail, AtSign } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <div className="footer__brand-name">Best Luxury <span>Transportation</span></div>
          <p className="footer__brand-desc">
            Servicio exclusivo de transporte de lujo con Cadillac Escalade en Venezuela.
          </p>
        </div>

        <div>
          <h4 className="footer__heading">Cobertura</h4>
          <ul className="footer__list">
            {['Caracas', 'Valencia', 'Maracaibo', 'Margarita', 'Mérida', 'Puerto La Cruz'].map(city => (
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
              <a href="#" className="footer__link"><AtSign /> @bestluxuryvzla</a>
            </li>
          </ul>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            © {new Date().getFullYear()} Best Luxury Transportation. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
