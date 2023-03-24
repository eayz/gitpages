import ArrUtils.ArrUtils;

public class _006intersect {
    public int[] intersect(int[] nums1, int[] nums2) { // 6 4 2 0-3 4-5
        int[] nums = ArrUtils.Array2copy(nums1, nums2);
        ArrUtils.bubbleSort(nums);
        _004containDuplicate cd = new _004containDuplicate();
        cd.containsDuplicate(nums);
        int temp = 1;
        int tag = nums[0];
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] == tag)
                continue;
            else {
                temp = temp + 1;
                tag = nums[i];
            }
        }
        int arr[] = new int[temp];
        arr[0] = tag = nums[0];
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] == tag)
                continue;
            else {
                if (i + 1 < temp) {
                    arr[i] = nums[i];
                }
            }
        }
        return arr;
    }

    public static void main(String[] args) {
        int[] input1 = { 4, 9, 5 };
        int[] input2 = { 2, 2 };
        _006intersect intersect = new _006intersect();
        ArrUtils.printArray(intersect.intersect(input1, input2));
    }
}
