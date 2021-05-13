/**
 * 栈
 * 栈是这一种遵从后进先出（LIFO）原则的有序集合。
 * 新添加或待删除的元素都保存在栈的同一端，称作栈顶，另一端称为栈底
 * 在栈里，新元素都靠近栈顶，旧元素都接近栈底。
 *
 * 栈通用被用在编程语言的编译器和内存中保存变量、方法调用等，也被用于浏览器历史记录
 *
 * 栈一些方法：push、pop、peek isEmpty clear size
 *
 * *** 通用的做法是使用一个数组来存储元素，但是在处理大量数据的时候，大部分方法的复杂度是O(n)
 * *** O(n)的意思是我们需要迭代整个数组直到找到那个元素，最坏的情况下是迭代数组所有的元素
 * *** 另外数组是有序集合，为了保证元素排列有序，会占用更多的内存空间
 */
class Stack {
  constructor() {
    this.items = [];
  }
  push(element) {
    this.items.push(element);
  }
  pop() {
    return this.items.pop();
  }
  // 返回栈顶元素
  peek() {
    return this.items[this.size() - 1];
  }
  isEmpty() {
    return this.size() === 0;
  }
  clear() {
    this.items = [];
  }
  size() {
    return this.items.length();
  }
}

export default Stack;
