import Container from "../shared/ui/Container.jsx";

export default function Reviews() {
  return (
    <section className="section">
      <Container>
        <h1>Отзывы</h1>
        <p className="muted">Можно подключить виджет/форму, пока — статические карточки.</p>

        <div className="grid">
          {[
            { name: "Анна", text: "Очень аккуратно, понравился подход." },
            { name: "Мария", text: "Чисто, комфортно, всё объяснили." },
            { name: "Екатерина", text: "Результат заметен, вернусь ещё." },
          ].map((r) => (
            <article className="card" key={r.name}>
              <h3>{r.name}</h3>
              <p className="muted">“{r.text}”</p>
              <span className="pill">5.0</span>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
