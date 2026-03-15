import Container from "../shared/ui/Container.jsx";
import PageIntro from "../shared/ui/PageIntro.jsx";
import reviews from "../data/reviews.json";

export default function Reviews() {
  return (
    <section className="section pageSection">
      <Container>
        <PageIntro
          kicker="Отзывы"
          title="Мнения пациентов"
          text="Отзывы пациентов о работе врача-косметолога Натальи Шориной."
        />

        <div className="grid">
          {reviews.map((review) => (
            <article className="card" key={review.id}>
              <h3 className="h3">{review.name}</h3>

              <p className="muted">“{review.text}”</p>

              <div className="reviewFooter">
                <span className="rating">
                  {"★".repeat(review.rating)}
                </span>

                {review.source && (
                  <a
                    href={review.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pill"
                  >
                    {review.source}
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}