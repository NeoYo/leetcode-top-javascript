/*
 * @lc app=leetcode.cn id=206 lang=javascript
 *
 * [206] 反转链表
 *
 * https://leetcode-cn.com/problems/reverse-linked-list/description/
 *
 * algorithms
 * Easy (70.49%)
 * Likes:    1292
 * Dislikes: 0
 * Total Accepted:    355.8K
 * Total Submissions: 502.7K
 * Testcase Example:  '[1,2,3,4,5]'
 *
 * 反转一个单链表。
 * 
 * 示例:
 * 
 * 输入: 1->2->3->4->5->NULL
 * 输出: 5->4->3->2->1->NULL
 * 
 * 进阶:
 * 你可以迭代或递归地反转链表。你能否用两种方法解决这道题？
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
 * @param {ListNode} head
 * @return {ListNode}
 */
/**
    以下面链表为例
        1 -> 2 -> 3 -> 4 -> 5 -> NULL

    解法一：递归
        递归关键：把未知的部分，当成已知的整体

            1 -> 2 -> 3 -> 4 -> 5 -> NULL
           head next

            1 -> 2 -> 3 -> 4 -> 5 -> NULL           // 第一步：head.next 实际是反转后的 pre
           head pre

                                current = reverseList(pre) 
                                 |
            1 -> (2 <- 3 <- 4 <- 5)                 // 第二步：reverseList(pre) 把未知的部分，当成已知的整体
           head pre

            1    (2 <- 3 <- 4 <- 5)                 // 第三步：head.next = null
           head  pre

            1 <- (2 <- 3 <- 4 <- 5)                 // 第四步：pre.next = head
           head  pre

                                                    // 第五步：递归终止条件（边界处理）
        代码如下
 */
var reverseList = function(head) {
    if (head == null || head.next == null) { return head; }
    const pre = head.next;
    const cur = reverseList(pre);
    head.next = null;    
    pre.next = head;
    return cur;
};
/**
    解法二：非递归

            1 -> 2 -> 3 -> 4 -> 5 -> NULL
           head .next
        next    pre                                 // pre = head.next

    null <- 1 -> 2 -> 3 -> 4 -> 5 -> NULL
    next<-head  pre                                 // head.next = next = null

    null <- 1 -> 2 -> 3 -> 4 -> 5 -> NULL
    next<-head  pre                                 // head.next = next = null
          next  head                                // next = head; head = pre;


                                                    // 下一个循环
    null <- 1 -> 2 -> 3 -> 4 -> 5 -> NULL
    next<-head  pre                                 // pre = head.next // pre 起到了缓存的作用
                    next  head                      // head.next = next = null
                                                    // 下一个循环

    参考资料：https://www.jianshu.com/p/125ca1a2ac22

    代码如下：不断移动 next、head、pre 三个指针
*/
function reverseList(head) {
    if (head == null || head.next == null) {
        return head;
    }
    let next = null;            // next 是指反转后  head 的 next
    let pre = head.next;        // pre 是指反转后  head 的 pre
    while (head != null) {
        pre = head.next;        // pre 起到了缓存的作用
        head.next = next;       // 反转链表的核心逻辑：反转单个节点，切断指向该节点的 next；连接指向原来的上一个
        next = head;            // 向前挪
        head = pre;             // 向前挪
    }
    return next;
};
// @lc code=end

