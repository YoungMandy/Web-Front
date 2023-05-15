// let x: [string, number];

// x = ["hello", 10];

// enum Color {Red = 1, Green, Blue}
// let colorName: string = Color[2];

// console.log(colorName) // 显示'Green'因为上面代码里它的值是2

// 探索接口
function printLabel (labelledObj: { label: string }) {
  console.log(labelledObj.label);
}

let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);

interface LabelledValue {
  label: string;
}

// 可选属性会加个？号
interface SquareConfig {
  color?: string;
  width: number;
}

interface Point {
  readonly x: number;
  readonly y: number;
}

let p1: Point = { x: 10, y: 20 };
// p1.x = 5;// Cannot assign to 'x' because it is a read-only property.

let a:number[] = [1,2,3,4];
let ro: ReadonlyArray<number> = a;
// ro[0] = 12;// error
// ro.push(5);// error
// ro.length = 100;// error
// a = ro;// error
a = ro as number[];


class Greeter {
  static standardGreeting = 'Hello, there';
  greeting: string = 'Hello, there';
  greet() {
    if (this.greeting) {
      return 'Hello, ' + this.greeting;
    } else {
      return Greeter.standardGreeting;
    }
  }
}

let greeter1: Greeter;
greeter1 = new Greeter();
console.log(greeter1.greet());

let greeterMaker: typeof Greeter = Greeter;
greeterMaker.standardGreeting = 'Hey there!';

let greeter2: Greeter = new greeterMaker();
console.log(greeter2.greet());

function buildName (firstName: string, ...restOfName: string[]) {
  console.log(JSON.stringify(restOfName));
  return firstName + ' ' + restOfName.join(' ');
}

let employeeName = buildName('Joseph', 'Samuel', 'Lucas', 'MacKinzie');

// function getProperty(obj: T, key: K) {
//   return obj[key];
// }
// let x = { a: 1, b: 2, c: 3, d: 4 };
// getProperty(x, a);
// getProperty(x, m);

 enum NumericEnum  {
  grey = 'GREY',
  blue = 'BLUE',
  pink = 'PINK',
}

type A = keyof Record<NumericEnum, number>;

interface T {
  hello: string;
  jjjj: number;
}