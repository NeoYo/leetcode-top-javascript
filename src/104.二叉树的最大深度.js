/*
 * @lc app=leetcode.cn id=104 lang=javascript
 *
 * [104] 二叉树的最大深度
 *
 * https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/description/
 *
 * algorithms
 * Easy (75.29%)
 * Likes:    751
 * Dislikes: 0
 * Total Accepted:    312.6K
 * Total Submissions: 414.6K
 * Testcase Example:  '[3,9,20,null,null,15,7]'
 *
 * 给定一个二叉树，找出其最大深度。
 * 
 * 二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。
 * 
 * 说明: 叶子节点是指没有子节点的节点。
 * 
 * 示例：
 * 给定二叉树 [3,9,20,null,null,15,7]，
 * 
 * ⁠   3
 * ⁠  / \
 * ⁠ 9  20
 * ⁠   /  \
 * ⁠  15   7
 * 
 * 返回它的最大深度 3 。
 * 
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
 * 解法一：DFS
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
    if (root == null) {
        return 0;
    }
    let depth = 1;
    const dfs = (node, cur) => {        
        if (cur > depth) {
            depth = cur;
        }            
        if (node.left) {
            dfs(node.left, cur + 1);
        }
        if (node.right) {
            dfs(node.right, cur + 1);
        }
    }
    dfs(root, depth);
    return depth;
};
/*
 *  解法二： 普通递归
 */
/**
* @param {TreeNode} root
* @return {number}
*/
var maxDepth = function(root) {
    if (root == null) {
        return 0;
    }
    return Math.max(
            maxDepth(root.left) + 1,
            maxDepth(root.right) + 1
    );
};
// @lc code=end

