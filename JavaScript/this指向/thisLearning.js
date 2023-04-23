var bar = {
  myName: '张三',
  printName: function () {
    console.log(this.myName);// 这里加个this
  },
};
const b = {
  myName: '李四',
};
bar.printName.call(b); // 李四，call绑定优先级高于对象调用

let myName = "王五"

function foo(myName){
  this.myName = myName;
}

const newObj = new foo('张六');
console.log(newObj.myName); // 张六

