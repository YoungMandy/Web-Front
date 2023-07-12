// 请给出输出结果
function foo(){
    console.log(a);
}

function bar(){
    var a = 3;
    console.log(this.a);
    foo();
}

var a = 2;
bar();
// 2
// 2



--------------------------------------------------------    
// 请实现你认为最好的继承方式，不允许用ES6 class

function Father(name){
    this.name = name
}
Father.prototype.sayHi = function(){
    console.log('hi,'+ this.name)

function Son(){
	Father.call(this,'child');
}
Son.prototype = new Father();
Son.prototype.construct = Son;

var s = new Son();

s.__proto__ //[Function:Father]

--------------------------------------------------------    
// 输出顺序
var pro = new Promise((res, rej) => {
    res(1);
});
pro.then(res => {
    console.log(res);
});
console.log(2);
  pro.then(res => {
    console.log(res);
}).then(res=>{
    console.log(res);
})
// 2
// 1
// undefined
// undefined

--------------------------------------------------------    
// 给定两个字符串S,T 判断S是否为T的子串
// S: sdf T: shgjdkif true
// S: adf T: dfasd    false
    
    function isChildStr(s,t){
        if(!s || !t || !s.length || !t.length){
            return false;
        }
        const stack = s.split("");//
        
        for(let i = 0; i < t.length; i++){
            let curS = stack[0];
            let curT = t[i];
            if(curT == curS){
                stack.shift();
                if(stack.length == 0){
                    return true;
                }
            }
        }
        
        return stack.length == 0;
    }
  
  console.log('isChildStr', isChildStr('sdf', 'shgjdkif'));
  console.log('isChildStr', isChildStr('adf', 'dfasd'));


--------------------------------------------------------    
// 用VUE或者React编写一个倒计时组件
// 组件接收的参数为秒，展示效果为“剩余：HH:MM:SS”
// 100 剩余：00:01:40
// 100 剩余：00:01:39
// 100 剩余：00:01:38
// ...















