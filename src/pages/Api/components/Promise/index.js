/**
 * A+标准
 * 1. 状态只能有pending 转为 fullied 或 rejected
 * 2. then是一个函数
 */
const isFunction = fn => fn instanceof Function;
const isPromise = promise => promise instanceof Promise;
const isThenable = obj =>
  (isFunction(obj) || typeof obj === 'object') && 'then' in obj;

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function Promise(fn) {
  this.status = PENDING;
  this.result = null;
  this.callbacks = [];
  try {
    fn(this.resolve, this.reject);
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

// 处理promise
const resolvePromise = (promise, result, resolve, reject) => {
  if (promise === result) {
    const reason = new TypeError('can not fulfill promise with itself');
    return reject(reason);
  }
  if (isPromise(result)) {
    return result.then(resolve, reject);
  }
  if (isThenable(result)) {
    let then = result.then;
    if (isFunction(then)) {
      return new Promise(then.bind(result)).then(resolve, reject);
    }
  }
  resolve(result);
};

const onFulfilled = (promise, result) => {
  promise.status = FULFILLED;
  promise.result = result;
};

const onRejected = (promise, result) => {
  promise.status = REJECTED;
  promise.result = result;
};

Promise.prototype.resolve = function (val) {
  if (this.status === PENDING) {
    onFulfilled(this, val);
    resolvePromise(this, this.result, onFulfilled, onRejected);
  }
};

Promise.prototype.reject = function (reason) {
  if (this.status === PENDING) {
    onFulfilled(this, reason);
  }
};

// then 方法的核心用途是，构造下一个promise的result.
Promise.prototype.then = function (onFulfilled, onRejected) {
  return new Promise((resolve, reject) => {
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

Promise.prototype.catch = function () {};
