/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function(text1, text2) {
  debugger
    const len1 = text1.length;
    const len2 = text2.length;

    if(!len1 || !len2){
        return 0;
    }
  
  const long = len1 > len2 ? text1 : text2;
  const short = len1 > len2 ? text2 : text1;
  const stack = [];
  let start = 0;

    for(let i = 0; i < long.length; i++){
        for(let j = start;j < short.length; j++){
          if (long[i] == short[j]) {
              debugger
              stack.push(short[j]);
              start = j;
              break;
            }
           
        }
    }
    return stack.length;

};
console.log(longestCommonSubsequence(
"oxcpqrsvwf",
"shmtulqrypy"));
