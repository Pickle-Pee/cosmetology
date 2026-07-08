import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../shared/ui/Container.jsx";
import Button from "../shared/ui/Button.jsx";
import reviews from "../data/reviews.json";
import beforeAfter from "../data/beforeAfter.json";
import { Link } from "react-router-dom";
import articles from "../data/articles.json";
import {
  buttonHover,
  buttonTap,
  cardHover,
  fadeUp,
  softFade,
  stagger,
  viewport,
} from "../shared/motion.js";
import "../styles/homeSections.css";
import "../styles/homeFixes.css";
import "../styles/homeLayoutPolish.css";
import "../styles/homeTraining.css";

const certificates = [
  { src: "/certificates/cert-1.jpg", title: "Диплом" },
  { src: "/certificates/cert-2.jpg", title: "Диплом" },
  { src: "/certificates/cert-3.jpg", title: "Сертификат" },
  { src: "/certificates/cert-4.jpg", title: "Диплом" },
  { src: "/certificates/cert-5.jpg", title: "Удостоверение" },
  { src: "/certificates/cert-6.jpg", title: "Удостоверение" },
  { src: "/certificates/cert-7.jpg", title: "Сертификат" },
  { src: "/certificates/cert-8.jpg", title: "Сертификат" },
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
  { icon: "check", title: "Только по показаниям" },
  { icon: "message", title: "Подробные объяснения и честные рекомендации" },
  { icon: "person", title: "Индивидуальный подход к вашей коже и задачам" },
];

const trainingItems = [
  { icon: "method", text: "Аппаратные и инъекционные методики" },
  { icon: "diagnostic", text: "Разбор показаний и противопоказаний" },
  { icon: "protocol", text: "Практические протоколы" },
  { icon: "natural", text: "Работа с естественным результатом" },
  { icon: "safety", text: "Безопасность и врачебное мышление" },
];

function RevealSection({ className, children }) {
  return (
    <motion.section
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={fadeUp}
    >
      {children}
    </motion.section>
  );
}

