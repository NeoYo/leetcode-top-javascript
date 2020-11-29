/*
 * @lc app=leetcode.cn id=125 lang=javascript
 *
 * [125] 验证回文串
 *
 * https://leetcode-cn.com/problems/valid-palindrome/description/
 *
 * algorithms
 * Easy (46.56%)
 * Likes:    293
 * Dislikes: 0
 * Total Accepted:    177.2K
 * Total Submissions: 380.3K
 * Testcase Example:  '"A man, a plan, a canal: Panama"'
 *
 * 给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。
 * 
 * 说明：本题中，我们将空字符串定义为有效的回文串。
 * 
 * 示例 1:
 * 
 * 输入: "A man, a plan, a canal: Panama"
 * 输出: true
 * 
 * 
 * 示例 2:
 * 
 * 输入: "race a car"
 * 输出: false
 * 
 * 
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    for (let i = 0; i < (s.length >> 1); i++) {
        if (s[i] !== s[s.length - 1 - i]) {
            return false;
        }
    }
    return true;
};
/*
    解一: 头尾指针

    时间复杂度：O(n)

    空间复杂度：O(n)

    number >> 1 === Math.floor(number/2)
    解二: reverse

    var isPalindrome = function(s) {
        const arr = s.toLowerCase().match(/\w|\d/g) || [];
        const str = arr.join('');
        return arr.reverse().join('') === str;
    };

 */

/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    for (let i = 0; i < (s.length >> 1); i++) {
        if (s[i] !== s[s.length - 1 - i]) {
            return false;
        }
    }
    return true;
};
/**
* @param {string} s
* @return {boolean}
*/
var isPalindrome = function(s) {
    const arr = s.toLowerCase().match(/\w|\d/g) || [];
    const str = arr.join('');
    return arr.reverse().join('') === str;
};
// @lc code=end

