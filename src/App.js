import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TestOne from './page/TestOne';
import './App.css';
import TestTwo from './page/TestTwo';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/basic-normal">
          <TestOne />
        </Route>
        <Route path="/">
          <TestTwo />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
