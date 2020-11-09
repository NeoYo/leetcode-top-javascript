/*
 * @lc app=leetcode.cn id=416 lang=javascript
 *
 * [416] 分割等和子集
 *
 * https://leetcode-cn.com/problems/partition-equal-subset-sum/description/
 *
 * algorithms
 * Medium (49.28%)
 * Likes:    413
 * Dislikes: 0
 * Total Accepted:    57.9K
 * Total Submissions: 117.3K
 * Testcase Example:  '[1,5,11,5]'
 *
 * 给定一个只包含正整数的非空数组。是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。
 * 
 * 注意:
 * 
 * 
 * 每个数组中的元素不会超过 100
 * 数组的大小不会超过 200
 * 
 * 
 * 示例 1:
 * 
 * 输入: [1, 5, 11, 5]
 * 
 * 输出: true
 * 
 * 解释: 数组可以分割成 [1, 5, 5] 和 [11].
 * 
 * 
 * 
 * 
 * 示例 2:
 * 
 * 输入: [1, 2, 3, 5]
 * 
 * 输出: false
 * 
 * 解释: 数组不能分割成两个元素和相等的子集.
 * 
 * 
 * 
 * 
 */
/*

标签：动态规划

题解：
    理解题目，等和子集，即一分为二
    两个子集和相等，也就是每个子集是和的一半 sum>>1

    这道题可以理解为 0-1 背包问题

以下解题步骤，以 64.最小路径和 为模板 https://github.com/NeoYo/leetcode-top-javascript/blob/master/64.%E6%9C%80%E5%B0%8F%E8%B7%AF%E5%BE%84%E5%92%8C.js

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
    转移表与递归树区别与作用
        1. 转移表适合 二维DP
        2. 递归树适合 1~n 维DP
        3. 转移表适合用来编写和校验，DP代码
        4. 递归树适合用来编写 dfs 递归代码

注意点：
    边界值
    1. sum = 11 是奇数，只能偶数，比如 [1, 2, 3, 5]，要 return false
    2. 
    3. 

 */
// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function(nums) {
    let sum = 0;
    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];
    }
    if (sum % 2 === 1) {
        return false;
    }
    const halfSum = sum >> 1;
    const ROW_CNT = halfSum + 1;
    const COL_CNT = nums.length + 1;
    const DP = Array(ROW_CNT).fill(null).map(_ => Array());
    DP[0][0] = true;
    // 初始第一行
    for (let j = 1; j < COL_CNT; j++) {
        DP[0][j] = true;
    }
    // 初始第一列
    for (let i = 1; i < ROW_CNT; i++) {
        DP[i][0] = false;
    }
    // 初始 nums[j] 在 i 上的映射
    for (let j = 0; j < nums.length; j++) {
        if (nums[j] > halfSum) { break; }
        const value = nums[j];
        DP[value][j+1] = true;
    }

    for (let i = 1; i < ROW_CNT; i++) {
        for (let j = 1; j < COL_CNT; j++) {
            // 1. DP[i][j] 由向右得到，表示什么都不做，不选 nums[j] 的值，那 DP[i][j-1] 需要为 true
            if (DP[i][j-1] === true) {
                DP[i][j] = true;
                continue;
            }
            // 2. DP[i][j] 由向下得到，那刚好等于 j
            // if (i === nums[j-1]) {
            //     DP[i][j] = true;
            //     continue;
            // }
            // 3. DP[i][j] 由向斜下得到
            if (
                i-nums[j-1] > 0 &&
                DP[i-nums[j-1]][j-1] === true
            ) {
                DP[i][j] = true;
                continue;
            }
        }
    }
    // console.log('DP: ', DP);
    return DP[ROW_CNT - 1][COL_CNT - 1] || false;
};
// @lc code=end

canPartition([1, 2, 5]);

