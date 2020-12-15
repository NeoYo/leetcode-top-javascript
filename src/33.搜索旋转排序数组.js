/*
 * @lc app=leetcode.cn id=33 lang=javascript
 *
 * [33] 搜索旋转排序数组
 *
 * https://leetcode-cn.com/problems/search-in-rotated-sorted-array/description/
 *
 * algorithms
 * Medium (39.46%)
 * Likes:    1100
 * Dislikes: 0
 * Total Accepted:    199.8K
 * Total Submissions: 501.3K
 * Testcase Example:  '[4,5,6,7,0,1,2]\n0'
 *
 * 给你一个整数数组 nums ，和一个整数 target 。
 * 
 * 该整数数组原本是按升序排列，但输入时在预先未知的某个点上进行了旋转。（例如，数组 [0,1,2,4,5,6,7] 可能变为
 * [4,5,6,7,0,1,2] ）。
 * 
 * 请你在数组中搜索 target ，如果数组中存在这个目标值，则返回它的索引，否则返回 -1 。
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：nums = [4,5,6,7,0,1,2], target = 0
 * 输出：4
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：nums = [4,5,6,7,0,1,2], target = 3
 * 输出：-1
 * 
 * 示例 3：
 * 
 * 
 * 输入：nums = [1], target = 0
 * 输出：-1
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 
 * -10^4 
 * nums 中的每个值都 独一无二
 * nums 肯定会在某个点上旋转
 * -10^4 
 * 
 * 
 */
/**
    题解：二分查找
        二分查找法，寻找旋转边界
        根据旋转边界，分别进行二分查找
        边界处理

        下面使用的是递归，也可以使用非递归
 */
// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    // 0. 边界处理
    if (nums.length === 0) {
        return -1;
    }
    if (nums.length === 1) {
        return nums[0] === target ? 0 : -1;
    }
    // 1. 寻找旋转分界
    const searchBoundary = (left, right, nums) => {
        if (left + 1 === right) {
            return nums[left] > nums[right] ? left : -1;
        }
        const half = (left + right) >> 1;
        if (nums[half] > nums[right]) {
            return searchBoundary(half, right, nums);
        } else {
            return searchBoundary(left, half, nums);
        }
    }
    const leftEnd = searchBoundary(0, nums.length - 1, nums);
    // 2. 二分查找
    const binarySearch = (left, right, nums, target) => {
        if (left > right) {
            return -1;
        }
        let half = (left + right) >> 1;
        if (nums[half] === target) {
            return half;
        }
        if (nums[half] > target) {
            return binarySearch(left, --half, nums, target);
        } else {
            return binarySearch(++half, right, nums, target);
        }
    }
    if (leftEnd === -1) {
        return binarySearch(0, nums.length - 1, nums, target);
    }
    const leftIndex = binarySearch(0, leftEnd, nums, target);
    if (leftIndex === -1) {
        return binarySearch(leftEnd + 1, nums.length - 1, nums, target);
    }
    return leftIndex;
};
// @lc code=end

