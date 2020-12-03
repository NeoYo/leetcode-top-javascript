/*
 * @lc app=leetcode.cn id=69 lang=javascript
 *
 * [69] x 的平方根
 *
 * https://leetcode-cn.com/problems/sqrtx/description/
 *
 * algorithms
 * Easy (38.92%)
 * Likes:    535
 * Dislikes: 0
 * Total Accepted:    221.3K
 * Total Submissions: 568.6K
 * Testcase Example:  '4'
 *
 * 实现 int sqrt(int x) 函数。
 * 
 * 计算并返回 x 的平方根，其中 x 是非负整数。
 * 
 * 由于返回类型是整数，结果只保留整数的部分，小数部分将被舍去。
 * 
 * 示例 1:
 * 
 * 输入: 4
 * 输出: 2
 * 
 * 
 * 示例 2:
 * 
 * 输入: 8
 * 输出: 2
 * 说明: 8 的平方根是 2.82842..., 
 * 由于返回类型是整数，小数部分将被舍去。
 * 
 * 
 */
// @lc code=start
/*
   > 除了二分法，还可以用牛顿迭代法
   返回带精度的 float 类型
*/
/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
    if (x === 0 || x === 1) {
        return x;
    }
    let left = 0;
    let right = x;
    let mid = left + (right - left)>>1;
    while ((mid * mid !== x) 
           && (left + 1 < right)) {
        if (mid * mid > x) {
            right = mid;
        } else {
            left = mid;
        }
        mid = left + (right - left)>>1
    }
    return mid;
};
/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
    if (x === 1 || x === 0) {
        return x;
    }
    let left = 0;
    let right = x;
    let mid = left + (right - left)/2;
    while (left + 0.001<= right) {
        mid = left + (right - left)/2;
        const mid2 = mid * mid;
        if (mid2 === x) {
            return mid;
        }
        if (mid2 < x) {
            left = mid;
        } else {
            right = mid;
        }
    }
    return mid;
};
// @lc code=end
mySqrt(2);

