/*
 * @lc app=leetcode.cn id=105 lang=javascript
 *
 * [105] 从前序与中序遍历序列构造二叉树
 *
 * https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/
 *
 * algorithms
 * Medium (68.47%)
 * Likes:    873
 * Dislikes: 0
 * Total Accepted:    153.2K
 * Total Submissions: 221.9K
 * Testcase Example:  '[3,9,20,15,7]\n[9,3,15,20,7]'
 *
 * 根据一棵树的前序遍历与中序遍历构造二叉树。
 * 
 * 注意:
 * 你可以假设树中没有重复的元素。
 * 
 * 例如，给出
 * 
 * 前序遍历 preorder = [3,9,20,15,7]
 * 中序遍历 inorder = [9,3,15,20,7]
 * 
 * 返回如下的二叉树：
 * 
 * ⁠   3
 * ⁠  / \
 * ⁠ 9  20
 * ⁠   /  \
 * ⁠  15   7
 * 
 */
/**
    2.2 题解

    利用 前序遍历 来定位每棵子树的 根节点 [3,9,20,15,7]
    利用 中序遍历和递归 来获得每个根节点的左、右子树
    官方题解 - 从前序和中序遍历序列构造二叉树 可以看动画图解

    精选题解 比较好理解的

    先来了解一下前序遍历和中序遍历是什么。

    前序遍历：遍历顺序为 父节点 -> 左子节点 -> 右子节点
    中序遍历：遍历顺序为 左子节点 -> 父节点 -> 右子节点
    我们可以发现：前序遍历的第一个元素为根节点，而在中序遍历中，该根节点所在位置的左侧为左子树，右侧为右子树。

    拓展：前序、中序、后序、https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/solution/si-lu-qing-xi-dai-ma-jian-ji-he-105ti-si-lu-yi-z-2/
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
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
    const indexMap = {}; // <value, index> of inorder
    let preOrderIndex = 0;
    for (let i = 0; i < inorder.length; i++) {
        indexMap[inorder[i]] = i;
    }
    function helper(inOrderLeft, inOrderRight) {
        // if there is no elements to construct subtrees
        // inOrderRight 是预留的多余的空值
        if (inOrderLeft === inOrderRight) {
            return null;
        }
        // pick up pre_idx element as a root
        const rootVal = preorder[preOrderIndex];
        const root = new TreeNode(rootVal);

        // root splits inorder list
        // into left and right subtrees
        const inorderIndex = indexMap[rootVal];

        // recursion 
        preOrderIndex++;
        // build left subtree
        root.left = helper(inOrderLeft, inorderIndex);
        // build right subtree
        root.right = helper(inorderIndex + 1, inOrderRight);
        return root;
    }

    return helper(0, inorder.length);
};
// @lc code=end

