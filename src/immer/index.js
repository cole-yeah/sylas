const handler = () => {
  return {
    get(target) {},
    set() {},
  };
};

const produce = (target, fn) => {
  const proxy = new Proxy(target, handler);
};
