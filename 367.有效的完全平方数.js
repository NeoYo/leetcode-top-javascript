/*
 * @lc app=leetcode.cn id=367 lang=javascript
 *
 * [367] 有效的完全平方数
 *
 * https://leetcode-cn.com/problems/valid-perfect-square/description/
 *
 * algorithms
 * Easy (43.47%)
 * Likes:    172
 * Dislikes: 0
 * Total Accepted:    45.9K
 * Total Submissions: 105.5K
 * Testcase Example:  '16'
 *
 * 给定一个正整数 num，编写一个函数，如果 num 是一个完全平方数，则返回 True，否则返回 False。
 * 
 * 说明：不要使用任何内置的库函数，如  sqrt。
 * 
 * 示例 1：
 * 
 * 输入：16
 * 输出：True
 * 
 * 示例 2：
 * 
 * 输入：14
 * 输出：False
 * 
 * 
 */
/**
    本题实际上是对二分查找模板代码的改写
    我的二分查找模板代码
        const bsearch = (nums, target) => {
            let left = 0;
            let right = nums.length - 1;

            while (left <= right) {
                let mid = left + ((right - left) >> 1);
                if (nums[mid] == target) {
                    return mid;
                } else if (nums[mid] < target) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
            return -1;
        }
    改写后代码如下

 */
// @lc code=start
/**
 * @param {number} num
 * @return {boolean}
 */
var isPerfectSquare = function(num) {
    let left = 0;
    let right = num;
    while (left <= right) {
        const mid = left + ((right - left) >> 1);
        const pow2 = mid * mid;
        if (pow2 == num) {
            return true;
        } else if (pow2 < num) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return false;
};
// @lc code=end
isPerfectSquare(16)

