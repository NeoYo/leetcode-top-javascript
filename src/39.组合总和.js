/*
 * @lc app=leetcode.cn id=39 lang=javascript
 *
 * [39] 组合总和
 *
 * https://leetcode-cn.com/problems/combination-sum/description/
 *
 * algorithms
 * Medium (69.70%)
 * Likes:    1002
 * Dislikes: 0
 * Total Accepted:    172.6K
 * Total Submissions: 241.4K
 * Testcase Example:  '[2,3,6,7]\n7'
 *
 * 给定一个无重复元素的数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
 * 
 * candidates 中的数字可以无限制重复被选取。
 * 
 * 说明：
 * 
 * 
 * 所有数字（包括 target）都是正整数。
 * 解集不能包含重复的组合。 
 * 
 * 
 * 示例 1：
 * 
 * 输入：candidates = [2,3,6,7], target = 7,
 * 所求解集为：
 * [
 * ⁠ [7],
 * ⁠ [2,2,3]
 * ]
 * 
 * 
 * 示例 2：
 * 
 * 输入：candidates = [2,3,5], target = 8,
 * 所求解集为：
 * [
 * [2,2,2,2],
 * [2,3,3],
 * [3,5]
 * ]
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= candidates.length <= 30
 * 1 <= candidates[i] <= 200
 * candidate 中的每个元素都是独一无二的。
 * 1 <= target <= 500
 * 
 * 标签: 数组 回溯算法
 */

// @lc code=start
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
    const res = [];
    const recusion = (candidates, leftTarget, index, choosed) => {
        if (index >= candidates.length || leftTarget < 0) { return; }
        while (index <= candidates.length - 1) {
            const candidate = candidates[index];
            let cnt = 0;
            while (candidate * cnt <= leftTarget) {
                let newChoosed = choosed.slice();
                let copyCnt = cnt;
                while (copyCnt > 0) {
                    newChoosed.push(candidate);
                    copyCnt--;
                }
                const newLeftTarget = leftTarget - candidate * cnt;
                if (newLeftTarget === 0) {
                    res.push(newChoosed);
                }
                recusion(candidates, newLeftTarget, (index + 1), newChoosed);
                cnt++;
            }
            index++;
        }
    }
    recusion(candidates, target, 0, []);
    return res;
};
/**
    下面是 LeetCode 官方题解，https://leetcode-cn.com/problems/combination-sum/solution/zu-he-zong-he-by-leetcode-solution/
    与我上面题解相比
    相同点：
        整体思路是相同的，都是使用 0-1 选择与不选择，对 candidates 上的每个数，都有 1...n （n * num <= leftTarget）的可能性，然后进入下一个
    官方题解更巧妙的地方：
        在于把每个数的重复选择，也交给递归，不用自己处理

 */
var combinationSum = function(candidates, target) {
    const res = [];
    const dfs = (leftTarget, combine, idx) => {
        if (idx === candidates.length) {
            return;
        }
        if (leftTarget === 0) {
            // 直接跳过
            res.push(combine);
            return;
        }
        // 1. 跳过当前，游标 idx 需要后移一位
        dfs(leftTarget, combine, idx + 1);
        // 2. 选择当前数，游标 idx 不需要移动
        if (leftTarget - candidates[idx] >= 0) { // 剪枝
            dfs(leftTarget - candidates[idx], [...combine, candidates[idx]], idx);
        }
        // 3. 不跳过，也不选择，没有意义，舍弃
        // dfs(leftTarget, combine, idx)
    }

    dfs(target, [], 0);
    return res;
};
// @lc code=end

