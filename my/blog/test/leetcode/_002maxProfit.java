public class _002maxProfit {

    public int maxProfit(int[] prices) {
        int n = prices.length;
        if (n <= 1) return 0;
        int max = 0;
        int d;
        for (int i = 1; i < n; i++) {
            d = prices[i] - prices[i-1];
            if (d > 0) max += d;
        }
        return max;
    }
    public static void main(String[] args) {
        int []input = {7, 1, 5, 3, 6, 4};
        _002maxProfit mp = new _002maxProfit();
        int salary = mp.maxProfit(input);
        System.out.println(salary);
    }
}
