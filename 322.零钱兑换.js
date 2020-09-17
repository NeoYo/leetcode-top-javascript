/*
 * @lc app=leetcode.cn id=322 lang=javascript
 *
 * [322] 零钱兑换
 *
 * https://leetcode-cn.com/problems/coin-change/description/
 *
 * algorithms
 * Medium (41.25%)
 * Likes:    819
 * Dislikes: 0
 * Total Accepted:    134.9K
 * Total Submissions: 326.2K
 * Testcase Example:  '[1,2,5]\n11'
 *
 * 给定不同面额的硬币 coins 和一个总金额
 * amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。
 * 
 * 
 * 
 * 示例 1:
 * 
 * 输入: coins = [1, 2, 5], amount = 11
 * 输出: 3 
 * 解释: 11 = 5 + 5 + 1
 * 
 * 示例 2:
 * 
 * 输入: coins = [2], amount = 3
 * 输出: -1
 * 
 * 
 * 
 * 说明:
 * 你可以认为每种硬币的数量是无限的。
 * 
 */
/*
题解:
一、递归
           11
        /   |  \
       /1   |2  \5
      10    9     6
     /|\   /|\   /|\ 
    9 8 5 8 7 4 5 4 1

二、DP转移方程

    for (let j = 0; j < coins.length; j++) {
        const coin = coins[j];
        DP[i-coin] = DP[i-coin] == null ? Infinity : DP[i-coin];
        DP[i] = Math.min(DP[i], DP[i-coin]+1);
    }

三、注意点
    1. 初始值 DP[0] = 0 因为不需要兑换
    2. 初始值 DP[coins[0...n]]
    3. 返回值 Infinity ? -1 : DP[amount]


拓展:
    0-1背包，背包里物品只能选或不选
    完全背包，背包里物品可以无限选

    这道题1, 2, 5可以无限选，属于完全背包问题
 */
// @lc code=start
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
    let DP = Array(amount+1).fill(null);
    for (let j = 0; j < coins.length; j++) {
        if (coins[j] > amount) { break; }
        DP[coins[j]] = 1;
    }
    DP[0] = 0; // case: [1] 0
    DP = DP.map(coin => coin == null ? Infinity : coin);
    // console.log('before DP', DP);
    for (let i = 0; i <= amount; i++) {
        for (let j = 0; j < coins.length; j++) {
            const coin = coins[j];
            DP[i-coin] = DP[i-coin] == null ? Infinity : DP[i-coin];
            DP[i] = Math.min(DP[i], DP[i-coin]+1);
        }
    }
    // console.log('DP: ', DP);
    return DP[amount] == Infinity ? -1 : DP[amount];
};
// @lc code=end
coinChange([1,2,5],11)

