import React from 'react';

/**
 * 继承
 */
function Parent() {
  this.name = 'parent';
  this.friends = ['1', '2', '3'];
}
Parent.prototype.getName = function () {
  console.log(this.name);
};

/**
 * 第一种 原型链继承
 * 优点：
 *  -
 */
function Child() {}

Child.prototype = new Parent();
var child1 = new Child();
child1.name = 'xiao ming';
child1.friends.push('4');
var child2 = new Child();
child1.name; // parent
child1.friends; // ['1', '2', '3', '4']

// 第二种 借用构造函数
function Child2(...rest) {
  Parent.call(this, ...rest);
}

const ExtendsComponent = () => {
  return <div>ExtendsComponent</div>;
};

export default ExtendsComponent;
