/*
 * @lc app=leetcode.cn id=56 lang=javascript
 *
 * [56] 合并区间
 *
 * https://leetcode-cn.com/problems/merge-intervals/description/
 *
 * algorithms
 * Medium (43.02%)
 * Likes:    667
 * Dislikes: 0
 * Total Accepted:    157.3K
 * Total Submissions: 364K
 * Testcase Example:  '[[1,3],[2,6],[8,10],[15,18]]'
 *
 * 给出一个区间的集合，请合并所有重叠的区间。
 * 
 * 
 * 
 * 示例 1:
 * 
 * 输入: intervals = [[1,3],[2,6],[8,10],[15,18]]
 * 输出: [[1,6],[8,10],[15,18]]
 * 解释: 区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
 * 
 * 
 * 示例 2:
 * 
 * 输入: intervals = [[1,4],[4,5]]
 * 输出: [[1,5]]
 * 解释: 区间 [1,4] 和 [4,5] 可被视为重叠区间。
 * 
 * 注意：输入类型已于2019年4月15日更改。 请重置默认代码定义以获取新方法签名。
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * intervals[i][0] <= intervals[i][1]
 * 
 * 
 */
/**
  题解：
       一、思路
           排序+双指针
           1. 排序，先根据每个区间起点进行排序
           2. 双指针，当前区间的起点，与上一个区间的终点作比较，比较后的处理，如下面代码所示
       二、注意点
           1. Math.max(intervals[i][1], intervals[i-1][1]) 这里是因为有一个用例没有通过
                输入：[[1,4],[2,3]]，输出应该是：[[1,4]]
*/
// @lc code=start
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    intervals.sort((i1, i2) => (i1[0] - i2[0]));    // 升序
    for (let i = 1; i < intervals.length; i++) {
        const prevLast = intervals[i - 1][1];
        const curStart = intervals[i][0];
        if (prevLast >= curStart) {
            intervals[i] = [intervals[i - 1][0], Math.max(intervals[i][1], intervals[i-1][1])];
            intervals[i-1] = null;  // 清空上一个区间
        }
    }
    return intervals.filter(interval => interval != null);
};
// @lc code=end

