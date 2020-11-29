/*
 * @lc app=leetcode.cn id=344 lang=javascript
 *
 * [344] 反转字符串
 *
 * https://leetcode-cn.com/problems/reverse-string/description/
 *
 * algorithms
 * Easy (73.61%)
 * Likes:    325
 * Dislikes: 0
 * Total Accepted:    223.7K
 * Total Submissions: 303.7K
 * Testcase Example:  '["h","e","l","l","o"]'
 *
 * 编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 char[] 的形式给出。
 * 
 * 不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题。
 * 
 * 你可以假设数组中的所有字符都是 ASCII 码表中的可打印字符。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 输入：["h","e","l","l","o"]
 * 输出：["o","l","l","e","h"]
 * 
 * 
 * 示例 2：
 * 
 * 输入：["H","a","n","n","a","h"]
 * 输出：["h","a","n","n","a","H"]
 * 
 */
/*
    题解：
        实现 Array.prototype.reverse
        1. 使用双指针一前一后交换， S(n) = 1， T(n) = O(n)
        2. Array.prototype.reverse 需要 O(n) 空间复杂度
*/
// @lc code=start
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function(s) {
    for(let i = 0; i < (s.length >> 1); i++) {
        const oppoIdx = s.length - 1 - i;
        [s[i], s[oppoIdx]] = [s[oppoIdx], s[i]];
    }
};
// @lc code=end

