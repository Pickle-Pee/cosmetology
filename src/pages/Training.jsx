import Container from "../shared/ui/Container.jsx";
import PageIntro from "../shared/ui/PageIntro.jsx";
import Button from "../shared/ui/Button.jsx";

const trainingItems = [
  "Аппаратные и инъекционные методики",
  "Разбор показаний и противопоказаний",
  "Практические протоколы",
  "Работа с естественным результатом",
  "Безопасность и врачебное мышление",
];

export default function Training() {
  return (
    <section className="section pageSection">
      <Container>
        <PageIntro
          kicker="Для врачей"
          title="Обучение врачей-косметологов"
          text="Практические семинары и мастер-классы по аппаратным и инъекционным методикам для врачей-косметологов."
        />

        <div className="trainingSection__card">
          <div className="trainingSection__content">
            <div className="sectionLabel">Что внутри обучения</div>
            <p>
              В основе обучения — не только техника процедуры, но и клиническая логика: показания, безопасность, ограничения, работа с ожиданиями пациента и естественный результат.
            </p>

            <div className="trainingFeatures">
              {trainingItems.map((item, index) => (
                <div className="trainingFeature" key={item}>
                  <span className={`trainingFeature__icon trainingFeature__icon--${["method", "diagnostic", "protocol", "natural", "safety"][index]}`} aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <Button onClick={() => window.open("https://t.me/dr_shorina", "_blank")}>Уточнить программу обучения</Button>
          </div>

          <div className="trainingSection__media">
            <img src="/training_bg.png" alt="Обучение врачей-косметологов" className="trainingSection__image" loading="lazy" />
          </div>
        </div>
      </Container>
    </section>
  );
}
