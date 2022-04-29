import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TestOne from './page/TestOne';
import './App.css';
import TestTwo from './page/TestTwo';
import TestThree from './page/TestThree';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <TestTwo />
        </Route>
        <Route path="/test2">
          <TestOne />
        </Route>
        <Route path="/test3">
          <TestThree />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
