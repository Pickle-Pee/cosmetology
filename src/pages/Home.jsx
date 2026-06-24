import { useEffect, useState, useRef } from "react";
import Container from "../shared/ui/Container.jsx";
import Button from "../shared/ui/Button.jsx";
import reviews from "../data/reviews.json";
import beforeAfter from "../data/beforeAfter.json";
import { Link } from "react-router-dom";
import articles from "../data/articles.json";

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

const doctorFacts = [
  {
    title: "Врач-дерматокосметолог",
    text: "Более 10 лет практики в эстетической медицине",
  },
  {
    title: "Тренер для врачей-косметологов",
    text: "По аппаратным и инъекционным методикам",
  },
  {
    title: "Международный спикер",
    text: "Участник и эксперт профессиональных конгрессов",
  },
  {
    title: "Автор экспертных публикаций",
    text: "Материалы о здоровье кожи и современной косметологии",
  },
];

const requestCards = [
  {
    title: "Лицо выглядит уставшим, хотя вы высыпаетесь",
    text: "Кожа кажется тусклой, появляются отёки или ощущение, что лицу не хватает свежести даже после отдыха.",
  },
  {
    title: "Кожа стала сухой, тусклой или неровной",
    text: "Обычный уход больше не даёт прежнего эффекта, тон стал менее ровным, а кожа выглядит менее плотной и спокойной.",
  },
  {
    title: "Беспокоят высыпания или следы постакне",
    text: "Важно не просто убрать проявления, а понять причину и подобрать бережную тактику восстановления кожи.",
  },
  {
    title: "Изменился овал лица",
    text: "Появилась мягкость тканей, отёчность или ощущение, что лицо стало выглядеть иначе, чем раньше.",
  },
  {
    title: "Хочется выглядеть свежее, но естественно",
    text: "Без резких изменений, перегруженных объёмов и результата, который сразу выдаёт вмешательство.",
  },
  {
    title: "Не понимаете, нужна ли вам косметология вообще",
    text: "Можно прийти без готового решения. Иногда консультация нужна именно для того, чтобы понять, стоит ли что-то делать сейчас.",
  },
];

const approachPrinciples = [
  {
    title: "Диагностика",
    text: "Оценка кожи, тканей, анамнеза и противопоказаний.",
  },
  {
    title: "Обоснованный план",
    text: "Понятная последовательность без лишних вмешательств.",
  },
  {
    title: "Безопасность",
    text: "Результат не должен быть важнее здоровья и естественности.",
  },
];

