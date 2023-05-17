/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root) {
  const stack = [];
  let inOrder = -Infinity;

  while (stack.length || root !== null) {
    while (root !== null) {
      stack.push(root); // 左子树先入栈了
      root = root.left;
    }

    root = stack.pop(); //左子树最下面的叶子节点

    if (root.val <= inOrder) {
      return false;
    }

    inOrder = root.val;

    root = root.right;
  }

  return true;
};

isValidBST([2, 2, 2]);
