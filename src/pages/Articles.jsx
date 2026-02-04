import Container from "../shared/ui/Container.jsx";

export default function Articles() {
  return (
    <section className="section">
      <Container>
        <h1>Статьи</h1>
        <p className="muted">Блог: уход, процедуры, противопоказания, ответы на вопросы.</p>

        <div className="grid">
          {[
            "Как выбрать уход по типу кожи",
            "Пилинги: кому и когда",
            "SPF: почему важен круглый год",
          ].map((t) => (
            <article className="card" key={t}>
              <h3>{t}</h3>
              <p className="muted">Короткий анонс статьи…</p>
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
