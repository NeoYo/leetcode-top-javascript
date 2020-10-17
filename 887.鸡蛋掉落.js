/*
 * @lc app=leetcode.cn id=887 lang=javascript
 *
 * [887] 鸡蛋掉落
 *
 * https://leetcode-cn.com/problems/super-egg-drop/description/
 *
 * algorithms
 * Hard (28.67%)
 * Likes:    497
 * Dislikes: 0
 * Total Accepted:    32.1K
 * Total Submissions: 111.9K
 * Testcase Example:  '1\n2'
 *
 * 你将获得 K 个鸡蛋，并可以使用一栋从 1 到 N  共有 N 层楼的建筑。
 * 
 * 每个蛋的功能都是一样的，如果一个蛋碎了，你就不能再把它掉下去。
 * 
 * 你知道存在楼层 F ，满足 0 <= F <= N 任何从高于 F 的楼层落下的鸡蛋都会碎，从 F 楼层或比它低的楼层落下的鸡蛋都不会破。
 * 
 * 每次移动，你可以取一个鸡蛋（如果你有完整的鸡蛋）并把它从任一楼层 X 扔下（满足 1 <= X <= N）。
 * 
 * 你的目标是确切地知道 F 的值是多少。
 * 
 * 无论 F 的初始值如何，你确定 F 的值的最小移动次数是多少？
 * 
 * 
 * 
 * 
 * 
 * 
 * 示例 1：
 * 
 * 输入：K = 1, N = 2
 * 输出：2
 * 解释：
 * 鸡蛋从 1 楼掉落。如果它碎了，我们肯定知道 F = 0 。
 * 否则，鸡蛋从 2 楼掉落。如果它碎了，我们肯定知道 F = 1 。
 * 如果它没碎，那么我们肯定知道 F = 2 。
 * 因此，在最坏的情况下我们需要移动 2 次以确定 F 是多少。
 * 
 * 
 * 示例 2：
 * 
 * 输入：K = 2, N = 6
 * 输出：3
 * 
 * 
 * 示例 3：
 * 
 * 输入：K = 3, N = 14
 * 输出：4
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= K <= 100
 * 1 <= N <= 10000
 * 
 * 
 */
/**
    题解:

    参考资料: 
        liweiwei1419 动态规划 https://leetcode-cn.com/problems/super-egg-drop/solution/dong-tai-gui-hua-zhi-jie-shi-guan-fang-ti-jie-fang/
        这篇文章讲了、递归 -> 递归+备忘录 -> 动态规划 -> 动态规划+二分查找，讲得很好！

    动态规划（递归）初始值
        1. eggs K=0 或 floors N=0, 结果为0，因为没有鸡蛋可以扔，或者有鸡蛋没有楼层扔，只能等于 0
        2. floors N=1, eggs K >= 1, 结果为 1，因为只能扔一次，只能在floor 1 楼扔 1 <= X <= N = 1
        3. eggs K=1, floors N >= 1, 结果为 N，因为只能从下往上，因为只有一个蛋

    递归公式（递推公式）
        前后两个蛋之间存在某种必然的联系~
        此时此刻手上的蛋在第几层扔，会对 F 产生的影响
                    eggs floors
        superEggDrop(K,    N)
        
        K, N 的条件下，在 X 层扔，会出现的情形
            1. 鸡蛋不碎: superEggDrop(K, N-X)    // X 层和以下的不需要验证了，N-X 范围是 (X, N]
            2. 鸡蛋碎了: superEggDrop(K-1, X-1)  // X 层以下的楼层，X 已经扔过，所以是 [0, X-1]

        以 superEggDrop(2,  6) 为例
                            (2,   5)           有2个蛋，需要筛选 5层
              /    /           |          \          \
            /     /            |            \          \
          /      /             |              \          \
    (2,4)(1,0) (2,3)(1,1) (2,2)(1,2)    (2,1)(1,3)    (2,0)(1,4)
     |    |  
一楼没碎 一楼碎了 ....
    
        不受控制的碎与不碎
            真实情况，可能碎，也可能不碎，不受我们控制，但是真实情况只可能两种中的一种
            取两种中的最大值，可以保证计算得到的步数，一定能得到楼层 F
            Math.max(superEggDrop(K-1, X-1), superEggDrop(K, N-X))

        可以做的选择，在哪一个楼层(X)扔
            superEggDrop(K-1, X-1), superEggDrop(K, N-X) 中 X 范围是 [0, N]，相当于有 2N个子树
            虽然不知道它们等于多少，但是可以当它们是一个个已知的整体，交给 递归 去解决~~~

            接下来，选择那个需要的步数最少的，可以得到最优解，可以得到递归公式

        递归公式
            for (let i = 1; X <= N; X++) {
                superEggDrop(K, N) = Math.min(superEggDrop(K, N), Math.max(superEggDrop(K-1, X-1), superEggDrop(K, N-X)))
            }

        函数 y = DP[k-1][x-1] x ∈ [1, n]
        趋势 DP[k-1][x-1] 中 k-1 个鸡蛋下，x-1 楼层增加， DP[k-1][x-1] 只会递增或保持不变 (楼层增加了，需要辨别的更多，可能保持不变或递增)
                         
        函数 y = DP[k][n-X] x ∈ [1, n]
        趋势 DP[k][n-X] 中 k 个鸡蛋下，X 增加，n-X 表示楼层不断减少， DP[k-1][x-1] 只会递减或保持不变

            y = DP[k][n-X]          y = DP[k-1][x-1]
                    \                  /
                      \               /
                        \            /
                          \         /
                            \  —— —— 
                             /\         —— —— —— —— —— 这个点就是所求
                            /  \
                      —— ——     \ 
                     /           —— ——
                    /                  \
        
        升级了我对二分查找的认知

        以前整理了使用二分查找3个条件：索引、有序、静态            
        这次发现“有序”，不一定是从小到大或从大到小，每个索引上的值，都能判断当前索引偏左了，或者偏右了，或者刚好命中，也可以使用二分查找

        let nextStep = Infinity;
        for (let X = 1; X <= n; X++) {
            nextStep = Math.min(nextStep, Math.max(DP[k-1][X-1], DP[k][n-X]) + 1)
        }

        let l = 0,
            r = nums.length - 1;
        while (l < r) {
            const mid = l + ((r - l)>>1);
            if (nums[mid] > nums[mid + 1]) {
                r = mid;
            } else {
                l = mid + 1;
            }
        }
        return l;
                
 */
