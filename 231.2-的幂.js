/*
 * @lc app=leetcode.cn id=231 lang=javascript
 *
 * [231] 2的幂
 *
 * https://leetcode-cn.com/problems/power-of-two/description/
 *
 * algorithms
 * Easy (48.47%)
 * Likes:    234
 * Dislikes: 0
 * Total Accepted:    73.6K
 * Total Submissions: 151.7K
 * Testcase Example:  '1'
 *
 * 给定一个整数，编写一个函数来判断它是否是 2 的幂次方。
 * 
 * 示例 1:
 * 
 * 输入: 1
 * 输出: true
 * 解释: 2^0 = 1
 * 
 * 示例 2:
 * 
 * 输入: 16
 * 输出: true
 * 解释: 2^4 = 16
 * 
 * 示例 3:
 * 
 * 输入: 218
 * 输出: false
 * 
 */

// @lc code=start
/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfTwo = function(n) {
    // Ref: https://leetcode-cn.com/problems/power-of-two/solution/power-of-two-er-jin-zhi-ji-jian-by-jyd/

    // 解一：整除与取余 T(n) = O(logn)
    /* 
    if (n === 0) {
        // Case n = 0;
        return false;
    }
    while (n % 2 === 0) {
        n = n >> 1;
    }
    return n === 1;
     */

    /*
        解二：n = 2^x
            2^0: 1
            2^1: 10
            2^2: 100
            2^3: 1000
            // n & n-1可以把n最低位的1变0，而当n & n-1 == 0时，则说明n只有一个1
     */
    return n > 0 && ((n & (n-1)) === 0);
};

/**
   注意点：
   1. 2^x 的曲线是 y > 0
   2. 二进制的 & 优先级比较低，要用 （）
*/
// @lc code=end
isPowerOfTwo(2);
