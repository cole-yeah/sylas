import React, { useEffect, useState } from 'react';
import useLog from '@/common/hooks/useLog';
import LinkedList from '../../linkedList';
import DoublyLinkedList from '../../doublyLinkedList';

const linkList = new LinkedList();
const doublyLinkedList = new DoublyLinkedList();

const LinkedListView = () => {
  const [count, setCount] = useState(0);
  const [logFn, LogView] = useLog();

  useEffect(() => {
    logFn('-----', linkList, doublyLinkedList);
  }, [count, logFn]);

  const pushEle = () => {
    linkList.push(`val:${count}`);
    doublyLinkedList.insert(`doubly val: ${count}`);
    setCount(prev => prev + 1);
  };
  return (
    <div className="baseCard">
      <div className="p20">
        <div className="baseBtn" onClick={pushEle}>
          下一个添加元素: {count}
        </div>
      </div>
      <LogView />
    </div>
  );
};

export default LinkedListView;
