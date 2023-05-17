/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  const res = [];

  const gen = function(left, right, n, result)
  {
     console.group('left:', left, 'right:', right);
     console.log('result:', result);
     console.log('res:', res);
     console.groupEnd();
     console.log('\n');
    if (left == n && right == n)
    {
      debugger
      res.push(result);
      return;
    }
   

    if (left < n)
    {
      debugger
      gen(left + 1, right, n, result + '(');
    }
    if (left > right && right < n)
    {
      debugger
      gen(left, right + 1, n, result + ')');
    }
  };

  gen(0, 0, n, '');

  return res;
};

generateParenthesis(3);
