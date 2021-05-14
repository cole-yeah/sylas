/**
 * 队列(LILO: last in, last out)先进先出
 * 常见的队列方法: enqueue(element(s))
 */
const _items = Symbol('queueItems');
const _count = Symbol('queueCount');
const _lowestCount = Symbol('queueLowestCount');
class Queue {
  constructor() {
    this[_count] = 0;
    this[_lowestCount] = 0;
    this[_items] = {};
  }
  // 添加新元素
  enqueue(element) {
    this[_items][this[_count]] = element;
    this[_count]++;
  }
  // 移除队列的第一项
  dequeue() {
    if (this.isEmpty()) return undefined;
    const element = this[_items][this[_lowestCount]];
    delete this[_items][this[_lowestCount]];
    this[_lowestCount]++;
    return element;
  }
  // 返回队列第一个元素
  peek() {
    if (this.isEmpty()) return undefined;
    const element = this[_items][this[_lowestCount]];
    return element;
  }
  isEmpty() {
    return this.size() === 0;
  }
  size() {
    return this[_count] - this[_lowestCount];
  }
  clear() {
    this[_items] = {};
    this[_count] = 0;
    this[_lowestCount] = 0;
  }
}

export default Queue;

/**
 * 双端队列数据结构（deque, 或称 double-ended queue）
 * 同事遵守了先进先出和后进先出的原则，可以说它是把队列和栈相结合的一种数据结构
 */
