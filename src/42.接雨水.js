/*
 * @lc app=leetcode.cn id=42 lang=javascript
 *
 * [42] 接雨水
 *
 * https://leetcode-cn.com/problems/trapping-rain-water/description/
 *
 * algorithms
 * Hard (52.95%)
 * Likes:    1787
 * Dislikes: 0
 * Total Accepted:    161.5K
 * Total Submissions: 304.9K
 * Testcase Example:  '[0,1,0,2,1,0,1,3,2,1,2,1]'
 *
 * 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 
 * 
 * 输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
 * 输出：6
 * 解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。 
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：height = [4,2,0,3,2,5]
 * 输出：9
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * n == height.length
 * 0 
 * 0 
 * 
 * 
 */
/**
   零、参考资料 https://leetcode-cn.com/problems/trapping-rain-water/solution/jie-yu-shui-by-leetcode/
   一、暴力法
       T(n) = O(n^2)
       S(n) = O(1)
       以每一个元素为中心，从左右扩散
       
        column[i] = Math.max(0, 
            Math.min(maxLeft, maxRight) − height[i]
        )

   二、单调栈
       T(n) = O(n)
       S(n) = O(n)
       代码如下，对应着参考资料的 动态编程


       leftMax     // 单调不减栈
                   // 记录左边数组的最大值


       rightMax
                   // 单调不增栈
                   // 记录右边数组的最大值
*/
// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
    let n = height.length;
    if (n === 0) return 0;
    let res = 0;
    const test = [];

    let leftMax = [],  
        rightMax = [];
    //记录左边数组的最大值
    leftMax[0] = height[0];
    for (let i = 1; i < n; i++) {
        leftMax[i] = Math.max(leftMax[i - 1], height[i]);
    }
    console.log('leftMax: ', leftMax);    
    //记录右边数组的最大值
    rightMax[n - 1] = height[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        rightMax[i] = Math.max(rightMax[i + 1], height[i]);
    }
    console.log('rightMax: ', rightMax);
    //统计每一列的面积之和
    for (let i = 0; i < n; i++) {
        res += Math.min(leftMax[i], rightMax[i]) - height[i];
        test[i] = Math.min(leftMax[i], rightMax[i]) - height[i];
    }
    console.log('test: ', test);
    return res;
};
// @lc code=end

