/*
 * @lc app=leetcode.cn id=16 lang=javascript
 *
 * [16] 最接近的三数之和
 *
 * https://leetcode-cn.com/problems/3sum-closest/description/
 *
 * algorithms
 * Medium (45.83%)
 * Likes:    606
 * Dislikes: 0
 * Total Accepted:    161.6K
 * Total Submissions: 352.3K
 * Testcase Example:  '[-1,2,1,-4]\n1'
 *
 * 给定一个包括 n 个整数的数组 nums 和 一个目标值 target。找出 nums 中的三个整数，使得它们的和与 target
 * 最接近。返回这三个数的和。假定每组输入只存在唯一答案。
 * 
 * 
 * 
 * 示例：
 * 
 * 输入：nums = [-1,2,1,-4], target = 1
 * 输出：2
 * 解释：与 target 最接近的和是 2 (-1 + 2 + 1 = 2) 。
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 3 <= nums.length <= 10^3
 * -10^3 <= nums[i] <= 10^3
 * -10^4 <= target <= 10^4
 * 
 * 
 */
/**
    参考资料 https://github.com/NeoYo/leetcode-top-javascript/blob/master/15.%E4%B8%89%E6%95%B0%E4%B9%8B%E5%92%8C.js    

    这道题主要与三数之和类似，分析过程也和三数之和相同
    分析结果采用排序+双指针，降低到 T(n) = O(nlogn) + O(n^2)
    
    相对还简单了一点，这道题不需要去重，不需要分析去重的情况

    具体代码如下：
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function(nums, target) {
    let ans = NaN;                     // let ans = [];
    const len = nums.length;
    // if(nums == null || len < 3) return ans;
    nums.sort((a, b) => a - b);             // 排序
    for (let i = 0; i < len ; i++) {
        // if(nums[i] === nums[i-1]) continue; // 去重3
        let L = i+1;
        let R = len-1;
        while(L < R){
            const sum = nums[i] + nums[L] + nums[R];
            if (sum === target) {
                return target;      // ans.push([nums[i],nums[L],nums[R]]);
                // while (nums[L] === nums[L+1]) L++;  // 去重1
                // while (nums[R] === nums[R-1]) R--;  // 去重2
                // L++;
                // R--;
            } else if (target > sum) {      // } else if (target < 0) {
                L++;
            } else if (target < sum) {
                R--;
            }
            if (Math.abs(sum - target) < Math.abs(ans - target)) {
                ans = sum;
            }
        }
    }        
    return ans;
};
// @lc code=end

