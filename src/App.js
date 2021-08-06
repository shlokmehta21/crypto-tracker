import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home}>
            <Home />
          </Route>
          <Route exact path="/detail" component={Home}>
            <Detail />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
