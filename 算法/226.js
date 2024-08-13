var invertTree = function(root) {
  if (root == null) return root;

  const queue = [root];
  while (queue.length) { 
    node = queue.shift();

    if (node.left !== null || node.right !== null) {
      
      const temp = node.left;
      node.left = node.right;
      node.right = temp;

      if (node.left !== null) {
        queue.push(node.left)
      }

      if (node.right !== null) {
        queue.push(node.right)
      }
     
    }

  }

  return root;
};
const tree = {
  val: 4,
  left: {
    val: 2,
    left: {
      val: 1,
      left: null,
      right: null
    },
    right: {
      val: 3,
      left: null,
      right: null
    }
  },
  right: {
    val: 7,
    left: {
      val: 6,
      left: null,
      right: null
    },

    right: {
      val: 9,
      left: null,
      right: null
    }
  }
}

invertTree(tree)