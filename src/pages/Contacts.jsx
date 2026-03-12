import Container from "../shared/ui/Container.jsx";
import Button from "../shared/ui/Button.jsx";
import PageIntro from "../shared/ui/PageIntro.jsx";

export default function Contacts() {
  return (
    <section className="section pageSection">
      <Container>
        <PageIntro
          kicker="Контакты"
          title="Запись и связь"
          text="Для записи на консультацию и процедуры напишите в Telegram."
          action={
            <Button onClick={() => window.open("https://t.me/dr_shorina", "_blank")}>
              Написать в Telegram
            </Button>
          }
        />

        <div className="two-col">
          <div className="card">
            <h3 className="h3">Связаться</h3>

            <div className="infoList">
              <div className="infoRow">
                <span className="muted">Telegram</span>
                <a
                  className="link"
                  href="https://t.me/dr_shorina"
                  target="_blank"
                  rel="noreferrer"
                >
                  @dr_shorina
                </a>
              </div>

              <div className="infoRow">
                <span className="muted">Формат связи</span>
                <span>запись, консультации, вопросы по процедурам</span>
              </div>
            </div>
          </div>

          <div className="card map">
            <div className="map__stub">
              Адрес приёма и карту можно добавить следующим этапом
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}