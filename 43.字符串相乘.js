/*
 * @lc app=leetcode.cn id=43 lang=javascript
 *
 * [43] 字符串相乘
 *
 * https://leetcode-cn.com/problems/multiply-strings/description/
 *
 * algorithms
 * Medium (44.49%)
 * Likes:    495
 * Dislikes: 0
 * Total Accepted:    108.7K
 * Total Submissions: 244.2K
 * Testcase Example:  '"2"\n"3"'
 *
 * 给定两个以字符串形式表示的非负整数 num1 和 num2，返回 num1 和 num2 的乘积，它们的乘积也表示为字符串形式。
 * 
 * 示例 1:
 * 
 * 输入: num1 = "2", num2 = "3"
 * 输出: "6"
 * 
 * 示例 2:
 * 
 * 输入: num1 = "123", num2 = "456"
 * 输出: "56088"
 * 
 * 说明：
 * 
 * 
 * num1 和 num2 的长度小于110。
 * num1 和 num2 只包含数字 0-9。
 * num1 和 num2 均不以零开头，除非是数字 0 本身。
 * 不能使用任何标准库的大数类型（比如 BigInteger）或直接将输入转换为整数来处理。
 * 
 * 标签：数学 字符串
 * 
 */
/**
    相似题目：字符串相加 https://github.com/NeoYo/leetcode-top-javascript/blob/master/415.%E5%AD%97%E7%AC%A6%E4%B8%B2%E7%9B%B8%E5%8A%A0.js

    题解：
        逐位相乘逐位累加
        以 '123' 和 '456' 为例，手算乘法
            123 与 6:  3和6  20和6  100和6
            123 与 5:  3和5  20和5  100和5
            123 与 4:  3和4  20和4  100和4
        相当于拆解成 两个个位数字相乘，再填充到对应的数组位置

    注意点：
        1. ['0', '0'] => '0'  处理：'' || '0' = '0'

    参考资料：
        官方题解 https://leetcode-cn.com/problems/multiply-strings/solution/zi-fu-chuan-xiang-cheng-by-leetcode-solution/
 */
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function(num1, num2) {
    const res = Array(num1.length + num2.length).fill(0); // res  从右边到左边；数值：最低位 -> 最高位；数组索引： 高 -> 低
    let num2Idx = num2.length - 1;                        // num2 从右边到左边；数值：最低位 -> 最高位；数组索引：高 -> 低
    while (num2Idx >= 0) {
        let num1Idx = num1.length - 1;                    // num1 从右边到左边；数值：最低位 -> 最高位；数组索引：高 -> 低
        while (num1Idx >= 0) {
            const cursor = num1Idx + num2Idx + 1;
            const sum = res[cursor] + parseInt(num1[num1Idx]) * parseInt(num2[num2Idx]); // 假设最大 9*9+9 = 90 不会超过两位
            res[cursor] = sum % 10;
            res[cursor - 1] += Math.floor(sum / 10);      // 进位
            num1Idx--;
        }
        num2Idx--;
    }
    return res.join('').replace(/^0*/, '') || '0';
};
// @lc code=end

multiply('123', '456');
/**
    错误实例如下，会出现大数溢出，使得结果错误

    Testcase
        "123456789"
        "987654321"
    Answer
        "121932631112635260"
    Expected Answer
        "121932631112635269"
 */
var multiply = function(num1, num2) {
    const num2L = num2.length - 1;
    let num2Idx = num2.length - 1;
    let res = 0;
    // 竖式乘法
    while (num2Idx >= 0) {
        res += num2[num2Idx] * num1 * Math.pow(10, num2L - num2Idx);
        // console.log(res);
        num2Idx--;
    }
    return String(res);
};