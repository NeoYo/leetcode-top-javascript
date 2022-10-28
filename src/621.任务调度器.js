/*
 * @lc app=leetcode.cn id=621 lang=javascript
 *
 * [621] 任务调度器
 *
 * https://leetcode-cn.com/problems/task-scheduler/description/
 *
 * algorithms
 * Medium (57.51%)
 * Likes:    805
 * Dislikes: 0
 * Total Accepted:    85K
 * Total Submissions: 147.8K
 * Testcase Example:  '["A","A","A","B","B","B"]\n2'
 *
 * 给你一个用字符数组 tasks 表示的 CPU 需要执行的任务列表。其中每个字母表示一种不同种类的任务。任务可以以任意顺序执行，并且每个任务都可以在 1
 * 个单位时间内执行完。在任何一个单位时间，CPU 可以完成一个任务，或者处于待命状态。
 * 
 * 然而，两个 相同种类 的任务之间必须有长度为整数 n 的冷却时间，因此至少有连续 n 个单位时间内 CPU 在执行不同的任务，或者在待命状态。
 * 
 * 你需要计算完成所有任务所需要的 最短时间 。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：tasks = ["A","A","A","B","B","B"], n = 2
 * 输出：8
 * 解释：A -> B -> (待命) -> A -> B -> (待命) -> A -> B
 * ⁠    在本示例中，两个相同类型任务之间必须间隔长度为 n = 2 的冷却时间，而执行一个任务只需要一个单位时间，所以中间出现了（待命）状态。 
 * 
 * 示例 2：
 * 
 * 
 * 输入：tasks = ["A","A","A","B","B","B"], n = 0
 * 输出：6
 * 解释：在这种情况下，任何大小为 6 的排列都可以满足要求，因为 n = 0
 * ["A","A","A","B","B","B"]
 * ["A","B","A","B","A","B"]
 * ["B","B","B","A","A","A"]
 * ...
 * 诸如此类
 * 
 * 
 * 示例 3：
 * 
 * 
 * 输入：tasks = ["A","A","A","A","A","A","B","C","D","E","F","G"], n = 2
 * 输出：16
 * 解释：一种可能的解决方案是：
 * ⁠    A -> B -> C -> A -> D -> E -> A -> F -> G -> A -> (待命) -> (待命) -> A ->
 * (待命) -> (待命) -> A
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 
 * tasks[i] 是大写英文字母
 * n 的取值范围为 [0, 100]
 * 
 * 
 */
/**
   解释一下这个公式怎么来的 (count[25] - 1) * (n + 1) + maxCount
       假设数组 ["A","A","A","B","B","C"]，n = 2，
       A的频率最高，记为count = 3，所以两个A之间必须间隔2个任务，才能满足题意并且是最短时间（两个A的间隔大于2的总时间必然不是最短），
       因此执行顺序为： A->X->X->A->X->X->A，这里的X表示除了A以外其他字母，或者是待命，不用关心具体是什么，反正用来填充两个A的间隔的。
       上面执行顺序的规律是： 有count - 1个A，其中每个A需要搭配n个X，再加上最后一个A，所以总时间为 (count - 1) * (n + 1) + 1
                                                                                                    X个n 1个A  1个最后一行的 A
       要注意可能会出现多个频率相同且都是最高的任务，比如 ["A","A","A","B","B","B","C","C"]
       所以最后会剩下一个A和一个B，因此最后要加上频率最高的不同任务的个数 maxCount
       
        const res = (maxTimes - 1) * (n + 1) + maxCount;
        return Math.max(res, tasks.length);
        解释：当 (n + 1) < 那一行的数目时，那一行算出来偏少了
                这种思路，每一行只可能算少了，因为 X个n 是冷却时间，是必须的，最后兜底用 tasks.length
        举例：公式算出的值可能会比数组的长度小，如["A","A","B","B"]，n = 0，此时要取数组的长度

        参考链接：https://leetcode-cn.com/problems/task-scheduler/comments/44965
        参考链接：https://leetcode-cn.com/problems/task-scheduler/solution/jian-ming-yi-dong-de-javajie-da-by-lan-s-jfl9/

    // 用不上的： workTasks = tasks.slice(); 每遍历 workTasks，新建容器 Set<task, boolean> 判断，删除 workTasks 元素，更新 count，结束一个循环，count+n；
*/
// @lc code=start
/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
var leastInterval = function(tasks, n) {
    const buckets = [];
    for(let i = 0; i < tasks.length; i++) { // 遍历所有 tasks，统计出现次数
        const index = tasks[i].charCodeAt() - 'A'.charCodeAt();
        buckets[index] = (buckets[index] ?? 0) + 1;
    }
    buckets.sort((a, b) => b - a);
    const maxTimes = buckets[0];
    let maxCount = 1;   // maxCount 计算，默认是 1，相同则++
    for (let i = 0; i <= 25; i++){   // 26个字母，25种比较
        if (!buckets[i] || !buckets[i + 1]) break;  // 排除掉 undefined 和 0
        if (buckets[i] === buckets[i + 1]) {
            maxCount++;
        } else {
            break;
        }
    }
    const res = (maxTimes - 1) * (n + 1) + maxCount;
    return Math.max(res, tasks.length);
};
// @lc code=end

