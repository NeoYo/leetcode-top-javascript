/*
 * @lc app=leetcode.cn id=17 lang=javascript
 *
 * [17] 电话号码的字母组合
 *
 * https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/description/
 *
 * algorithms
 * Medium (55.50%)
 * Likes:    1017
 * Dislikes: 0
 * Total Accepted:    197.3K
 * Total Submissions: 355.2K
 * Testcase Example:  '"23"'
 *
 * 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。
 * 
 * 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。
 * 
 * 
 * 
 * 示例:
 * 
 * 输入："23"
 * 输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
 * 
 * 
 * 说明:
 * 尽管上面的答案是按字典序排列的，但是你可以任意选择答案输出的顺序。
 * 
 */
/**
    解一：树的 DFS 代码如下
        dfs([2, 3, 4], str) {
            // 由 2 得到 'abc'
           dfs([3, 4], 'a' + str)
           dfs([3, 4], 'b' + str)
           dfs([3, 4], 'c' + str)
        }

        2           a               b           c
                /   |   \
        3   d(ad) e(ae) f(af)   d   e   f   d   e   f
             /
        4   g(adg)

        代码优化：
        1. 用数组代替对象。数组也是一种 Map <index, elem>
        2. dfs(str, index) 使用 index 获取 letters，slice() 太耗内存

    

    解二：队列循环遍历

        其实就是铺平。一行一行地迭代
        > 参考：[通俗易懂+动画演示 17. 电话号码的字母组合](https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/solution/tong-su-yi-dong-dong-hua-yan-shi-17-dian-hua-hao-m/)

 */
// @lc code=start
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
    const digitsMap = {
        2: 'abc',
        3: 'def',
        4: 'ghi',
        5: 'jkl',
        6: 'mno',
        7: 'pqrs',
        8: 'tuv',
        9: 'wxyz'
    }
    const result = [];    
    /**
     * @param {string[]} leftDigits
     * @param {string} prefixStr
     */
    function recursion(leftDigits, prefixStr) {
        leftDigits = leftDigits.slice();
        const digit = leftDigits.shift();
        if (digit == null) {
            prefixStr && result.push(prefixStr);
            return;
        }
        const letters = digitsMap[digit].split('');
        for (let i = 0; i < letters.length; i++) {
            recursion(
                leftDigits,
                prefixStr + letters[i]
            );
        }
    }
    recursion(digits.split(''), '');
    return result;
};
// @lc code=end
letterCombinations("23");

