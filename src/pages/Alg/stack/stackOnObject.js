/**
 * 栈
 * 使用对象的方法来实现
 * 对象能直接获取元素，占用更少的内存空间
 *
 * 栈常用方法: push pop peek size isEmpty clear
 */

/**
 * 保护数据结构内部元素
 * 1. ES2015新增了一种Symbol基本类型，它是不可变的，可以用作对象的属性
 * 2. 用ES2015的WeakMap实现类
 */
const _items = Symbol('stackItems');
const _count = Symbol('stackCount');

class Stack {
  constructor() {
    this[_items] = {};
    this[_count] = 0;
  }
  push(element) {
    this[_items][this[_count]] = element;
    this[_count]++;
  }
  pop() {
    if (this[_count] <= 0) return undefined;
    const key = this[_count] - 1;
    const element = this[_items][key];
    delete this[_items][key];
    this[_count]--;
    return element;
  }
  peek() {
    if (this[_count] <= 0) return undefined;
    const key = this[_count] - 1;
    const element = this[_items][key];
    return element;
  }
  size() {
    return this[_count];
  }
  isEmpty() {
    return this[_count] === 0;
  }
  clear() {
    this[_items] = {};
  }
}

export default Stack;
