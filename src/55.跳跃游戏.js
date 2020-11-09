/*
 * @lc app=leetcode.cn id=55 lang=javascript
 *
 * [55] 跳跃游戏
 *
 * https://leetcode-cn.com/problems/jump-game/description/
 *
 * algorithms
 * Medium (41.01%)
 * Likes:    806
 * Dislikes: 0
 * Total Accepted:    151.4K
 * Total Submissions: 369.2K
 * Testcase Example:  '[2,3,1,1,4]'
 *
 * 给定一个非负整数数组，你最初位于数组的第一个位置。
 * 
 * 数组中的每个元素代表你在该位置可以跳跃的最大长度。
 * 
 * 判断你是否能够到达最后一个位置。
 * 
 * 示例 1:
 * 
 * 输入: [2,3,1,1,4]
 * 输出: true
 * 解释: 我们可以先跳 1 步，从位置 0 到达 位置 1, 然后再从位置 1 跳 3 步到达最后一个位置。
 * 
 * 
 * 示例 2:
 * 
 * 输入: [3,2,1,0,4]
 * 输出: false
 * 解释: 无论怎样，你总会到达索引为 3 的位置。但该位置的最大跳跃长度是 0 ， 所以你永远不可能到达最后一个位置。
 * 
 * 
 */
/*
              [2, 3, 1, 1, 4]
             /              \
           /+1                \+2
        [3, 1, 1, 4]        [1, 1, 4]
        /+1   |+2  \+3          |+1
[1, 1, 4]   [1, 4] [4]        [1, 4]
    |+1       |+1               |+1
  [1, 4]     [4]               [4]
    |+1
   [4]

    ∵ nums[4]    , DP[0] = true;
    ∵ nums[3] = 1, DP[1] = DP[0] = true;
    ∵ nums[2] = 1, DP[2] = DP[1] = true;
    ∵ nums[1] = 3, DP[3] = DP[2] || DP[1] || DP[0]] = true;
    ∵ nums[0] = 2, DP[4] = DP[3] || DP[2] = true;

    [3, 2, 1, 0, 4]
    ∵ nums[4],     DP[0] = true;
    ∵ nums[3] = 0, DP[1] = fale;
    ∵ nums[2] = 1, DP[2] = DP[1] = false;
    ∵ nums[1] = 2, DP[3] = DP[2] || DP[1]] = false;
    ∵ nums[0] = 3, DP[4] = DP[3] || DP[2] || DP[1]] = false;

    递推公式:
    const num = nums[nums.length - 1 - i]
    let DP[i] = [];
    for (let j = 1; j <= num; j++) {
        DP[i] = [...DP[i], ...DP[i-j]]
    }
     */
// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
  const DP = Array(nums.length).fill(null).map(() => false);
  DP[0] = true;
  for (let i = 1; i < nums.length; i++) {
    const num = nums[nums.length - 1 - i];
    for (let j = 1; j <= num; j++) {
      DP[i] = DP[i] || DP[i-j];
      if (DP[i] === true) {
        break;
      }
    }
  }
  return DP[nums.length - 1];
};
// @lc code=end

