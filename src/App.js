import React from 'react';
import Router from './router';
import history from './common/utils/history';

function App() {
  return (
    <div className="App">
      <Router history={history} />
    </div>
  );
}

export default App;
