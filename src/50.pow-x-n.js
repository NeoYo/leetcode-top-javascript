/*
 * @lc app=leetcode.cn id=50 lang=javascript
 *
 * [50] Pow(x, n)
 *
 * https://leetcode-cn.com/problems/powx-n/description/
 *
 * algorithms
 * Medium (36.89%)
 * Likes:    595
 * Dislikes: 0
 * Total Accepted:    159.2K
 * Total Submissions: 426.6K
 * Testcase Example:  '2.00000\n10'
 *
 * 实现 pow(x, n) ，即计算 x 的 n 次幂函数（即，x^n）。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：x = 2.00000, n = 10
 * 输出：1024.00000
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：x = 2.10000, n = 3
 * 输出：9.26100
 * 
 * 
 * 示例 3：
 * 
 * 
 * 输入：x = 2.00000, n = -2
 * 输出：0.25000
 * 解释：2^-2 = 1/2^2 = 1/4 = 0.25
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * -100.0 
 * -2^31 
 * -10^4 
 * 
 * 
 */

/**
    快速幂 JavaScript 版😳

    普通幂是 n
    快速幂是 log2n
    使用的是二分分治法
 */
// @lc code=start
/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
/**
    n 为负的处理
    2^-4 = 2^(-2+-2) = 2^(-2) * 2^(-2) = 2^-1 * 2^-1 + 2^-1 * 2^-1
    2^-3 = 2^(1-4) = 2 * 2^-4 = ...(同上)
    
    其中 -3%2 === -1 会正常进入 else
 */
var myPow = function(x, n) {
    if(0 === n) {return 1;}
    if(-1 === n) {return 1/x;} // 兼容 n 为负值
    
    if(n % 2 === 0) {
        const half = myPow(x,n/2);
        return half*half;
    } else {
        return x * myPow(x, n - 1);
    }
};
// @lc code=end

