import { BrowserRouter as Router, Route } from 'react-router-dom';
import TestOne from './page/TestOne';
import './App.css';
import TestTwo from './page/TestTwo';
import TestThree from './page/TestThree';

const App = () => {
  return (
    <Router>
      <Route path="/">
        <TestTwo />
      </Route>
      <Route path="/test2">
        <TestOne />
      </Route>
      <Route path="/test3">
        <TestThree />
      </Route>
    </Router>
  );
};

export default App;
