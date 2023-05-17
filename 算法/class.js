// function Point (x, y)
// {
//   this.x = y;
//   this.y = y;
// }

// Point.prototype.toString = function()
// {
//   return `${this.x},${this.y}`
// }

// var p = new Point(1, 2);

class Point
{
  constructor (x, y)
  {
    this.x = x;
    this.y = y;
  }

  toString ()
  {
    return `${this.x},${this.y}`;
  }
}

console.log(typeof Point);
const y = new Point(4, 6);
console.log(y.toString())

console.log(Point === Point.prototype.constructor)


class Bar
{
  doStuff ()
  {
    console.log('stuff');
  }
}

const b = new Bar();
b.doStuff();
console.log(b.constructor === Bar.prototype.constructor)