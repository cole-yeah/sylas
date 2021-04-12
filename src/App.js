import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { produce } from 'immer';

const cloneDeep = target => {
  return {
    ...target,
  };
};

function App() {
  const [state, setState] = useState(0);
  useEffect(() => {
    const obj = {
      a: {
        aa: {
          aaa: 1,
        },
      },
      b: {
        bb: 2,
      },
      c: 3,
    };
    const newObj = produce(obj, draft => {
      draft.a.aa.aaa = 10;
    });
    console.log('----', newObj.a.aa, obj.a.aa, newObj.a.aa === obj.a.aa);
    console.log('--==--', newObj.b, obj.b, newObj.b === obj.b);
  }, []);

  const resetVal = () => setState(prevState => prevState + 1);

  useEffect(() => {
    console.log('--------', state);
  }, [state]);

  return (
    <div className="App">
      <div>{state}</div>
      <div onClick={resetVal}>点击 +1</div>
    </div>
  );
}

export default App;
