import React, { useEffect, useMemo, useState } from 'react';
import cnodeService from 'common/service/cnode';
import css from './index.module.scss';

function stole(arr) {
  let dp = Array(arr.length).fill(0);
  dp[0] = arr[0];
  dp[1] = arr[1];
  for (let i = 2; i < arr.length; i++) {
    let val = dp[i - 2] + arr[i];
    if (i === arr.length - 1 && arr.length % 2 !== 0) {
      val = Math.max(dp[i - 2] - arr[0] + arr[i], dp[i - 2]);
    }
    dp[i] = Math.max(val, dp[i - 1]);
  }
  console.log(dp);
  return dp[arr.length - 1];
}

const ITEM_HEIGHT = 50;

const LENGTH = 10;

const Main = () => {
  const [top, setTop] = useState(0);

  const list = Array.from({ length: 1000 }, (v, i) => i);

  const startIndex = Math.floor(top / ITEM_HEIGHT);
  const endIndex = startIndex + LENGTH;

  const renderList = useMemo(() => {
    return list.slice(startIndex, endIndex);
  }, []);
  return (
    <div
      className={css.wrapper}
      onScroll={e => {
        console.log('xxx', e.target.scrollTop);
        setTop(e.target.scrollTop);
      }}
    >
      <ul
        className={css.scrollList}
        style={{ height: list.length * ITEM_HEIGHT }}
      >
        {renderList.map((item, i) => {
          const even = i % 2 === 0;
          return (
            <li
              key={item}
              className={`${css.item} ${even ? css.itemActive : ''}`}
              // style={{ top: i * 50 + top }}
            >
              Row {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Main;
