// function XFectch (request)
// {
//   function executor (resolve, reject)
//   {
//     let xhr = new XMLHttpRequest();

//     xhr.open("GET", request.url, true);
//     xhr.ontimeout = function(e) { reject(e) };
//     xhr.onerror = function(e) { reject(e) };
//     xhr.onreadystatechange = function()
//     {
//       if (this.readyState === 4)
//       {
//         if (this.status === 200)
//         {
//           resolve(this.responseText, this);
//         } else
//         {
//           let error = {
//             code: this.status,
//             response:this.response
//           }
//           reject(error);
//         }
//       }
//     }
//     xhr.send();
//   }
//   return new Promise(executor);
// }

// 产生嵌套函数的一个主要原因是在发起任务请求时会带上回调函数，这样当任务处理结束后，下个任务就只能在回调函数中来处理了

// 首先，Promise 实现了回调函数的延时绑定
// 需要将回调函数的onResolve 的返回值穿透到最外层

// Promise 对象的错误具有冒泡性质，会一直向后传递，直到被onReject函数处理或者catch语句捕获为止。具备了这样的冒泡特性之后，就不需要在每个Promise 对象中单独捕获异常了



