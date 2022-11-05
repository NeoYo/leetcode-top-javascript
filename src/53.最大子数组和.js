/*
 * @lc app=leetcode.cn id=53 lang=javascript
 *
 * [53] 最大子数组和
 *
 * https://leetcode.cn/problems/maximum-subarray/description/
 *
 * algorithms
 * Medium (54.85%)
 * Likes:    5411
 * Dislikes: 0
 * Total Accepted:    1.2M
 * Total Submissions: 2.2M
 * Testcase Example:  '[-2,1,-3,4,-1,2,1,-5,4]'
 *
 * 给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
 * 
 * 子数组 是数组中的一个连续部分。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
 * 输出：6
 * 解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：nums = [1]
 * 输出：1
 * 
 * 
 * 示例 3：
 * 
 * 
 * 输入：nums = [5,4,-1,7,8]
 * 输出：23
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= nums.length <= 10^5
 * -10^4 <= nums[i] <= 10^4
 * 
 * 
 * 
 * 
 * 进阶：如果你已经实现复杂度为 O(n) 的解法，尝试使用更为精妙的 分治法 求解。
 * 
 */
/**
    学习资料：
        [推导 Kadane算法（JavaScript）](https://juejin.cn/post/6844904066032599053)

        总结：😃最大连续子数组 https://juejin.cn/pin/6937242866276270094

        这里叫最大子串或子数组，比较好，子序列，是可以不连续的，如 300.最长递增子序列

        分析角度：
        1. 暴力法 T(n)=O(n^3)
        2. DP T(n)=O(n) S(n)=O(n)
            关键在递推方程
            DP[i] 表示含 nums[i] ，且以 nums[i] 结尾的，从 0~i 的最大连续子数组和，它跟 DP[i-1] 的关系为
                ！！！含 nums[i] ，且以 nums[i] 结尾的，从 0~i 的最大连续子数组和 
            DP[i] = Math.max(nums[i], DP[i-1] + nums[i])
            解释：DP[i-1] 表示过去的经历，如果过去的经历总和，没有比加上现在的机会的更好，那就舍弃过去的，重新开始（选择 num[i]）

            var maxSubArray = function(nums) {
                if (nums.length === 0) { return 0; }
                const DP = Array(nums.length).fill(-Infinity);
                DP[0] = nums[0];                                    // 哨兵优化
                let maxSum = DP[0];
                for (let i = 1; i < nums.length; i++) {
                    DP[i] = Math.max(nums[i], DP[i-1] + nums[i]);
                    maxSum = Math.max(maxSum, DP[i]);
                }
                return maxSum;
                // console.log(DP);
            };

        3. Kadane（卡登）算法
            S(n)=O(n) 可以优化为 O(1) 即 Kadane（卡登）算法

        拓展：
            求最长升序子串的长度     `DP[i] = nums[i] > nums[i-1] ? DP[i-1] + 1 : 1`
 */
// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    let maxSum = -Infinity;
    let DP_i;                                       // 滚动数组优化
    for (let i = 0; i < nums.length; i++) {
        if (i === 0) {                              // 这个地方可以往外挪，即哨兵优化
            DP_i = maxSum = nums[0];
            continue;
        }
        DP_i = Math.max(nums[i], nums[i] + DP_i);
        if (maxSum < DP_i) {
            maxSum = DP_i;
        }
    }
    return maxSum;
};
// @lc code=end

