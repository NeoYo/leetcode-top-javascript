/*
 * @lc app=leetcode.cn id=207 lang=javascript
 *
 * [207] 课程表
 *
 * https://leetcode-cn.com/problems/course-schedule/description/
 *
 * algorithms
 * Medium (49.79%)
 * Likes:    334
 * Dislikes: 0
 * Total Accepted:    37.9K
 * Total Submissions: 74.2K
 * Testcase Example:  '2\n[[1,0]]'
 *
 * 你这个学期必须选修 numCourse 门课程，记为 0 到 numCourse-1 。
 * 
 * 在选修某些课程之前需要一些先修课程。 例如，想要学习课程 0 ，你需要先完成课程 1 ，我们用一个匹配来表示他们：[0,1]
 * 
 * 给定课程总量以及它们的先决条件，请你判断是否可能完成所有课程的学习？
 * 
 * 
 * 
 * 示例 1:
 * 
 * 输入: 2, [[1,0]] 
 * 输出: true
 * 解释: 总共有 2 门课程。学习课程 1 之前，你需要完成课程 0。所以这是可能的。
 * 
 * 示例 2:
 * 
 * 输入: 2, [[1,0],[0,1]]
 * 输出: false
 * 解释: 总共有 2 门课程。学习课程 1 之前，你需要先完成​课程 0；并且学习课程 0 之前，你还应先完成课程 1。这是不可能的。
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 输入的先决条件是由 边缘列表 表示的图形，而不是 邻接矩阵 。详情请参见图的表示法。
 * 你可以假定输入的先决条件中没有重复的边。
 * 1 <= numCourses <= 10^5
 * 
 * 
 */

// @lc code=start

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function (numCourses, prerequisites) {
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
        if (inDegree[i] !== 0) return false
    }
    return true // 选齐了就返回res，否则返回[]
};  
// @lc code=end
canFinish(2, [[1,0],[0,1]]);
