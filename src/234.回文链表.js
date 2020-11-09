/*
 * @lc app=leetcode.cn id=234 lang=javascript
 *
 * [234] 回文链表
 *
 * https://leetcode-cn.com/problems/palindrome-linked-list/description/
 *
 * algorithms
 * Easy (42.73%)
 * Likes:    578
 * Dislikes: 0
 * Total Accepted:    110K
 * Total Submissions: 257.2K
 * Testcase Example:  '[1,2]'
 *
 * 请判断一个链表是否为回文链表。
 * 
 * 示例 1:
 * 
 * 输入: 1->2
 * 输出: false
 * 
 * 示例 2:
 * 
 * 输入: 1->2->2->1
 * 输出: true
 * 
 * 
 * 进阶：
 * 你能否用 O(n) 时间复杂度和 O(1) 空间复杂度解决此题？
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
 * @return {boolean}
 */
/**
 * Ref: https://leetcode-cn.com/problems/palindrome-linked-list/solution/hui-wen-lian-biao-by-leetcode/
 * 方法一：将值复制到数组中后用双指针法 T(n) = O(n) S(n) = O(n)
 * 方法二：反转链表后半部分 T(n) = O(n) S(n) = O(1)
 *        具体步骤： 1. 找到链表尾  2. 反转后半部分 3. 两个指针一前一中出发 4. 判断结束恢复链表
 * 方法三：递归栈，S(n) = O(n), 而且一个调用栈的空间比数组存一个值更大
*/
var isPalindrome = function(head) {
    // 使用方法一: 将值复制到数组中后用双指针法 
    const arr = [];
    let node = head;
    while (node) {
        arr.push(node.val);
        node = node.next;
    }
    for (let i = 0; i <= (arr.length >> 1); i++) {
        if (arr[i] === arr[arr.length - 1 - i]) {
            continue;
        } else {
            return false;
        }
    }
    return true;
}
// @lc code=end

