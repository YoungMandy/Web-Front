// // 归并排序

// function mergeSort (list) {
//   const len = list.length;
//   if (len < 2) return list;

//   const mid = Math.floor(len / 2);
//   const left = list.slice(0, mid);
//   const right = list.slice(mid);

//   return merge(mergeSort(left), mergeSort(right));
// }

// function merge (left, right) {
//   const res = [];

//   while (left?.length > 0 && right?.length > 0) {
//     if (left[0] < right[0]) {
//       res.push(left.shift());
//     } else {
//       res.push(right.shift());
//     }
//   }

//   while (left?.length) {
//     res.push(left.shift());
//   }
//   while (right?.length) {
//     res.push(right.shift());
//   }

//   return res;
// }
// const test = [1, 4, 5, 6, 3, 2, 4, 5, 6, 8, 9, 30, 89, 49, 4];
// console.log(mergeSort(test));


function mergeSort (list) {
  const len = list.length;
  if (len < 2) return list;
  const mid = Math.floor(len / 2);
  const left = list.slice(0, mid);
  const right = list.slice(mid);

  return merge(mergeSort(left), mergeSort(right));
}

function merge (left, right) {
  const res = [];
  while (left?.length > 0 && right.length > 0) {
    if (left[0] > right[0]) {
      res.push(right.shift());
    } else {
      res.push(left.shift())
    }
  }

  while (left?.length > 0) {
   res.push(left.shift()); 
  }

  while (right?.length > 0) {
    res.push(right.shift());
  }

  return res;
}

const test = [1, 4, 5, 6, 3, 2, 4, 5, 6, 8, 9, 30, 89, 49, 4];
console.log(mergeSort(test));