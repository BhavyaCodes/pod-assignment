import './App.css';
import CityTable from './components/CityTable';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Login, Signup } from './pages';
import { UserProvider } from './context/user.context';
import Layout from './components/Layout';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <UserProvider>
            <Layout>
              <Route path="/" exact>
                <h1>Home</h1>
              </Route>
              <Route path="/signup" exact>
                <Signup />
              </Route>
              <Route path="/login" exact>
                <Login />
              </Route>
              <Route path="/cities" exact>
                <CityTable />
              </Route>
            </Layout>
          </UserProvider>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
