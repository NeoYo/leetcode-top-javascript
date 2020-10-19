/*
 * @lc app=leetcode.cn id=148 lang=javascript
 *
 * [148] 排序链表
 *
 * https://leetcode-cn.com/problems/sort-list/description/
 *
 * algorithms
 * Medium (66.90%)
 * Likes:    784
 * Dislikes: 0
 * Total Accepted:    97.5K
 * Total Submissions: 145.2K
 * Testcase Example:  '[4,2,1,3]'
 *
 * 在 O(n log n) 时间复杂度和常数级空间复杂度下，对链表进行排序。
 * 
 * 示例 1:
 * 
 * 输入: 4->2->1->3
 * 输出: 1->2->3->4
 * 
 * 
 * 示例 2:
 * 
 * 输入: -1->5->3->4->0
 * 输出: -1->0->3->4->5
 * 
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
    学习资料
        Sort List （归并排序链表）https://leetcode-cn.com/problems/sort-list/solution/sort-list-gui-bing-pai-xu-lian-biao-by-jyd/
 */
/**
    解零：归并排序（递归法）
        T(n) = O(nlogn)
        S(n) = O(logn)  递归函数栈，不满足常数级空间复杂度
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function(head) {
    if (head == null || head.next == null)
        return head;
    // 一、找中点
    let fast = head.next, slow = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    let tmp = slow.next;
    slow.next = null;
    let left = sortList(head);
    let right = sortList(tmp);
    // 二、递归返回处理
    /**
        以
            2   3   3   4
            1   5   7   8
        为例
                2——3 ——4 6
                |     / /\
        null -> 1    5   7 —— 8
        cursor
     */
    let cursor = new ListNode();
    const res = cursor;
    while (left != null && right != null) {
        if (left.val < right.val) {
            cursor.next = left;
            left = left.next;
        } else {
            cursor.next = right;
            right = right.next;
        }
        cursor = cursor.next;
    }
    cursor.next = left != null ? left : right; // 把剩余的 left 或 right 接上
    return res.next;
};
/**
    解一：归并排序（非递归）
        T(n) = O(nlogn)
        S(n) = O(1)
*/
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
/* var sortList = function(head) {

}; */
// @lc code=end

