export const Compare = {
  LESS_THAT: -1,
  BIGGER_THAN: 1,
};

export const defaultCompare = (a, b) => {
  if (a === b) {
    return 0;
  }
  return a < b ? Compare.LESS_THAT : Compare.BIGGER_THAN;
};
