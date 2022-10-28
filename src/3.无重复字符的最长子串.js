/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 无重复字符的最长子串
 *
 * https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/description/
 *
 * algorithms
 * Medium (35.80%)
 * Likes:    4553
 * Dislikes: 0
 * Total Accepted:    716.7K
 * Total Submissions: 2M
 * Testcase Example:  '"abcabcbb"'
 *
 * 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。
 * 
 * 示例 1:
 * 
 * 输入: "abcabcbb"
 * 输出: 3 
 * 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
 * 
 * 
 * 示例 2:
 * 
 * 输入: "bbbbb"
 * 输出: 1
 * 解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
 * 
 * 
 * 示例 3:
 * 
 * 输入: "pwwkew"
 * 输出: 3
 * 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
 * 请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
 * 
 * 
 */
/**
    题解：
        子序列与子串
    解一：暴力法
            暴力解法 O(n^3)  i j indexOf
            
    解二：滑动窗口
        1. 用 Set.prototype.has 代替 O(n) 的 String.prototype.indexOf

            Set 的实现： HashMap 是 O(1), BST 是 O(log(n))， Array 是 O(n)

        2. 双层 for 可以用 O(2n) 化解为 O(n)，在最糟糕的情况下，每个字符将被 i 和 j 访问两次。
            1. 举例1： abcdce 当走到 abcd 的下一个 c, a 后面的 bcd 已经无需再走了, 直接从 abcd 的 d 开始走。 
            2. 不需要走的原因： abcdc... 中第一个 c， 相当于划分了两个时代
                1. 包含第一个 c 的， abcd bcd cd d, 肯定是 abcd 最大。
                2. 包含第一个 c 的，即 从 d 开始

            3. 举例2：在最糟糕的情况下，每个字符将被访问接近两次， 如abab, 6次
    参考资料：
        [滑动窗口](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/solution/wu-zhong-fu-zi-fu-de-zui-chang-zi-chuan-by-leetcod/)
 */
// @lc code=start
/* 
    解一：暴力法
        暴力解法 O(n^3)  i j indexOf
 */ 
var lengthOfLongestSubstring = function(s) {
    let max = 0;
    const arr = s.split('');
    for (let i = 0; i < arr.length; i++) {
        const target = [];
        for (let j = i; j < arr.length; j++) {
            const char = arr[j];
            if (target.indexOf(char) !== -1) {
                break;
            }
            target.push(char);
        }
        const len = target.length;
        max = max > len ? max : len;
    }
    return max;  
};
/**
    解二：滑动窗口  T(n) = O(n)
    1. 用 Set.prototype.has 代替 O(n) 的 String.prototype.indexOf

        Set 的实现： HashMap 是 O(1), BST 是 O(log(n))， Array 是 O(n)

    2. 双层 for 可以用 O(2n) 化解为 O(n)，在最糟糕的情况下，每个字符将被 i 和 j 访问两次。
        1. 举例1： abcdce 当走到 abcd 的下一个 c, a 后面的 bcd 已经无需再走了, 直接从 abcd 的 d 开始走。 
        2. 不需要走的原因： abcdc... 中第二个 c， 相当于划分了两个时代
            1. 不包含第二个 c 前面部分， abcd bcd cd d, 肯定是 abcd 最大。
            2. 包含第二个 c 的，即 从 d 开始

        3. 举例2：在最糟糕的情况下，每个字符将被访问接近两次， 如abab, 6次

    上面是解释，如何写出代码？
        abcda
        i  j
        1. 正常情形如何处理 abcd
        2. 特殊情形如何处理 abcda

 */
/**  
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let max = 0;
    let map = new Map();    // <出现过的字符, 对应 i 出现的位置>
    for (let i = 0, j = 0; j < s.length; j++) { // j 快指针，i 慢指针；i 到 j 组成了滑动窗口
        const char = s[j];                      // 滑动窗口 处理 右边出现新字符
        const found = map.get(char);
        if (found) {                            // 判断新字符 是否已存在
            i = Math.max(found, i);             // 存在则将 滑动窗口的左边 右移到发现的位置+1
        }
        map.set(char, j + 1);                   // 将新字符（或旧字符新位置）存进 map 里。这里故意+1 是给上面用的
        max = Math.max(max, j - i + 1);        
    }
    return max;
};
// @lc code=end

