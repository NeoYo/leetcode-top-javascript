/*
 * @lc app=leetcode.cn id=162 lang=javascript
 *
 * [162] 寻找峰值
 *
 * https://leetcode-cn.com/problems/find-peak-element/description/
 *
 * algorithms
 * Medium (47.08%)
 * Likes:    270
 * Dislikes: 0
 * Total Accepted:    53.6K
 * Total Submissions: 113.5K
 * Testcase Example:  '[1,2,3,1]'
 *
 * 峰值元素是指其值大于左右相邻值的元素。
 * 
 * 给定一个输入数组 nums，其中 nums[i] ≠ nums[i+1]，找到峰值元素并返回其索引。
 * 
 * 数组可能包含多个峰值，在这种情况下，返回任何一个峰值所在位置即可。
 * 
 * 你可以假设 nums[-1] = nums[n] = -∞。
 * 
 * 示例 1:
 * 
 * 输入: nums = [1,2,3,1]
 * 输出: 2
 * 解释: 3 是峰值元素，你的函数应该返回其索引 2。
 * 
 * 示例 2:
 * 
 * 输入: nums = [1,2,1,3,5,6,4]
 * 输出: 1 或 5 
 * 解释: 你的函数可以返回索引 1，其峰值元素为 2；
 * 或者返回索引 5， 其峰值元素为 6。
 * 
 * 
 * 说明:
 * 
 * 你的解法应该是 O(logN) 时间复杂度的。
 * 
 */

// @lc code=start
/**
    解一：遍历 T(n) = O(n)
        结论：从左到右，因为左边[-1]是无穷小，往右挪，只要右边一小于左边，左边就是峰值
            
           -
         -   -
        |
        |
        |
      负无穷

        普通情况，先升后降，可证满足结论
        一开始就降序的话，第一个就是峰值，可证满足结论
        全部升序的话，最后一个就是峰值
         
    解二：二分查找法 T(n) = O(logn)  S(n) = O(1)
                         -
                       mid+1
                   - 
                  mid 
        |                     |
        |                     |
        |                     | 
      负无穷                 负无穷      
        
        第一个迭代：
            上图中，nums[mid+1] > nums[mid]，
            不管 mid 到 mid + 1，再到后面，是先升后降，还是一直升，[mid+1, nums.length-1] 一定存在峰值
            而 [0, mid]，有可能一直升序，因此 [0, mid] 可能不存在峰值

            反之如果，nums[mid+1] < nums[mid]，[0, mid] 一定存在峰值


        所以后面的迭代怎么证明？
            选定的区间，左右两边都
    
 */
/**
 * 
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function(nums) {
    let l = 0,
        r = nums.length - 1;
    while (l < r) {
        const mid = l + ((r - l)>>1);
        if (nums[mid] > nums[mid + 1]) {
            r = mid;
        } else {
            l = mid + 1;
        }
    }
    return l;
};
// @lc code=end

