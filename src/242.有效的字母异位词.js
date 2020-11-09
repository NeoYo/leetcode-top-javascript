/*
 * @lc app=leetcode.cn id=242 lang=javascript
 *
 * [242] 有效的字母异位词
 *
 * https://leetcode-cn.com/problems/valid-anagram/description/
 *
 * algorithms
 * Easy (60.33%)
 * Likes:    214
 * Dislikes: 0
 * Total Accepted:    114.6K
 * Total Submissions: 189.4K
 * Testcase Example:  '"anagram"\n"nagaram"'
 *
 * 给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。
 * 
 * 示例 1:
 * 
 * 输入: s = "anagram", t = "nagaram"
 * 输出: true
 * 
 * 
 * 示例 2:
 * 
 * 输入: s = "rat", t = "car"
 * 输出: false
 * 
 * 说明:
 * 你可以假设字符串只包含小写字母。
 * 
 * 进阶:
 * 如果输入字符串包含 unicode 字符怎么办？你能否调整你的解法来应对这种情况？
 * 
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    // 题解：字母异位词指字母相同，但排列不同的字符串
    // 解零：暴力法遍历 s，然后在 t 中找是否存在，T(n) = O(n^2)
    // 解一: Map T(n) = O(2n) = O(n)
    // 遇到的问题一："aacc" "ccac" 过不了，解决方法: 重置 Map 对应的key
    // 遇到的问题二："anagram" "nagaram" 过不了，解决方法: 重复 +1, 消去 -1
    if (s.length !== t.length) {
        return false;
    }
    const map = {}; // <char, true>
    for (let i = 0; i < s.length; i++) {
        if (map[s[i]] == null) {
            map[s[i]] = 1;
        } else {
            map[s[i]] += 1;
        }
    }
    for (let i = 0; i < t.length; i++) {
        if (map[t[i]] === 0 || map[t[i]] == null) {
            return false;
        } else {
            map[t[i]]--;
        }
    }
    return true;
    // 解二: 排序 T(n) = O(nlogn) S(n) = O(n) Array.prototype.sort 应该是原地排序，时间复杂度看具体情况
};
// @lc code=end

isAnagram("anagram", "nagaram");

