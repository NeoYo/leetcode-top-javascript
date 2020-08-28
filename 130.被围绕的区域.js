/*
 * @lc app=leetcode.cn id=130 lang=javascript
 *
 * [130] 被围绕的区域
 *
 * https://leetcode-cn.com/problems/surrounded-regions/description/
 *
 * algorithms
 * Medium (42.16%)
 * Likes:    361
 * Dislikes: 0
 * Total Accepted:    69.5K
 * Total Submissions: 164.7K
 * Testcase Example:  '[["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]'
 *
 * 给定一个二维的矩阵，包含 'X' 和 'O'（字母 O）。
 * 
 * 找到所有被 'X' 围绕的区域，并将这些区域里所有的 'O' 用 'X' 填充。
 * 
 * 示例:
 * 
 * X X X X
 * X O O X
 * X X O X
 * X O X X
 * 
 * 
 * 运行你的函数后，矩阵变为：
 * 
 * X X X X
 * X X X X
 * X X X X
 * X O X X
 * 
 * 
 * 解释:
 * 
 * 被围绕的区间不会存在于边界上，换句话说，任何边界上的 'O' 都不会被填充为 'X'。 任何不在边界上，或不与边界上的 'O' 相连的 'O'
 * 最终都会被填充为 'X'。如果两个元素在水平或垂直方向相邻，则称它们是“相连”的。
 * 
 */

// @lc code=start
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
/*
    题意理解:
        题目要求是，找到所有被 'X' 围绕的区域，并将这些区域里所有的 'O' 用 'X' 填充。
        有两种情况的 'O' 不能被填充:
        1. 边界上的 'O'
        2. 与边界上的 'O' 相连的 'O'

        其他情况下的 'O'，都会被填充成 'X'

    解题思路:
        根据上面的分析，如果把两种情形的 'O'，都标记为 '#'，其他 'O' 不管，
        等遍历完 board 后，就可以把 '0' 都标记为 'X'，
        被 '#' 标记的是， 不能被填充的'O'，再把它还原就可以了

        那么，问题的关键是，如何把不能被填充的 '0' 都找出来。
        边界上的 '0'，直接从边界出发就可以了，
        与边界上的 'O' 相连的 'O'，需要从边界上的 '0' 开始，上下左右不断进行遍历，
        下面代码使用 深度优先遍历

    注意点:
        1. 题目是 O ，不是 0
        2. 边界条件 [] 的处理
        
 */
var solve = function(board) {
    if (board.length === 0) {return board;}
    const rowCnt = board.length;
    const colCnt = board[0].length;

    const dfs = (i, j) => {
        board[i][j] = '#';
        if (board[i+1] && board[i+1][j] === 'O') {
            dfs(i+1, j);
        }
        if (board[i-1] && board[i-1][j] === 'O') {
            dfs(i-1, j);
        }
        if (board[i][j+1] === 'O') {
            dfs(i, j+1);
        }
        if (board[i][j-1] === 'O') {
            dfs(i, j-1);
        }
    }
    // 第一横行
    for (let j = 0; j < colCnt; j++) {
        if (board[0][j] === 'O') {
            dfs(0, j);
        }
    }
    // 最后横行
    for (let j = 0; j < colCnt; j++) {
        const last = rowCnt-1;
        if (board[last][j] === 'O') {
            dfs(last, j);
        }
    }
    // 第一竖行
    for (let i = 0; i < rowCnt; i++) {
        if (board[i][0] === 'O') {
            dfs(i, 0);
        }
    }
    // 最后竖行
    for (let i = 0; i < rowCnt; i++) {
        const last = colCnt-1;
        if (board[i][last] === 'O') {
            dfs(i, last);
        }
    }

    //  '0' 替换为 'X'，'#' 还原为 '0'
    for (let i = 0; i < rowCnt; i++) {
        for (let j = 0; j < colCnt; j++) {
            if (board[i][j] === '#') {
                board[i][j] = 'O';
            } else if (board[i][j] === 'O') {
                board[i][j] = 'X';
            }
        }
    }
    // console.log(board)
    return board;
};
// @lc code=end
// solve([["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]);
solve([["X","O","X","O","X","O"],["O","X","O","X","O","X"],["X","O","X","O","X","O"],["O","X","O","X","O","X"]]);
