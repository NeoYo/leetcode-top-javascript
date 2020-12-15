/*
 * @lc app=leetcode.cn id=29 lang=javascript
 *
 * [29] 两数相除
 *
 * https://leetcode-cn.com/problems/divide-two-integers/description/
 *
 * algorithms
 * Medium (20.18%)
 * Likes:    467
 * Dislikes: 0
 * Total Accepted:    71.8K
 * Total Submissions: 354.8K
 * Testcase Example:  '10\n3'
 *
 * 给定两个整数，被除数 dividend 和除数 divisor。将两数相除，要求不使用乘法、除法和 mod 运算符。
 * 
 * 返回被除数 dividend 除以除数 divisor 得到的商。
 * 
 * 整数除法的结果应当截去（truncate）其小数部分，例如：truncate(8.345) = 8 以及 truncate(-2.7335) =
 * -2
 * 
 * 
 * 
 * 示例 1:
 * 
 * 输入: dividend = 10, divisor = 3
 * 输出: 3
 * 解释: 10/3 = truncate(3.33333..) = truncate(3) = 3
 * 
 * 示例 2:
 * 
 * 输入: dividend = 7, divisor = -3
 * 输出: -2
 * 解释: 7/-3 = truncate(-2.33333..) = -2
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 被除数和除数均为 32 位有符号整数。
 * 除数不为 0。
 * 假设我们的环境只能存储 32 位有符号整数，其数值范围是 [−2^31,  2^31 − 1]。本题中，如果除法结果溢出，则返回 2^31 − 1。
 * 
 * 
 */
/**
    题解：二分查找
        1. 两个正数、相除，二分查找法逼近
        2. 一正一负 转化为 两个正数 （ 7 除 3 等于 2； 7 除 -3 等于 -2）
        3. 0、1 边界处理
 */
// @lc code=start
/**
    解一：递归
 */
/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
var divide = function(dividend, divisor) {
    if (dividend === 0) {
        return 0;
    }
    const validate = (value) => {
        const MAX_INTERGER = Math.pow(2, 31);
        if (value > MAX_INTERGER - 1 || value < -1 * MAX_INTERGER){
            return MAX_INTERGER - 1;
        }
        return value;
    }
    if (Math.abs(divisor) === 1) {
        return validate(divisor * dividend);
    }

    const negative = (dividend > 0) !== (divisor > 0);
    divisor = Math.abs(divisor);
    dividend = Math.abs(dividend);
    var find = function(min, max) {
        const half = Math.floor((min + max) / 2);
        if (half * divisor > dividend) {
            return find(min, half);
        }
        if (half * divisor < dividend - divisor) {
            return find(half, max);
        }
        return half;
    }
    const res = (negative ? -1 : 1) * find(0, dividend);
    return validate(res);;
};
/**
    解二：循环

        > 下面的循环比较精简， 不需要处理 0、1、-1

        > 二分查找是有 +1 和 -1 的

        > 下面循环， right 太大了，浪费计算次数
 */
/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
var divide = function(dividend, divisor) {
    let isForward = (dividend > 0 && divisor > 0) || (dividend < 0 && divisor < 0) ? true : false;
    var absDividend = dividend > 0 ? dividend : -dividend;
    var absDivisor = divisor > 0 ? divisor : -divisor;
  
    var left = 0;
    var right = isForward ? 2147483647 : 2147483648;
    var result = left;
    while (left <= right) {
      middle = Math.floor((left + right) / 2);
      if (middle * absDivisor == absDividend) {
        result = middle;
        break;
      } else if (middle * absDivisor > absDividend) {
        right = middle - 1;
      } else {
        result = middle; // 赋值在这里，所以输出值，乘以 除数，小于被除数
        left = middle + 1;
      }
    }
    result = isForward ? result : -result;
    return result;
};
// @lc code=end

