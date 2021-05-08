import LinkedList, { Node, equalFn } from '../linkedList';

/**
 * 双向链表
 * 双向链表提供了两种迭代的方法：从头到尾，或者从尾到头。
 * 在单向链表中，如果迭代时错过了要找的元素，就需要回到起点，重新开始迭代
 */

class DoulyNode extends Node {
  constructor(element, next, prev) {
    super(element, next);
    this.prev = prev;
  }
}

class DoublyLinkedList extends LinkedList {
  constructor(props) {
    super(props);
    this.tail = undefined;
  }
  // 插入节点
  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new DoulyNode(element);
      if (index === 0) {
        this.head = node;
        this.tail = node;
      } else {
      }
    }
  }
}
