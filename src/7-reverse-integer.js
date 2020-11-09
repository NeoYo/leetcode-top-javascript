/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
    // 特殊考虑 0、末尾0、-号
    /**
     * x = 123
     * radix = 10
     * rev = 0
     * 阶段一
     * pop = x % radix = 3
     * rev = rev * radix + pop = 3
     * x = Math.floor(x / radix) = 12
     * 阶段二
     * pop = x % radix = 2
     * rev = rev * radix + pop = 32
     * x = Math.floor(x / radix) = 1
     * 阶段三
     * pop = x % radix = 1
     * rev = rev * radix + pop = 321
     * x = Math.floor(x / radix) = 0
     * 
     * if (x === 0) {
     * }
     */
    let rev = 0;
    const radix = 10;
    const MAX_VAL = Math.pow(2, 31) - 1;
    const MIN_VAL = - Math.pow(2, 31);
    while (x !== 0) {
        rev = rev * radix + x % radix;
        x = ~~(x / radix);
    }
    if (rev > MAX_VAL || rev < MIN_VAL) {
        return 0;
    }
    return rev;
};

reverse(-123);