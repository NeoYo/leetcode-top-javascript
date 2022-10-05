/*
 * @lc app=leetcode.cn id=19 lang=javascript
 *
 * [19] 删除链表的倒数第N个节点
 *
 * https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/description/
 *
 * algorithms
 * Medium (40.49%)
 * Likes:    1132
 * Dislikes: 0
 * Total Accepted:    288.4K
 * Total Submissions: 710.9K
 * Testcase Example:  '[1,2,3,4,5]\n2'
 *
 * 给定一个链表，删除链表的倒数第 n 个节点，并且返回链表的头结点。
 * 
 * 示例：
 * 
 * 给定一个链表: 1->2->3->4->5, 和 n = 2.
 * 
 * 当删除了倒数第二个节点后，链表变为 1->2->3->5.
 * 
 * 
 * 说明：
 * 
 * 给定的 n 保证是有效的。
 * 
 * 进阶：
 * 
 * 你能尝试使用一趟扫描实现吗？
 * 
 */
/**
    题解：找到第 N 个节点的 上一个节点（prev）

    步骤：
        1. 找到 linkedList.length
        2. 找到 prev
        3. 边界处理

    1. 基础：链表删除节点
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    // 1. 计算链表长度 L
    let len = 0;
    let cursor = head;
    while(cursor) {
        cursor = cursor.next;
        len++;
    }
    cursor = head;
    if (len - n === 0) {    // 删除第一个
        // case: Input: [1,2] 2; Output: [1];
        // case: Input: [1] 1; Output: null;
        return head.next;
    }
    // 2. 找到被删节点的上一个
    for (let i = 1; i < len - n; i++) {        
        cursor = cursor.next;
    }
    const target = cursor.next;
    cursor.next = cursor.next.next;
    target.next = null;
    return head;
};
/**
    2. 优化：DummyHead

        代码优化

        上面代码中 删除头结点，需要做特殊处理，可以使用 dummyHead


        Diff 位置

        // 0. dummyHead
        const dummyHead = new ListNode(null);
        dummyHead.next = head;
        head = dummyHead;

        // if (len - n === 0) {
        //     // case: Input: [1,2] 2; Output: [1];
        //     // case: Input: [1] 1; Output: null;
        //     return head.next;
        // }    

        return head.next; // head.next 处理 dummyHead

    3. 优化2：前后指针

        1. fast 与 slow 距离为 N
        2. fast 走到最后一个节点

        满足以上条件，slow 刚好在 要删除节点的上一个
 */
// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    // 0. dummyHead
    const dummyHead = new ListNode(null);
    dummyHead.next = head;
    head = dummyHead;
    // 1. 计算链表长度 L
    let len = 0;
    let cursor = head;
    while(cursor) {
        cursor = cursor.next;
        len++;
    }
    cursor = head;
    // if (len - n === 0) {
    //     // case: Input: [1,2] 2; Output: [1];
    //     // case: Input: [1] 1; Output: null;
    //     return head.next;
    // }
    // 2. 找到被删节点的上一个
    for (let i = 1; i < len - n; i++) {        
        cursor = cursor.next;
    }
    const target = cursor.next;
    cursor.next = cursor.next.next;
    target.next = null;
    return head.next; // head.next 处理 dummyHead
};
// @lc code=end

/**
 * 优化2：前后指针 + dummyHead n题解
 */
var removeNthFromEnd = function(head, n) {
    const dummyHead = new ListNode(0, head);
    let fast = dummyHead;
    let slow = dummyHead; // fast - slow = n; // slow 表示要删除节点的上一个
    for (let i = 1; i <= n; i++) {
        fast = fast.next;
    }
    while (fast.next) {
        fast = fast.next;
        slow = slow.next;
    }
    const next = slow.next;
    slow.next = slow.next.next;
    next.next = null;
    return dummyHead.next;
};

