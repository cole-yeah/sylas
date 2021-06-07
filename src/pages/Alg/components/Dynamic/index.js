import React, { useEffect } from 'react';
import { lcs } from '../../dynamic';

const Dynamic = () => {
  useEffect(() => {
    const str1 = 'ABCBDAB';
    const str2 = 'BDCABA';
    const val = lcs(str1, str2);
    console.log('xxxxx22222', val);
  }, []);
  return <div>dynamic</div>;
};

export default Dynamic;
