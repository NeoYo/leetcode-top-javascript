/*
 * @lc app=leetcode.cn id=300 lang=javascript
 *
 * [300] 最长上升子序列
 *
 * https://leetcode-cn.com/problems/longest-increasing-subsequence/description/
 *
 * algorithms
 * Medium (44.91%)
 * Likes:    888
 * Dislikes: 0
 * Total Accepted:    128.6K
 * Total Submissions: 285.4K
 * Testcase Example:  '[10,9,2,5,3,7,101,18]'
 *
 * 给定一个无序的整数数组，找到其中最长上升子序列的长度。
 * 
 * 示例:
 * 
 * 输入: [10,9,2,5,3,7,101,18]
 * 输出: 4 
 * 解释: 最长的上升子序列是 [2,3,7,101]，它的长度是 4。
 * 
 * 说明:
 * 
 * 
 * 可能会有多种最长上升子序列的组合，你只需要输出对应的长度即可。
 * 你算法的时间复杂度应该为 O(n^2) 。
 * 
 * 
 * 进阶: 你能将算法的时间复杂度降低到 O(n log n) 吗?
 * 
 */

/*
0. 子序列与子串
   子串要求连续，子序列不要求连续

    这实际上是 0-1 背包问题的拓展 https://time.geekbang.org/column/article/74788

1. 暴力法：T(n) = O(2^n * n)

    原理：[10, 9, 2, 5, 3, 7, 101, 18]
           0  0  0  0  0  0   0    0
           1  1  1  1  1  1   1    1
        1) 每个位都有两种情况，存在与不存在，总共就是 O(2^n)
        2) 再进行判断是否有序 O(n)

2. 动态规划：以 i 结尾的最长上升子序列作为状态 T(n) = O(n * n)

    dp[i] = max(dp[j]) + 1, if (0≤j<i && num[j]<num[i])

    以 i 结尾，这个很重要，它不保证连续，但保证以 i 结尾的，这样才能使转移公式成立

    参考思路：
        [动态规划（动图辅助理解，如有帮助请点个赞）](https://leetcode-cn.com/problems/number-of-longest-increasing-subsequence/solution/dong-tai-gui-hua-dong-tu-fu-zhu-li-jie-ru-you-bang/)
            动图很好理解

        在草稿纸书写了下：
            index       0   1   2   3   4   5   6   7   8
            array       1   3   6   7   9   4   10  5   6
            DP init     1   1   1   1   1   1   1   1   1
            DP          1   2   3   4   5   3   6   3   3

    ----2021.04.03 这段理解不透彻，写得不好，实际上是发现了 以 i 结尾的最长上升子序列 的规律，再用 DP，跟下面说的那不同
        原理：比如 [2, 5, 3, 7]，知道 [2, 5, 3] 并记录起来，就可以推出 [2, 5, 3, 7] 不需要每次都重新计算
            自顶向下，即递归+备忘录
            自底向上，即动态规划
            1) 使用动态规划，可以把前面 O(2^n) 优化为 O(n^2)
            2) 以 i 结尾的最长上升子序列，还要和前面每个数比较大小 O(n)
            for (let i = 0; i < )
    ----

    代码：
        var lengthOfLIS = function(nums) {
            if (nums.length === 0) { return 1; }            // 边界条件
            const DP = Array(nums.length).fill(1);          // 以每个数结尾的最长子序列，至少包含自己，即长度 1
            let max = 1;                                    // 不一定以最后一个结尾就最大
            for (let i = 0; i < nums.length; i++) {         
                for (let j = 0; j <= i; j++) {
                    if (nums[i] > nums[j]) {
                        DP[i] = Math.max(DP[i], DP[j] + 1); // 满足这种情况时，更新 DP[i]
                        max = Math.max(max, DP[i]);
                    }
                }
            }
            return max;
        };

3. 维护长度为 l 的有序子序列，且序列中每个值最小 T(n) = O(n * logn)
    算法： 贪心算法 + 二分查找
    原理： 
            0）跟上面 T(n) = O(n^2) 的关联？上面的 for (let j = 0; j <= i; j++) 占了 O(n)，实际上是在找合适的位置，如果前面都是已排序的，那么就可以用二分查找法，降低为 O(logn)
            1）不断维护每个值最小的上升子序列，一边遍历，一边维护，当遍历完的时候，这个上升子序列就是最长上升子序列（贪心算法）
            2）一边遍历，一边维护，维护是指判断 nums[i] 能不能加进 维护的序列里， 如果可以，加在哪个位置
            如果可以加，把 nums[i] 放进有序子序列。有序、数组、静态，这3个前提条件，查找某个元素位置，或者某个元素放在哪个位置，
            可以使用二分查找法

    核心代码：
            for (let i = 0; i < nums.length; i++) {
                1)判断是否可以插入有序数组
                2)使用二分查找，找到 nums[i]，应该插入有序数组的位置
            }
    
    > 关于二分查找，很重要的一个细节: [动态规划 （包含O (N log N) 解法的状态定义以及解释）](https://leetcode-cn.com/problems/longest-increasing-subsequence/solution/dong-tai-gui-hua-er-fen-cha-zhao-tan-xin-suan-fa-p/)
        sortedNums 每一位彼此之间，并没有成为真实最长子序列的意义，sortedNums 索引上的每一位，对应的是当前长度（index+1）结尾的子序列，尾数最小的值
        为什么能 [2, 3, 7, 8] -> 替换为 [2, 3, 4, 8]?
        两个原因：
        1. sortedNums 并不表示真实的真实最长子序列，sortedNums[i] 表示的是 对应的是长度为（index+1）的子序列，尾数最小的值
        2. 既然 7 前面的 3，可以表示 以 3 结尾的最长子序列，长度是 2 （index1+1）
            那么新出现的 4，完全可以取代 7，成为 以 4 结尾的最长子序列，长度是 3
            
            我的评论 https://leetcode-cn.com/problems/longest-increasing-subsequence/solution/dong-tai-gui-hua-er-fen-cha-zhao-tan-xin-suan-fa-p/871091
细节：
    /**
     * 输入：nums = [7,7,7,7,7,7,7]
     * 输出：1
     *  不重复
     */
// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
// 这里使用解法三
var lengthOfLIS = function (nums) {
    if (nums.length <= 1) { return nums.length; }

    const sortedNums = [nums[0]];
    for (let i = 1; i < nums.length; i++) {
        const lastNum = sortedNums[sortedNums.length - 1];
        if (lastNum > nums[i]) {
            // 在 sortedNums 进行二分查找法 插入 nums[i]
            const target = nums[i];
            let left = 0,
                right = sortedNums.length - 1,
                mid = -Infinity;
            while (left <= right) {
                mid = left + ((right - left) >> 1);
                if (sortedNums[mid] > target) {
                    right = mid - 1;
                } else if (sortedNums[mid] < target) {
                    left = mid + 1;
                } else {
                    break;
                }
            }
            if (mid === target) {                       // 如果相等就不操作
                // Case: [4,10,4,3,8,9]
            } else if (target > sortedNums[mid]) {
                sortedNums[mid + 1] = target;
            } else if (target < sortedNums[mid]) {
                sortedNums[mid] = target;
            }
        } else if (lastNum === nums[i]) {
            // Case: [2,2] Excepted: 1 Not: 2
            continue;            
        } else {
            sortedNums.push(nums[i]);
        }
    }
    return sortedNums.length;
};

// @lc code=end
