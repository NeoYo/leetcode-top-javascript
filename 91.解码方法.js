/*
 * @lc app=leetcode.cn id=91 lang=javascript
 *
 * [91] 解码方法
 *
 * https://leetcode-cn.com/problems/decode-ways/description/
 *
 * algorithms
 * Medium (24.43%)
 * Likes:    502
 * Dislikes: 0
 * Total Accepted:    68.1K
 * Total Submissions: 277.9K
 * Testcase Example:  '"12"'
 *
 * 一条包含字母 A-Z 的消息通过以下方式进行了编码：
 * 
 * 'A' -> 1
 * 'B' -> 2
 * ...
 * 'Z' -> 26
 * 
 * 
 * 给定一个只包含数字的非空字符串，请计算解码方法的总数。
 * 
 * 示例 1:
 * 
 * 输入: "12"
 * 输出: 2
 * 解释: 它可以解码为 "AB"（1 2）或者 "L"（12）。
 * 
 * 
 * 示例 2:
 * 
 * 输入: "226"
 * 输出: 3
 * 解释: 它可以解码为 "BZ" (2 26), "VF" (22 6), 或者 "BBF" (2 2 6) 。
 * 
 * 
 */
/*
    题解：
        满足条件的数字范围: [1, 26]

        用例： "12"

            括号内是index, (index)    

                        12(2)
                /-12              \-2
                (0)                 1(1)
                                   |-1
                                   (0)
            

        用例： "226"

                      226(3)=3
                 /-6        \-26
               22(2)=2      2(1)=1
              /-22 \-2       |-2
             (0)=2 2(1)=1    (0)=1
                    |
                    (0)=1
            
        DP[i] = DP[i-2] + DP[i-1]

        DP[i] = (s.slice(i-2, i) beyond [1, 26]) && DP[i-2]) ? 2 : 1   i 表示 游标

    注意点：
        注意异常情况。用例如下：
        
            用例： "10"

                        10
                    /-0   \-10
                    1       (0)=1

            用例： "01"

                    -01
                /-1    \-01
                0       空

        还有代码中的注释
*/
// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function(s) {
    if (s[0] === '0') { return 0; } // 排除 0 开头的...
    const DP = Array(s.length+1).fill(0);
    DP[0] = 1;
    DP[1] = 1;
    for (let i = 2; i <= s.length+1; i++) {
        const twoChar = s.slice(i-2, i);
        const curChar = s[i-1];
        let val = 0;
        if (curChar !== '0') { // 排除 0
            val += DP[i-1];
        }
        if (twoChar[0] !== '0') { //排除 01、02、...
            if (Number(twoChar) > 0 && Number(twoChar) <= 26) {
                val += DP[i-2];
            }
        }
        DP[i] = val;
    }
    // console.log(DP);
    return DP[s.length];
};
// @lc code=end

