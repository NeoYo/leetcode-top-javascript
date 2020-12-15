/*
 * @lc app=leetcode.cn id=448 lang=javascript
 *
 * [448] 找到所有数组中消失的数字
 *
 * https://leetcode-cn.com/problems/find-all-numbers-disappeared-in-an-array/description/
 *
 * algorithms
 * Easy (60.62%)
 * Likes:    517
 * Dislikes: 0
 * Total Accepted:    65.9K
 * Total Submissions: 108.1K
 * Testcase Example:  '[4,3,2,7,8,2,3,1]'
 *
 * 给定一个范围在  1 ≤ a[i] ≤ n ( n = 数组大小 ) 的 整型数组，数组中的元素一些出现了两次，另一些只出现一次。
 * 
 * 找到所有在 [1, n] 范围之间没有出现在数组中的数字。
 * 
 * 您能在不使用额外空间且时间复杂度为O(n)的情况下完成这个任务吗? 你可以假定返回的数组不算在额外空间内。
 * 
 * 示例:
 * 
 * 
 * 输入:
 * [4,3,2,7,8,2,3,1]
 * 
 * 输出:
 * [5,6]
 * 
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function(nums) {
    // 1. 排序 T(n) = O(nlogn)      X
    // 2. 类 Map 容器 S(n) = O(n)    X
    // 3. 异或处理   缺失或多出 1 个    X
    // 4. 自己作为 类 Map 容器         √

    /**
        S(n) = 1
        T(n) = O(n)
     */
    for (let i = 0; i < nums.length; i++) {
        // 1. 将正确值放在正确位置
        while (nums[i] !== i + 1) {
            const expectIdx = nums[i] - 1;
            if (nums[expectIdx] === expectIdx + 1) {
                // 对应位置已经有正确值了
                break;
            }
            // swap
            nums[i] = nums[expectIdx];
            nums[expectIdx] = expectIdx + 1;
        }
    }
    
    const result = [];
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== i + 1) {
            result.push(i + 1);
        }
    }
    return result;
};
// @lc code=end

