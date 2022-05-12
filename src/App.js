import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TestOne from './page/TestOne';
import TestTwo from './page/TestTwo';
import './App.css';

const App = () => {
  return (
    <Router>
      <Route path="/basic">
        <TestOne />
      </Route>
      <Route exact path="/">
        <TestTwo />
      </Route>
    </Router>
  );
};

export default App;
