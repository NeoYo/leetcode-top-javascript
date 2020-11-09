/*
 * @lc app=leetcode.cn id=152 lang=javascript
 *
 * [152] 乘积最大子数组
 *
 * https://leetcode-cn.com/problems/maximum-product-subarray/description/
 *
 * algorithms
 * Medium (40.26%)
 * Likes:    764
 * Dislikes: 0
 * Total Accepted:    94.5K
 * Total Submissions: 234.4K
 * Testcase Example:  '[2,3,-2,4]'
 *
 * 给你一个整数数组 nums ，请你找出数组中乘积最大的连续子数组（该子数组中至少包含一个数字），并返回该子数组所对应的乘积。
 * 
 * 
 * 
 * 示例 1:
 * 
 * 输入: [2,3,-2,4]
 * 输出: 6
 * 解释: 子数组 [2,3] 有最大乘积 6。
 * 
 * 
 * 示例 2:
 * 
 * 输入: [-2,0,-1]
 * 输出: 0
 * 解释: 结果不能为 2, 因为 [-2,-1] 不是子数组。
 * 
 */
/**
    题解：
        这道题实际是 Kadane算法 的应用。
        基础题目：最大子序和 https://leetcode-cn.com/problems/maximum-subarray/
        推导 Kadane算法 的文章： https://juejin.im/post/6844904066032599053#heading-2
        参考题解：https://leetcode-cn.com/problems/maximum-product-subarray/solution/hua-jie-suan-fa-152-cheng-ji-zui-da-zi-xu-lie-by-g/

        在最大子序和的基础上，有以下不同
            1. 该题求的是最大乘积
            2. 由于负负得正，所以存储的 maxI 不够使用
                举例： [2, -3, -2]
                分析： 
                    如果只记录 maxI，-3 会被舍弃，得到最大乘积 2
                    而真正的结果是 6，-3 应该被记录，在遇到下次负数，
                    负负得正，从而得到真正正确的值
                maxI 和 minI 都应用了 Kadane算法
                
        注意点：
            1. maxI = Math.max(...) 中要包含 minI * nums[i]
            2. minI = Math.min(...) 中的 maxI 是旧的 oldMaxI
 */


// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function(nums) {
    let maxSum = -Infinity;
    let maxI = 1;
    let minI = 1;
    for (let i = 0; i < nums.length; i++) {
        const oldMaxI = maxI;
        maxI = Math.max(maxI * nums[i], minI * nums[i], nums[i]);
        minI = Math.min(oldMaxI * nums[i], minI * nums[i], nums[i]);
        maxSum = Math.max(maxSum, maxI);
    }
    return maxSum;
};
// @lc code=end

