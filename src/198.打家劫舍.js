/*
 * @lc app=leetcode.cn id=198 lang=javascript
 *
 * [198] 打家劫舍
 *
 * https://leetcode-cn.com/problems/house-robber/description/
 *
 * algorithms
 * Easy (45.76%)
 * Likes:    953
 * Dislikes: 0
 * Total Accepted:    157.2K
 * Total Submissions: 341.5K
 * Testcase Example:  '[1,2,3,1]'
 *
 * 
 * 你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。
 * 
 * 给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 输入：[1,2,3,1]
 * 输出：4
 * 解释：偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
 * 偷窃到的最高金额 = 1 + 3 = 4 。
 * 
 * 示例 2：
 * 
 * 输入：[2,7,9,3,1]
 * 输出：12
 * 解释：偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。
 * 偷窃到的最高金额 = 2 + 9 + 1 = 12 。
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 0 <= nums.length <= 100
 * 0 <= nums[i] <= 400
 * 
 * 
 */
/**
    每次选和不选，选完后，房屋金额，就跳过了，可以看成是 0 - 1 背包问题
    每次都可以进去和不进去，进去与不进的选择，取之不尽，可以看成是 完全背包问题

    DP[i] 表示走到第 nums[i] 时，偷窃到的最高金额
 */
// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
/**
// 解零：递归  T(n) = O(2^n) 
// 有用例超时
function rob(nums) {
    function recusion(nums, index) {
        if (index < 0) return 0;
        return Math.max(
            recusion(nums, index - 2) + nums[index],
            recusion(nums, index - 1)
        );
    }
    return recusion(nums, nums.length - 1);
}
*/
// 解一: 递归+备忘录 T(n) = O(n) S(n) = O(n)
// 解二: 动态规划  T(n) = O(n) S(n) = O(n)
/**
        递推公式
            DP[i] = Math.max(
                DP[i - 2] + nums[i],    // 选择相隔两家的进去
                DP[i - 1]               // 当前不进去
            );
 */
//      
/*    
function rob(nums) {
    if (nums.length === 0) return 0;
    const DP = [nums[0], Math.max(nums[1], nums[0])]; // 初始化边界值
    for (let i = 2; i < nums.length; i++) {
        DP[i] = Math.max(DP[i - 2] + nums[i], DP[i - 1]);
    }
    return DP[nums.length - 1];
}
*/
// 解三: 滚动数组 T(n) = O(n) S(n) = O(1)
function rob(nums) {
    if (nums.length === 0) return 0;
    // 初始化
    let valBeforeTwo = 0,
        valBeforeOne = 0,
        current = 0;
    for (let i = 0; i < nums.length; i++) {
        current = Math.max(valBeforeTwo + (nums[i] || 0), valBeforeOne); // (nums[i] || 0) 边界值处理
        valBeforeTwo = valBeforeOne;
        valBeforeOne = current;
    }
    return current;
}
// @lc code=end

// console.assert(rob([1,2,3,1]));

