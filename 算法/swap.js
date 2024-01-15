const pool1 = [];
const pool2 = [];

let playName = 'pool1'; // 正在播放烟花的池子名称

function insert (item) {
  if (playName === 'pool1') {
    pool2.push(item);
  } else {
    pool1.push(item);
  }
}

function remove () {
  if (playName === 'pool1') { // 从正在播放的池子里移除烟花
    pool1.length > 0 && pool1.shift();
  } else {
    pool2.length > 0 && pool2.shift();
  }
}

function changePlayPool () {
  playName = playName === 'pool1' ? 'pool2' : 'pool1';
}

function getLength () {
  if (playName === 'pool1') {
    return pool1.length;
  } else {
    return pool2.length;
  }
}

async function* generateControl () {
  debugger
  while (playName === 'pool1' && pool1.length > 0) { 
    
      yield 'pool1';
    
  }
  while (playName === 'pool2' &&  pool2.length > 0) { 
   
      yield 'pool2';
    
  }
}

let controlFn;

function init () {
  let n = 5;
  while (n) {
    insert(5 - n);
    n--;
  }
  changePlayPool();
  controlFn = generateControl();
}
let begin = 6;

// 初始化函数执行
init();

setInterval(() => {
  insert(begin++)
}, 100)

let result = false;
while (!result) {
  controlFn.next().then((res) => {
    debugger
    console.log(res);
    result = res;
    remove();
  });
}


function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  // return 'ending';
}

var hw = helloWorldGenerator();
console.log(hw.next())
console.log(hw.next())
console.log(hw.next())
console.log(hw.next())
console.log(hw.next())


function* f() {
  console.log('执行了！');
}

var generator = f();

setTimeout(function () {
  generator.next();
}, 2000);


function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}

var a = foo(5);
console.log(a.next()) // Object{value:6, done:false}
console.log(a.next()) // Object{value:NaN, done:false}
console.log(a.next()) // Object{value:NaN, done:true}
console.log('\n');
var b = foo(5);
console.log(b.next()) // { value:6, done:false }
console.log(b.next(12)) // { value:8, done:false }
console.log(b.next(13)) // { value:42, done:true }