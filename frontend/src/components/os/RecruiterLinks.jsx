import { PROFILE } from "../../content";
export const RecruiterLinks = () => (
  <nav className="recruiter-links" aria-label="Acesso rápido profissional">
    <a href={`${process.env.PUBLIC_URL}/projetos.html`} title="Ver estudos de caso e projetos">PROJETOS</a>
    <a href={`${process.env.PUBLIC_URL}/curriculo.html`} title="Currículo imprimível">CURRÍCULO</a>
    <a href={`mailto:${PROFILE.email}?subject=Contato%20via%20L0-NOC`} title="Escrever e-mail">E-MAIL</a>
  </nav>
);
