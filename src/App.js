import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Menu from './components/Menu';
import Navbar from './components/Navbar';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/menu">
            <Navbar />
            <Menu />
          </Route>
        </Switch>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
