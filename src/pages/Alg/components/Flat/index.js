import React from 'react';
import css from './index.module.scss';

const ary = [1, [2, 3], 4, [5, [6, [7]], 8], 9];

const flat = (arr, level = 1) => {
  if (level <= 0) return arr;
  return arr.reduce((prev, item) => {
    // eslint-disable-next-line no-unused-vars
    return Array.isArray(item) ? flat(item, level - 1) : item;
  }, []);
};

const FlatView = () => {
  const handleClick = e => {
    console.log(e.target.dataset);
    const { id } = e.target.dataset;
    console.log('xxxxxxxxxx', id);
  };

  return (
    <div className={css.wrapper} data-id="123" onClick={handleClick}>
      flat view
      <div className={css.box}>
        <div className={css.absolteBox}>
          <div className={css.content}>content</div>
        </div>
      </div>
    </div>
  );
};

export default FlatView;
