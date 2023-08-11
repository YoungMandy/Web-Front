function markStr(s) {
  let sign = '\n'; //
  let rightList = new Set(); // 合法字符串的集合
  let errorList = [];
  let originList = s.split(sign);
  for (let i = 0; i < originList.length; i++) {
    let str = originList[i];

    if (str.trim() !== str.trimStart()) {
      str = str.trim() + ' ';
    }

    if (/^[0-9a-zA-a]+$/.test(str.trim())) {
      rightList.add(str);
    } else {
      errorList.push(str);
    }
  }
  const rightTemp = Array.from(rightList);
  const res1 = rightTemp.join(' ');
  const res2 = errorList.join(' ');
  const res3 = rightTemp.map((item) => moveLeft(item, 10));
  const res4 = [...res3].sort();

  const result = `${res1} ${res2} ${res3.join(' ')} ${res4.join(' ')}`;
  console.log(result);
  return result;
}

function moveLeft(str, num) {
  const n = str.length;
  const list = str.split('');
  let index = 0;
  for (let i = 0; i < num; i++) {
    if (index < n - 1) {
      index++;
    } else {
      index = 0;
    }
  }
  let first = list.slice(index);
  let second = list.slice(0, index);

  const res = first.concat(second).join('');
  return res;
}

function getWeight(s) {
  const n = s.length;
}
markStr(`abc
def  
==                
acd123             
44234tjg
aga'-=
ad--s
abd
123
abcdef
123456789012345678901234567890123456789012345678901234567890123
EDFG
SDFG
ABC
DEF	
cccc
a*b=1
abc
cccc
dd
def
87&&^
abc
asdfas
234abc35
765rgfh4sd
1231
123
==
EDFG`);
