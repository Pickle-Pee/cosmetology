import Container from "../shared/ui/Container.jsx";
import PageIntro from "../shared/ui/PageIntro.jsx";

const reviews = [
  { name: "Анна", text: "Очень аккуратно, понравился подход." },
  { name: "Мария", text: "Чисто, комфортно, всё объяснили." },
  { name: "Екатерина", text: "Результат заметен, вернусь ещё." },
];

export default function Reviews() {
  return (
    <section className="section pageSection">
      <Container>
        <PageIntro
          kicker="Отзывы"
          title="Мнения пациентов"
          text="Позже сюда можно подключить реальные отзывы или внешний источник."
        />

        <div className="grid">
          {reviews.map((review) => (
            <article className="card" key={review.name}>
              <h3 className="h3">{review.name}</h3>
              <p className="muted">“{review.text}”</p>
              <span className="pill">5.0</span>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}