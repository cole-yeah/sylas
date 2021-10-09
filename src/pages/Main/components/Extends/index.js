// 继承的几种方式

// 基本的父类
function Animal(name) {
  this.name = name;
  this.getName = function () {
    return this.name;
  };
}

Animal.prototype.type = 'animal';

//
function Person() {
  this.name = 'cole';
}

const cole = new Person();

console.log('log info:', cole);
