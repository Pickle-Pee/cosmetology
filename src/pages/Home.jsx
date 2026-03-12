import { useEffect, useState } from "react";
import Container from "../shared/ui/Container.jsx";
import Button from "../shared/ui/Button.jsx";
import Carousel from "../shared/ui/Carousel.jsx";

const slides = [
  {
    id: "s1",
    kicker: "Косметология • Уход • Эстетика",
    title: "Мягкий подход\nи понятный результат",
    text: "Сайт-визитка: карусель, блок о враче и несколько разделов-заглушек.",
    image: "", // можно: "/slides/slide-1.jpg"
  },
  {
    id: "s2",
    kicker: "Индивидуально",
    title: "План ухода\nпод вашу кожу",
    text: "Диагностика → рекомендации → процедуры по показаниям.",
    image: "",
  },
  {
    id: "s3",
    kicker: "Комфорт",
    title: "Спокойная эстетика\nбез лишнего шума",
    text: "Минимализм, аккуратная типографика, быстрый контакт.",
    image: "",
  },
];

const certificates = [
  { src: "/certificates/cert-1.jpg", title: "Диплом" },
  { src: "/certificates/cert-2.jpg", title: "Сертификат" },
  { src: "/certificates/cert-3.jpg", title: "Повышение квалификации" },
  { src: "/certificates/cert-4.jpg", title: "Косметология" },
  { src: "/certificates/cert-5.jpg", title: "Инъекционные методики" },
  { src: "/certificates/cert-6.jpg", title: "Аппаратные методики" },
  { src: "/certificates/cert-7.jpg", title: "Профессиональное обучение" },
  { src: "/certificates/cert-8.jpg", title: "Сертификат тренера" },
];

function PlaceholderCard({ title, text, cta = "Подробнее →", onClick }) {
  return (
    <article className="card card--minimal">
      <div className="card__top">
        <h3 className="h3">{title}</h3>
        <span className="pill pill--neutral">заглушка</span>
      </div>
      <p className="muted">{text}</p>
      <div className="card__bottom">
        <button className="link" onClick={onClick}>
          {cta}
        </button>
      </div>
    </article>
  );
}

