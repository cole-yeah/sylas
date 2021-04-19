import React from 'react';
import Router from './Router';

const BrowserRouter = ({ history, children }) => {
  return <Router history={history}>{children}</Router>;
};

export default BrowserRouter;
