import { useEffect, useState, useRef } from "react";
import Container from "../shared/ui/Container.jsx";
import Button from "../shared/ui/Button.jsx";
import reviews from "../data/reviews.json";
import beforeAfter from "../data/beforeAfter.json";
import { Link } from "react-router-dom";
import articles from "../data/articles.json";
import "../styles/homeSections.css";

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
  { title: "Врач-дерматокосметолог", text: "Более 10 лет практики в эстетической медицине" },
  { title: "Тренер для врачей-косметологов", text: "По аппаратным и инъекционным методикам" },
  { title: "Международный спикер", text: "Участник и эксперт профессиональных конгрессов" },
  { title: "Автор экспертных публикаций", text: "Материалы о здоровье кожи и современной косметологии" },
];

const requestCards = [
  { title: "Лицо выглядит уставшим, хотя вы высыпаетесь", text: "Кожа кажется тусклой, появляются отёки или ощущение, что лицу не хватает свежести даже после отдыха." },
  { title: "Кожа стала сухой, тусклой или неровной", text: "Обычный уход больше не даёт прежнего эффекта, тон стал менее ровным, а кожа выглядит менее плотной и спокойной." },
  { title: "Беспокоят высыпания или следы постакне", text: "Важно не просто убрать проявления, а понять причину и подобрать бережную тактику восстановления кожи." },
  { title: "Изменился овал лица", text: "Появилась мягкость тканей, отёчность или ощущение, что лицо стало выглядеть иначе, чем раньше." },
  { title: "Хочется выглядеть свежее, но естественно", text: "Без резких изменений, перегруженных объёмов и результата, который сразу выдаёт вмешательство." },
  { title: "Не понимаете, нужна ли вам косметология вообще", text: "Можно прийти без готового решения. Иногда консультация нужна именно для того, чтобы понять, стоит ли что-то делать сейчас." },
];

const approachPrinciples = [
  { title: "Диагностика", text: "Оценка кожи, тканей, анамнеза и противопоказаний." },
  { title: "Обоснованный план", text: "Понятная последовательность без лишних вмешательств." },
  { title: "Безопасность", text: "Результат не должен быть важнее здоровья и естественности." },
];

const serviceGroups = [
  {
    title: "Качество и здоровье кожи",
    text: "Сухость, тусклый тон, неровный рельеф, воспаления, постакне и восстановление кожного барьера.",
    tags: ["Чистка", "Пилинги", "PRX", "Биоревитализация", "Мезотерапия", "Плазмотерапия"],
  },
  {
    title: "Возрастные изменения и деликатная коррекция",
    text: "Мимические морщины, снижение тонуса, изменение овала, потеря плотности и гармония пропорций.",
    tags: ["Ботулинотерапия", "Контурная пластика", "Коллагеностимуляторы", "Коллагенотерапия"],
  },
  {
    title: "Аппаратные методики и лазерная эпиляция",
    text: "Тонус кожи, плотность тканей, пигментация, возрастные изменения и нежелательные волосы.",
    tags: ["Ultraformer MPT", "Volnewmer", "Virtue RF", "Vivace RF", "Morpheus8", "Lumecca", "Soprano XL"],
  },
];

const categoryDescriptions = {
  "Эстетическая косметология": "Качество кожи, свежесть лица и естественный результат без резких изменений.",
  "Эстетическая коррекция": "Качество кожи, свежесть лица и естественный результат без резких изменений.",
  "Инъекционные методики": "Коррекция мимики, качества кожи и пропорций — только там, где это действительно уместно.",
  "Аппаратные методики": "Тонус, плотность кожи, пигментация и возрастные изменения — без резкой смены внешности.",
  "RF-лифтинг": "Плотность, тонус и текстура кожи без изменения черт лица.",
  "SMAS-лифтинг": "Поддержка овала и тонуса тканей без добавления объёма.",
  "PRX": "Тон, рельеф и свежесть кожи без агрессивного воздействия.",
  "Пилинги": "Обновление кожи, выравнивание тона и рельефа по показаниям.",
  "Лечение кожи": "Воспаления, постакне и восстановление кожи без агрессивных решений наугад.",
  "Коррекция тела": "Качество кожи и тонус тканей в зонах, где нужна деликатная коррекция.",
};

const consultationBenefits = [
  { icon: "✓", title: "Только по показаниям" },
  { icon: "?", title: "Подробные объяснения и честные рекомендации" },
  { icon: "•", title: "Индивидуальный подход к вашей коже и задачам" },
];

