/*
 * @lc app=leetcode.cn id=7 lang=javascript
 *
 * [7] 整数反转
 *
 * https://leetcode-cn.com/problems/reverse-integer/description/
 *
 * algorithms
 * Easy (34.72%)
 * Likes:    2374
 * Dislikes: 0
 * Total Accepted:    523.1K
 * Total Submissions: 1.5M
 * Testcase Example:  '123'
 *
 * 给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。
 * 
 * 示例 1:
 * 
 * 输入: 123
 * 输出: 321
 * 
 * 
 * 示例 2:
 * 
 * 输入: -123
 * 输出: -321
 * 
 * 
 * 示例 3:
 * 
 * 输入: 120
 * 输出: 21
 * 
 * 
 * 注意:
 * 
 * 假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−2^31,  2^31 − 1]。请根据这个假设，如果反转后整数溢出那么就返回
 * 0。
 * 
 */
/**
    知识点：取余与整除
    // 特殊考虑 0、末尾0、-号
     * x = 123
     * radix = 10
     * rev = 0
     * 阶段一
     * pop = x % radix = 3
     * rev = rev * radix + pop = 3
     * x = Math.floor(x / radix) = 12
     * 阶段二
     * pop = x % radix = 2
     * rev = rev * radix + pop = 32
     * x = Math.floor(x / radix) = 1
     * 阶段三
     * pop = x % radix = 1
     * rev = rev * radix + pop = 321
     * x = Math.floor(x / radix) = 0
     * 
     * if (x === 0) {
     * }
     > 这个答案并不对，因为 `if (rev > MAX_VAL || rev < MIN_VAL) {` 已经超出了范围。 
     > 正确的解法请参考 [画解算法：7. 整数反转](https://leetcode-cn.com/problems/reverse-integer/solution/hua-jie-suan-fa-7-zheng-shu-fan-zhuan-by-guanpengc/)
 */
// @lc code=start
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    let rev = 0;
    const radix = 10;
    const MAX_VAL = Math.pow(2, 31) - 1;
    const MIN_VAL = - Math.pow(2, 31);
    while (x !== 0) {
        rev = rev * radix + x % radix;
        x = ~~(x / radix);
    }
    if (rev > MAX_VAL || rev < MIN_VAL) {
        return 0;
    }
    return rev;
};
// @lc code=end
/**
    解二. 数组反转
    var reverse = function (x) {
        let arr = (x + '').split('').reverse();    
        if (arr[arr.length - 1] === '-') {
            arr.unshift(arr.pop());
        }
        const rev = Number(arr.join('')); 
        if (rev > Math.pow(2, 31) - 1 || rev < - Math.pow(2, 31)) {
            return 0;
        }
        return rev;
    };


    #### 3. 栈
    栈实际上是为了实现 Array.prototype.reverse



    #### 4. 相关知识

    > 原码、补码、反码 有时间复习下

    > JS `Math.floor` `Math.ceil` `~~` `parseInt(String/Number) // Number 自动转 String` `ES6 Math.trunc` 参考链接 [stackoverflow - convert a float number to a whole number ](https://stackoverflow.com/questions/596467/how-do-i-convert-a-float-number-to-a-whole-number-in-javascript)
 */

