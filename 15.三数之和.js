/*
 * @lc app=leetcode.cn id=15 lang=javascript
 *
 * [15] 三数之和
 *
 * https://leetcode-cn.com/problems/3sum/description/
 *
 * algorithms
 * Medium (28.78%)
 * Likes:    2458
 * Dislikes: 0
 * Total Accepted:    294.2K
 * Total Submissions: 1M
 * Testcase Example:  '[-1,0,1,2,-1,-4]'
 *
 * 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0
 * ？请你找出所有满足条件且不重复的三元组。
 * 
 * 注意：答案中不可以包含重复的三元组。
 * 
 * 
 * 
 * 示例：
 * 
 * 给定数组 nums = [-1, 0, 1, 2, -1, -4]
 * 
 * 满足要求的三元组集合为：
 * [
 * ⁠ [-1, 0, 1],
 * ⁠ [-1, -1, 2]
 * ]
 * 
 * 
 */

/**
题解:
    1. 暴力法 T(n) = O(n^3)
        三重for循环，得到的是包含重复的三元组
        
    2. Map法 T(n) = O(n) + O(n^2) S(n) = O(n),
        可以得到包含重复的三元组
        题目要求是不可以包含重复的三元组，将重复三元组去重 Map(num1, num2, num3),会占用更多的空间,更复杂 

    3. 排序法+双指针 T(n) = O(nlogn) + O(n^2)
        代码如下:
        Ref: https://leetcode-cn.com/problems/3sum/solution/3sumpai-xu-shuang-zhi-zhen-yi-dong-by-jyd/            

        排序法用的目的在于去重

        -1 -1 -1 -1 -1 0 0 0 0 0 1 1 1 1 1
               -1          0         1
               
难点:
    需要去重的情况有哪些？
    
    第一种情况: 对nums[L]的去重
        [-1 0 0 0 0 0 1]
         i  L         R
        因为第一次出现的时候，已经加入，ans.push([nums[i],nums[L],nums[R]])
        所以剩余 相邻相同的nums[L]，可以直接去重，关键代码如下:    
        while (nums[L] === nums[L+1]) L++; // 去重2

    第二种情况: 对nums[R]的去重
        [-1 0 1 1 1 1]
        i   L       R
        因为第一次出现的时候，已经加入，ans.push([nums[i],nums[L],nums[R]])
        所以剩余 相邻相同的nums[R]，可以直接去重，关键代码如下:
        while (nums[R] === nums[R-1]) R--; // 去重3

    第三种情况: 对nums[i]的去重
        如果不去重，会过不了下面用例    
            Case: [-1,0,1,2,-1,-4]        
            Answer: [[-1,-1,2],[-1,0,1],[-1,0,1]]
            Expected Answer: [[-1,-1,2],[-1,0,1]]
        
        解析:
            Sorted: [-4,-1,-1,0,1,2] 
            简化Case: [-1,-1,0,1]
            出现重复答案的关键，在于有两个 -1 进行计算
            去重的方法是: 第一个 -1 出现后，后面就不需要考虑了

        关键代码如下:
            if(nums[i] === nums[i-1]) continue; // 去重3

 */
// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    let ans = [];
    const len = nums.length;
    if(nums == null || len < 3) return ans;
    nums.sort((a, b) => a - b); // 排序
    for (let i = 0; i < len ; i++) {
        if(nums[i] === nums[i-1]) continue; // 去重3
        let L = i+1;
        let R = len-1;
        while(L < R){
            const sum = nums[i] + nums[L] + nums[R];
            if (sum === 0) {
                ans.push([nums[i],nums[L],nums[R]]);
                while (nums[L] === nums[L+1]) L++; // 去重1
                while (nums[R] === nums[R-1]) R--; // 去重2
                L++;
                R--;
            } else if (sum < 0) {
                L++;
            } else if (sum > 0) {
                R--;
            }
        }
    }        
    return ans;
};
// @lc code=end