export default function Home() {
  const [isCertificatesOpen, setIsCertificatesOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  useEffect(() => {
    const isLocked = isCertificatesOpen || !!selectedCertificate;
    document.body.style.overflow = isLocked ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isCertificatesOpen, selectedCertificate]);

  const openCertificateViewer = (item) => {
    setIsCertificatesOpen(false);
    setSelectedCertificate(item);
  };

  return (
    <>
      <Carousel
        autoPlayMs={5500}
        slides={slides.map((s) => ({
          ...s,
          primaryAction: (
            <Button onClick={() => window.open("https://t.me/dr_shorina", "_blank")}>
              Записаться
            </Button>
          ),
          secondaryAction: (
            <Button variant="ghost" onClick={() => location.assign("/services")}>
              Услуги
            </Button>
          ),
        }))}
      />

      {/* О враче (сразу под каруселью) */}
      <section className="section aboutHero">
        <Container>
          <div className="aboutHeroCard">
            <div className="aboutHeroGrid">
              <div className="aboutHeroContent">
                <div className="kicker aboutHero__kicker">О враче</div>

                <h1 className="aboutHero__title">
                  Наталия Шорина
                </h1>

                <div className="aboutHero__subtitle">
                  Врач-дерматокосметолог, гастроэнтеролог, педиатр
                </div>

                <p className="aboutHero__text">
                  Тренер по аппаратным и инъекционным методикам в косметологии.
                  Сертифицированный тренер брендов Juvelook & Lenisna, PRX-T33, Repart.
                </p>

                <p className="aboutHero__text">
                  Ex-преподаватель кафедры РНИМУ им. Н.И. Пирогова, спикер международных
                  конгрессов по косметологии, автор профильных и популярных публикаций.
                </p>

                <p className="aboutHero__text">
                  Помогаю женщинам и мужчинам выглядеть красивее, моложе и ухоженнее.
                  Обучаю врачей-косметологов по России и СНГ.
                </p>

                <div className="badges aboutHero__badges">
                  <span className="badge">Juvelook & Lenisna</span>
                  <span className="badge">PRX-T33</span>
                  <span className="badge">Repart</span>
                  <span className="badge">#TOPBEAUTYDOCTOR</span>
                </div>

                <div className="aboutHero__actions">
                  <Button onClick={() => window.open("https://t.me/dr_shorina", "_blank")}>
                    Записаться
                  </Button>
                  <Button variant="ghost" onClick={() => location.assign("/prices")}>
                    Посмотреть прайс
                  </Button>
                </div>
              </div>

              <div className="aboutHeroPhoto">
                <div className="aboutHero__imageFrame">
                  <img
                    src="/doctor/doctor-full.jpg"
                    alt="Наталия Шорина"
                    className="aboutHeroPhoto__image"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Дипломы и сертификаты */}
      <section className="section">
        <Container>
          <div className="section__head">
            <h2 className="h2">Дипломы и сертификаты</h2>
            <p className="muted">
              Подтверждённая медицинская квалификация, профильное обучение и
              регулярное повышение квалификации в области косметологии,
              инъекционных и аппаратных методик.
            </p>
          </div>

          <div className="certGrid certGrid--preview">
            {certificates.slice(0, 4).map((item) => (
              <button
                key={item.src}
                type="button"
                className="certCard"
                onClick={() => openCertificateViewer(item)}
              >
                <div className="certCard__imageWrap">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="certCard__image"
                    loading="lazy"
                  />
                </div>
                <div className="certCard__body">
                  <span className="certCard__title">{item.title}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="certActions">
            <Button variant="ghost" onClick={() => setIsCertificatesOpen(true)}>
              Смотреть все
            </Button>
          </div>
        </Container>
      </section>

      {/* Услуги (заглушка) */}
      <section className="section">
        <Container>
          <div className="section__head section__head--row">
            <div>
              <h2 className="h2">Услуги</h2>
              <p className="muted">
                Основные направления и отдельная страница с актуальным прайсом.
              </p>
            </div>

            <Button variant="ghost" onClick={() => location.assign("/prices")}>
              Посмотреть прайс
            </Button>
          </div>

          <div className="grid">
            {[
              { title: "Консультация", text: "Диагностика и подбор плана ухода." },
              { title: "Чистка лица", text: "Атравматичная / ультразвуковая." },
              { title: "Пилинги", text: "По показаниям, сезонность и уход." },
              {
                title: "Инъекционные методики",
                text: "Пример карточки под направление.",
              },
            ].map((c) => (
              <PlaceholderCard
                key={c.title}
                title={c.title}
                text={c.text}
                onClick={() => location.assign("/services")}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Отзывы (заглушка) */}
      <section className="section section--alt">
        <Container>
          <div className="section__head">
            <h2 className="h2">Отзывы</h2>
            <p className="muted">
              3 карточки и кнопка на страницу — потом подключим реальные.
            </p>
          </div>

          <div className="grid">
            {[
              { title: "Анна", text: "“Очень деликатно и понятно объяснили.”" },
              {
                title: "Мария",
                text: "“Комфортно, аккуратно, понравился результат.”",
              },
              { title: "Екатерина", text: "“Вернусь ещё, спасибо!”" },
            ].map((r) => (
              <PlaceholderCard
                key={r.title}
                title={r.title}
                text={r.text}
                cta="Смотреть все →"
                onClick={() => location.assign("/reviews")}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Статьи (заглушка) */}
      <section className="section">
        <Container>
          <div className="section__head">
            <h2 className="h2">Статьи</h2>
            <p className="muted">Мини-блог: 3 превью и переход.</p>
          </div>

          <div className="grid">
            {[
              "Как выбрать уход по типу кожи",
              "Пилинги: кому подходят",
              "SPF каждый день — зачем",
            ].map((t) => (
              <PlaceholderCard
                key={t}
                title={t}
                text="Короткий анонс на 1–2 строки."
                cta="Читать →"
                onClick={() => location.assign("/articles")}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Контакты (CTA) */}
      <section className="section section--alt">
        <Container>
          <div className="cta">
            <div>
              <h2 className="h2">Запись и контакты</h2>
              <p className="muted">
                Телефон, мессенджеры, адрес — всё компактно на странице
                контактов.
              </p>
            </div>
            <Button onClick={() => location.assign("/contacts")}>
              Открыть контакты
            </Button>
          </div>
        </Container>
      </section>

      {isCertificatesOpen && (
        <div
          className="certModalOverlay"
          onClick={() => setIsCertificatesOpen(false)}
          role="presentation"
        >
          <div
            className="certModal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Дипломы и сертификаты"
          >
            <div className="certModal__header">
              <div>
                <div className="kicker" style={{ color: "var(--muted)" }}>
                  Квалификация
                </div>
                <h3 className="h3" style={{ marginTop: 6 }}>
                  Дипломы и сертификаты
                </h3>
              </div>

              <button
                type="button"
                className="certModal__close"
                onClick={() => setIsCertificatesOpen(false)}
                aria-label="Закрыть"
              >
                ×
              </button>
            </div>

            <div className="certGrid">
              {certificates.map((item) => (
                <button
                  key={item.src}
                  type="button"
                  className="certCard"
                  onClick={() => openCertificateViewer(item)}
                >
                  <div className="certCard__imageWrap">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="certCard__image"
                      loading="lazy"
                    />
                  </div>
                  <div className="certCard__body">
                    <span className="certCard__title">{item.title}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedCertificate && (
        <div
          className="certViewerOverlay"
          onClick={() => setSelectedCertificate(null)}
          role="presentation"
        >
          <div
            className="certViewer"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={selectedCertificate.title}
          >
            <button
              type="button"
              className="certViewer__close"
              onClick={() => setSelectedCertificate(null)}
              aria-label="Закрыть"
            >
              ×
            </button>

            <img
              src={selectedCertificate.src}
              alt={selectedCertificate.title}
              className="certViewer__image"
            />

            <div className="certViewer__caption">
              {selectedCertificate.title}
            </div>
          </div>
        </div>
      )}
    </>
  );
}