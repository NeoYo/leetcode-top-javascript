/*
 * @lc app=leetcode.cn id=54 lang=javascript
 *
 * [54] 螺旋矩阵
 *
 * https://leetcode-cn.com/problems/spiral-matrix/description/
 *
 * algorithms
 * Medium (41.15%)
 * Likes:    525
 * Dislikes: 0
 * Total Accepted:    87.3K
 * Total Submissions: 211.1K
 * Testcase Example:  '[[1,2,3],[4,5,6],[7,8,9]]'
 *
 * 给定一个包含 m x n 个元素的矩阵（m 行, n 列），请按照顺时针螺旋顺序，返回矩阵中的所有元素。
 * 
 * 示例 1:
 * 
 * 输入:
 * [
 * ⁠[ 1, 2, 3 ],
 * ⁠[ 4, 5, 6 ],
 * ⁠[ 7, 8, 9 ]
 * ]
 * 输出: [1,2,3,6,9,8,7,4,5]
 * 
 * 
 * 示例 2:
 * 
 * 输入:
 * [
 * ⁠ [1, 2, 3, 4],
 * ⁠ [5, 6, 7, 8],
 * ⁠ [9,10,11,12]
 * ]
 * 输出: [1,2,3,4,8,12,11,10,9,5,6,7]
 * 
 * 
 */
/*
    参考资料
        螺旋矩阵 https://leetcode-cn.com/problems/spiral-matrix/solution/shou-hui-tu-jie-liang-chong-bian-li-de-ce-lue-kan-/
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
    // 0. 边界判断
    if (matrix.length === 0) { return []; }
    //              top
    // (x, y) left      right
    //             bottom
    const res = [];
    let left = 0,
        top = 0,
        bottom = matrix.length - 1,
        right = matrix[0].length - 1;
    while (left < right && top < bottom) {
        for (let i = left; i < right; i++) res.push(matrix[top][i])     // 向右
        for (let i = top; i < bottom; i++) res.push(matrix[i][right])   // 向下
        for (let i = right; i > left; i--) res.push(matrix[bottom][i])  // 向左
        for (let i = bottom; i > top; i--) res.push(matrix[i][left])    // 向上
        // 缩小 “圈”
        left++;
        right--;
        top++;
        bottom--;
    }
    if (top === bottom) {
        // 剩下一行，从左到右依次添加
        for (let i = left; i <= right; i++) res.push(matrix[top][i])
    } else if (left === right) {
        // 剩下一列，从上到下依次添加
        for (let i = top; i <= bottom; i++) res.push(matrix[i][left]);
    }
    return res;
};
// @lc code=end
spiralOrder([[1,2,3],[4,5,6],[7,8,9]])
