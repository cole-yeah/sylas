// eslint-disable-next-line no-extend-native
Function.prototype.selfCall = function (ctx, ...rest) {
  ctx.fn = this; // this为函数
  ctx.fn(...rest);
  delete ctx.fn;
};

// 第一种方法有缺陷，如果 ctx 参数并不是一个对象，那就有问题了。并且要返回函数调用后的值
// eslint-disable-next-line no-extend-native
Function.prototype.selfCall1 = function (ctx, ...rest) {
  //Object：当传数字时会被包装成Number对象，当传字符串时会被包装成String对象等
  ctx = ctx ? Object(ctx) : window;
  ctx.fn = this;
  let res = ctx.fn(...rest);
  delete ctx.fn;
  return res;
};

// 第二种方法可能存在ctx上fn命名冲突，所以要确保属性名独一无二
// eslint-disable-next-line no-extend-native
Function.prototype.selfCall2 = function (ctx, ...rest) {
  const fnKey = Symbol('fnKey');
  ctx = ctx ? Object(ctx) : window;
  ctx[fnKey] = this;
  let res = ctx[fnKey](...rest);
  delete ctx[fnKey];
  return res;
};

// bind的实现
/**
 * bind
 * 返回函数
 */
// eslint-disable-next-line no-extend-native
Function.prototype.selfBind = function (ctx, ...rest) {
  const self = this;
  return function (...restArg) {
    self.call(ctx, ...rest, ...restArg);
  };
};

// 第一种实现使用new调用时，改变了this指向
// eslint-disable-next-line no-extend-native
Function.prototype.selfBind1 = function (ctx, ...rest) {
  const self = this;
  let fBound = function (...restArg) {
    // this instanceof fBound 判断fBound是否被new调用
    return self.call(this instanceof fBound ? this : ctx, ...rest, ...restArg);
  };
  return fBound;
};

// 第二种修正了new情况下this的指向，但是有原型链污染的问题
// eslint-disable-next-line no-extend-native
Function.prototype.selfBind2 = function (ctx, ...rest) {
  const self = this;
  let fBound = function (...restArg) {
    // this instanceof fBound 判断fBound是否被new调用
    return self.call(this instanceof fBound ? this : ctx, ...rest, ...restArg);
  };
  fBound.prototype = Object.create(this.prototype);
  return fBound;
};

/**
 * instanceof
 * 检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上
 */
function selfInstanceof(left, right) {
  let leftVal = left.__proto__;
  let rightVal = right.prototype;
  while (true) {
    if (leftVal === rightVal) {
      return true;
    }
    if (leftVal === null) {
      return false;
    }
    leftVal = leftVal.__proto__;
  }
}
