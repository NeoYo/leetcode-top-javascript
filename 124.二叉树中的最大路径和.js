/*
 * @lc app=leetcode.cn id=124 lang=javascript
 *
 * [124] 二叉树中的最大路径和
 *
 * https://leetcode-cn.com/problems/binary-tree-maximum-path-sum/description/
 *
 * algorithms
 * Hard (43.09%)
 * Likes:    758
 * Dislikes: 0
 * Total Accepted:    81.2K
 * Total Submissions: 188K
 * Testcase Example:  '[1,2,3]'
 *
 * 给定一个非空二叉树，返回其最大路径和。
 * 
 * 本题中，路径被定义为一条从树中任意节点出发，沿父节点-子节点连接，达到任意节点的序列。该路径至少包含一个节点，且不一定经过根节点。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 输入：[1,2,3]
 * 
 * ⁠      1
 * ⁠     / \
 * ⁠    2   3
 * 
 * 输出：6
 * 
 * 
 * 示例 2：
 * 
 * 输入：[-10,9,20,null,null,15,7]
 * 
 * -10
 * / \
 * 9  20
 *   /  \
 *  15   7
 * 
 * 输出：42
 * 
 */
/**
    题解：
        这道题跟 [437] 路径总和 III 类似，可以参考那边的解题模板

        树的突破点关键在于:
            A. 选先序还是后序
            B. 目标值与传递值
            C. 递归过程中对传递值的处理 （递归过程是在每个节点间的转移）

        以下一边分析，一边解答这三个关键点

        该路径至少包含一个节点，这句话很重要
        也就是说，要求的是以每个节点，作为根节点，比较每个节点的贡献值，最大贡献值节点的贡献值就是所求

        问题转化为求 每个节点，作为根节点，该节点的最大贡献值, 就是 curMax = Math.max(b, 0) + Math.max(c, 0) + curNode.val
            这里适合用后序遍历，已知左右子树，再求当前节点
            a
           / \
          b   c
          把 b、c 当做一个已知最大共享值的节点树， 交给递归去解决。
*/
// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/** 
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */

var maxPathSum = function(root) {
/*
    [-10,9,20,null,null,15,7]
           -10
          /   \ 
        /       \
       9        20
      / \       / \
    null null  15  7

    Result: 41
    Expect: 42
 */
    let nodeMax = -Infinity;    // 记录共享值最大的节点的值
    const dfs = (root) => {
        if (root == null) { return 0; }
        const leftSum = Math.max(dfs(root.left), 0);    // 0 表示舍弃
        const rightSum = Math.max(dfs(root.right), 0);  // 0 表示舍弃
        const curMax = root.val + leftSum + rightSum;
        nodeMax = Math.max(curMax, nodeMax);
        // 返回当前节点的最大贡献值
        return root.val + Math.max(leftSum, rightSum);
    }
    dfs(root);
    return nodeMax;
};
// @lc code=end

