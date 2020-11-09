/*
 * @lc app=leetcode.cn id=189 lang=javascript
 *
 * [189] 旋转数组
 *
 * https://leetcode-cn.com/problems/rotate-array/description/
 *
 * algorithms
 * Easy (41.96%)
 * Likes:    617
 * Dislikes: 0
 * Total Accepted:    139.9K
 * Total Submissions: 332.3K
 * Testcase Example:  '[1,2,3,4,5,6,7]\n3'
 *
 * 给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数。
 * 
 * 示例 1:
 * 
 * 输入: [1,2,3,4,5,6,7] 和 k = 3
 * 输出: [5,6,7,1,2,3,4]
 * 解释:
 * 向右旋转 1 步: [7,1,2,3,4,5,6]
 * 向右旋转 2 步: [6,7,1,2,3,4,5]
 * 向右旋转 3 步: [5,6,7,1,2,3,4]
 * 
 * 
 * 示例 2:
 * 
 * 输入: [-1,-100,3,99] 和 k = 2
 * 输出: [3,99,-1,-100]
 * 解释: 
 * 向右旋转 1 步: [99,-1,-100,3]
 * 向右旋转 2 步: [3,99,-1,-100]
 * 
 * 说明:
 * 
 * 
 * 尽可能想出更多的解决方案，至少有三种不同的方法可以解决这个问题。
 * 要求使用空间复杂度为 O(1) 的 原地 算法。
 * 
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
    // 参考：https://leetcode-cn.com/problems/rotate-array/solution/xuan-zhuan-shu-zu-by-leetcode/
    // 解零：暴力法 T(n) = O(n*k)
    // 解一：使用新数组拷贝元素 T(n) = O(n) S(n) = O(n)
    // 解二：
    // 解三：三次旋转 https://leetcode-cn.com/problems/rotate-array/solution/man-hua-san-ci-xuan-zhuan-de-fang-fa-shi-ru-he-x-2/
    /**
     * 
     * @param {number[]} arr 
     * @param {number} begin 
     * @param {number} end
     */
    function reverse(arr, begin, end) {
        const DISTANCE = end - begin + 1;
        for (let i = 0; i < (DISTANCE >> 1); i++) {
            const temp = arr[begin + i];
            arr[begin + i] = arr[end - i];
            arr[end - i] = temp;
        }
        return arr;
    }
    nums.reverse(); // 原地反转 T(n) = O(n) S(n) = O(1)
    const cursor = k%(nums.length);
    reverse(nums, 0, cursor - 1);
    reverse(nums, cursor, nums.length - 1);
    return nums;
};
// @lc code=end
