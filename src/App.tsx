import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Home } from "./page/Home";

import "./styles/global.scss";

function App() {
  return (
    <BrowserRouter forceRefresh>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
