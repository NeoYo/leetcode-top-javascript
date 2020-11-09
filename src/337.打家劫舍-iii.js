/*
 * @lc app=leetcode.cn id=337 lang=javascript
 *
 * [337] 打家劫舍 III
 *
 * https://leetcode-cn.com/problems/house-robber-iii/description/
 *
 * algorithms
 * Medium (60.21%)
 * Likes:    597
 * Dislikes: 0
 * Total Accepted:    70.5K
 * Total Submissions: 116.6K
 * Testcase Example:  '[3,2,3,null,3,null,1]'
 *
 * 在上次打劫完一条街道之后和一圈房屋后，小偷又发现了一个新的可行窃的地区。这个地区只有一个入口，我们称之为“根”。
 * 除了“根”之外，每栋房子有且只有一个“父“房子与之相连。一番侦察之后，聪明的小偷意识到“这个地方的所有房屋的排列类似于一棵二叉树”。
 * 如果两个直接相连的房子在同一天晚上被打劫，房屋将自动报警。
 * 
 * 计算在不触动警报的情况下，小偷一晚能够盗取的最高金额。
 * 
 * 示例 1:
 * 
 * 输入: [3,2,3,null,3,null,1]
 * 
 * ⁠    3          -> choose
 * ⁠   / \
 * ⁠  2   3        -> notChoose
 * ⁠   \   \ 
 * ⁠    3   1      -> choose
 * 
 * 输出: 7 
 * 解释: 小偷一晚能够盗取的最高金额 = 3 + 3 + 1 = 7.
 * 
 * 示例 2:
 * 
 * 输入: [3,4,5,1,3,null,1]
 * 
 *     3           -> notChoose
 * ⁠   / \
 * ⁠  4   5         -> choose
 * ⁠ / \   \ 
 * ⁠1   3   1       -> notChoose
 * 
 * 输出: 9
 * 解释: 小偷一晚能够盗取的最高金额 = 4 + 5 = 9.
 * 
 * 
 */
/**
    模板
        树问题的突破点关键在于:
            A. 选先序还是后序
            B. 目标值与传递值
            C. 值的转移与处理 （递归过程中对传递值的处理，递归过程是在每个节点间的转移）
        
    题解
        根据题意，打家劫舍要求的是最高金额，这是目标值，传递值也可猜测是金额的和（B）
        在节点转移过程中（递归过程）
            选了当前节点，那么当前节点的最高金额 = 当前节点金额 + 孙子节点金额
                刚好是上面示例 1:
                 ⁠    3          -> choose
                 ⁠   / \
                 ⁠  2   3        -> notChoose
                 ⁠   \   \ 
                 ⁠    3   1      -> choose

            不选了当前节点，那么当前节点的最高金额 = 当前节点的子节点金额和
                刚好是上面示例 2:
                      3           -> notChoose
                  ⁠   / \
                  ⁠  4   5         -> choose
                  ⁠ / \   \ 
                  ⁠1   3   1       -> notChoose
            假设知道，所有子节点的情况，孙子节点的情况，那么就可以知道当前节点的选与不选
            
            那么如何知道子节点和孙子节点的情况呢，把它们分别当成 “当前节点” 去处理，就是一个递归的过程

            上面的分析过程，已经涉及到了 目标值与传递值是什么（B），和对传递值的处理（C）
            要先知道孙子节点和子节点的情况，再对当前节点做选择，使用后序遍历（A）

    解一：递归
        var rob = function(root) {
            if (root == null) { return 0; }
            const choose = root.val + 
                (root.left && rob(root.left.left) || 0) +
                (root.left && rob(root.left.right) || 0) +
                (root.right && rob(root.right.left) || 0) +
                (root.right && rob(root.right.right) || 0);
            const notChoose = rob(root.left) + rob(root.right);
            return Math.max(choose, notChoose);
        };
    解二：递归+备忘录
        由于存在重复子问题，重复的计算，可以使用备忘录进行优化
        状态：每一个节点+选与不选
        const memory = new Map(); // <treeNode, [notChoose, choose]>
                                                 索引0不选    索引1选
        代码如下
    解三：动态规划
        这道题特别的地方在于，它是树形的DP，是以前我没见过的

        DP关键点
            A. 状态定义，在上面备忘录中已经体现
            B. 状态转移方程，需要分析状态树得出

        状态树
                   3[4+5,3+1+3+1] 
             ⁠   /          \
             ⁠  4[1+3, 4]    5[1, 5]
             ⁠ /  \           \ 
             ⁠1    3            1
           [0,1][0,3]           [0,1]

            Result: Math.max(4+5, 8) = Math.max(9, 8) = 9
        参考 iweiwei1419 的 Java 版 https://leetcode-cn.com/problems/house-robber-iii/solution/shu-xing-dp-ru-men-wen-ti-by-liweiwei1419/

    注意点
        1. const memory = {} 会导致，每个 node 作为 key 都相同，因为 memory[node] = memory[node.toString()] = memory[[Object object]]
            解决方法：使用 new Map(); 
            参考：https://www.hacksparrow.com/javascript/object-as-objects-key.html#:~:text=The%20short%20answer%20is%20%22no,stringified%20to%20%5Bobject%20Object%5D%20.
        2. 判断空 root.left && dfs(root.left.left) || 0， 最后面要加 || 0

    参考资料
        通用思路团灭打家劫舍问题 https://leetcode-cn.com/problems/house-robber-iii/solution/tong-yong-si-lu-tuan-mie-da-jia-jie-she-wen-ti-b-2/
        
 */
// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
var rob = function(root) {
    const memory = new Map(); // <treeNode, [notChoose, choose]>
    const dfs = (root, memory) => {
        if (root == null) { return 0; }
        let [ notChoose, choose ] = memory.get(root) || [];
        if (choose == null) {
            choose = root.val + 
                (root.left && dfs(root.left.left) || 0) +
                (root.left && dfs(root.left.right) || 0) +
                (root.right && dfs(root.right.left) || 0) +
                (root.right && dfs(root.right.right) || 0);
        }
        if (notChoose == null) {
            notChoose = dfs(root.left) + dfs(root.right);
        }
        memory.set(root, [ notChoose, choose ]);
        return Math.max(choose, notChoose);
    }
    return dfs(root, memory);
};
// @lc code=end

