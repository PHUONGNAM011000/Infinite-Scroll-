import { Route, Switch } from 'react-router-dom';
import TestOne from './page/TestOne';
import TestTwo from './page/TestTwo';
import './App.css';

const App = () => {
  return (
    <>
      <a href="/basic">Basic</a>
      <a href="/">React virtualized</a>
      <Switch>
        <Route exact path="/basic">
          <TestOne />
        </Route>
        <Route exact path="/">
          <TestTwo />
        </Route>
      </Switch>
    </>
  );
};

export default App;
