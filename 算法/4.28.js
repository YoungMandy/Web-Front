/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 *
 * @param string1 string字符串
 * @param string2 string字符串
 * @return bool布尔型
 */
function isGoodFriends(string1, string2) {
  // write code here
  const n = string1.length;
  const m = string2.length;
  let idx1 = 0;
  let idx2 = 0;
  let set = new Set();

  if (string1 == string2) {
    return false;
  }

  while (idx1 < n) {
    let a = string1[idx1];
    set.add(a);

    idx1++;
  }

  while (idx2 < m) {
    let b = string2[idx2];

    if (!set.has(b)) { // string1中不含有string2字符
      return false;
    }
    idx2++;
  }

  return true;
}

console.log(isGoodFriends('cmbchina1', 'ccanbmhi2'));

// 'cmbchina', 'ccanbmhi';
// "cmbchina","cmbchina"


function F1 () {
  var a = 100;
  return function () {
    console.log(a);
  }
}

var f1 = F1();
var a = 200;
f1();
f1();