/*
 * @lc app=leetcode.cn id=210 lang=javascript
 *
 * [210] 课程表 II
 *
 * https://leetcode-cn.com/problems/course-schedule-ii/description/
 *
 * algorithms
 * Medium (46.72%)
 * Likes:    205
 * Dislikes: 0
 * Total Accepted:    36.2K
 * Total Submissions: 71.8K
 * Testcase Example:  '2\n[[1,0]]'
 *
 * 现在你总共有 n 门课需要选，记为 0 到 n-1。
 * 
 * 在选修某些课程之前需要一些先修课程。 例如，想要学习课程 0 ，你需要先完成课程 1 ，我们用一个匹配来表示他们: [0,1]
 * 
 * 给定课程总量以及它们的先决条件，返回你为了学完所有课程所安排的学习顺序。
 * 
 * 可能会有多个正确的顺序，你只要返回一种就可以了。如果不可能完成所有课程，返回一个空数组。
 * 
 * 示例 1:
 * 
 * 输入: 2, [[1,0]] 
 * 输出: [0,1]
 * 解释: 总共有 2 门课程。要学习课程 1，你需要先完成课程 0。因此，正确的课程顺序为 [0,1] 。
 * 
 * 示例 2:
 * 
 * 输入: 4, [[1,0],[2,0],[3,1],[3,2]]
 * 输出: [0,1,2,3] or [0,2,1,3]
 * 解释: 总共有 4 门课程。要学习课程 3，你应该先完成课程 1 和课程 2。并且课程 1 和课程 2 都应该排在课程 0 之后。
 * 因此，一个正确的课程顺序是 [0,1,2,3] 。另一个正确的排序是 [0,2,1,3] 。
 * 
 * 
 * 说明:
 * 
 * 
 * 输入的先决条件是由边缘列表表示的图形，而不是邻接矩阵。详情请参见图的表示法。
 * 你可以假定输入的先决条件中没有重复的边。
 * 
 * 
 * 提示:
 * 
 * 
 * 这个问题相当于查找一个循环是否存在于有向图中。如果存在循环，则不存在拓扑排序，因此不可能选取所有课程进行学习。
 * 通过 DFS 进行拓扑排序 - 一个关于Coursera的精彩视频教程（21分钟），介绍拓扑排序的基本概念。
 * 
 * 拓扑排序也可以通过 BFS 完成。
 * 
 * 
 * 
 */

// @lc code=start
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var findOrder = function (numCourses, prerequisites) {
    const result = [];
    // 1. 入度数组 Array<课程，入度数>; 作用: 入度为 0 就是下一层;
    let inDegree = new Array(numCourses).fill(0) 
    // 2. 出度表，用哈希表构建出度表，即出度邻接表; 作用: 找到下一轮潜在候选入度为 0 
    let graph = {}
    for (let i = 0; i < prerequisites.length; i++) {
        inDegree[prerequisites[i][0]]++ // 入度数组
        (graph[prerequisites[i][1]] || (graph[prerequisites[i][1]] = [])).push(prerequisites[i][0])  // 出度表
    }
    let queue = [] // 存放入度为0的课
    for (let i = 0; i < numCourses; i++) { // 起初推入所有入度为0的课
        if (inDegree[i] === 0) queue.push(i)
    }
    while (queue.length) { // 没有了入度为0的课，没课可选，结束循环
        let cur = queue.shift() // 出栈，代表选这门课
        result.push(cur);
        let toEnQueue = graph[cur] // 查看哈希表，获取对应的后续课程
        if (toEnQueue && toEnQueue.length) { // 确保有后续课程
            for (let i = 0; i < toEnQueue.length; i++) { // 遍历后续课程
                inDegree[toEnQueue[i]]-- // 将后续课程的入度 -1
                if (inDegree[toEnQueue[i]] == 0) { // 一旦减到0，让该课入列
                    queue.push(toEnQueue[i])
                }
            }
        }
    }
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] !== 0) return []
    }
    return result // 选齐了就返回res，否则返回[]
};  

// @lc code=end

