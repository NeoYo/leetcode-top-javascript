/*
 * @lc app=leetcode.cn id=136 lang=javascript
 *
 * [136] 只出现一次的数字
 *
 * https://leetcode-cn.com/problems/single-number/description/
 *
 * algorithms
 * Easy (69.80%)
 * Likes:    1514
 * Dislikes: 0
 * Total Accepted:    276.8K
 * Total Submissions: 395.6K
 * Testcase Example:  '[2,2,1]'
 *
 * 给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。
 * 
 * 说明：
 * 
 * 你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？
 * 
 * 
 * 示例 1:
 * 
 * 输入: [2,2,1]
 * 输出: 1
 * 
 * 
 * 示例 2:
 * 
 * 输入: [4,1,2,1,2]
 * 输出: 4
 * 
 * 标签: 位运算
 */
/**
    题解:
        解法一：
            题目中，除了某个元素只出现一次以外，其余每个元素均出现两次
            使用位运算的异或，可以消去相同数字，比如
                1^1 = 0b1 ^ 0b1 = 0
                2^2 = 0b10 ^ 0b10 = 0
                ...
            其余每个元素自己和自己进行异或，都消去之后就剩下要求的那个元素

        其他解法：
            1. 暴力法
                双层for循环，遍历每一个数字，再一个个搜索剩下的，有没有重复的
                T(n) = O(n*n)
            2. HashMap<数字, 次数>
                T(n) = O(n)
                S(n) = O(1)
                一次遍历，使用 HashMap 统计每个数字出现的次数
                再迭代 HashMap，找出出现次数为 1
            3. 排序
            
        参考资料
            精选题解 学算法，结果相对于过程不那么重要 https://leetcode-cn.com/problems/single-number/solution/xue-suan-fa-jie-guo-xiang-dui-yu-guo-cheng-bu-na-y/
        
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    let result = 0;
    for (let i = 0; i < nums.length; i++) {
        result = result ^ nums[i];
    }
    return result;
};

// @lc code=end

