/*
 * @lc app=leetcode.cn id=204 lang=javascript
 *
 * [204] 计数质数
 *
 * https://leetcode-cn.com/problems/count-primes/description/
 *
 * algorithms
 * Easy (34.14%)
 * Likes:    393
 * Dislikes: 0
 * Total Accepted:    67.2K
 * Total Submissions: 195.1K
 * Testcase Example:  '10'
 *
 * 统计所有小于非负整数 n 的质数的数量。
 * 
 * 示例:
 * 
 * 输入: 10
 * 输出: 4
 * 解释: 小于 10 的质数一共有 4 个, 它们是 2, 3, 5, 7 。
 * 
 * 
 */

/**
 素数: 如果一个数如果只能被 1 和它本身整除，那么这个数就是素数。 1和0既非素数也非合数。2、3、5、7、11、13、17、19
 Ref: https://leetcode-cn.com/problems/count-primes/solution/ru-he-gao-xiao-pan-ding-shai-xuan-su-shu-by-labula/
 文章优化思路: 
 1. 暴力法，对每个数都判断能否整除 T(n) = O(n^2)
 2. 试除法 T(n) = O(n*sqrt(n))
    斐波那契 https://zh.wikipedia.org/wiki/%E8%AF%95%E9%99%A4%E6%B3%95
    判断质数可减少一半计算, [2, sqrt(n)] （因子的对称性）
    boolean isPrime(int n) {
        for (int i = 2; i * i <= n; i++)
            //...
        }
    }
 3. 埃氏筛法（排除法）
    https://zh.wikipedia.org/wiki/%E5%9F%83%E6%8B%89%E6%89%98%E6%96%AF%E7%89%B9%E5%B0%BC%E7%AD%9B%E6%B3%95
    var countPrimes = function(n) {
        let count = 0;
        let signs = Array(n);
        for (let i = 2; i <= Math.sqrt(n); i++) {
            if (!signs[i - 1]) {
                count++;

                for (let j = i * i; j <= n; j += i) {
                    signs[j - 1] = true;
                }
            }
        }
        return count;
    };
*/
// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var countPrimes = function(n) {
    if (n <= 2) { return 0; }
    const signs = Array(n).fill(false); // true 合数，undefined 质数, 0和1都不是    
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (signs[i] == false) {
           for (let j = i * i; j <= n; j += i) {
               signs[j] = true;
           }
       }
    }
    debugger;
    return signs.filter(sign => { return sign == false }).length - 2;
};
/**
 * 注意点：
 * 1. 计算的是小于n的质数，用 Array(n) 表示范围 [0, n-1]
 * 2. 由于 Array.prototype.fill 会自动过滤 null 的值，需要 Array(n).fill(false)
 * 3. 注意边界值 [0, 2]， 的结果是 0
 */
/**
 * 优化点：
 * 1. 外层遍历范围是 Math.sqrt(n)，是根据相乘因子的对称性
 * 2. 内层遍历范围从  j = i * i，因为 < i 的已经被 < i 的计算过了
 */
// @lc code=end
// console.assert(countPrimes(3), 1);
