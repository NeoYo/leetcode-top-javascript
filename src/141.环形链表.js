/*
 * @lc app=leetcode.cn id=141 lang=javascript
 *
 * [141] 环形链表
 *
 * https://leetcode-cn.com/problems/linked-list-cycle/description/
 *
 * algorithms
 * Easy (50.33%)
 * Likes:    948
 * Dislikes: 0
 * Total Accepted:    339.1K
 * Total Submissions: 666.8K
 * Testcase Example:  '[3,2,0,-4]\n1'
 *
 * 给定一个链表，判断链表中是否有环。
 * 
 * 如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，我们使用整数 pos
 * 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。注意：pos
 * 不作为参数进行传递，仅仅是为了标识链表的实际情况。
 * 
 * 如果链表中存在环，则返回 true 。 否则，返回 false 。
 * 
 * 
 * 
 * 进阶：
 * 
 * 你能用 O(1)（即，常量）内存解决此问题吗？
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 
 * 输入：head = [3,2,0,-4], pos = 1
 * 输出：true
 * 解释：链表中有一个环，其尾部连接到第二个节点。
 * 
 * 
 * 示例 2：
 * 
 * 
 * 
 * 输入：head = [1,2], pos = 0
 * 输出：true
 * 解释：链表中有一个环，其尾部连接到第一个节点。
 * 
 * 
 * 示例 3：
 * 
 * 
 * 
 * 输入：head = [1], pos = -1
 * 输出：false
 * 解释：链表中没有环。
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 链表中节点的数目范围是 [0, 10^4]
 * -10^5 <= Node.val <= 10^5
 * pos 为 -1 或者链表中的一个 有效索引 。
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
    解一：类 Map 容器
    解二：快慢指针
 */
/**
    解一：类 Map 容器
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    const set = new Set();
    while (head) {
        if (set.has(head)) {
            return true;
        } else {
            set.add(head);
        }
        head = head.next;
    }
    return false;
};
/**
    解二：快慢指针
        快慢指针加起来，相当于每个循环内多走一步
        直到快指针的距离 = 慢指针的距离*2
        为什么一定会相遇，因为每次差值是 1，当差值 = 慢指针的距离，这时 刚好快指针的距离 = 慢指针的距离*2，就相遇了
 */
var hasCycle = function(head) {
    const p1 = head
    const p2 = head
    while(p2!==null&& p2.next!==null){
        p1 = p1.next
        p2 = p2.next.next
        if(p1 === p2){
            return true
        }
    }
    return false
};
// @lc code=end

