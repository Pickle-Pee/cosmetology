import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Container from "../shared/ui/Container.jsx";
import Button from "../shared/ui/Button.jsx";
import reviews from "../data/reviews.json";
import beforeAfter from "../data/beforeAfter.json";
import articles from "../data/articles.json";
import Carousel from "../shared/ui/Carousel.jsx";

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

// const slides = [
//   {
//     id: "s1",
//     kicker: "Косметология • Уход • Эстетика",
//     title: "Профессиональная косметология\nс понятным результатом",
//     text: "Индивидуальный подбор процедур, деликатный подход и внимательное сопровождение на каждом этапе.",
//     image: "",
//   },
//   {
//     id: "s2",
//     kicker: "Индивидуально",
//     title: "План ухода\nпод вашу кожу",
//     text: "Диагностика, рекомендации и процедуры по показаниям — без лишних назначений и с заботой о безопасности.",
//     image: "",
//   },
//   {
//     id: "s3",
//     kicker: "Комфорт",
//     title: "Спокойная эстетика\nбез лишнего шума",
//     text: "Современные аппаратные и инъекционные методики для естественного, ухоженного результата.",
//     image: "",
//   },
// ];

const serviceCards = [
  {
    title: "Консультация",
    text: "Разбор запроса, состояния кожи и понятный план дальнейших действий.",
  },
  {
    title: "Аппаратные методики",
    text: "Работа с качеством кожи, лифтингом, овалом лица и локальными зонами.",
  },
  {
    title: "Инъекционные методики",
    text: "Инъекционные методики для естественного и гармоничного результата.",
  },
  {
    title: "Уход и восстановление",
    text: "Чистки, пилинги, PRX-терапия и восстановительные протоколы по показаниям.",
  },
];

const doctorFacts = [
  {
    title: "Врач-дерматокосметолог",
    text: "Более 10 лет практики в эстетической медицине",
  },
  {
    title: "Тренер для врачей",
    text: "По аппаратным и инъекционным методикам",
  },
  {
    title: "Международный спикер",
    text: "Участник и эксперт профессиональных конгрессов",
  },
  {
    title: "Автор публикаций",
    text: "Материалы о здоровье кожи и современной косметологии",
  },
];

function InfoCard({ title, text, cta = "Подробнее →", onClick }) {
  return (
    <article className="card card--minimal">
      <div className="card__top">
        <h3 className="h3">{title}</h3>
      </div>
      <p className="muted">{text}</p>
      {onClick && (
        <div className="card__bottom">
          <button className="link" onClick={onClick}>
            {cta}
          </button>
        </div>
      )}
    </article>
  );
}

