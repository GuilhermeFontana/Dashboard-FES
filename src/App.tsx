import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Home } from "./page/Home";
import { Chart1 } from "./page/Chart1";
import { Chart2 } from "./page/Chart2";
import { Chart3 } from "./page/Chart3";
import { Chart4 } from "./page/Chart4";
import { EfetivoDosRebanhos } from "./page/EfetivoDosRebanhos";
import { OvinosTosquiados } from "./page/OvinosTosquiados";
import { ProduçãoPeixesFrutosMar } from "./page/ProduçãoPeixesFrutosMar";
import { VacasOrdenhadas } from "./page/VacasOrdenhadas";

import "./styles/global.scss";

function App() {
  return (
    <BrowserRouter forceRefresh>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/chart1" exact component={Chart1} />
        <Route path="/chart2" exact component={Chart2} />
        <Route path="/chart3" exact component={Chart3} />
        <Route path="/chart4" exact component={Chart4} />
        <Route path="/EfetivoDosRebanhos" exact component={EfetivoDosRebanhos} />
        <Route path="/OvinosTosquiados" exact component={OvinosTosquiados} />
        <Route path="/ProduçãoPeixesFrutosMar" exact component={ProduçãoPeixesFrutosMar} />
        <Route path="/VacasOrdenhadas" exact component={VacasOrdenhadas} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
