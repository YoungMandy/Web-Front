// function getRandomStr (len) {
//   const origin = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//   let res = '';
//   while (len) {
//     let index = getRandomNumber(0, origin.length - 1);
//     res += origin[index];
//     len--;
//   }
//   console.log(res);
//   return res;
// }

// function getRandomNumber (min, max) {
//   return Math.floor(min + Math.random()*(max - min + 1));
// }

// getRandomStr(1);
// getRandomStr(14);
// getRandomStr(38);
// getRandomStr(60);
// getRandomStr(99);

// console.log(getRandomNumber(0, 1));


function findFirstUniqueChar (str) { 
  const n = str.length;
  const list = [];
  const map = {};

  for (let i = 0; i < n; i++){
    let ch = str[i];
    if (!map[ch]) {
      map[ch] = 1;
      list.push(ch);
    } else {
      let index = list.findIndex((item) => item == ch);
      if (index !== -1) {
        list.splice(index, 1);// 从数组中删除已有的
      }
    }
  }
  const res = list[0];
  console.log(res);
  return list[0];
}

findFirstUniqueChar('abhuksbahrjklbhu');
findFirstUniqueChar('hhhhaaaooopppfjjfl');
findFirstUniqueChar('hhhhaaaoonopppfjjfl');