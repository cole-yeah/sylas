import React, { useEffect } from 'react';
import { quickSort } from '../../sort/quickSort';

const Tree = () => {
  useEffect(() => {
    const a = [11, 7, 15, 5, 3, 6, 9];

    quickSort(a);
  }, []);
  return <div>Sort component</div>;
};

export default Tree;
