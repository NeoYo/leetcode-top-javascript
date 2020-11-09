/*
 * @lc app=leetcode.cn id=221 lang=javascript
 *
 * [221] 最大正方形
 *
 * https://leetcode-cn.com/problems/maximal-square/description/
 *
 * algorithms
 * Medium (42.82%)
 * Likes:    573
 * Dislikes: 0
 * Total Accepted:    74.3K
 * Total Submissions: 173.1K
 * Testcase Example:  '[["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]'
 *
 * 在一个由 0 和 1 组成的二维矩阵内，找到只包含 1 的最大正方形，并返回其面积。
 * 
 * 示例:
 * 
 * 输入: 
 * 
 * 1 0 1 0 0
 * 1 0 1 1 1
 * 1 1 1 1 1
 * 1 0 0 1 0
 * 
 * 输出: 4
 * 
 */
/**
    
    题解
        0. 暴力法
            从前往后的思路：从左往右，从上到下，遍历每一个点 T(n) = O(nm)
            以每一个点作为正方形的左上角顶点，同时向外多一圈，即向右和向下多一行，边长+1 T(n) = O(min(n, m)^2)
            T(n) = O(nm*min(n,m)^2)
            S(n) = O(1)
        1. 递归法
            从后往前，选取最后一个点，把前面未知的情况，当做已知的一个整体的思路
            想要求的是包含最后一个点，能获得的最大边长长度
            1.1 先看最简单的情况
                假设矩阵最后一个点是 (1,1)，总共有4个点，如下所示
                    1 0
                    1 1
                可以明显得出最后一个点 (1, 1) 的值是 1，是由最小值 0 决定的，0 就像一面墙

            1.2 再看稍微复杂点的情况
                    1 1 1
                    1 1 1
                    0 1 1
                想要求最后一个点的值，每个点表示从左上到当前位置，能包含的最大正方形长度，可得到下面的矩阵
                    1 1 1
                    1 2 2
                    0 1 ？
                ？号的左边、上边、左上边的每个值，另一层含义是多远会遇到 0
                    上边的 2，表示距离上边 2 一定有 0
                       （有0）
                        1 1 1
                            2
                            ?
                    左边的 1，表示距离左边 1 一定有 0
                        0 1 ？
                    左上的 2，也有相似的含义
            1.3 递归公式
                拓展到一般情况，假设 左上、左边、上边 的最大边长长度都是已知的
                假设 f(i, j)，表示从最左上角，到 (i, j) 点的最大正方形边长，它跟左上、左边、上边有以下关系
                    if (f(i, j) === '1') {
                        f(i, j) = Math.min(f(i-1, j), f(i, j-1), f(i-1, j-1)) + 1
                    } else {
                        f(i, j) = 0
                    }
                    
        2. 动态规划
            从上面的递归公式，可以看出，递归是从终点往起点思考的，可以用备忘录提高效率
            由于具备相同的子问题，这里使用动态规划，从原点到终点去推（就像一叠扑克牌，一张压一张，从前往后和从后往前都可以推倒全部）
            递推公式：（只是改下递归公式就可以得到）
                    if (DP(i, j) === '1') {
                        DP(i, j) = Math.min(DP(i-1, j), DP(i, j-1), DP(i-1, j-1)) + 1;
                    } else {
                        DP(i, j) = 0;
                    }

            完整代码：
                如下面所示，标识了重要步骤
    
    参考资料
        Leetcode 官方题解 https://leetcode-cn.com/problems/maximal-square/solution/zui-da-zheng-fang-xing-by-leetcode-solution/
        精选题解 理解三者取最小+1 https://leetcode-cn.com/problems/maximal-square/solution/li-jie-san-zhe-qu-zui-xiao-1-by-lzhlyle/
 
    注意点
        1. matrix存储的值是字符， '0' 和 '1'，需要转化为数字 0 和 1，可以使用 Number(matrix[i][j]) 作转换
        2. 关于 Array.protoype.fill
            // const DP = Array(ROW_CNT).fill(Array(COL_CNT).fill(0)); // 不能这样初始化！Array(COL_CNT) 只会执行一次！
 */
// @lc code=start
/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare = function(matrix) {
    const ROW_CNT = matrix.length;
    if (ROW_CNT === 0) {
        return 0;
    }
    const COL_CNT = matrix[0].length;
    // 0. 初始化DP
    const DP = Array(ROW_CNT).fill(null).map(_ => Array(COL_CNT).fill(0));    
    // 1. 初始化边界值
    for (let i = 0; i < ROW_CNT; i++) {
        DP[i][0] = Number(matrix[i][0]);
    }
    for (let j = 0; j < COL_CNT; j++) {
        DP[0][j] = Number(matrix[0][j]);
    }
    // 2. 状态转移
    for (let i = 1; i < ROW_CNT; i++) {
        for (let j = 1; j < COL_CNT; j++) {
            if (matrix[i][j] === '0') {
                DP[i][j] = 0;
            } else {
                DP[i][j] = Math.min(DP[i-1][j], DP[i][j-1], DP[i-1][j-1]) + 1;
            }
        }
    }
    // console.log('DP: ', DP);
    // 3. 计算最大的边长
    let maxSide = 0;
    for (let i = 0; i < ROW_CNT; i++) {
        for (let j = 0; j < COL_CNT; j++) {
            maxSide = Math.max(maxSide, DP[i][j]);
        }
    }
    return maxSide * maxSide;
};
// @lc code=end
