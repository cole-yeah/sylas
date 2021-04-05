import React from "react";
import { produce } from "immer";
import { useEffect } from "react";

const cloneDeep = (target) => {
  return {
    ...target,
  };
};

function App() {
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
    const newObj = produce(obj, (draft) => {
      draft.a.aa.aaa = 10;
    });
    console.log("----", newObj.a.aa, obj.a.aa, newObj.a.aa === obj.a.aa);
    console.log("--==--", newObj.b, obj.b, newObj.b === obj.b);
  }, []);
  return <div className="App">321</div>;
}

export default App;
