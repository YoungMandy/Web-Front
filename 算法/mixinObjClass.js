// // // 面向类的设计模式 : 实例化(instantiation)、继承(inheritance)、相对多态(polymorphism)

// // // 类的另一个核心概念是多态，这个概念是说父类的通用行为可以被子类用更特殊的行为重写。实际上，相对多态性允许我们从重写行为中引用基础行为。

// // //类理论强烈建议父类和子类使用相同的方法来表示特定的行为，从而让子类重写父类。我们之后可以看到，在JavaScript 代码中这样做会降低代码的可读性和健壮性


// // // 类并不是必须的编程基础，而是一种可选的代码抽象。有些语言(比如Java)并不会给你选择的机会，类并不是可选的——万物皆是类。其他语言(比如C/C++或者PHP)会提供过程化和面向类两种语法，开发者可以选择其中一种风格或者混用两种风格。



// // //JavaScript只有一些近似类的语法元素(比如 new 和instanceof ),其他语言的类和JavaScript中的类并不一样。在软件设计中，类是一种可选的设计模式，你需要自己决定是否在JavaScript中使用它。


// // // 这个对象就是类中描述的所有特性的一个副本
// // // 你通常不会使用一个实例对象来直接访问并操作它的类，不过至少可以判断出这个实例对象来着哪个类。


// // // 类实例是由一个特殊的类方法构造的，这个方法名通常和类相同，被称为构造函数，这个方法的任务就是初始化实例需要的所有信息

// // // 构造函数会返回一个对象(也就是类的一个实例)。构造函数大多数需要用new 来调用，这样语言引擎才知道你想要构造一个新的类实例。

// // // 子类会包含父类行为的原始副本，但是也可以重写所有的行为甚至定义新行为。

// // // JavaScript中父类和子类的关系只存在于两者构造函数对应的.prototype对象中，因此它们的构造函数之间并不存在直接联系，从而无法简单地实现两者的相对引用(ES6中可以通过super来解决这个问题)

// // // 在子类(而不是它们创建的实例对象！)中也可以相对引用它继承的父类，这种相对引用通常被称为super.


// // // 多态并不表示子类和父类有关联，子类得到的只是父类的一份副本。类的继承其实就是复制。

// // //JavaScript 本身并不提供“多重继承”功能。许多人认为这是件好事，因为使用多重继承的代价太高。然而这无法阻挡开发者们的热情，他们会尝试各种各样的方法来实现多重继承。


// // // 在继承或者实例化时，JavaScript的对象机制并不会自动执行复制行为。简单来说，JavaScript中只有对象，并不存在可以被实例化的"类"。一个对象并不会被复制到其他对象，它们会被关联起来。


// // // 由于在其他语言中类表现出来的都是复制行为，因此JavaScript开发者也想出了一个方法来模拟类的复制行为，这个方法就是混入，混入分为显式和隐式。


// // // 由于JavaScript不会自动实现Vehicle到Car的复制行为，所以我们需要手动实现复制功能。这个功能在许多库和框架中被称为extend(..),但是为了方便理解我们称之为mixin(..)

// // // function mixin (sourceObj, targetObj)
// // // {
// // //   for (var key in sourceObj)
// // //   {
// // //     if (!(key in targetObj))
// // //     {
// // //       console.log('key',key)
// // //       targetObj[key] = sourceObj[key];
// // //     }
// // //   }
// // //   return targetObj;
// // // }

// // // var Vehicle = {
// // //   engines: 1,
// // //   ignition: function()
// // //   {
// // //     console.log("Turning on my engine.")
// // //   },
// // //   drive: function()
// // //   {
// // //     this.ignition();
// // //     console.log("Steering and moving forward")
// // //   }
// // // }

// // // var Car = mixin(Vehicle, {
// // //   wheels: 4,
// // //   drive: function () {
// // //     Vehicle.drive.call(this);
// // //     console.log('Rolling on all ' + this.wheels + ' wheels!');
// // //   },
// // // });

// // // console.log(Object.keys(Car))

// // // Car.drive()

// // // 从技术角度看，函数实际上没有被复制，复制的是函数引用


// // //JavaScript中的函数无法(用标准、可靠的方法)真正地复制，所以你只能复制对共享函数对象的引用

// // // 显式混入是JavaScript中一个很棒的机制，不过它的功能也没有看起来那么强大。虽然它可以把一个对象的属性复制到另一个对象中，但是这其实不能带来多大的好处，无非就是少定义几条语句，而且还会带来对象引用的问题。


// // // 如果你向目标对象中显式混入超过一个对象，就可以部分模仿多重继承行为，但是仍没有方式来处理函数和属性的同名问题。


// // // 显式混入模式的一种变体被称为"寄生继承"，它即是显性的又是隐性的


// // // 传统的JavaScript 类 Vehicle
// // function Vehicle ()
// // {
// //   this.engines = 1;
// // }


// // Vehicle.prototype.ignition = function()
// // {
// //   console.log("Turning on my engine")
// // }

// // Vehicle.prototype.drive = function()
// // {
// //   this.ignition();
// //   console.log("Steering and moving forward")
// // }

// // // 寄生类 Car
// // function Car ()
// // {
// //   //首先，car是一个Vehicle
// //   var car = new Vehicle();

// //   // 接着我们对car进行定制
// //   car.wheels = 4;

// //   // 保存到Vehicle.drive()的特殊引用
// //   var veDrive = car.drive;


// //   //重写Vehicle.drive()
// //   car.drive = function()
// //   {
// //     veDrive.call(this);
// //     console.log("Rolling on all " + this.wheels + " wheels!")
// //   }

// //   return car;
// // }

// // var myCar = new Car();
// // myCar.drive();


// var Something = {
//   cool: function()
//   {
//     this.greeting = "Hello World";
//     this.count = this.count ? this.count + 1 : 1;
//   }
// }

// Something.cool();
// console.log(Something.greeting);
// console.log(Something.count);

// var Another = {
//   cool: function()
//   {
//     //隐式把Something 混入Another
//     Something.cool.call(this);
  
//   }
// }

// Another.cool();
// console.log('Another.greeting', Another.greeting);
// console.log('Another.count', Another.count);
// Another.cool();
// console.log('Something.count', Something.count);
// console.log('Another.count', Another.count);

// 类是一种设计模式，类意味着复制。传统的类在被实例化时，他的行为也会被复制到实例中。类在被继承使，行为也会被复制到子类中。