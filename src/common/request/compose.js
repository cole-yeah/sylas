const compose = middlewares => {
  return (ctx, next) => {
    let index = -1;
    const dispatch = i => {
      if (i <= index) return Promise.reject(new Error(''));
      index = i;
      let fn = middlewares[i];
      if (i === middlewares.length) fn = next;
      try {
        return Promise.resolve(
          fn(ctx, function next() {
            return dispatch(i + 1);
          }),
        );
      } catch (err) {
        return Promise.reject(err);
      }
    };
    return dispatch(0);
  };
};

export default compose;
