/*
 * @lc app=leetcode.cn id=22 lang=javascript
 *
 * [22] 括号生成
 *
 * https://leetcode-cn.com/problems/generate-parentheses/description/
 *
 * algorithms
 * Medium (76.46%)
 * Likes:    1444
 * Dislikes: 0
 * Total Accepted:    202.9K
 * Total Submissions: 265.2K
 * Testcase Example:  '3'
 *
 * 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
 * 
 * 
 * 
 * 示例：
 * 
 * 输入：n = 3
 * 输出：[
 * ⁠      "((()))",
 * ⁠      "(()())",
 * ⁠      "(())()",
 * ⁠      "()(())",
 * ⁠      "()()()"
 * ⁠    ]
 * 
 * 
 */
/**
    解一：暴力法
        深度优先遍历，找到所有结果
        判断是否满足对称括号条件
        实现：使用递归

    解二：DFS (递归)
        其实是深度优先遍历的升级版， 回溯+剪枝；
        递归利用的是系统栈
        https://pic.leetcode-cn.com/7ec04f84e936e95782aba26c4663c5fe7aaf94a2a80986a97d81574467b0c513-LeetCode%20%E7%AC%AC%2022%20%E9%A2%98%EF%BC%9A%E2%80%9C%E6%8B%AC%E5%8F%B7%E7%94%9F%E5%87%BA%E2%80%9D%E9%A2%98%E8%A7%A3%E9%85%8D%E5%9B%BE.png
        解题思路：
            1. 举 n = 2 的例子，总结规律

            2. 规律如下
                1. 往左和往右次数都：n
                2. 左边继续递归条件：left < n
                3. 右边继续递归条件：right < left

    解三：BFS (队列)
        思路：就是将递归、扁平化。
        容器：队列。每个节点都要存储好 left、right、res。

    参考资料：
        https://leetcode-cn.com/problems/generate-parentheses/solution/hui-su-suan-fa-by-liweiwei1419/
 */
var generateParenthesis = function(n) {
    const dfs = function (str, left, right, result) {
        if (left === n && right === n) {
            result.push(str);
            return;
        }
        if (left > n) {
            return;
        }
        if (right > left) {
            return;
        }
        dfs(str + '(', left + 1, right, result);
        dfs(str + ')', left, right + 1, result);
    }
    const result = [];
    dfs('', 0, 0, result);
    return result;
};
// @lc code=start
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {

};
// @lc code=end

