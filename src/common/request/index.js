import fetch from 'isomorphic-fetch';
import compose from './compose';

const GET_METHOD = 'GET';
const POST_METHOD = 'POST';
const PUT_METHOD = 'PUT';
const DELETE_METHOD = 'DELETE';

const JSON_REQ_TYPE = 'json';
const FORM_REQ_TYPE = 'form';

const contentTypeMap = new Map([
  [JSON_REQ_TYPE, 'application/json;charset=UTF-8'],
  [FORM_REQ_TYPE, 'application/x-www-form-urlencoded;charset=UTF-8'],
]);

const baseFetchMiddleware = (ctx, next) => {};

const jsonMiddleware = async (ctx, next) => {
  const res = await next();
  return res;
};

const errorCatchMiddleware = () => {};

const composeMiddleware = compose([jsonMiddleware, errorCatchMiddleware]);

// composeMiddleware({ url,  }, () => {
//   return fetch(url)
// })

const baseFetch = (url, config = {}) => {
  const { method = GET_METHOD } = config;
  return fetch(url, {
    method,
  }).then(res => res.json());
};

const get = (url, config = {}) => {
  return baseFetch(url, {
    ...config,
    method: GET_METHOD,
  });
};

const post = (url, config = {}) => {
  const { reqType = JSON_REQ_TYPE } = config;
  return baseFetch(url, {
    method: POST_METHOD,
    'Content-Type': contentTypeMap.get(reqType),
  });
};

export { get, post };
