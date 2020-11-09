/*
 * @lc app=leetcode.cn id=415 lang=javascript
 *
 * [415] 字符串相加
 *
 * https://leetcode-cn.com/problems/add-strings/description/
 *
 * algorithms
 * Easy (51.85%)
 * Likes:    270
 * Dislikes: 0
 * Total Accepted:    80.7K
 * Total Submissions: 155.7K
 * Testcase Example:  '"0"\n"0"'
 *
 * 给定两个字符串形式的非负整数 num1 和num2 ，计算它们的和。
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * num1 和num2 的长度都小于 5100
 * num1 和num2 都只包含数字 0-9
 * num1 和num2 都不包含任何前导零
 * 你不能使用任何內建 BigInteger 库， 也不能直接将输入的字符串转换为整数形式
 * 
 * 标签：数学 字符串
 * 
 */

/**
    题解：
        模拟我们手算两数相加
        逐位相加逐位累加

    知识点：
        1. js 中数组的 push，pop 就是栈 T(n) = O(1)，最后再 Array.prototype.reverse 降低时间复杂度
           如果使用 Array.prototype.unshift T(n) = O(n)
        2. 字符串 str 可以通过 str[index] 获取字符，相当于 String.protype.charAt
        3. '1'.charCodeAt(0) - '0'.charCodeAt(0) = 1

    参考题解：https://leetcode-cn.com/problems/add-strings/solution/zi-fu-chuan-xiang-jia-by-leetcode-solution/

    小小的思考：https://leetcode-cn.com/problems/add-strings/solution/zi-fu-chuan-xiang-jia-by-leetcode-solution/621051
 */

// @lc code=start
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function(num1, num2) {
    let num1Idx = num1.length - 1,  // num1 从后往前指针（从低位到高位）
        num2Idx = num2.length - 1,  // num2 从后往前指针（从低位到高位）
        addOne = false;             // 满十进位+1
    const zeroCharCode = '0'.charCodeAt(0);
    const ans = [];
    while (num1Idx >= 0 || num2Idx >= 0 || addOne != false) {
        const x = num1Idx >= 0 ? num1.charCodeAt(num1Idx) - zeroCharCode : 0; // 超出边界补0
        const y = num2Idx >= 0 ? num2.charCodeAt(num2Idx) - zeroCharCode : 0; // 超出边界补0
        const result = x + y + (addOne ? 1 : 0);
        ans.push(result % 10);
        addOne = result >= 10;
        num1Idx--;
        num2Idx--;
    }
    return ans.reverse().join('');
};
// @lc code=end

