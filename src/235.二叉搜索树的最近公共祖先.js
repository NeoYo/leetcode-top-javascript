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

    模板
        树的突破点关键在于:
            A. 选先序还是后序
            B. 目标值与传递值
            C. 递归过程中对传递值的处理（递归过程是在每个节点间的转移）

        以下一边分析，一边解答这三个关键点

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
        A. 先知道左右子树中是否包含目标节点，再判断当前节点，左子树-右子树-当前节点，使用后序遍历
        B. 目标值是一个树的节点，得到这个节点是两个输入节点的公共祖先，所以递归到某个节点，先看子树是否含有，true & true 就得到“目标值”
            因此，传递值是 boolean，或目标节点
        C. 处理的情况可参考下面代码
    注意点
        在递归过程中，还需要判断当前节点，是否刚好就是 p 或 q
*/
// 注意题目：p、q 为不同节点且均存在于给定的二叉搜索树中。
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    if (!root) return root;
    if (root === p || root === q) return root;  // 情形一 p 或 q 自身就为最近公共祖先
    if (root.val > p && root.val < q) return root;  // 情形二 p、q 分别在左右子树； BST 可以快速判断
    if (root.val < p && root.val < q) return lowestCommonAncestor(root.right, p, q); // 情形三 p 和 q 都在左子树
    if (root.val > p && root.val > q) return lowestCommonAncestor(root.right, p, q); // 情形四 p 和 q 都在右子树
};
// @lc code=end
