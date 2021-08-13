import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import { createTheme, ThemeProvider } from "@material-ui/core";
import Layout from "./components/Layout";

const theme = createTheme({
  palette: {
    type: "dark",
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Layout>
            <Switch>
              <Route exact path="/" component={Home}>
                <Home />
              </Route>
              <Route exact path="/detail/:id" component={Home}>
                <Detail />
              </Route>
            </Switch>
          </Layout>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
