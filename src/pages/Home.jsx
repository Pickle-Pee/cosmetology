import { useEffect, useState, useRef } from "react";
import Container from "../shared/ui/Container.jsx";
import Button from "../shared/ui/Button.jsx";
import Carousel from "../shared/ui/Carousel.jsx";
import reviews from "../data/reviews.json";
import beforeAfter from "../data/beforeAfter.json";

const slides = [
  {
    id: "s1",
    kicker: "Косметология • Уход • Эстетика",
    title: "Мягкий подход\nи понятный результат",
    text: "Сайт-визитка: карусель, блок о враче и несколько разделов-заглушек.",
    image: "",
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

  const featuredReviews = reviews
    .filter((review) => review.featured)
    .slice(0, 2);

  const workCategories = [
    ...new Set(beforeAfter.map((item) => item.category)),
  ];

  const [activeWorkCategory, setActiveWorkCategory] = useState(
    workCategories[0]
  );

  const filteredWorks = beforeAfter.filter(
    (item) => item.category === activeWorkCategory
  );

  const filteredWorkImages = beforeAfter
    .filter((item) => item.category === activeWorkCategory)
    .flatMap((item) =>
      item.images.map((image, index) => ({
        id: `${item.id}-${index}`,
        // title: item.title,
        category: item.category,
        image,
        count: item.images.length,
      }))
    );

  const worksCarouselRef = useRef(null);

  const scrollWorks = (direction) => {
    if (!worksCarouselRef.current) return;

    worksCarouselRef.current.scrollBy({
      left: direction === "next" ? 340 : -340,
      behavior: "smooth",
    });
  };

  const shouldShowWorkArrows = filteredWorkImages.length > 1;

  useEffect(() => {
    const isLocked = isCertificatesOpen || !!selectedCertificate;
    document.body.style.overflow = isLocked ? "hidden" : "";


    return () => {
      document.body.style.overflow = "";
    };
  }, [isCertificatesOpen, selectedCertificate]);

  useEffect(() => {
    if (!worksCarouselRef.current) return;

    worksCarouselRef.current.scrollTo({
      left: 0,
      behavior: "smooth",
    });
  }, [activeWorkCategory]);

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

      <section className="section aboutHero">
        <Container>
          <div className="aboutHeroCard">
            <div className="aboutHeroGrid">
              <div className="aboutHeroContent">
                <div className="kicker aboutHero__kicker">О враче</div>

                <h1 className="aboutHero__title">
                  Наталия Шорина
                </h1>

                <span className="aboutHero__experience">
                  10+ лет практики в эстетической медицине
                </span>

                <div className="aboutHero__subtitle">
                  Врач-дерматокосметолог, гастроэнтеролог, педиатр
                </div>

                <p className="aboutHero__text">
                  Международный спикер и <b>Key Opinion Leader (KOL)</b>,
                  сотрудничающий с ведущими мировыми и российскими эстетическими
                  брендами — <b>Juvelook & Lenisna, Alma Lasers, SHENB, PRX-T33 / WiQo</b> и др.
                </p>

                <p className="aboutHero__text">
                  Тренер по аппаратным и инъекционным методикам в косметологии.
                  Сертифицированный тренер брендов <b>Juvelook & Lenisna, PRX-T33, Repart</b>.
                </p>

                <p className="aboutHero__text">
                  Ex-преподаватель кафедры РНИМУ им. Н.И. Пирогова.
                  Спикер международных конгрессов по косметологии.
                </p>

                <p className="aboutHero__text">
                  Автор публикаций в изданиях:
                  <b> Forbes, 1NEP, Облик, Mail.ru, Комсомольская правда, SB.BY</b> и других.
                </p>

                <p className="aboutHero__text">
                  Член общества мезотерапии и <b>РОСМЕДОБР</b>.
                  Финалист проекта <b>Doctor Star</b>,
                  победитель <b>TopBeautyDoctor</b>.
                </p>

                <p className="aboutHero__text">
                  <b>Врачую:</b> делаю женщин и мужчин красивее,
                  моложе и ухоженнее.
                </p>

                <p className="aboutHero__text">
                  <b>Делюсь опытом:</b> обучаю врачей-косметологов
                  по России и СНГ.
                </p>

                <div className="badges aboutHero__badges">
                  <span className="badge">Juvelook & Lenisna</span>
                  <span className="badge">Alma Lasers</span>
                  <span className="badge">PRX-T33 / WiQo</span>
                  <span className="badge">Doctor Star</span>
                  <span className="badge">TopBeautyDoctor</span>
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
                  <picture>
                    <source media="(max-width: 900px)" srcSet="/doctor/doctor-photo.jpg" />
                    <img
                      src="/doctor/doctor-full.jpg"
                      alt="Наталия Шорина"
                      className="aboutHeroPhoto__image"
                      loading="lazy"
                    />
                  </picture>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="section__head section__head--row">
            <div>
              <h2 className="h2">До / После</h2>
              <p className="muted">
                Примеры результатов процедур.
              </p>
            </div>

            {shouldShowWorkArrows && (
              <div className="carouselControls">
                <button
                  type="button"
                  className="carouselArrow"
                  onClick={() => scrollWorks("prev")}
                  aria-label="Предыдущие работы"
                >
                  ←
                </button>

                <button
                  type="button"
                  className="carouselArrow"
                  onClick={() => scrollWorks("next")}
                  aria-label="Следующие работы"
                >
                  →
                </button>
              </div>
            )}
          </div>

          <div className="worksTabs" aria-label="Категории работ">
            {workCategories.map((category) => (
              <button
                key={category}
                type="button"
                className={
                  activeWorkCategory === category
                    ? "worksTab worksTab--active"
                    : "worksTab"
                }
                onClick={() => setActiveWorkCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="worksCarousel" ref={worksCarouselRef}>
            {filteredWorkImages.map((item) => (
              <article className="workCard" key={item.id}>
                <div className="workCard__imageWrap">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="workCard__image"
                    loading="lazy"
                  />
                </div>

                <div className="workCard__body">
                  <span className="pill">{item.category}</span>
                  {/* <h3 className="h3">{item.title}</h3> */}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

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

      <section className="section section--alt">
        <Container>
          <div className="section__head section__head--row">
            <div>
              <h2 className="h2">Отзывы</h2>
              <p className="muted">
                Реальные отзывы пациентов с Яндекса.
              </p>
            </div>

            <Button variant="ghost" onClick={() => location.assign("/reviews")}>
              Все отзывы
            </Button>
          </div>

          <div className="grid">
            {featuredReviews.map((review) => (
              <article className="card card--minimal" key={review.id}>
                <div className="card__top">
                  <h3 className="h3">{review.name}</h3>
                  <span className="pill">{review.source}</span>
                </div>

                <p className="muted">“{review.text}”</p>

                <div className="card__bottom">
                  <div className="rating">
                    {"★".repeat(review.rating)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

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