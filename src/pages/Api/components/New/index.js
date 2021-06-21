import React from 'react';

/**
 * Object.create实现
 */
function objCreate(obj) {
  let Fn = function () {};
  Fn.prototype = obj;
  return new Fn();
}

/**
 * new 实现
 * - 创建一个对象
 * - 链接该对象（设置该对象的constructor）到另一个对象
 * - 将步骤一新创建的对象作为this的上下文
 * - 如果该函数没有返回对象，则返回this
 */
function selfNew(fn, ...rest) {
  let obj = Object.create(fn.prototype);
  let ret = fn.apply(obj, rest);
  return typeof ret === 'object' && ret ? ret : obj;
}

const NewComponent = () => {
  return <div></div>;
};

export default NewComponent;
