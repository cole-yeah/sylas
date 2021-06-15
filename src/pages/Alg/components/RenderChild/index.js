import React, {
  useMemo,
  useState,
  memo,
  Component,
  useEffect,
  useRef,
  useCallback,
} from 'react';

class ClassCount extends Component {
  state = { count: 0 };
  count = 0;
  componentDidMount() {
    this.loop();
  }
  loop() {
    if (this.count >= 20) return;
    setTimeout(() => {
      this.setState(prevState => ({
        count: prevState.count + 1,
      }));
      this.count += 1;
      this.loop();
    }, 2);
  }
  render() {
    console.log('class component render: ', this.state.count);

    return <div>{this.state.count}</div>;
  }
}
const FuncCount = () => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const loop = useCallback(() => {
    if (countRef.current >= 20) return;
    setTimeout(() => {
      setCount(prevCount => prevCount + 1);
      countRef.current += 1;
      loop();
    }, 2);
  }, []);
  useEffect(() => {
    loop();
  }, [loop]);
  console.log('function component render: ', count);
  return <div>count</div>;
};

const AChildComponent = () => {
  console.log('A Child Component');
  return <div>AChildComponent</div>;
};

const DChildComponent = () => {
  console.log('D Child Component');
  return <div>D Child Component</div>;
};

const RenderChild = () => {
  const [count, setCount] = useState(0);
  const AComponet = () => {
    console.log('A render');
    return (
      <div>
        A Componet
        <AChildComponent />
      </div>
    );
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
    return (
      <div>
        D Component
        <DChildComponent />
      </div>
    );
  });
  useEffect(() => {
    console.log('xxxxxxxxxxxx', count);
    return () => console.log('clear function');
  }, [count]);
  return (
    <div onClick={() => setCount(count + 1)}>
      count: {count}
      <AComponet />
      {BComponent()}
      {CComponent}
      <DComponent />
      <ClassCount />
      <FuncCount />
    </div>
  );
};

export default RenderChild;
