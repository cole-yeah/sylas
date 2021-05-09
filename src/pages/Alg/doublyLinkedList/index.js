import LinkedList, { Node, equalFn } from '../linkedList';

/**
 * 双向链表
 * 双向链表提供了两种迭代的方法：从头到尾，或者从尾到头。
 * 在单向链表中，如果迭代时错过了要找的元素，就需要回到起点，重新开始迭代
 * 双向链表既可以从头部开始迭代，也可以从尾部开始迭代
 */

class DoulyNode extends Node {
  constructor(element, next) {
    super(element, next);
    this.prev = undefined;
  }
}

class DoublyLinkedList extends LinkedList {
  constructor(props) {
    super(props);
    this.tail = undefined;
  }
  // 插入节点
  insert(element, index = 0) {
    if (index >= 0 && index <= this.count) {
      const node = new DoulyNode(element);
      let current = this.head;
      if (index === 0) {
        // 如果链表暂没有元素，那么新增的这个节点既是head也是tail
        if (this.head === undefined) {
          this.head = node;
          this.tail = node;
        } else {
          node.next = this.head;
          current.prev = node;
          this.head = node;
        }
        // 如果在最后位置插入节点
      } else if (index === this.count) {
        current = this.tail;
        current.next = node;
        node.prev = current;
        this.tail = node;
        // 在中间位置插入节点
      } else {
        // 获取插入位置前一个节点
        const previous = this.getElementAt(index - 1);
        current = previous.next;
        node.next = current;
        previous.next = node;
        current.prev = node;
        node.prev = previous;
      }
      this.count++;
      return true;
    }
    return false;
  }
  /**
   * 根据下标删除元素
   * 有三种情况，从头部、中间和尾部位置移除元素。
   */
  removeAt(index) {
    if (index >= 0 && index < this.count) {
      let current = this.head;
      if (index === 0) {
        this.head = current.next;
        if (this.count === 1) {
          this.tail = undefined;
        } else {
          this.head.prev = undefined;
        }
        // 最后一项
      } else if (index === this.count - 1) {
        current = this.tail;
        this.tail = current.prev;
        this.tail.next = undefined;
      } else {
        current = this.getElementAt(index);
        const previous = current.prev;
        previous.next = current.next;
        current.prev = previous;
      }
      this.count--;
      return current.element;
    }
  }
}

export default DoublyLinkedList;
