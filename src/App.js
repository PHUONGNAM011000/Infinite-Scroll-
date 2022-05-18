import { Route, Switch } from 'react-router-dom';
import TestOne from './page/TestOne';
import TestTwo from './page/TestTwo';
import './App.css';

const App = () => {
  return (
    <>
      <a href="/basic">Basic</a>
      <a href="/newfeed">React virtualized</a>
      <Switch>
        <Route exact path="/">
          <TestOne />
        </Route>
        <Route exact path="/basic">
          <TestOne />
        </Route>
        <Route exact path="/newfeed">
          <TestTwo />
        </Route>
      </Switch>
    </>
  );
};

export default App;
