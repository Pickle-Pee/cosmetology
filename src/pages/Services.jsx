import Container from "../shared/ui/Container.jsx";

export default function Services() {
  return (
    <section className="section">
      <Container>
        <h1>Услуги</h1>
        <p className="muted">Список услуг, фильтры, цены — добавим позже.</p>

        <div className="grid">
          {["Лицо", "Тело", "Инъекции", "Аппаратные"].map((t) => (
            <article className="card" key={t}>
              <h3>{t}</h3>
              <p className="muted">Заглушка под категорию.</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
