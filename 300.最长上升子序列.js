/*
 * @lc app=leetcode.cn id=300 lang=javascript
 *
 * [300] 最长上升子序列
 *
 * https://leetcode-cn.com/problems/longest-increasing-subsequence/description/
 *
 * algorithms
 * Medium (44.91%)
 * Likes:    888
 * Dislikes: 0
 * Total Accepted:    128.6K
 * Total Submissions: 285.4K
 * Testcase Example:  '[10,9,2,5,3,7,101,18]'
 *
 * 给定一个无序的整数数组，找到其中最长上升子序列的长度。
 * 
 * 示例:
 * 
 * 输入: [10,9,2,5,3,7,101,18]
 * 输出: 4 
 * 解释: 最长的上升子序列是 [2,3,7,101]，它的长度是 4。
 * 
 * 说明:
 * 
 * 
 * 可能会有多种最长上升子序列的组合，你只需要输出对应的长度即可。
 * 你算法的时间复杂度应该为 O(n^2) 。
 * 
 * 
 * 进阶: 你能将算法的时间复杂度降低到 O(n log n) 吗?
 * 
 */

 /*
 0. 子序列与子串
    子串要求连续，子序列不要求连续

     这实际上是 0-1 背包问题 https://time.geekbang.org/column/article/74788

 1. 暴力法：T(n) = O(2^n * n)
     原理：[10, 9, 2, 5, 3, 7, 101, 18]
            0  0  0  0  0  0   0    0
            1  1  1  1  1  1   1    1
         1) 每个位都有两种情况，存在与不存在，总共就是 O(2^n)
         2) 再进行判断是否有序 O(n)

 2. 以 i 结尾的动态规划：T(n) = O(n * n)
     原理：比如 [2, 5, 3, 7]，知道 [2, 5, 3] 并记录起来，就可以推出 [2, 5, 3, 7] 不需要每次都重新计算
          自顶向下，即递归+备忘录
          自底向上，即动态规划
         1) DP 前面 O(2^n) 优化为 O(n)
         2) 以 i 结尾的最长上升子序列，还要和前面每个数比较大小 O(n)
     转移方程：
         dp[i] = 




 */
// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {

};
// @lc code=end

