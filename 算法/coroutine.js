// function* genDemo ()
// {
//   console.log("开始执行第一段");
//   yield "generate 2";

//   console.log("开始执行第二段");
//   yield "generate 2";

//   console.log("开始执行第三段");
//   yield "generate 2";

//   console.log("执行结束");
//   return "generate 2";
// }

// console.log("main 0");

// let gen = genDemo();
// console.log(gen.next().value);

// console.log("main 1");
// console.log(gen.next().value);

// console.log("main 2");
// console.log(gen.next().value);

// console.log("main 3");
// console.log(gen.next().value);

// console.log("main 4");


//foo函数
function* foo() {
    let response1 = yield fetch('https://www.geekbang.org')
    console.log('response1')
    console.log(response1)
    let response2 = yield fetch('https://www.geekbang.org/test')
    console.log('response2')
    console.log(response2)
}

//执行foo函数的代码
let gen = foo()
function getGenPromise(gen) {
    return gen.next().value
}
getGenPromise(gen).then((response) => {
    console.log('response1')
    console.log(response)
    return getGenPromise(gen)
}).then((response) => {
    console.log('response2')
    console.log(response)
})