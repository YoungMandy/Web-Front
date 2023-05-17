// 关键词数据的预处理

// 单词列表
const list = ["trans", "transfer", "transform", 'tran', "translator", "test", "abandon"]

let res = {};
function gen (obj,originString, curIndex)
{
  const key = originString.charAt(curIndex);
  obj[key] = {};

  const value = gen(obj[key], originString, curIndex + 1);
  obj[key] = value;
  return obj;
}

function test ()
{
  for (let word of list) {
    res = gen({}, word, 0);
  }
  console.log(res);
}

test();


