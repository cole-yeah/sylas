import React from 'react';
import { BrowserRouter, Switch, Route } from 'lib/router';
import Alg from 'pages/Alg';
import Main from 'pages/Main';
import { isProdEnv } from 'common/constants';
import CNode from './cnode';

const Router = ({ history }) => {
  return (
    <BrowserRouter history={history} basename={isProdEnv ? '/sylas' : ''}>
      <Switch>
        <Route path={isProdEnv ? '/' : '/sylas'} component={Main} />
        <Route path="/alg" component={Alg} />
        <Route path="/cnode" component={CNode} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
