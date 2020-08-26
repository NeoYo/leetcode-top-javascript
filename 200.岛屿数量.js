/*
 * @lc app=leetcode.cn id=200 lang=javascript
 *
 * [200] 岛屿数量
 *
 * https://leetcode-cn.com/problems/number-of-islands/description/
 *
 * algorithms
 * Medium (50.07%)
 * Likes:    737
 * Dislikes: 0
 * Total Accepted:    148.7K
 * Total Submissions: 296.5K
 * Testcase Example:  '[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]'
 *
 * 给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。
 * 
 * 岛屿总是被水包围，并且每座岛屿只能由水平方向或竖直方向上相邻的陆地连接形成。
 * 
 * 此外，你可以假设该网格的四条边均被水包围。
 * 
 * 
 * 
 * 示例 1:
 * 
 * 输入:
 * [
 * ['1','1','1','1','0'],
 * ['1','1','0','1','0'],
 * ['1','1','0','0','0'],
 * ['0','0','0','0','0']
 * ]
 * 输出: 1
 * 
 * 
 * 示例 2:
 * 
 * 输入:
 * [
 * ['1','1','0','0','0'],
 * ['1','1','0','0','0'],
 * ['0','0','1','0','0'],
 * ['0','0','0','1','1']
 * ]
 * 输出: 3
 * 解释: 每座岛屿只能由水平和/或竖直方向上相邻的陆地连接而成。
 * 
 * 
 */
/*
    题目注意点🤔

    1. grid[i+1] && grid[i+1][j] 用于防止越界
    2. grid.length === 0 边界判断
 */
// @lc code=start
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
    if (grid.length === 0) {
        return 0;
    }

    let landsNum = 0;
    
    const dfs = (i, j) => {
        grid[i][j] = '0';
        grid[i][j-1] === '1' && dfs(i, j-1);
        grid[i][j+1] === '1' && dfs(i, j+1);
        grid[i+1] && grid[i+1][j] === '1' && dfs(i+1, j);
        grid[i-1] && grid[i-1][j] === '1' && dfs(i-1, j);
    }

    const rowCnt = grid.length;
    const colCnt = grid[0].length;
    for (let i = 0; i < rowCnt; i++) {
        for (let j = 0; j < colCnt; j++) {
            if (grid[i][j] === '1') {
                landsNum++;
                dfs(i, j);
            }
        }
    }
    return landsNum;
};
// @lc code=end
numIslands([["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]
);
