import React, { useEffect } from 'react';
import TreeClass, { printNode } from '../../tree/searchTree';

const tree = new TreeClass();
const ary = [11, 7, 15, 5, 3, 9, 8, 10, 13, 12, 14, 20, 18, 25];
const Tree = () => {
  useEffect(() => {
    ary.forEach(item => {
      tree.insert(item);
    });
    // 中序遍历
    tree.inOrderTraverse(printNode);
    // 先序遍历
    tree.preOrderTraverse(printNode);
    // 后序遍历
    tree.postOrderTraverse(printNode);

    console.log(tree.min(), tree.max(), 'tree ....');
  }, []);
  return <div>Tree component</div>;
};

export default Tree;
