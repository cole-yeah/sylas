import React, { useEffect } from 'react';
import { Link } from '../../lib/router';
import { produce } from 'lib/immer';

// 循环
const createFlow = effects => {
  return {
    async run(cb = () => {}) {
      while (effects.length) {
        const effect = effects.shift();
        if (effect.run) {
          effect.run();
        } else if (Array.isArray(effect)) {
          await createFlow(effect).run();
        } else {
          await effect();
        }
      }
      return Promise.resolve().then(cb);
    },
  };
};

// 迭代
// const createFlow = effects => {
//   const next = async (index = 0) => {
//     if (index === effects.length) {
//       return Promise.resolve();
//     }
//     const effect = effects[index];
//     if (effect.run) {
//       return effect.run(() => next(index + 1));
//     } else if (Array.isArray(effect)) {
//       return createFlow(effect).run(() => next(index + 1));
//     } else {
//       return Promise.resolve(effect()).then(() => next(index + 1));
//     }
//   };
//   return {
//     async run(cb = () => {}) {
//       return next().then(cb);
//     },
//   };
// };

var obj = { a: { aa: 1 }, b: 2 };

const Alg = () => {
  useEffect(() => {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    const subFlow = createFlow([
      () => delay(1000).then(() => console.log('c')),
    ]);

    createFlow([
      () => console.log('a'),
      () => console.log('b'),
      subFlow,
      [() => delay(2000).then(() => console.log('d')), () => console.log('e')],
    ]).run(() => {
      console.log('done');
    });
  }, []);

  useEffect(() => {
    const newObj = produce(obj, draft => (draft.a.aa = 90));

    console.log('-----', obj, newObj, obj === newObj);
  }, []);

  // 需要按照 a,b,延迟1秒,c,延迟1秒,d,e, done 的顺序打印

  return (
    <div>
      <Link to="/main">go to main page</Link>
    </div>
  );
};

export default Alg;
