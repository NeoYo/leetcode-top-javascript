/*
 * @lc app=leetcode.cn id=217 lang=javascript
 *
 * [217] 存在重复元素
 *
 * https://leetcode-cn.com/problems/contains-duplicate/description/
 *
 * algorithms
 * Easy (53.24%)
 * Likes:    365
 * Dislikes: 0
 * Total Accepted:    236.3K
 * Total Submissions: 428.8K
 * Testcase Example:  '[1,2,3,1]'
 *
 * 给定一个整数数组，判断是否存在重复元素。
 * 
 * 如果存在一值在数组中出现至少两次，函数返回 true 。如果数组中每个元素都不相同，则返回 false 。
 * 
 * 
 * 
 * 示例 1:
 * 
 * 
 * 输入: [1,2,3,1]
 * 输出: true
 * 
 * 示例 2:
 * 
 * 
 * 输入: [1,2,3,4]
 * 输出: false
 * 
 * 示例 3:
 * 
 * 
 * 输入: [1,1,1,3,3,4,3,2,4,2]
 * 输出: true
 * 
 */
/**
    解一：暴力法
        T(n) = O(n^2); S(n) = O(1)
    解二：类 Map 容器
        if (BSTSet) T(n) = O(n*logn); S(n) = O(n)
        遍历n次
    解三：Array.prototype.sort
        T(n) = O(nlogn) S(n) = 1
        原地排序，影响原始数据
 */
// @lc code=start
/**
    解一：暴力法
        T(n) = O(n^2); S(n) = O(1)
 */
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] === nums[j]) {
                return true;
            }
        }
    }
    return false;
};
/**
    解二：类 Map 容器
        if (BSTSet) T(n) = O(n*logn); S(n) = O(n)
        遍历 n 次
 */
var containsDuplicate = function(nums) {
    const set = new Set();
    for (let i = 0; i < nums.length; i++) {
        if (set.has(nums[i])) {
            return true;
        } else {
            set.add(nums[i])
        }
    }
    return false;
};
/**
    解三：Array.prototype.sort
        T(n) = O(nlogn) S(n) = 1
        原地排序，影响原始数据
 */
var containsDuplicate = function(nums) {
    nums.sort((n1, n2) => (n1 - n2));
    for (let i = 0; i < nums.length - 1; i++) {
        if (nums[i] === nums[i+1]) {
            return true;
        }
    }
    return false;
};
// @lc code=end

