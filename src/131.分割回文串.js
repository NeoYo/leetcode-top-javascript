/*
 * @lc app=leetcode.cn id=131 lang=javascript
 *
 * [131] 分割回文串
 *
 * https://leetcode-cn.com/problems/palindrome-partitioning/description/
 *
 * algorithms
 * Medium (68.58%)
 * Likes:    350
 * Dislikes: 0
 * Total Accepted:    43.5K
 * Total Submissions: 63.2K
 * Testcase Example:  '"aab"'
 *
 * 给定一个字符串 s，将 s 分割成一些子串，使每个子串都是回文串。
 * 
 * 返回 s 所有可能的分割方案。
 * 
 * 示例:
 * 
 * 输入: "aab"
 * 输出:
 * [
 * ⁠ ["aa","b"],
 * ⁠ ["a","a","b"]
 * ]
 * 
 */

/**
回溯法

    第一步，先思考分割字符串的情况。如何分割

    举例：aab，3个字母，每两个字母之间可以进行一次分割，共有两条分割线，即 a\a|b
        每条分割线，都有使用和不使用的情况，即 两种情况，2*2 = 2^2，总共 4个情况。
                       aab
                     /     \
                 a|ab      aab
                 /  \     /   \
             a|a|b  a|ab aa|b  aab

        情况如下：
        1. a|a|b  [a, a, b]
        2. a|ab
        3. aa|b
        4. aab

        那么如果是 4 个字母呢，比如 aabb，3条分割线，每条分割线有 2种情况，总共有 2*2*2 = 2^3

        以此类推：
        如果有 n 个字母，总共的情况有，2^(n-1)

    第二步，分割字符串代码实现

        关于选择，在进行分割过程中，每一次分割都会面临两个选择，一个是分割，一个是不分割
        关于取值，从第一步分析可知，想得到的是图中在底层的数据（对应到树中，就是叶子节点）

                  aab                    (splitIdx, path, start) = (1, [], 0)
                /     \                             /                 \
            a|ab      aab              (2, [a], 1) 剩 ab           (2, [], 0)
            /  \     /   \
        a|a|b  a|ab aa|b  aab    

        var partition = function (s) {
            const paths = [];
            const traceback = (splitIdx, path, start) => {
                if (splitIdx === s.length) {
                    // 判断是否是叶子节点
                    if (start != s.length) {
                        const subStr = s.slice(start);
                        path = [...path, subStr];
                    }
                    paths.push(path);
                    return;
                }
                // 选择一: 分割
                const subStr = s.slice(start, splitIdx);
                traceback(splitIdx + 1, [...path, subStr], splitIdx);
             
                // 选择二: 不分割
                traceback(splitIdx + 1, [...path], start);
            }
            return paths;
        }

    第三步，分割回文串，在上面第二步的基础上，判断分割得到的每个子串，是否是回文串
            只要出现子串不是回文串，那当前组合，就不可能期望的结果，就舍弃当前路径（剪枝）
        代码如下：
 */
// @lc code=start
var partition = function (s) {
    var isPalindrome = function (s) {   // 这里应该不需要转换
        const arr = s.toLowerCase().match(/\w|\d/g);
        for (let i = 0; i < (arr.length >> 1); i++) {
            if (arr[i] !== arr[arr.length - 1 - i]) {
                return false;
            }
        }
        return true;
    };

    const paths = [];
    const traceback = (splitIdx, path, start) => {
        if (splitIdx === s.length) {
            if (start != s.length) {
                const subStr = s.slice(start);
                if (!isPalindrome(subStr)) {
                    // 剪枝
                    return;
                }
                path = [...path, subStr];
            }
            paths.push(path);
            return;
        }
        // 选择一: 分割
        const subStr = s.slice(start, splitIdx);
        if (isPalindrome(subStr)) {
            traceback(splitIdx + 1, [...path, subStr], splitIdx);
                // 分割的话，因为 s[start, splitIdx) 已经没了，所以下一个 start 从 splitIdx
        } else {
            // 不处理（剪枝）
        }

        // 选择二: 不分割
        traceback(splitIdx + 1, [...path], start);
    }
    traceback(1, [], 0);
    return paths;
};
partition("aab");
// @lc code=end

