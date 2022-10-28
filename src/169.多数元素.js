/*
 * @lc app=leetcode.cn id=169 lang=javascript
 *
 * [169] 多数元素
 *
 * https://leetcode-cn.com/problems/majority-element/description/
 *
 * algorithms
 * Easy (63.65%)
 * Likes:    647
 * Dislikes: 0
 * Total Accepted:    182.2K
 * Total Submissions: 286.1K
 * Testcase Example:  '[3,2,3]'
 *
 * 给定一个大小为 n 的数组，找到其中的多数元素。多数元素是指在数组中出现次数大于 ⌊ n/2 ⌋ 的元素。
 * 
 * 你可以假设数组是非空的，并且给定的数组总是存在多数元素。
 * 
 * 
 * 
 * 示例 1:
 * 
 * 输入: [3,2,3]
 * 输出: 3
 * 
 * 示例 2:
 * 
 * 输入: [2,2,1,1,1,2,2]
 * 输出: 2
 * 
 * 
 */
/*
   解法：
       零、跳过 o.o 暴力法 T(n) = O(n^2) 
           选取每个元素遍历一遍，出现的次数最大的，就是众数，也就是 “多数元素”

       一、排序法 T(n) = O(nlogn)
           由于题目假设存在 “多数元素”，且“多数元素”指出现次数大于 n/2，所以排序后，中间元素就肯定是 “多数元素”

       二、类 Map 容器 T(n) = O(n) S(n) = O(n)
           一个 Map 容器，用于叠加每个元素出现的次数
           一个记录最大次数的变量
           一个记录最大数的变量

       三、摩尔投票法
           维护候选人的次数（抵消或叠加或替换）

           “多数元素” 大于 n/2，准备一个候选人，极端情况下，其他元素都用来抵消 “多数元素” ，也至少剩 1 个 “多数元素”
           “多数元素” 大于 n/3，准备两个候选人，候选人A > n/3, 候选人B > n/3, 其他 < n/3

   资料
       https://leetcode-cn.com/problems/majority-element/solution/du-le-le-bu-ru-zhong-le-le-ru-he-zhuang-bi-de-qiu-/
       https://leetcode-cn.com/problems/majority-element/solution/duo-shu-yuan-su-by-leetcode-solution/
       摩尔投票法 https://leetcode-cn.com/problems/majority-element-ii/solution/liang-fu-dong-hua-yan-shi-mo-er-tou-piao-fa-zui-zh/

   疑问
       在做题的时候遇到的问题，自问自答^_^
       1. “多数元素” 等同于众数？
           有的文章直接说求众数，其实不是等价的，众数是指次数出现最多的元素，题目多数元素是指出现大于 [n/2]的元素
           有众数不一定存在 “多数元素”; 存在 “多数元素”，那这个数，则一定是众数
           所以本题的有的解法，是通过求众数来得到 “多数元素”， 是题目假设 “多数元素” 一定存在

*/
// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    /* 
    return nums
        .sort((a, b) => (a - b))
        [nums.length>>1];
     */

    /* 
    const map = {};  // <num.toString(), number>
    let max = 0,
        maxNum;
    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        if (map[num] == null) {
            map[num] = 1;
        } else {
            map[num] = map[num] + 1;
        }
        if (map[num] > max) {
            maxNum = num;
            max = map[num];
        }
    }
    return maxNum;
     */

    const candidate = {
        num: null,
        times: 0,
    }
    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        if (candidate.num === num) {
            candidate.times += 1;
            continue;   // 跳过下面代码
        }
        if (candidate.times > 0) {
            candidate.times -= 1;
        } else {
            candidate.times = 1;
            candidate.num = num;
        }
    }
    return candidate.num;
};
// @lc code=end

majorityElement([3, 2, 3])
