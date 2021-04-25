import React from 'react';
import { BrowserRouter, Switch, Route } from 'lib/router';
import Alg from 'pages/Alg';
import Main from 'pages/Main';
import { isProdEnv } from 'common/constants';

const Router = ({ history }) => {
  return (
    <BrowserRouter history={history} basename={isProdEnv ? '/sylas' : ''}>
      <Switch>
        <Route path="/" component={Main} />
        <Route path={isProdEnv ? '/' : '/sylas'} component={Main} />
        <Route path="/alg" component={Alg} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
