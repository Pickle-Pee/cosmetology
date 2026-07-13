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
      <Container>
        <div className="footer__top">
          <div className="footer__about">
            <div className="footer__brand">Наталия Шорина</div>
            <div className="footer__role">Врач-дерматокосметолог</div>

            <p className="footer__description">
              Деликатная косметология по показаниям.
              <br />
              Эстетическая медицина, консультации и обучение врачей-косметологов.
            </p>
          </div>

          <nav className="footer__nav" aria-label="Навигация в футере">
            {footerLinks.map((item) => (
              <Link key={item.to} to={item.to} className="footer__link">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="footer__contacts">
            <a
              className="footer__telegram"
              href="https://t.me/dr_shorina"
              target="_blank"
              rel="noreferrer"
            >
              Telegram: @dr_shorina
            </a>

            <div className="footer__actions">
              <a
                className="btn btn--primary footer__action"
                href="https://t.me/dr_shorina"
                target="_blank"
                rel="noreferrer"
              >
                Записаться на консультацию
              </a>

              <a
                className="btn btn--ghost footer__action"
                href="https://t.me/dr_shorina"
                target="_blank"
                rel="noreferrer"
              >
                Написать об обучении
              </a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__legal">
            <p>Информация на сайте не заменяет консультацию врача.</p>
            <p>
              Медицинские услуги оказываются на базе клиники, имеющей соответствующую лицензию.
            </p>
          </div>

          <div className="footer__copyright">
            © {new Date().getFullYear()} Наталия Шорина. Все права защищены.
          </div>
        </div>
      </Container>
    </footer>
  );
}
