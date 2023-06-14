//给你一个整数数组prices，表示一支股票的历史每日股价，其中prices[i]是这支股票第i天的价格。

/* 一个平滑上涨的阶段定义为：对于连续三天或者以上，每日股价都比前一日股价恰好多1，这个阶段第一天的股价没有限制。

请你返回股价平滑上涨阶段的数目。

示例：

1. 输入：prices = [4,1,2,3,4,6,7,8] 输出：4

说明：(1,2,3) (2,3,4) (1,2,3,4) (6,7,8)

2. 输入：prices = [8,6,7,8,7,8,9] 输出：2

说明：(6,7,8) (7,8,9)

3. 输入：prices = [7,8,6] 输出：0 */

// 解法一：
// function countSmoothNum(list) {
//   if (!list && list.length < 3) {
//     return 0;
//   }
//   const len = list.length;
//   const obj = {};
//   let count = 0;
//   for (let i = 0; i < len; i++) {
//     if (!obj[i]) {
//       obj[i] = [];
//     }
//     if (!obj[i].length) {
//       obj[i].push(i);
//     }
//     if (list[i] - list[i - 1] == 1) {
//       for (let key of Object.keys(obj)) {
//         if (obj[key].includes(i - 1)) {
//           obj[key].push(i);

//           if (obj[key].length >= 3) {
//             count++;
//           }
//         }
//       }
//     }
//   }
//   console.log(JSON.stringify(obj));
//   return count;
// }

// console.log(countSmoothNum([7, 8, 6]));


// 解法二
function countSmoothNum(list) {
  if (!list && list.length < 3) {
    return 0;
  }
  let count = 0;
  const len = list.length;
  const dp = new Array(len).fill(0).map(() => new Array(len).fill(0));// 第i天到第j天的平滑上升的间隔数，第一天到第三天认为是间隔两天

  for (let i = 0; i < len - 2; i++) {
    for (let j = i + 1; j < len; j++) {
      const sub = list[j] - list[j - 1];
      if ( sub == 1) {
        dp[i][j] = dp[i][j - 1] + 1;
        if (dp[i][j] >= 2) {
          count++;
        }
      } else {
        break;
      }
    }
  }
  return count;
}

console.log(countSmoothNum([7, 8, 6]));

