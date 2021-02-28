/*
 * @lc app=leetcode.cn id=41 lang=javascript
 *
 * [41] 缺失的第一个正数
 *
 * https://leetcode-cn.com/problems/first-missing-positive/description/
 *
 * algorithms
 * Hard (40.30%)
 * Likes:    974
 * Dislikes: 0
 * Total Accepted:    112.6K
 * Total Submissions: 277K
 * Testcase Example:  '[1,2,0]'
 *
 * 给你一个未排序的整数数组 nums ，请你找出其中没有出现的最小的正整数。
 * 
 * 
 * 
 * 进阶：你可以实现时间复杂度为 O(n) 并且只使用常数级别额外空间的解决方案吗？
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：nums = [1,2,0]
 * 输出：3
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：nums = [3,4,-1,1]
 * 输出：2
 * 
 * 
 * 示例 3：
 * 
 * 
 * 输入：nums = [7,8,9,11,12]
 * 输出：1
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 0 
 * -2^31 
 * 
 * 
 */
/**
    题解
        1. Array.prototype.sort (时间复杂度 O(nlogn))
        2. 类 Map 结构 （空间复杂度 O(n)）
        3. 异或运算 （可能重复，不止一次， 所以不能使用异或运算） (输入 [1,1] => 输出 2)
        4. 成环链表 (key 和 value 不是互相对应)
        5. 将自身作为类 Map 容器
        
        1、2、3、4 都不行。

    解：自身作为 类 Map 容器

    算法思路
        第一次循环
            1. 把正确的值全都放到该放的位置，不在范围内的值不管;
            2. 调换过来的值，也需要继续处理
        第二次循环
            1. 该放的位置没有对应值，就是缺失的值
    
    S(n) = 1
    T(n) = O(n)     两层循环最多交换 n 次！

    ```js
    输入:       [3, 4, -1, 1]

    索引:       [0, 1, 2, 3]
    该放的位置: [1, 2, 3, 4]

    过程:       [-1, 4, 3, 1]
                |      |
                
                [-1, 1, 3, 4]
                     |     |
                    
                [1, -1, 3, 4]
                 |   |
                
    缺失:            2
    ```

    参考资料：
        题解： [LeetCode 题解](https://leetcode-cn.com/problems/first-missing-positive/solution/tong-pai-xu-python-dai-ma-by-liweiwei1419/) 主要看 [3 4 -1 1] 的 PPT

 */
// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function(nums) {
    for (let i = 0; i < nums.length; i++) {
        while (nums[i] != i + 1) {
            if (nums[i] <= 0 || nums[i] > nums.length) {
                // 不管这个 value 
                break;
            }
            if (nums[i] === nums[nums[i] - 1]) {
                // case: [1,1]，对应的位置，已经有期望值了
                break;
            }
            // 将nums[i] 放置到对应位置上[1,2,3...]
            let index = nums[i] - 1;
            nums[i] = nums[index]; // 储存要被替换的值
            nums[index] = index + 1; // 覆盖到对应的位置
        }
    }
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] != (i + 1)) {
            return (i + 1);
        }
    }
    return (nums.length + 1);
};

// @lc code=end

