import { Route, Switch } from 'react-router-dom';
import TestOne from './page/TestOne';
import TestTwo from './page/TestTwo';
import './App.css';

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <TestTwo />
        </Route>
        <Route exact path="/basic">
          <TestOne />
        </Route>
      </Switch>
    </>
  );
};

export default App;
