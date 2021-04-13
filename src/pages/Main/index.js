import React, { useEffect, useState } from 'react';

const Main = () => {
  const [state, setState] = useState(0);
  useEffect(() => {
    console.log('--------', state);
  }, []);

  const resetVal = () => setState(prevState => prevState + 1);
  return <div onClick={resetVal}>456</div>;
};

export default Main;
