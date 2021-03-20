/*
 * @lc app=leetcode.cn id=8 lang=javascript
 *
 * [8] 字符串转换整数 (atoi)
 *
 * https://leetcode-cn.com/problems/string-to-integer-atoi/description/
 *
 * algorithms
 * Medium (21.04%)
 * Likes:    910
 * Dislikes: 0
 * Total Accepted:    229.3K
 * Total Submissions: 1.1M
 * Testcase Example:  '"42"'
 *
 * 请你来实现一个 atoi 函数，使其能将字符串转换成整数。
 * 
 * 首先，该函数会根据需要丢弃无用的开头空格字符，直到寻找到第一个非空格的字符为止。接下来的转化规则如下：
 * 
 * 
 * 如果第一个非空字符为正或者负号时，则将该符号与之后面尽可能多的连续数字字符组合起来，形成一个有符号整数。
 * 假如第一个非空字符是数字，则直接将其与之后连续的数字字符组合起来，形成一个整数。
 * 该字符串在有效的整数部分之后也可能会存在多余的字符，那么这些字符可以被忽略，它们对函数不应该造成影响。
 * 
 * 
 * 注意：假如该字符串中的第一个非空格字符不是一个有效整数字符、字符串为空或字符串仅包含空白字符时，则你的函数不需要进行转换，即无法进行有效转换。
 * 
 * 在任何情况下，若函数不能进行有效的转换时，请返回 0 。
 * 
 * 提示：
 * 
 * 
 * 本题中的空白字符只包括空格字符 ' ' 。
 * 假设我们的环境只能存储 32 位大小的有符号整数，那么其数值范围为 [−2^31,  2^31 − 1]。如果数值超过这个范围，请返回  INT_MAX
 * (2^31 − 1) 或 INT_MIN (−2^31) 。
 * 
 * 
 * 
 * 
 * 示例 1:
 * 
 * 输入: "42"
 * 输出: 42
 * 
 * 
 * 示例 2:
 * 
 * 输入: "   -42"
 * 输出: -42
 * 解释: 第一个非空白字符为 '-', 它是一个负号。
 * 我们尽可能将负号与后面所有连续出现的数字组合起来，最后得到 -42 。
 * 
 * 
 * 示例 3:
 * 
 * 输入: "4193 with words"
 * 输出: 4193
 * 解释: 转换截止于数字 '3' ，因为它的下一个字符不为数字。
 * 
 * 
 * 示例 4:
 * 
 * 输入: "words and 987"
 * 输出: 0
 * 解释: 第一个非空字符是 'w', 但它不是数字或正、负号。
 * ⁠    因此无法执行有效的转换。
 * 
 * 示例 5:
 * 
 * 输入: "-91283472332"
 * 输出: -2147483648
 * 解释: 数字 "-91283472332" 超过 32 位有符号整数范围。 
 * 因此返回 INT_MIN (−2^31) 。
 * 
 * 
 */
/**
    官方题解 - 有限状态机 deterministic finite automaton, DFA  有限：有限的状态
        挺有趣的，这实际上是编译原理中的 token 词法分析部分，自动状态机，让它转移更清晰有条理，自动化
        https://leetcode-cn.com/problems/string-to-integer-atoi/solution/zi-fu-chuan-zhuan-huan-zheng-shu-atoi-by-leetcode-/
 */
// @lc code=start
/*
    对 JS 来说，相当于实现 parseInt(str)

    1. 正则表达式
        正则解释
        ^\s*        以 >= 0个 空白字符 开头
        [\+|\-]?    出现 0个或1个 + 或 - 号
        \d+         至少一位数字
 */
/**
 * @param {string} str
 * @return {number}
 */
var myAtoi = function(str) {
    const match = str.match(/^\s*[\+|\-]?\d+/);
    if (match == null) {
        return 0;
    }
    const num = Number(match[0]);
    const MAX_INT = Math.pow(2, 31) - 1;
    const MIN_INT = -(Math.pow(2, 31));
    if (num > MAX_INT) {
        return MAX_INT;
    }
    if (num < MIN_INT) {
        return MIN_INT;
    }
    return num;
};
/*
    2. parseInt
        这道题是对 parseInt 的实现
 */
/**
 * @param {string} str
 * @return {number}
 */
var myAtoi = function(str) {
    let res = parseInt(str) || 0
    if (res > Math.pow(2, 31) - 1) {
        return Math.pow(2, 31) - 1;
    }
    if (res < Math.pow(-2, 31)) {
        return Math.pow(-2, 31);
    }
    return res
};
/**
    3. 有趣的解法-自动机  代码抄的，还没理解=.=
 */
var myAtoi = function (s) {
    class AutoMaton {
        constructor() {
            this.state = 'start'
            this.sign = 1               // 正负: +1 或 -1
            this.answer = 0             // 数值 
            this.max = 2147483648

            this.map = new Map([
                ['start', ['start', 'signed', 'number', 'end']],
                ['signed', ['end', 'end', 'number', 'end']],
                ['number', ['end', 'end', 'number', 'end']],
            ])
        }
        getIndex(char) {
            if (char === ' ') {
                return 0
            } else if (char == '-' || char == '+') {
                return 1
            } else if (!isNaN(char)) {
                return 2
            } else {
                return 3
            }
        }

        get(char) {
            this.state = this.getIndex(char) == 3 ? '' : this.map.get(this.state)[this.getIndex(char)]
            if (this.state == '' || this.state == 'end') {
                return false
            }
            if (this.state === 'number') {
                this.answer = this.answer * 10 + (char - 0)
                // 边界处理
                this.answer = this.sign == 1 ? Math.min(this.max - 1, this.answer) : Math.min(this.max, this.answer)
            } else if (this.state === 'signed') {
                this.sign = char == '+' ? 1 : -1
            }
            return true
        }
    }

    let autoMaton = new AutoMaton()

    for (let char of s) {
        if (!autoMaton.get(char)) {
            break
        }
    }

    return autoMaton.sign * autoMaton.answer
};
// @lc code=end

