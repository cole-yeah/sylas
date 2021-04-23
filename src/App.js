import React, { useState, useEffect } from 'react';
import Router from './router';
import history from './common/utils/history';
import { produce } from 'lib/immer';

// const cloneDeep = target => {
//   return {
//     ...target,
//   };
// };

function App() {
  const [state, setState] = useState({
    a: {
      aa: {
        aaa: 1,
      },
    },
    b: {
      bb: 2,
    },
    c: 3,
  });

  useEffect(() => {
    // const newState = produce(obj, draft => {
    //   // debugger;
    //   draft.a.aa.aaa = draft.a.aa.aaa + 1;
    // });
    // // setState(newState);
    // console.log('xxxxxxxxxxxxx', newState)
  }, []);

  const handleClick = () => {
    const newState = produce(state, draft => {
      // debugger;
      draft.a.aa.aaa = draft.a.aa.aaa + 1;
    });
    setState(newState);
  };

  return (
    <div className="App">
      <div>aaa 值: {state.a.aa.aaa}</div>
      <div>bb 值: {state.b.bb}</div>
      <div>c 值: {state.c}</div>
      <div onClick={handleClick}>点击 aaa +1 </div>
      <div
        onClick={() =>
          setState(prevState =>
            produce(prevState, draft => {
              draft.b.bb++;
            }),
          )
        }
      >
        点击 bb +1
      </div>
      <div
        onClick={() =>
          setState(prevState =>
            produce(prevState, draft => {
              draft.c++;
            }),
          )
        }
      >
        点击 c +1
      </div>
      <Router history={history} />
    </div>
  );
}

export default App;
