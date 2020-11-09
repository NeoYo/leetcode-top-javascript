/*
 * @lc app=leetcode.cn id=5 lang=javascript
 *
 * [5] 最长回文子串
 *
 * https://leetcode-cn.com/problems/longest-palindromic-substring/description/
 *
 * algorithms
 * Medium (32.20%)
 * Likes:    2872
 * Dislikes: 0
 * Total Accepted:    411.8K
 * Total Submissions: 1.3M
 * Testcase Example:  '"babad"'
 *
 * 给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。
 * 
 * 示例 1：
 * 
 * 输入: "babad"
 * 输出: "bab"
 * 注意: "aba" 也是一个有效答案。
 * 
 * 
 * 示例 2：
 * 
 * 输入: "cbbd"
 * 输出: "bb"
 * 
 * 
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    let maxSub = '';
    for (let i = 0; i < s.length; i++) {
        const oddSpreadLength = Math.min(
            s.length - 1 - i,
            i
        );
        for (let spread = 0; spread <= oddSpreadLength; spread++) {
            if (s[i + spread] !== s[i - spread]) {
                break;
            }
            if ((1 + spread * 2) > maxSub.length) {
                maxSub = s.slice(i - spread, i + spread + 1);
            }
        }
        const evenSpreadLength = Math.min(
            s.length - i,
            i
        );
        for (let spread = 0; spread <= evenSpreadLength; spread++) {
            if (s[i + 1 + spread] !== s[i - spread]) {
                break;
            }
            if ((2 + spread * 2) > maxSub.length) {
                maxSub = s.slice(i - spread, i + spread + 2);
            }
        }
    }
    return maxSub;
};
// @lc code=end

