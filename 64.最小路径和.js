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
        DP[i][j] = Math.min(DP[i-1][j] + DP[i][j-1]) + grid[i][j]

    二维DP, 最好画出转移表，再编写代码
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

