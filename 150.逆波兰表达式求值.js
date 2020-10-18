/*
 * @lc app=leetcode.cn id=150 lang=javascript
 *
 * [150] 逆波兰表达式求值
 *
 * https://leetcode-cn.com/problems/evaluate-reverse-polish-notation/description/
 *
 * algorithms
 * Medium (50.38%)
 * Likes:    182
 * Dislikes: 0
 * Total Accepted:    52.8K
 * Total Submissions: 104.8K
 * Testcase Example:  '["2","1","+","3","*"]'
 *
 * 根据 逆波兰表示法，求表达式的值。
 * 
 * 有效的运算符包括 +, -, *, / 。每个运算对象可以是整数，也可以是另一个逆波兰表达式。
 * 
 * 
 * 
 * 说明：
 * 
 * 
 * 整数除法只保留整数部分。
 * 给定逆波兰表达式总是有效的。换句话说，表达式总会得出有效数值且不存在除数为 0 的情况。
 * 
 * 
 * 
 * 
 * 示例 1：
 * 
 * 输入: ["2", "1", "+", "3", "*"]
 * 输出: 9
 * 解释: 该算式转化为常见的中缀算术表达式为：((2 + 1) * 3) = 9
 * 
 * 
 * 示例 2：
 * 
 * 输入: ["4", "13", "5", "/", "+"]
 * 输出: 6
 * 解释: 该算式转化为常见的中缀算术表达式为：(4 + (13 / 5)) = 6
 * 
 * 
 * 示例 3：
 * 
 * 输入: ["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]
 * 输出: 22
 * 解释: 
 * 该算式转化为常见的中缀算术表达式为：
 * ⁠ ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
 * = ((10 * (6 / (12 * -11))) + 17) + 5
 * = ((10 * (6 / -132)) + 17) + 5
 * = ((10 * 0) + 17) + 5
 * = (0 + 17) + 5
 * = 17 + 5
 * = 22
 * 
 * 
 */

/*
标签: 逆波兰

划重点：
    逆波兰表达式：
        逆波兰表达式是一种后缀表达式，所谓后缀就是指算符写在后面。
        平常使用的算式则是一种中缀表达式，如 ( 1 + 2 ) * ( 3 + 4 ) 。
        该算式的逆波兰表达式写法为 ( ( 1 2 + ) ( 3 4 + ) * ) 。

    逆波兰表达式 有两个优点：
        1. 去掉括号后表达式无歧义，上式即便写成 1 2 + 3 4 + * 也可以依据次序计算出正确结果。
        2. 适合用栈操作运算：遇到数字则入栈；遇到算符则取出栈顶两个数字进行计算，并将结果压入栈中。

注意点：
    1. 要把 数字字符串 token 转化为数字 => Number(token)
    2. js 语言的 / 带小数点，与数学中的 / 整除不同 => 需要使用 parseInt
        Number 会产生误差
        parseInt(1.8) = 1
        parseInt(-1.8) = -1
*/
// @lc code=start
/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function(tokens) {
    const stack = [];
    for (token of tokens) {
        if (token === '+' || token === '-' || token === '*' || token === '/' ) {
            const right = Number(stack.pop());
            const left = Number(stack.pop());
            switch (token) {
                case '+':
                    stack.push(right + left);
                    break;
                case '-':
                    stack.push(left - right);
                    break;
                case '*': {
                    stack.push(right * left);
                    break;
                }
                case '/': {
                    stack.push(parseInt(left / right));
                    break;
                }
            }
        } else {
            stack.push(token);
        }
    }
    return stack.pop();
};
// @lc code=end

evalRPN(["10","6","9","3","+","-11","*","/","*","17","+","5","+"], 22);








