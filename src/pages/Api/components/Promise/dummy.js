// 之前做过一版，但是更多的是参考，现在再试一遍。

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

const FUNCTION_KEY = '[object Function]';
const isObject = obj => typeof obj === 'object';
const isFunction = fn => Object.prototype.toString.apply(fn) === FUNCTION_KEY;
const isPromise = promise =>
  isObject(promise) && isFunction(promise.then) && isFunction(promise.catch);
const isThenable = obj => (isFunction(obj) || isObject(obj)) && 'then' in obj;

function FakePromise(fn) {
  if (!isFunction(fn)) {
    throw 'Promise resolver fn is not a function';
  }
  this.status = PENDING;
  this.result = null;
  this.callbacks = [];

  const onFulfilled = result => transition(this, result, FULFILLED);
  const onRejected = result => transition(this, result, REJECTED);
  let ignore = false;
  const resolve = result => {
    if (ignore) return;
    ignore = true;
    if (this.status === PENDING) {
      onFulfilled(result);
      resolvePromise(this, result);
    }
  };
  const reject = result => {
    if (ignore) return;
    ignore = true;
    if (this.status === PENDING) {
      onRejected(result);
      this.result = result;
    }
  };
  fn(resolve, reject);
}

// 状态流转
const transition = (promise, result, status) => {
  if (promise.status !== PENDING) return;
  promise.result = result;
  promise.status = status;

  handleCallbacks(promise.callbacks, status, result);
};

const handleCallback = (cbObj, status, result) => {
  const { onFulfilled, onRejected, resolve, reject } = cbObj;
  if (status === FULFILLED) {
    const params = isFunction(onFulfilled) ? onFulfilled(result) : result;
    resolve(params);
  } else if (status === REJECTED) {
    const params = isFunction(onRejected) ? onRejected(result) : result;
    reject(params);
  }
};

const handleCallbacks = (callbacks, status, result) => {
  // 用定时器模拟异步
  setTimeout(() => {
    while (callbacks.length) {
      const callback = callbacks.shift();
      handleCallback(callback, status, result);
    }
  }, 0);
};

// 针对resolve传入promise做处理
const resolvePromise = (promise, result, resolve, reject) => {
  // 防止result和promise是同一个
  if (promise === result) {
    const reason = new TypeError('can not fulfill promise width');
    return reject(reason);
  }
  if (isPromise(result)) {
    return result.then(resolve, reject);
  }
  if (isThenable(result)) {
    const then = result.then;
    if (isFunction(then)) {
      return new Promise(then.bind(result)).then(resolve, reject);
    }
  }
};

// 实例化后的API
// then既可处理函数也可处理非函数
FakePromise.prototype.then = function (onFulfilled, onRejected) {
  return new FakePromise((resolve, reject) => {
    const cbObj = {
      onFulfilled,
      onRejected,
      resolve,
      reject,
    };

    this.callbacks.push(cbObj);
    this.status === PENDING &&
      handleCallbacks(this.callbacks, this.status, this.result);
  });
};
FakePromise.prototype.catch = function (fn) {
  return this.then(null, fn);
};

// 函数上的API
FakePromise.resolve = function (result) {
  return new FakePromise(resolve => resolve(result));
};
FakePromise.reject = function (result) {
  return new FakePromise((_, reject) => reject(result));
};
// FakePromise.all = function () {};
// FakePromise.race = function () {};

module.exports = FakePromise;
