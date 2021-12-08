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
    const p = promises[index++]();
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

const fakePromise = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      const num = Math.random();
      resolve(num);
    }, 2000);
  });
};

const arr = Array.from({ length: 20 }).map(() => fakePromise);

promiseLimit(arr, 3).then(res => {
  console.log('xxxxxxxxxxxxx', res);
});

// console.log('xxxxxx', );
