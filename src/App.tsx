import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Home } from "./page/Home";
import { Chart3 } from "./page/Chart3";
import { Chart4 } from "./page/Chart4";
import { EfetivoDosRebanhos } from "./page/EfetivoDosRebanhos";
import { OvinosTosquiados } from "./page/OvinosTosquiados";
import { ProducaoOrigemAnimal } from "./page/ProducaoOrigemAnimal";
import { ProducaoPeixesFrutosMar } from "./page/ProducaoPeixesFrutosMar";
import { VacasOrdenhadas } from "./page/VacasOrdenhadas";

import "./styles/global.scss";
import "./styles/page.scss";

function App() {
  return (
    <BrowserRouter forceRefresh>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/chart3" exact component={Chart3} />
        <Route path="/chart4" exact component={Chart4} />
        <Route path="/EfetivoDosRebanhos" exact component={EfetivoDosRebanhos} />
        <Route path="/OvinosTosquiados" exact component={OvinosTosquiados} />
        <Route path="/ProducaoOrigemAnimal" exact component={ProducaoOrigemAnimal} />
        <Route path="/ProducaoPeixesFrutosMar" exact component={ProducaoPeixesFrutosMar} />
        <Route path="/VacasOrdenhadas" exact component={VacasOrdenhadas} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
