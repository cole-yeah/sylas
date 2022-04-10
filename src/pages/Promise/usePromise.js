//手写promise并发一次只能三个请求，尽可能快执行，返回一个promise，包含返回结果
const promiseLimit = (promises, limit = 3) => {
  let index = 0;
  let res = [];
  let pending = [];

  const enqueue = function () {
    // 边界处理
    if (index >= promises.length) {
      return Promise.resolve();
    }
    const p = promises[index++](index);
    // 当前promise插入数组内
    res.push(p);
    pending.push(p);
    // promise执行完毕，从pending数组中删除
    p.then(() => {
      pending.splice(pending.indexOf(p), 1);
    });
    // 当前请求promise队列小于限制数量时
    let r = Promise.resolve();
    if (pending.length >= limit) {
      r = Promise.race(pending);
    }
    // 递归，直到遍历完promises
    return r.then(() => enqueue());
  };
  // 执行完返回全部结果
  return enqueue().then(() => Promise.all(res));
};

const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const fakePromise = index => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('xxxxxxxxxxxxxxxxxxxxx====', index);
      resolve(index);
    }, random(1, 3) * 500);
  });
};

const arr = Array.from({ length: 20 }).map((_, i) => fakePromise);

// promiseLimit(arr, 3).then(res => {
//   console.log('xxxxxxxxxxxxx', res);
// });

// es7 写法，不用递归，更优雅些
const asyncPool = async (limit, promiseFns) => {
  let running = [];
  let ret = [];
  for (let fn of promiseFns) {
    const p = fn();
    ret.push(p);
    // 只有限制条件小于数组长度时，才需要
    if (limit <= promiseFns.length) {
      p.then(() => {
        const index = running.indexOf(p);
        running.splice(index, 1);
      });
      running.push(p);
      if (running.length >= limit) {
        // 这个是关键啊！递归变遍历全靠这个！！牛逼
        await Promise.race(running);
      }
    }
  }
  return Promise.all(ret);
};

asyncPool(4, arr).then(res => {
  console.log('xxxxxxxxxxxxx', res);
});

Promise.selfAll = promises => {
  let count = 0;
  let res = [];
  for (let p of promises) {
    Promise.resolve(p).then(data => {
      res.push();
    });
  }
  return Promise.resolve(res);
  // return new Promise()
};
