/*
 * @lc app=leetcode.cn id=62 lang=javascript
 *
 * [62] 不同路径
 *
 * https://leetcode-cn.com/problems/unique-paths/description/
 *
 * algorithms
 * Medium (62.08%)
 * Likes:    681
 * Dislikes: 0
 * Total Accepted:    146K
 * Total Submissions: 234.9K
 * Testcase Example:  '3\n2'
 *
 * 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。
 * 
 * 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。
 * 
 * 问总共有多少条不同的路径？
 * 
 * 
 * 
 * 例如，上图是一个7 x 3 的网格。有多少可能的路径？
 * 
 * 
 * 
 * 示例 1:
 * 
 * 输入: m = 3, n = 2
 * 输出: 3
 * 解释:
 * 从左上角开始，总共有 3 条路径可以到达右下角。
 * 1. 向右 -> 向右 -> 向下
 * 2. 向右 -> 向下 -> 向右
 * 3. 向下 -> 向右 -> 向右
 * 
 * 
 * 示例 2:
 * 
 * 输入: m = 7, n = 3
 * 输出: 28
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= m, n <= 100
 * 题目数据保证答案小于等于 2 * 10 ^ 9
 * 
 * 
 */
/*
    题解:
       如果求的是所有路径，可以使用 dfs 去求出所有解
       如果求的是一个结果，则可以使用动态规划

    解一：动态规划
        步骤:
        1. 画出递归树
            (m,n)
             /\
            /\/\
           /\/\/\
          /\/\/\/\
          \/\/\/\/
           \/\/\/
            \/\/
             \/
            (0,0)
        2. 找出DP的表示
              a  b 
               \/
               c
              假设 DP[n] 表示 n 的步数，有 DP[c] = DP[a] + DP[b]
        3. DP递推公式
            DP[y][x] = DP[y-1][x] + DP[y][x-1]


    解二：使用排列组合中的组合
        关键在于怎么看出这是组合问题
        由题意可知，总共要走的步数是 m + n - 2 步
        每一步可以选择向下↓或向→, 选择了 m-1 向右，剩下的 n - 1都是向下的。
        也就是说在  m + n - 2 步中，选出 m - 1 步，作为向右，先选和后选不影响结果

        换种表达，一个袋子里装了编号为 1 到 m+n-2 的小球，从中挑选出 m-1个小球， 这就是一个组合的问题^_^

        Cm+n-2 m-1
*/
// @lc code=start
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
    const all = m + n - 2;  // 3
    const picked = m - 1;   // 2
    let res = 1;
    for (let i = 0; i < picked; i++) {
        res = (all - i) * res;
    }
    for (let i = 1; i <= picked; i++) {
        res = res / i;
    }
    return res;
};
// @lc code=end

