import React, { useCallback } from 'react';
import css from './index.module.scss';
import Card from './components/Card';
import history from 'common/utils/history';

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

const Main = () => {
  const handleClick = useCallback(path => {
    history.push(path);
  }, []);
  return (
    <div>
      <div className={css.banner}>
        <h2 className={css.h2}>Sylas</h2>
        <p className={css.subTitle}>
          解脱者·塞拉斯，是MOBA竞技网游《英雄联盟》中第143位登场的英雄角色
        </p>
        <p className={css.more}>更多介绍...</p>
      </div>
      <section className={css.list}>
        {ary.map((item, i) => (
          <Card key={i} {...item} handleClick={handleClick} />
        ))}
      </section>
    </div>
  );
};

export default Main;