export default function Home() {
  const [isCertificatesOpen, setIsCertificatesOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const featuredReviews = reviews
    .filter((review) => review.featured)
    .slice(0, 2);

  const featuredArticles = articles.slice(0, 2);

  const preferredWorkCategories = [
    "Эстетическая косметология",
    "Эстетическая коррекция",
    "Инъекционные методики",
    "Аппаратные методики",
    "RF-лифтинг",
    "SMAS-лифтинг",
    "PRX",
    "Пилинги",
    "Лечение кожи",
    "Коррекция тела",
  ];

  const workCategories = preferredWorkCategories.filter((category) =>
    beforeAfter.some((item) => item.category === category)
  );

  const [activeWorkCategory, setActiveWorkCategory] = useState(
    workCategories[0]
  );

  const filteredWorkImages = beforeAfter
    .filter((item) => item.category === activeWorkCategory)
    .flatMap((item) =>
      item.images.map((image, index) => ({
        id: `${item.id}-${index}`,
        category: item.category,
        image,
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
      {/* <Carousel
        autoPlayMs={5500}
        slides={slides.map((s) => ({
          ...s,
          primaryAction: (
            <Button
              onClick={() =>
                window.open("https://t.me/dr_shorina", "_blank")
              }
            >
              Записаться
            </Button>
          ),
          secondaryAction: (
            <Button
              variant="ghost"
              onClick={() =>
                window.open("https://t.me/dr_shorina", "_blank")
              }
            >
              Консультация
            </Button>
          ),
        }))}
      /> */}

      <section className="section aboutHero">
        <Container>
          <div className="aboutHeroCard">
            <div
              className="aboutHeroGrid"
              style={{ gridTemplateColumns: "minmax(300px, 0.85fr) minmax(0, 1.15fr)" }}
            >
              <div className="aboutHeroPhoto">
                <div
                  className="aboutHero__imageFrame"
                  style={{
                    minHeight: 520,
                    alignItems: "center",
                    background:
                      "linear-gradient(135deg, rgba(220, 197, 174, 0.22), rgba(147, 199, 193, 0.14))",
                    border: "1px solid rgba(220, 197, 174, 0.28)",
                  }}
                >
                  <div
                    style={{
                      textAlign: "center",
                      color: "var(--muted)",
                      padding: 24,
                    }}
                  >
                    <div style={{ fontSize: 18, fontWeight: 700, color: "var(--text)" }}>
                      Фото врача
                    </div>
                    <div style={{ marginTop: 8, fontSize: 14 }}>
                      Временная заглушка
                    </div>
                  </div>
                </div>
              </div>

              <div className="aboutHeroContent">
                <div className="kicker aboutHero__kicker">О враче</div>

                <h2 className="aboutHero__title">
                  Врач, который умеет сказать:<br />«Вам это не нужно»
                </h2>

                <p className="aboutHero__text">
                  Для меня косметология — это не поиск новых недостатков и не
                  стремление изменить человека.
                </p>

                <p className="aboutHero__text">
                  Моя задача — понять, что действительно вас беспокоит, оценить
                  состояние кожи и тканей и предложить решение, которое будет
                  полезным, безопасным и обоснованным.
                </p>

                <p className="aboutHero__text">
                  Иногда это процедура. Иногда — правильно подобранный домашний
                  уход. А иногда лучше ничего не менять.
                </p>

                <div style={{ height: 1, background: "var(--border)", margin: "24px 0" }} />

                <p className="aboutHero__text">
                  <b>Не каждая консультация должна заканчиваться процедурой.</b><br />
                  Но каждая должна заканчиваться пониманием, что делать дальше.
                </p>

                <div className="grid" style={{ marginTop: 22 }}>
                  {doctorFacts.map((item) => (
                    <article className="card card--minimal" key={item.title}>
                      <h3 className="h3">{item.title}</h3>
                      <p className="muted">{item.text}</p>
                    </article>
                  ))}
                </div>

                <div className="aboutHero__actions" style={{ marginTop: 24 }}>
                  <Button onClick={() => window.open("https://t.me/dr_shorina", "_blank")}>
                    Подробнее о враче
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="section__head">
            <h2 className="h2">Квалификация и документы</h2>
            <p className="muted">
              Дипломы, сертификаты и подтверждение профессионального обучения.
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
              <h2 className="h2">С чем можно обратиться</h2>
              <p className="muted">
                Основные направления работы — от консультации до комплексного плана ухода.
              </p>
            </div>

            <Link to="/prices" className="btn btn--ghost">
              Посмотреть прайс
            </Link>
          </div>

          <div className="grid">
            {serviceCards.map((item) => (
              <InfoCard
                key={item.title}
                title={item.title}
                text={item.text}
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
              <h2 className="h2">Результаты</h2>
              <p className="muted">
                Примеры работ, где важен не эффект «после любой ценой», а понятное решение конкретного запроса.
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
                {category === "Эстетическая коррекция" ? "Эстетическая косметология" : category}
              </button>
            ))}
          </div>

          <div className="worksCarousel" ref={worksCarouselRef}>
            {filteredWorkImages.map((item) => (
              <article className="workCard" key={item.id}>
                <div className="workCard__imageWrap">
                  <img
                    src={item.image}
                    alt={item.category}
                    className="workCard__image"
                    loading="lazy"
                  />
                </div>

                <div className="workCard__body">
                  <span className="pill">
                    {item.category === "Эстетическая коррекция" ? "Эстетическая косметология" : item.category}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section section--alt">
        <Container>
          <div className="section__head section__head--row">
            <div>
              <h2 className="h2">Отзывы</h2>
              <p className="muted">Опыт пациентов после консультаций и процедур.</p>
            </div>

            <Link to="/reviews" className="btn btn--ghost">
              Все отзывы
            </Link>
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
                  <div className="rating">{"★".repeat(review.rating)}</div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="section__head section__head--row">
            <div>
              <h2 className="h2">Экспертные статьи</h2>
              <p className="muted">
                Авторские публикации о косметологии, уходе за кожей и современных процедурах.
              </p>
            </div>

            <Link to="/articles" className="btn btn--ghost">
              Все статьи
            </Link>
          </div>

          <div className="articlesGrid articlesGrid--preview">
            {featuredArticles.map((article) => {
              const title = article.title || article.heading || article.name;
              const excerpt = article.excerpt || article.announcement || article.description;
              const image = article.image || article.preview || article.images?.[0];

              return (
                <article className="articleCard" key={article.id}>
                  <Link to={`/articles/${article.slug}`} className="articleCard__imageWrap">
                    <img
                      src={image}
                      alt={title}
                      className="articleCard__image"
                      loading="lazy"
                    />
                  </Link>

                  <div className="articleCard__body">
                    <div className="articleCard__meta">
                      <span className="pill">{article.category}</span>
                      {article.readTime && <span>{article.readTime}</span>}
                    </div>

                    <h3 className="articleCard__title">
                      <Link to={`/articles/${article.slug}`}>{title}</Link>
                    </h3>

                    {excerpt && <p className="articleCard__excerpt">{excerpt}</p>}

                    <Link to={`/articles/${article.slug}`} className="articleCard__link">
                      Читать статью
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="section section--alt">
        <Container>
          <div className="cta">
            <div>
              <h2 className="h2">Запись и контакты</h2>
              <p className="muted">
                Напишите в Telegram, чтобы рассказать о своём запросе и понять,
                какой следующий шаг будет действительно уместен.
              </p>
            </div>
            <Button onClick={() => window.open("https://t.me/dr_shorina", "_blank")}>
              Написать в Telegram
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

            <div className="certViewer__caption">{selectedCertificate.title}</div>
          </div>
        </div>
      )}
    </>
  );
}
