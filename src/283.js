var moveZeroes = function(nums) {
    let index = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            nums[index] = nums[i];
            index++;
        }
    }
    for (; index < nums.length; index++) {
        nums[index] = 0;
    }
};

console.assert(moveZeroes([0,1,0,3,12]));