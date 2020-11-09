/*
 * @lc app=leetcode.cn id=92 lang=javascript
 *
 * [92] 反转链表 II
 *
 * https://leetcode-cn.com/problems/reverse-linked-list-ii/description/
 *
 * algorithms
 * Medium (51.37%)
 * Likes:    553
 * Dislikes: 0
 * Total Accepted:    81.3K
 * Total Submissions: 157.5K
 * Testcase Example:  '[1,2,3,4,5]\n2\n4'
 *
 * 反转从位置 m 到 n 的链表。请使用一趟扫描完成反转。
 * 
 * 说明:
 * 1 ≤ m ≤ n ≤ 链表长度。
 * 
 * 示例:
 * 
 * 输入: 1->2->3->4->5->NULL, m = 2, n = 4
 * 输出: 1->4->3->2->5->NULL
 * 
 */
/*
    题解：
        该题是在 206. 反转链表 的基础上进行拓展的 https://github.com/NeoYo/leetcode-top-javascript/blob/master/206.%E5%8F%8D%E8%BD%AC%E9%93%BE%E8%A1%A8.js

        思路是
            0. 准备 m-1 m n n+1 对应的节点
            1. 断开 [m, n] 以外的连接
            2. 反转 [m, n] 之间节点，套用 反转链表 的非递归解法模板
            3. 连接 [mPreNode, n ... m, nNextNode]
        注意点
            1. m-1、n+1 会有不存在的情况  mPreNode nNextNode 的存在判断
            2. m 和 n 会有相等的情况
            3. m-1 不存在的处理
            这几个注意点，会在以下代码中体现

    更详细的题解
        步步拆解：如何递归地反转链表的一部分 https://leetcode-cn.com/problems/reverse-linked-list-ii/solution/bu-bu-chai-jie-ru-he-di-gui-di-fan-zhuan-lian-biao/
            从反转全部 到 反转前几个，再到 反转 m 到 n
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
 * @param {ListNode} head
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */
var reverseBetween = function(head, m, n) {
    function reverseList(head) {
        if (head == null || head.next == null) {
            return head;
        }
        let next = null;
        let pre = head.next;
        while (head != null) {
            pre = head.next;
            head.next = next;
            next = head;
            head = pre;
        }
        return next;
    };
    /*
       1 -> 2 -> 3 -> 4 -> 5 -> NULL
            m         n
    */
    let mPreNode,
        mNode,
        nNode,
        nNextNode;

    let cursor = head;
    for (let i = 1; i <= (n + 1); i++) {
        if (i == m - 1) {
            mPreNode = cursor;
        } else if (i == m) {
            mNode = cursor;
        }
        if (i == n) { // 注意点 2. m 和 n 相等的情况
            nNode = cursor;
        } else if (i == (n + 1)) {
            nNextNode = cursor;
        }
        if (cursor) {
            cursor = cursor.next;
        } else {
            break;
        }
    }
    // 1. 断开 [m, n] 以外的连接
    mPreNode && (mPreNode.next = null);
    nNode && (nNode.next = null);
    // 2. 反转 [m, n] 之间节点，套用 反转链表 的非递归解法模板
    const reversedList = reverseList(mNode);
    // 3. 连接 [mPreNode, n ... m, nNextNode]
    (mNode.next = nNextNode);
    if (mPreNode) {
        mPreNode.next = reversedList;
        return head;
    } else {
        // 注意点 3. m-1 节点不存在的处理
        return reversedList;
    }
};
// @lc code=end

