import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import Container from "../../shared/ui/Container.jsx";
import Button from "../../shared/ui/Button.jsx";

const nav = [
  { to: "/", label: "Главная" },
  { to: "/services", label: "Услуги" },
  { to: "/articles", label: "Статьи" },
  { to: "/reviews", label: "Отзывы" },
  { to: "/contacts", label: "Контакты" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  // Закрывать меню по Esc
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Блокировать прокрутку фона, когда меню открыто
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="header">
      <Container className="header__inner">
        <NavLink to="/" className="logo" aria-label="На главную" onClick={close}>
          <span className="logo__mark" />
          <span className="logo__text">Doctor • Cosmetic</span>
        </NavLink>

        {/* Десктоп-меню */}
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
          <a className="header__cta" href="tel:+70000000000">
            +7 (000) 000-00-00
          </a>

          {/* Бургер (мобила) */}
          <button
            className="burger"
            type="button"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={"burger__bar" + (open ? " is-open" : "")} />
            <span className={"burger__bar" + (open ? " is-open" : "")} />
            <span className={"burger__bar" + (open ? " is-open" : "")} />
          </button>
        </div>
      </Container>

      {/* Мобильный оверлей */}
      <div className={"mobileMenu" + (open ? " is-open" : "")} aria-hidden={!open}>
        <div className="mobileMenu__backdrop" onClick={close} />
        <div className="mobileMenu__panel" role="dialog" aria-label="Меню">
          <div className="mobileMenu__top">
            <div className="mobileMenu__title">Меню</div>
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
                {i.label}
              </NavLink>
            ))}
          </nav>

          <div className="mobileMenu__actions">
            <Button className="w100" onClick={() => alert("Запись подключим позже")}>
              Записаться
            </Button>
            <Button
              variant="ghost"
              className="w100"
              onClick={() => {
                close();
                location.assign("/contacts");
              }}
            >
              Контакты
            </Button>
            <a className="mobileMenu__phone" href="tel:+70000000000" onClick={close}>
              +7 (000) 000-00-00
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
