const key: symbol = Symbol();

const symbolHasInstance: symbol = Symbol.hasInstance;

const s0: symbol = Symbol();
const s1: symbol = Symbol.for('foo');
const s2: symbol = Symbol.hasInstance;

const s3: symbol = s0;

class myArray{
  static [Symbol.hasInstance] (value: any) {
    return true;
  }
}

const g:any = new myArray();
console.log(g instanceof myArray);