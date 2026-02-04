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

function PlaceholderCard({ title, text, cta = "Подробнее →", onClick }) {
  return (
    <article className="card card--minimal">
      <div className="card__top">
        <h3 className="h3">{title}</h3>
        <span className="pill pill--neutral">заглушка</span>
      </div>
      <p className="muted">{text}</p>
      <div className="card__bottom">
        <button className="link" onClick={onClick}>{cta}</button>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <>
      <Carousel
        autoPlayMs={5500}
        slides={slides.map((s) => ({
          ...s,
          primaryAction: (
            <Button onClick={() => alert("Запись подключим позже")}>Записаться</Button>
          ),
          secondaryAction: (
            <Button variant="ghost" onClick={() => location.assign("/services")}>
              Услуги
            </Button>
          ),
        }))}
      />

      {/* О враче (сразу под каруселью) */}
      <section className="section about">
        <Container>
          <div className="aboutCard">
            <div className="aboutGrid">
              <div className="photoStub" aria-hidden="true" />
              <div>
                <div className="kicker" style={{ color: "var(--muted)" }}>
                  О враче
                </div>
                <h2 className="h2" style={{ marginTop: 6 }}>
                  Имя Фамилия
                </h2>
                <p className="muted" style={{ marginTop: 6 }}>
                  Врач-косметолог. Тут чето о себе.
                </p>

                <div className="badges">
                  <span className="badge">тут еще какая то инфа </span>
                  {/* <span className="badge">сертификаты</span>
                  <span className="badge">приём: город</span> */}
                </div>

                <div className="aboutActions">
                  <Button onClick={() => alert("Форма записи позже")}>Записаться</Button>
                  <Button variant="ghost" onClick={() => location.assign("/contacts")}>
                    Контакты
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Услуги (заглушка) */}
      <section className="section">
        <Container>
          <div className="section__head">
            <h2 className="h2">Услуги</h2>
            <p className="muted">Короткий список — без прайса и деталей.</p>
          </div>

          <div className="grid">
            {[
              { title: "Консультация", text: "Диагностика и подбор плана ухода." },
              { title: "Чистка лица", text: "Атравматичная / ультразвуковая." },
              { title: "Пилинги", text: "По показаниям, сезонность и уход." },
              { title: "Инъекционные методики", text: "Пример карточки под направление." },
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
            <p className="muted">3 карточки и кнопка на страницу — потом подключим реальные.</p>
          </div>

          <div className="grid">
            {[
              { title: "Анна", text: "“Очень деликатно и понятно объяснили.”" },
              { title: "Мария", text: "“Комфортно, аккуратно, понравился результат.”" },
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
              <p className="muted">Телефон, мессенджеры, адрес — всё компактно на странице контактов.</p>
            </div>
            <Button onClick={() => location.assign("/contacts")}>Открыть контакты</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
