/*
 * @lc app=leetcode.cn id=235 lang=javascript
 *
 * [235] 二叉搜索树的最近公共祖先
 *
 * https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-search-tree/description/
 *
 * algorithms
 * Easy (64.97%)
 * Likes:    461
 * Dislikes: 0
 * Total Accepted:    104.2K
 * Total Submissions: 158.3K
 * Testcase Example:  '[6,2,8,0,4,7,9,null,null,3,5]\n2\n8'
 *
 * 给定一个二叉搜索树, 找到该树中两个指定节点的最近公共祖先。
 * 
 * 百度百科中最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x
 * 的深度尽可能大（一个节点也可以是它自己的祖先）。”
 * 
 * 例如，给定如下二叉搜索树:  root = [6,2,8,0,4,7,9,null,null,3,5]
 * 
 * 
 * 
 * 
 * 
 * 示例 1:
 * 
 * 输入: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
 * 输出: 6 
 * 解释: 节点 2 和节点 8 的最近公共祖先是 6。
 * 
 * 
 * 示例 2:
 * 
 * 输入: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
 * 输出: 2
 * 解释: 节点 2 和节点 4 的最近公共祖先是 2, 因为根据定义最近公共祖先节点可以为节点本身。
 * 
 * 
 * 
 * 说明:
 * 
 * 
 * 所有节点的值都是唯一的。
 * p、q 为不同节点且均存在于给定的二叉搜索树中。
 * 
 * 标签: 树
 * 
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
    笔记
        公共祖先的定义
            对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x
            满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）

    题解
        以示例1为例
        输入:
                 6
            /        \
          2(true)      8(true)
         / \          / \
        0   4        7   9
           / \
          3   5
        先知道左右子树中是否包含目标节点，再判断当前节点，左子树-右子树-当前节点，使用后序遍历
        在递归过程中，还需要判断当前节点，是否刚好就是 p 或 q
*/

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    if (root == null) {
        return;
    }
    // 0. 使用后序遍历
    const leftChildTree = lowestCommonAncestor(root.left, p, q);
    // console.log('leftChildTree: ', leftChildTree);
    const rightChildTree = lowestCommonAncestor(root.right, p, q);
    // console.log('rightChildTree: ', rightChildTree);

    // 1. 已找到了最近公共祖先，在左子树或右子树中
    if (leftChildTree && leftChildTree.val != null) {
        return leftChildTree;
    } else if (rightChildTree && rightChildTree.val != null) {
        return rightChildTree;
    }
    // 2. 已找到至少一个目标节点，在左子树或右子树中
    if (leftChildTree === true || rightChildTree === true) { 
        // 2.1 另一个目标节点，就是当前节点
        if (root === p || root === q) {
            return root;
        }
        // 2.2 左子树和右子树都含有目标节点，当前即为所求
        if (leftChildTree && rightChildTree) {
            return root;
        }
        // 2.3 告诉上一层函数，找到了一个目标节点
        return true;
    }
    // 3. 找到当前节点就是目标节点
    if (root === p || root === q) {
        return true;
    }
    return;
};
// @lc code=end
