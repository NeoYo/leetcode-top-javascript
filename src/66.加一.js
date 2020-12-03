/*
 * @lc app=leetcode.cn id=66 lang=javascript
 *
 * [66] 加一
 *
 * https://leetcode-cn.com/problems/plus-one/description/
 *
 * algorithms
 * Easy (45.70%)
 * Likes:    591
 * Dislikes: 0
 * Total Accepted:    228.1K
 * Total Submissions: 500K
 * Testcase Example:  '[1,2,3]'
 *
 * 给定一个由 整数 组成的 非空 数组所表示的非负整数，在该数的基础上加一。
 * 
 * 最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。
 * 
 * 你可以假设除了整数 0 之外，这个整数不会以零开头。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：digits = [1,2,3]
 * 输出：[1,2,4]
 * 解释：输入数组表示数字 123。
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：digits = [4,3,2,1]
 * 输出：[4,3,2,2]
 * 解释：输入数组表示数字 4321。
 * 
 * 
 * 示例 3：
 * 
 * 
 * 输入：digits = [0]
 * 输出：[1]
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 
 * 0 
 * 
 * 
 */
/*
    边界考虑：
        9 的向前进位
        最后一位 10

    优化考虑：
        如果不需要进位，直接返回

    拓展考虑：
        如果加任意数字，那么要用 %
 */
// @lc code=start
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
    digits[digits.length - 1] += 1;
    for (
        let i = digits.length - 1;
        i > 0;
        i--
    ) {
        if (digits[i] === 10) {
            digits[i] = 0;
            digits[i - 1] = digits[i - 1] + 1;
        } else {
            return digits;
        }
    }
    if (digits[0] === 10) {
        digits[0] = 0;
        digits.unshift(1);
    }
    return digits;
};
// @lc code=end

