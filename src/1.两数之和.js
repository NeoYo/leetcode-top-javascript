/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    const map = new Map(); // <value, index>
    for (let i = 0; i < nums.length; i++) {
      if (map.has(nums[i])) {
        return [map.get(nums[i]), i];
      } else {
        map.set(target - nums[i], i);
      }
    }
};
// @lc code=end

