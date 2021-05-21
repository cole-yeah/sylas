/**
 * 二叉搜索树 BST，最差的情况也是O(n)时间复杂度
 * 是二叉树的一种，但是只允许你在左侧点存储（比父节点）小的值，在右侧节点存储（比父节点）大的值。
 * 遍历分为：
 * - 中序：以上行顺序访问BST所有节点的遍历方式。从最小到最大的顺序访问所有节点
 * - 先序：以优先于后代节点的顺序访问每个节点（先访问节点本身，在访问左侧子节点）
 * - 后序：
 */

const Compare = {
  LESS_THAT: -1,
  BIGGER_THAN: 1,
};

const defaultCompare = (a, b) => {
  if (a === b) {
    return 0;
  }
  return a < b ? Compare.LESS_THAT : Compare.BIGGER_THAN;
};

export const printNode = value => console.log('tree print:', value);

class Node {
  constructor(key) {
    this.key = key;
    this.right = null;
    this.left = null;
  }
}

class SearchTree {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn;
    this.root = null;
  }
  // 插入新的键
  insert(key) {
    if (this.root == null) {
      this.root = new Node(key);
    } else {
      this.insertNode(this.root, key);
    }
  }
  // 插入节点
  insertNode(node, key) {
    // 如果当前key值小于节点的key值，那么往左边插入
    if (this.compareFn(key, node.key) === Compare.LESS_THAT) {
      if (node.left == null) {
        node.left = new Node(key);
      } else {
        // 递归继续执行
        this.insertNode(node.left, key);
      }
    } else {
      if (node.right == null) {
        node.right = new Node(key);
      } else {
        this.insertNode(node.right, key);
      }
    }
  }
  // 在树种查找一个键，如果节点存在，则返回true，否则返回false
  search(key) {
    return this.searchNode(this.root, key);
  }
  //
  searchNode(node, key) {
    if (node == null) {
      return false;
    }
    if (this.compareFn(key, node.key) === Compare.LESS_THAT) {
      this.searchNode(node.left, key);
    } else if (this.compareFn(key, node.key)) {
      this.searchNode(node.right, key);
    } else {
      return true;
    }
  }
  // 通过中序遍历方式遍历所有节点
  inOrderTraverse(callback) {
    this.inOrderTraverseNode(this.root, callback);
  }
  //
  inOrderTraverseNode(node, callback) {
    if (node != null) {
      this.inOrderTraverseNode(node.left, callback);
      callback(node.key);
      this.inOrderTraverseNode(node.right, callback);
    }
  }
  // 通过先序方式遍历所有节点
  preOrderTraverse(callback) {
    this.preOrderTraverseNode(this.root, callback);
  }
  //
  preOrderTraverseNode(node, callback) {
    if (node != null) {
      callback(node.key);
      this.preOrderTraverseNode(node.left, callback);
      this.preOrderTraverseNode(node.right, callback);
    }
  }
  // 通过后序方式遍历所有节点
  postOrderTraverse(callback) {
    this.postOrderTraverseNode(this.root, callback);
  }
  //
  postOrderTraverseNode(node, callback) {
    if (node != null) {
      this.postOrderTraverseNode(node.left, callback);
      this.postOrderTraverseNode(node.right, callback);
      callback(node.key);
    }
  }
  // 返回树中最小值
  min() {
    return this.minNode(this.root);
  }
  // 查找树中最小值，最左边值最小
  minNode(node) {
    let current = node;
    while (current != null && current.left != null) {
      current = current.left;
    }
    return current;
  }
  // 返回树中最大值
  max() {
    return this.maxNode(this.root);
  }
  //
  maxNode(node) {
    let current = node;
    while (current != null && current.right != null) {
      current = current.right;
    }
    return current;
  }
  // 删除树中某个值
  remove() {}
}

export default SearchTree;
