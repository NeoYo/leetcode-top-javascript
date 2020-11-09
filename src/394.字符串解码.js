/*
 * @lc app=leetcode.cn id=394 lang=javascript
 *
 * [394] 字符串解码
 *
 * https://leetcode-cn.com/problems/decode-string/description/
 *
 * algorithms
 * Medium (53.14%)
 * Likes:    538
 * Dislikes: 0
 * Total Accepted:    65.5K
 * Total Submissions: 122.8K
 * Testcase Example:  '"3[a]2[bc]"'
 *
 * 给定一个经过编码的字符串，返回它解码后的字符串。
 * 
 * 编码规则为: k[encoded_string]，表示其中方括号内部的 encoded_string 正好重复 k 次。注意 k 保证为正整数。
 * 
 * 你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。
 * 
 * 此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 k ，例如不会出现像 3a 或 2[4] 的输入。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 输入：s = "3[a]2[bc]"
 * 输出："aaabcbc"
 * 
 * 
 * 示例 2：
 * 
 * 输入：s = "3[a2[c]]"
 * 输出："accaccacc"
 * 
 * 
 * 示例 3：
 * 
 * 输入：s = "2[abc]3[cd]ef"
 * 输出："abcabccdcdcdef"
 * 
 * 
 * 示例 4：
 * 
 * 输入：s = "abc3[cd]xyz"
 * 输出："abccdcdcdxyz"
 * 
 * 
 */
/**
    标签: 逆波兰
    
    参考链接: https://leetcode-cn.com/problems/decode-string/solution/zi-fu-chuan-jie-ma-by-leetcode-solution/416077
       内容: 数字存放在数字栈，字符串存放在字符串栈，遇到右括号时候弹出一个数字栈，字母栈弹到左括号为止。就是逆波兰式那种题。
 */
// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function(s) {
    let result = '';
    const stack = [];
    for (let i = 0; i < s.length; i++) {
        if (/\d/.test(s[i])) {
            stack.push(s[i]);
            // console.log(s[i]);
        } else if ('[' === s[i]) {
            let string = '';
            i++;
            while (']' !== s[i]) {
                string += s[i];
                console.log('string: ', string);
                i++;
            }
            let cnt = stack.pop();
            while (cnt > 0) {
                result += string;
                console.log('result: ', result);
                cnt--;
            }
        }
    }
};
var decodeString = function(s) {
    let result = '';
    let cnt = 0;
    for (let i = 0; i < s.length; i++) {
        if (/\d/.test(s[i])) { // number
            cnt = Number(s[i]);
            while (/\d/.test(s[i+1])) {
                i++;
                cnt = cnt * 10 + Number(s[i]);
            }
            console.log('cnt: ', cnt);
        } else if ('[' === s[i]) {
            const stack = [];
            stack.push('[');
            const begin = ++i; // s[begin] = 'a'
            while (true) {
                if ('[' === s[i]) {
                    stack.push('[')
                } else if (']' === s[i] && stack.length > 0) {
                    stack.pop();
                }
                if (stack.length === 0) {
                    break;
                }
                i++;
            }
            const end = i; // s[end] = ']'
            const decodedString = decodeString(s.slice(begin, end));
            while (cnt > 0) {
                result += decodedString;
                console.log('result: ', result);
                cnt--;
            }
        } else if (/[A-Za-z]/.test(s[i])) { // [a-z] 字母
            result += s[i];
            while (/^[A-Za-z]$/.test(s[i+1])) {
                i++;
                result += s[i];
            }
        } else {
            console.error('Error: ', s[i]);
        }
    }
    return result;
};
/**
    参考题解：https://leetcode-cn.com/problems/decode-string/solution/ti-jie-czhan-by-youlookdeliciousc/
            碰到[数字和当前字符串入栈，碰到]数字和字符串出栈。   
 */
var decodeString = function(s) {
    let res = "";
    let nums = [];
    let strs = [];
    let num = 0;
    for(let i = 0; i < s.length; ++ i) {
        if(s[i] >= '0' && s[i] <= '9') {
            // 1. 遇到数字
            num = num * 10 + Number(s[i]) - '0';
        } else if ((s[i] >= 'a' && s[i] <= 'z') ||(s[i] >= 'A' && s[i] <= 'Z')) {
            // 2. 遇到字母，追加给 res 串
            res = res + s[i];
        } else if (s[i] == '[') {
            // 3. 遇到‘[’，前面的数字压入 nums 栈内，字母字符串 压入 strs 栈内
            nums.push(num);
            strs.push(res); 
            // 清空
            num = 0;
            res = "";
        } else {
            // 4. 遇到‘]’时，操作与之相配的‘[’之间的字符
            /**
             * 比如 a2[c]
             * nums = [2]
             * strs = ['a']
             * 
             * nums，strs 就是用来存 [] 外面的，即 [ 前面的信息，[[ 有两重，他们栈的长度就是 2
             * res = 'c'
             */
            let cnt = nums.pop();
            const temp = res;
            for(let j = 1; j < cnt; ++j) {
                res = res + temp;
            }
            const lastRes = strs.pop();
            res = lastRes + res;
            // res = strs[strs.length-1];
            // 之后若还是字母，就会直接加到 res 之后，因为它们是同一级的运算
            // 若是左括号，res 会被压入 strs 栈，作为上一层的运算
        }
    }
    return res;
}
// /[a-z]{1}/.test(undefined) true 
// /^[a-z]$/.test(undefined)  false
// @lc code=end
decodeString("3[a]2[bc]"); // debug for vscode
// decodeString("3[a2[c]]"); // debug for vscode
// decodeString("100[leetcode]"); // debug for vscdoe
