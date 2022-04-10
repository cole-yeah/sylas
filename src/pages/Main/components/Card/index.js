import React from 'react';
import css from './index.module.less';

const Card = ({ title, desc, path, handleClick = () => {} }) => {
  return (
    <section className={css.card} onClick={() => handleClick(path)}>
      <p className={css.title}>{title}</p>
      <p className={css.desc}>{desc}</p>
    </section>
  );
};

export default Card;
