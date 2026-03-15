import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import Container from "../../shared/ui/Container.jsx";

const nav = [
  { to: "/", label: "Главная" },
  { to: "/services", label: "Услуги" },
  { to: "/prices", label: "Прайс" },
  { to: "/articles", label: "Статьи" },
  { to: "/reviews", label: "Отзывы" },
  { to: "/contacts", label: "Контакты" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    document.body.classList.toggle("menu-open", open);
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("menu-open");
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className="header">
        <Container className="header__inner">
          <NavLink to="/" className="logo" aria-label="На главную" onClick={close}>
            <span className="logo__mark" />
            <span className="logo__text">Наталия Шорина</span>
          </NavLink>

          <nav className="nav nav--desktop" aria-label="Основное меню">
            {nav.map((i) => (
              <NavLink
                key={i.to}
                to={i.to}
                className={({ isActive }) => "nav__link" + (isActive ? " is-active" : "")}
              >
                {i.label}
              </NavLink>
            ))}
          </nav>

          <div className="header__right">
            <a
              className="header__cta"
              href="https://t.me/dr_shorina"
              target="_blank"
              rel="noreferrer"
            >
              Telegram
            </a>

            <button
              className="burger"
              type="button"
              aria-label={open ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              onClick={() => setOpen((v) => !v)}
            >
              <span className={"burger__bar" + (open ? " is-open" : "")} />
              <span className={"burger__bar" + (open ? " is-open" : "")} />
              <span className={"burger__bar" + (open ? " is-open" : "")} />
            </button>
          </div>
        </Container>
      </header>

      <div
        id="mobile-navigation"
        className={"mobileMenu" + (open ? " is-open" : "")}
        aria-hidden={!open}
      >
        <div className="mobileMenu__backdrop" onClick={close} />
        <div className="mobileMenu__panel" role="dialog" aria-modal="true" aria-label="Меню">
          <div className="mobileMenu__top">
            <div>
              <div className="mobileMenu__eyebrow">Навигация</div>
              <div className="mobileMenu__title">Меню</div>
            </div>
            <button className="mobileMenu__close" onClick={close} aria-label="Закрыть">
              ✕
            </button>
          </div>

          <nav className="mobileMenu__nav" aria-label="Мобильная навигация">
            {nav.map((i) => (
              <NavLink
                key={i.to}
                to={i.to}
                onClick={close}
                className={({ isActive }) => "mobileMenu__link" + (isActive ? " is-active" : "")}
              >
                <span>{i.label}</span>
                <span className="mobileMenu__linkArrow">→</span>
              </NavLink>
            ))}
          </nav>

          <div className="mobileMenu__actions">
            <a
              className="btn btn--primary w100 mobileMenu__ctaLink"
              href="https://t.me/dr_shorina"
              target="_blank"
              rel="noreferrer"
              onClick={close}
            >
              Записаться в Telegram
            </a>

            <NavLink to="/contacts" className="btn btn--ghost w100" onClick={close}>
              Контакты
            </NavLink>

            <a
              className="mobileMenu__phone"
              href="https://t.me/dr_shorina"
              target="_blank"
              rel="noreferrer"
              onClick={close}
            >
              @{"dr_shorina"}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
