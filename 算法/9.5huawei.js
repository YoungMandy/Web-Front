const root = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 4,
      right: {
        val: 8
      }
    },
    right: {
      val: 5
    }
  },
  right: {
    val: 3,
    left: {
      val: 6,
      left: {
        val: 9
      },
      right: {
        val: 10
      }
    },
    right: {
      val: 7
    }
  }
}

//findPath（root，6）返回[1, 3, 6]

function findPath (root, val) {
  if (root == null) return;

  let res = [];

  function dfs (node, path) {
    if (node == null) return;

    path.push(node.val);

    if (node.val == val) {
      res = [...path];
      return;
    }

    res.length < 1 && dfs(node.left, [...path]);
    res.length < 1 && dfs(node.right, [...path]);
  }

  dfs(root, []);

  console.log(res);

  return res;
}

findPath(root, 6);
findPath(root, 10);




function add (...arg) {
  let args = arg;

  function fn (...rest) {

    args = [...args, ...rest];

    return fn;
  }



  fn.toString = function() {

    const sum = args.reduce((total, cur) => {
      return total += cur;
    }, 0)

    return sum;
  }

  return fn;
}
const b = add(1)(2)(3);
console.log(Function.prototype.toString.call(b))
console.log("sum=" + add(1)(2)(3).toString()); // sum=6

