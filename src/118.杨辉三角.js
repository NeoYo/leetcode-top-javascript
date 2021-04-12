/*
 * @lc app=leetcode.cn id=118 lang=javascript
 *
 * [118] 杨辉三角
 *
 * https://leetcode-cn.com/problems/pascals-triangle/description/
 *
 * algorithms
 * Easy (66.09%)
 * Likes:    317
 * Dislikes: 0
 * Total Accepted:    86.4K
 * Total Submissions: 129.6K
 * Testcase Example:  '5'
 *
 * 给定一个非负整数 numRows，生成杨辉三角的前 numRows 行。
 * 
 * 
 * 
 * 在杨辉三角中，每个数是它左上方和右上方的数的和。
 * 
 * 示例:
 * 
 * 输入: 5
 * 输出:
 * [
 * ⁠    [1],
 * ⁠   [1,1],           
 * ⁠  [1,2,1],          
 * ⁠ [1,3,3,1],         
 * ⁠[1,4,6,4,1]         
 * ]
 * 
 */
/**
    [
        ⁠    [1],                0
        ⁠   [1,1],              0 1
        ⁠  [1,2,1],            0 1 2
        ⁠ [1,3,3,1],          0 1 2 3
        ⁠[1,4,6,4,1]         0 1 2 3 4
    ]

    下一行 i 的值 = 上一行 (i - 1) 的值 + (i - 2) 的值
 */
// @lc code=start
/**
 * @param {number} numRows
 * @return {number[][]}
 */
 var generate = function (numRows) {
    const res = [];
    for (let rowIdx = 0; rowIdx < numRows; rowIdx++) {
        res[rowIdx] = [];
        res[rowIdx][0] = 1;
        for (let i = 1; i < rowIdx; i++) {
            // debugger;
            res[rowIdx][i] =
                res[rowIdx - 1][i - 1] + res[rowIdx - 1][i];
        }
        res[rowIdx][rowIdx] = 1;
    }
    return res;
};
// @lc code=end

