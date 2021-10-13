import './App.css';
import CityTable from './components/CityTable';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Signup } from './pages';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <h1>Home</h1>
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/cities">
            <CityTable />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
