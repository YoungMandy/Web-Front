/*
 * @desc: 
 * @param: 
 * @return: 
 * @Author: huili.lan
 */
// var removeDuplicates = function(nums) {
//   const obj = {};
//   let i = 0;
//   while (i < nums.length - 1) {
//     let cur = nums[i];
//     if (!(cur in obj)) {
//       obj[cur] = 1;
//       i++;
//     } else {
//       nums.splice(i, 1);
//     }
//   }
//   return nums.length;
// };
// console.log(removeDuplicates([1, 1]));


let mapA = new Map([['yang', 1]]);
let mapB = Object.create(mapA);
debugger
console.log('mapA: ' + mapA);
console.log('mapB: ' + mapB);