/*
 * @lc app=leetcode.cn id=4 lang=javascript
 *
 * [4] 寻找两个正序数组的中位数
 *
 * https://leetcode-cn.com/problems/median-of-two-sorted-arrays/description/
 *
 * algorithms
 * Hard (38.57%)
 * Likes:    3069
 * Dislikes: 0
 * Total Accepted:    241.4K
 * Total Submissions: 625.8K
 * Testcase Example:  '[1,3]\n[2]'
 *
 * 给定两个大小为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。
 * 
 * 请你找出这两个正序数组的中位数，并且要求算法的时间复杂度为 O(log(m + n))。
 * 
 * 你可以假设 nums1 和 nums2 不会同时为空。
 * 
 * 
 * 
 * 示例 1:
 * 
 * nums1 = [1, 3]
 * nums2 = [2]
 * 
 * 则中位数是 2.0
 * 
 * 
 * 示例 2:
 * 
 * nums1 = [1, 2]
 * nums2 = [3, 4]
 * 
 * 则中位数是 (2 + 3)/2 = 2.5
 * 
 * 
 */
/**
    
 */
// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    /**
        解一：暴力法
        原理：
            将两个数组合并，再进行排序，假设是快排，则 T(n) = O(nlogn)
     */
    const nums = [...nums1, ...nums2];
    nums.sort((n1, n2) => (n1 - n2));
    if (nums.length % 2 === 0) {
        const mid = nums.length>>1;
        return (nums[mid] + nums[mid-1])/2; // 中位数要除以2
    } else {
        return nums[(nums.length>>1)]
    }
    /**
        解二：二分查找法
        例子：
      nums1  1   2   3   4   8
            l1              r1
                mid1

      nums2  6       7       9
            l2              r2       
                mid2

            进行二分查找:

                1   2   3   4   8
                l1              r1
                    mid1
            第一轮：
                            l1  r1
                            mid1

                6       7       9
                l2              r2      
                        mid2
            第一轮：
                l2r2
                mid2

            4、6 将两个数组划分为：
            1 2 3 和 7 8 9
     */
};
// @lc code=end

