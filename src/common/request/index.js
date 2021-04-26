import iFetch from 'isomorphic-fetch';

const GET_METHOD = 'GET';
const POST_METHOD = 'POST';
const PUT_METHOD = 'PUT';
const DELETE_METHOD = 'DELETE';

const baseFetch = (url, config) => {
  return iFetch(url, {
    method: '',
  });
};

const get = (url, config = {}) => {
  return baseFetch(url, {
    ...config,
    method: GET_METHOD,
  });
};

export { get };
