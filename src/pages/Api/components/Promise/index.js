/**
 * A+标准
 * 1. 状态只能有pending 转为 fullied 或 rejected
 * 2. then是一个函数
 */

/**
 * FakePromise 用法
 * 1.
 * let p = new FakePromise((resolve, reject) => resolve(1))
 * p.then(res => {
 *  console.log(res); // 1;
 *  return 2;
 * }).then(res => {
 *  console.log(res); // 2
 * })
 * 2.
 * let p = FakePromise.resolve(1);
 */

const isObject = obj => typeof obj === 'object';
const isFunction = fn => typeof fn === 'function';
// const isPromise = promise => promise instanceof FakePromise;  // 这个只能判断es6标准的promise
// 用鸭子类型来判断。看起来像鸭子，走起来像鸭子，那么就是鸭子。
// promise 是一个**包含**then方法的对象或函数，该方法符合规范指定的行为
const isPromise = promise =>
  isObject(promise) && isFunction(promise.then) && isFunction(promise.catch);

// thenable 是一个**定义**了then方法的对象或函数
const isThenable = obj => (isFunction(obj) || isObject(obj)) && 'then' in obj;

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function FakePromise(fn) {
  this.status = PENDING;
  this.result = null;
  this.callbacks = [];

  const resolve = val => {
    if (this.status === PENDING) {
      onFulfilled(this, val);
      resolvePromise(this, this.result, onFulfilled, onRejected);
    }
  };

  const reject = reason => {
    if (this.status === PENDING) {
      onRejected(this, reason);
    }
  };

  try {
    fn(resolve, reject);
  } catch (err) {
    console.log(err);
  }
}

// then 返回的promise，也有自己的state和result。它们将由onFulfilled和onRejected行为指定
const handleCallback = (callback, status, result) => {
  const { onFulfilled, onRejected, resolve, reject } = callback;
  try {
    // 判断onFulfilled/onRejected是否是函数。如果是，以它们的返回值，作为下一个promise的result.
    if (status === FULFILLED) {
      isFunction(onFulfilled)
        ? resolve(onFulfilled(result))
        : onFulfilled(result);
    } else if (status === REJECTED) {
      isFunction(onRejected) ? reject(onRejected(result)) : onRejected(result);
    }
  } catch (err) {
    reject(err);
  }
};

// 处理promise，在状态由pending转为fulfilled开始处理。
const resolvePromise = (promise, result, resolve, reject) => {
  // 如果promise和result指向同一个对象，则拒绝执行。防止死循环
  if (promise === result) {
    const reason = new TypeError('can not fulfill promise with itself');
    return reject(reason);
  }
  if (isPromise(result)) {
    return result.then(resolve, reject);
  }
  // 这个主要是来兼容一些老的Promise的实现。
  if (isThenable(result)) {
    let then = result.then;
    if (isFunction(then)) {
      return new FakePromise(then.bind(result)).then(resolve, reject);
    }
  }
  resolve(result);
};

// 状态由 pending 转为 fulfilled
const onFulfilled = (promise, result) => {
  promise.status = FULFILLED;
  promise.result = result;
};

// 状态由 pending 转为 rejected
const onRejected = (promise, result) => {
  promise.status = REJECTED;
  promise.result = result;
};

// then 方法的核心用途是，构造下一个promise的result.
FakePromise.prototype.then = function (onFulfilled, onRejected) {
  return new FakePromise((resolve, reject) => {
    const callback = { onFulfilled, onRejected, resolve, reject };
    if (this.status === PENDING) {
      this.callbacks.push(callback);
    } else {
      setTimeout(() => {
        handleCallback(callback, this.status, this.result);
      }, 0);
    }
  });
};

FakePromise.prototype.catch = function (onRejected) {
  this.then(null, onRejected);
};

FakePromise.resolve = function (val) {
  return new FakePromise(resolve => resolve(val));
};
FakePromise.reject = function (reason) {
  return new FakePromise((resolve, reject) => reject(reason));
};
// 全部都resolve才返回resolve
FakePromise.all = function (promises) {
  let results = [];
  let count = 0;
  return new FakePromise((resolve, reject) => {
    promises.forEach((promise, i) => {
      // 要用resolve包装成为promise，因为有可能传入进来的不是promise
      FakePromise.resolve(promise).then(
        res => {
          count++;
          results[i] = res;
          if (count === promises.length) {
            resolve(results);
          }
        },
        reason => {
          reject(reason);
        },
      );
    });
  });
};
// 只要有一个resolve就返回
FakePromise.race = function (promises) {
  return new FakePromise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      const promise = promises[i];
      FakePromise.resolve(promise).then(
        res => {
          return resolve(res);
        },
        reason => {
          return reject(reason);
        },
      );
    }
  });
};
