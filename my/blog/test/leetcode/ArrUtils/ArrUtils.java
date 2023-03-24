package ArrUtils;

public class ArrUtils {
    public static void printArray(int[] nums) {
        for (int num : nums)
            System.out.print(num + " ");
        System.out.println();
    }

    public static void bubbleSort(int[] arrays) {
        for (int i = 0; i < arrays.length - 1; i++) {

            // 控制比较次数,三者交换，实现排序
            for (int j = 0; j < arrays.length - 1 - i; j++) {
                if (arrays[j] > arrays[j + 1]) {
                    int temp = 0;// 类似空桶
                    temp = arrays[j]; // A桶中水倒入空桶C中
                    arrays[j] = arrays[j + 1];// 把B桶的水倒入A桶中
                    arrays[j + 1] = temp;// 把C桶的水倒入B桶中
                }
            }
        }
        // System.out.println(Arrays.toString(arrays));
    }

    public static int[] Array2copy(int[] nums1, int[] nums2) { // 6 4 2 0-3 4-5
        int[] nums = new int[nums1.length + nums2.length];
        for (int i = 0; i < nums.length; i++) {
            if (i < nums1.length) {
                nums[i] = nums1[i];
            } else {
                nums[i] = nums2[i - nums1.length];
            }
        }
        return nums;
    }

}

class ptr {
    public Object obj;

    public static void swap(ptr a, ptr b) {
        Object temp = a.obj;
        a.obj = b.obj;
        b.obj = temp;
    }

}