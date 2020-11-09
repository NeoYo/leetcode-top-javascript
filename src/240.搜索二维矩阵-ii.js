/*
 * @lc app=leetcode.cn id=240 lang=javascript
 *
 * [240] 搜索二维矩阵 II
 *
 * https://leetcode-cn.com/problems/search-a-2d-matrix-ii/description/
 *
 * algorithms
 * Medium (41.42%)
 * Likes:    395
 * Dislikes: 0
 * Total Accepted:    71.3K
 * Total Submissions: 171.2K
 * Testcase Example:  '[[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]]\n' +
  '5'
 *
 * 编写一个高效的算法来搜索 m x n 矩阵 matrix 中的一个目标值 target。该矩阵具有以下特性：
 * 
 * 
 * 每行的元素从左到右升序排列。
 * 每列的元素从上到下升序排列。
 * 
 * 
 * 示例:
 * 
 * 现有矩阵 matrix 如下：
 * 
 *  
               0               xLength - 1
        [
    0 ⁠        [1,   4,  7, 11, 15],
     ⁠         [2,   5,  8, 12, 19],
     ⁠         [3,   6,  9, 16, 22],
     ⁠         [10, 13, 14, 17, 24],
yLength-1  ⁠   [18, 21, 23, 26, 30]
        ]
 * 
 * 
 * 给定 target = 5，返回 true。
 * 
 * 给定 target = 20，返回 false。
 * 
 */

// @lc code=start
/*
    Ref: https://leetcode-cn.com/problems/search-a-2d-matrix-ii/solution/sou-suo-er-wei-ju-zhen-ii-by-leetcode-2/
    解一：一行行用二分查找法 T = m * logn
    解二：空间缩减法（二分查找法的迁移）
            1 2
            3 4
        原理：比较四个空间的中点，
            如果目标大于中点，去掉空间 1，
            如果目标小于中点，去掉空间 4
            接下来只剩下3个空间，以此类推
    解三：虚拟二分搜索树的应用 T(n) = O(n + m)
        原理：选取左下角，或右上角，就是二分搜索树的根节点

*/
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
    // 边界条件判断
    if (matrix.length === 0) {
        return false;
    }
    let x = 0,
        y = matrix.length - 1;
    while (x < matrix[0].length && y >= 0) {
        if (matrix[y][x] > target) {
            y--;
        } else if (matrix[y][x] < target) {
            x++;
        } else {
            return true;
        }
    }
    return false;
};
// @lc code=end

