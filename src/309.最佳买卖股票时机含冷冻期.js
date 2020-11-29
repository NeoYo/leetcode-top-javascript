/*
 * @lc app=leetcode.cn id=309 lang=javascript
 *
 * [309] 最佳买卖股票时机含冷冻期
 *
 * https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/description/
 *
 * algorithms
 * Medium (57.22%)
 * Likes:    613
 * Dislikes: 0
 * Total Accepted:    64.7K
 * Total Submissions: 113K
 * Testcase Example:  '[1,2,3,0,2]'
 *
 * 给定一个整数数组，其中第 i 个元素代表了第 i 天的股票价格 。​
 * 
 * 设计一个算法计算出最大利润。在满足以下约束条件下，你可以尽可能地完成更多的交易（多次买卖一支股票）:
 * 
 * 
 * 你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
 * 卖出股票后，你无法在第二天买入股票 (即冷冻期为 1 天)。
 * 
 * 
 * 示例:
 * 
 * 输入: [1,2,3,0,2]
 * 输出: 3 
 * 解释: 对应的交易状态为: [买入, 卖出, 冷冻期, 买入, 卖出]
 * 
 */
/**
    解一：DP 
 */
// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    // 0. 边界处理
    if (prices.length === 0 || prices.length === 1) {
        // case [] and [1]
        return 0;
    }
    // 1. 初始化 DP
    const DP = Array(prices.length);
    for (let i = 0; i < DP.length; i++) {
        DP[i] = [];
    }
    // 2. 预处理
    DP[0][1] = -prices[0];                    // 第一天就买入
    DP[1][1] = Math.max(DP[0][1], -prices[1]);// 第二天持有不动或第二天才购买 case: [2,1,4] expect: 3
    DP[0][0] = 0;                             // 第一天不买入
    DP[1][0] = Math.max(DP[0][1] + prices[1], DP[0][0]);   // 第二天卖出
    // 3. 递推
    for (let i = 2; i < DP.length; i++) {
        DP[i][0] = Math.max(
            DP[i-1][0],
            DP[i-1][1] + prices[i]
        );
        DP[i][1] = Math.max(
            DP[i-1][1],            // 在 -1 天持有
            DP[i-2][0] - prices[i] // 在 -2 天卖出，今天买入
        );
    }
    return DP[DP.length - 1][0];
};
// @lc code=end

/**
    ##### 优化空间复杂度 O(n) => O(1)
 */
// dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
// dp[i][1] = Math.max(dp[i - 1][1], dp[i - 2][0] - prices[i]);
var maxProfit = function(prices) {
    if (!prices || prices.length < 2) return 0;
    // let dp = Array.from({length: prices.length}, () => []);
    let dp_i_0 = 0;
    let dp_i_1 = -prices[0];
    let dp_pre_0 = 0;

    // dp[1][0] = Math.max(dp[0][0], dp[0][1] + prices[1]);
    // dp[1][1] = Math.max(dp[0][1], - prices[1]);
    for (let i = 1; i < prices.length; i++) {
        let temp = dp_i_0;
        dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i]);
        dp_i_1 = Math.max(dp_i_1, dp_pre_0 - prices[i]);
        dp_pre_0 = temp;
    }
    return dp_i_0;
};

/**
    冷冻期 用 3 表示
 */
var maxProfit = function(prices) {
    // dp[i][0] 持有
    // dp[i][1] 不持有，当天卖了，第二天不能买
    // dp[i][2] 不持有，当天没卖，第二天可以买
    // dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][2] - prices[i])
    // dp[i][1] = Math.max(dp[i - 1][0] + prices[i])
    // dp[i][2] = Math.max(dp[i - 1][1], dp[i - 1][2])
    if (!prices || prices.length <= 1) return 0;
    const dp = [[], []];
    dp[0][0] = -prices[0];
    dp[0][1] = 0;
    dp[0][2] = 0;
    // dp[1][0] = Math.max(-prices[0], -prices[1]);
    // dp[1][1] = Math.max(prices[1] - prices[0], 0);
    // dp[1][2] = 0;
    for (let i = 1; i < prices.length; i += 1) {
        dp[i] = [];
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][2] - prices[i])
        dp[i][1] = Math.max(dp[i - 1][0] + prices[i])
        dp[i][2] = Math.max(dp[i - 1][1], dp[i - 1][2])
        
    }
    const n = prices.length;
    return Math.max(dp[n - 1][0], dp[n - 1][1], dp[n - 1][2]);
};
