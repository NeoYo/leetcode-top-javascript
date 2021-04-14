/*
 * @lc app=leetcode.cn id=123 lang=javascript
 *
 * [123] 买卖股票的最佳时机 III
 *
 * https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iii/description/
 *
 * algorithms
 * Hard (46.43%)
 * Likes:    563
 * Dislikes: 0
 * Total Accepted:    65.7K
 * Total Submissions: 140.8K
 * Testcase Example:  '[3,3,5,0,0,3,1,4]'
 *
 * 给定一个数组，它的第 i 个元素是一支给定的股票在第 i 天的价格。
 * 
 * 设计一个算法来计算你所能获取的最大利润。你最多可以完成 两笔 交易。
 * 
 * 注意: 你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
 * 
 * 示例 1:
 * 
 * 输入: [3,3,5,0,0,3,1,4]
 * 输出: 6
 * 解释: 在第 4 天（股票价格 = 0）的时候买入，在第 6 天（股票价格 = 3）的时候卖出，这笔交易所能获得利润 = 3-0 = 3 。
 * 随后，在第 7 天（股票价格 = 1）的时候买入，在第 8 天 （股票价格 = 4）的时候卖出，这笔交易所能获得利润 = 4-1 = 3 。
 * 
 * 示例 2:
 * 
 * 输入: [1,2,3,4,5]
 * 输出: 4
 * 解释: 在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4
 * 。   
 * 注意你不能在第 1 天和第 2 天接连购买股票，之后再将它们卖出。   
 * 因为这样属于同时参与了多笔交易，你必须在再次购买前出售掉之前的股票。
 * 
 * 
 * 示例 3:
 * 
 * 输入: [7,6,4,3,1] 
 * 输出: 0 
 * 解释: 在这个情况下, 没有交易完成, 所以最大利润为 0。
 * 
 */
/**
    题解：DP

    递推公式
        i 表示 第 i 天、 k 表示已进行的买卖次数、0->1 表示买入、1->0 表示卖出;  dp[i][k][0/1] 表示某个状态的利润
        dp[i][k][0] = max(dp[i-1][k][0], dp[i-1][k][1] + prices[i])
        dp[i][k][1] = max(dp[i-1][k][1], dp[i-1][k-1][0] - prices[i])   // 买入，k 会 -1
        // 买入股票，k 就 -1
 */
// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    const K = 2;
    // 0. 边界处理
    if (prices.length === 0) {
        return 0;
    }
    // 1. DP 初始化
    const DP = Array(prices.length);
    for (let i = 0; i < DP.length; i++) {
        DP[i] = Array(K + 1);
        for (let k = 0; k < DP[i].length; k++) {
            DP[i][k] = [];
        }
    }
    // 2. DP 初始化临界值
    // 2.1 当 i = 0 时，列举所有情况
    // 0 表示第 1 天，k 表示已进行的买卖次数、0->1 表示买入、1->0 表示卖出;
    DP[0][0][0] = 0;
    DP[0][1][0] = -Infinity;    // 没有交易，就 k = 1，表示交易了一笔，不存在这种可能，所以是 -Infinity
    DP[0][2][0] = -Infinity;    // 没有交易，就 k = 2，表示交易了两笔，不存在这种可能，所以是 -Infinity
    DP[0][0][1] = -Infinity;    // k 没有自加，1 又表示购买了第一天的，所以是 -Infinity
    DP[0][1][1] = -prices[0];   // 购买了第一天的，就 k = 1 也自减了
    DP[0][2][1] = -Infinity;    // k = 2 表示交易了两笔了，1 又表示购买了第一天的，所以是 -Infinity
    // 2.1 当 k = 0 时，列举所有情况
    for (let i = 1; i < DP.length; i++) {
        DP[i][0][0] = 0;
        DP[i][0][1] = 0;
    }

    // 3. DP 递推
    for (let i = 1; i < DP.length; i++) {
        DP[i][0][0]=0;
        for (let k = 1; k <= K; k++) {                                          // 这里 K = 2, 表示最多交易 2 次
            DP[i][k][0] = Math.max(DP[i-1][k][0], DP[i-1][k][1] + prices[i]);   // 在 i 时卖出，卖出 +prices[i]
            DP[i][k][1] = Math.max(DP[i-1][k][1], DP[i-1][k-1][0] - prices[i]); // 这里是 k-1 -> k，这里的 k 表示已进行的买卖次数，买入 -prices[i]
        }
    }
    console.log(DP);
    
    return Math.max(
        DP[DP.length - 1][0][0],
        DP[DP.length - 1][1][0],
        DP[DP.length - 1][2][0],
    );
};
// @lc code=end

