import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  Component,
  useState,
} from 'react';
// import css from './index.module.less';
import Card from './components/Card';
import history from '@/common/utils/history';
import { List } from './components/List';
import Comp from './components/Component';
import Carousel from './components/Carousel';
// import usePromise from '../Promise/usePromise';

const ary = [
  {
    title: 'cnode',
    desc: 'Node.js中文社区',
    path: '/cnode/main',
  },
  {
    title: 'alg',
    desc: '算法题练习',
    path: '/alg',
  },
  {
    title: '轮子验证',
    desc: '一些轮子验证',
  },
];

class ClassView extends Component {
  // constructor() {}

  state = {
    count: 1,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ count: 1 });
      this.setState({ count: 2 });
      this.setState({ count: 3 });
    }, 0);
  }

  render() {
    console.log('xxxxxxxxxxx class component render~~~~', this.state.count);
    return <div>class component View -- {this.state.count}</div>;
  }
}

const EffectView = ({ count }) => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(1);
  const [c, setC] = useState(2);
  const handleClickAsync = useCallback(() => {
    setTimeout(() => {
      setA(prev => prev + 1);
      setB(prev => prev + 1);
      setC(prev => prev + 1);
    }, 1000);
  }, []);
  const handleClick = useCallback(() => {
    setA(prev => prev + 1);
    setB(prev => prev + 1);
    setC(prev => prev + 1);
  }, []);
  useEffect(() => {
    handleClickAsync();
  }, [handleClickAsync]);
  // useLayoutEffect(() => {
  //   console.log('xxxxxxxxxxx layout');
  //   const now = performance.now();
  //   // while (performance.now() - now < 200) {
  //   //   console.log('xxxxxxxxxxx layout while');
  //   // }
  //   return () => {
  //     console.log('xxxx layout destory');
  //   };
  // }, []);
  console.log('xxxxxxxxxxx render~~~~~', a, b, c);
  return (
    <>
      <div onClick={handleClickAsync}>effect async view</div>
      <div onClick={handleClick}>effect view</div>
    </>
  );
};

const Main = () => {
  return (
    <div style={{ background: '#eee' }}>
      {/* <div className={css.banner}>
        <h2 className={css.h2}>Sylas</h2>
        <p className={css.subTitle}>
          解脱者·塞拉斯，是MOBA竞技网游《英雄联盟》中第143位登场的英雄角色
        </p>
        <p className={css.more}>更多介绍...</p>
      </div> */}
      {/* <section className={css.list}>
        {ary.map((item, i) => (
          <Card key={i} {...item} handleClick={handleClick} />
        ))}
      </section>
      <Comp />
      <Carousel list={[1, 2, 3, 4]} /> */}
      <List />
      {/* <EffectView count={count} /> */}
      {/* <ClassView /> */}
    </div>
  );
};

export default Main;
