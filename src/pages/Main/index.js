import React, { useEffect, useState } from 'react';
import { Link } from '../../lib/router';

const Main = () => {
  const [state, setState] = useState(0);
  useEffect(() => {
    console.log('--------', state);
  }, [state]);

  const resetVal = () => setState(prevState => prevState + 1);
  return (
    <div>
      <div onClick={resetVal}>0000</div>
      <Link to="/alg">alg page</Link>
    </div>
  );
};

export default Main;
