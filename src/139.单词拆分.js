/*
 * @lc app=leetcode.cn id=139 lang=javascript
 *
 * [139] 单词拆分
 *
 * https://leetcode-cn.com/problems/word-break/description/
 *
 * algorithms
 * Medium (47.61%)
 * Likes:    680
 * Dislikes: 0
 * Total Accepted:    91.5K
 * Total Submissions: 191.7K
 * Testcase Example:  '"leetcode"\n["leet","code"]'
 *
 * 给定一个非空字符串 s 和一个包含非空单词的列表 wordDict，判定 s 是否可以被空格拆分为一个或多个在字典中出现的单词。
 * 
 * 说明：
 * 
 * 
 * 拆分时可以重复使用字典中的单词。
 * 你可以假设字典中没有重复的单词。
 * 
 * 
 * 示例 1：
 * 
 * 输入: s = "leetcode", wordDict = ["leet", "code"]
 * 输出: true
 * 解释: 返回 true 因为 "leetcode" 可以被拆分成 "leet code"。
 * 
 * 
 * 示例 2：
 * 
 * 输入: s = "applepenapple", wordDict = ["apple", "pen"]
 * 输出: true
 * 解释: 返回 true 因为 "applepenapple" 可以被拆分成 "apple pen apple"。
 * 注意你可以重复使用字典中的单词。
 * 
 * 
 * 示例 3：
 * 
 * 输入: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
 * 输出: false
 * 
 * 
 */

/**
    1. 理解完全背包问题
        s 上的每一位 index，s[index] 可以选属于到左边单词，也可以选属于作为新单词的起始

        所以是完全背包问题，时间复杂度 2^(s.length)

    2. 递归规律
        从后往前，recusion["applepenapple"] = recusion["applepen"这一段] && 判断一下"apple"
        下面DP 是从前往后

    3. DP

        dp["applepenapple"] = dp["applepen"这一段] && 判断一下"apple"
                        j     i
                applepenapple(13) (长度也是13)
                0       8   12
                      |
        /-e  |-le ... |-apple  s[8,12]
                    applepen(8)
                        |-pen s[5, 7]
                      apple(5)
                        |-apple s[0,4]
                        空（0）

                
                    catsandog

        输入: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]

                catsandog
                    |-dog
                  catsan


        for (let j = 0; i - j >= 0; j++) {
            if s.slice(i-j, i) in wordDict {
                DP[i] = DP[i-j]
                   13      13-5=8
            }
        }

           dogs
       /-s  |-gs

注意点：
    DP容器长度是: s.length + 1
    边界用例：
        Case: "" []     Expect: true
        Case: "a" []    Expect: false

时间复杂度：O(n^2)
空间复杂度：O(n)

延伸：
    忽略...可以使用 Set， 但是性能下降了，可能跟 Set 实现有关，性能占用 116ms， 原来只要 90ms
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function(s, wordDict) {
    if (s.length === 0) {               // s.length = 0, 不选 wordDict, 就肯定 true
        return true;
    }
    if (wordDict.length === 0) {        // s.length > 0, wordDict 又没有, 肯定 false
        return false;
    }
    const DP = Array(s.length + 1).fill(false);
    DP[0] = true;

    /*
                j     i
        applepenapple(13) (长度也是13)
        0       8   12
        
                                    DP[j]                    s.slice(j, i)
        dp["applepenapple"] = dp["applepen"这一段] && 判断一下 "apple"

        这里的 DP[i] 是表示 s[0, i) 满足单词拆分，注意是左闭右开
        这里的 DP[j] 是表示 s[0, j) 满足单词拆分，注意是左闭右开
     */
    for (let i = 0; i < s.length + 1; i++) {
        for (let j = 0; j <= i; j++) {
            if (DP[j] === true && wordDict.indexOf(s.slice(j, i)) !== -1) {
                DP[i] = true;
                // 只要找到 true, 就跳出计算下一个 DP[i], 相当于剪枝
                break;
            }
        }
    }
    // console.log('DP: ', DP);
    return DP[s.length];
};
// @lc code=end

