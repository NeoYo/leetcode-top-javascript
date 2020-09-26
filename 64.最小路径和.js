/*
 * @lc app=leetcode.cn id=64 lang=javascript
 *
 * [64] 最小路径和
 *
 * https://leetcode-cn.com/problems/minimum-path-sum/description/
 *
 * algorithms
 * Medium (67.50%)
 * Likes:    677
 * Dislikes: 0
 * Total Accepted:    147.1K
 * Total Submissions: 217.8K
 * Testcase Example:  '[[1,3,1],[1,5,1],[4,2,1]]'
 *
 * 给定一个包含非负整数的 m x n 网格，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。
 * 
 * 说明：每次只能向下或者向右移动一步。
 * 
 * 示例:
 * 
 * 输入:
 * [
 *  [1,3,1],
 * ⁠ [1,5,1],
 * ⁠ [4,2,1]
 * ]
 * 输出: 7
 * 解释: 因为路径 1→3→1→1→1 的总和最小。
 * 
 * 
 */
/**
    题解：
        这道题与 62.不同路径，是非常相似的题目
        https://github.com/NeoYo/leetcode-top-javascript/blob/master/62.%E4%B8%8D%E5%90%8C%E8%B7%AF%E5%BE%84.js

    举例：
        输入:
            [
             [1,3,1],
            ⁠ [1,5,1],
            ⁠ [4,2,1]
            ]

    解题关键：
        推导转移方程，那么有两个问题：
        A. 状态是什么？
            1. 跟第 i 行和第 j 列有关
            2. 结果求总和最小，那么状态就是 第 i 行和第 j 列的最小和
        B. 选择是什么？
            每次状态转移可以选择 i+1 (向下) 或 j+1 (向右)
            
        

    二维DP, 最好画出转移表，再编写代码
        画转移表步骤如下:
        1. 初始化第一行和第一列
            1,4,5
            2,
            6,
        2. 根据转移方程 DP[i][j] = Math.min((DP[i-1][j] || 0), (DP[i][j-1] || 0)) + grid[i][j];
            确定每一个值
            1,4,5
            2,? = Math.min(4, 2) + 5 = 7
            6,
        3. 依此类推
            1,4,5
            2,7,6
            6,8,7


    拓展：
        转移表与递归树区别与作用：
            1. 转移表适合 二维DP
            2. 递归树适合 1~n 维DP
            3. 转移表适合用来编写和校验，DP代码
            4. 递归树适合用来编写 dfs 递归代码
 */
// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
    const DP = Array(grid.length).fill(null).map(_ => Array());
    const COL_CNT = grid[0].length;
    DP[0][0] = grid[0][0];
    for (let i = 1; i < grid.length; i++) {
        DP[i][0] = DP[i-1][0] + grid[i][0];
    }
    for (let j = 1; j < COL_CNT; j++) {
        DP[0][j] = DP[0][j-1] + grid[0][j];
    }
    for (let i = 1; i < DP.length; i++) {
        for (let j = 1; j < COL_CNT; j++) {
            DP[i][j] = Math.min((DP[i-1][j] || 0), (DP[i][j-1] || 0)) + grid[i][j];
        }
    }
    // console.log('DP: ', DP);
    return DP[DP.length-1][COL_CNT-1];
};
// @lc code=end
minPathSum([[1,3,1],[1,5,1],[4,2,1]]);

