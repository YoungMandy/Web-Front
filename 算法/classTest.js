// class Father{
//   constructor () {
    
//   }

//   // static 定义的方法只能在类本身(包含子类)调用
//   static hello () {
//     console.log("Hello");
//     this.niubi();
//   }

//   static niubi () {
//     console.log("niubi");
//   }

//   sayHi () {
//     console.log("Hi");
//   }

//   get a () {
//     return this._a;
//   }
//   set a (val) {
//     this._a = val
//   }
// }

// class Child extends Father{
//   constructor () {
//     super();
//   }

//   static change () {
//     // super.sayHi();
//     super.niubi();
//   }
// }

// let test1 = new Child();
// test1.a = 2;
// console.log(test1.a);

// // test1.hello();
// // Father.hello();

// // Child.niubi();

// Child.change();

class Polygon {
  constructor (height, width) {
    this.name = "Rectangle";
    this.height = height;
    this.width = width;
  }

  static logNbSides () {
    console.log('I have 4 sides');
  }

  sayName () {
    console.log('Hi, I am ',this.name);
  }

  get area () {
    return this.height * this.width;
  }

  set area (val) {
    this._area = val
  }
 
}

class Square extends Polygon {
  constructor (length) {
    super(length, length);

    this.name = "Square"
  }

  static logDescription () {
    return super.logNbSides();
  }
}

const square = new Square(120);
Square.logDescription();