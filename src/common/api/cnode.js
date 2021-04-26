import { isProdEnv } from 'common/constants';
const BASE_URI = `${isProdEnv ? '' : '/cnodeApi'}/api/v1`;
const api = {
  topics: `${BASE_URI}/topics`,
};

export default api;
