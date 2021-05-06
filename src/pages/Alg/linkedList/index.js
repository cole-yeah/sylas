const equalFn = (a, b) => {
  return a === b;
};

class Node {
  constructor(element) {
    this.element = element;
    this.next = undefined;
  }
}

class LinkList {
  constructor() {
    this.count = 0;
    this.head = undefined;
    this.equalFn = equalFn;
  }
  // 在最后的位置添加元素
  push(element) {
    const node = new Node(element);
    let current;
    if (this.head === undefined) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next !== undefined) {
        current = current.next;
      }
      // 将其next赋为新元素，建立链接
      current.next = node;
    }
    this.count++;
  }
  // 在任意位置插入元素
  insert(element, index) {
    const node = new Node(element);
    if (index === 0) {
      node.next = this.head;
      this.head = node;
    } else if (index >= this.count) {
      this.push(element);
    } else {
      const previous = this.getElementAt(index - 1);
      const current = previous.next;
      node.next = current;
      previous.next = node;
    }
    this.count++;
    return true;
  }
  remove() {}
  // 根据元素查找下标
  indexOf(element) {
    let index = 0;
    let current = this.head;
    while (current.next) {
      if (this.equalFn(current, element)) {
        return index;
      }
      index++;
      current = current.next;
    }
    return -1;
  }
  // 根据下标删除元素
  removeAt(index) {
    if (index >= 0 && index <= this.count) {
      let current = this.head;
      if (index === 0) {
        this.head = current.next;
      } else {
        let previous;
        // 因为链表没办法根据下表直接找到对应元素，只能从头开始遍历
        for (let i = 0; i < index; i++) {
          previous = current;
          current = current.next;
        }
        // 将previous与current的下一项链接起来，跳过current，从而达到删除目的。
        // 这样current不再被引用，被丢弃在计算机内存中，等待垃圾回收器清除
        previous.next = current.next;
      }
      this.count--;
      return current.element;
    }
  }
  isEmpty() {
    return this.count === 0;
  }
  size() {
    return this.count;
  }
  getElementAt(index) {
    if (index >= 0 && index <= this.count) {
      let current = this.head;
      for (let i = 0; i < index && current != null; i++) {
        current = current.next;
      }
      return current;
    }
  }
  getHead() {
    return this.head;
  }
}

export default LinkList;
