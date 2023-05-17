var isAnagram = function (s, t) {
  if (s.length !== t.length) {
    return false;
  }

  const map1 = {};
  const map2 = {};

  for (let i = 0; i < s.length; i++) {
    const countS = map1[s.charCodeAt(i)] ? map1[s.charCodeAt(i)] + 1 : 1;
    const countT = map2[t.charCodeAt(i)] ? map2[t.charCodeAt(i)] + 1 : 1;

    map1[s.charCodeAt(i)] = countS;
    map2[t.charCodeAt(i)] = countT;
  }

  return JSON.stringify(map1) === JSON.stringify(map2);
};


console.log('isAnagram', isAnagram(
"anagram",
"nagaram"));