import { useEffect, useMemo, useRef, useState } from "react";

export default function Carousel({
  slides,
  autoPlayMs = 5000,
  className = "",
}) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);
  const touch = useRef({ x: 0, y: 0, active: false });

  const safeSlides = useMemo(() => slides?.length ? slides : [], [slides]);

  const go = (i) => {
    if (!safeSlides.length) return;
    const next = (i + safeSlides.length) % safeSlides.length;
    setIndex(next);
  };

  const next = () => go(index + 1);
  const prev = () => go(index - 1);

  // autoplay
  useEffect(() => {
    if (!safeSlides.length) return;
    if (autoPlayMs <= 0) return;

    timerRef.current && clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setIndex((v) => (v + 1) % safeSlides.length), autoPlayMs);

    return () => timerRef.current && clearInterval(timerRef.current);
  }, [safeSlides.length, autoPlayMs]);

  const onTouchStart = (e) => {
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY, active: true };
  };

  const onTouchEnd = (e) => {
    if (!touch.current.active) return;
    touch.current.active = false;

    const t = e.changedTouches[0];
    const dx = t.clientX - touch.current.x;
    const dy = t.clientY - touch.current.y;

    // горизонтальный свайп
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      dx < 0 ? next() : prev();
    }
  };

  if (!safeSlides.length) return null;

  return (
    <section className={`carousel ${className}`}>
      <div
        className="carousel__viewport"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="carousel__track"
          style={{ transform: `translateX(${-index * 100}%)` }}
        >
          {safeSlides.map((s, i) => (
            <article className="carousel__slide" key={s.id ?? i}>
              <div
                className="carousel__bg"
                style={{
                  backgroundImage: s.image ? `url(${s.image})` : undefined,
                }}
                aria-hidden="true"
              />
              <div className="carousel__overlay" />
              <div className="carousel__content">
                <div className="kicker">{s.kicker}</div>
                <h1 className="carousel__title">{s.title}</h1>
                <p className="carousel__text">{s.text}</p>
                <div className="carousel__actions">
                  {s.primaryAction}
                  {s.secondaryAction}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <button className="carousel__arrow left" onClick={prev} aria-label="Предыдущий слайд">
        ‹
      </button>
      <button className="carousel__arrow right" onClick={next} aria-label="Следующий слайд">
        ›
      </button>

      <div className="carousel__dots" role="tablist" aria-label="Слайды">
        {safeSlides.map((_, i) => (
          <button
            key={i}
            className={"dot" + (i === index ? " is-active" : "")}
            onClick={() => go(i)}
            aria-label={`Слайд ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
