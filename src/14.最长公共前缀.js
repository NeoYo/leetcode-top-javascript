/*
 * @lc app=leetcode.cn id=14 lang=javascript
 *
 * [14] 最长公共前缀
 *
 * https://leetcode-cn.com/problems/longest-common-prefix/description/
 *
 * algorithms
 * Easy (38.88%)
 * Likes:    1363
 * Dislikes: 0
 * Total Accepted:    404.1K
 * Total Submissions: 1M
 * Testcase Example:  '["flower","flow","flight"]'
 *
 * 编写一个函数来查找字符串数组中的最长公共前缀。
 * 
 * 如果不存在公共前缀，返回空字符串 ""。
 * 
 * 示例 1:
 * 
 * 输入: ["flower","flow","flight"]
 * 输出: "fl"
 * 
 * 
 * 示例 2:
 * 
 * 输入: ["dog","racecar","car"]
 * 输出: ""
 * 解释: 输入不存在公共前缀。
 * 
 * 
 * 说明:
 * 
 * 所有输入只包含小写字母 a-z 。
 * 
 */
/**
    题解：[最长公共前缀](https://leetcode-cn.com/problems/longest-common-prefix/)
    #### 解一：LCP(S1...Sn) = LCP(LCP(LCP(S1, S2), S3),...Sn) 代码如下

    #### 解二：Trie
        > 相关资料： [LeetCode 最长公共前缀-更进一步](https://leetcode-cn.com/problems/longest-common-prefix/solution/zui-chang-gong-gong-qian-zhui-by-leetcode/)
        > 相关题目： [实现 Trie](https://leetcode-cn.com/problems/implement-trie-prefix-tree/solution/)
 */
// @lc code=start
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    if(strs.length === 0) 
        return "";
    let ans = strs[0];
    for(let i = 1; i < strs.length; i++) {
        let j = 0;
        while (j < ans.length || j < strs[i].length) {
            if(ans[j] !== strs[i][j]) {
                break;
            }                
            j++;
        }
        ans = ans.slice(0, j);
        if(ans === "")
            return ans;
    }
    return ans;
};
// @lc code=end

