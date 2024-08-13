const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

const a = function() {
  // Write your code here
  let n = 2; //记录条数
  const record = ["present absent present present present present leaveearly present absent absent",
"present absent present present leaveearly present present absent present present present absent"];
  let res = "";

  // for (let i = 0; i < n; i++) {
  //   const ch = await readline();
  //   record[i] = ch;
  // }
  // console.log("record", record);

  for (let i = 0; i < n; i++) {
    const val = record[i];
    debugger
    if (isPresent(val)) {
      res += "true ";
    } else {
      res += "false ";
    }
  }

  console.log(res);


  function isPresent (s) {
    let threeCount = 0;
    let noNormal = [];
    const list = s.split(" ");
    debugger
    // console.log('list',list)
    const count = {
      absent: 0,
      late: 0,
      leaveearly: 0,
      present: 0,
    };

    
    for (let i = 0; i < list.length; i++) {
      const ch = list[i];

      if (count["absent"] > 1) return false; // 缺勤超过1次

      if (
        (ch == "absent" && list[i + 1] && list[i + 1] == "absent") ||
        (ch == "leaveearly" &&
          list[i + 1] &&
          list[i + 1] == "leaveearly")
      ) {
        return false;
      } // 连续的迟到早退

      count[ch]++;

      if (ch !== "present") {
        noNormal.push(i);
        threeCount++;

        if (threeCount >= 3) {
          let j = noNormal.shift();

          if (i - j + 1 <= 7) {
            return false;
          } else {
            threeCount--;
          }
        }
      }
    }

    return true;
  }
}

a();
