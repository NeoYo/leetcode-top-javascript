/*
 * @lc app=leetcode.cn id=59 lang=javascript
 *
 * [59] 螺旋矩阵 II
 *
 * https://leetcode-cn.com/problems/spiral-matrix-ii/description/
 *
 * algorithms
 * Medium (78.06%)
 * Likes:    254
 * Dislikes: 0
 * Total Accepted:    50.4K
 * Total Submissions: 64.3K
 * Testcase Example:  '3'
 *
 * 给定一个正整数 n，生成一个包含 1 到 n^2 所有元素，且元素按顺时针顺序螺旋排列的正方形矩阵。
 * 
 * 示例:
 * 
 * 输入: 3
 * 输出:
 * [
 * ⁠[ 1, 2, 3 ],
 * ⁠[ 8, 9, 4 ],
 * ⁠[ 7, 6, 5 ]
 * ]
 * 
 */
/**
    题解:
        神似的题目，54. 螺旋矩阵 是已知矩阵，求顺时针螺旋顺序，返回矩阵中的所有元素
        这一道题，59. 螺旋矩阵-ii 是已知正整数 n，实际上也是 “已知” 了矩阵，边长已经知道了

        根据题意，1, 2, 3, ... 是从外层往内层顺时针走一圈，走完往里收缩，进入下一圈
        思路跟 54. 螺旋矩阵 几乎是一样的，小小的差异是经过的每一个点的处理
            54. 螺旋矩阵 是收集走过点的值
            59. 螺旋矩阵-ii 是填充走过点的值
 */
// @lc code=start
/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function(n) {
    // 0. 边界判断
    if (n === 0) { return []; }
    //              top
    // (x, y) left      right
    //             bottom
    const matrix = Array(n).fill(null).map(_ => Array(n));
    let left = 0,
        top = 0,
        bottom = matrix.length - 1,
        right = matrix[0].length - 1;
    let cnt = 0;
    while (left < right && top < bottom) {
        for (let i = left; i < right; i++) matrix[top][i] = ++cnt;      // 向右
        for (let i = top; i < bottom; i++) matrix[i][right] = ++cnt;    // 向下
        for (let i = right; i > left; i--) matrix[bottom][i] = ++cnt;   // 向左
        for (let i = bottom; i > top; i--) matrix[i][left] = ++cnt;     // 向上
        // 缩小 “圈”
        left++;
        right--;
        top++;
        bottom--;
    }
    if (top === bottom) {
        // 剩下一行，从左到右依次添加
        for (let i = left; i <= right; i++) matrix[top][i] = ++cnt;
    } else if (left === right) {
        // 剩下一列，从上到下依次添加
        for (let i = top; i <= bottom; i++) matrix[i][left] = ++cnt;
    }
    return matrix;
};
// @lc code=end

