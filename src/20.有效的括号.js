/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 *
 * https://leetcode-cn.com/problems/valid-parentheses/description/
 *
 * algorithms
 * Easy (43.24%)
 * Likes:    2014
 * Dislikes: 0
 * Total Accepted:    468.6K
 * Total Submissions: 1.1M
 * Testcase Example:  '"()"'
 *
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
 * 
 * 有效字符串需满足：
 * 
 * 
 * 左括号必须用相同类型的右括号闭合。
 * 左括号必须以正确的顺序闭合。
 * 
 * 
 * 注意空字符串可被认为是有效字符串。
 * 
 * 示例 1:
 * 
 * 输入: "()"
 * 输出: true
 * 
 * 
 * 示例 2:
 * 
 * 输入: "()[]{}"
 * 输出: true
 * 
 * 
 * 示例 3:
 * 
 * 输入: "(]"
 * 输出: false
 * 
 * 
 * 示例 4:
 * 
 * 输入: "([)]"
 * 输出: false
 * 
 * 
 * 示例 5:
 * 
 * 输入: "{[]}"
 * 输出: true
 * 
 */
/**
    题解：
        1. 左符号就入栈
        2. 不是左符号，就出栈匹配
        3. 检测 栈的length 
 */
// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    const stack = [];
    const map = {
        '(': ')',
        '{': '}',
        '[': ']',
    }

    for (let i = 0; i < s.length; i++) {
        if (s[i] in map) {                  // 1. 左符号就入栈
            stack.push(s[i]);
        } else {                            // 2. 不是左符号
            const right = s[i];                 // 说明是右符号
            const left = stack.pop();           // 左符号出栈
            if (map[left] === right) {          // 判断是否匹配
                continue;
            } else {
                return false;
            }
        }
    }
    return stack.length === 0;              // 3. 检测 栈的length 为空
};
// @lc code=end

