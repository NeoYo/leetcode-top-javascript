/*
 * @lc app=leetcode.cn id=268 lang=javascript
 *
 * [268] 丢失的数字
 *
 * https://leetcode-cn.com/problems/missing-number/description/
 *
 * algorithms
 * Easy (57.85%)
 * Likes:    353
 * Dislikes: 0
 * Total Accepted:    100.6K
 * Total Submissions: 172K
 * Testcase Example:  '[3,0,1]'
 *
 * 给定一个包含 [0, n] 中 n 个数的数组 nums ，找出 [0, n] 这个范围内没有出现在数组中的那个数。
 * 
 * 
 * 
 * 进阶：
 * 
 * 
 * 你能否实现线性时间复杂度、仅使用额外常数空间的算法解决此问题?
 * 
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：nums = [3,0,1]
 * 输出：2
 * 解释：n = 3，因为有 3 个数字，所以所有的数字都在范围 [0,3] 内。2 是丢失的数字，因为它没有出现在 nums 中。
 * 
 * 示例 2：
 * 
 * 
 * 输入：nums = [0,1]
 * 输出：2
 * 解释：n = 2，因为有 2 个数字，所以所有的数字都在范围 [0,2] 内。2 是丢失的数字，因为它没有出现在 nums 中。
 * 
 * 示例 3：
 * 
 * 
 * 输入：nums = [9,6,4,2,3,5,7,0,1]
 * 输出：8
 * 解释：n = 9，因为有 9 个数字，所以所有的数字都在范围 [0,9] 内。8 是丢失的数字，因为它没有出现在 nums 中。
 * 
 * 示例 4：
 * 
 * 
 * 输入：nums = [0]
 * 输出：1
 * 解释：n = 1，因为有 1 个数字，所以所有的数字都在范围 [0,1] 内。1 是丢失的数字，因为它没有出现在 nums 中。
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * n == nums.length
 * 1 
 * 0 
 * nums 中的所有数字都 独一无二
 * 
 * 
 */
/**
    解法:
        1. Array.protype.sort 假设快排，虽然 S(n) = 1 ，但是 T(n) = O(nlogn) ，大于 O(n)
        2. 类 Map 存储结构，key 是数字，value 是 0/1 (0 表示出现 2 次，1 表示出现 1次)
        3. 异或运算 A^A = 0
 */
/**
    解一：Map 结构存储
        下面以数组为例子，还可以用 Object、Map、Set、二进制存储，可以看 Map（总结）
            T(n) = O(n + n) = O(n)
            S(n) = O(n)
 */
// @lc code=start
var missingNumber = function(nums) {
    const arr = [];
    for (let i = 0; i < nums.length; i++) {
        arr[nums[i]] = true;
    }
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== true) {
            return i;
        }
    }
    return arr.length; // 边界处理
};
/**
    解二：Array.prototype.sort
        Array.prototype.sort 规定是原地排序，所以 空间复杂度 O(1)，如果宿主环境用快排，时间复杂度就是 O(nlogn)
            T(n) = O(nlogn) + O(n) = O(nlogn)
            S(n) = O(1)
 */
var missingNumber = function(nums) {
    nums.sort((n1, n2) => (n1 - n2));
    let cursor = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== cursor) {
            return i;
        }
        cursor++;
    }
    return cursor;
};
/**
    解三：异或运算
        任一数字，异或自己等于 0
            T(n) = O(n)
            S(n) = O(1)
*/
var missingNumber = function(nums) {
    let result = 0;
    let cursor = 0;
    for (let i = 0; i < nums.length; i++) {
        result = result ^ nums[i] ^ cursor;
        cursor++;
    }
    return result ^ cursor;
};
// @lc code=end

