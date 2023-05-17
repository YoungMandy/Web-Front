// // // var p = new Promise((resolve, reject) =>
// // // {
// // //   throw '567'
// // //   resolve(42);
// // // })

// // // p.then(function fullfilled (msg)
// // // {
  
// // //   console.log(msg);
// // //   return 123;
// // // }, function rejected (err)
// // // {
// // //   console.log('失败', err);

// // // }).then(function fullfilled (msg)
// // // {
// // //   console.log('fullfilled', msg);
// // // }, function rejected (err)
// // // {
// // //   console.log('err', err);
// // // }
// // // )


// // // // Promise.prototype.race = function(list)
// // // // {
// // // //   for (let promise of list)
// // // //   {
// // // //     promise.then((res)=>{
// // // //       return res;
// // // //     }, (err) =>
// // // //     {
// // // //       return err;
// // // //      })
// // // //    }
// // // // }

// // // function delay (time)
// // // {
// // //   return new Promise(function(resolve, reject)
// // //   {
// // //     setTimeout(resolve,time)
// // //   })
// // // }

// // // delay(100).then(function STEP2 ()
// // // {
// // //   console.log("step2 after 100 ms");
// // //   return delay(200);
// // // }).then(function STEP3 ()
// // // {
// // //   console.log("step3 after another 200ms")
// // // }).then(function STEP4 ()
// // // {
// // //   console.log("step4 next job");
// // //   return delay(50);
// // // }).then(function STEP5 ()
// // // {
// // //   console.log("step5 after another 50ms");
// // // })

// // // var rejectedPr = new Promise(function(resolve, reject)
// // // {
// // //   resolve(Promise.resolve(Promise.resolve("Oops!")))
// // // })


// // // rejectedPr.then(
// // // function fullfilled (res)
// // // { 
// // //   console.log("fullfilled",res);
// // // }, function rejected (err)
// // // {
// // //   console.log( 'err',err)
// // // })


// var p = Promise.resolve(42);

// p.then(function fullfilled (msg)
// {
//   console.log(msg.toLowerCase())
  
// }, function rejected (err)
// {
//   console.log( 'rejected',err)
// }).then(null, (err) =>
// {
//   console.log(err);
//   return 123;
  
// }).then(resolve =>
// {
//   console.log('resolve',resolve)
// }, reject =>
// {
//   console.log('reject',reject)
// })

// // if (!Promise.map)
// // {
// //   Promise.map = function(vals, cb)
// //   {
// //     return Promise.all(
// //         vals.map(function(val){
// //         return new Promise(function(resolve)
// //           {
// //             cb(val,resolve)
// //           }
// //       )
// //     }))
// //   }
// // }


var p1 = Promise.resolve(42);
var p2 = Promise.resolve("Hello,world!");
var p3 = Promise.reject("Oops!");

Promise.race([p1, p2, p3]).then(function(msg)
{
  console.log(msg);
})

Promise.all([p1, p2, p3]).catch(function(err)
{
  console.log(err);
})

Promise.all([p1, p2]).then(function(msg)
{
  console.log(msg);
}).catch(function(err)
{
  console.log(err);
})

if (!Promise.wrap)
{
  Promise.wrap = function(fn)
  {
    return function()
    {
      var args = [].slice.call(arguments);

      return new Promise(function(resolve, reject)
      {
        fn.apply(null, args.concat(function(err, v)
        {
          if (err)
          {
            reject(err);
          } else {
            resolve(v);
          }
        }))
      })
    }
  }
}