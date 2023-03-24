import ArrUtils.ArrUtils;

public class _003rotate {

    public void rotate(int []nums){
        int tag = nums[nums.length - 1];
        for (int i = nums.length - 1; i > 0; i--) {
            nums[i] = nums[i - 1];
        }
        nums[0] = tag;
    }
    public void rotateK(int []nums, int k) {
        for (int i = 0; i < k; i++)
            rotate(nums);
    }


    public static void main(String[] args) {
        int []input = {-1, -100, 3, 99};
        int k = 2;
        _003rotate r = new _003rotate();
        r.rotateK(input, k);
        ArrUtils.printArray(input);
    }
}
