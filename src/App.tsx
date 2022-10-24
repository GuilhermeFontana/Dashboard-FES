import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Home } from "./page/Home";
import { Chart1 } from "./page/Chart1";

import "./styles/global.scss";

function App() {
  return (
    <BrowserRouter forceRefresh>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/chart1" exact component={Chart1} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
