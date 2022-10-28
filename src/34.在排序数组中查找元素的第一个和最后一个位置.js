/*
 * @lc app=leetcode.cn id=34 lang=javascript
 *
 * [34] 在排序数组中查找元素的第一个和最后一个位置
 *
 * https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/description/
 *
 * algorithms
 * Medium (40.01%)
 * Likes:    535
 * Dislikes: 0
 * Total Accepted:    118.1K
 * Total Submissions: 294.7K
 * Testcase Example:  '[5,7,7,8,8,10]\n8'
 *
 * 给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。
 * 
 * 你的算法时间复杂度必须是 O(log n) 级别。
 * 
 * 如果数组中不存在目标值，返回 [-1, -1]。
 * 
 * 示例 1:
 * 
 * 输入: nums = [5,7,7,8,8,10], target = 8
 * 输出: [3,4]
 * 
 * 示例 2:
 * 
 * 输入: nums = [5,7,7,8,8,10], target = 6
 * 输出: [-1,-1]
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
    // if (nums.length === 0) { return [-1, -1]; }
    // if (nums.length === 1) {
    //     return nums[0] === target ? [0, 0] : [-1, -1];
    // }
    /**    
    * 解一：暴力法 T(n) = O(n) S(n) = O(1)
    * 解二：二分查找法 T(n) = O(logn) S(n) = O(1)
    */
    let low = 0,
        high = nums.length - 1;
    const res = [-1, -1]; // [起始位置，终止位置]
    // 起始位置
    while (low <= high) {
        const mid = low + ((high - low)>>1);
        if (nums[mid] < target) {
            low = mid + 1;
        } else if (nums[mid] > target) {
            high = mid - 1;
        } else {
            // nums[mid] === target
            if (mid === 0 || nums[mid - 1] < target) { // mid > 0 && nums[mid - 1] === target 说明左边还有相等的；high = mid - 1;
                res[0] = mid;
                break;
            } else {
                high = mid - 1;
            }
        }
    }
    // 终止位置
    low = 0;
    high = nums.length - 1;
    while (low <= high) {
        const mid = low + ((high - low)>>1);
        if (nums[mid] < target) {
            low = mid + 1;
        } else if (nums[mid] > target) {
            high = mid - 1;
        } else {
            // nums[mid] === target
            if (mid === nums.length - 1 || nums[mid + 1] > target) { // (mid < nums.length - 1) && nums[mid + 1] === target 说明右边还有相等的；
                res[1] = mid;
                break;
            } else {
                low = mid + 1;
            }
        }
    }
    return res;
};
// @lc code=end
console.assert(searchRange([5,7,7,8,8,10], 8));
