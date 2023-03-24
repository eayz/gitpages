//输入：nums = [1,1,2]
//输出：2, nums = [1,2,_]
//解释：函数应该返回新的长度 2 ，并且原数组 nums 的前两个元素被修改为 1, 2 。不需要考虑数组中超出新长度后面的元素。

import ArrUtils.ArrUtils;

public class _001removeDuplicates {
    public int removeDuplicates(int[] nums) {
        int count = 0;
        for(int i = 1; i < nums.length; i++){
            if(nums[i] == nums[i-1]){
                count++;
            }else{
                nums[i - count] = nums[i];
            }
        }
        return nums.length - count;
    }



    public static void main(String[] args) {
        _001removeDuplicates rd = new _001removeDuplicates();
        int []nums = {1, 1, 2};
        int num = rd.removeDuplicates(nums);

        ArrUtils.printArray(nums);
    }
}