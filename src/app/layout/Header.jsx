import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Container from "../../shared/ui/Container.jsx";
import { buttonHover, buttonTap, ease } from "../../shared/motion.js";

const nav = [
  { to: "/", label: "Главная" },
  { to: "/services", label: "Услуги" },
  { to: "/prices", label: "Прайс" },
  { to: "/articles", label: "Статьи" },
  { to: "/reviews", label: "Отзывы" },
  { to: "/contacts", label: "Контакты" },
];

const menuBackdrop = {
  hidden: { opacity: 0, backdropFilter: "blur(0px)" },
  visible: {
    opacity: 1,
    backdropFilter: "blur(5px)",
    transition: { duration: 0.28, ease },
  },
  exit: {
    opacity: 0,
    backdropFilter: "blur(0px)",
    transition: { duration: 0.22, ease },
  },
};

const menuPanel = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.42,
      ease,
      when: "beforeChildren",
      staggerChildren: 0.045,
      delayChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    y: 18,
    filter: "blur(8px)",
    transition: { duration: 0.24, ease },
  },
};

const menuItem = {
  hidden: {
    opacity: 0,
    y: 10,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.36, ease },
  },
};

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
            <motion.a
              className="header__cta"
              href="https://t.me/dr_shorina"
              target="_blank"
              rel="noreferrer"
              whileHover={buttonHover}
              whileTap={buttonTap}
            >
              Telegram
            </motion.a>

            <motion.button
              className="burger"
              type="button"
              aria-label={open ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              onClick={() => setOpen((v) => !v)}
              whileHover={buttonHover}
              whileTap={buttonTap}
            >
              <span className={"burger__bar" + (open ? " is-open" : "")} />
              <span className={"burger__bar" + (open ? " is-open" : "")} />
              <span className={"burger__bar" + (open ? " is-open" : "")} />
            </motion.button>
          </div>
        </Container>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-navigation"
            className="mobileMenu is-open"
            aria-hidden={!open}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className="mobileMenu__backdrop"
              onClick={close}
              variants={menuBackdrop}
            />

            <motion.div
              className="mobileMenu__panel"
              role="dialog"
              aria-modal="true"
              aria-label="Меню"
              variants={menuPanel}
            >
              <motion.div className="mobileMenu__top" variants={menuItem}>
                <div>
                  <div className="mobileMenu__eyebrow">Навигация</div>
                  <div className="mobileMenu__title">Меню</div>
                </div>
                <motion.button
                  className="mobileMenu__close"
                  onClick={close}
                  aria-label="Закрыть"
                  whileHover={buttonHover}
                  whileTap={buttonTap}
                >
                  ✕
                </motion.button>
              </motion.div>

              <nav className="mobileMenu__nav" aria-label="Мобильная навигация">
                {nav.map((i) => (
                  <motion.div key={i.to} variants={menuItem}>
                    <NavLink
                      to={i.to}
                      onClick={close}
                      className={({ isActive }) => "mobileMenu__link" + (isActive ? " is-active" : "")}
                    >
                      <span>{i.label}</span>
                      <span className="mobileMenu__linkArrow">→</span>
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              <motion.div className="mobileMenu__actions" variants={menuItem}>
                <motion.a
                  className="btn btn--primary w100 mobileMenu__ctaLink"
                  href="https://t.me/dr_shorina"
                  target="_blank"
                  rel="noreferrer"
                  onClick={close}
                  whileHover={buttonHover}
                  whileTap={buttonTap}
                >
                  Записаться в Telegram
                </motion.a>

                <motion.div whileHover={buttonHover} whileTap={buttonTap}>
                  <NavLink to="/contacts" className="btn btn--ghost w100" onClick={close}>
                    Контакты
                  </NavLink>
                </motion.div>

                <a
                  className="mobileMenu__phone"
                  href="https://t.me/dr_shorina"
                  target="_blank"
                  rel="noreferrer"
                  onClick={close}
                >
                  @{"dr_shorina"}
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
