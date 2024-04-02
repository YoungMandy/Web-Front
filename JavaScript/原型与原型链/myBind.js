Function.prototype.bind2 = function (context) {
  let self = this; // 存放当前函数的this
  let args = [...arguments].slice(1); // 取1及后面的数
  let fBound = function (...rest) {
    return self.apply(
      this instanceof fBound ? this : context,
      args.concat(rest)
    );
  };

  Object.setPrototypeOf(fBound, this.prototype);

  return fBound;
};

var name = 'Jack';
var Yve = {
  name: 'Yvette',
};

function person(age, job, gender) {
  console.log(this.name, age, job, gender);
}

var bindYve = person.bind2(Yve, 22, 'enginner');

let obj = new bindYve('female');
obj.name = '222';

//返回函数的原型新增一个方法
person.prototype.clickLike = function () {
  console.log(this.name, this.age, this.job, this.gender);
};
// bindYve.prototype.clickLike(); // 下次一定

// // 绑定函数的原型也有了这个方法
// person.prototype.clickLike(); // 下次一定

bindYve.clickLike();
