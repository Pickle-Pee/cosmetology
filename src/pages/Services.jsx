import Container from "../shared/ui/Container.jsx";
import Button from "../shared/ui/Button.jsx";
import PageIntro from "../shared/ui/PageIntro.jsx";

const serviceCards = [
  {
    title: "Консультация",
    text: "Первичный приём, диагностика и подбор индивидуального плана ухода.",
  },
  {
    title: "Инъекционные методики",
    text: "Биоревитализация, мезотерапия, ботулинотерапия и другие направления.",
  },
  {
    title: "Аппаратные процедуры",
    text: "Современные аппаратные методики по показаниям и задачам пациента.",
  },
  {
    title: "Пилинги и чистки",
    text: "Подбор щадящих и эффективных протоколов по типу кожи и сезону.",
  },
];

export default function Services() {
  return (
    <section className="section pageSection">
      <Container>
        <PageIntro
          kicker="Услуги"
          title="Основные направления"
          text="На сайте собраны ключевые направления работы. Полный перечень и стоимость — на отдельной странице прайса."
          action={
            <Button variant="ghost" onClick={() => location.assign("/prices")}>
              Открыть прайс
            </Button>
          }
        />

        <div className="grid">
          {serviceCards.map((item) => (
            <article className="card" key={item.title}>
              <h3 className="h3">{item.title}</h3>
              <p className="muted">{item.text}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}