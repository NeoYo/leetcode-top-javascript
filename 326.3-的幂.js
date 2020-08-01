/*
 * @lc app=leetcode.cn id=326 lang=javascript
 *
 * [326] 3的幂
 *
 * https://leetcode-cn.com/problems/power-of-three/description/
 *
 * algorithms
 * Easy (46.93%)
 * Likes:    119
 * Dislikes: 0
 * Total Accepted:    52.6K
 * Total Submissions: 112K
 * Testcase Example:  '27'
 *
 * 给定一个整数，写一个函数来判断它是否是 3 的幂次方。
 * 
 * 示例 1:
 * 
 * 输入: 27
 * 输出: true
 * 
 * 
 * 示例 2:
 * 
 * 输入: 0
 * 输出: false
 * 
 * 示例 3:
 * 
 * 输入: 9
 * 输出: true
 * 
 * 示例 4:
 * 
 * 输入: 45
 * 输出: false
 * 
 * 进阶：
 * 你能不使用循环或者递归来完成本题吗？
 * 
 */

// @lc code=start
/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfThree = function(n) {
    /**
     * 注意点：
     * 1. 1 是 3^0; 
     * 2. n 被整除到最后是 1;
     */
    while (n != 0) {
        if (n % 3 === 0) { 
            n = n / 3;
        } else {
            break;
        }
    }
    return n === 1;
};
// @lc code=end
console.assert('isPowerOfThree: ', isPowerOfThree(27));

