/*
 * @lc app=leetcode.cn id=172 lang=javascript
 *
 * [172] 阶乘后的零
 *
 * https://leetcode-cn.com/problems/factorial-trailing-zeroes/description/
 *
 * algorithms
 * Easy (39.99%)
 * Likes:    308
 * Dislikes: 0
 * Total Accepted:    40.7K
 * Total Submissions: 101.8K
 * Testcase Example:  '3'
 *
 * 给定一个整数 n，返回 n! 结果尾数中零的数量。
 * 
 * 示例 1:
 * 
 * 输入: 3
 * 输出: 0
 * 解释: 3! = 6, 尾数中没有零。
 * 
 * 示例 2:
 * 
 * 输入: 5
 * 输出: 1
 * 解释: 5! = 120, 尾数中有 1 个零.
 * 
 * 说明: 你算法的时间复杂度应为 O(log n) 。
 * 
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var trailingZeroes = function(n) {
    // 参考：https://leetcode-cn.com/problems/factorial-trailing-zeroes/solution/xiang-xi-tong-su-de-si-lu-fen-xi-by-windliang-3/
    /*
        // 思路：先算 n! 的值，再用 %10， /10 去累加 count
        // 越界
        let res = 1;
        for (let i = 0; i < n; i++) {
            res *= (n - i);
        }
        let count = 0;
        while (res % 10 === 0) {
            count++;
            res = Math.floor(res / 10);
        }
        return count;
    */

    /**
        // 思路：由于 2 ... 4...  6... 8... 10...
        //                    5           10
        // 10 = 5 * 2，5 的个数肯定少于 2，所以对 5 取余和整除
        // 超出时间限制
        // Testcase: 2147483647
        let count = 0;
        for (let i = 1; i <= n; i++) {
            let N = i;
            while (N > 0) {
                if (N % 5 == 0) {
                    count++;
                    N /= 5;
                } else {
                    break;
                }
            }
        }
        return count;
    */
    /*
        思路：
        紧接着上面的规律，还有下面的
        每隔 5 个数，出现一个 5，每隔 25 个数，出现 2 个 5，每隔 125 个数，出现 3 个 5...
        5 的个数就是 n / 5 + n / 25 + n / 125 ...
     */
    let res = 0;
    while (n > 0) {
        n = Math.floor(n / 5);
        res += n;
    }
    return res;
};
// @lc code=end

