/*
 * @lc app=leetcode.cn id=10 lang=javascript
 *
 * [10] 正则表达式匹配
 *
 * https://leetcode-cn.com/problems/regular-expression-matching/description/
 *
 * algorithms
 * Hard (29.68%)
 * Likes:    1413
 * Dislikes: 0
 * Total Accepted:    102.1K
 * Total Submissions: 341K
 * Testcase Example:  '"aa"\n"a"'
 *
 * 给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。
 * 
 * '.' 匹配任意单个字符
 * '*' 匹配零个或多个前面的那一个元素
 * 
 * 
 * 所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。
 * 
 * 说明:
 * 
 * 
 * s 可能为空，且只包含从 a-z 的小写字母。
 * p 可能为空，且只包含从 a-z 的小写字母，以及字符 . 和 *。
 * 
 * 
 * 示例 1:
 * 
 * 输入:
 * s = "aa"
 * p = "a"
 * 输出: false
 * 解释: "a" 无法匹配 "aa" 整个字符串。
 * 
 * 
 * 示例 2:
 * 
 * 输入:
 * s = "aa"
 * p = "a*"
 * 输出: true
 * 解释: 因为 '*' 代表可以匹配零个或多个前面的那一个元素, 在这里前面的元素就是 'a'。因此，字符串 "aa" 可被视为 'a' 重复了一次。
 * 
 * 
 * 示例 3:
 * 
 * 输入:
 * s = "ab"
 * p = ".*"
 * 输出: true
 * 解释: ".*" 表示可匹配零个或多个（'*'）任意字符（'.'）。
 * 
 * 
 * 示例 4:
 * 
 * 输入:
 * s = "aab"
 * p = "c*a*b"
 * 输出: true
 * 解释: 因为 '*' 表示零个或多个，这里 'c' 为 0 个, 'a' 被重复一次。因此可以匹配字符串 "aab"。
 * 
 * 
 * 示例 5:
 * 
 * 输入:
 * s = "mississippi"
 * p = "mis*is*p*."
 * 输出: false
 * 
 */
/*
    如果没有星号（正则表达式中的 * ），问题会很简单——我们只需要从左到右检查匹配串 s 是否能匹配模式串 p 的每一个字符。可以用循环，也可以递归
    
    参考资料：[五分钟学算法 - 深度解析「正则表达式匹配」：从暴力解法到动态规划](https://mp.weixin.qq.com/s/ZoytuPt5dfP5pMODbuKnCQ)

    要证明 DP[i][j] 是 true 的，分为以下两条回返路径（这就是为什么先递归，再递推）

            j
        p abc
        s c.a
            i

    1. j 等于 i, DP[i][j] = DP[i-1][j-1]

              j
        p xxba*
        s xx_
            i

    2. j === '*'
        2.1 ( a* 中 a 出现 0 次的情况， 即 a* 都被消耗了)            DP[i][j] = DP[i][j-2]
        2.2 ( a* 中 a 出现 1 次的情况， 即 a* 的 * 被消耗了)         DP[i][j] = DP[i][j-1]
        2.3 ( a* 中 a 出现 多 次的情况，即 a* 不会被消耗, a 被消耗了) DP[i][j] = DP[i-1][j]

        2.1 例子

                  j
            p ccba*
            s ccb
                i

        2.2 例子

                  j
            p ccba*
            s cca
                i

        2.3 例子

                   j
            p ccbaa*
            s cca
                i                            

    3. 其他, return false
 */
// @lc code=start
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
    // 1. 初始化
    s = '#' + s;
    p = '#' + p;
    const DP = new Array(s.length);
    for (let i = 0; i < DP.length; i++) {
        DP[i] = [];
    }
    // 2. 边界处理 （因为递推边界 j - 2，i - 1，要先准备好, undefined的 可以后面 !! 处理）
    DP[0][0] = true;
    for (let j = 2; j < p.length; j++) {
        DP[0][j] = p[j] === '*' ? DP[0][j-2] : false;
    }
    // 3. 递推公式
    for (let i = 1; i < s.length; i++) {
        for (let j = 1; j < p.length; j++) {
            if (p[j] !== '*') {
                DP[i][j] = equal(s[i], p[j]) && DP[i-1][j-1];
            } else {
                DP[i][j] = DP[i][j-2] || DP[i][j-1] || (DP[i-1][j] && equal(s[i], p[j-1]));
                        // 对应上面3种情形
            }
        }
    }
    return !!DP[s.length - 1][p.length - 1];
};

const equal = (sChar, pChar) => (
    (sChar === pChar) || (
        pChar === '.' && sChar != null
    )
);

// console.assert(!isMatch('aa', 'a'), 'aa, a');
// console.assert(isMatch('aa', 'a*'), 'aa, a*');
// console.assert(isMatch('ab', '.*'), 'ab, .*');
// console.assert(isMatch('aab', 'c*a*b*'), 'aab, c*a*b*');
// console.assert(isMatch('mississippi', 'mis*is*ip*.'), 'mississippi mis*is*ip*.');
// console.assert(isMatch('', '.*'));

// @lc code=end

