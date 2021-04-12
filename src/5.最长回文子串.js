/*
 * @lc app=leetcode.cn id=5 lang=javascript
 *
 * [5] 最长回文子串
 *
 * https://leetcode-cn.com/problems/longest-palindromic-substring/description/
 *
 * algorithms
 * Medium (32.20%)
 * Likes:    2872
 * Dislikes: 0
 * Total Accepted:    411.8K
 * Total Submissions: 1.3M
 * Testcase Example:  '"babad"'
 *
 * 给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。
 * 
 * 示例 1：
 * 
 * 输入: "babad"
 * 输出: "bab"
 * 注意: "aba" 也是一个有效答案。
 * 
 * 
 * 示例 2：
 * 
 * 输入: "cbbd"
 * 输出: "bb"
 * 
 * 
 */
/**
    零、判断是否回文
        // Array.prototype.reverse
        const isPalindrome = (str) => (
            str.split('').reverse().join('') === str;
        );
        // 时间复杂度： O(n)
        // 空间复杂度： O(n)

        // 前后对称指针
        const isPalindrome = (str) => {
            const mid = str.length >> 1;
            for (let i = 0; i < mid; i++) {
                if (str[i] !== str[str.length - 1 -i]) {
                   return false;
                }
            }
            return true;    
        }
        // 时间复杂度： O(n)
        // 空间复杂度： O(1)

    解一：暴力法
        1. 时间复杂度：O(n^3)
        2. 两个 for 循环 * reverse 字符串比较
        3. 空间复杂度：O(n)
 */
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    let maxS = '';
    
    for (let i = 0; i < s.length; i++) {
        for (let j = i; j < s.length; j++) {
            const cur = s.slice(i, j + 1);
            if (cur.split().reverse().join() !== cur) {
                break;
            }            
            if (cur.length > maxS.length) {
                maxS = cur;
            }
        }
    }
    return maxS;
};
/**
    解二：中心扩展算法  O(n^2)
        
        奇数的回文中心 n 个，偶数的回文中心 n - 1 个，即 2n - 1, 乘以 i 扩散就是 O(n^2)
        ！！！核心原理：一边扩散一边校验，时间复杂度少在这里

        ！！！代码和思路 参考 647.回文子串，下面的不好理解
 */
// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    let maxSub = '';
    for (let i = 0; i < s.length; i++) {
         // 奇数回文 'babad'
        const oddSpreadLength = Math.min(
            s.length - 1 - i,
            i
        );
        for (let spread = 0; spread <= oddSpreadLength; spread++) {
            if (s[i + spread] !== s[i - spread]) {
                break;
            }
            if ((1 + spread * 2) > maxSub.length) {
                maxSub = s.slice(i - spread, i + spread + 1);
            }
        }
        // 偶数回文 'cbbd'
        const evenSpreadLength = Math.min(
            s.length - i,
            i
        );
        for (let spread = 0; spread <= evenSpreadLength; spread++) {
            if (s[i + 1 + spread] !== s[i - spread]) {
                break;
            }
            if ((2 + spread * 2) > maxSub.length) {
                maxSub = s.slice(i - spread, i + spread + 2);
            }
        }
    }
    return maxSub;
};
/**

    Manacher算法 马拉车算法

        [【面试现场】如何找到字符串中的最长回文子串？  | 漫画](https://mp.weixin.qq.com/s?__biz=MzIzMTE1ODkyNQ==&mid=2649410225&idx=1&sn=ed045e8edc3c49a436a328e5f0f37a55&chksm=f0b60f53c7c18645b4c04a69ad314723cce94ed56994d6f963c2275a2db8d85f973f15f508e4&mpshare=1&scene=23&srcid=1001JCsBlpxgUWjgixasChNQ#rd)

        中心扩散法的升级，每个扩散都有意义

        在本项目搜索马拉车算法
 */

/**
    解三：动态规划
        状态：   
                DP[i][j] 表示 子串 s[i..j] 是否为回文子串
        递推公式：
                DP[i][j] = DP[i+1][j-1] && (s[i] === s[j])
        边界：
                DP[i][i] = true;
                DP[i][i+1] = true; if(s[i] === s[i+1])

        ！！！参考资料 https://leetcode-cn.com/problems/longest-palindromic-substring/solution/zui-chang-hui-wen-zi-chuan-by-leetcode-solution/
            6:30s 开始
 */
// @lc code=end

