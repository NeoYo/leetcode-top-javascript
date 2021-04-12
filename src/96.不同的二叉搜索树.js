/*
 * @lc app=leetcode.cn id=96 lang=javascript
 *
 * [96] 不同的二叉搜索树
 *
 * https://leetcode-cn.com/problems/unique-binary-search-trees/description/
 *
 * algorithms
 * Medium (69.13%)
 * Likes:    836
 * Dislikes: 0
 * Total Accepted:    87.3K
 * Total Submissions: 126.3K
 * Testcase Example:  '3'
 *
 * 给定一个整数 n，求以 1 ... n 为节点组成的二叉搜索树有多少种？
 * 
 * 示例:
 * 
 * 输入: 3
 * 输出: 5
 * 解释:
 * 给定 n = 3, 一共有 5 种不同结构的二叉搜索树:
 * 
 * ⁠  1         3     3      2      1
 * ⁠   \       /     /      / \      \
 * ⁠    3     2     1      1   3      2
 * ⁠   /     /       \                 \
 * ⁠  2     1         2                 3
 * 
 */

/**
    题解：
        根据题目意义，及二叉搜索树的性质，可分析出以下信息
        设 f(i, n) 表示以 i 为根节点，有 n 个节点的二叉搜索树的种类数
        设 G(n) 表示 整数 n，以 1 ... n 为节点组成的二叉搜索树的种类数
        它们存在如下关系：
            f(i, n) = G(i-1) * G(n-i)

        那么这个式子怎么得来的?
            下面以 n = 6 为例，当求 f(4, 6) 时，求 
                      i=4
                      f(4, 6)        1, 2, 3, 4, 5, 6
                     /        \
                    /          \
                [0, 1, 2, 3]   [5, 6]

            左边 [0, 1, 2, 3] 相当于求 G(4)，以 1 ... 4 为节点组成的二叉搜索树的种类数
            右边 [5, 6]，以 5，6 为节点组成的二叉搜索树的种类数，会等价于 以 0, 1, 2 为节点组成的二叉搜索树的种类数
                因为对于二叉搜索树的种类树来说，连续的 5，6 和 连续的 1，2 是相同的，图示如下
                   5           6       1         2
                    \         /         \       /     
                     6       5           2     1
                空的位置，相当于 G(0) = 1

            所以 f(4, 6) = G(4-1) * G(6-4)

    解零：递归法
        递归法的核心，是把未知的一部分（左子树、右子树），看成一个整体
        以 n = 6为例，G(6) 是由 以 1 为根节点，以 2 为根节点 ... 以 6 为根节点每种情况的种类数相加
        而每一种情况，是未知的，把它们看成一个整体，就可以得到
            G(6) = 0;
            for (let i = 1; i <=n; i++) {
                G(6) += f(i, 6);
            }
        而 f(i, 6) = G(i-1) * G(6-i)

        从特例到通用，核心代码如下
            G(n) = 0;
            for (let i = 1; i <=n; i++) {
                G(n) += G(i-1) * G(n-i);
            }

        完整代码：
            var numTrees = function(n) {
                if (n == 0 || n == 1) {
                    return 1;
                }
                let num = 0;
                for (let i = 1; i <= n; i++) {
                    num += numTrees(i - 1) * numTrees(n - i);
                }
                return num;
            };

        T(n) = O(n^n)

    解一：动态规划
        递归是自上而下的，含有大量重复计算 比如 [5, 6] 和 [1, 2]，都是 G(2)，只需计算一次就够了，备忘录的方式也可以
        根据上面的递归关系，可以得到递推公式，只是把 G 换成 DP，从下往上计算
        核心代码如下：
            const DP[n] = 0;
            for (let i = 1; i <=n; i++) {
                DP(n) += DP(i-1) * DP(n-i);
            }
        完整代码在最下面

    // 解二：卡塔兰数？
    //     百度百科：https://baike.baidu.com/item/catalan/7605685?fr=aladdin
    //     卡塔兰数，还没理解 ==

    注意点：
        为什么 G(0) = 1？是因为两个集合 A 和 B， A 是空的集合，没得选，也是一种选择
            比如 n = 1，求 numTrees(1)
                 1
              /    \
             G(0) G(0)
                1 = G(0) * G(0) = 1 * 1
            

            比如 n = 2，求 numTrees(2)
                2
             /    \
            G(0)   G(1)
            f(2) = G(0) * G(1)
            
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function(n) {
    const G = new Array(n + 1).fill(0);
    G[0] = 1;
    G[1] = 1;

    for (let i = 2; i <= n; ++i) {
        for (let j = 1; j <= i; ++j) {
            G[i] += G[j - 1] * G[i - j];
        }
    }
    return G[n];
};
// @lc code=end

