import React, { useState, useEffect, useCallback, useRef } from 'react';

const fetchA = (cb1, cb2) => {
  return new Promise(resolve => {
    const data = {
      msg: 'success',
      code: 200,
    };
    setTimeout(() => {
      resolve(data);
      cb1(data);
    }, 500);
  });
};

const fetchB = () => {
  return new Promise(resolve => {
    const data = {
      msg: 'success',
      code: 200,
      result: 'is B data',
    };
    setTimeout(() => {
      resolve(data);
    }, 200);
  });
};

const AAComp = () => {
  const [a, setA] = useState(0);
  return <div>AAAA</div>;
};
const CCComp = () => {
  const [c, setC] = useState(1);
  return <div>CCCCCC</div>;
};

const obj = {
  AA: <AAComp />,
  BB: () => obj['AA'],
  CC: <CCComp />,
};

const Hooks = () => {
  const [state, setState] = useState(false);
  const countRef = useRef(0);
  // const getAData = async () => {
  //   const res = await fetchB();
  //   console.log('fetch-- fetchA', res);
  //   // ......
  //   fetchA(res => {
  //     // handle res
  //     console.log('fetch-- fetchA', res);
  //   });
  // };

  // const hanleAData = useCallback(() => {
  //   getAData().then(res => {
  //     console.log('fetch-- handle data', res);
  //   });
  // }, []);

  // useEffect(() => {
  //   hanleAData();
  // }, [hanleAData]);
  const handleClick = () => {
    setState(prev => !prev);
  };

  useEffect(() => {
    countRef.current += 1;
    // console.log('------', );
  }, [state]);
  // console.log('======', state, countRef.current);
  const ary = state ? ['CC', 'BB'] : [];
  return (
    <div>
      {ary.map(key => {
        const val = obj[key];
        return typeof val === 'function' ? val() : val;
      })}
      <p onClick={handleClick}>Promise {countRef.current}</p>
    </div>
  );
};

export default Hooks;
