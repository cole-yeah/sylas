import React, { useState, Suspense } from 'react';

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

const Parent = ({ children }) => {
  const [num, setNum] = useState(0);
  console.log('parent component render');
  return (
    <div>
      <button onClick={() => setNum(prev => prev + 1)}>click me</button>
      <p>number: {num}</p>
      {/* {children} */}
      {/* <Child /> */}
      {Child()}
    </div>
  );
};

const Comp = () => {
  return <Parent>{/* <Child /> */}</Parent>;
};

export default Comp;
