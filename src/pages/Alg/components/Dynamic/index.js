import React, { useEffect } from 'react';
import { lcs, lcs_1, changeCoin, changeCoin_1 } from '../../dynamic';

const Dynamic = () => {
  useEffect(() => {
    const str1 = 'ABCBDAB';
    const str2 = 'BDCABA';
    // const val = changeCoin(6);
    changeCoin_1(17);
    lcs(str1, str2);
    lcs_1(str1, str2);
  }, []);
  return <div>dynamic</div>;
};

export default Dynamic;
