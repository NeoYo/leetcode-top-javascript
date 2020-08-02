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
    // Ref: https://leetcode-cn.com/problems/power-of-three/solution/3de-mi-by-leetcode/
    // 解一：循环迭代
    /**
     * 注意点：
     * 1. 1 是 3^0; 
     * 2. n 被整除到最后是 1;
     */
    /* 
    while (n != 0) {
        if (n % 3 === 0) { 
            n = n / 3;
        } else {
            break;
        }
    }
    return n === 1;
     */
    // 解二：进制转换
    /**
     * 思路
     * 2^0 = 1; 2^1 = 10; 2^2 = 100; 2^3 = 1000; ...
     * 2^0 = 1; 3^1 = 10; 3^2 = 100; 3^3 = 1000; ...
     * 注意点
     * 1. 是 2^0 开始
     * 2. 正则中要有 ^ 和 $ 约束
     * 
     */
    return /^10*$/.test((n).toString(3));
    
};
// @lc code=end
console.assert('isPowerOfThree: ', isPowerOfThree(45));

