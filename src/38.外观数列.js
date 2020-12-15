/*
 * @lc app=leetcode.cn id=38 lang=javascript
 *
 * [38] 外观数列
 *
 * https://leetcode-cn.com/problems/count-and-say/description/
 *
 * algorithms
 * Easy (56.76%)
 * Likes:    616
 * Dislikes: 0
 * Total Accepted:    150.9K
 * Total Submissions: 264.6K
 * Testcase Example:  '1'
 *
 * 给定一个正整数 n ，输出外观数列的第 n 项。
 * 
 * 「外观数列」是一个整数序列，从数字 1 开始，序列中的每一项都是对前一项的描述。
 * 
 * 你可以将其视作是由递归公式定义的数字字符串序列：
 * 
 * 
 * countAndSay(1) = "1"
 * countAndSay(n) 是对 countAndSay(n-1) 的描述，然后转换成另一个数字字符串。
 * 
 * 
 * 前五项如下：
 * 
 * 
 * 1.     1
 * 2.     11
 * 3.     21
 * 4.     1211
 * 5.     111221
 * 第一项是数字 1 
 * 描述前一项，这个数是 1 即 “ 一 个 1 ”，记作 "11"
 * 描述前一项，这个数是 11 即 “ 二 个 1 ” ，记作 "21"
 * 描述前一项，这个数是 21 即 “ 一 个 2 + 一 个 1 ” ，记作 "1211"
 * 描述前一项，这个数是 1211 即 “ 一 个 1 + 一 个 2 + 二 个 1 ” ，记作 "111221"
 * 
 * 
 * 要 描述 一个数字字符串，首先要将字符串分割为 最小 数量的组，每个组都由连续的最多 相同字符
 * 组成。然后对于每个组，先描述字符的数量，然后描述字符，形成一个描述组。要将描述转换为数字字符串，先将每组中的字符数量用数字替换，再将所有描述组连接起来。
 * 
 * 例如，数字字符串 "3322251" 的描述如下图：
 * 
 * 
 * 
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：n = 1
 * 输出："1"
 * 解释：这是一个基本样例。
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：n = 4
 * 输出："1211"
 * 解释：
 * countAndSay(1) = "1"
 * countAndSay(2) = 读 "1" = 一 个 1 = "11"
 * countAndSay(3) = 读 "11" = 二 个 1 = "21"
 * countAndSay(4) = 读 "21" = 一 个 2 + 一 个 1 = "12" + "11" = "1211"
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 
 * 
 * 
 */
// @lc code=start
/**
    理解图片 https://imgchr.com/i/rMLQuF
    从数字 1 开始，序列中的每一项都是对前一项的描述。比方说 1211 里有 “ 1 个 1 ， 1 个 2 ， 2 个 1 ” ，那么 111221 就是它的下一个数。通常我们把这个数列叫做“外观数列”。

    解一：迭代
*/
/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function(n) {
    if (n === 1) {
        return '1';
    }
    let prev = '1';
    for (let i = 2; i <= n; i++) {
        let next = '';
        let cnt = 1;
        for (let j = 0; j < prev.length; j++) {
            cnt = 1
            while (prev[j+1] === prev[j]) {
                cnt++;
                j++;
            }            
            next += cnt + prev[j];
        }
        prev = next;
    }
    return prev;
};
/**
    解二：递归
        前一个状态和后一个状态，除了用迭代，也可以用递归
        这道题就是 上一个数和下一个数 之间的关系

    递归和迭代
        共同点：下一项与上一项的关系（或者上一个状态与下一个状态的关系）
        递归是从后往前推，迭代是从前往后推
        迭代使用 for 或 while，递归使用系统栈
 */
// @lc code=end

