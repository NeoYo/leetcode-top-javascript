/*
 * @lc app=leetcode.cn id=338 lang=javascript
 *
 * [338] 比特位计数
 *
 * https://leetcode-cn.com/problems/counting-bits/description/
 *
 * algorithms
 * Medium (75.68%)
 * Likes:    423
 * Dislikes: 0
 * Total Accepted:    56.6K
 * Total Submissions: 74.7K
 * Testcase Example:  '2'
 *
 * 给定一个非负整数 num。对于 0 ≤ i ≤ num 范围中的每个数字 i ，计算其二进制数中的 1 的数目并将它们作为数组返回。
 * 
 * 示例 1:
 * 
 * 输入: 2
 * 输出: [0,1,1]
 * 
 * 示例 2:
 * 
 * 输入: 5
 * 输出: [0,1,1,2,1,2]
 * 
 * 进阶:
 * 
 * 
 * 给出时间复杂度为O(n*sizeof(integer))的解答非常容易。但你可以在线性时间O(n)内用一趟扫描做到吗？
 * 要求算法的空间复杂度为O(n)。
 * 你能进一步完善解法吗？要求在C++或任何其他语言中不使用任何内置函数（如 C++ 中的 __builtin_popcount）来执行此操作。
 * 
 * 标签: 位运算 动态规划
 */
/*
    题解: 
        解零. 暴力法
            本题是 191. 位 1 的个数（汉明重量）升级版，https://github.com/NeoYo/leetcode-top-javascript/blob/master/191.%E4%BD%8D-1-%E7%9A%84%E4%B8%AA%E6%95%B0.js

            遍历 [0~num] 的每一个数字 (O(n))，再对每个数字进行汉明重量的计算 (O(num))
            T(n) = O(n*num) = O(n*n)

        解. 递归+备忘录/动态规划
            0 = 0b000
            1 = 0b001
            2 = 0b010
            3 = 0b011
            4 = 0b100
            5 = 0b101 
            6 = 0b110

            观察可知有以下两个规律（不看题解，我是观察不出来滴^_^）
            规律一：当前数如果是奇数，等于上一个数 1 的个数 + 1
                成立原因：当前奇数，说明上一个数一定是偶数，而且最后一位是 0
                        上一个数最后一位 0 变成 1，就得到当前奇数
            规律二：当前数如果是偶数 2*n，等于 n 的 1 的个数
                成立原因：
                    二进制有个性质：左移一位，二进制上的每一位向左移一位，最后一位补 0，没有 1 的变化
                    左移一位，也相当于乘以2，所以有当前偶数 1 的个数等于它的一半的 1 的个数

            求当前值，已知前面的值，可以使用递归，备忘录优化复杂度
            可以使用动态规划，递推公式如下
            if (i % 2 === 0) { // 偶数
                DP[i] = DP[i/2];
            } else { // 奇数
                DP[i] = DP[i-1] + 1;
            }
            递归到动态规划的过渡，可以参考 221. 最大正方形 https://github.com/NeoYo/leetcode-top-javascript/blob/master/221.%E6%9C%80%E5%A4%A7%E6%AD%A3%E6%96%B9%E5%BD%A2.js

    参考资料:
        精选题解 清晰的思路 https://leetcode-cn.com/problems/counting-bits/solution/hen-qing-xi-de-si-lu-by-duadua/
 */

// @lc code=start
/**
 * @param {number} num
 * @return {number[]}
 */
var countBits = function(num) {
    // 0. 异常处理
    if (num === 0) { return [0]; }
    // 1. 初始化 DP
    const DP = Array(num+1).fill(0);
    // 2. 初始化 DP 边界值
    DP[1] = 1;
    // 3. 递推公式 循环迭代
    for (let i = 2; i <= num; i++) {
        if (i % 2 === 0) { // 偶数
            DP[i] = DP[i/2];
        } else { // 奇数
            DP[i] = DP[i-1] + 1;
        }
    }
    return DP;
};
// @lc code=end

