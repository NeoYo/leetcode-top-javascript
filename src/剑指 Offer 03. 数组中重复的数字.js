/**
 * @param {number[]} nums
 * @return {number}
 */
var findRepeatNumber = function(nums) {
    const numSet = {};
    for (let i = 0; i < nums.length; i++) {
        if (numSet[nums[i]]) {
            return nums[i];
        }
        numSet[nums[i]] = true;
    }
};