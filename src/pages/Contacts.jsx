import Container from "../shared/ui/Container.jsx";
import Button from "../shared/ui/Button.jsx";

export default function Contacts() {
  return (
    <section className="section">
      <Container>
        <h1>Контакты</h1>
        <p className="muted">Адрес, телефон, мессенджеры, карта.</p>

        <div className="two-col">
          <div className="card">
            <h3>Связаться</h3>
            <div className="list">
              <div><span className="muted">Телефон:</span> <a className="link" href="tel:+70000000000">+7 (000) 000-00-00</a></div>
              <div><span className="muted">Email:</span> <a className="link" href="mailto:hello@clinic.ru">hello@clinic.ru</a></div>
              <div><span className="muted">Адрес:</span> г. …, ул. …</div>
              <div><span className="muted">Время:</span> 10:00–20:00</div>
            </div>

            <div style={{ marginTop: 16, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Button onClick={() => alert("Форма записи — дальше сделаем")}>Записаться</Button>
              <Button variant="ghost" onClick={() => alert("Откроем WhatsApp/Telegram")}>
                Мессенджер
              </Button>
            </div>
          </div>

          <div className="card map">
            <div className="map__stub">
              Карта-заглушка (потом вставим Яндекс/Google iframe)
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
