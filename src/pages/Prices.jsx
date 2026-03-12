import Container from "../shared/ui/Container.jsx";
import Button from "../shared/ui/Button.jsx";
import PriceSection from "../shared/ui/PriceSection.jsx";
import priceSections from "../data/prices.json";

const groups = [...new Set(priceSections.map((section) => section.group))];

export default function Prices() {
  return (
    <section className="section">
      <Container>
        <div className="pricesHero">
          <div>
            <div className="kicker pricesHero__kicker">Прайс</div>
            <h1 className="pricesHero__title">Актуальный прайс</h1>
            <p className="muted pricesHero__text">
              Стоимость услуг и процедур. Для уточнения показаний, объёма и
              индивидуального плана лучше записаться на консультацию.
            </p>
          </div>

          <div className="pricesHero__actions">
            <Button onClick={() => window.open("https://t.me/dr_shorina", "_blank")}>
              Записаться
            </Button>
          </div>
        </div>

        <div className="priceGroupChips">
          {groups.map((group) => (
            <a key={group} href={`#${encodeURIComponent(group)}`} className="priceChip">
              {group}
            </a>
          ))}
        </div>

        {groups.map((group) => {
          const sections = priceSections.filter((section) => section.group === group);

          return (
            <section
              key={group}
              id={encodeURIComponent(group)}
              className="priceGroupSection"
            >
              <div className="section__head">
                <h2 className="h2">{group}</h2>
              </div>

              <div className="priceSections">
                {sections.map((section) => (
                  <PriceSection key={section.id} section={section} />
                ))}
              </div>
            </section>
          );
        })}

        <section className="section section--alt pricesBottomCta">
          <div className="cta">
            <div>
              <h2 className="h2">Нужна помощь с выбором процедуры?</h2>
              <p className="muted">
                Напишите в Telegram, чтобы уточнить показания, объём процедуры и
                стоимость в вашем случае.
              </p>
            </div>

            <Button onClick={() => window.open("https://t.me/dr_shorina", "_blank")}>
              Написать в Telegram
            </Button>
          </div>
        </section>
      </Container>
    </section>
  );
}