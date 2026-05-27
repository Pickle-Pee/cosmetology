import { Link } from "react-router-dom";
import Container from "../shared/ui/Container.jsx";
import PageIntro from "../shared/ui/PageIntro.jsx";
import articles from "../data/articles.json";

export default function Articles() {
  return (
    <section className="section pageSection">
      <Container>
        <PageIntro
          kicker="Статьи"
          title="Материалы о косметологии"
          text="Авторские публикации Наталии Шориной о процедурах, уходе за кожей и восстановлении."
        />

        <div className="articlesGrid">
          {articles.map((article) => {
            const title = article.title || article.heading || article.name;
            const excerpt = article.excerpt || article.announcement || article.description;
            const image = article.image || article.preview || article.images?.[0];

            return (
              <article className="articleCard" key={article.id}>
                <Link
                  to={`/articles/${article.slug}`}
                  className="articleCard__imageWrap"
                >
                  <img
                    src={image}
                    alt={title}
                    className="articleCard__image"
                    loading="lazy"
                  />
                </Link>

                <div className="articleCard__body">
                  <div className="articleCard__meta">
                    <span className="pill">{article.category}</span>
                    {article.readTime && <span>{article.readTime}</span>}
                  </div>

                  <h3 className="articleCard__title">
                    <Link to={`/articles/${article.slug}`}>
                      {title}
                    </Link>
                  </h3>

                  {excerpt && (
                    <p className="articleCard__excerpt">
                      {excerpt}
                    </p>
                  )}

                  <Link
                    to={`/articles/${article.slug}`}
                    className="articleCard__link"
                  >
                    Читать статью
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}