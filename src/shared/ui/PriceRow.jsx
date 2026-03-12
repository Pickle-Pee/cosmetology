export default function PriceRow({ name, price, duration }) {
  return (
    <div className="priceRow">
      <div className="priceRow__main">
        <div className="priceRow__name">{name}</div>
        {duration ? <div className="priceRow__meta">{duration}</div> : null}
      </div>

      <div className="priceRow__price">{price}</div>
    </div>
  );
}