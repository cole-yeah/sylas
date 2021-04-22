/**
 * base use
 * import { produce } from 'immer'
 * const [state, setState] = useState({a: { aa: 3 }, b: 2});
 * const newState = produce(state, (draft) => {
 *  draft.a.aa = 90
 * })
 * setState(newState)
 */

//
const shallowCopy = data => {
  return Array.isArray(data) ? [...data] : { ...data };
};

const createProxy = (target, opts) => new Proxy(target, opts);

export const produce = (target, cb = () => {}) => {
  let obj = {};
  const opts = {
    get(target, propKey) {
      // const data = target[propKey];
      // if (typeof data === 'object') {
      //   createProxy(data, opts);
      // }
      return Reflect.get(target, propKey);
    },
    set(target, propKey, value) {
      // const data = target[propKey];
      // if (typeof data === 'object') {
      //   createProxy(data, opts);
      // }
      obj = shallowCopy(target);
      obj[propKey] = value;
      return true;
    },
  };
  const proxy = createProxy(target, opts);
  cb(proxy);
  return obj;
};
