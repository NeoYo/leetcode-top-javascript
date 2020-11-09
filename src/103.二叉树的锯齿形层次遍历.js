/*
 * @lc app=leetcode.cn id=103 lang=javascript
 *
 * [103] 二叉树的锯齿形层次遍历
 *
 * https://leetcode-cn.com/problems/binary-tree-zigzag-level-order-traversal/description/
 *
 * algorithms
 * Medium (54.78%)
 * Likes:    260
 * Dislikes: 0
 * Total Accepted:    69K
 * Total Submissions: 125.7K
 * Testcase Example:  '[3,9,20,null,null,15,7]'
 *
 * 给定一个二叉树，返回其节点值的锯齿形层次遍历。（即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行）。
 * 
 * 例如：
 * 给定二叉树 [3,9,20,null,null,15,7],
 * 
 * ⁠   3
 * ⁠  / \
 * ⁠ 9  20
 * ⁠   /  \
 * ⁠  15   7
 * 
 * 
 * 返回锯齿形层次遍历如下：
 * 
 * [
 * ⁠ [3],
 * ⁠ [20,9],
 * ⁠ [15,7]
 * ]
 * 
 * 
 */
/*
   题解:
       本题要求在层次遍历基础上，层与层之间交替反转。
       反转使用栈容器即可。
*/
// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var zigzagLevelOrder = function(root) {
    if (root == null) { return []; }
    const res = [];
    const queue = [root];
    let level = 0;
    while (queue.length > 0) {
        let size = queue.length;
        res[level] = [];
        const stack = level % 2 === 1 ? [] : null; // 1 3 5 要反转，反转用栈存储
        while (size > 0) {
            const node = queue.shift();
            if (stack) {
                stack.push(node.val);
            } else {
                res[level].push(node.val);
            }
            node.left && queue.push(node.left);
            node.right && queue.push(node.right);
            size--;
        }
        if (stack) {
            // 将栈中元素推出
            while (stack.length > 0) {
                res[level].push(stack.pop());
            }
        }
        level++;
    }
    console.log(res);
    return res;
};
// @lc code=end

