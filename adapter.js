const FakePromise = require('./src/pages/Api/components/Promise/dummy.js');

const resolved = value => FakePromise.resolve(value);
const rejected = reason => FakePromise.reject(reason);
const deferred = () => {
  let promise, resolve, reject;
  promise = new FakePromise(($resolve, $reject) => {
    resolve = $resolve;
    reject = $reject;
  });
  return { promise, resolve, reject };
};

module.exports = { resolved, rejected, deferred };
