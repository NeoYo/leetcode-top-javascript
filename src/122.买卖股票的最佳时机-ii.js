/*
 * @lc app=leetcode.cn id=122 lang=javascript
 *
 * [122] 买卖股票的最佳时机 II
 *
 * https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/description/
 *
 * algorithms
 * Easy (64.95%)
 * Likes:    1007
 * Dislikes: 0
 * Total Accepted:    266.1K
 * Total Submissions: 407.7K
 * Testcase Example:  '[7,1,5,3,6,4]'
 *
 * 给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。
 * 
 * 设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）。
 * 
 * 注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
 * 
 * 
 * 
 * 示例 1:
 * 
 * 输入: [7,1,5,3,6,4]
 * 输出: 7
 * 解释: 在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
 * 随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6-3 = 3 。
 * 
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
 * 示例 3:
 * 
 * 输入: [7,6,4,3,1]
 * 输出: 0
 * 解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= prices.length <= 3 * 10 ^ 4
 * 0 <= prices[i] <= 10 ^ 4
 * 
 * 
 */
/**
    dp[i][k][0/1] 表示走到 prices[i] 时, k 表示交易次数, 1 表示持有, 0 表示不持有

    ```js
    dp[i][Infinity][0] = max(dp[i-1][Infinity][0], dp[i-1][Infinity][1] + prices[i])
    dp[i][Infinity][1] = max(dp[i-1][Infinity][1], dp[i-1][Infinity+1][0] - prices[i]) 

    ∵ Infinity = Infinity + 1                           k = Infinity，省略对左右等式不影响
    ∴
    dp[i][0] = max(dp[i-1][0], dp[i-1][1] + prices[i])
    dp[i][1] = max(dp[i-1][1], dp[i-1][0] - prices[i])
    ```
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
    if (prices.length === 0) {
        return 0;
    }
    // 1. 初始化 DP
    const DP = new Array(prices.length).fill(null).map(_ => []);
    // 2. 预处理
    DP[0][1] = -prices[0];
    DP[0][0] = 0;
    // 3. 递推
    for (let i = 1; i < DP.length; i++) {
        DP[i][0] = Math.max(
            DP[i - 1][0],
            DP[i - 1][1] + prices[i]
        );
        DP[i][1] = Math.max(
            DP[i - 1][1],
            DP[i - 1][0] - prices[i]
        );
    }
    return DP[DP.length - 1][0];
};
// @lc code=end
/**
    优化空间复杂度
 */
var maxProfit = function(prices) {    
    // 0. 边界处理
    if (prices.length === 0) {
        return 0;
    }
    // 1. 预处理
    let DP_0 = 0;
    let DP_1 = -prices[0];

    for (let i = 1; i < prices.length; i++) {
        const cache = DP_0;
        DP_0 = Math.max(
            DP_1 + prices[i],
            DP_0
        );
        DP_1 = Math.max(
            DP_1,
            cache - prices[i]
        );
    }    
    return DP_0;
};

/**
    如果不用递归，用暴力法（DFS）
        class Solution {
            public int maxProfit(int[] prices) {
                return calculate(prices, 0);
            }

            public int calculate(int prices[], int curDay) {
                if (curDay >= prices.length)
                    return 0;
                int max = 0;
                for (int start = curDay; start < prices.length; start++) {
                    int maxprofit = 0;
                    for (int i = start + 1; i < prices.length; i++) {
                        if (prices[start] < prices[i]) {
                            int profit = calculate(prices, i + 1) + prices[i] - prices[start];
                            if (profit > maxprofit)
                                maxprofit = profit;
                        }
                    }
                    if (maxprofit > max)
                        max = maxprofit;
                }
                return max;
            }
        }
        T(n) = n^n (调用递归函数 n^n 次)
        S(n) = n (递归的深度为 n )
 */

