/*
 * @lc app=leetcode.cn id=454 lang=javascript
 *
 * [454] 四数相加 II
 *
 * https://leetcode-cn.com/problems/4sum-ii/description/
 *
 * algorithms
 * Medium (55.55%)
 * Likes:    186
 * Dislikes: 0
 * Total Accepted:    25.7K
 * Total Submissions: 46.2K
 * Testcase Example:  '[1,2]\n[-2,-1]\n[-1,2]\n[0,2]'
 *
 * 给定四个包含整数的数组列表 A , B , C , D ,计算有多少个元组 (i, j, k, l) ，使得 A[i] + B[j] + C[k] +
 * D[l] = 0。
 * 
 * 为了使问题简单化，所有的 A, B, C, D 具有相同的长度 N，且 0 ≤ N ≤ 500 。所有整数的范围在 -2^28 到 2^28 - 1
 * 之间，最终结果不会超过 2^31 - 1 。
 * 
 * 例如:
 * 
 * 
 * 输入:
 * A = [ 1, 2]
 * B = [-2,-1]
 * C = [-1, 2]
 * D = [ 0, 2]
 * 
 * 输出:
 * 2
 * 
 * 解释:
 * 两个元组如下:
 * 1. (0, 0, 0, 1) -> A[0] + B[0] + C[0] + D[1] = 1 + (-2) + (-1) + 2 = 0
 * 2. (1, 1, 0, 0) -> A[1] + B[1] + C[0] + D[0] = 2 + (-1) + (-1) + 0 = 0
 * 
 * 
 */

// @lc code=start
/**
 * @param {number[]} A
 * @param {number[]} B
 * @param {number[]} C
 * @param {number[]} D
 * @return {number}
 */
var fourSumCount = function(A, B, C, D) {
    /**
        题解：
        1. 暴力法 T(N) = O(N^4)
            思路：遍历每一个元素 A[x] + B[y] + C[z] + D[t]
                               N  *  N   *  N    *  N
            代码：
                const N = A.length;
                let count = 0;
                for (let x = 0; x < N; x++) {
                    for (let y = 0; y < N; y++) {
                        for (let z = 0; z < N; z++) {
                            for (let t = 0; t < N; t++) {
                                if (A[x] + B[y] + C[z] + D[t] === 0) {
                                    count++;
                                }
                            }
                        }
                    }
                }
                return count;
            运行结果：
                出现超时

        2. Map
            思路： 
                1) 建Map
                    A: [1, 2]
                    AMap = { -1: true, -2: true }
                2) 遍历 B、C、D
            时间复杂度：
                T(n) = O(n) + O(n^3) = O(n^3)

        3. Map 优化
            思路：
                1）建 ABMap
                    A = [ 1, 2] B = [-2, -1]
                    ABMap = {
                        1: true,    // -(1-2)
                        -1: true,   // -(1-1)
                        0: true,    // -(2-2)
                        -1: true,   // -(2-1)
                    }
                    C = [-1, 2] D = [0, 2]
                2）遍历 C、D 过程中，比对 ABMap
            时间复杂度：
                T(n) = O(n^2) + O(n^2) = O(n^2)
            代码如下：
    */
    let ABMap = {};
    const N = A.length;
    for (let x = 0; x < N; x++) {
        for (let y = 0; y < N; y++) {
            if (!ABMap[-(A[x] + B[y])]) {
                // 0 || null
                ABMap[-(A[x] + B[y])] = 1;
            } else {
                ABMap[-(A[x] + B[y])]++;
            }
        }
    }
    let count = 0;
    for (let z = 0; z < N; z++) {
        for (let t = 0; t < N; t++) {
            if (ABMap[(C[z] + D[t])] > 0) {
                // null > 0 => false
                count += ABMap[(C[z] + D[t])];
            }
        }
    }
    return count;
};
// @lc code=end

// fourSumCount(
//     [-1,-1],
//     [-1,1],
//     [-1,1],
//     [1,-1],
// )

