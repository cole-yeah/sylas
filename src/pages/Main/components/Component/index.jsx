import React, {
  useState,
  Suspense,
  useEffect,
  useCallback,
  useLayoutEffect,
} from 'react';

/**
 * render 需要满足的条件
 * React 创建 Fiber树时，每个组件对应的fiber都是通过如下两个逻辑之一创建的：
 * - render: 即调用render函数，根据返回的JSX创建新的fiber
 * - bailout: 即满足一定的条件时，React判断该组件在更新前后没有发生变化，则复用该组件上一次
 * 更新的fiber作为本次更新的fiber。
 *
 * bailout 需要满足的条件如下：
 * - oldProps === newProps
 * - context 没有变化
 * - workInProgress.type === current.type
 * - !includesSomeLane(renderLanes, updateLanes)
 */

const Child = () => {
  console.log('child component render');
  return <div>this is child component~</div>;
};

let aVal = 0,
  bVal = 0;
const Parent = ({ children }) => {
  const [num, setNum] = useState(0);
  const [a, setA] = useState('a');
  const [b, setB] = useState('b');
  const [aObj, setAObj] = useState({ val: 'a' });
  const [bObj, setBObj] = useState({ val: 'b' });
  console.log('parent component render');
  const jump = () => {
    window.history.pushState(null, null, '/sylas/aaa');
    window.history.back();
  };
  useEffect(() => {
    setTimeout(() => {
      setAObj({ val: 'aa' });
      console.log('set set time out', aObj.val);
    }, 0);
  }, []);
  useLayoutEffect(() => {
    bVal = 100;
  }, []);
  useEffect(() => {
    window.addEventListener('popstate', e => {
      console.log('xxxxxxxxx', e);
    });
  }, []);
  const handleClick = useCallback(() => {
    setNum(prev => prev + 1);
  }, []);
  const clickWithoutPromise = () => {
    setA('aa');
    setAObj({ val: 'aa' });
    console.log('set set set without Promise', aObj.val);
    setB('bb');
    setBObj({ val: 'bb' });
  };
  const clickWithPromise = () => {
    Promise.resolve().then(() => {
      setA('aa');
      setAObj({ val: 'aa' });
      console.log('set set set with Promise', aObj.val);
      setB('bb');
      setBObj({ val: 'bb' });
    });
  };
  console.log('set number', a, b);
  return (
    <div>
      <button onClick={handleClick}>click me</button>
      <button onClick={clickWithoutPromise}>click without promise</button>
      <button onClick={clickWithPromise}>click with promise</button>
      <div>
        render {a} - {b} <br />
        other render {aObj.val} _ {bObj.val}
      </div>
      <p>number: {num}</p>
      {/* {children} */}
      {/* <Child /> */}
      {Child()}
      <div onClick={() => jump()}>click me to jump </div>
    </div>
  );
};

const Comp = () => {
  return <Parent>{/* <Child /> */}</Parent>;
};

export default Comp;
