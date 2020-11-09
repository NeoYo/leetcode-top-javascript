/*
 * @lc app=leetcode.cn id=116 lang=javascript
 *
 * [116] 填充每个节点的下一个右侧节点指针
 *
 * https://leetcode-cn.com/problems/populating-next-right-pointers-in-each-node/description/
 *
 * algorithms
 * Medium (62.14%)
 * Likes:    234
 * Dislikes: 0
 * Total Accepted:    46.8K
 * Total Submissions: 74.5K
 * Testcase Example:  '[1,2,3,4,5,6,7]'
 *
 * 给定一个完美二叉树，其所有叶子节点都在同一层，每个父节点都有两个子节点。二叉树定义如下：
 * 
 * struct Node {
 * ⁠ int val;
 * ⁠ Node *left;
 * ⁠ Node *right;
 * ⁠ Node *next;
 * }
 * 
 * 填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 NULL。
 * 
 * 初始状态下，所有 next 指针都被设置为 NULL。
 * 
 * 
 * 
 * 示例：
 * 
 * 
 * 
 * 
 * 输入：{"$id":"1","left":{"$id":"2","left":{"$id":"3","left":null,"next":null,"right":null,"val":4},"next":null,"right":{"$id":"4","left":null,"next":null,"right":null,"val":5},"val":2},"next":null,"right":{"$id":"5","left":{"$id":"6","left":null,"next":null,"right":null,"val":6},"next":null,"right":{"$id":"7","left":null,"next":null,"right":null,"val":7},"val":3},"val":1}
 * 
 * 
 * 输出：{"$id":"1","left":{"$id":"2","left":{"$id":"3","left":null,"next":{"$id":"4","left":null,"next":{"$id":"5","left":null,"next":{"$id":"6","left":null,"next":null,"right":null,"val":7},"right":null,"val":6},"right":null,"val":5},"right":null,"val":4},"next":{"$id":"7","left":{"$ref":"5"},"next":null,"right":{"$ref":"6"},"val":3},"right":{"$ref":"4"},"val":2},"next":null,"right":{"$ref":"7"},"val":1}
 * 
 * 解释：给定二叉树如图 A 所示，你的函数应该填充它的每个 next 指针，以指向其下一个右侧节点，如图 B 所示。
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 你只能使用常量级额外空间。
 * 使用递归解题也符合要求，本题中递归程序占用的栈空间不算做额外的空间复杂度。
 * 
 * 
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */
/**
   思路:
       实际上是进行层次遍历，然后每一层的节点，next 指向它的下一个节点。
       层次遍历有两种解法： 1. 先序遍历+参数level  2. 每一层放进队列里
   解法1: 代码如下文所示
       T(n) = O(n)
       S(n) = O(n)
       它的空间复杂度不是常量级的

   解法2: 使用队列进行层次遍历
       T(n) = O(n)
       S(n) = O(n)
       它的空间复杂度也不是常量级的，但可以进行优化
       我们可以不用队列存储每一层，改用链表

   解法3: 使用链表进行层次遍历
       步骤1，同一层创建一个链表连结
       步骤2，遍历链表，组成一个新链表，记录下一层
*/
/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function(root) {
    const res = [];
    const levelTraverse = (node, level) => {
        if (node == null) { return; }
        if (res[level] == null) {
            res[level] = [node];
        } else {
            res[level].push(node);
        }
        levelTraverse(node.left, level+1);
        levelTraverse(node.right, level+1);
    }
    // console.log(res);
    levelTraverse(root, 0);
    for (let i = 0; i < res.length; i++) {
        const nodes = res[i];
        for (let j = 0; j < nodes.length - 1; j++) {
            nodes[j].next = nodes[j + 1];
        }
    }
    return root;
};
// @lc code=end

