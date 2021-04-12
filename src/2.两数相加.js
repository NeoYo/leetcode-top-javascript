/*
 * @lc app=leetcode.cn id=2 lang=javascript
 *
 * [2] 两数相加
 *
 * https://leetcode-cn.com/problems/add-two-numbers/description/
 *
 * algorithms
 * Medium (38.86%)
 * Likes:    5228
 * Dislikes: 0
 * Total Accepted:    618.2K
 * Total Submissions: 1.6M
 * Testcase Example:  '[2,4,3]\n[5,6,4]'
 *
 * 给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。
 * 
 * 如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。
 * 
 * 您可以假设除了数字 0 之外，这两个数都不会以 0 开头。
 * 
 * 示例：
 * 
 * 输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
 * 输出：7 -> 0 -> 8
 * 原因：342 + 465 = 807
 * 
 * 
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
    时间复杂度 T(n) = O(Max(m, n))
    复杂度分析 S(n) = O(Max(m,n))

    注意点：
    1. 额外进位
        [5]
        [5]
        // 解决如下
        if (append !== 0) {
            cur.next = new ListNode(append%10);
            cur = cur.next;
        }

    2. 为空
        li && li.next || {val: 0}

 */

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
    const sum = l1.val + l2.val;
    let res = cur = new ListNode(sum % 10);         // 起始
    let append = Math.floor(sum / 10);

    while ((l1 && l1.next) || (l2 && l2.next)) {
        l1 = l1 && l1.next || { val: 0 };
        l2 = l2 && l2.next || { val: 0 };
        const sum = l1.val + l2.val + append;       // 两位的和
        cur.next = new ListNode(sum % 10);          // 赋值个位
        cur = cur.next;                             // 移到下一位
        append = Math.floor(sum / 10);              // 整除10进位
    }

    if (append !== 0) {
        cur.next = new ListNode(append % 10);
        cur = cur.next;
    }

    return res;
};
// @lc code=end

