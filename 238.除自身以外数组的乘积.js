/*
 * @lc app=leetcode.cn id=238 lang=javascript
 *
 * [238] 除自身以外数组的乘积
 *
 * https://leetcode-cn.com/problems/product-of-array-except-self/description/
 *
 * algorithms
 * Medium (71.02%)
 * Likes:    626
 * Dislikes: 0
 * Total Accepted:    84.2K
 * Total Submissions: 118.6K
 * Testcase Example:  '[1,2,3,4]'
 *
 * 给你一个长度为 n 的整数数组 nums，其中 n > 1，返回输出数组 output ，其中 output[i] 等于 nums 中除 nums[i]
 * 之外其余各元素的乘积。
 * 
 * 
 * 
 * 示例:
 * 
 * 输入: [1,2,3,4]
 * 输出: [24,12,8,6]
 * 
 * 
 * 
 * 提示：题目数据保证数组之中任意元素的全部前缀元素和后缀（甚至是整个数组）的乘积都在 32 位整数范围内。
 * 
 * 说明: 请不要使用除法，且在 O(n) 时间复杂度内完成此题。
 * 
 * 进阶：
 * 你可以在常数空间复杂度内完成这个题目吗？（ 出于对空间复杂度分析的目的，输出数组不被视为额外空间。）
 * 
 */

// @lc code=start
/*
一、暴力法  T(n) = O(n^2) S(n) = O(n)
    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < nums.length; j++) {
            if (i !== j) {
                res[i] = res[i] * nums[j];
            }
        }
    }
    完整代码如下
 */
var productExceptSelf = function(nums) {
    const res = Array(nums.length).fill(1);
    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < nums.length; j++) {
            if (i !== j) {
                res[i] = res[i] * nums[j];
            }
        }
    }
    return res;
};
/*
二、滚动与排除 T(n) = O(n) S(n) = O(n)
        滚动：从前往后和从后网前滚动
        排除：错开自身地滚动

    输入：  [1,     2,      3,      4]
    输出：  [24,    12,     8,      6]
    组成： 2*3*4   1*3*4  1*2*4   1*2*3

    输入：  [1,     2,      3,      4]
  从前到后：         1      1*2     1*2*3
  从后到前：4*3*2   4*3      4
 */
var productExceptSelf = function(nums) {
    const res = Array(nums.length).fill(1);
    let toRight = 1;
    for (let i = 1; i < nums.length; i++) {
        toRight = nums[i-1] * toRight;
        res[i] = toRight;
    }
    let toLeft = 1;
    const lastTwo = nums.length - 1 - 1;
    for (let i = lastTwo; i >= 0; i--) {
        toLeft = nums[i+1] * toLeft;
        res[i] = res[i] * toLeft;
    }
    return res;
};
// @lc code=end