export default function Home() {
  const [isCertificatesOpen, setIsCertificatesOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const featuredReviews = reviews.filter((review) => review.featured).slice(0, 2);
  const featuredArticles = articles.slice(0, 3);

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

  const [activeWorkCategory, setActiveWorkCategory] = useState(workCategories[0]);

  const filteredWorkImages = beforeAfter
    .filter((item) => item.category === activeWorkCategory)
    .flatMap((item) =>
      item.images.map((image, index) => ({ id: `${item.id}-${index}`, category: item.category, image }))
    );

  const worksCarouselRef = useRef(null);
  const shouldShowWorkArrows = filteredWorkImages.length > 1;

  const getCategoryTitle = (category) =>
    category === "Эстетическая коррекция" ? "Эстетическая косметология" : category;

  const scrollWorks = (direction) => {
    if (!worksCarouselRef.current) return;
    worksCarouselRef.current.scrollBy({ left: direction === "next" ? 340 : -340, behavior: "smooth" });
  };

  useEffect(() => {
    const isLocked = isCertificatesOpen || !!selectedCertificate;
    document.body.style.overflow = isLocked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCertificatesOpen, selectedCertificate]);

  useEffect(() => {
    worksCarouselRef.current?.scrollTo({ left: 0, behavior: "smooth" });
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
              <h1 className="leadHero__title">Выглядеть свежее.<br />Не выглядеть иначе</h1>
              <p className="leadHero__text">Деликатная косметология с сохранением ваших черт, мимики и индивидуальности. Без лишних процедур, одинаковых лиц и изменений ради трендов.</p>
              <div className="leadHero__actions">
                <Button onClick={() => window.open("https://t.me/dr_shorina", "_blank")}>Записаться на консультацию</Button>
                <Button variant="ghost" onClick={() => window.open("https://t.me/dr_shorina", "_blank")}>Рассказать о своём запросе</Button>
              </div>
              <div className="leadHero__proof"><span>10+ лет практики</span><span>Только по показаниям</span><span>Без лишних назначений</span></div>
            </div>
            <div className="leadHero__media">
              <div className="leadHero__imageFrame leadHero__placeholderImage" aria-label="Будущее фото врача" />
            </div>
          </div>
        </Container>
      </section>

      <section className="section doctorBlock aboutHero aboutDoctor">
        <Container>
          <div className="doctorBlock__card">
            <div className="doctorBlock__photo">
              <div className="doctorBlock__imageFrame">
                <picture><source media="(max-width: 700px)" srcSet="/doctor/doctor-photo.jpg" /><img src="/doctor/doctor-full.jpg" alt="Наталия Шорина" className="doctorBlock__image" loading="lazy" /></picture>
                <div className="doctorBlock__caption"><strong>Наталия Шорина</strong><span>Врач-дерматокосметолог</span></div>
              </div>
            </div>
            <div className="doctorBlock__content">
              <div className="kicker doctorBlock__kicker">О враче</div>
              <h2 className="doctorBlock__title">Врач, который умеет сказать:<br />«Вам это не нужно»</h2>
              <p>Для меня косметология — это не поиск новых недостатков и не стремление изменить человека.</p>
              <p>Моя задача — понять, что действительно вас беспокоит, оценить состояние кожи и тканей и предложить решение, которое будет полезным, безопасным и обоснованным.</p>
              <div className="doctorAccent">Иногда это процедура.<br />Иногда — правильно подобранный домашний уход.<br />А иногда лучше ничего не менять.</div>
              <div className="doctorBlock__divider" />
              <p><b>Не каждая консультация должна заканчиваться процедурой.</b> Но каждая должна заканчиваться пониманием, что делать дальше.</p>
              <div className="doctorFacts">{doctorFacts.map((item) => <article className="doctorFact" key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section requestSection">
        <Container>
          <div className="requestSection__card">
            <div className="sectionLabel">С чем можно обратиться</div>
            <div className="requestSection__head">
              <h2 className="requestSection__title">Приходите с запросом,<br />не с готовым решением</h2>
              <p className="requestSection__text">Не нужно заранее знать названия процедур. Достаточно рассказать, что изменилось, что беспокоит и какого результата вы хотите избежать. На консультации врач разберётся в причинах и предложит только обоснованные решения.</p>
            </div>
            <div className="requestGrid">{requestCards.map((item, index) => <article className="requestCard" key={item.title}><span>{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
            <div className="requestSection__bottom"><Button onClick={() => window.open("https://t.me/dr_shorina", "_blank")}>Обсудить мой запрос с врачом</Button><p>Консультация не обязывает проходить процедуру.</p></div>
          </div>
        </Container>
      </section>

      <section className="section approachSection">
        <Container>
          <div className="approachSection__card">
            <div className="sectionLabel">Подход</div>
            <div className="approachSection__top"><h2 className="approachSection__title">Сначала показания.<br />Потом процедура.</h2><div className="approachSection__text"><p>В эстетической медицине важно не просто выбрать метод, а понять, зачем он нужен именно сейчас.</p><p>Каждое назначение должно быть объяснимым: что мы делаем, почему выбираем этот способ, какого результата можем ожидать и какие ограничения важно учесть.</p></div></div>
            <div className="approachPrinciples">{approachPrinciples.map((item) => <article className="approachPrinciple" key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
          </div>
        </Container>
      </section>

      <section className="section serviceDirections">
        <Container>
          <div className="serviceDirections__card">
            <div className="sectionLabel">Направления</div>
            <div className="serviceDirections__head"><h2 className="serviceDirections__title">Направления,<br />с которыми работает врач</h2><p>Врач работает с кожей, возрастными изменениями, эстетической коррекцией, аппаратными и лазерными методиками. Все направления объединяет бережный подход: без перегруженного результата и назначений «на всякий случай».</p></div>
            <div className="serviceDirections__grid">{serviceGroups.map((group) => <article className="serviceDirection" key={group.title}><h3>{group.title}</h3><p>{group.text}</p><div className="serviceDirection__tags">{group.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></article>)}</div>
            <div className="serviceDirections__actions"><Button onClick={() => location.assign("/services")}>Смотреть все услуги</Button></div>
          </div>
        </Container>
      </section>

      <section className="section resultsSection">
        <Container>
          <div className="resultsSection__card">
            <div className="sectionLabel">Результаты</div>
            <div className="resultsSection__head"><div><h2 className="resultsSection__title">Результаты, которые<br />не спорят с внешностью</h2><p>В хорошей косметологии важны не резкие перемены, а точные изменения: свежее лицо, более ровная кожа, мягкая коррекция и сохранение естественных черт.</p></div>{shouldShowWorkArrows && <div className="carouselControls"><button type="button" className="carouselArrow" onClick={() => scrollWorks("prev")} aria-label="Предыдущие работы">←</button><button type="button" className="carouselArrow" onClick={() => scrollWorks("next")} aria-label="Следующие работы">→</button></div>}</div>
            <div className="worksTabs" aria-label="Категории работ">{workCategories.map((category) => <button key={category} type="button" className={activeWorkCategory === category ? "worksTab worksTab--active" : "worksTab"} onClick={() => setActiveWorkCategory(category)}>{getCategoryTitle(category)}</button>)}</div>
            <div className="activeResultInfo"><span className="activeResultInfo__icon">✦</span><div><h3>{getCategoryTitle(activeWorkCategory)}</h3><p>{categoryDescriptions[activeWorkCategory]}</p></div></div>
            <div className="worksCarousel" ref={worksCarouselRef}>{filteredWorkImages.map((item) => <article className="workCard" key={item.id}><div className="workCard__imageWrap"><img src={item.image} alt={item.category} className="workCard__image" loading="lazy" /></div><div className="workCard__body"><span className="pill">{getCategoryTitle(item.category)}</span></div></article>)}</div>
          </div>
        </Container>
      </section>

      <section className="section reviewsFeature section--alt">
        <Container>
          <div className="featureSplitCard reviewsFeature__card">
            <div className="featureSplitCard__copy"><div className="sectionLabel">Отзывы</div><h2>После приёма должно становиться спокойнее</h2><p>В отзывах пациенты часто говорят не только о результате, но и о самом ощущении приёма: врач внимательно слушает, подробно объясняет и не торопит с решением.</p><p>Для меня это важная часть работы — чтобы человек понимал, что происходит с кожей, зачем нужна рекомендация и почему иногда лучше не делать лишнего.</p><Button variant="ghost" onClick={() => location.assign("/reviews")}>Все отзывы</Button></div>
            <div className="reviewsFeature__list">{featuredReviews.map((review) => <article className="reviewFeatureCard" key={review.id}><div className="reviewFeatureCard__head"><div className="reviewFeatureCard__avatar">{review.name?.[0] || "П"}</div><div><h3>{review.name}</h3><span>{review.source} · {"★".repeat(review.rating)}</span></div></div><p>“{review.text}”</p></article>)}</div>
          </div>
        </Container>
      </section>

      <section className="section articlesFeature">
        <Container>
          <div className="featureSplitCard articlesFeature__card">
            <div className="featureSplitCard__copy"><div className="sectionLabel">Статьи</div><h2>Авторские публикации</h2><p>О коже, возрастных изменениях, современных методиках и принципах, которые помогают принимать взвешенные решения.</p><Link to="/articles" className="btn btn--ghost">Все публикации</Link></div>
            <div className="articlesFeature__list">{featuredArticles.map((article) => { const title = article.title || article.heading || article.name; const excerpt = article.excerpt || article.announcement || article.description; const image = article.image || article.preview || article.images?.[0]; return <article className="articleFeatureCard" key={article.id}><Link to={`/articles/${article.slug}`} className="articleFeatureCard__image"><img src={image} alt={title} loading="lazy" /></Link><div><span>{article.category}</span><h3><Link to={`/articles/${article.slug}`}>{title}</Link></h3>{excerpt && <p>{excerpt}</p>}<Link to={`/articles/${article.slug}`} className="articleFeatureCard__link">Читать статью →</Link></div></article>; })}</div>
          </div>
        </Container>
      </section>

      <section className="section consultationCta section--alt">
        <Container>
          <div className="consultationCta__card">
            <div className="consultationCta__content"><div className="sectionLabel">Консультация</div><h2>Не обязательно знать,<br />какая процедура вам нужна</h2><p>Достаточно рассказать, что вас беспокоит. На консультации разберёмся, какие изменения связаны с состоянием кожи, какие можно скорректировать и какие решения будут действительно уместны.</p><div className="consultationCta__actions"><Button onClick={() => window.open("https://t.me/dr_shorina", "_blank")}>Записаться на консультацию</Button><Button variant="ghost" onClick={() => window.open("https://t.me/dr_shorina", "_blank")}>Рассказать о своём запросе</Button></div><div className="consultationBenefits">{consultationBenefits.map((item) => <div className="consultationBenefit" key={item.title}><span>{item.icon}</span><p>{item.title}</p></div>)}</div></div>
            <div className="consultationCta__media"><div className="consultationCta__imagePlaceholder" /></div>
          </div>
        </Container>
      </section>

      <section className="section documentsSection">
        <Container>
          <div className="documentsSection__head"><div className="sectionLabel">Квалификация</div><h2>Образование и квалификация</h2><p>Профессиональная подготовка, дополнительное образование и документы, подтверждающие квалификацию специалиста.</p></div>
          <div className="certGrid certGrid--preview documentsSection__grid">{certificates.slice(0, 4).map((item) => <button key={item.src} type="button" className="certCard" onClick={() => openCertificateViewer(item)}><div className="certCard__imageWrap"><img src={item.src} alt={item.title} className="certCard__image" loading="lazy" /></div><div className="certCard__body"><span className="certCard__title">{item.title}</span></div></button>)}</div>
          <div className="certActions"><Button variant="ghost" onClick={() => setIsCertificatesOpen(true)}>Смотреть все документы</Button></div>
        </Container>
      </section>

      {isCertificatesOpen && <div className="certModalOverlay" onClick={() => setIsCertificatesOpen(false)} role="presentation"><div className="certModal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Дипломы и сертификаты"><div className="certModal__header"><div><div className="kicker" style={{ color: "var(--muted)" }}>Квалификация</div><h3 className="h3" style={{ marginTop: 6 }}>Дипломы и сертификаты</h3></div><button type="button" className="certModal__close" onClick={() => setIsCertificatesOpen(false)} aria-label="Закрыть">×</button></div><div className="certGrid">{certificates.map((item) => <button key={item.src} type="button" className="certCard" onClick={() => openCertificateViewer(item)}><div className="certCard__imageWrap"><img src={item.src} alt={item.title} className="certCard__image" loading="lazy" /></div><div className="certCard__body"><span className="certCard__title">{item.title}</span></div></button>)}</div></div></div>}

      {selectedCertificate && <div className="certViewerOverlay" onClick={() => setSelectedCertificate(null)} role="presentation"><div className="certViewer" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={selectedCertificate.title}><button type="button" className="certViewer__close" onClick={() => setSelectedCertificate(null)} aria-label="Закрыть">×</button><img src={selectedCertificate.src} alt={selectedCertificate.title} className="certViewer__image" /><div className="certViewer__caption">{selectedCertificate.title}</div></div></div>}
    </>
  );
}
