import React, { useMemo, useState, memo } from 'react';

const RenderChild = () => {
  const [count, setCount] = useState(0);
  const AComponet = () => {
    console.log('A render');
    return <div>A Componet</div>;
  };
  const BComponent = () => {
    console.log('B render');
    return <div>B Component</div>;
  };
  const CComponent = useMemo(() => {
    console.log('C render');
    return <div>C Component</div>;
  }, []);
  // memo这里没有作用，应该是memo不存储在当前的fiber上
  const DComponent = memo(() => {
    console.log('D render');
    return <div>D Component</div>;
  });
  return (
    <div onClick={() => setCount(count + 1)}>
      count: {count}
      <AComponet />
      {BComponent()}
      {CComponent}
      <DComponent />
    </div>
  );
};

export default RenderChild;
