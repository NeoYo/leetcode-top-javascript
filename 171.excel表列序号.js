/*
 * @lc app=leetcode.cn id=171 lang=javascript
 *
 * [171] Excel表列序号
 *
 * https://leetcode-cn.com/problems/excel-sheet-column-number/description/
 *
 * algorithms
 * Easy (67.43%)
 * Likes:    154
 * Dislikes: 0
 * Total Accepted:    43.4K
 * Total Submissions: 64.3K
 * Testcase Example:  '"A"'
 *
 * 给定一个Excel表格中的列名称，返回其相应的列序号。
 * 
 * 例如，
 * 
 * ⁠   A -> 1
 * ⁠   B -> 2
 * ⁠   C -> 3
 * ⁠   ...
 * ⁠   Z -> 26
 * ⁠   AA -> 27
 * ⁠   AB -> 28 
 * ⁠   ...
 * 
 * 
 * 示例 1:
 * 
 * 输入: "A"
 * 输出: 1
 * 
 * 
 * 示例 2:
 * 
 * 输入: "AB"
 * 输出: 28
 * 
 * 
 * 示例 3:
 * 
 * 输入: "ZY"
 * 输出: 701
 * 
 * 致谢：
 * 特别感谢 @ts 添加此问题并创建所有测试用例。
 * 
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var titleToNumber = function(s) {
    // 从后往前
    /* 
    const letters = s.split('');
    let scale = 26,
        twices = 0,
        result = 0;
    while (letters.length > 0) {
        const letter = letters.pop();
        result += (letter.charCodeAt(0) - 'A'.charCodeAt(0) + 1) * Math.pow(scale,twices);
        twices++;
    }
    return result;
     */
    // 从前往后
    let ans = 0;
    for (let i = 0; i < s.length; i++) {
        ans = ans * 26 + s[i].charCodeAt() - 64;
    }
    return ans;
};
// @lc code=end
titleToNumber('A')

/**
 * 两种解法：
 * 1. 从后往前
 * 2. 从前往后
 */
