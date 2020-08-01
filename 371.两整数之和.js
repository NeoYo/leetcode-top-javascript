/*
 * @lc app=leetcode.cn id=371 lang=javascript
 *
 * [371] 两整数之和
 *
 * https://leetcode-cn.com/problems/sum-of-two-integers/description/
 *
 * algorithms
 * Easy (55.46%)
 * Likes:    289
 * Dislikes: 0
 * Total Accepted:    33.2K
 * Total Submissions: 59.8K
 * Testcase Example:  '1\n2'
 *
 * 不使用运算符 + 和 - ​​​​​​​，计算两整数 ​​​​​​​a 、b ​​​​​​​之和。
 * 
 * 示例 1:
 * 
 * 输入: a = 1, b = 2
 * 输出: 3
 * 
 * 
 * 示例 2:
 * 
 * 输入: a = -2, b = 3
 * 输出: 1
 * 
 */

// @lc code=start
/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var getSum = function(a, b) {
    // Ref: https://leetcode-cn.com/problems/sum-of-two-integers/solution/wei-yun-suan-xiang-jie-yi-ji-zai-python-zhong-xu-y/
    /**
     * 思路：
     * 1. 无进位加法使用异或运算计算得出;
     * 2. 进位结果使用与运算和移位运算计算得出;
     * 3. 不断迭代，消去进位 carrier 的每个一;
     */
    // 
    let carrier = (a & b) << 1,
        res = a ^ b;
    while (carrier != 0) {
        let temp = res;
        res = carrier ^ res;
        carrier = (temp & carrier) << 1;
    }
    return res;
};

// @lc code=end
// console.assert(getSum(5, 8), 13);

