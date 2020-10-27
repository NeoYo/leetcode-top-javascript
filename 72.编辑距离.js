/*
 * @lc app=leetcode.cn id=72 lang=javascript
 *
 * [72] 编辑距离
 *
 * https://leetcode-cn.com/problems/edit-distance/description/
 *
 * algorithms
 * Hard (59.75%)
 * Likes:    1209
 * Dislikes: 0
 * Total Accepted:    89.9K
 * Total Submissions: 149.9K
 * Testcase Example:  '"horse"\n"ros"'
 *
 * 给你两个单词 word1 和 word2，请你计算出将 word1 转换成 word2 所使用的最少操作数 。
 * 
 * 你可以对一个单词进行如下三种操作：
 * 
 * 
 * 插入一个字符
 * 删除一个字符
 * 替换一个字符
 * 
 * 
 * 
 * 
 * 示例 1：
 * 
 * 输入：word1 = "horse", word2 = "ros"
 * 输出：3
 * 解释：
 * horse -> rorse (将 'h' 替换为 'r')
 * rorse -> rose (删除 'r')
 * rose -> ros (删除 'e')
 * 
 * 
 * 示例 2：
 * 
 * 输入：word1 = "intention", word2 = "execution"
 * 输出：5
 * 解释：
 * intention -> inention (删除 't')
 * inention -> enention (将 'i' 替换为 'e')
 * enention -> exention (将 'n' 替换为 'x')
 * exention -> exection (将 'n' 替换为 'c')
 * exection -> execution (插入 'u')
 * 
 * 
 */
/*
* 输入：word1 = "horse", word2 = "ros"
* 输出：3
* 解释：
* horse -> rorse (将 'h' 替换为 'r')
* rorse -> rose (删除 'r')
* rose -> ros (删除 'e')
*/
/*
    以题目中的 word1 = "horse", word2 = "ros" 分析
    一、暴力法
        先全删后完整增加
        horse -> orse -> rse -> se -> e -> (空) -> s -> os -> ros 需要 9 步

    二、题意理解
        如果随意地去更改 horse 到 ros，我们可能操作 horse 的每一位，每一位又对应着 26 个字母，有非常多的可能性

        从后往前推敲，更符合我们的思考方式，最终要得到 ros，那就盯紧 ros 这几个字母
        顺着题意去思考，我们相当于每一次操作都去做选择,从替换、编辑、删除里去做选择

        假设最后得到 ros，它的上一个呢，也是由3种情况得来的，替换、编辑、删除
            1. ros 由 替换 得来的，由于我们操作是从左往右的，最后一步是替换得到，说明上一步已经走到最右边了，roX -> ros
            2. ros 由 新增 得来的，那么上一个就是 ro, 最后一位增加一个 s, 就 ros
            3. ros 由 删除 得来的，那么上一个多了一位，是 rosX，删除 X，就是 ros
        这里还漏掉了一种情况，最后一位刚好命中
            4. ros 最后一位 s 刚好命中，已有值是 ros, 上一步走到 ro 时，这一步比对了下已有值最后一位，刚好命中~~~！！！
    三、递归与动态规划
        这里直接跳过递归推导到动态规划的过程
        根据上面分析，状态的定义是

        该题理解资料里的，状态转移表很重要

        最后，代码如下哈

    参考资料
        https://leetcode-cn.com/problems/edit-distance/solution/bian-ji-ju-chi-by-leetcode-solution/
        
 */
// @lc code=start
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function(word1, word2) {
    const word1L = word1.length;
    const word2L = word2.length;

    // 零、边界值判断
    if (word1L == 0 || word2L == 0) {
        return word1L || word2L;
    }

    // 一、初始化 DP 数组
    const DP = Array(word1L + 1).fill(null).map(_ => Array(word2L + 1).fill(Infinity));

    // 二、初始化临界值
    for (let i = 0; i < word1L + 1; i++) {
        DP[i][0] = i;
    }
    for (let j = 0; j < word2L + 1; j++) {
        DP[0][j] = j;
    }

    // 三、状态转移
    for (let i = 1; i < word1L + 1; i++) {
        for (let j = 1; j < word2L + 1; j++) {
            let left = DP[i - 1][j] + 1;
            let down = DP[i][j - 1] + 1;
            let left_down = DP[i - 1][j - 1];
            if (word1[i - 1] != word2[j - 1]) {
                left_down += 1;
            }
            DP[i][j] = Math.min(left, Math.min(down, left_down));
        }
    }
    return DP[word1L][word2L];
};
// @lc code=end

