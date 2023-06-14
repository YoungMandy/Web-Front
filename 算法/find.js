function countSlowNum(list) {
  if (!list && list.length < 3) {
    return 0;
  }
  const len = list.length;
  const obj = {};
  let count = 0;
  for (let i = 0; i < len; i++) {
    if (!obj[i]) {
      obj[i] = [];
    }
    if (!obj[i].length) {
      obj[i].push(i);
    }
    if (list[i] - list[i - 1] == 1) {
      for (let key of Object.keys(obj)) {
        if (obj[key].includes(i - 1)) {
         
          obj[key].push(i);

          if (obj[key]?.length >= 3) {
            count++;
          }
        }
      }
    } else {
      for (let key of Object.keys(obj)) {
        if (obj[key].includes(i - 1)) {
          obj[key] = [];
        }
      }
    }
  }
  return count;
}

console.log(countSlowNum([4, 1, 2, 3, 4, 6, 7, 8]));
