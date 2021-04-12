/*
 * @lc app=leetcode.cn id=142 lang=javascript
 *
 * [142] 环形链表 II
 *
 * https://leetcode-cn.com/problems/linked-list-cycle-ii/description/
 *
 * algorithms
 * Medium (53.94%)
 * Likes:    878
 * Dislikes: 0
 * Total Accepted:    185.1K
 * Total Submissions: 340K
 * Testcase Example:  '[3,2,0,-4]\n1'
 *
 * 给定一个链表，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。
 * 
 * 为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是
 * -1，则在该链表中没有环。注意，pos 仅仅是用于标识环的情况，并不会作为参数传递到函数中。
 * 
 * 说明：不允许修改给定的链表。
 * 
 * 进阶：
 * 
 * 
 * 你是否可以使用 O(1) 空间解决此题？
 * 
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 
 * 
 * 输入：head = [3,2,0,-4], pos = 1
 * 输出：返回索引为 1 的链表节点
 * 解释：链表中有一个环，其尾部连接到第二个节点。
 * 
 * 
 * 示例 2：
 * 
 * 
 * 
 * 
 * 输入：head = [1,2], pos = 0
 * 输出：返回索引为 0 的链表节点
 * 解释：链表中有一个环，其尾部连接到第一个节点。
 * 
 * 
 * 示例 3：
 * 
 * 
 * 
 * 
 * 输入：head = [1], pos = -1
 * 输出：返回 null
 * 解释：链表中没有环。
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 链表中节点的数目范围在范围 [0, 10^4] 内
 * -10^5 
 * pos 的值为 -1 或者链表中的一个有效索引
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
    快慢指针，测环位置
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function (head) {
    /**
        阶段一：快慢指针
            快慢指针加起来，相当于每个 while 内多走一步
            直到快指针的距离 = 慢指针的距离*2
            为什么一定会相遇，因为每次差值是 1，当差值 = 慢指针的距离，这时 刚好快指针的距离 = 慢指针的距离*2，就相遇了

            快 -------------------
            慢 ---------
     */
    let fast = head;
    let slow = head;
    let hasCycle = false;
    while (slow && fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (fast === slow) {
            hasCycle = true;
            break;
        }
    }
    if (!hasCycle) return null;
    /**
        阶段二：
            参考资料：
                题解一 详细图解(肯定看的明白) https://leetcode-cn.com/problems/linked-list-cycle-ii/solution/xiang-xi-tu-jie-ken-ding-kan-de-ming-bai-by-xixili/
                    是题解二 - 142. 环形链表 II ：简化公式，简单易懂！https://leetcode-cn.com/problems/linked-list-cycle-ii/solution/142-huan-xing-lian-biao-ii-jian-hua-gong-shi-jia-2/ 的特例

            假设 x 表示 离起点的节点数，y 表示 相遇点 ，z 表示 相遇点离环入口距离

            相遇时 (x + y) * 2 = x + y + n (y + z)
            求 x:
                x + y = n (y + z)
                x = n (y + z) - y

            等式总会成立，代表的意义
                【新指针 p 从起点走 x】 = 【慢指针 s 从相遇点开始走 n (y + z) - y】
     */
    let p = head;
    while (p !== slow) {
        p = p.next;
        slow = slow.next;
    }
    return p;
};
// @lc code=end

