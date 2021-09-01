/**
 * Promise 实现
 * A+标准
 * - promise: 一个拥有符合这个规范行为的 then 方法的对象或者函数
 * - thenable 定义了一个 then 方法的对象或函数。
 * - 值: 任意合法的Javascript值
 * - 异常: 使用throw语句抛出一个值
 * - 原因: 表示promise为什么被拒绝的一个值。
 */

// 以下为正常promise用法
// const p1 = new Promise((resolve, reject) => {
//   resolve(1);
//   reject(2);
// })
// p1.then(res => console.log('res val', res)); // 1;

// const p2 = Promise.resolve(22)
// p2.then(res => console.log('p2 then', res)); // 2;

const isFunction = val => typeof val === 'function';

const STATUS_PENDING = 'pending';
const STATUS_REJECTED = 'rejected';
const STATUS_FULFILLED = 'fulfilled';
/**
 * 这个cb的使用场景。就是一个回调函数
 * var p = new Promise((resolve, reject) => resolve('success'))
 * p.then(res => console.log(res));
 */
function MyPromise(cb) {
  this.status = STATUS_PENDING;
  this.value = null;
  this.reason = null; // reject
  this.callbacks = [];
  const onResolve = val => {
    if (this.status === STATUS_PENDING) {
      this.value = val;
      this.status = STATUS_FULFILLED;
    }
  };
  const onRejected = reason => {
    this.reason = reason;
  };
  try {
    cb(onResolve, onRejected);
  } catch (err) {
    console.log(err);
  }
}

const onResolve = () => {};

const onReject = () => {};

// 使用场景 var p = Promise.resolve(1).then(res => console.log(res));
MyPromise.resolve = function (val) {
  return new MyPromise(resolve => resolve(val));
};
MyPromise.reject = function (reason) {
  return new MyPromise((resolve, reject) => reject(reason));
};

// 处理promise队列
const handleCallback = (callback, status, value) => {
  const { onFulfilled, onRejected, resolve, reject } = callback;
  try {
    if (status === STATUS_FULFILLED) {
      isFunction(onFulfilled) ? resolve(onFulfilled(value)) : resolve(value);
    } else if (status === STATUS_REJECTED) {
      isFunction(onRejected) ? reject(onRejected(value)) : reject(value);
    }
  } catch (err) {
    reject(err);
  }
};

const handleCallbacks = (callbacks, status, value) => {
  while (callbacks.length) {
    handleCallback(callbacks.shift(), status, value);
  }
};

/**
 * then 的使用场景
 * var p = new Promise((resolve, reject) => resolve(1));
 * p.then(res => {
 *      console.log(res); // 1;
 *      return res + 1;
 *   }, err => {
 *      console.log(err); // 不执行。没有throw err;
 *   }).then(res => {
 *      console.log(res); // 2;
 *      return res + 1;
 *   })
 * then接收两个参数，一个是resolve函数，一个是reject函数。
 * 返回一个promise
 */
MyPromise.prototype.then = function (onFulfilled, onRejected) {
  return new MyPromise((resolve, reject) => {
    const callback = { onFulfilled, onRejected, resolve, reject };
    if (this.status === STATUS_PENDING) {
      this.callbacks.push(callback);
    } else {
      // 使用setTimeout 模拟异步事件
      setTimeout(() => {
        handleCallback(callback, this.status, this.value);
      }, 0);
    }
  });
};

MyPromise.prototype.catch = function (onReject) {
  this.then(null, onReject);
};

// 测试用例
var p = new MyPromise((resolve, reject) => {
  resolve(111);
  reject(2222);
});

p.then(res => {
  console.log('then', res);
}).catch(err => {
  console.log('catch', err);
});
