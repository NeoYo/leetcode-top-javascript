/*
 * @lc app=leetcode.cn id=9 lang=javascript
 *
 * [9] 回文数
 *
 * https://leetcode-cn.com/problems/palindrome-number/description/
 *
 * algorithms
 * Easy (58.36%)
 * Likes:    1160
 * Dislikes: 0
 * Total Accepted:    402K
 * Total Submissions: 688.2K
 * Testcase Example:  '121'
 *
 * 判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。
 * 
 * 示例 1:
 * 
 * 输入: 121
 * 输出: true
 * 
 * 
 * 示例 2:
 * 
 * 输入: -121
 * 输出: false
 * 解释: 从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。
 * 
 * 
 * 示例 3:
 * 
 * 输入: 10
 * 输出: false
 * 解释: 从右向左读, 为 01 。因此它不是一个回文数。
 * 
 * 
 * 进阶:
 * 
 * 你能不将整数转为字符串来解决这个问题吗？
 * 
 */

// @lc code=start
/**
    解一：字符串反转
        T(n) = O(n)
        S(n) = O(n)
 */
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    const str = String(x);
    return str.split('').reverse().join('') === str;
};
/**
    解二：取整和取余
        T(n) = O(log10(n))
        S(n) = O(1)
 */
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    if (x < 0 || (x % 10 == 0 && x !== 0)) return false;
    let reverse = 0;
    /**
     * 关键代码
     */
    while (x > reverse) {
        reverse = reverse * 10 + x % 10;    // 进位+取10余数
        x = Math.floor(x / 10);
    }
    return x === reverse 
        || Math.floor(reverse / 10) === x;
};

// console.assert(isPalindrome(1221) === true);
// console.assert(isPalindrome(12321) === true);
// console.assert(isPalindrome(10) === false); // if (x < 0 || (x % 10 == 0 && x !== 0)) return false;
/*
    解三：前后指针
 */
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    if (x < 0) {
        return false;
    }
    x= x.toString();
    let left = 0;
    let right = x.length - 1;
    while(left <= right) {
        if (x[left] !== x[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
};
/**
    [参考资料 - 动画：回文数的三种解法 | 法解种三的数文回：画动 - 解法三：进阶解法---巧妙解法](https://leetcode-cn.com/problems/palindrome-number/solution/dong-hua-hui-wen-shu-de-san-chong-jie-fa-fa-jie-ch/)
 */
// @lc code=end