const serviceGroups = [
  {
    title: "Качество и здоровье кожи",
    text: "Сухость, тусклый тон, неровный рельеф, воспаления, постакне и восстановление кожного барьера.",
    tags: [
      "Чистка",
      "Пилинги",
      "PRX",
      "Биоревитализация",
      "Мезотерапия",
      "Плазмотерапия",
    ],
  },
  {
    title: "Возрастные изменения и деликатная коррекция",
    text: "Мимические морщины, снижение тонуса, изменение овала, потеря плотности и гармония пропорций.",
    tags: [
      "Ботулинотерапия",
      "Контурная пластика",
      "Коллагеностимуляторы",
      "Коллагенотерапия",
    ],
  },
  {
    title: "Аппаратные методики и лазерная эпиляция",
    text: "Тонус кожи, плотность тканей, пигментация, возрастные изменения и нежелательные волосы.",
    tags: [
      "Ultraformer MPT",
      "Volnewmer",
      "Virtue RF",
      "Vivace RF",
      "Morpheus8",
      "Lumecca",
      "Soprano XL",
    ],
  },
];

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
      <section className="section leadHero">
        <Container>
          <div className="leadHero__card">
            <div className="leadHero__content">
              <div className="kicker leadHero__kicker">Наталия Шорина · врач-дерматокосметолог</div>

              <h1 className="leadHero__title">
                Выглядеть свежее.<br />Не выглядеть иначе
              </h1>

              <p className="leadHero__text">
                Деликатная косметология с сохранением ваших черт, мимики и
                индивидуальности. Без лишних процедур, одинаковых лиц и
                изменений ради трендов.
              </p>

              <div className="leadHero__actions">
                <Button onClick={() => window.open("https://t.me/dr_shorina", "_blank")}>
                  Записаться на консультацию
                </Button>

                <Button variant="ghost" onClick={() => window.open("https://t.me/dr_shorina", "_blank")}>
                  Рассказать о своём запросе
                </Button>
              </div>

              <div className="leadHero__proof">
                <span>10+ лет практики</span>
                <span>Только по показаниям</span>
                <span>Без лишних назначений</span>
              </div>
            </div>

            <div className="leadHero__media">
              <div className="leadHero__imageFrame">
                <picture>
                  <source media="(max-width: 700px)" srcSet="/doctor/doctor-photo.jpg" />
                  <img
                    src="/doctor/doctor-full.jpg"
                    alt="Наталия Шорина"
                    className="leadHero__image"
                    loading="eager"
                  />
                </picture>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section doctorBlock">
        <Container>
          <div className="doctorBlock__card">
            <div className="doctorBlock__photo">
              <div className="doctorBlock__imageFrame">
                <picture>
                  <source media="(max-width: 700px)" srcSet="/doctor/doctor-photo.jpg" />
                  <img
                    src="/doctor/doctor-full.jpg"
                    alt="Наталия Шорина"
                    className="doctorBlock__image"
                    loading="lazy"
                  />
                </picture>

                <div className="doctorBlock__caption">
                  <strong>Наталия Шорина</strong>
                  <span>Врач-дерматокосметолог</span>
                </div>
              </div>
            </div>

            <div className="doctorBlock__content">
              <div className="kicker doctorBlock__kicker">О враче</div>

              <h2 className="doctorBlock__title">
                Врач, который умеет сказать:<br />«Вам это не нужно»
              </h2>

              <p>
                Для меня косметология — это не поиск новых недостатков и не
                стремление изменить человека.
              </p>

              <p>
                Моя задача — понять, что действительно вас беспокоит, оценить
                состояние кожи и тканей и предложить решение, которое будет
                полезным, безопасным и обоснованным.
              </p>

              <p>
                Иногда это процедура.<br />
                Иногда — правильно подобранный домашний уход.<br />
                А иногда лучше ничего не менять.
              </p>

              <div className="doctorBlock__divider" />

              <p>
                <b>Не каждая консультация должна заканчиваться процедурой.</b>{" "}
                Но каждая должна заканчиваться пониманием, что делать дальше.
              </p>

              <div className="doctorFacts">
                {doctorFacts.map((item) => (
                  <article className="doctorFact" key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>

              <div className="doctorBlock__actions">
                <Link to="/about" className="btn btn--primary">
                  Подробнее о враче
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section requestSection">
        <Container>
          <div className="requestSection__card">
            <div className="sectionLabel">С чем можно обратиться</div>

            <div className="requestSection__head">
              <div>
                <h2 className="requestSection__title">
                  Приходите с запросом,<br />не с готовым решением
                </h2>
              </div>

              <p className="requestSection__text">
                Не нужно заранее знать названия процедур. Достаточно рассказать,
                что изменилось, что беспокоит и какого результата вы хотите
                избежать. На консультации врач разберётся в причинах и предложит
                только обоснованные решения.
              </p>
            </div>

            <div className="requestGrid">
              {requestCards.map((item, index) => (
                <article className="requestCard" key={item.title}>
                  <span>{index + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>

            <div className="requestSection__bottom">
              <Button onClick={() => window.open("https://t.me/dr_shorina", "_blank")}>
                Обсудить мой запрос с врачом
              </Button>

              <p>Консультация не обязывает проходить процедуру.</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="section approachSection">
        <Container>
          <div className="approachSection__card">
            <div className="sectionLabel">Подход</div>

            <div className="approachSection__top">
              <h2 className="approachSection__title">
                Сначала показания.<br />Потом процедура.
              </h2>

              <div className="approachSection__text">
                <p>
                  В эстетической медицине важно не просто выбрать метод, а понять,
                  зачем он нужен именно сейчас.
                </p>
                <p>
                  Каждое назначение должно быть объяснимым: что мы делаем, почему
                  выбираем этот способ, какого результата можем ожидать и какие
                  ограничения важно учесть.
                </p>
              </div>
            </div>

            <div className="approachPrinciples">
              {approachPrinciples.map((item) => (
                <article className="approachPrinciple" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="section serviceDirections">
        <Container>
          <div className="serviceDirections__card">
            <div className="sectionLabel">Направления</div>

            <div className="serviceDirections__head">
              <h2 className="serviceDirections__title">
                Направления,<br />с которыми работает врач
              </h2>

              <p>
                Врач работает с кожей, возрастными изменениями, эстетической
                коррекцией, аппаратными и лазерными методиками. Все направления
                объединяет бережный подход: без перегруженного результата и
                назначений «на всякий случай».
              </p>
            </div>

            <div className="serviceDirections__grid">
              {serviceGroups.map((group) => (
                <article className="serviceDirection" key={group.title}>
                  <h3>{group.title}</h3>
                  <p>{group.text}</p>

                  <div className="serviceDirection__tags">
                    {group.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <div className="serviceDirections__actions">
              <Button onClick={() => location.assign("/services")}>
                Смотреть все услуги
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="section__head section__head--row">
            <div>
              <h2 className="h2">До / После</h2>
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
          <div className="section__head section__head--row">
            <div>
              <h2 className="h2">Статьи</h2>
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
              const excerpt =
                article.excerpt || article.announcement || article.description;
              const image = article.image || article.preview || article.images?.[0];

              return (
                <article className="articleCard" key={article.id}>
                  <Link
                    to={`/articles/${article.slug}`}
                    className="articleCard__imageWrap"
                  >
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
                      <Link to={`/articles/${article.slug}`}>
                        {title}
                      </Link>
                    </h3>

                    {excerpt && (
                      <p className="articleCard__excerpt">
                        {excerpt}
                      </p>
                    )}

                    <Link
                      to={`/articles/${article.slug}`}
                      className="articleCard__link"
                    >
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
              <h2 className="h2">Записаться на консультацию</h2>
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
