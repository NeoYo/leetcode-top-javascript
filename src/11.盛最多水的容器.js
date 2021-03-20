/*
 * @lc app=leetcode.cn id=11 lang=javascript
 *
 * [11] 盛最多水的容器
 *
 * https://leetcode-cn.com/problems/container-with-most-water/description/
 *
 * algorithms
 * Medium (64.38%)
 * Likes:    1984
 * Dislikes: 0
 * Total Accepted:    318.5K
 * Total Submissions: 494.5K
 * Testcase Example:  '[1,8,6,2,5,4,8,3,7]'
 *
 * 给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为
 * (i, ai) 和 (i, 0) 。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
 * 
 * 说明：你不能倾斜容器。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 
 * 
 * 输入：[1,8,6,2,5,4,8,3,7]
 * 输出：49 
 * 解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。
 * 
 * 示例 2：
 * 
 * 
 * 输入：height = [1,1]
 * 输出：1
 * 
 * 
 * 示例 3：
 * 
 * 
 * 输入：height = [4,3,2,1,4]
 * 输出：16
 * 
 * 
 * 示例 4：
 * 
 * 
 * 输入：height = [1,2,1]
 * 输出：2
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * n = height.length
 * 2 
 * 0 
 * 
 * 
 */
/**
    解一：暴力法
        T(n) = O(n^2)
            快指针 i 和慢指针 j
            let maxArea = 0;
            for (let i = 0; i < height.length; i++) {
                for (let j = 0; j < height.length; j++) {
                    area = Math.min(height[j], height[i]) * (j - i);
                    maxArea = Math.max(area, maxArea)
                }
            }
    解二：双指针，从两边往中间
        关键：数字较小的那个指针
        为什么可以？
            假设某次比较，左指针 i，出现 height[i] < height[j]，这时为 area = height[i] * (j - i)
                以 i 为左指针，右指针 cursor 取 (i, j) 中任意一个，存在以下几种情况
                    1. height[cursor] > height[i]，高度取决于 height[i]，但宽度变小了，所以 < area
                    2. height[cursor] < height[i]，高度更低（height[cursor]），宽度更小，所以 < area
            所以证明可以 移动数字较小的那个指针

        这个知识点需要理解和记忆，快速反映

        这道题进阶版：接雨水
*/
// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let maxArea = 0;
    for (let i = 0, j = height.length - 1; i < j; ) {
        if (height[i] > height[j]) {            // 哪边低，使用哪个
            const area = height[j] * (j - i);
            if (area > maxArea) {
                maxArea = area;
            }
            j--;                                // 数字较小的那个指针 j
        } else {
            const area = height[i] * (j - i);
            if (area > maxArea) {
                maxArea = area;
            }
            i++;                                // 数字较小的那个指针 i
        }
    }
    return maxArea;
};
// @lc code=end

