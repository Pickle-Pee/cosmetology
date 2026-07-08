import { Link } from "react-router-dom";
import Container from "../../shared/ui/Container.jsx";

const footerLinks = [
  { to: "/about", label: "О враче" },
  { to: "/services", label: "Услуги" },
  { to: "/training", label: "Обучение" },
  { to: "/articles", label: "Статьи" },
  { to: "/contacts", label: "Контакты" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <Container className="footer__inner">
        <div>
          <div className="footer__brand">Наталия Шорина</div>
          <div className="muted">Дерматокосметология • Эстетика • Обучение</div>
        </div>

        <nav className="footer__nav" aria-label="Навигация в футере">
          {footerLinks.map((item) => (
            <Link key={item.to} to={item.to} className="footer__link">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="muted">© {new Date().getFullYear()} Все права защищены</div>
      </Container>
    </footer>
  );
}
