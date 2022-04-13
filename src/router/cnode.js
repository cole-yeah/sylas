import React from 'react';
import Main from '@/pages/cnode/Main';
import { Switch, Route } from '@/lib/router';

const CNode = () => {
  return (
    <Switch>
      <Route path="/cnode/main" component={Main} />
    </Switch>
  );
};

export default CNode;
