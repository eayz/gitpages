import ArrUtils.ArrUtils;

import java.util.Arrays;

public class _004containDuplicate {

    public boolean containsDuplicate(int[] nums) {
        Arrays.sort(nums);
        for (int ind = 1; ind < nums.length; ind++) {
            if (nums[ind] == nums[ind - 1]) {
                return true;
            }
        }
        return false;
    }

    public static void main(String[] args) {
        int[] input = { 1, 3, 4, 1, 4, 2 };
        _004containDuplicate cd = new _004containDuplicate();
        boolean tag = cd.containsDuplicate(input);
        System.out.println(tag);
    }
}
