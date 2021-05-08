export const safeJsonString = obj => {
  const isObject = typeof obj === 'object';
  if (!isObject) return obj;
  let str = '';
  try {
    str = JSON.stringify(obj);
  } catch (err) {
    console.log('safeJsonString error', err);
  }
  return str;
};
