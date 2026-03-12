export default function PageIntro({ kicker, title, text, action = null }) {
  return (
    <div className="pageIntro">
      <div className="pageIntro__content">
        {kicker ? <div className="kicker pageIntro__kicker">{kicker}</div> : null}
        <h1 className="pageIntro__title">{title}</h1>
        {text ? <p className="muted pageIntro__text">{text}</p> : null}
      </div>

      {action ? <div className="pageIntro__action">{action}</div> : null}
    </div>
  );
}