function MotionButtonWrap({ children }) {
  return (
    <motion.div whileHover={buttonHover} whileTap={buttonTap}>
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [isCertificatesOpen, setIsCertificatesOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const featuredReviews = reviews.filter((review) => review.featured).slice(0, 3);
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
      <motion.section className="section leadHero" initial="hidden" animate="visible" variants={stagger}>
        <Container>
          <div className="leadHero__card">
            <motion.div className="leadHero__content" variants={stagger}>
              <motion.div className="kicker leadHero__kicker" variants={fadeUp}>Наталия Шорина · врач-дерматокосметолог</motion.div>
              <motion.h1 className="leadHero__title" variants={fadeUp}>Выглядеть свежее.<br />Не выглядеть иначе</motion.h1>
              <motion.p className="leadHero__text" variants={fadeUp}>Деликатная косметология с сохранением ваших черт, мимики и индивидуальности. Без лишних процедур, одинаковых лиц и изменений ради трендов.</motion.p>
              <motion.div className="leadHero__actions" variants={fadeUp}>
                <MotionButtonWrap><Button onClick={() => window.open("https://t.me/dr_shorina", "_blank")}>Записаться на консультацию</Button></MotionButtonWrap>
                <MotionButtonWrap><Button variant="ghost" onClick={() => window.open("https://t.me/dr_shorina", "_blank")}>Рассказать о своём запросе</Button></MotionButtonWrap>
              </motion.div>
              <motion.div className="leadHero__proof" variants={stagger}>
                {["10+ лет практики", "Только по показаниям", "Без лишних назначений"].map((item) => (
                  <motion.span key={item} variants={fadeUp}>{item}</motion.span>
                ))}
              </motion.div>
            </motion.div>
            <motion.div className="leadHero__media" variants={softFade}>
              <div className="leadHero__imageFrame">
                <img src="/bg_leadhero_section.png" alt="" className="leadHero__image" loading="eager" />
              </div>
            </motion.div>
          </div>
        </Container>
      </motion.section>

      <RevealSection className="section doctorBlock aboutHero aboutDoctor">
        <Container>
          <div className="doctorBlock__card">
            <motion.div className="doctorBlock__photo" variants={softFade}>
              <div className="doctorBlock__imageFrame">
                <picture><source media="(max-width: 700px)" srcSet="/doctor/doctor-photo.jpg" /><img src="/doctor/doctor-full.jpg" alt="Наталия Шорина" className="doctorBlock__image" loading="lazy" /></picture>
                <div className="doctorBlock__caption"><strong>Наталия Шорина</strong><span>Врач-дерматокосметолог</span></div>
              </div>
            </motion.div>
            <motion.div className="doctorBlock__content" variants={stagger}>
              <motion.div className="kicker doctorBlock__kicker" variants={fadeUp}>О враче</motion.div>
              <motion.h2 className="doctorBlock__title" variants={fadeUp}>Я умею сказать:<br />«Вам это не нужно»</motion.h2>
              <motion.p variants={fadeUp}>Для меня косметология — это не поиск новых недостатков и не стремление изменить человека.</motion.p>
              <motion.div className="doctorAccent" variants={fadeUp}>Моя задача — понять, что действительно вас беспокоит, оценить состояние кожи и тканей и предложить решение, которое будет полезным, безопасным и обоснованным.</motion.div>
              <motion.p variants={fadeUp}>Иногда это процедура.<br />Иногда — правильно подобранный домашний уход.<br />А иногда лучше ничего не менять.</motion.p>
              <motion.div className="doctorBlock__divider" variants={fadeUp} />
              <motion.p variants={fadeUp}><b>Не каждая консультация должна заканчиваться процедурой.</b> Но каждая должна заканчиваться пониманием, что делать дальше.</motion.p>
              <motion.div className="doctorFacts" variants={stagger}>{doctorFacts.map((item) => <motion.article className="doctorFact" key={item.title} variants={fadeUp} whileHover={cardHover}><h3>{item.title}</h3><p>{item.text}</p></motion.article>)}</motion.div>
              <motion.div className="doctorBlock__actions" variants={fadeUp}><MotionButtonWrap><Link to="/about" className="btn btn--ghost">Подробнее о враче</Link></MotionButtonWrap></motion.div>
            </motion.div>
          </div>
        </Container>
      </RevealSection>

      <RevealSection className="section trainingSection">
        <Container>
          <div className="trainingSection__card">
            <motion.div className="trainingSection__content" variants={stagger}>
              <motion.div className="sectionLabel" variants={fadeUp}>Для врачей</motion.div>
              <motion.h2 className="trainingSection__title" variants={fadeUp}>Обучение врачей-косметологов</motion.h2>
              <motion.p variants={fadeUp}>Я провожу практические семинары и мастер-классы по аппаратным и инъекционным методикам для врачей-косметологов.</motion.p>
              <motion.p variants={fadeUp}>В основе обучения — не только техника процедуры, но и клиническая логика: показания, безопасность, ограничения, работа с ожиданиями пациента и естественный результат.</motion.p>
              <motion.div className="trainingFeatures" variants={stagger}>
                {trainingItems.map((item) => (
                  <motion.div className="trainingFeature" key={item.text} variants={fadeUp}>
                    <span className={`trainingFeature__icon trainingFeature__icon--${item.icon}`} aria-hidden="true" />
                    <span>{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>
              <motion.div variants={fadeUp}><MotionButtonWrap><Link to="/training" className="btn btn--primary">Подробнее об обучении</Link></MotionButtonWrap></motion.div>
            </motion.div>
            <motion.div className="trainingSection__media" variants={softFade}>
              <img src="/training_bg.png" alt="Обучение врачей-косметологов" className="trainingSection__image" loading="lazy" />
            </motion.div>
          </div>
        </Container>
      </RevealSection>

      <RevealSection className="section requestSection">
        <Container>
          <div className="requestSection__card">
            <div className="sectionLabel">С чем можно обратиться</div>
            <div className="requestSection__head">
              <h2 className="requestSection__title">Приходите с запросом,<br />не с готовым решением</h2>
              <p className="requestSection__text">Не нужно заранее знать названия процедур. Достаточно рассказать, что изменилось, что беспокоит и какого результата вы хотите избежать. На консультации я разберусь в причинах и предложу только обоснованные решения.</p>
            </div>
            <motion.div className="requestGrid" variants={stagger}>{requestCards.map((item, index) => <motion.article className="requestCard" key={item.title} variants={fadeUp} whileHover={cardHover}><span>{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></motion.article>)}</motion.div>
            <motion.div className="requestSection__bottom" variants={fadeUp}><MotionButtonWrap><Button onClick={() => window.open("https://t.me/dr_shorina", "_blank")}>Обсудить мой запрос с врачом</Button></MotionButtonWrap><p>Консультация не обязывает проходить процедуру.</p></motion.div>
          </div>
        </Container>
      </RevealSection>

      <RevealSection className="section approachSection">
        <Container>
          <div className="approachSection__card">
            <div className="sectionLabel">Подход</div>
            <div className="approachSection__top"><h2 className="approachSection__title">Сначала показания.<br />Потом процедура</h2><div className="approachSection__text"><p>В эстетической медицине важно не просто выбрать метод, а понять, зачем он нужен именно сейчас.</p><p>Каждое назначение должно быть объяснимым: что я делаю, почему выбираю этот способ, какого результата можно ожидать и какие ограничения важно учесть.</p></div></div>
            <motion.div className="approachPrinciples" variants={stagger}>{approachPrinciples.map((item) => <motion.article className="approachPrinciple" key={item.title} variants={fadeUp}><h3>{item.title}</h3><p>{item.text}</p></motion.article>)}</motion.div>
          </div>
        </Container>
      </RevealSection>

      <RevealSection className="section serviceDirections">
        <Container>
          <div className="serviceDirections__card">
            <div className="sectionLabel">Направления</div>
            <div className="serviceDirections__head"><h2 className="serviceDirections__title">Направления,<br />с которыми я работаю</h2><p>Я работаю с кожей, возрастными изменениями, эстетической коррекцией, аппаратными и лазерными методиками. Все направления объединяет бережный подход: без перегруженного результата и назначений «на всякий случай».</p></div>
            <motion.div className="serviceDirections__grid" variants={stagger}>{serviceGroups.map((group) => <motion.article className="serviceDirection" key={group.title} variants={fadeUp} whileHover={cardHover}><h3>{group.title}</h3><p>{group.text}</p><div className="serviceDirection__tags">{group.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></motion.article>)}</motion.div>
            <motion.div className="serviceDirections__actions" variants={fadeUp}><MotionButtonWrap><Button onClick={() => location.assign("/services")}>Смотреть все услуги</Button></MotionButtonWrap></motion.div>
          </div>
        </Container>
      </RevealSection>

      <RevealSection className="section resultsSection">
        <Container>
          <div className="resultsSection__card">
            <div className="sectionLabel">Результаты</div>
            <div className="resultsSection__head"><h2 className="resultsSection__title">Результаты, которые<br />не спорят с внешностью</h2><p>В хорошей косметологии важны не резкие перемены, а точные изменения: свежее лицо, более ровная кожа, мягкая коррекция и сохранение естественных черт.</p></div>
            <div className="worksTabs" aria-label="Категории работ">{workCategories.map((category) => <motion.button layout key={category} type="button" className={activeWorkCategory === category ? "worksTab worksTab--active" : "worksTab"} onClick={() => setActiveWorkCategory(category)} whileHover={buttonHover} whileTap={buttonTap}>{getCategoryTitle(category)}</motion.button>)}</div>
            <AnimatePresence mode="wait">
              <motion.div className="activeResultInfo" key={activeWorkCategory} initial="hidden" animate="visible" exit="hidden" variants={fadeUp}><span className="activeResultInfo__icon">✦</span><div className="activeResultInfo__content"><h3>{getCategoryTitle(activeWorkCategory)}</h3><p>{categoryDescriptions[activeWorkCategory]}</p></div>{shouldShowWorkArrows && <div className="carouselControls activeResultInfo__controls"><button type="button" className="carouselArrow" onClick={() => scrollWorks("prev")} aria-label="Предыдущие работы">←</button><button type="button" className="carouselArrow" onClick={() => scrollWorks("next")} aria-label="Следующие работы">→</button></div>}</motion.div>
            </AnimatePresence>
            <motion.div className="worksCarousel" ref={worksCarouselRef} variants={stagger}>{filteredWorkImages.map((item) => <motion.article className="workCard" key={item.id} variants={fadeUp} whileHover={cardHover}><div className="workCard__imageWrap"><img src={item.image} alt={item.category} className="workCard__image" loading="lazy" /></div><div className="workCard__body"><span className="pill">{getCategoryTitle(item.category)}</span></div></motion.article>)}</motion.div>
          </div>
        </Container>
      </RevealSection>

      <RevealSection className="section reviewsFeature section--alt">
        <Container>
          <div className="featureSplitCard reviewsFeature__card">
            <motion.div className="featureSplitCard__copy" variants={stagger}><motion.div className="sectionLabel" variants={fadeUp}>Отзывы</motion.div><motion.h2 variants={fadeUp}>После приёма должно становиться спокойнее</motion.h2><motion.p variants={fadeUp}>В отзывах пациенты часто говорят не только о результате, но и о самом ощущении приёма: я внимательно слушаю, подробно объясняю и не тороплю с решением.</motion.p><motion.p variants={fadeUp}>Для меня это важная часть работы — чтобы человек понимал, что происходит с кожей, зачем нужна рекомендация и почему иногда лучше не делать лишнего.</motion.p><MotionButtonWrap><Button variant="ghost" onClick={() => location.assign("/reviews")}>Все отзывы</Button></MotionButtonWrap></motion.div>
            <motion.div className="reviewsFeature__list" variants={stagger}>{featuredReviews.map((review) => <motion.article className="reviewFeatureCard" key={review.id} variants={fadeUp} whileHover={cardHover}><div className="reviewFeatureCard__head"><div className="reviewFeatureCard__avatar">{review.name?.[0] || "П"}</div><div><h3>{review.name}</h3><span>{review.source} · {"★".repeat(review.rating)}</span></div></div><p>“{review.text}”</p></motion.article>)}</motion.div>
          </div>
        </Container>
      </RevealSection>

      <RevealSection className="section articlesFeature">
        <Container>
          <div className="featureSplitCard articlesFeature__card">
            <motion.div className="featureSplitCard__copy" variants={stagger}><motion.div className="sectionLabel" variants={fadeUp}>Статьи</motion.div><motion.h2 variants={fadeUp}>Мои публикации</motion.h2><motion.p variants={fadeUp}>О коже, возрастных изменениях, современных методиках и принципах, которые помогают принимать взвешенные решения.</motion.p><motion.div variants={fadeUp}><Link to="/articles" className="btn btn--ghost">Все публикации</Link></motion.div></motion.div>
            <motion.div className="articlesFeature__list" variants={stagger}>{featuredArticles.map((article) => { const title = article.title || article.heading || article.name; const excerpt = article.excerpt || article.announcement || article.description; const image = article.image || article.preview || article.images?.[0]; return <motion.article className="articleFeatureCard" key={article.id} variants={fadeUp} whileHover={cardHover}><Link to={`/articles/${article.slug}`} className="articleFeatureCard__image"><img src={image} alt={title} loading="lazy" /></Link><div><span>{article.category}</span><h3><Link to={`/articles/${article.slug}`}>{title}</Link></h3>{excerpt && <p>{excerpt}</p>}<Link to={`/articles/${article.slug}`} className="articleFeatureCard__link">Читать статью →</Link></div></motion.article>; })}</motion.div>
          </div>
        </Container>
      </RevealSection>

      <RevealSection className="section consultationCta section--alt">
        <Container>
          <div className="consultationCta__card">
            <motion.div className="consultationCta__content" variants={stagger}><motion.div className="sectionLabel" variants={fadeUp}>Консультация</motion.div><motion.h2 variants={fadeUp}>Не обязательно знать,<br />какая процедура вам нужна</motion.h2><motion.p variants={fadeUp}>Достаточно рассказать мне, что вас беспокоит. На консультации разберёмся, какие изменения связаны с состоянием кожи, какие можно скорректировать и какие решения будут действительно уместны.</motion.p><motion.div className="consultationCta__actions" variants={fadeUp}><MotionButtonWrap><Button onClick={() => window.open("https://t.me/dr_shorina", "_blank")}>Записаться на консультацию</Button></MotionButtonWrap><MotionButtonWrap><Button variant="ghost" onClick={() => window.open("https://t.me/dr_shorina", "_blank")}>Рассказать о своём запросе</Button></MotionButtonWrap></motion.div><motion.div className="consultationBenefits" variants={stagger}>{consultationBenefits.map((item) => <motion.div className="consultationBenefit" key={item.title} variants={fadeUp}><span className={`consultationBenefit__icon consultationBenefit__icon--${item.icon}`} aria-hidden="true" /><p>{item.title}</p></motion.div>)}</motion.div></motion.div>
            <motion.div className="consultationCta__media" variants={softFade}><div className="consultationCta__imagePlaceholder"><img src="/bg_consultation_section.png" alt="" className="consultationCta__image" loading="lazy" /></div></motion.div>
          </div>
        </Container>
      </RevealSection>

      <RevealSection className="section documentsSection">
        <Container>
          <div className="documentsSection__head"><div className="sectionLabel">Квалификация</div><h2>Образование и квалификация</h2><p>Профессиональная подготовка, дополнительное образование и документы, подтверждающие мою квалификацию.</p></div>
          <motion.div className="certGrid certGrid--preview documentsSection__grid" variants={stagger}>{certificates.slice(0, 4).map((item) => <motion.button key={item.src} type="button" className="certCard" onClick={() => openCertificateViewer(item)} variants={fadeUp} whileHover={cardHover}><div className="certCard__imageWrap"><img src={item.src} alt={item.title} className="certCard__image" loading="lazy" /></div><div className="certCard__body"><span className="certCard__title">{item.title}</span></div></motion.button>)}</motion.div>
          <motion.div className="certActions" variants={fadeUp}><MotionButtonWrap><Button variant="ghost" onClick={() => setIsCertificatesOpen(true)}>Смотреть все документы</Button></MotionButtonWrap></motion.div>
        </Container>
      </RevealSection>

      {isCertificatesOpen && <div className="certModalOverlay" onClick={() => setIsCertificatesOpen(false)} role="presentation"><div className="certModal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Дипломы и сертификаты"><div className="certModal__header"><div><div className="kicker" style={{ color: "var(--muted)" }}>Квалификация</div><h3 className="h3" style={{ marginTop: 6 }}>Дипломы и сертификаты</h3></div><button type="button" className="certModal__close" onClick={() => setIsCertificatesOpen(false)} aria-label="Закрыть">×</button></div><div className="certGrid">{certificates.map((item) => <button key={item.src} type="button" className="certCard" onClick={() => openCertificateViewer(item)}><div className="certCard__imageWrap"><img src={item.src} alt={item.title} className="certCard__image" loading="lazy" /></div><div className="certCard__body"><span className="certCard__title">{item.title}</span></div></button>)}</div></div></div>}

      {selectedCertificate && <div className="certViewerOverlay" onClick={() => setSelectedCertificate(null)} role="presentation"><div className="certViewer" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={selectedCertificate.title}><button type="button" className="certViewer__close" onClick={() => setSelectedCertificate(null)} aria-label="Закрыть">×</button><img src={selectedCertificate.src} alt={selectedCertificate.title} className="certViewer__image" /><div className="certViewer__caption">{selectedCertificate.title}</div></div></div>}
    </>
  );
}
