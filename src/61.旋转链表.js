/*
 * @lc app=leetcode.cn id=61 lang=javascript
 *
 * [61] 旋转链表
 *
 * https://leetcode-cn.com/problems/rotate-list/description/
 *
 * algorithms
 * Medium (40.52%)
 * Likes:    355
 * Dislikes: 0
 * Total Accepted:    92.1K
 * Total Submissions: 227.3K
 * Testcase Example:  '[1,2,3,4,5]\n2'
 *
 * 给定一个链表，旋转链表，将链表每个节点向右移动 k 个位置，其中 k 是非负数。
 * 
 * 示例 1:
 * 
 * 输入: 1->2->3->4->5->NULL, k = 2
 * 输出: 4->5->1->2->3->NULL
 * 解释:
 * 向右旋转 1 步: 5->1->2->3->4->NULL
 * 向右旋转 2 步: 4->5->1->2->3->NULL
 * 
 * 
 * 示例 2:
 * 
 * 输入: 0->1->2->NULL, k = 4
 * 输出: 2->0->1->NULL
 * 解释:
 * 向右旋转 1 步: 2->0->1->NULL
 * 向右旋转 2 步: 1->2->0->NULL
 * 向右旋转 3 步: 0->1->2->NULL
 * 向右旋转 4 步: 2->0->1->NULL
 * 
 */
/*
   题解
   一、找新起点
       以第一个例子做分析
           输入: 1->2->3->4->5->NULL, k = 2
           输出: 4->5->1->2->3->NULL

       根据题意, 以上面例子进行分析

           链表长度是 5
           k = 1，选最后一个节点作为起点
           k = 2，选倒数第二个节点作为起点
           ...
           k = 6，选最后一个节点作为起点 (6%5 = 1)

       由于是单向链表，就可以直接移到最后一个节点，从后往前，根据k去找起点

       这里我们对上面分析进行转换
           链表长度是 5
           k = 1，选最后一个节点作为起点，选第 4 个节点作为起点 （5-1 +1=5）
           k = 2，选倒数第二个节点作为起点，选第 3 个节点作为起点 (5-2 +1=4)
           ...
           k = 6，选最后一个节点作为起点 (6%5 = 1)，选第 4 个节点作为起点 (5-1 +1=5)

           k=1, 起点：Length-(k%Length) +1

       使用另一个例子用来验证我们的想法

           输入: 0->1->2->NULL, k = 4
           输出: 2->0->1->NULL

           Length-(k%Length) +1 = 3 - (4%3) + 1 = 3

           第 3 个节点是 Node(2)，看输出，果然以 2 作为起点。hhh~

       可以得出：

       新起点索引为：newHeadIndex = Length-(k%Length) +1

   二、切与连
       连：将尾节点连上原始首节点
       切：找到新头结点（新起点索引对应的节点）的上一个节点，断开它对新头结点的指向

   三、边界考虑
       1. k=1, newHeadIndex=1，直接返回
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
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function(head, k) {
    if (k === 0 || head == null || head.next == null) {
        return head;
    }
    let Length = 0;
    let cursor = head;
    let lastNode;
    while (cursor) {
        Length++;                                   // 一边找 Length 长度
        if (cursor.next == null) {
            lastNode = cursor;                      // 一边找 lastNode.next = head; 接上
        }
        cursor = cursor.next;
    }
    // 接上
    lastNode.next = head;
    // console.log('Length: ', Length)
    // Length - (k%Length) +1
    let newHeadIndex = Length - (k%Length) +1;
    if (newHeadIndex === 0 || newHeadIndex === 1) { // 边界条件处理
        return head;
    }
    cursor = head;
    for (let i = 2; i <= (newHeadIndex - 1); i++) {
        cursor = cursor.next;
    }
    const preNewHead = cursor;
    const newHead = preNewHead.next;
    // 断开
    preNewHead.next = null;
    return newHead;
};
// @lc code=end

