import React, { useCallback, useEffect, useRef, useState } from 'react';

import css from './index.module.scss';

// const list = Array.from({ length: 10000 }, (_, i) => {
//   return i;
// });

const textArray = [
  '这是内容这是内容这是内容',
  '这是内容',
  '这是内容这是内容这是内容',
  '这是内容这是内容',
];

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const RANGE = 50;
let KEY = 0;

export const List = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [rList, setRList] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [top, setTop] = useState(0);
  const itemHeight = 30;

  const updateVisibleData = scrollTop => {
    scrollTop = scrollTop || 0;
    const visibleCount = Math.ceil(300 / itemHeight);
    const start = Math.floor(scrollTop / itemHeight);
    const end = start + visibleCount;
    const curList = list.slice(start, end + 2);
    setRList(curList);
    setStartIndex(start);
  };

  const handleScroll = e => {
    requestAnimationFrame(() => {
      const { scrollTop, scrollHeight, clientHeight } = e.target;
      updateVisibleData(e.target.scrollTop);

      if (scrollHeight - scrollTop - clientHeight <= RANGE && !loading) {
        loadData();
      }
    });
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

  const loadData = useCallback(async isInit => {
    setLoading(true);
    const res = await fekeFetch();
    setLoading(false);
    const { data } = res;
    setList(prevList => prevList.concat(data));
    setRList(prevList => prevList.concat(data));
  }, []);

  useEffect(() => {
    loadData(true);
  }, [loadData]);

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
            <div className={css.item} key={i}>
              {item}
            </div>
          );
        })}
        {loading && <div className={css.loadingText}>加载中...</div>}
      </div>
    </div>
  );
};
