import Container from "../shared/ui/Container.jsx";
import PageIntro from "../shared/ui/PageIntro.jsx";

const articles = [
  "Как выбрать уход по типу кожи",
  "Пилинги: кому и когда подходят",
  "SPF: почему важен круглый год",
];

export default function Articles() {
  return (
    <section className="section pageSection">
      <Container>
        <PageIntro
          kicker="Статьи"
          title="Полезные материалы"
          text="Блог о домашнем уходе, процедурах, противопоказаниях и ответах на частые вопросы."
        />

        <div className="grid">
          {articles.map((title) => (
            <article className="card" key={title}>
              <h3 className="h3">{title}</h3>
              <p className="muted">Короткий анонс статьи на 1–2 строки.</p>
              <button className="link" onClick={() => alert("Откроем страницу статьи позже")}>
                Читать →
              </button>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}