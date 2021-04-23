const isObject = obj =>
  Object.prototype.toString.call(obj) === '[object Object]';

// 浅拷贝
const shallowCopy = data => {
  return Array.isArray(data) ? [...data] : { ...data };
};

// 创建代理对象
const createProxy = (target, opts) => new Proxy(target, opts);

export const produce = (target, cb = () => {}) => {
  const copies = new Map(); // 存储修改的值
  const proxies = new Map(); // 缓存创建过的proxy实例

  const opts = {
    get(target, propKey) {
      const val = target[propKey];
      // 非对象创建不了proxy实例
      if (!isObject(val)) return val;
      if (proxies.has(val)) {
        return proxies.get(val);
      }
      const proxy = createProxy(val, opts);
      proxies.set(val, proxy);
      return proxy;
    },
    set(target, propKey, value) {
      const copy = shallowCopy(target);
      copy[propKey] = value;
      // 存储当前更改的值
      copies.set(target, copy);
      return true;
    },
  };

  /**
   * 当set的对象层级超过一层时，需要递归来处理修改过的对象的值。
   * 只做简单的对象处理，数组等暂不处理
   * @param {any} state 传入对象
   * @returns any
   */
  function finalize(state) {
    // 基线条件，为非对象时，直接返回结果，不需处理。
    if (!isObject(state)) return state;
    // 如果在copies中有值，说明被修改过，那么直接返回修改过的这个值，否则继续执行
    if (copies.has(state)) {
      // 因为是map数据结构，以对象作为key值，所以如果改对象下的等于或大于两个值的时候，实际上只会修改到一个值。
      // 如 var obj = { a: { aa: { aaa: 111 } }, b: 2 }; produce(obj, draft => { draft.a.aa.aaa = 10; draft.b = 12 }); 实际上只会变成 { a: { aa: { aaa: 111 } }, b: 12 }
      // 所以需要加上这个递归，对其子级对象进行遍历
      const copyState = copies.get(state);
      return finalize(copyState);
    }
    // 拷贝，不在原对象上修改
    const result = shallowCopy(state);
    Object.keys(state).forEach(key => {
      result[key] = finalize(state[key]);
    });
    return result;
  }

  // 创建 proxy 实例，并在callback函数中返回，给外部直接在proxy实例上修改
  const proxy = createProxy(target, opts);
  cb(proxy);
  // 返回处理过的对象值
  return finalize(target);
};
