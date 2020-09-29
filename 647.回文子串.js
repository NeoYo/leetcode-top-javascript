/*
 * @lc app=leetcode.cn id=647 lang=javascript
 *
 * [647] 回文子串
 *
 * https://leetcode-cn.com/problems/palindromic-substrings/description/
 *
 * algorithms
 * Medium (64.60%)
 * Likes:    403
 * Dislikes: 0
 * Total Accepted:    65.8K
 * Total Submissions: 101.9K
 * Testcase Example:  '"abc"'
 *
 * 给定一个字符串，你的任务是计算这个字符串中有多少个回文子串。
 * 
 * 具有不同开始位置或结束位置的子串，即使是由相同的字符组成，也会被视作不同的子串。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 输入："abc"
 * 输出：3
 * 解释：三个回文子串: "a", "b", "c"
 * 
 * 
 * 示例 2：
 * 
 * 输入："aaa"
 * 输出：6
 * 解释：6个回文子串: "a", "a", "a", "aa", "aa", "aaa"
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 输入的字符串长度不会超过 1000 。
 * 
 * 
 */

/**
题解：
    0. 暴力法
        时间复杂度：O(n^3)
        两层 for 循环 * isPalindrome

        // 验证回文串
        var isPalindrome = function(s) {
            for (let i = 0; i < (s.length >> 1); i++) {
                if (s[i] !== s[s.length - 1 - i]) {
                    return false;
                }
            }
            return true;
        };

    1. 中心扩展法
        本质：两层 for 循环变一层，遍历下一层与 isPalindrome 合并
        注意点：
            回文串有两种情况，长度是奇数和偶数
            奇数是 以 i 为中心
            偶数是 以 i 和 i+1 两个的中间为中心
        算法：        
            以 aaa 为例，从特例到通用代码

            a a a
            _ _ _   以每个 _ 位置对应的字母为中心，左右拓展，得到奇数长度的回文串
             . .    以每个 _ 的右边 . 位置（相邻两字母的中间）为中心，左右拓展，得到偶数长度的回文串

            外层 for i {
                以 i 为中心，左右拓展，同时 isPalindrome
                是回文就继续拓展，不是回文就 break
            }

    2. 马拖车算法
            
    参考资料：https://leetcode-cn.com/problems/palindromic-substrings/solution/hui-wen-zi-chuan-by-leetcode-solution/
    

 */
// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function(s) {
    // const result = [];
    let total = 0;
    for (let i = 0; i < s.length; i++) {
        // 类型一：i 作为中心，得到奇数长度的回文串
        let left = i - 1;
        let right = i + 1;
        // result.push(s[i]);
        total++;
        while (left >= 0 && right < s.length
            && s[left] === s[right]) {
            // result.push(s.slice(left, right+1));
            total++;
            left--;
            right++;
        }
        // 类型二： i 和 i+1 作为中心，得到偶数长度的回文串
        /*
            a a a
            _ _ _   以每个 _ 位置对应的字母为中心，左右拓展，得到奇数长度的回文串
             . .   

            偶数长度
            回顾上面的题解：以每个 _ 的右边 . 位置（相邻两字母的中间）为中心，左右拓展，得到偶数长度的回文串
            这里的 _ 就是指 center
         */
        left = i;
        right = i + 1;
        while (left >= 0 && right < s.length
            && s[left] === s[right]) {
            // result.push(s.slice(left, right+1));
            total++;
            left--;
            right++;
        }
    }
    return total;
    // console.log('result: ', result);
};
// @lc code=end

/**
    调试用例：""aaa""
    Write directly...
 */

