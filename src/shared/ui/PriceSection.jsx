import PriceRow from "./PriceRow.jsx";

export default function PriceSection({ section }) {
  return (
    <article id={section.id} className="priceCard">
      <div className="priceCard__head">
        <h3 className="h3">{section.title}</h3>
        <span className="priceCard__count">{section.items.length}</span>
      </div>

      <div className="priceList">
        {section.items.map((item) => (
          <PriceRow
            key={`${section.id}-${item.name}`}
            name={item.name}
            price={item.price}
            duration={item.duration}
          />
        ))}
      </div>
    </article>
  );
}