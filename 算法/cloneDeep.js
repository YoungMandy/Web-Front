 function isObject (value)
{
  let type = typeof value;

  return value !== null && type === "object"
 }



 function cloneDeep (source)
{
  const weakMap = new Map();

  const copy = (object) =>
  {
    if (!isObject(object)) return object;
    if (weakMap.has(object)) return weakMap.get(object);

   
    const isArr = Array.isArray(object);
    const res = isArr ? [] : {};

    weakMap.set(object, res);

    
    if (Array.isArray(object)) {
      for (let i = 0; i < object.length; i++) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
          res.push(copy(object[i]));
        }
      }
    } else {
      for (let key in object)
      {
        if(key === 'g'){debugger}
        if (Object.prototype.hasOwnProperty.call(object, key)) {
          res[key] = copy(object[key]);
        }
      }
    }
    return res;
  }

  return copy(source);
 
}


const test = {
  a: '字符串',
  b: 122455,
  c: null,
  d: undefined,
  e: new Date(),
  f: Symbol('huili'),
  g: () =>
  {
    console.log('test')
  },

}

const mock = () =>
{
  res = {...test,h:test}
  console.log('mock', res);
  return res;
}

const test1 = mock();

console.log('test1', test1);
console.log('\n');


const test2 = cloneDeep(test1);

console.log('test2', test2);
console.log('\n');
