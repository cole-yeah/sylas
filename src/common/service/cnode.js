import { get } from 'common/request';
import cnodeApi from 'common/api/cnode';

const cnodeService = {
  topics: () => get(cnodeApi.topics),
};

export default cnodeService;
