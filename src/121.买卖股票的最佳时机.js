/*
 * @lc app=leetcode.cn id=121 lang=javascript
 *
 * [121] 买卖股票的最佳时机
 *
 * https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/description/
 *
 * algorithms
 * Easy (55.14%)
 * Likes:    1320
 * Dislikes: 0
 * Total Accepted:    321.4K
 * Total Submissions: 582.1K
 * Testcase Example:  '[7,1,5,3,6,4]'
 *
 * 给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。
 * 
 * 如果你最多只允许完成一笔交易（即买入和卖出一支股票一次），设计一个算法来计算你所能获取的最大利润。
 * 
 * 注意：你不能在买入股票前卖出股票。
 * 
 * 
 * 
 * 示例 1:
 * 
 * 输入: [7,1,5,3,6,4]
 * 输出: 5
 * 解释: 在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
 * ⁠    注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。
 * 
 * 
 * 示例 2:
 * 
 * 输入: [7,6,4,3,1]
 * 输出: 0
 * 解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。
 * 
 * 
 */
/**
    买卖股票的最佳时机（总结）
    
    题意理解
        今天不能知道明天，能不能挣钱，要等明天才知道。所以它是从后往前的。

        今天为止挣多少，根据昨天的所有情况，就可以推断出来，推断出的公式就叫递推公式。

        每两天都存在必然联系，从最后一天到第一天，那也可以从第一天得到最后一天。

        从最后一天到第一天使用的是递归，从第一天得到最后一天使用的是动态规划

        > `注意: 你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。` 这句话，简化了难度，递推公式中，0 到 1 表示买入，1 到 0 卖出， 如果不止 1和0，那就多一个 k 作为一个维度， 如买卖股票的最佳时机 III

    递推公式

        ```js
        dp[i][k][0] = max(dp[i-1][k][0], dp[i-1][k][1] + prices[i])
        dp[i][k][1] = max(dp[i-1][k][1], dp[i-1][k+1][0] - prices[i]) 
        ```

        > 注意 k+1 买了一次后变成 k

    解 k = 1，即第一题


        ```js
        dp[i][1][0] = max(dp[i-1][1][0], dp[i-1][1][1] + prices[i])
        dp[i][1][1] = max(dp[i-1][1][1], dp[i-1][0][0] - prices[i]) 
                    = max(dp[i-1][1][1], -prices[i])
        ```

        解释：k = 0 时，前面不存在交易，所以 dp[i-1][0][0] = 0。

    
    解 k = Infinity，即第二题

        ```js
        dp[i][Infinity][0] = max(dp[i-1][Infinity][0], dp[i-1][Infinity][1] + prices[i])
        dp[i][Infinity][1] = max(dp[i-1][Infinity][1], dp[i-1][Infinity+1][0] - prices[i]) 

        ∵ Infinity = Infinity + 1
        ∴
        dp[i][0] = max(dp[i-1][0], dp[i-1][1] + prices[i])
        dp[i][1] = max(dp[i-1][1], dp[i-1][0] - prices[i])
        ```

    解 k = 2，即第三题

        ```js
        dp[i][k][0] = max(dp[i-1][k][0], dp[i-1][k][1] + prices[i])
        dp[i][k][1] = max(dp[i-1][k][1], dp[i-1][k-1][0] - prices[i]) 
        ```
    
    参考资料：
        [LeetCode 题解  一个方法团灭 6 道股票问题](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/solution/yi-ge-fang-fa-tuan-mie-6-dao-gu-piao-wen-ti-by-l-3/)

 */
/**
 
解一：暴力法
    T(n) = S(n^2)
    S(n) = O(1)

 */
var maxProfit = function(prices) {
    // 解一：暴力法 T(n) = O(n^2)
    let max = 0;
    for (let buy = 0; buy < prices.length; buy++) {
        for (let sell = buy; sell < prices.length; sell++) {
            const profit = prices[sell] - prices[buy];
            if (max < profit) {
                max = profit;
            }
        }
    }
    return max;
};
/**
 
解二：DP

    T(n) = O(n)
    S(n) = O(n)

    ```js
    dp[i][1][0] = max(dp[i-1][1][0], dp[i-1][1][1] + prices[i])
    dp[i][1][1] = max(dp[i-1][1][1], dp[i-1][0][0] - prices[i]) 
                = max(dp[i-1][1][1], -prices[i])
    解释：k = 0 的 base case，所以 dp[i-1][0][0] = 0。
    ```

    现在发现 k 都是 1，不会改变，即 k 对状态转移已经没有影响了。
    可以进行进一步化简去掉所有 k：

    ```js
    dp[i][0] = max(dp[i-1][0], dp[i-1][1] + prices[i])
    dp[i][1] = max(dp[i-1][1], -prices[i])
    ```

 */
// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    // 解二：DP
    /* 
    一、DP定义
        DP[i][type]
        表示从 0 ~ i 获得的利润， ，type 0 表示不持有，type 1 表示持有
        i >= O; i < prices.length
        PS: i = 0 表示第 1 天

    二、递推公式
        // 第 i 处于卖出状态
        DP[i][0] = Math.max(
            DP[i - 1][1] + prices[i], // 在第 i 时卖出了
            DP[i - 1][0]
        );

        // 第 i 处于持有状态
        DP[i][1] = Math.max(
            DP[i - 1][1]
            // DP[i - 1][0] - prices[i] // 在第 i 时买入了
            - prices[i] // 在第 i 时买入了, DP[i - 1][0] 只能是 0， 因为只交易一次
        );  
    */
    // 0. 边界处理
    if (prices.length === 0) {
        return 0;
    }
    // 1. 初始化
    let DP = new Array(prices.length);
    for (let i = 0; i < DP.length; i++) {
        DP[i] = [];
    }
    // 2. 预处理
    DP[0][0] = 0;
    DP[0][1] = -prices[0];
    for (let i = 1; i < DP.length; i++) {        
        DP[i][0] = Math.max(
            DP[i - 1][1] + prices[i],
            DP[i - 1][0]
        );
        DP[i][1] = Math.max(
            DP[i - 1][1],
            - prices[i]
        );
    }    
    return DP[DP.length - 1][0];
};
// @lc code=end
/**
    拓展：S(n) 从 O(n) 优化 到 O(1)
    由于 dp[i] 仅仅依赖于 dp[i - 1] 
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
        DP_0 = Math.max(
            DP_1 + prices[i],
            DP_0
        );
        DP_1 = Math.max(
            DP_1,
            - prices[i]
        );
    }    
    return DP_0;
};


