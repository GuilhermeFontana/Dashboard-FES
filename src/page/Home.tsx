import { PageComponent } from "../components/PageComponent";
import "../styles/home.scss";

export function Home() {
  return (
    <PageComponent title="Bem-vindo">
      <div id="home">
        <h3>Bem-Vindo</h3>
        <strong>
          Escolha um dashboard, em nosso menu, com os dados de seu interesse para visualizar
        </strong>
      </div>
    </PageComponent>
  );
}
