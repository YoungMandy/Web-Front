
 function sum (x,y)
 {
   console.log("函数接收的参数:", arguments);
   console.log("console的时候拿的是当前的变量值:", x++);
   console.log("语句执行之后，语句的结果才生效:", x);
   console.log("\n")
   return x;
 }

let a = 1;
let b = 2;
sum(a,b);
sum(a,b);
console.log('函数外部', a,b)


function changeName (name)
{
   console.log('函数接收的参数:', arguments);
   console.log('传入的对象:', obj);
   obj.name = '李四';
   console.log('修改后的对象:', obj);
   console.log('\n');
   return obj;
 }

 let obj = { name: '张三' };
 changeName(obj);
 console.log('函数外部的对象', obj);
