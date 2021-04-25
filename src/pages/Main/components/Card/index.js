import React from 'react';
import css from './index.module.scss';

const Card = ({ title, desc }) => {
  return (
    <section className={css.card}>
      <p className={css.title}>{title}</p>
      <p className={css.desc}>{desc}</p>
    </section>
  );
};

export default Card;
