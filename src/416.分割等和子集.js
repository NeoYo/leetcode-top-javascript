/*
 * @lc app=leetcode.cn id=416 lang=javascript
 *
 * [416] 分割等和子集
 *
 * https://leetcode-cn.com/problems/partition-equal-subset-sum/description/
 *
 * algorithms
 * Medium (49.28%)
 * Likes:    413
 * Dislikes: 0
 * Total Accepted:    57.9K
 * Total Submissions: 117.3K
 * Testcase Example:  '[1,5,11,5]'
 *
 * 给定一个只包含正整数的非空数组。是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。
 * 
 * 注意:
 * 
 * 
 * 每个数组中的元素不会超过 100
 * 数组的大小不会超过 200
 * 
 * 
 * 示例 1:
 * 
 * 输入: [1, 5, 11, 5]
 * 
 * 输出: true
 * 
 * 解释: 数组可以分割成 [1, 5, 5] 和 [11].
 * 
 * 
 * 
 * 
 * 示例 2:
 * 
 * 输入: [1, 2, 3, 5]
 * 
 * 输出: false
 * 
 * 解释: 数组不能分割成两个元素和相等的子集.
 * 
 * 
 * 
 * 
 */
/*

标签：动态规划

题解：
    理解题目，等和子集，即一分为二
    两个子集和相等，也就是每个子集是和的一半 sum>>1

    这道题可以理解为 0-1 背包问题

    2021.4.8
        > 这就是一道 0-1 背包，i 表示走到第几个，j 表示总和为多少，下面的思路想复杂了
        > 参考 [liweiwei1419 动态规划（转换为 0-1 背包问题）](https://leetcode-cn.com/problems/partition-equal-subset-sum/solution/0-1-bei-bao-wen-ti-xiang-jie-zhen-dui-ben-ti-de-yo/) 
            https://pic.leetcode-cn.com/1602418903-UcdsWL-image.png
            比较好理解，而且代码更精简

以下解题步骤，以 64.最小路径和 为模板 https://github.com/NeoYo/leetcode-top-javascript/blob/master/64.%E6%9C%80%E5%B0%8F%E8%B7%AF%E5%BE%84%E5%92%8C.js

递归树：
    举例：[1, 5, 11, 5]
        i: 表示状态
        sum: 表示和

        ↙ 左下表示状态 i
        ↘ 右下表示 sum
                                    i sum
                                    f(0, 0)
                                  /选       \不选
    1                         f(1, 1)        f(1, 0)
                            /选       \       /选    \
    5                   f(2, 6)    f(2, 1)  f(2, 5)  f(2, 0)

    11                 ...

    5                  ...

    把它逆时针旋转 45°，就是状态转移表

解题关键：
    推导转移方程，那么有两个问题：
    A. 状态是什么？
        1. 跟第 i 行和第 j 列有关
        2. 结果求总和最小，那么状态就是 第 i 行和第 j 列的最小和
    B. 选择是什么？
        每次状态转移可以选择 i+1 (向下) 或 j+1 (向右)



二维DP, 最好画出转移表，再编写代码
    画转移表步骤如下:
    1. 初始化第一行和第一列
        1,4,5
        2,
        6,
    2. 根据转移方程 DP[i][j] = Math.min((DP[i-1][j] || 0), (DP[i][j-1] || 0)) + grid[i][j];
        确定每一个值
        1,4,5
        2,? = Math.min(4, 2) + 5 = 7
        6,
    3. 依此类推
        1,4,5
        2,7,6
        6,8,7


拓展：
    转移表与递归树区别与作用
        1. 转移表适合 二维DP
        2. 递归树适合 1~n 维DP
        3. 转移表适合用来编写和校验，DP代码
        4. 递归树适合用来编写 dfs 递归代码

注意点：
    边界值
    1. sum = 11 是奇数，只能偶数，比如 [1, 2, 3, 5]，要 return false
    2. 
    3. 

 */
// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
/**
 * @param {number[]} nums
 * @return {boolean}
 */
 var canPartition = function(nums) {    
    const DP = Array(nums.length).fill(null).map(_ => Array());
    const sum = (nums.reduce((acc, cur) => (acc + cur), 0));
    if (sum & 1) {  // 奇数
        return false;
    }
    const halfSum = sum >> 1;
    for (let i = 0; i < nums.length; i++) {     // i 表示走到 nums 的第几个
        DP[i][0] = true;
    }
    DP[0][nums[0]] = true;
    for (let i = 1; i < nums.length; i++) {     
        for (let j = 1; j <= halfSum; j++) {    // j 表示装了多少重量
            if (nums[i] === j) {    // 不包含前面的情形 且 只包含nums[i] 的值
                DP[i][j] = true;
            } else {  // 包含前面的情形
                DP[i][j] = DP[i-1][j] || DP[i-1][j-nums[i]]  
                        // 且不包含 nums[i]   // 且包含 nums[i]
            } 
        }
    }
    // console.log('DP: ', DP)
    // 最后一列是否存在 = halfSum
    let canPart = false;
    for (let i = 0; i < nums.length; i++) {
        if (DP[i][halfSum] === true) {
            return true;
        }
    }
    return false;
};
// @lc code=end

canPartition([1, 2, 5]);

