import React from 'react';
import { BrowserRouter, Switch, Route } from 'lib/router';
import Alg from 'pages/Alg';
import Main from 'pages/Main';

const isProdEnv = process.env.NODE_ENV === 'production';

const Router = ({ history }) => {
  return (
    <BrowserRouter history={history} basename={isProdEnv ? '/sylas' : ''}>
      <Switch>
        <Route path="/alg" component={Alg} />
        <Route path="/main" component={Main} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
