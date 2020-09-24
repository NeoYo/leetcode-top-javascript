/*
 * @lc app=leetcode.cn id=494 lang=javascript
 *
 * [494] 目标和
 *
 * https://leetcode-cn.com/problems/target-sum/description/
 *
 * algorithms
 * Medium (44.45%)
 * Likes:    404
 * Dislikes: 0
 * Total Accepted:    46.1K
 * Total Submissions: 103.8K
 * Testcase Example:  '[1,1,1,1,1]\n3'
 *
 * 给定一个非负整数数组，a1, a2, ..., an, 和一个目标数，S。现在你有两个符号 + 和 -。对于数组中的任意一个整数，你都可以从 + 或
 * -中选择一个符号添加在前面。
 * 
 * 返回可以使最终数组和为目标数 S 的所有添加符号的方法数。
 * 
 * 
 * 
 * 示例：
 * 
 * 输入：nums: [1, 1, 1, 1, 1], S: 3
 * 输出：5
 * 解释：
 * 
 * -1+1+1+1+1 = 3
 * +1-1+1+1+1 = 3
 * +1+1-1+1+1 = 3
 * +1+1+1-1+1 = 3
 * +1+1+1+1-1 = 3
 * 
 * 一共有5种方法让最终目标和为3。
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 数组非空，且长度不会超过 20 。
 * 初始的数组的和不会超过 1000 。
 * 保证返回的最终结果能被 32 位整数存下。
 * 
 * 
 */
/*
    题意理解：
        假设输入 nums: [1, 2, -1], 目标是 S=2
        画出迭代树，注意这里是迭代树，不是递归树
                 x
            +1/    \ -1             +1 or -1
            1       -1
         +2/ \-2  +2/ \-2           +2 or -2
          3   -1   1    -3
         /\   /\   /\   /\          +1 or -1
        4  2 0 -2 2  0 -2 -4

    题解：
        本题求的是方法数，如果是枚举所有情况，则用 dfs, 只是求所有情况，可以使用动态规划
        1. 由于方法数，与第i个数，还有和j 有关，二维DP，需要用表格
            https://pic.leetcode-cn.com/05f8151bbb0f1818723710b2455695f01c33d75a38653eeee181ab61217e8f16-image.png
            

    动态规划：
        递推公式： DP[i][j] = (DP[i-1][j-nums[i-1]] || 0) + (DP[i-1][j+nums[i-1]] || 0);

    注意点：
        1. DP 长度 nums.length + 1, 因为要求 DP[nums.length]
        2. j 的范围，从上树观察可知，为 nums{1...i-1} 的总和
        3. null || 0，处理数字
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} S
 * @return {number}
 */
var findTargetSumWays = function(nums, S) {
    const L = nums.length + 1;
    const DP = Array(L).fill(null).map(_=> Object());
    DP[0][0] = 1;
    let max = 0;
    for (let i = 1; i < L; i++) { // i 表示nums第i-1个
        max += nums[i-1];
        for (let j = -max; j <= max; j++) {    // j 表示第 i 层，和为 j
            DP[i][j] = (DP[i-1][j-nums[i-1]] || 0) + (DP[i-1][j+nums[i-1]] || 0);
        }
    }
    // console.log(DP);
    return DP[nums.length][S] || 0;
};
// @lc code=end

findTargetSumWays([1,1,1,1,1], 3);
/*

 */

