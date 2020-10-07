/*
 * @lc app=leetcode.cn id=437 lang=javascript
 *
 * [437] 路径总和 III
 *
 * https://leetcode-cn.com/problems/path-sum-iii/description/
 *
 * algorithms
 * Medium (55.87%)
 * Likes:    600
 * Dislikes: 0
 * Total Accepted:    53.9K
 * Total Submissions: 96.3K
 * Testcase Example:  '[10,5,-3,3,2,null,11,3,-2,null,1]\n8'
 *
 * 给定一个二叉树，它的每个结点都存放着一个整数值。
 * 
 * 找出路径和等于给定数值的路径总数。
 * 
 * 路径不需要从根节点开始，也不需要在叶子节点结束，但是路径方向必须是向下的（只能从父节点到子节点）。
 * 
 * 二叉树不超过1000个节点，且节点数值范围是 [-1000000,1000000] 的整数。
 * 
 * 示例：
 * 
 * root = [10,5,-3,3,2,null,11,3,-2,null,1], sum = 8
 * 
 * ⁠     10
 * ⁠    /  \
 * ⁠   5   -3
 * ⁠  / \    \
 * ⁠ 3   2   11
 * ⁠/ \   \
 * 3  -2   1
 * 
 * 返回 3。和等于 8 的路径有:
 * 
 * 1.  5 -> 3
 * 2.  5 -> 2 -> 1
 * 3.  -3 -> 11
 * 
 * 
 */
/**

题解
          10
         /  \
        5   -3
       / \    \
      3   2   11
     / \   \
    3  -2   1
    
    以子路径 10 -> 5 -> 3 -> -2 为例
                                        路径           选择（newSelection）
                                         +10              +10
            10                          [10]  =           [10]
            /                            +5                +5               
           5                        [5, 5+10] =        [5, 15]
          /                              +3                +3
        3                    [3, 3+5, 3+5+10] =     [3, 8, 18]
         \                               -2                -2
          -2    [-2, -2+3, -2+3+5, -2+3+5+10] = [-2, 1, 6, 16]

    和等于 8 的路径出现在 [3, 8, 18]，中的 8，即 3 + 5

    从上面图示，我们要求的就是路径中选择等于 目标值 8 的数量
    由于先在当前节点，汇总路径，和计算选择，再进入左右子树，所以使用先序遍历

注意点
    1. 选择 selection 要每次都复制
    2. 要求是连续的子路径
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
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number}
 */
var pathSum = function(root, sum) {
    if (root == null) { return 0; }
    let count = 0;
    const dfs = (root, selection, sum) => {
        if (root == null) { return; }
        const newSelection = [root.val];
        if (root.val === sum) {
            count++;
        }
        for (let i = 0; i < selection.length; i++) {
            const newVal = selection[i] + root.val; 
            newSelection.push(newVal);
            if (newVal === sum) {
                count++;
            }
        }
        dfs(root.left, newSelection, sum);
        dfs(root.right, newSelection, sum);
    }
    dfs(root, [], sum);
    return count;
};
// @lc code=end
pathSum([10,5,-3,3,2,null,11,3,-2,null,1], 8);
