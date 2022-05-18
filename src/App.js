import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TestOne from './page/TestOne';
import TestTwo from './page/TestTwo';
import './App.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/basic">
          <TestOne />
        </Route>
        <Route exact path="/">
          <TestTwo />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
