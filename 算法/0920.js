function levelOrder (root) {
  if (root == null) return [];
  const queue = [root];
  const res = [];

  while (queue.length) {
    const n = queue.length;
    res.push([])

    for (let i = 0; i < n; i++) { 
      const node = queue.shift();
      res[res.length - 1].push(node.val);

      if (node.left) queue.push(node.left);
      if(node.right) queue.push(node.right);
    }
  }

  console.log(res);
  return res;
  
}

const tree = {
  val: 3,
  left: {
    val: 9,
    left: null,
    right: null
  },
  right: {
    val: 20,
    left: {
      val: 15,
      left: null,
      right: null
    },
    right: {
      val: 7,
      left: null,
      right:null
    }
  }

}

levelOrder(tree);