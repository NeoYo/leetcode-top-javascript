/*
 * @lc app=leetcode.cn id=46 lang=javascript
 *
 * [46] 全排列
 *
 * https://leetcode-cn.com/problems/permutations/description/
 *
 * algorithms
 * Medium (76.65%)
 * Likes:    853
 * Dislikes: 0
 * Total Accepted:    177.3K
 * Total Submissions: 231.1K
 * Testcase Example:  '[1,2,3]'
 *
 * 给定一个 没有重复 数字的序列，返回其所有可能的全排列。
 * 
 * 示例:
 * 
 * 输入: [1,2,3]
 * 输出:
 * [
 * ⁠ [1,2,3],
 * ⁠ [1,3,2],
 * ⁠ [2,1,3],
 * ⁠ [2,3,1],
 * ⁠ [3,1,2],
 * ⁠ [3,2,1]
 * ]
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    const dfs = (depth, res, leftNums, cur) => {
        if (depth === 0) {
            res.push(cur);
            return;
        }
        depth--;
        for (let i = 0; i < leftNums.length; i++) {
            const nextLeftNums = leftNums.slice();
            nextLeftNums.splice(i, 1);            
            dfs(
                depth,
                res,
                nextLeftNums,
                [...cur, leftNums[i]]
            )
        }
    }
    const res = [];
    dfs(nums.length, res, nums, []);
    return res;
};
// @lc code=end
permute([1, 2, 3])
