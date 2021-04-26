import React, { useEffect } from 'react';
import cnodeService from 'common/service/cnode';

const Main = () => {
  useEffect(() => {
    cnodeService.topics().then(res => {
      console.log('====', res);
    });
  }, []);
  return <div>890</div>;
};

export default Main;
