

export function generateRangeValue(min, max) {
  // 最小值是min，所以加min
  // 制定范围所以用随机数 * 区间数
  return Math.floor(Math.random() * (max - min)) + min;
}

// export default function sayHi () {
//   console.log("Hello world!");
// }
