/*
 * @lc app=leetcode.cn id=412 lang=javascript
 *
 * [412] Fizz Buzz
 *
 * https://leetcode-cn.com/problems/fizz-buzz/description/
 *
 * algorithms
 * Easy (64.10%)
 * Likes:    67
 * Dislikes: 0
 * Total Accepted:    40.4K
 * Total Submissions: 62.9K
 * Testcase Example:  '1'
 *
 * 写一个程序，输出从 1 到 n 数字的字符串表示。
 * 
 * 1. 如果 n 是3的倍数，输出“Fizz”；
 * 
 * 2. 如果 n 是5的倍数，输出“Buzz”；
 * 
 * 3.如果 n 同时是3和5的倍数，输出 “FizzBuzz”。
 * 
 * 示例：
 * 
 * n = 15,
 * 
 * 返回:
 * [
 * ⁠   "1",
 * ⁠   "2",
 * ⁠   "Fizz",
 * ⁠   "4",
 * ⁠   "Buzz",
 * ⁠   "Fizz",
 * ⁠   "7",
 * ⁠   "8",
 * ⁠   "Fizz",
 * ⁠   "Buzz",
 * ⁠   "11",
 * ⁠   "Fizz",
 * ⁠   "13",
 * ⁠   "14",
 * ⁠   "FizzBuzz"
 * ]
 * 
 * 
 */


// @lc code=start
/**
 * @param {number} n
 * @return {string[]}
 */

// 解一：if 判断
/*
var fizzBuzz = function(n) {
    const res = [];
    for (let i = 1; i <= n; i++) {
        if (i % 15 === 0) {
            res[i] = 'FizzBuzz';
        } else if (i % 3 === 0) {
            res[i] = 'Fizz';
        } else if (i % 5 === 0) {
            res[i] = 'Buzz';
        } else {
            res[i] = String(i);
        }
    }
    return res.slice(1, n + 1);
};
*/

// 解二：小单元的组合
/*
var fizzBuzz = function(n) {
    let res = '';
    const divideByThree = (num) => (num % 3 === 0);
    const divideByFive = (num) => (num % 5 === 0);
    for (let i = 1; i <= n; i++) {
        if (divideByThree(i) || divideByFive(i)) {
            if (divideByThree(i)) {
                res += 'Fizz';
            }
            if (divideByFive(i)) {
                res += 'Buzz';
            }
        } else {
            res += String(i);
        }
        res += ' ';
    }
    return res.slice(0, res.length - 1).split(' ');
};
*/

// 解三：ES6迭代器
// Ref: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols
var fizzBuzz = function(n) {
    function converter(i) {
        if (i % 15 === 0) {
            return 'FizzBuzz';
        } else if (i % 3 === 0) {
            return 'Fizz';
        } else if (i % 5 === 0) {
            return 'Buzz';
        } else {
            return String(i);
        }
    }

    const makeIterator = (n) => () => {
        let nextIndex = 1;
        return {
            next: function() {
                return nextIndex <= n ? 
                    {
                        value: converter(nextIndex++),
                        done: false
                    } : {
                        done: true
                    };
            }
        };
    }
    const obj = {
        [Symbol.iterator]: makeIterator(n),
    };
    return Array.from(obj);
};

// @lc code=end

