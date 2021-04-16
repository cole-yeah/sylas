import React from 'react';
import { createBrowserHistory as createdHistory } from 'history';
import Router from './Router';

const BrowserRouter = props => {
  const history = createdHistory(props);
  return <Router history={history}>{props.children}</Router>;
};

export default BrowserRouter;
