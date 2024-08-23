// function makeIterator (array) {
//   let nextIndex = 0;
//   return {
//     next: function() {
//       if (nextIndex < array.length) { 
//         return {
//           value: array[nextIndex++],
//           done:false
//         }
//       } else {
//         return {
//           value: undefined,
//           done: true
//         }
//       }
//     }
//   }
// }

// const it = makeIterator(['a', 'b']);
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());

// const obj = {
//   [Symbol.iterator]: function() {
//     let nextIndex = 0;
//     return {
//       next: function() {
//         if (nextIndex < this.length) {
//           return {
//             value: this[nextIndex++],
//             done:false
//           }
//         } else {
//           return {
//             value: undefined,
//             done: true
//           }
//         }
//       }
//     }
//   }
// }

// class RangeIterator{
//   constructor (start, stop) {
//     this.value = start;
//     this.stop = stop;
//   }
//   [Symbol.iterator] () {
//     return this;
//   }

//   next () {
//     let value = this.value;
//     if (value < this.stop) {
//       this.value++;
//       return {
//         value: value,
//         done:false
//       }
//     } else {
//       return {
//         value: undefined,
//         done:true
//       }
//     }
//   }
// }

// function range (start, stop) {
//   return new RangeIterator(start, stop);
// }

// for(let value of range(0, 3)) {
//   console.log(value);
// }

function Obj (value) {
  this.value = value;
  this.next = null;
}

Obj.prototype[Symbol.iterator] = function(){
  let iterator = { next: next };

  let current = this;
  function next () {
    if (current) {
      let value = current.value;
      current = current.next;
      return {
        value: value,
        done:false
      }
    } else {
      return {
        value: undefined,
        done: true
      }
    }
  }

  return iterator;
}
let one = new Obj(1);
let two = new Obj(2);
let three = new Obj(3);

one.next = two;
two.next = three;

for(let i of one) {
  console.log(i);
}