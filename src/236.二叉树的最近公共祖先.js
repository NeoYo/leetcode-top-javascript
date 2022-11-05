/*
 * @lc app=leetcode.cn id=236 lang=javascript
 *
 * [236] 二叉树的最近公共祖先
 *
 * https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/description/
 *
 * algorithms
 * Medium (64.99%)
 * Likes:    721
 * Dislikes: 0
 * Total Accepted:    116.2K
 * Total Submissions: 178.4K
 * Testcase Example:  '[3,5,1,6,2,0,8,null,null,7,4]\n5\n1'
 *
 * 给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。
 * 
 * 百度百科中最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x
 * 的深度尽可能大（一个节点也可以是它自己的祖先）。”
 * 
 * 例如，给定如下二叉树:  root = [3,5,1,6,2,0,8,null,null,7,4]
 * 
 * 
 * 
 * 
 * 
 * 示例 1:
 * 
 * 输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
 * 输出: 3
 * 解释: 节点 5 和节点 1 的最近公共祖先是节点 3。
 * 
 * 
 * 示例 2:
 * 
 * 输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
 * 输出: 5
 * 解释: 节点 5 和节点 4 的最近公共祖先是节点 5。因为根据定义最近公共祖先节点可以为节点本身。
 * 
 * 
 * 
 * 
 * 说明:
 * 
 * 
 * 所有节点的值都是唯一的。
 * p、q 为不同节点且均存在于给定的二叉树中。
 * 
 * 
 */

/*
    题目解析:
    求二叉树两个指定节点的最近公共祖先，有两种情形
        1. 两个指定节点不在同一条路径上
        2. 两个指定节点在同一条路径上，其中一个节点本身就是最近公共祖先

    情形1 以 [3,5,1,6,2,0,8,null,null,7,4]，指定节点 7，1为例，进行分析
               3
             /   \
           5      1√
         /  \     / \
        6    2   0   8
            / \
           7√  4
    使用后序遍历，递归思路是整体思想
        含有 5 的左子树，含有指定节点 7
        含有 1 的右子树，含有指定节点 1
        那么，3 就是它们的最近公共节点

    情形2 以 [3,5,1,6,2,0,8,null,null,7,4]，指定节点 7，5为例，进行分析
               3
             /   \
           5√     1
         /  \     / \
        6    2   0   8
            / \
           7√  4
    使用后序遍历，递归思路是整体思想
        含有 5 的右子树，含有指定节点 7
        而它自身，又是指定节点 5
        那么，5 就是它们的最近公共节点

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
 * !! 视频资料：https://time.geekbang.org/course/detail/100019701-42708
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
 var lowestCommonAncestor = function(root, p, q) {
    const foundPorQ = (root) => {   // dfs
        if (!root) return root;
        if (root === p || root === q) return root;  // 情形一 p 或 q 自身就为最近公共祖先

        const leftChildTree = foundPorQ(root.left);
        const rightChildTree = foundPorQ(root.right);
        if (leftChildTree && rightChildTree) return root; // 情形二 p、q 分别在左右子树
        if (leftChildTree) return leftChildTree;    // 情形三 p 和 q 都在左子树
        if (rightChildTree) return rightChildTree;  // 情形四 p 和 q 都在右子树
    }
    return foundPorQ(root);
};
// @lc code=end