/**
 * 解一：递归
 *      超时
 * @param {number} K eggs
 * @param {number} N floors
 * @return {number}
 */
var superEggDrop = function(K, N) {
    if (K === 0 || N === 0) { return 0; }
    if (K === 1) { return N; }
    if (N === 1) { return 1; }
    let nextStep = Infinity;
    for (let X = 1; X <= N; X++) {
        nextStep = Math.min(nextStep, Math.max(superEggDrop(K-1, X-1), superEggDrop(K, N-X)) + 1)
    }
    return nextStep;
};
// @lc code=start
/**
 * 解二：动态规划
 *      Time Limit Exceeded 94/121 cases passed (N/A)
 *      Testcase 10 10000
 * 重要：画出状态转移表！
 * @param {number} K eggs
 * @param {number} N floors
 * @return {number}
 */
var superEggDrop = function(K, N) {
    // 0. 初始化dp容器
    const DP = Array(K+1).fill(null).map(_ => Array(N+1).fill(Infinity));
    // 1. 初始化边界值
    DP[0][0] = 0;
    for (let k = 1; k <= K; k++) {
        DP[k][0] = 0;
        DP[k][1] = 1;  // N = 1
    }
    for (let n = 1; n <= N; n++) {
        DP[0][n] = 0;
        DP[1][n] = n;  // K = 1
    }
    // 2. 状态转移
    for (let k = 2; k <= K; k++) { 
        for (let n = 2; n <= N; n++) {
            let nextStep = Infinity;
            for (let X = 1; X <= n; X++) {
                nextStep = Math.min(nextStep, Math.max(DP[k-1][X-1], DP[k][n-X]) + 1)
            }
            DP[k][n] = nextStep;
        }
    }
    // console.log('DP: ', DP);
    return DP[K][N];
};
/**
 * 解三：在DP的基础上，二分查找的灵活应用
 * @param {number} K eggs
 * @param {number} N floors
 * @return {number}
 */
var superEggDrop = function(K, N) {
    // 0. 初始化dp容器
    const DP = Array(K+1).fill(null).map(_ => Array(N+1).fill(Infinity));
    // 1. 初始化边界值
    DP[0][0] = 0;
    for (let k = 1; k <= K; k++) {
        DP[k][0] = 0;
        DP[k][1] = 1;  // N = 1
    }
    for (let n = 1; n <= N; n++) {
        DP[0][n] = 0;
        DP[1][n] = n;  // K = 1
    }
    // 2. 状态转移
    for (let k = 2; k <= K; k++) { 
        for (let n = 2; n <= N; n++) {
            // let nextStep = Infinity;
            // for (let X = 1; X <= n; X++) {
            //     nextStep = Math.min(nextStep, Math.max(DP[k-1][X-1], DP[k][n-X]) + 1)
            // }
            // 改写为二分查找
            const eggBreak = (x) => (DP[k-1][x-1]); // /
            const notBreak = (x) => (DP[k][n-x]);   // \
            let l = 1,
                r = n;
            while (l < r) {
                const mid = l + ((r - l)>>1);
                if (eggBreak(mid) === notBreak(mid)) {
                    l = mid;
                    break;
                }
                if (eggBreak(mid) > notBreak(mid)) {
                    r = mid - 1;
                } else {
                    l = mid + 1;
                }
            }
            // return l;
            DP[k][n] = Math.max(notBreak(l), eggBreak(l)) + 1;
        }
    }
    // console.log('DP: ', DP);
    return DP[K][N];
};
// @lc code=end
// superEggDrop(2, 6) // Use for vscode debug
superEggDrop(2, 7) // Use for vscode debug

