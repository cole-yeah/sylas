/**
 * A+标准
 * 1. 状态只能有pending 转为 fullied 或 rejected
 * 2. then是一个函数
 */

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function Promise(fn) {
  this.status = PENDING;
  this.value = null;
  this.callbacks = [];
  try {
    fn(this.resolve, this.reject);
  } catch (err) {
    console.log(err);
  }
}

Promise.prototype.resolve = function (val) {
  if (this.status === PENDING) {
    this.status = FULFILLED;
    this.value = val;
    // const callback = { value:  }
  }
};

Promise.prototype.reject = function (reason) {
  if (this.status === PENDING) {
    this.status = REJECTED;
    this.value = reason;
  }
};

Promise.prototype.then = function (resolve, reject) {
  return new Promise((resolve, reject) => {
    if (this.status === FULFILLED) {
      resolve(this.value);
    } else if (this.status === REJECTED) {
      reject();
    } else {
    }
  });
};

Promise.prototype.catch = function () {};

/**
 * Promise 大概用法
 * let p = new Promise((resolve, reject) => {
 *  resolve(1)
 * })
 * p.then(res => console.log(res))  // 1;
 *
 * Promise.resolve(1).then(res => console.log(res)) // 1;
 */

// class Promise {
//   constructor(fn) {
//     this.status = PENDING;
//     this.value = null;
//     this.callbacks = [];
//     try {
//       fn(this.onResovle, this.onReject);
//     } catch (err) {
//       console.log('err', err);
//     }
//   }
//   onResovle(val) {
//     if (this.status === PENDING) {
//       this.value = val;
//       this.status = FULFILLED;
//     }
//   }
//   onReject(err) {
//     if (this.status === PENDING) {
//       this.value = err;
//       this.status = REJECTED;
//     }
//   }
//   then(onResovle, onReject) {
//     return new Promise((resolve, reject) => {

//     })
//   }
//   catch(err) {
//     return err;
//   }
// }
