import Container from "../shared/ui/Container.jsx";
import PageIntro from "../shared/ui/PageIntro.jsx";
import Button from "../shared/ui/Button.jsx";

export default function About() {
  return (
    <section className="section pageSection">
      <Container>
        <PageIntro
          kicker="О враче"
          title="Наталия Шорина"
          text="Врач-дерматокосметолог, тренер для врачей-косметологов, международный спикер и автор экспертных публикаций о здоровье кожи и современной косметологии."
        />

        <div className="aboutHeroCard">
          <div className="aboutHeroGrid">
            <div className="aboutHeroPhoto">
              <div className="aboutHero__imageFrame">
                <picture>
                  <source media="(max-width: 700px)" srcSet="/doctor/doctor-photo.jpg" />
                  <img src="/doctor/doctor-full.jpg" alt="Наталия Шорина" className="aboutHeroPhoto__image" loading="lazy" />
                </picture>
              </div>
            </div>

            <div className="aboutHeroContent">
              <div className="kicker aboutHero__kicker">Подход</div>
              <h1 className="aboutHero__title">Я не ищу, что ещё вам можно сделать</h1>
              <p className="aboutHero__text">
                Моя задача — понять, что действительно вас беспокоит, оценить состояние кожи и тканей и предложить решение, которое будет полезным, безопасным и обоснованным.
              </p>
              <p className="aboutHero__text">
                Не каждая консультация должна заканчиваться процедурой. Но каждая должна заканчиваться пониманием, что делать дальше.
              </p>
              <div className="aboutHero__actions">
                <Button onClick={() => window.open("https://t.me/dr_shorina", "_blank")}>Записаться на консультацию</Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
