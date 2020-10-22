/*
 * @lc app=leetcode.cn id=151 lang=javascript
 *
 * [151] 翻转字符串里的单词
 *
 * https://leetcode-cn.com/problems/reverse-words-in-a-string/description/
 *
 * algorithms
 * Medium (43.30%)
 * Likes:    235
 * Dislikes: 0
 * Total Accepted:    100.8K
 * Total Submissions: 230.3K
 * Testcase Example:  '"the sky is blue"'
 *
 * 给定一个字符串，逐个翻转字符串中的每个单词。
 * 
 * 说明：
 * 
 * 
 * 无空格字符构成一个 单词 。
 * 输入字符串可以在前面或者后面包含多余的空格，但是反转后的字符不能包括。
 * 如果两个单词间有多余的空格，将反转后单词间的空格减少到只含一个。
 * 
 * 
 * 
 * 
 * 示例 1：
 * 
 * 输入："the sky is blue"
 * 输出："blue is sky the"
 * 
 * 
 * 示例 2：
 * 
 * 输入："  hello world!  "
 * 输出："world! hello"
 * 解释：输入字符串可以在前面或者后面包含多余的空格，但是反转后的字符不能包括。
 * 
 * 
 * 示例 3：
 * 
 * 输入："a good   example"
 * 输出："example good a"
 * 解释：如果两个单词间有多余的空格，将反转后单词间的空格减少到只含一个。
 * 
 * 
 * 示例 4：
 * 
 * 输入：s = "  Bob    Loves  Alice   "
 * 输出："Alice Loves Bob"
 * 
 * 
 * 示例 5：
 * 
 * 输入：s = "Alice does not even like bob"
 * 输出："bob like even not does Alice"
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= s.length <= 10^4
 * s 包含英文大小写字母、数字和空格 ' '
 * s 中 至少存在一个 单词
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 进阶：
 * 
 * 
 * 请尝试使用 O(1) 额外空间复杂度的原地解法。
 * 
 * 
 */

// @lc code=start

/**
    解法零：原地的尝试 S(n) = O(1)
        由于 JavaScript 语言的 string 是不可变的
        想要空间复杂度为 O(1)，无法实现，建议 LeetCode 把输入改成 char[]
        所以下面的尝试废弃
 */
//
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
    // const reverse = (word) => {
    //     for (let i = 0; i < word.length; i++) {
    //         const j = word.length - 1 - j;
    //         const temp = word[i];
    //         word[i] = word[j];
    //         word[j] = temp;
    //     }
    // }
    // 改写下 reverse 代码为 reverseBetween
    const reverseBetween = (s, begin, end) => {
        for (let i = begin; i < end; i++) {
            const j = end - 1 - i;
            const temp = s[i];
            s[i] = s[j];
            s[j] = temp;
        }
    }
    let caught = true;
    let begin = 0;
    for (let i = 0; i < s.length - 1; i++) {
        if (caught === true) {
            while (s[i] !== ' ') {
                i++;
            }
            reverseBetween(s, begin, i);
            canght = false;
        } else {
            if (s[i] === ' ') {
                caught = true;
                begin = i;
            }
        }
    }
    reverseBetween(s, begin, s.length - 1);
    return s;
};

/**
    解法二：无情滴 API 调用者
 */
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
    return s.trim().split(/\s+/).reverse().join(' ');
}
/**
 * 解法三：增加一个容器记录
 * 参考链接：https://leetcode-cn.com/problems/reverse-words-in-a-string/solution/tu-jie-leetcodefan-zhuan-zi-fu-chuan-li-de-dan-ci-/
 */
var reverseWords = function(s) {
    let left = 0
    let right = s.length - 1
    let queue = []
    let word = ''
    while (s.charAt(left) === ' ') left ++
    while (s.charAt(right) === ' ') right --
    while (left <= right) {
        let char = s.charAt(left)
        if (char === ' ' && word) {
            queue.unshift(word)
            word = ''
        } else if (char !== ' '){
            word += char
        }
        left++
    }
    queue.unshift(word)
    return queue.join(' ')
};
// @lc code=end

