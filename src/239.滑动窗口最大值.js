/*
 * @lc app=leetcode.cn id=239 lang=javascript
 *
 * [239] 滑动窗口最大值
 *
 * https://leetcode-cn.com/problems/sliding-window-maximum/description/
 *
 * algorithms
 * Hard (45.77%)
 * Likes:    334
 * Dislikes: 0
 * Total Accepted:    43.7K
 * Total Submissions: 93.2K
 * Testcase Example:  '[1,3,-1,-3,5,3,6,7]\n3'
 *
 * 给定一个数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k
 * 个数字。滑动窗口每次只向右移动一位。
 * 
 * 返回滑动窗口中的最大值。
 * 
 * 
 * 
 * 进阶：
 * 
 * 你能在线性时间复杂度内解决此题吗？
 * 
 * 
 * 
 * 示例:
 * 
 * 输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3
 * 输出: [3,3,5,5,6,7] 
 * 解释: 
 * 
 * ⁠ 滑动窗口的位置                最大值
 * ---------------               -----
 * [1  3  -1] -3  5  3  6  7       3
 * ⁠1 [3  -1  -3] 5  3  6  7       3
 * ⁠1  3 [-1  -3  5] 3  6  7       5
 * ⁠1  3  -1 [-3  5  3] 6  7       5
 * ⁠1  3  -1  -3 [5  3  6] 7       6
 * ⁠1  3  -1  -3  5 [3  6  7]      7
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= nums.length <= 10^5
 * -10^4 <= nums[i] <= 10^4
 * 1 <= k <= nums.length
 * 
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function(nums, k) {
    let len = nums.length,
        deque = [],
        result = [];
    for(let i = 0; i < len; i++) {
        // 新元素，最新元素，可以顶掉前面所有元素
        while(deque.length > 0 && nums[i] > deque[deque.length - 1] ){
            deque.pop();
        };
        deque.push(nums[i]);
        // [0, k-1] 第k个，才开始入 result
        // deque[0] 永远是最大元素
        if (i >= k - 1) result.push(deque[0]);

        if (nums[i - k + 1] === deque[0]) {
        // if (deque.length === k) {
            deque.shift();
        }
    }
    return result;
};

maxSlidingWindow([1,3,1,2,0,5], 3);

// @lc code=end

