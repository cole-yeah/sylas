const compose = middlewares => {
  return (ctx, next) => {
    next();
  };
};

export default compose;

const m1 = (ctx, next) => {
  console.log('-- m1 start --');
  setTimeout(() => {
    console.log('-- m1 end --');
  }, 1000);
};

const m2 = (ctx, next) => {
  console.log('-- m22 start --');
  setTimeout(() => {
    console.log('-- m22 end --');
  }, 1000);
};

const m3 = (ctx, next) => {
  console.log('-- m333 start --');
  setTimeout(() => {
    console.log('-- m333 end --');
  }, 1000);
};

compose([m1, m2, m3]);
