/*
 * @lc app=leetcode.cn id=23 lang=javascript
 *
 * [23] 合并K个升序链表
 *
 * https://leetcode-cn.com/problems/merge-k-sorted-lists/description/
 *
 * algorithms
 * Hard (53.56%)
 * Likes:    1168
 * Dislikes: 0
 * Total Accepted:    217K
 * Total Submissions: 399.2K
 * Testcase Example:  '[[1,4,5],[1,3,4],[2,6]]'
 *
 * 给你一个链表数组，每个链表都已经按升序排列。
 * 
 * 请你将所有链表合并到一个升序链表中，返回合并后的链表。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 输入：lists = [[1,4,5],[1,3,4],[2,6]]
 * 输出：[1,1,2,3,4,4,5,6]
 * 解释：链表数组如下：
 * [
 * ⁠ 1->4->5,
 * ⁠ 1->3->4,
 * ⁠ 2->6
 * ]
 * 将它们合并到一个有序链表中得到。
 * 1->1->2->3->4->4->5->6
 * 
 * 
 * 示例 2：
 * 
 * 输入：lists = []
 * 输出：[]
 * 
 * 
 * 示例 3：
 * 
 * 输入：lists = [[]]
 * 输出：[]
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * k == lists.length
 * 0 <= k <= 10^4
 * 0 <= lists[i].length <= 500
 * -10^4 <= lists[i][j] <= 10^4
 * lists[i] 按 升序 排列
 * lists[i].length 的总和不超过 10^4
 * 
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
    题解：官方题解-合并K个排序链表
    #### 解一：暴力排序

        1. 把链表的节点，全部取出来 O(N)
        2. 稳定排序算法，对数组排序 O(NlogN)
        3. 遍历同时创建新的有序链表 O(N)

        T(n) = O(NlogN)

        S(n) = O(n)

    #### 解二：暴力比较

        1. 比较 k 个节点（每个链表的首节点），获得最小值的节点。
        2. 将选中的节点接在新链表的后面

        T(n) = O(Nk)

        S(n) = O(N)

    #### 解三：优先队列

        对解二暴力比较的优化

        > 继续理解

        > 复习最小堆、最大堆、优先队列

        > JS 实现最小、最大堆

        T(n) = O(Nlogk)

        S(n) = O(N)

    #### 解四：两两合并

        其实就是上一题的解法

        T(n) = O(Nk)

        S(n) = O(1)

    #### 解五：分治算法

 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {    
    if (lists.length === 0) {
        return null;
    }
    if (lists.length === 1) {
        return lists[0];
    }
    const half = (lists.length + 1) >> 1;
    const halfKLists = [];
    for (let i = 0; i < half; i++) {        
        halfKLists.push(
            mergeTwoLists(lists[i], lists[i + half])
        );        
    }    
    return mergeKLists(halfKLists);
};

var mergeTwoLists = function(l1, l2) {
    const dummyHead = new ListNode(null);
    let cursor = dummyHead;
    while(l1 && l2) {
        if (l1.val < l2.val) {
            cursor.next = l1;
            l1 = l1.next;
        } else {
            cursor.next = l2;
            l2 = l2.next;
        }
        cursor = cursor.next;
    }
    cursor.next = l1 || l2;
    return dummyHead.next;    
}
/**
    重要的细节
        ```js
        两两合并 vs 分治法

        wysa002wysa002
        （编辑过）5 个月前
        @大力王 两个链表聚合确实发生了K-1次。但是注意，题解中把 K个链表两两聚合，生成K/2个链表的过程叫一次Merging。然后这样的Merging总共发生log(K)次。每一次Merging需要比较的次数是N。 所以总的时间复杂度是O(N*log(K))。 这才是两两聚合和逐一聚合的本质差别。 逐一聚合的情况下，两个聚合的链表长度会发生偏斜，其中一个链表长度越来越长。考虑最坏情况K个链表每个仅包含一个元素（N为总元素数，这里N=K)，那么逐一聚合的总复杂度就是O(1+2+3+...N-1) = O(K*N). 而两两聚合的情况下，仍然考虑刚才的例子，

        第一轮K个链表，聚合完成后剩K/2个，发生的比较次数是 1 + 1 + 1 + ...+ 1 =1*K = N.

        第二轮K/2个链表，聚合完成后剩K/4个，发生的比较次数是(最坏情况) 2+2+2+ ... + 2 = 2 * K/2 = N .

        第三轮K/4个链表，聚合完成后剩K/8个，发生的比较次数 4 + 4 + 4 + .... + 4 = 4 * K/4 = N .

        .....

        最后一轮剩2个链表，比较次数 K/2 + K/2 = 2* K/2 = N .

        总共有log(K)轮，总比较次数 N*log(K)
        ```
 */
// @lc code=end

