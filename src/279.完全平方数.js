/*
 * @lc app=leetcode.cn id=279 lang=javascript
 *
 * [279] 完全平方数
 *
 * https://leetcode-cn.com/problems/perfect-squares/description/
 *
 * algorithms
 * Medium (57.33%)
 * Likes:    572
 * Dislikes: 0
 * Total Accepted:    83.3K
 * Total Submissions: 144.6K
 * Testcase Example:  '12'
 *
 * 给定正整数 n，找到若干个完全平方数（比如 1, 4, 9, 16, ...）使得它们的和等于 n。你需要让组成和的完全平方数的个数最少。
 * 
 * 示例 1:
 * 
 * 输入: n = 12
 * 输出: 3 
 * 解释: 12 = 4 + 4 + 4.
 * 
 * 示例 2:
 * 
 * 输入: n = 13
 * 输出: 2
 * 解释: 13 = 4 + 9.
 * 
 */
/*
    题解:
        根据下文分析，输入 1 到 4 的情况， -1 表示减去 完全平方数 1

        1
        |(-1)
        0
    
        2
        |(-1)
        1
        |(-1)
        0

        3
        |(-1)
        2
        |(-1)
        1
        |(-1)
        0

          4
       /     \ 
      /       \
      |(-1)   |(-2*2)
      3       0
      |(-1)   
      2
      |(-1)
      1
      |(-1)
      0

    对于输入 n，第一层有 [1, 根号n] 种情况
        比如 4 有 0, 1, 2*2 种情况
        比如 9 有 0, 1, 2*2, 3*3 种情况
    这实际上是递归的过程，斐波那契数列时间复杂度是 2^n，那这个复杂度是 (Math.sqrt(n))^n
    从 1 - 4 就可以发现 4 的第一层 3 是可以复用前面的

    自上而下：递归+备忘录
    自下而上：动态规划

    本题是用动态规划求解
    动态转移方程

    DP[i] = Math.min(DP[i], 1 + DP[i-j*j])

    解释：比如 DP[12] = 1 + DP[12-9] = 1 + DP[3]
            12
           /  \
          9    3
        这个 1 实际上表示，可以由一个平方数9 和 另一个数 3 相加得到 12
    
    输入:    12
    容器:    [0, 1, 2, 3, 1, 2, 3, 4, 2, 1,  2,  3,  3]
    index:  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    

    注意点:
        1. js 填充数组模板代码，Array(n+1).fill(null).map((val, index) => index)
        2. DP 容器，长度为 n+1，从 0 开始，区间 [0, n+1]
        3. j*j <= i，不是 j*j < i，比如上面分析的 4 的组成
                     
*/
// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function(n) {
    const DP = Array(n+1).fill(null).map((val, index) => index);
    for (let i = 0; i < DP.length; i++) {
        for (let j = 1; j*j <= i; j++) {
            DP[i] = Math.min(DP[i], 1 + DP[i-j*j]);
        }
    }
    return DP[DP.length-1];
};
// @lc code=end
numSquares(12);


