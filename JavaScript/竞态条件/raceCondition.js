import axios from "axios";
// 1.闭包
// function ajaxControl (cb) {
//   let cleanup;

//   function onInvalidate (fn) {
//     cleanup = fn;
//   }

//   const a = (name, time) => {
//     if (cleanup) cleanup();
//     cb(onInvalidate, name, time)
//   }

//   return a;
// }

// async function query (onInvalidate, name, time) {
//   let expired = false;// 请求是否过期

//   onInvalidate(() => expired = true);

//   const res = await new Promise((resolve) => {
//     setTimeout(() => {
//       const time = new Date().getTime();
//       const str = new Date().toLocaleTimeString();

//       console.log('time: ' + time);
//       console.log('str: ' + str);
//       resolve({name,time});
//     }, time)

//   })

//   console.log(name);
//   console.log('expired', expired);
//   console.log('\n');

//   if (expired) return;

//   data = res;
// }

// let data;
// const test = ajaxControl(query);
// debugger
// test('A请求', 3000);
// test('B请求', 2000);

// test('C请求', 1000);

// setTimeout(() =>console.log('data',data),4000)


// 2.abort

// const controller = new AbortController();

// async function getOpinionList (time) {

//    const res = await axios.post('https://fc-mp-bbdb452a-dc6c-4106-84ef-710115e906c3.next.bspapp.com/getOpinionList', {
//     signal: controller.signal
//   })
//   await new Promise((resolve) => {
//     setTimeout(() => {
//       resolve();
//     }, time)
//   })
//   return Promise.resolve(res);
// }

// let res;
// function fetchData (name, time) {
//   controller.abort();// 取消请求
//   getOpinionList(name, time).then(function(response) {
//     res = { name };
//   });

// }
// fetchData('A请求', 3000);
// fetchData('B请求', 2000);
// fetchData('C请求', 1000);

// setTimeout(() => {
//   console.log(res);
// }, 4000)

// 3.requestId
// 创建一个axios实例
// const axiosInstance = axios.create();

// const localStorage = {
//   lastRequestId: 0,
//   lastRequestName: undefined
// }

// let list = [];

// // 添加请求拦截器
// axiosInstance.interceptors.request.use(config => {

//   // 生成一个唯一的请求ID，这里使用时间戳作为示例
//   const requestId = `${Date.now()}`;

//   // 将requestId添加到请求的headers中
//   config.headers['X-Request-Id'] = requestId;
//   config.headers['X-Request-name'] = encodeURIComponent(config.data.name);

//   // 收集到的三次请求的时间戳是一样的，requestId不能用Date.now(),应该用UUID
//   list.push(requestId);


//   // 可以将requestId存储起来，例如在localStorage或全局状态管理中
//   localStorage['lastRequestId'] = requestId;
//   localStorage['lastRequestName'] = config.data.name;

//   // 返回修改后的配置
//   return config;
// }, error => {
//   // 请求错误处理
//   return Promise.reject(error);
// });

// async function getOpinionList (name,time) {

//   const res = await axiosInstance.post('https://fc-mp-bbdb452a-dc6c-4106-84ef-710115e906c3.next.bspapp.com/getOpinionList',{name});

//   await new Promise((resolve) => {
//     setTimeout(() => {
//       resolve();
//     }, time)
//   })

//   return Promise.resolve(res);
// }


// let res;
// function fetchData (name, time) {

//   getOpinionList(name, time).then(function(response) {

//     const rName = decodeURIComponent(response.config.headers['X-Request-name']);
//     console.log('响应的请求', rName);
//     if (rName === localStorage['lastRequestName']) {
//       res = { name };
//     }

//   });

// }
// fetchData('A请求', 3000);
// fetchData('B请求', 2000);
// fetchData('C请求', 1000);


// setTimeout(() => {
//   console.log(localStorage)
//   console.log('时间戳收集列表',list)
//   console.log('存储的结果',res);
// }, 4000)

// 4.时间戳

function getOpinionList (time) {

  return axios.post('https://fc-mp-bbdb452a-dc6c-4106-84ef-710115e906c3.next.bspapp.com/getOpinionList')
}

let res;
let maxTimestamp = 0;
const list = [];
function fetchData (name) {


  getOpinionList(name).then(function(response) {
    const timestamp = response.data.timestamp;

    list.push({ name, timestamp });

    if (timestamp > maxTimestamp) {

      res = { name, timestamp };
    }

  });

}
fetchData('A请求', 5000);
fetchData('B请求', 3000);
fetchData('C请求', 1000);

setTimeout(() => {
  console.log('各请求时间戳', list)
  console.log('存储结果', res);
}, 6000)



