import LinkedList, { Node } from '../linkedList';

/**
 * 循环链表
 */

class CircularLinkedList extends LinkedList {
  // 根据下标插入元素
  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      let current = this.head;
      const node = new Node(element);
      if (index === 0) {
        if (this.head === undefined) {
          this.head = node;
          node.next = this.head;
        } else {
          this.head = node;
          node.next = current;
          const lastNode = this.getElementAt(this.count);
          lastNode.next = this.head;
        }
      } else {
        const previous = this.getElementAt(index - 1);
        current = previous.next;
        previous.next = node;
        node.next = current;
      }
      this.count++;
      return true;
    }
    return false;
  }
  // 根据下标移除元素
  removeAt(index) {
    if (index >= 0 && index <= this.count) {
      let current = this.head;
      if (index === 0) {
        if (this.count === 1) {
          this.head = undefined;
        } else {
          const removed = this.head;
          current = this.getElementAt(this.size());
          this.head = this.head.next;
          current.next = this.head;
          current = removed;
        }
      } else {
        const previous = this.getElementAt(index - 1);
        current = previous.next;
        previous.next = current.next;
      }
      this.count--;
      return current.element;
    }
  }
}

export default CircularLinkedList;
