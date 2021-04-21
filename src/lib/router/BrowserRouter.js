import React from 'react';
import Router from './Router';

const BrowserRouter = ({ history, children, basename = '' }) => {
  return (
    <Router history={history} basename={basename}>
      {children}
    </Router>
  );
};

export default BrowserRouter;
