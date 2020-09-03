/*
 * @lc app=leetcode.cn id=78 lang=javascript
 *
 * [78] 子集
 *
 * https://leetcode-cn.com/problems/subsets/description/
 *
 * algorithms
 * Medium (77.77%)
 * Likes:    724
 * Dislikes: 0
 * Total Accepted:    124.6K
 * Total Submissions: 160.1K
 * Testcase Example:  '[1,2,3]'
 *
 * 给定一组不含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。
 * 
 * 说明：解集不能包含重复的子集。
 * 
 * 示例:
 * 
 * 输入: nums = [1,2,3]
 * 输出:
 * [
 * ⁠ [3],
 * [1],
 * [2],
 * [1,2,3],
 * [1,3],
 * [2,3],
 * [1,2],
 * []
 * ]
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    /**
        遍历 vs 回溯

        遍历：遍历所有值
        回溯算法：强调保存当前状态后，在下一层寻找过程中，失败了可以回来，拿到原来的状态
     */

    /*
    解一：深度优先遍历
        T(n) = O(n*2^n)
               x
           /        \
         1            x
       /    \       /   \
      2      x     2      x
     / \    / \   / \    /  \
    3   x  3   x  3  x   3   x

     进行二叉树的先序遍历， 会得到
     []
     [1], [1,2], [1,2,3], [1,2,x], [1,x], [1,x,3], [1,xx]
     [x], [x, 2], [x, 2, 3], [x, 2, x], [x, x], [x, x, 3], [x, x, x]

     对于这道题，可以用只取前序遍历的，根节点和左子树，后子树舍弃掉，代码如下：
    */
    const dfs = (res, leftNums, cur) => {
        // res.push(cur);
        if (leftNums.length === 0) {
            return;
        }
        res.push([...cur, leftNums[0]]);
        dfs(res, leftNums.slice(1), [...cur, leftNums[0]]);
        dfs(res, leftNums.slice(1), [...cur]);
    }
    const res = [[]];
    dfs(res, nums, [], 0);
    return res;
    /**
     * 解二：回溯法
     * 这道题，其实用回溯算法，更好理解
     * Ref: https://labuladong.gitbook.io/algo/suan-fa-si-wei-xi-lie/hui-su-suan-fa-xiang-jie-xiu-ding-ban
     */
};
// @lc code=end

