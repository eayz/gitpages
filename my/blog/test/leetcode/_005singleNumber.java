public class _005singleNumber {
    public int singleNumber(int []nums){
        int reduce = 0;
        for (int num: nums)
            reduce = reduce ^ num;
        return reduce;
    }
    public static void main(String[] args) {
        int []input = {4, 1, 2, 2, 1};
        _005singleNumber sn = new _005singleNumber();
        int tag = sn.singleNumber(input);
        System.out.println(tag);
    }
}
