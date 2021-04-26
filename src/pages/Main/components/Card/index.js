import React from 'react';
import css from './index.module.scss';

const Card = ({ title, desc, path, handleClick = () => {} }) => {
  return (
    <section className={css.card} onClick={() => handleClick(path)}>
      <p className={css.title}>{title}</p>
      <p className={css.desc}>{desc}</p>
    </section>
  );
};

export default Card;
