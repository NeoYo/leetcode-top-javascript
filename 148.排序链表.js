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

        思路
            一、分: 快慢指针分中点
            二、递归: 未知整体当已知，交给递归来处理
            三、合: left,right,cursor三指针串起排序链表

            其中第三步 (归：回来的意思，并：多合一，排序：处理方式)
               以
                   2   3   4   6
                   1   5   7   8
               为例
                       2——3 ——4 6
                       |     / /\
               null -> 1    5   7 —— 8
               cursor
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function(head) {
    if (head == null || head.next == null)
        return head;
    // 一、分: 快慢指针分中点
    let fast = head.next, slow = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    let tmp = slow.next;
    slow.next = null;
    // 二、递归: 未知整体当已知，交给递归来处理
    let left = sortList(head);
    let right = sortList(tmp);
    // 三、合: left,right,cursor三指针串起排序链表
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
        S(n) = O(1) 满足常数级空间复杂度

        排序链表，归并排序非递归解法，是先分后合，假设已知合并后的子结果，自顶向下的思考方式
        实际上代码运行是自底向上的，我们把分那部分交给递归函数，实际上也可以我们自己来做
        递归解法，每次都一分为二：8-4-2-1
        实际代码运行是从最小的单位 1 和 1 对比，间隔 2；再 2 和 2 对比，间隔 4，即 1-2-4-8
        运行代码待补充
*/
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
/* var sortList = function(head) {

}; */
// @lc code=end

