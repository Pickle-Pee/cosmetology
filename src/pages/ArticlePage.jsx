import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import Container from "../shared/ui/Container.jsx";
import articles from "../data/articles.json";

export default function ArticlePage() {
    const { slug } = useParams();

    const article = articles.find((item) => item.slug === slug);
    const title = article.title || article.heading || article.name;
const excerpt = article.excerpt || article.announcement || article.description;
const heroImage = article.image || article.preview || article.images?.[0];

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [slug]);

    if (!article) {
        return null;
    }

    const relatedArticles = articles
        .filter((item) => item.slug !== slug)
        .slice(0, 3);

    return (
        <section className="section pageSection">
            <Container>
                <div className="articlePage">
                    <Link to="/articles" className="articleBackLink">
                        ← Все статьи
                    </Link>

                    <span className="pill">{article.category}</span>

                    <h1 className="articlePage__title">{article.title}</h1>

                    <p className="articlePage__excerpt">{article.excerpt}</p>

                    <div className="articlePage__meta">
                        <span>{article.readTime}</span>
                        <span>•</span>
                        <span>{article.updatedAt}</span>
                    </div>

                    <div className="articlePage__imageWrap">
                        <img
                            src={article.image}
                            alt={article.title}
                            className="articlePage__image"
                        />
                    </div>

                    <div className="articleContent">
                        {article.content.map((block, index) => {
                            if (block.type === "heading") {
                                return <h2 key={index}>{block.text}</h2>;
                            }

                            if (block.type === "paragraph") {
                                return <p key={index}>{block.text}</p>;
                            }

                            if (block.type === "list") {
                                return (
                                    <ul key={index}>
                                        {block.items.map((item) => (
                                            <li key={item}>{item}</li>
                                        ))}
                                    </ul>
                                );
                            }

                            if (block.type === "image") {
                                const heroImage = article.image || article.preview || article.images?.[0];

                                if (block.src === heroImage) {
                                    return null;
                                }

                                return (
                                    <figure className="articleFigure" key={index}>
                                        <img
                                            src={block.src}
                                            alt={block.alt || article.title}
                                            className="articleFigure__image"
                                            loading="lazy"
                                        />

                                        {block.caption && (
                                            <figcaption className="articleFigure__caption">
                                                {block.caption}
                                            </figcaption>
                                        )}
                                    </figure>
                                );
                            }

                            if (block.type === "note") {
                                return (
                                    <div className="articleNote" key={index}>
                                        {block.text}
                                    </div>
                                );
                            }

                            if (block.type === "quote") {
                                return (
                                    <blockquote className="articleQuote" key={index}>
                                        {block.text}
                                    </blockquote>
                                );
                            }

                            return null;
                        })}
                    </div>

                    <div className="articleSource">
                        Источник:&nbsp;
                        <a
                            href={article.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link"
                        >
                            {article.source}
                        </a>
                    </div>

                    <div className="articleBottomNav">
                        <Link to="/articles" className="btn btn--ghost">
                            Все статьи
                        </Link>

                        <a
                            href="https://t.me/dr_shorina"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn--primary"
                        >
                            Записаться
                        </a>
                    </div>

                    <section className="relatedArticles">
                        <div className="section__head">
                            <h2 className="h2">Другие статьи</h2>
                        </div>

                        <div className="articlesGrid">
                            {relatedArticles.map((item) => (
                                <article className="articleCard" key={item.id}>
                                    <Link
                                        to={`/articles/${item.slug}`}
                                        className="articleCard__imageWrap"
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="articleCard__image"
                                            loading="lazy"
                                        />
                                    </Link>

                                    <div className="articleCard__body">
                                        <span className="pill">{item.category}</span>

                                        <h3 className="articleCard__title">
                                            <Link to={`/articles/${item.slug}`}>
                                                {item.title}
                                            </Link>
                                        </h3>

                                        <Link
                                            to={`/articles/${item.slug}`}
                                            className="articleCard__link"
                                        >
                                            Читать статью
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                </div>
            </Container>
        </section>
    );
}