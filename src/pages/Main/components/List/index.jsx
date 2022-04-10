import React, { useCallback, useEffect, useRef, useState } from 'react';

import css from './index.module.less';

// const list = Array.from({ length: 10000 }, (_, i) => {
//   return i;
// });

const textArray = [
  'React提供了替代的生命周期钩子',
  '更详细的解释参照这里',
  '在浏览器完成布局与绘制之后，传给 useEffect 的函数会延迟调用。这使得它适用于许多常见的副作用场景',
  '经过本节学习，我们知道了在before mutation阶段，会遍历effectList，依次执行',
];

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const fekeFetch = () => {
  return new Promise(resolve => {
    const data = Array.from({ length: 15 }, () => {
      const index = random(0, 3);
      return `[${KEY++}] -- ${textArray[index]}`;
    });
    const res = {
      code: 200,
      data,
    };
    setTimeout(() => resolve(res), 2000);
  });
};

const RANGE = 100;
let KEY = 0;
const VISIBLE_COUNT = 10;
const itemHeight = 30;

export const List = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [rList, setRList] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const cacheRef = useRef(new Map());

  const updateVisibleData = scrollTop => {
    scrollTop = scrollTop || 0;
    const start = Math.floor(scrollTop / itemHeight);
    const end = start + VISIBLE_COUNT;
    const curList = list.slice(start, end + 2);
    setRList(curList);
    setStartIndex(start);
  };

  // 滚动
  const handleScroll = e => {
    requestAnimationFrame(() => {
      const { scrollTop, scrollHeight, clientHeight } = e.target;
      updateVisibleData(e.target.scrollTop);

      if (scrollHeight - scrollTop - clientHeight <= RANGE && !loading) {
        loadData();
      }
    });
  };

  // 滚动
  const loadData = useCallback(async isInit => {
    setLoading(true);
    const { data } = await fekeFetch();
    setLoading(false);
    setList(prevList => prevList.concat(data));
    isInit && setRList(data);
  }, []);

  useEffect(() => {
    loadData(true);
  }, [loadData]);

  // 获取组件高度和顶部距离
  const getItemBoundary = useCallback((node, index) => {
    const { offsetTop, offsetHeight } = node;
    if (!cacheRef.current.get(index)) {
      cacheRef.current.set(index, {
        index,
        offsetTop,
        offsetHeight,
      });
    }
  }, []);

  const height = list.length * 30;

  return (
    <div className={css.box} onScroll={handleScroll}>
      <div
        className={css.dummyList}
        style={{
          height,
        }}
      />
      <div
        className={css.list}
        style={{
          // transform: `translateY(${top}px)`,
          transform: `translateY(${startIndex * itemHeight}px)`,
        }}
      >
        {rList.map((item, i) => {
          return (
            <Item index={i} item={item} getItemBoundary={getItemBoundary} />
          );
        })}
        {loading && <div className={css.loadingText}>加载中...</div>}
      </div>
    </div>
  );
};

const Item = ({ index, item, getItemBoundary }) => {
  const divRef = useRef(null);
  useEffect(() => {
    getItemBoundary(divRef.current, index);
  }, [getItemBoundary, index]);
  return (
    <div ref={divRef} className={css.item}>
      {item}
    </div>
  );
};
