/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
  
  const n = strs.length;
  let step = 0;
  
  const res = [];


  for (let i = 0; i < n; i++) {
    let ch = strs[i];
    const key = ch.split("").sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0)).join("");
    console.log('key', key)

    if (map[key] !== undefined) {
      res[map[key]].push(ch);
    } else {
      res.push(new Array());
      map[key] = res.length - 1;
      res[map[key]].push(ch);
    }
  }
 
  return res;
};

groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]);

