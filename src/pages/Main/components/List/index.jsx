import React, { useRef, useState } from 'react';

import css from './index.module.scss';

const list = Array.from({ length: 10000 }, (_, i) => {
  return i;
});

export const List = () => {
  const listRef = useRef(null);
  const [rList, setRList] = useState(list.slice(0, 12));
  const [startIndex, setStartIndex] = useState(0);

  const itemHeight = 30;

  const updateVisibleData = scrollTop => {
    scrollTop = scrollTop || 0;
    const visibleCount = Math.ceil(300 / itemHeight);
    const start = Math.floor(scrollTop / itemHeight);
    const end = start + visibleCount;
    const curList = list.slice(start, end + 2);
    setRList(curList);
    setStartIndex(start);
    // listRef.current.style.webkitTransform = `translate3d(0, ${
    //   start * itemHeight
    // }px, 0)`;
  };

  const handleScroll = e => {
    updateVisibleData(e.target.scrollTop);
  };

  return (
    <div className={css.box} onScroll={handleScroll}>
      <div
        className={css.dummyList}
        style={{
          height: list.length * 30,
        }}
      />
      <div
        ref={listRef}
        className={css.list}
        style={{
          transform: `translateY(${startIndex * itemHeight}px)`,
        }}
      >
        {rList.map((item, i) => {
          return (
            <div key={i} className={css.item}>
              虚拟列表 -- {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};
