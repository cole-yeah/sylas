import React, { useEffect } from 'react';
import { lcs, lcs_1, lcs_2, changeCoin, changeCoin_1 } from '../../dynamic';

var a = 90;

const obj = { a: 1 };

// eslint-disable-next-line no-extend-native
Function.prototype.myCall = function (ctx, ...rest) {
  ctx.fn = this;
  const reuslt = ctx.fn(...rest);
  delete ctx.fn;
  return reuslt;
};

function fn(n1, n2) {
  console.log('fn console log', this, n1, n2);
  return n1 + n2;
}
let a1 = fn(1, 2);
let a2 = fn.myCall(obj, 1, 2);
console.log('xxxxxxxxx===', a1, a2);

function Dynamic() {
  useEffect(() => {
    const str1 = 'ABCBDAB';
    const str2 = 'BDCABA';
    // const val = changeCoin(6);
    changeCoin_1(17);
    lcs(str1, str2);
    lcs_1(str1, str2);
    lcs_2(str1, str2);
  }, []);
  useEffect(function () {}, []);
  return <div>dynamic</div>;
}

export default Dynamic;
