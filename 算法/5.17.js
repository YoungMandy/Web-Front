
// [1, 2, 3, 4, 5, 6, 7, 8, 9] => [[1, 2, 3],[4, 5, 6],[7, 8, 9]]，把一个一维数组变成三个三个的二维数组

function splitArray(arr,len) {
  let res = [];
  
  while (arr.length) {
    res.push(arr.splice(0,len))
  }
console.log(res)
  return res;
   
}

splitArray([1, 2, 3, 4, 5, 6, 7, 8, 9],3);


// 提供了一个数组结构的 data，要求实现一个query类，返回一个新的数组，query类中内部有 过滤、排序、分组 等操作，并且支持链式调用，调用最终的 execute 方法返回结果





// class Query {
//   constructor(data) {
//     this.data = data || [];
//     this.res = {};
//   }

//   filter(fn) {
//     fn.apply(this, this.data);
//     return this;
//   }

//   sort(fn) {
//     fn.apply(this, this.data);
//     return this;
//   }

//   groupBy(key) {
//     this.data.forEach((item) => {
//       let mapKey = item[key];
//       if (!this.res[mapKey]) {
//         this.res[mapKey] = [];
//       }
//       this.res[mapKey].push(item);
//     });
//     return this;
//   }

//   execute () {
//     return this.res;
//   };
// }


// const data = [
//   { id: 1, name: 'Alice', age: 20, sex: 'girl' },
//   { id: 2, name: 'Bob', age: 25, sex: 'boy' },
//   { id: 3, name: 'Charlie', age: 30, sex: 'girl' },
//   { id: 4, name: 'David', age: 35, sex: 'boy' },
//   { id: 5, name: 'Ella', age: 40, sex: 'girl' },
// ];

// const result = new Query(data)
//   .filter((item) => {
//     item.age > 25
//   })
//   .sort((a, b) => a.age - b.age)
//   .groupBy('sex')
//   .execute();

// console.log(result);
