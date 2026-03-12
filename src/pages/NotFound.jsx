import Container from "../shared/ui/Container.jsx";
import Button from "../shared/ui/Button.jsx";
import PageIntro from "../shared/ui/PageIntro.jsx";

export default function NotFound() {
  return (
    <section className="section pageSection">
      <Container>
        <PageIntro
          kicker="404"
          title="Страница не найдена"
          text="Возможно, ссылка устарела или страница была перемещена."
          action={
            <Button onClick={() => location.assign("/")}>
              На главную
            </Button>
          }
        />
      </Container>
    </section>
  );
}