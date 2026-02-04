import Container from "../../shared/ui/Container.jsx";

export default function Footer() {
  return (
    <footer className="footer">
      <Container className="footer__inner">
        <div>
          <div className="footer__brand">Test Clinic</div>
          <div className="muted">Косметология • Эстетика • Уход</div>
        </div>
        <div className="muted">© {new Date().getFullYear()} Все права защищены</div>
      </Container>
    </footer>
  );
}
