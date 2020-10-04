/*
 * @lc app=leetcode.cn id=226 lang=javascript
 *
 * [226] 翻转二叉树
 *
 * https://leetcode-cn.com/problems/invert-binary-tree/description/
 *
 * algorithms
 * Easy (76.44%)
 * Likes:    644
 * Dislikes: 0
 * Total Accepted:    149.1K
 * Total Submissions: 192.8K
 * Testcase Example:  '[4,2,7,1,3,6,9]'
 *
 * 翻转一棵二叉树。
 * 
 * 示例：
 * 
 * 输入：
 * 
 * ⁠    4
 * ⁠  /   \
 * ⁠ 2     7
 * ⁠/ \   / \
 * 1   3 6   9
 * 
 * 输出：
 * 
 * ⁠    4
 * ⁠  /   \
 * ⁠ 7     2
 * ⁠/ \   / \
 * 9   6 3   1
 * 
 * 备注:
 * 这个问题是受到 Max Howell 的 原问题 启发的 ：
 * 
 * 谷歌：我们90％的工程师使用您编写的软件(Homebrew)，但是您却无法在面试时在白板上写出翻转二叉树这道题，这太糟糕了。
 * 标签: 树
 */
/*
    递归法关键
        在于把左子树和右子树当做整体且已知
                        4
                      /   \
        invertTree(右子树)  invertTree(左子树)

        在这个函数只是把左右子树交换了，左子树和右子树，扔进 invertTree ，就得到已交换的
        左子树和右子树，就是整体法，扔进 invertTree 是假设已知返回的就是已交换的

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
 * @return {TreeNode}
 */
var invertTree = function(root) {
    if (root == null) {
        return null; // 注意：这里只能返回 null, 是 LeetCode 测试用例要求的==
    }

    // 只需把 left 和 right 交换即可
    const temp = root.left;
    root.left = invertTree(root.right);
    root.right = invertTree(temp);
    return root;
};
// @lc code=end

