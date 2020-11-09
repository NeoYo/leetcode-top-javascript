/*
 * @lc app=leetcode.cn id=461 lang=javascript
 *
 * [461] 汉明距离
 *
 * https://leetcode-cn.com/problems/hamming-distance/description/
 *
 * algorithms
 * Easy (77.59%)
 * Likes:    334
 * Dislikes: 0
 * Total Accepted:    76.3K
 * Total Submissions: 98.1K
 * Testcase Example:  '1\n4'
 *
 * 两个整数之间的汉明距离指的是这两个数字对应二进制位不同的位置的数目。
 * 
 * 给出两个整数 x 和 y，计算它们之间的汉明距离。
 * 
 * 注意：
 * 0 ≤ x, y < 2^31.
 * 
 * 示例:
 * 
 * 
 * 输入: x = 1, y = 4
 * 
 * 输出: 2
 * 
 * 解释:
 * 1   (0 0 0 1)
 * 4   (0 1 0 0)
 * ⁠      ↑   ↑
 * 
 * 上面的箭头指出了对应二进制位不同的位置。
 * 
 * 标签: 位运算
 */
/**
    笔记: 
        汉明距离: 两个整数之间的汉明距离指的是这两个数字对应二进制位不同的位置的数目。
 */
// @lc code=start
/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
var hammingDistance = function(x, y) {
    // 1. 异或得到 x 和 y 中 0^1 的所有位置
    let xor = x^y; 
    // 2. 计算位1的个数，即汉明重量  https://github.com/NeoYo/leetcode-top-javascript/commit/29bdb0cb3062a5eeec9d5db1c116f350c6a0b2dd
    //    有移位 &1 和 n&(n-1)消最低位1 两种解法，这里使用第二种
    let distance = 0;
    while (xor > 0) {
        xor = xor&(xor-1);
        distance++;
    }
    return distance;
};
// @lc code=end

