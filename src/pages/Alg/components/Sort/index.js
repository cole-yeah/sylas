import React, { useEffect } from 'react';
import { quickSort } from '../../sort/quickSort';
import mergeSort from '../../sort/mergeSort';

const Tree = () => {
  useEffect(() => {
    const a = [11, 7, 15, 5, 3, 6, 9];

    // quickSort(a);
    const b = mergeSort(a);
    console.log('xxxxxxxxxxx', b);
  }, []);
  return <div>Sort component</div>;
};

export default Tree;
