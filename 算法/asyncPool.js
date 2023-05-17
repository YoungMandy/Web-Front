// // function asyncPool (max)
// // {
// //   const tasks = [];
// //   const concurrent = 0;

// //   return async function(fn)
// //   {
// //     concurrent++;
// //     if (concurrent > max)
// //     {
// //       await new Promise(resolve =>
// //       {
// //         tasks.push(resolve)
// //       })
// //     }

// //     return fn().finally(res =>
// //     {
// //       concurrent--;
// //       if (tasks.length)
// //       {
// //         const resolve = tasks.shift();
// //         resolve();
// //       }
// //       return res;
// //     })
// //   }
// // }

// // function asyncPool (max)
// // {
// //   const tasks = [];
// //   let curIndex = 0;

// //   return async function(fn)
// //   {
// //     curIndex++;

// //     if (curIndex > max)
// //     {
// //       await new Promise(resolve =>
// //       {
// //         tasks.push(resolve)
// //       })
// //     }

// //     return fn().finally(res =>
// //     {
// //       curIndex--;
// //       if (tasks.length)
// //       {
// //         const resolve = tasks.shift();
// //         resolve();
// //       }
// //       return res;
// //     })
// //   }
// // }

// // function asyncPool (max)
// // {
// //   const tasks = [];
// //   const index = 0;

// //   return async function queue (fn)
// //   {
// //     index++;

// //     if (index > max)
// //     {
// //       await new Promise(resolve =>
// //       {
// //         tasks.push(resolve)
// //       })
// //     }

// //     return fn().finally(res =>
// //     {
// //       index--;
// //       if (tasks.length)
// //       {
// //          const resolve = tasks.shift();
// //          resolve();
// //       }
// //       return res;
// //     })
    
// //   }
// // }


// // function asyncPool (max)
// // {
// //   const tasks = [];
// //   let index = 0;

// //   return async function(fn)
// //   {
// //     index++;
// //     if (index > max)
// //     {
// //       await new Promise(resolve =>
// //       {
// //         tasks.push(resolve)
// //       })
// //     }

// //     return fn().finally(res =>
// //     {
// //       index--;
// //       if (tasks.length)
// //       {
// //         const resolve = tasks.shift();
// //         resolve();
// //       }
// //       return res;
// //     })
// //   }
// // }

// // function asyncPool (max)
// // {
// //   const tasks = [];
// //   let index = 0;

// //   return async function(fn)
// //   {
// //     index++;
// //     if (index > max)
// //     {
// //       await new Promise(resolve =>
// //       {
// //         tasks.push(resolve);
// //       })
// //     }

// //     fn().finally(res =>
// //     {
// //       index--;
// //       if (tasks.length)
// //       {
// //         const resolve = tasks.shift();
// //         resolve();
// //       }
// //       return res;
// //     })
// //   }
// // }

// function asyncPool (fn) {
//   const tasks = [];
//   const MAX = 3;
//   let index = 0;

//   return async function() {
//     index++;
//     if (index >= MAX) {
//       await new Promise((resolve, reject) => { 
//         tasks.push(resolve)
//       })
//     }
//     fn().finally(res => {
//       index--;
//       if (tasks.length) {
//         const resolve = tasks.shift();
//         resolve();
//       }
//       return res;
//     })
//   }
// }

const str1 = "前端开发， 前端，开发，前端";
console.log(str1.exec(/前端开发/));