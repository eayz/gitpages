# [大数运算的算法设计和C++实现](https://www.cnblogs.com/rmthy/p/8644236.html)

## 1、背景

　　工作中遇到过需要进行极大数据的存储和运算的场景，当时使用Python解决了这个问题，在Python中，整数没有位数限制，使用起来很方便。但是当程序主体使用C/C++实现时，就比较麻烦。所以考虑实现一个大数类，用于大数的存储和运算，后面生成静态库，需要的时候直接调用。

 
<!--more-->
## 2、算法设计

### （1）存储

　　大数一般都是以整数队列的形式存储，取一个较大的进制S，队列中的每一个值，相当于一位。假设数组长度为N（0为低位，n-1为高位），则数组表示的值 value = A0 + A1*S + A2*S2 + ... + An-1*Sn-1。例如 “1234567890000” 在数组中存储形式为 567890000, 1234。以下大数的运算全部基于此方式。

### （2）比较运算

　　两个大数比较的方法是：优先比较位数，位数大者为大，位数小者为小；如果位数相等，则依次从**高位向低位**比较，当前位大的为大，当前位小的为小；如果每一位都相等，则两者相等。

　　对于A(a0a1a2...an-1) 和 B(b0b1b2...bm-1)，比较流程图如下：

![img](https://images2018.cnblogs.com/blog/1026302/201803/1026302-20180323205923752-1534435032.jpg)

### （3）加法运算

　　大数的加减乘运算都与十进制运算的手算方法相同，区别在于后者是10进制，而前者是S进制。加法计算时，A和B由低位到高位依次求和，需考虑进位。

　　对于A(a0a1a2...an-1) + B(b0b1b2...bm-1)，并假设N≥M，则计算过程如下（注意取值范围）：

 ![img](https://images2018.cnblogs.com/blog/1026302/201803/1026302-20180322132551103-725513137.jpg)

　　注意：

- A、B位数可能不相等，因此需要分两部分进行加和；
- 两次循环结束，需要考虑进位是否为零；

 

### （4）减法运算

　　对于A(a0a1a2...an-1) - B(b0b1b2...bm-1)，并假设A≥B（不考虑负数），一定有N≥M，则计算过程如下：

![img](https://images2018.cnblogs.com/blog/1026302/201803/1026302-20180322135851929-798596114.jpg)

 　注意：

- A、B位数可能不相等，因此需要分两部分求差值；
- 减法运算可能会导致差值的若干个高位是无意义的零值，因此需额外的去零操作；

 

### （5）乘法运算

　　在计算十进制数 123 * 45 时，首先计算 123 * 5 = 615，然后计算 123 * 4 = 492，最终结果是 615 + 492 * 10 = 5535。

　　大数乘法的计算过程与此相同：对于A(a0a1a2...an-1) * B(b0b1b2...bm-1)，并假设N≥M（被乘数位数不小于乘数时，效率最高），对于B中的每一位 bi，计算其与A的乘积，并在后面补上 i 个零，将结果累加，即为A与B的乘积。

　　流程图如下：

 ![img](https://images2018.cnblogs.com/blog/1026302/201803/1026302-20180324132216004-726134565.jpg)

　　

### （6）除法运算

　　除法运算是四则运算中最复杂的运算， 常用的方法是使用多次减法来模拟除法。最简单的方法是被除数不断减去除数，直到结果为负，减的次数即为商，当然这种方法效率太低。

　　网上提供了一些优化方法，例如，在被除数减除数的过程中，被除数每次减去除数的10N倍，以加速被除数衰减过程。

 

　　这里采用的方法与上述方法原理相似，以23456除以123为例，在进行竖式计算时：以234除以123，得1，余111，以1115除以123，得9，余8，以86除以123，得0，余86，则23456除以123的结果是190。

　　上述过程是为了将未知位数的两个大数相除，转换为多次位数相近的两个数相除，即被除数最多比除数多1位。算法的核心是上述过程中的 234除以124、1115除以123、86除以123，如何得到商和余数。

 

　　以下提出一种收敛算法：

　　首先，对于 A(a0a1a2...an-1) / B(b0b1b2...bm-1)，一定有 A(a0a1a2...an-1) / B(b0b1b2...bm-1) ≤ A(aiai+1...an-1) / B(bibi+1...bm-1)，其中 0 ≤ i ≤ n-1 且 0 ≤ i ≤ m-1。

　　所以，可以通过取A、B的最高两位或一位来预估A、B相除的结果，且预估值≥实际值，并以预估值更新A，多次迭代，直到A<B。设A0=A，A/B的最终结果为C0，推导过程如下：

　　第1轮：C0 = A0 / B，求得预估值 V0，有V0 >= C0，设V0 - C0 = C1，B * V0 - A0 = A1，则

　　第2轮：C1 = A1 / B，求得预估值 V1，有V1 >= C1，设V1 - C1 = C2，B * V1 - A1 = A2，则

　　第3轮：C2 = A2 / B，求得预估值 V2，有V2 >= C2，设V2 - C2 = C3，B * V2 - A2 = A3，则

　　......

　　第x轮：Cx-1 = Ax-1 / B，此时Ax-1 < B，即 Vx-1 = 0

　　通过以上过程，可以推导出：C0 = V0 - V1 + V2 - ... +/- Vx-1

　　

　　举例（进制S取10亿）：

　　A0 = 86,517999162,161442275,630671648,031880106,681829550,207222443
　　B  =          92,784489371,679693896,011626721,067864399,494212548

　　第1轮：V0 = 86,517999162 / 92 = 940413034
　　　　　 A1 = B * V0 - A0 = 737743996,000612337,308902736,003021973,147110937,498328189
　　第2轮：V1 = 737743996,000612337 / 92,784489371 = 7951156
　　   　　A2 = B * V1 - A1 = 0（实际值是个负值，直接取0）
　　此时 A2 < B，因此 C = 940413034 - 7951156 = 932461878，实际值为932461877。

　　因为误差问题，算法值比实际值大1或与实际值相等，所以算法的最终结果需要向下微调。

 

　　以下给出收敛过程以及预估值的计算方法：

![img](https://images2018.cnblogs.com/blog/1026302/201803/1026302-20180323204525955-1402311447.jpg)

 

## 3、代码实现

### （1）类的设计

　　计划实现一个 LargeInt 类，其含义是一个大整数（无负数和小数），实现的核心功能是：字符串构造、格式化字符串输出、加减乘除四则运算以及逻辑比较运算。

　　设计类图如下：

![img](https://images2018.cnblogs.com/blog/1026302/201803/1026302-20180324114936947-266847277.jpg)

###  （2）类定义

　　以C++模板类vector作为大数存储，下标0表示低位，进制S取1000000000（10亿，便于格式化输入输出），大数每一位是一个无符号32位整型，乘法运算时的中间值以无符号64位整型承载。

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
 1 #include <iostream>
 2 #include <vector>
 3 #include <string>
 4 
 5 typedef unsigned int uint;
 6 typedef unsigned long long uint64;
 7 
 8 #define MAX_VAL 1000000000 // 10亿
 9 #define VAL_LEN 9
10 #define FORMAT_STR "%09d"
11 
12 class LargeInt
13 {
14 private:
15     std::vector<uint>  _data;
16 
17     bool checkValStr(const std::string &valStr);
18     int compare(const LargeInt &li) const;
19     void arrange();
20 
21     static uint estimateQuotient(const LargeInt &liA, const LargeInt &liB);
22     static uint getMaxCycle(const LargeInt &liA, const LargeInt &liB);
23 
24 public:
25     LargeInt();
26     LargeInt(uint val);
27     LargeInt(const std::string &valStr);
28 
29     // 四则运算符重载
30     LargeInt operator+(const LargeInt &li) const;
31     LargeInt operator-(const LargeInt &li) const;
32     LargeInt operator*(const LargeInt &li) const;
33     LargeInt operator/(const LargeInt &li) const;
34 
35     // 比较运算符重载
36     bool operator==(const LargeInt &li) const;
37     bool operator!=(const LargeInt &li) const;
38     bool operator<(const LargeInt &li) const;
39     bool operator>(const LargeInt &li) const;
40     bool operator<=(const LargeInt &li) const;
41     bool operator>=(const LargeInt &li) const;
42 
43     // 字符串格式化输出
44     std::string toString() const;
45 };
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

　　行9、10定义了格式化输入和格式化输出所需的宏，后面会用到。

 

### （3）构造方法

　　LargeInt 提供了三种构造方法，分别是无符号整型、字符串以及无参数构造。所谓字符串构造，是以十进制字符串为入参，系统对字符串进行分割，转为整数数组，构造LargeInt。

　　以 ”1234567890123“ 为例，字符串构造的方法是，从字符串结尾向开头不断截取长度为9的子串，并转为整数，即 67890123,12345。

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
 1 inline bool isDigit(const char ch)
 2 {
 3     return ch >= '0' && ch <= '9';
 4 }
 5 
 6 LargeInt::LargeInt() {}
 7 
 8 LargeInt::LargeInt(uint val)
 9 {
10     this->_data.push_back(val % MAX_VAL);
11     if (val >= MAX_VAL)
12         this->_data.push_back(val / MAX_VAL);
13 }
14 
15 // 字符串合法性检查，只允许出现字符 0~9
16 bool LargeInt::checkValStr(const string &valStr)
17 {
18     for (auto it = valStr.begin(); it != valStr.end(); ++it)
19     {
20         if (!isDigit(*it)) return false;
21     }
22     return true;
23 }
24 
25 // 字符串构造
26 //  valStr：十进制字符串
27 LargeInt::LargeInt(const string &valStr)
28 {
29     if (checkValStr(valStr))// 检查valStr合法性
30     {
31         int len = valStr.length();
32         // 按长度9截取子串
33         while (len >= VAL_LEN)
34         {
35             string s = valStr.substr(len - VAL_LEN, VAL_LEN);
36             this->_data.push_back(stoi(s));
37             len -= VAL_LEN;
38         }
39         // 残留子串
40         if (len > 0)
41         {
42             string s = valStr.substr(0, len);
43             this->_data.push_back(stoi(s));
44         }
45     }
46 
47     this->arrange(); // 去零
48 }
49 
50 // 去零操作，避免整数队列的高位存在多余的零
51 void LargeInt::arrange()
52 {
53     int idx = this->_data.size();
54 
55     // 注意，如果队列中全为0，要保留最低位的0
56     while (--idx >= 1)
57     {
58         if (this->_data[idx] > 0) break;
59 
60         this->_data.pop_back();
61     }
62 }
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

　　说明：为避免字符串开头有无意义的零，定义了 ”arrange“ 函数，用于整理队列，去除多余的零值，字符串构造以及后面的减法、除法都需要调用arrange函数。 

 

### （4）比较运算

　　对于所有的比较运算，可以提取出一个公共函数 ”compare“，该函数比较两个LargeInt的大小，返回1、0、-1，其他比较函数通过调用该函数判断返回值即可。

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
 1 // 比较函数，0 相等，1 大于，-1 小于
 2 int LargeInt::compare(const LargeInt &li) const
 3 {
 4     int len1 = this->_data.size();
 5     int len2 = li._data.size();
 6 
 7     // step1: 比较长度
 8     if (len1 != len2)
 9         return (len1 > len2) ? 1 : -1;
10 
11     // step2: 由高位到低位比较值
12     for (int idx = len1 - 1; idx >= 0; --idx)
13     {
14         if (this->_data[idx] == li._data[idx]) continue;
15         return this->_data[idx] > li._data[idx] ? 1 : -1;
16     }
17 
18     return 0;
19 }
20 
21 bool LargeInt::operator==(const LargeInt &li) const
22 {
23     return compare(li) == 0;
24 }
25 
26 bool LargeInt::operator!=(const LargeInt &li) const
27 {
28     return compare(li) != 0;
29 }
30 
31 bool LargeInt::operator<(const LargeInt &li) const
32 {
33     return compare(li) < 0;
34 }
35 
36 bool LargeInt::operator>(const LargeInt &li) const
37 {
38     return compare(li) > 0;
39 }
40 
41 bool LargeInt::operator<=(const LargeInt &li) const
42 {
43     return compare(li) <= 0;
44 }
45 
46 bool LargeInt::operator>=(const LargeInt &li) const
47 {
48     return compare(li) >= 0;
49 }
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

 

### （5）加法运算

　　首先定义两个简单的MAX/MIN宏，后面会用到。

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
1 #ifndef MIN
2 #define MIN(a,b) ((a) > (b) ? (b) : (a))
3 #endif
4 
5 #ifndef MAX
6 #define MAX(a,b) ((a) > (b) ? (a) : (b))
7 #endif
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

　　按照前面提供的算法，实现代码。考虑加法的进位只会是0或1，所以为了减少除法和求模运算，函数中使用 if 判断替代。

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
 1 LargeInt LargeInt::operator+(const LargeInt &li) const
 2 {
 3     int         len1 = this->_data.size();
 4     int         len2 = li._data.size();
 5 
 6     int         minLen = MIN(len1, len2);
 7     int         maxLen = MAX(len1, len2);
 8     const LargeInt &extraLi = (len1 > len2) ? (*this) : li;
 9 
10     uint        value = 0;  // 和，不超过最大值的2倍
11     uint        carry = 0;  // 进位
12     LargeInt    retVal;
13     
14     for (int idx = 0; idx < minLen; ++idx)
15     {
16         value = this->_data[idx] + li._data[idx] + carry;
17 
18         if (value >= MAX_VAL)
19         {
20             retVal._data.push_back(value - MAX_VAL);
21             carry = 1;
22         }
23         else
24         {
25             retVal._data.push_back(value);
26             carry = 0;
27         }
28     }
29 
30     for (int idx = minLen; idx < maxLen; ++idx)
31     {
32         value = extraLi._data[idx] + carry;
33 
34         if (value >= MAX_VAL)
35         {
36             retVal._data.push_back(value - MAX_VAL);
37             carry = 1;
38         }
39         else
40         {
41             retVal._data.push_back(value);
42             carry = 0;
43         }
44     }
45 
46     if (carry > 0)
47         retVal._data.push_back(carry);
48 
49     return retVal;
50 }
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

　　

### （6）减法运算

　　注意：代码中要避免出现负值，否则会导致计算结果错误；减法运算的结果需要做去零操作。

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
 1 LargeInt LargeInt::operator-(const LargeInt &li) const
 2 {
 3     if (*this <= li)
 4     {
 5         return LargeInt(0);
 6     }
 7 
 8     int         len1 = this->_data.size();
 9     int         len2 = li._data.size();
10 
11     uint        value = 0;  // 差
12     uint        carry = 0;  // 借位
13     LargeInt    retVal;
14 
15     for (int idx = 0; idx < len2; ++idx)
16     {
17         if (this->_data[idx] < li._data[idx] + carry) // 注意细节，carry放在右侧，避免出现差值为负数的情况
18         {
19             value = this->_data[idx] + MAX_VAL - carry - li._data[idx];
20             carry = 1;
21         }
22         else
23         {
24             value = this->_data[idx] - carry - li._data[idx];
25             carry = 0;
26         }
27 
28         retVal._data.push_back(value);
29     }
30 
31     for (int idx = len2; idx < len1; ++idx)
32     {
33         if (this->_data[idx] < carry)
34         {
35             value = this->_data[idx] + MAX_VAL - carry;
36             carry = 1;
37         }
38         else
39         {
40             value = this->_data[idx] - carry;
41             carry = 0;
42         }
43         retVal._data.push_back(value);
44     }
45 
46     retVal.arrange();
47     return retVal;
48 }
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

　　

### （7）乘法运算

　　为保证被乘数位数大于乘数，提高计算效率，如果A的位数小于B的位数，则返回B*A。

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
 1 LargeInt LargeInt::operator*(const LargeInt &li) const
 2 {
 3     int         len1 = this->_data.size();
 4     int         len2 = li._data.size();
 5 
 6     if (len1 < len2) return li.operator*(*this); // 优化，保证被乘数位数大于乘数
 7 
 8     uint64      value;      // 积
 9     uint64      carry = 0;  // 进位
10     LargeInt    retVal(0);
11 
12     for (int idx2 = 0; idx2 < len2; ++idx2)
13     {
14         LargeInt mulTemp;
15         carry = 0;
16 
17         // 补零
18         for (int tmpIdx = 0; tmpIdx < idx2; ++tmpIdx)
19             mulTemp._data.push_back(0);
20 
21         for (int idx1 = 0; idx1 < len1; ++idx1)
22         {
23             value = (uint64)(li._data[idx2]) * (uint64)(this->_data[idx1]) + carry;
24 
25             mulTemp._data.push_back((uint)(value % MAX_VAL));
26             carry = value / MAX_VAL;
27         }
28 
29         if (carry)
30             mulTemp._data.push_back((uint)carry);
31         
32         retVal = retVal + mulTemp;
33     }
34 
35     return retVal;
36 }
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

 

 

### （8）除法

　　注意：除法计算由高位向低位进行，即求得的第一个商值是结果的最高位，所以要注意插入位置；

　　　　  算法结果需要向下微调，正常情况下，算法结果与实际结果相等，或比实际结果大1，为保险起见，使用了while循环。

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
 1 LargeInt LargeInt::operator/(const LargeInt &li) const
 2 {
 3     if (li._data.empty() || li == 0) return LargeInt("");
 4     if (*this < li) return LargeInt(0);
 5 
 6     int         len1 = this->_data.size();
 7     int         len2 = li._data.size();
 8 
 9     uint        value;
10     LargeInt    retVal;
11     LargeInt    divTemp;
12 
13     for (int idx = len1 - len2 + 1; idx < len1; ++idx)
14     {
15         divTemp._data.push_back(this->_data[idx]);
16     }
17 
18     // len1 >= len2
19     for (int idx = len1 - len2; idx >= 0; --idx)
20     {
21         value = 0;
22         divTemp._data.insert(divTemp._data.begin(), this->_data[idx]);
23         divTemp.arrange();
24 
25         value = getMaxCycle(divTemp, li); // 商
26         
27         divTemp = divTemp - li * value;   // 余数  
28 
29         retVal._data.insert(retVal._data.begin(), value); // 除法是由高位向低位进行，所以插入位置在begin
30     }
31 
32     retVal.arrange();
33     return retVal;
34 }
35 
36 // 计算商值
37 uint LargeInt::getMaxCycle(const LargeInt &liA, const LargeInt &liB)
38 {
39     LargeInt        tempA = liA;
40     const LargeInt& tempB = liB;
41     uint            tempC;
42     uint            res = 0;
43     uint            counter = 0; // 调试用
44     bool            flag = true;
45 
46 
47     while (tempA >= tempB)
48     {
49         counter++;
50         
51         tempC = estimateQuotient(tempA, tempB);
52         tempA = tempB * tempC - tempA;
53        
54         res = flag ? (res + tempC) : (res - tempC);
55         flag = !flag;
56     }
57 
58     // 微调 
59     while (res > 0 && liB * res > liA) res--;
60 
61     return res;
62 }
63 
64 // 估值
65 uint LargeInt::estimateQuotient(const LargeInt &liA, const LargeInt &liB)
66 {
67     int         lenA = liA._data.size();
68     int         lenB = liB._data.size();
69     uint64      valA, valB;
70 
71     if (lenA == lenB)
72     {
73         if (lenA > 1)
74         {
75             valA = (uint64)liA._data[lenA - 1] * MAX_VAL + liA._data[lenA - 2];
76             valB = (uint64)liB._data[lenB - 1] * MAX_VAL + liB._data[lenB - 2];
77         }
78         else
79         {
80             valA = (uint64)liA._data[lenA - 1];
81             valB = (uint64)liB._data[lenB - 1];
82         }
83     }
84     else
85     {
86         valA = (uint64)liA._data[lenA - 1] * MAX_VAL + liA._data[lenA - 2];
87         valB = (uint64)liB._data[lenB - 1];
88     }
89 
90     return (uint)(valA / valB);
91 }
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

 

### （9）格式化字符串输出

　　为便于测试和打印，需要得到 LargeInt 的字符串表现形式，类似于十进制字符串构造，这里将 LargeInt 转为十进制字符串。

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
 1 string LargeInt::toString() const
 2 {
 3     int len = this->_data.size();
 4     int shift = 0;
 5     char *buff = new char[len * VAL_LEN + 1];
 6 
 7     if (len > 0)
 8         shift += sprintf(buff + shift, "%d", this->_data[len - 1]);
 9 
10     for (int idx = len - 2; idx >= 0; --idx)
11     {
12         shift += sprintf(buff + shift, FORMAT_STR,  this->_data[idx]);
13     }
14     buff[shift] = '\0';
15 
16     string retStr(buff);
17     delete[] buff;
18 
19     return retStr;
20 }
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

 

## 4、性能测试

　　为了测试加法的性能，定义了两种测试用例：10位加10位、10位加5位（此处的位长指队列长度，对应十进制的位数是其9倍），每种测试用例有100个，运行1000次，求平均运行时长。对于减法乘法和除法，测试方法与加法相同。

　　在个人电脑上的测试结果如下：

| 运算 | A位长 | B位长 | 总时长(ms) | 平均时长(ms) |
| ---- | ----- | ----- | ---------- | ------------ |
| add  | 10    | 10    | 891        | 0.0089       |
| add  | 10    | 5     | 800        | 0.0080       |
| sub  | 10    | 10    | 946        | 0.0095       |
| sub  | 10    | 5     | 811        | 0.0081       |
| mul  | 10    | 10    | 2742       | 0.0274       |
| mul  | 10    | 5     | 1658       | 0.0166       |
| div  | 10    | 10    | 1694       | 0.0169       |
| div  | 10    | 5     | 5868       | 0.0587       |
| div  | 10    | 2     | 6458       | 0.0646       |

 

 

 

　　

 

 

 

 

　　

　　结论：

- 加法和减法效率已经比较高了，算法上基本没法进一步优化；
- 以加法为参考，10位 乘 5位的时长是加法的2倍，10位 乘 10位的时长是加法的3倍。乘法结果的位数是乘数和被乘数两者位数的乘积，因此随位数增加，乘法消耗的时长和对应的加法消耗的时长的比值会更大；
- 除法时长增长规律似乎与乘法相反，除法对被除数和除数间的位数差值更敏感，差值越大，耗时越大。

 

## 5、完整代码

　　工程使用gtest测试，分为五个文件，main.cpp、testcase.cpp、large_int.h、large_int.cpp、performance_test.cpp。

　　在Debug模式下跑gtest测试用例，在Release下跑性能测试.

　　main.cpp 入口函数

![img](https://images.cnblogs.com/OutliningIndicators/ExpandedBlockStart.gif)

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
 1 #ifdef _DEBUG
 2 #include "gtest\gtest.h"
 3 #else
 4 extern void TESTCASES();
 5 #endif
 6 
 7 int main(int argc, char **argv)
 8 {
 9 #ifdef _DEBUG
10     ::testing::InitGoogleTest(&argc, argv);
11 
12     return RUN_ALL_TESTS();
13 #else
14     TESTCASES();
15     return 0;
16 #endif
17 }
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

　　testcase.cpp 测试用例

![img](https://images.cnblogs.com/OutliningIndicators/ExpandedBlockStart.gif)

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
  1 #ifdef _DEBUG
  2 #include "gtest\gtest.h"
  3 #include "large_int.h"
  4 
  5 TEST(testLargeIntCreate, normalTest)
  6 {
  7     ASSERT_TRUE(LargeInt().toString() == "");
  8     ASSERT_TRUE(LargeInt(123456789).toString() == "123456789");
  9     ASSERT_TRUE(LargeInt(1234567890).toString() == "1234567890");
 10     ASSERT_TRUE(LargeInt("").toString() == "");
 11     ASSERT_TRUE(LargeInt("123456789").toString() == "123456789");
 12     ASSERT_TRUE(LargeInt("01234567890123456789").toString() == "1234567890123456789");
 13 }
 14 
 15 TEST(testLargeIntCompare, normalTest)
 16 {
 17     ASSERT_TRUE(LargeInt() == LargeInt());
 18     ASSERT_TRUE(LargeInt(0) != LargeInt(1));
 19     ASSERT_TRUE(LargeInt(1) > LargeInt(0));
 20 
 21     ASSERT_TRUE(LargeInt("123") == LargeInt("00123"));
 22 }
 23 
 24 TEST(testLargeIntAdd, normalTest1)
 25 {
 26     ASSERT_TRUE(LargeInt(0) + LargeInt(1) == LargeInt(1));
 27     ASSERT_TRUE(LargeInt(1234567890) + LargeInt(987654) == LargeInt(1235555544));
 28 }
 29 
 30 TEST(testLargeIntSub, normalTest1)
 31 {
 32     ASSERT_TRUE(LargeInt(1) - LargeInt(0) == LargeInt(1));
 33     ASSERT_TRUE(LargeInt(1235555544) - LargeInt(987654) == LargeInt(1234567890));
 34     ASSERT_TRUE(LargeInt(1235555544) - LargeInt(1234567890) == LargeInt(987654));
 35 }
 36 
 37 TEST(testLargeIntMul, normalTest1)
 38 {
 39     ASSERT_TRUE(LargeInt(1) * LargeInt(2) == LargeInt(2));
 40     ASSERT_TRUE(LargeInt(1234567890) * LargeInt(987654) == LargeInt("1219325914830060"));
 41     ASSERT_TRUE(LargeInt(987654) * LargeInt(1234567890) == LargeInt("1219325914830060"));
 42 }
 43 
 44 TEST(testLargeIntDiv, normalTest1)
 45 {
 46     ASSERT_TRUE(LargeInt(2) / LargeInt(1) == LargeInt(2));
 47     ASSERT_TRUE(LargeInt("1219325914830060") / LargeInt(1234567890) == LargeInt(987654));
 48     ASSERT_TRUE(LargeInt("1219325914830060") / LargeInt(987654) == LargeInt(1234567890));
 49     ASSERT_TRUE(LargeInt("1219325914830060") / LargeInt("1") == LargeInt("1219325914830060"));
 50     ASSERT_TRUE(LargeInt("315649816498164761562056488065489561036849876300254661") / LargeInt("0") == LargeInt(""));
 51     ASSERT_TRUE(LargeInt("315649816498164761562056488065489561036849876300254661") / LargeInt("1") == LargeInt("315649816498164761562056488065489561036849876300254661"));
 52     ASSERT_TRUE(LargeInt("") / LargeInt("") == LargeInt(""));
 53 }
 54 
 55 TEST(testLargeIntDiv, normalTest2)
 56 {
 57     ASSERT_TRUE(LargeInt("5771407372029240318234918769074928346012") / LargeInt("88600804714227639518236226216544031864193185501762199697998648353080551114468153926153476586326110308587136") == LargeInt("0"));
 58     ASSERT_TRUE(LargeInt("86517999162161442275630671648031880106681829550207222443864942785882305051593331018") / LargeInt("92784489371679693896011626721067864399494212548") == LargeInt("932461877497480177723099247832540125"));
 59     ASSERT_TRUE(LargeInt("7452464276750321702493111013349") / LargeInt("1691069677086548941024287914045300") == LargeInt("0"));
 60     ASSERT_TRUE(LargeInt("39126233141319697") / LargeInt("39247468109") == LargeInt("996911"));
 61     ASSERT_TRUE(LargeInt("260760308125074369577052553327091650455482488406492128") / LargeInt("359820851804638176889423035658937419652176134850361859042442112184596932067634831981014124727203911802681627425096713427") == LargeInt("0"));
 62     ASSERT_TRUE(LargeInt("6112435324966506064570331172358506215515607647088966152812690934059848961954702827845514023740219693481540") / LargeInt("16132532035593248041374031018571940156842057907677") == LargeInt("378888776509516538518217640286380617979148875499877634662"));
 63     ASSERT_TRUE(LargeInt("4652316645911451791399270652548162466491047877615822692") / LargeInt("752616397804112782483169091889203793604103247020848592864478682336470024721325") == LargeInt("0"));
 64     ASSERT_TRUE(LargeInt("564227712194") / LargeInt("36729908146697974827109432921186119077193508128355122726793557795821315080158543758040997655814032206509053793089") == LargeInt("0"));
 65     ASSERT_TRUE(LargeInt("73942536735349682569697696219734638132884663907054271074402588934844449") / LargeInt("19125809940929") == LargeInt("3866112701303883388385610431927381478602318815755873651360"));
 66     ASSERT_TRUE(LargeInt("2773610310610919425989526619737413018719283112030019881088699") / LargeInt("4285419584643941008611282030146") == LargeInt("647220244325589885824553576213"));
 67 }
 68 
 69 TEST(testLargeIntDiv, normalTest3)
 70 {
 71     ASSERT_TRUE(LargeInt("704865338624394382272776408227033493410663998053146095734055455880148569586734302377805071905798581468722348604877637") / LargeInt("48443504153083479608650835114105853250884581048823079352234864762972433486592422877442805420") == LargeInt("14550255002135904895579700"));
 72     ASSERT_TRUE(LargeInt("3147804268621699538463106442873262322142098173466") / LargeInt("6701714287460797892664054723203289611721113586427753621598110771215403996305408") == LargeInt("0"));
 73     ASSERT_TRUE(LargeInt("533441422272578460105344004853") / LargeInt("2067146826137257621650206") == LargeInt("258056"));
 74     ASSERT_TRUE(LargeInt("663916971031702719672432677002925971483620082003097366152521753065894928266894332445891248126115791644") / LargeInt("2726934397750611921720477934640314573680217197553469600592449601089515122486850692817840") == LargeInt("243466425734096"));
 75     ASSERT_TRUE(LargeInt("38339188986966520963244960964926821432812632621548335") / LargeInt("30440718507215357299019428344182127252400138739924680739029771075487351333790733699667936933609691") == LargeInt("0"));
 76     ASSERT_TRUE(LargeInt("47322015558252917918393288914214682949548046600583134672091671337272567652880101918548154599841268706581886880821") / LargeInt("76301852271271237074540878367968578386") == LargeInt("620194846515807960687442484954480625526827732150433737232753668237063779212"));
 77     ASSERT_TRUE(LargeInt("21641596738200891968282691684302784908014") / LargeInt("12028079489532183796244270970671869925088612333677822688743938759474588850680003367941542010151") == LargeInt("0"));
 78     ASSERT_TRUE(LargeInt("796766865550169096560516284897603460154284304648254171762156350404") / LargeInt("360697418184587195162993") == LargeInt("2208961931472498118653514468562337093460298"));
 79     ASSERT_TRUE(LargeInt("33426095101762274449") / LargeInt("7388672737697171228") == LargeInt("4"));
 80     ASSERT_TRUE(LargeInt("81237333042987295152552131565999362") / LargeInt("47512317132402936274332303") == LargeInt("1709816273"));
 81 }
 82 
 83 TEST(testLargeIntDiv, normalTest4)
 84 {
 85     ASSERT_TRUE(LargeInt("2800569754") / LargeInt("6123275045108958834057384559367434032481031208604782143641525738") == LargeInt("0"));
 86     ASSERT_TRUE(LargeInt("900373738483820798204777890996976210268176046573550399317747683076356239250429") / LargeInt("39211253604642362946698119092720702238705543") == LargeInt("22962125811178408133361560214059440"));
 87     ASSERT_TRUE(LargeInt("609557457783523836625248668562721981414785307260197627916270966727315517268669913204610") / LargeInt("45321827893309293041034544296205762856483293") == LargeInt("13449533836509509499726603201755275176151020"));
 88     ASSERT_TRUE(LargeInt("594792388616051623027324834071768438801779709909888962455559917936") / LargeInt("7843770306430882483574484") == LargeInt("75829909007967557318314037425929084923345"));
 89     ASSERT_TRUE(LargeInt("87871398030848818") / LargeInt("98943778362788460") == LargeInt("0"));
 90     ASSERT_TRUE(LargeInt("2659539449974710848847") / LargeInt("90443547066875799226136362196137") == LargeInt("0"));
 91     ASSERT_TRUE(LargeInt("268676348279466618491277535821242236960130139853998425564129325898290391931479021") / LargeInt("67542171957015423690676") == LargeInt("3977905070190149978181229942402053772326386150125902805000"));
 92     ASSERT_TRUE(LargeInt("5743821334154101018471252397095050988706839852396827280028917300893722693715100017783950135038043074136696896336104") / LargeInt("1408692792693124795155896620060262") == LargeInt("4077412310155375201372278154419973269005820816361982033632263522865654348051255995"));
 93     ASSERT_TRUE(LargeInt("38441386301386") / LargeInt("7342111806861590326088835690347416967993540365577325333497233766") == LargeInt("0"));
 94     ASSERT_TRUE(LargeInt("8255056869530927606655621499839509703906575950246053883406101") / LargeInt("3631309697373546485949249056400419245502065455198400") == LargeInt("2273300147"));
 95 }
 96 
 97 TEST(testLargeIntDiv, normalTest5)
 98 {
 99     ASSERT_TRUE(LargeInt("738612695655984494211410757235215") / LargeInt("1495925056282380554369610992920478154") == LargeInt("0"));
100     ASSERT_TRUE(LargeInt("5848046342829320492465507195") / LargeInt("2582603117105029375162674061842797949972845465782999") == LargeInt("0"));
101     ASSERT_TRUE(LargeInt("98467618665332510540119000511") / LargeInt("22280688233711203787935085105780301424325745929883508089743640333950433821179528077423248864594234104310968762436") == LargeInt("0"));
102     ASSERT_TRUE(LargeInt("720654000846239842873795832997458705165392418910291679803671408876752") / LargeInt("12943741007877663109413184280886753447253262715330619623115789976041978328836902191972086846624") == LargeInt("0"));
103     ASSERT_TRUE(LargeInt("4231069776910344337623300672941722760087549704483103520951615397") / LargeInt("61625220852205625557100461923903403874280") == LargeInt("68658087036436321447343"));
104     ASSERT_TRUE(LargeInt("81413298636418836476186442048628164053634310097093982655611744774") / LargeInt("564794106312763377787456") == LargeInt("144146862947849134819320617426109745191703"));
105     ASSERT_TRUE(LargeInt("71822398303319913968848112930034454742292826602971749771648014802990574010001546628716186769713962647514785421592502") / LargeInt("759450731382742168380575833340013843728240576207623004670520645582947534756890833088619505") == LargeInt("94571504556394207023181187"));
106     ASSERT_TRUE(LargeInt("98244262007299349463460429641741786584502163992685") / LargeInt("6265087511835") == LargeInt("15681227408509781081867918131683711599"));
107     ASSERT_TRUE(LargeInt("59639146785528888716800570863169225184988657729815686411622853296210122722147889332673905027554768") / LargeInt("101229809824931784345916358737044308312292947145133568596119734700106936639") == LargeInt("589146091340778409911155"));
108     ASSERT_TRUE(LargeInt("941621733308422136452922956186297834565616885326929804626695139632902347095888256") / LargeInt("6387977038168237122453945709019496121631636799777354580303640348338774114313372982330993069511") == LargeInt("0"));
109 }
110 
111 TEST(testLargeIntDiv, normalTest6)
112 {
113     ASSERT_TRUE(LargeInt("4695379722295046092140948224624212100839793519540346054539320126529082553586539886817996007092") / LargeInt("69855455693737606115919834680911297316773115253488049697603242223773") == LargeInt("67215648021547112392906055"));
114     ASSERT_TRUE(LargeInt("61484404806034244889130893340929117381987673760304526663915868953377824406618049320670791401588077418233250") / LargeInt("4956795506826393") == LargeInt("12404063214098551088672317201521432938627824084751149956971033431813045461513088137994814820"));
115     ASSERT_TRUE(LargeInt("4496247431271964310021813") / LargeInt("586873483795989") == LargeInt("7661357269"));
116     ASSERT_TRUE(LargeInt("516675751149105686299692196909088418531029427260702711373442788529613163925359739371865064811") / LargeInt("283998640091722280896364132071658772951731") == LargeInt("1819289525408418510096978786725927436731308619861889"));
117     ASSERT_TRUE(LargeInt("60657195093622815019887037463569636458795140243138955447412016310990") / LargeInt("9052213119314103873254702534964250197810069921140160") == LargeInt("6700813855586607"));
118     ASSERT_TRUE(LargeInt("293215490848326662027577683375648317733914918727142836496455748108041298647627576032160340387960580450211602") / LargeInt("235064028199929519902180095527510223024570034461978274153518345758335373") == LargeInt("1247385629752492167530981595619406589"));
119     ASSERT_TRUE(LargeInt("88134202139089023565275760813073739524770100") / LargeInt("7174771836490484223016167118116230814565179153915877535247649934967112624") == LargeInt("0"));
120     ASSERT_TRUE(LargeInt("608027402556183061035745628892228781671535556614421033215275518752780717667451140223694295689113231") / LargeInt("968624255415523") == LargeInt("627722668678526798380077874520026016711042184332456811805626390122629567194273629431"));
121     ASSERT_TRUE(LargeInt("2674850779357212992207113543873370713") / LargeInt("41953788780339570147675551208220456300287935443755919597153593") == LargeInt("0"));
122     ASSERT_TRUE(LargeInt("887883652712506750767384460578536549469099744255942115248209357236673135442924807847449705442225697540251295") / LargeInt("18704291922527686261360590853930130525050877062184488672") == LargeInt("47469514290628047023204485591829584822486359868894494"));
123 }
124 
125 TEST(testLargeIntDiv, normalTest7)
126 {
127     ASSERT_TRUE(LargeInt("26787587205084236733416232427601940899169428450768") / LargeInt("805858937691762492586978829618675016270326429832125376979039577304547051225105473432342568101360601327528682594468") == LargeInt("0"));
128     ASSERT_TRUE(LargeInt("8701661031281006566871992148451339388573649943927994533562226287636") / LargeInt("76965013527859047716562998548") == LargeInt("113059955847747156726960078907962543374"));
129     ASSERT_TRUE(LargeInt("765034867020933520016502061925983222654895253334785973821852515389028734830305947870540335028612440318324953974747796552") / LargeInt("3873906237775822511883961076429300262859912719404698847614850803969237128461467601730527994019") == LargeInt("197484094880978120449230459"));
130     ASSERT_TRUE(LargeInt("79453616781563522477372184844511811203527212772891839013624046597302207412492900362130785") / LargeInt("970938975897980655517698627562270352759878882091287283632") == LargeInt("81831730679139964815986823207646"));
131     ASSERT_TRUE(LargeInt("5118711171640761647894458057266687691887276990318970648649472365223955338982372362") / LargeInt("17621450820110639774608209323") == LargeInt("290481823766689308524548035487260294127119383348986134"));
132     ASSERT_TRUE(LargeInt("92055727755987898851291640872769408306020457504071290203038921168149086410376191496412") / LargeInt("227138746905176148210569381321800127947265") == LargeInt("405284122635485439341128068995224199761041857"));
133     ASSERT_TRUE(LargeInt("7230529292786944129696239311992204269183851679") / LargeInt("867132069774") == LargeInt("8338440642232770510772188886321225"));
134     ASSERT_TRUE(LargeInt("5198773966507") / LargeInt("5382400903036673761038883698002376083326489061524424445000655267426556154401") == LargeInt("0"));
135     ASSERT_TRUE(LargeInt("114613396919415398962042153744137828044") / LargeInt("2980964652531915359500776391711649016209754427098852834") == LargeInt("0"));
136     ASSERT_TRUE(LargeInt("623687919038534585044559149842893494492368596100115393226963330659345725817686741") / LargeInt("522410572857961329946216115534635194609348083834") == LargeInt("1193865422031015520455486671483310"));
137 }
138 
139 TEST(testLargeIntDiv, normalTest8)
140 {
141     ASSERT_TRUE(LargeInt("73246660690753668993") / LargeInt("73300729471129134498681979604788429985246646541119976254138344705096291991532556768362492") == LargeInt("0"));
142     ASSERT_TRUE(LargeInt("9387848494929128204819086064249456644190832432754376780163907192908363161880676202881032628") / LargeInt("87327749981068958761614630215021173745331324409618486436051") == LargeInt("107501321137487684595718706253852"));
143     ASSERT_TRUE(LargeInt("9110025001677584787039035364386547823011292335964452207440137904186710251483643644812839587697840873066774125612048429") / LargeInt("58437403000381540054706963033131798800352518003615") == LargeInt("155893734730444901580611113632859033812335047255679841243617014926838"));
144     ASSERT_TRUE(LargeInt("8493752049998168511687326056849631056294881889084737698859912077956720556688293440549872684782255519672405746764420") / LargeInt("3558658488006195556848242045077295701827381222107693895") == LargeInt("2386784817544251256813972094452013047154903710531054294766669"));
145     ASSERT_TRUE(LargeInt("300183794001579382762808102556746325811520734838575525256201705084146619030526466236340922863") / LargeInt("1896937480711031479379928559177894379356061457865584461772645983") == LargeInt("158246540570784183627394794333"));
146     ASSERT_TRUE(LargeInt("68592992713988607999976576679990114822738581407272347702145094768880258264085770") / LargeInt("3343501329032225954490748200") == LargeInt("20515317914900545355365031605054885219356760993108694"));
147     ASSERT_TRUE(LargeInt("2841356663246170704054106642990087404370663570613343109396388893035317057142907209") / LargeInt("53792241702195795801549400442983438975269758493640912621163") == LargeInt("52820937989096422248261"));
148     ASSERT_TRUE(LargeInt("50130864980323128200489075250548513693048113") / LargeInt("8022242866747053300092772953251633357944649109229733537476039207384578403281942") == LargeInt("0"));
149     ASSERT_TRUE(LargeInt("3610180500492018830321163184555711") / LargeInt("779950316330650720516531171399804777237487939725638653408032") == LargeInt("0"));
150     ASSERT_TRUE(LargeInt("2109556426283916746936641605482444710088881669550032459471194083609884007895356410469467211314520584094") / LargeInt("51602670084783190042501204418092843497578497037940764109198259558218810776955337") == LargeInt("40880761069493408230614"));
151 }
152 
153 TEST(testLargeIntDiv, normalTest9)
154 {
155     ASSERT_TRUE(LargeInt("606066884162701513841144447624999911067532416134950676187608803893") / LargeInt("8787261914316795738751070530062870771150779971426405540784910576990904631649937780331098779348732980104276885") == LargeInt("0"));
156     ASSERT_TRUE(LargeInt("55076205704") / LargeInt("3886656197892329008739713443092839913153629457302356145894271") == LargeInt("0"));
157     ASSERT_TRUE(LargeInt("65102437201973867991838479493") / LargeInt("1755849599363311478533231034754853891882") == LargeInt("0"));
158     ASSERT_TRUE(LargeInt("442169799531947156986332474711783113744594861813729435259292061277034811914708525436302783384") / LargeInt("4700941075356504284012914416096991920417656003222409927052667249920786670") == LargeInt("94059847261202783420"));
159     ASSERT_TRUE(LargeInt("27341601457232925391059616442568331936051969683424054807060838242694680625974861637657298296898465019") / LargeInt("532158700670988824849810404932780") == LargeInt("51378660957264098196624699104229597155632307362411267570222067930992"));
160     ASSERT_TRUE(LargeInt("833336302580496842500606085293680281040621753811931") / LargeInt("338675846296742") == LargeInt("2460571994408900916233985017073154662"));
161     ASSERT_TRUE(LargeInt("752675935102082169822420026239580080621485489366872080950292238") / LargeInt("1055806251528339485333826844156827940413035143030002095591674415471526656352998814572647983022148572273909862") == LargeInt("0"));
162     ASSERT_TRUE(LargeInt("221973543185275654607287571085221823358404542918454852480854961850136") / LargeInt("91568484023786030621545541603471350118674601076097483630026825563529017246639373414779538563277116128555900") == LargeInt("0"));
163     ASSERT_TRUE(LargeInt("405669814815211303756213") / LargeInt("56302165887829411204481567601133599404688429376688472316234968994708556484588") == LargeInt("0"));
164     ASSERT_TRUE(LargeInt("149003582383973139739337064399068303") / LargeInt("6685319525498145460454161166077708443960797042252197327") == LargeInt("0"));
165 }
166 
167 TEST(testLargeIntDiv, normalTest10)
168 {
169     ASSERT_TRUE(LargeInt("401063385474183395266507624033732481128110352068875280254496636325161402875332201514419") / LargeInt("72397423219337951422528779551027419584704560464597735706394653427785446854808090149800") == LargeInt("5"));
170     ASSERT_TRUE(LargeInt("12508440204466642628381354678543988473793747323742598075") / LargeInt("81072577413992431681447773360894254051791079968514050509302018385625720313742823902515064662733") == LargeInt("0"));
171     ASSERT_TRUE(LargeInt("783580083133626974884111296456629080987478130042698326216259146832470868467584088163604162543204875084490") / LargeInt("38643857093485267686896492370408122869150726") == LargeInt("20276963586684155417133704303909210506491068505530318126637523"));
172     ASSERT_TRUE(LargeInt("12726321349195554444073790643369391011577") / LargeInt("76101742247971669066966278551089890903691089322501036404019493193691526983921541517651248616425617430117085661") == LargeInt("0"));
173     ASSERT_TRUE(LargeInt("2253369462105551543163314517179160714665878998383581") / LargeInt("17440202970304776651124997469940262257822542221388232924275963633019453776075264210770998193137362") == LargeInt("0"));
174     ASSERT_TRUE(LargeInt("194194839787613026767067710746128419438060643901327893878953132275612648866207609080197758483262703") / LargeInt("54660822470957") == LargeInt("3552724437887754115237504037100269561212032123512392131350082354622693258805508998619"));
175     ASSERT_TRUE(LargeInt("58985804863537114803941430598318767836362723717397638890829099335505268617522080") / LargeInt("525917016422428588935247") == LargeInt("112158007863655747933261387572838666930884825279444892169"));
176     ASSERT_TRUE(LargeInt("5610878553236374285215549323734709077587945353906901190721730267141963149509044280337398204136715065900543829556") / LargeInt("53273122960305157047222624061252795333059317232119449053592793048559175147546287309435377497378123091586344577510757530") == LargeInt("0"));
177     ASSERT_TRUE(LargeInt("30300279111331404") / LargeInt("182931031051451755210448553320358857748952282432559400988533230879239246675173617415829") == LargeInt("0"));
178     ASSERT_TRUE(LargeInt("99733204448654448233715187036878702893855322615576179131575795026") / LargeInt("259565314683835278965501") == LargeInt("384231631911740345391374333012518775372497"));
179 }
180 
181 TEST(testLargeIntDiv, normalTest11)
182 {
183     ASSERT_TRUE(LargeInt("333231077210047599771085519448") / LargeInt("5608571765465505680958411670117433991138706877433395409023614267946392699399352296663520859856663235141602232736280") == LargeInt("0"));
184     ASSERT_TRUE(LargeInt("2020820922622759444978814826837802103037186972369493992340444771896851672347891303335755948453759632281160437") / LargeInt("209985444325785714054809684646028563064116") == LargeInt("9623623814075037929369559344501970321571320618365454516501356581188"));
185     ASSERT_TRUE(LargeInt("98382405664100114346") / LargeInt("8970868969877941079446791280588192393635523811659295682760895917831") == LargeInt("0"));
186     ASSERT_TRUE(LargeInt("665029397401311593210276307516383092187424115661200215509356403993353508265897875282898998112670452838482455288244025") / LargeInt("897673459426866808318829079262") == LargeInt("740836648803128997768516341091076110457765357038554891657228562815516387444279506222662"));
187     ASSERT_TRUE(LargeInt("9061222371996138741965069") / LargeInt("72821209423209528696266478534390038249339717925224418475559360419916108562442") == LargeInt("0"));
188     ASSERT_TRUE(LargeInt("1666777241945632171746951940232958723689282108925174424853988644703060521688183671227818283832") / LargeInt("84469483571392908675187927499360747283565074292242") == LargeInt("19732300606962819141219208262989471003267345"));
189     ASSERT_TRUE(LargeInt("368634866274112561845087056272133217874022144416119042765629517901635606363384757122126629") / LargeInt("966885574298174") == LargeInt("381260074690524569078237776471157430995563957588271717533872510541449762498"));
190     ASSERT_TRUE(LargeInt("772352041964653374217938449284454083857011273998692672427712468385448831978157161847610019013301") / LargeInt("7736931852521419011990453551585022914465356446344779110489221702958900745") == LargeInt("99826656960012972513841"));
191     ASSERT_TRUE(LargeInt("850059694090103437262831771353068368716506985760821199151920767105288023") / LargeInt("181879074580204383358603425792459880013666540119192539") == LargeInt("4673763026627052447"));
192     ASSERT_TRUE(LargeInt("190109179836040093361049842933718100267078") / LargeInt("8629648362998536865372807715204058247036698842346515005831141532352209040521024477855515906342885") == LargeInt("0"));
193 }
194 
195 #endif
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

　　large_int.h 大数类定义

![img](https://images.cnblogs.com/OutliningIndicators/ExpandedBlockStart.gif)

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
 1 #ifndef _LARGE_INT_H
 2 #define _LARGE_INT_H
 3 
 4 #include <iostream>
 5 #include <vector>
 6 #include <string>
 7 
 8 typedef unsigned int uint;
 9 typedef unsigned long long uint64;
10 
11 #define MAX_VAL 1000000000 // 10亿
12 #define VAL_LEN 9
13 #define FORMAT_STR "%09d"
14 
15 class LargeInt
16 {
17 private:
18     std::vector<uint>  _data;
19 
20     bool checkValStr(const std::string &valStr);
21     int compare(const LargeInt &li) const;
22     void arrange();
23 
24     static uint estimateQuotient(const LargeInt &liA, const LargeInt &liB);
25     static uint getMaxCycle(const LargeInt &liA, const LargeInt &liB);
26 
27 public:
28     LargeInt();
29     LargeInt(uint val);
30     LargeInt(const std::string &valStr);
31 
32     // 四则运算符重载
33     LargeInt operator+(const LargeInt &li) const;
34     LargeInt operator-(const LargeInt &li) const;
35     LargeInt operator*(const LargeInt &li) const;
36     LargeInt operator/(const LargeInt &li) const;
37 
38     // 比较运算符重载
39     bool operator==(const LargeInt &li) const;
40     bool operator!=(const LargeInt &li) const;
41     bool operator<(const LargeInt &li) const;
42     bool operator>(const LargeInt &li) const;
43     bool operator<=(const LargeInt &li) const;
44     bool operator>=(const LargeInt &li) const;
45 
46     // 字符串格式化输出
47     std::string toString() const;
48 };
49 
50 #endif
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

　　large_int.cpp 大数类实现

![img](https://images.cnblogs.com/OutliningIndicators/ExpandedBlockStart.gif)

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
  1 #include "large_int.h"
  2 
  3 using namespace std;
  4 
  5 #ifndef MIN
  6 #define MIN(a,b) ((a) > (b) ? (b) : (a))
  7 #endif
  8 
  9 #ifndef MAX
 10 #define MAX(a,b) ((a) > (b) ? (a) : (b))
 11 #endif
 12 
 13 inline bool isDigit(const char ch)
 14 {
 15     return ch >= '0' && ch <= '9';
 16 }
 17 
 18 LargeInt::LargeInt() {}
 19 
 20 LargeInt::LargeInt(uint val)
 21 {
 22     this->_data.push_back(val % MAX_VAL);
 23     if (val >= MAX_VAL)
 24         this->_data.push_back(val / MAX_VAL);
 25 }
 26 
 27 // 字符串合法性检查，只允许出现字符 0~9
 28 bool LargeInt::checkValStr(const string &valStr)
 29 {
 30     for (auto it = valStr.begin(); it != valStr.end(); ++it)
 31     {
 32         if (!isDigit(*it)) return false;
 33     }
 34     return true;
 35 }
 36 
 37 // 字符串构造
 38 //  valStr：十进制字符串
 39 LargeInt::LargeInt(const string &valStr)
 40 {
 41     if (checkValStr(valStr))
 42     {
 43         int len = valStr.length();
 44         // 按长度9截取子串
 45         while (len >= VAL_LEN)
 46         {
 47             string s = valStr.substr(len - VAL_LEN, VAL_LEN);
 48             this->_data.push_back(stoi(s));
 49             len -= VAL_LEN;
 50         }
 51         // 残留子串
 52         if (len > 0)
 53         {
 54             string s = valStr.substr(0, len);
 55             this->_data.push_back(stoi(s));
 56         }
 57     }
 58 
 59     this->arrange(); // 去零
 60 }
 61 
 62 // 去零操作，避免整数队列的高位存在多余的零
 63 void LargeInt::arrange()
 64 {
 65     int idx = this->_data.size();
 66 
 67     // 注意，如果队列中全为0，要保留最低位的0
 68     while (--idx >= 1)
 69     {
 70         if (this->_data[idx] > 0) break;
 71 
 72         this->_data.pop_back();
 73     }
 74 }
 75 
 76 // 比较函数，0 相等，1 大于，-1 小于
 77 int LargeInt::compare(const LargeInt &li) const
 78 {
 79     int len1 = this->_data.size();
 80     int len2 = li._data.size();
 81 
 82     // step1: 比较长度
 83     if (len1 != len2)
 84         return (len1 > len2) ? 1 : -1;
 85 
 86     // step2: 由高位到低位比较值
 87     for (int idx = len1 - 1; idx >= 0; --idx)
 88     {
 89         if (this->_data[idx] == li._data[idx]) continue;
 90         return this->_data[idx] > li._data[idx] ? 1 : -1;
 91     }
 92 
 93     return 0;
 94 }
 95 
 96 bool LargeInt::operator==(const LargeInt &li) const
 97 {
 98     return compare(li) == 0;
 99 }
100 
101 bool LargeInt::operator!=(const LargeInt &li) const
102 {
103     return compare(li) != 0;
104 }
105 
106 bool LargeInt::operator<(const LargeInt &li) const
107 {
108     return compare(li) < 0;
109 }
110 
111 bool LargeInt::operator>(const LargeInt &li) const
112 {
113     return compare(li) > 0;
114 }
115 
116 bool LargeInt::operator<=(const LargeInt &li) const
117 {
118     return compare(li) <= 0;
119 }
120 
121 bool LargeInt::operator>=(const LargeInt &li) const
122 {
123     return compare(li) >= 0;
124 }
125 
126 LargeInt LargeInt::operator+(const LargeInt &li) const
127 {
128     int         len1 = this->_data.size();
129     int         len2 = li._data.size();
130 
131     int         minLen = MIN(len1, len2);
132     int         maxLen = MAX(len1, len2);
133     const LargeInt &extraLi = (len1 > len2) ? (*this) : li;
134 
135     uint        value = 0;  // 和，不超过最大值的2倍
136     uint        carry = 0;  // 进位
137     LargeInt    retVal;
138 
139     for (int idx = 0; idx < minLen; ++idx)
140     {
141         value = this->_data[idx] + li._data[idx] + carry;
142 
143         if (value >= MAX_VAL)
144         {
145             retVal._data.push_back(value - MAX_VAL);
146             carry = 1;
147         }
148         else
149         {
150             retVal._data.push_back(value);
151             carry = 0;
152         }
153     }
154 
155     for (int idx = minLen; idx < maxLen; ++idx)
156     {
157         value = extraLi._data[idx] + carry;
158 
159         if (value >= MAX_VAL)
160         {
161             retVal._data.push_back(value - MAX_VAL);
162             carry = 1;
163         }
164         else
165         {
166             retVal._data.push_back(value);
167             carry = 0;
168         }
169     }
170 
171     if (carry > 0)
172         retVal._data.push_back(carry);
173 
174     //retVal.arrange(); // 去0操作
175     return retVal;
176 }
177 
178 LargeInt LargeInt::operator-(const LargeInt &li) const
179 {
180     if (*this <= li)
181     {
182         return LargeInt(0);
183     }
184 
185     int         len1 = this->_data.size();
186     int         len2 = li._data.size();
187 
188     uint        value = 0;  // 差
189     uint        carry = 0;  // 借位
190     LargeInt    retVal;
191 
192     for (int idx = 0; idx < len2; ++idx)
193     {
194         if (this->_data[idx] < li._data[idx] + carry) // 注意细节，carry放在右侧，避免出现差值为负数的情况
195         {
196             value = this->_data[idx] + MAX_VAL - carry - li._data[idx];
197             carry = 1;
198         }
199         else
200         {
201             value = this->_data[idx] - carry - li._data[idx];
202             carry = 0;
203         }
204 
205         retVal._data.push_back(value);
206     }
207 
208     for (int idx = len2; idx < len1; ++idx)
209     {
210         if (this->_data[idx] < carry)
211         {
212             value = this->_data[idx] + MAX_VAL - carry;
213             carry = 1;
214         }
215         else
216         {
217             value = this->_data[idx] - carry;
218             carry = 0;
219         }
220         retVal._data.push_back(value);
221     }
222 
223     retVal.arrange();
224     return retVal;
225 }
226 
227 LargeInt LargeInt::operator*(const LargeInt &li) const
228 {
229     int         len1 = this->_data.size();
230     int         len2 = li._data.size();
231 
232     if (len1 < len2) return li.operator*(*this); // 优化，保证被乘数位数大于乘数
233 
234     uint64      value;      // 积
235     uint64      carry = 0;  // 进位
236     LargeInt    retVal(0);
237     LargeInt    mulTemp;
238 
239     for (int idx2 = 0; idx2 < len2; ++idx2)
240     {
241         mulTemp._data.clear();
242         carry = 0;
243 
244         // 补零
245         for (int tmpIdx = 0; tmpIdx < idx2; ++tmpIdx)
246             mulTemp._data.push_back(0);
247 
248         for (int idx1 = 0; idx1 < len1; ++idx1)
249         {
250             value = (uint64)(li._data[idx2]) * (uint64)(this->_data[idx1]) + carry;
251 
252             mulTemp._data.push_back((uint)(value % MAX_VAL));
253             carry = value / MAX_VAL;
254         }
255 
256         if (carry)
257             mulTemp._data.push_back((uint)carry);
258         
259         retVal = retVal + mulTemp;
260     }
261 
262     return retVal;
263 }
264 
265 LargeInt LargeInt::operator/(const LargeInt &li) const
266 {
267     if (li._data.empty() || li == 0) return LargeInt("");
268     if (*this < li) return LargeInt(0);
269 
270     int         len1 = this->_data.size();
271     int         len2 = li._data.size();
272 
273     uint        value;
274     LargeInt    retVal;
275     LargeInt    divTemp;
276 
277     for (int idx = len1 - len2 + 1; idx < len1; ++idx)
278     {
279         divTemp._data.push_back(this->_data[idx]);
280     }
281 
282     // len1 >= len2
283     for (int idx = len1 - len2; idx >= 0; --idx)
284     {
285         divTemp._data.insert(divTemp._data.begin(), this->_data[idx]);
286         divTemp.arrange();
287 
288         value = getMaxCycle(divTemp, li); // 商
289 
290         divTemp = divTemp - li * value;   // 余数  
291 
292         retVal._data.insert(retVal._data.begin(), value); // 除法是由高位向低位进行，所以插入位置在begin
293     }
294 
295     retVal.arrange();
296     return retVal;
297 }
298 
299 string LargeInt::toString() const
300 {
301     int len = this->_data.size();
302     int shift = 0;
303     char *buff = new char[len * VAL_LEN + 1];
304 
305     if (len > 0)
306         shift += sprintf(buff + shift, "%d", this->_data[len - 1]);
307 
308     for (int idx = len - 2; idx >= 0; --idx)
309     {
310         shift += sprintf(buff + shift, FORMAT_STR, this->_data[idx]);
311     }
312     buff[shift] = '\0';
313 
314     string retStr(buff);
315     delete[] buff;
316 
317     return retStr;
318 }
319 
320 // 计算商值
321 uint LargeInt::getMaxCycle(const LargeInt &liA, const LargeInt &liB)
322 {
323     LargeInt        tempA = liA;
324     const LargeInt& tempB = liB;
325     uint            tempC;
326     uint            res = 0;
327     bool            flag = true;
328 
329 
330     while (tempA >= tempB)
331     {
332         tempC = estimateQuotient(tempA, tempB);
333         tempA = tempB * tempC - tempA;
334 
335         res = flag ? (res + tempC) : (res - tempC);
336         flag = !flag;
337     }
338 
339     // 微调 
340     while (res > 0 && liB * res > liA) res--;
341 
342     return res;
343 }
344 
345 // 估值
346 uint LargeInt::estimateQuotient(const LargeInt &liA, const LargeInt &liB)
347 {
348     int         lenA = liA._data.size();
349     int         lenB = liB._data.size();
350     uint64      valA, valB;
351 
352     if (lenA == lenB)
353     {
354         if (lenA > 1)
355         {
356             valA = (uint64)liA._data[lenA - 1] * MAX_VAL + liA._data[lenA - 2];
357             valB = (uint64)liB._data[lenB - 1] * MAX_VAL + liB._data[lenB - 2];
358         }
359         else
360         {
361             valA = (uint64)liA._data[lenA - 1];
362             valB = (uint64)liB._data[lenB - 1];
363         }
364     }
365     else
366     {
367         valA = (uint64)liA._data[lenA - 1] * MAX_VAL + liA._data[lenA - 2];
368         valB = (uint64)liB._data[lenB - 1];
369     }
370 
371     return (uint)(valA / valB);
372 }
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

　　performance_test.cpp 性能测试文件：

![img](https://images.cnblogs.com/OutliningIndicators/ExpandedBlockStart.gif)

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
  1 #ifndef _DEBUG
  2 #include "large_int.h"
  3 
  4 #include <time.h>
  5 
  6 #define ASSERT_TRUE(expr) if (!(expr)) printf("[err] func %s, line %d\n", __FILE__, __LINE__)
  7 
  8 void testAdd_10_10()
  9 {
 10     ASSERT_TRUE(LargeInt("666570395198082383083987812317649242248271360929489229516075285504295102289078600111576237") + LargeInt("496569452214447869597553877113361070758568202724788465540491799425081647081432350535037617") == LargeInt("1163139847412530252681541689431010313006839563654277695056567084929376749370510950646613854"));
 11     ASSERT_TRUE(LargeInt("501047116328767816837081773052850643734303396986469891635533115704238392582582582126668417") + LargeInt("255457978378513042543964529202884364392779469714598794515117094308386210749466562718225737") == LargeInt("756505094707280859381046302255735008127082866701068686150650210012624603332049144844894154"));
 12     ASSERT_TRUE(LargeInt("214004101302301387185209209771129978938373468181191029860201193732447703020496141262897380") + LargeInt("170478633767499632514433255797890777283481647597872750115763571590938480011334109681906214") == LargeInt("384482735069801019699642465569020756221855115779063779975964765323386183031830250944803594"));
 13     ASSERT_TRUE(LargeInt("105824564024958279512400830276767156126024718310046722750524169674999236621852208659808072") + LargeInt("910464945748352119370257806017351160125564372325295616034013573351327095777763554340193641") == LargeInt("1016289509773310398882658636294118316251589090635342338784537743026326332399615763000001713"));
 14     ASSERT_TRUE(LargeInt("72473822774832767180843715646612691901179885065039073540291006701120695247664382100778951") + LargeInt("902880781104364084405805607811951047678368468806653681229168144091847651878206540723798374") == LargeInt("975354603879196851586649323458563739579548353871692754769459150792968347125870922824577325"));
 15     ASSERT_TRUE(LargeInt("32106522053723459520024846963937918183382599691408511076719079155398719551263578577077888") + LargeInt("440729075272831935184467216060379942693341648164828131194948752108656538399735776787445697") == LargeInt("472835597326555394704492063024317860876724247856236642271667831264055257950999355364523585"));
 16     ASSERT_TRUE(LargeInt("136984255810359126136392004659393618234670283161499475352257490312979216473882994254927479") + LargeInt("956611446649100436699993854612926151425446157829589343856430548869778922672569154805712846") == LargeInt("1093595702459459562836385859272319769660116440991088819208688039182758139146452149060640325"));
 17     ASSERT_TRUE(LargeInt("369566688590048173316810789610661717359860363233028992878597100487271869491199089054954952") + LargeInt("275073346574101817674720478046390109352809529495080562517641386512899424531742766368883043") == LargeInt("644640035164149990991531267657051826712669892728109555396238487000171294022941855423837995"));
 18     ASSERT_TRUE(LargeInt("311599145007727125780394368669343374487999862598577691024687307669146339244246830400418196") + LargeInt("745619660271447784461024940298800759959599112283237395253196513811347716812999109855312256") == LargeInt("1057218805279174910241419308968144134447598974881815086277883821480494056057245940255730452"));
 19     ASSERT_TRUE(LargeInt("739496249134380735076114314813105393991916888399810805687041011259039868850899017707713905") + LargeInt("444750868514458471013893332238191571463371251503524479975991290434344572486468157905046274") == LargeInt("1184247117648839206090007647051296965455288139903335285663032301693384441337367175612760179"));
 20     ASSERT_TRUE(LargeInt("3378811663529731954485325170409433321361777430980859903928936415382284278073253445602836") + LargeInt("612115518417672036062999286293127252119862671538353082670914952189974506609714840367007709") == LargeInt("615494330081201768017484611463536685441224448969333942574843888605356790887788093812610545"));
 21     ASSERT_TRUE(LargeInt("709707872058572246291521005709337197170092403014102252041141958785530984059428703067254887") + LargeInt("756847116102524843646121161633759400711238448615895304365034142005030914355313101242080292") == LargeInt("1466554988161097089937642167343096597881330851629997556406176100790561898414741804309335179"));
 22     ASSERT_TRUE(LargeInt("682655706897012131119361819937618524594537818526787868924965743080850483632690669020399606") + LargeInt("998537744334882192330804354851994430265645886061698862109207394172876720335009523956910336") == LargeInt("1681193451231894323450166174789612954860183704588486731034173137253727203967700192977309942"));
 23     ASSERT_TRUE(LargeInt("915964303864317487671654809498113518331074262183931957014039607804463737249735605887191940") + LargeInt("602192374864393415946669669203242198100757485344512460547975039814045870563128070235867022") == LargeInt("1518156678728710903618324478701355716431831747528444417562014647618509607812863676123058962"));
 24     ASSERT_TRUE(LargeInt("102309672135074140030132144636306520025778833093228980230996681264769435982077165897241508") + LargeInt("921368044256620770093772149644412649819653025602098388213957557794191337478999995332398502") == LargeInt("1023677716391694910123904294280719169845431858695327368444954239058960773461077161229640010"));
 25     ASSERT_TRUE(LargeInt("912584074874521696370235877923712582104384002658515159811002601614541444956782295225116130") + LargeInt("98309674962398828777522195454817253930945687483538367144797247067170592825158155480541592") == LargeInt("1010893749836920525147758073378529836035329690142053526955799848681712037781940450705657722"));
 26     ASSERT_TRUE(LargeInt("338673092965707792175297554082151516778997398054301105808948055736047644188128354618324391") + LargeInt("998600224744917430276622178823030196055071484774318431188921984211377659728189749873244340") == LargeInt("1337273317710625222451919732905181712834068882828619536997870039947425303916318104491568731"));
 27     ASSERT_TRUE(LargeInt("46087329411077143130063132342055640532010863618320412429849302202392757074744498117511929") + LargeInt("150297004785935997011389849665130288978039219375701991592779182975845735937358263740501522") == LargeInt("196384334197013140141452982007185929510050082994022404022628485178238493012102761858013451"));
 28     ASSERT_TRUE(LargeInt("359931731754174370059575143596026958613934432563521603795187705065419598398865321850604526") + LargeInt("715826689449948414704695875507536091053281036975198594795981007422364696514241064022135223") == LargeInt("1075758421204122784764271019103563049667215469538720198591168712487784294913106385872739749"));
 29     ASSERT_TRUE(LargeInt("377616233849256616577082281980959296134608521971854464216463988807786038502903705418665081") + LargeInt("521711005121041270450700901019953951879561298764891335416140112957290599577207853743123283") == LargeInt("899327238970297887027783183000913248014169820736745799632604101765076638080111559161788364"));
 30     ASSERT_TRUE(LargeInt("490561258703501196208153747574228691587310448505702246129902122107334801335354756753083370") + LargeInt("328770418433342075622980857120696395883119360874462571896675970558083346445759852940190051") == LargeInt("819331677136843271831134604694925087470429809380164818026578092665418147781114609693273421"));
 31     ASSERT_TRUE(LargeInt("469303214623065071192826591788449269080304215410025538234542279588306201429604560449076551") + LargeInt("462382315189932906105785699041161075078012593087154559797981637085674455225931149959984674") == LargeInt("931685529812997977298612290829610344158316808497180098032523916673980656655535710409061225"));
 32     ASSERT_TRUE(LargeInt("132618874385569021585807730176922784298565246060446731877047980028014657920955017006872258") + LargeInt("245188265021642729325634775828213352681137306793615090020911514292147966195583574956188008") == LargeInt("377807139407211750911442506005136136979702552854061821897959494320162624116538591963060266"));
 33     ASSERT_TRUE(LargeInt("924389164099303943414990590237169305721705897995950478693778647872975405376019440590591982") + LargeInt("734511201801858792416118828459663086398630055901369461458196504179888099862657056564208051") == LargeInt("1658900365901162735831109418696832392120335953897319940151975152052863505238676497154800033"));
 34     ASSERT_TRUE(LargeInt("788059775466061424576208034205698172156849192703614732048409508722464032125734604116326645") + LargeInt("724060600502323447252077871632881122689967303780984734211759441563457836436573140512669715") == LargeInt("1512120375968384871828285905838579294846816496484599466260168950285921868562307744628996360"));
 35     ASSERT_TRUE(LargeInt("308708953329678596416912377190318999794984043254623054355898921651730342209173807276800297") + LargeInt("8094424718677904958441976305103484152713374173657895101837972935689773783603132726076343") == LargeInt("316803378048356501375354353495422483947697417428280949457736894587420115992776940002876640"));
 36     ASSERT_TRUE(LargeInt("709164307087722985792342750843009961875311045958547232237713856250323086332479254439716407") + LargeInt("348442061728719579368442957548560575132332570783424777524346995636756292007597741209008637") == LargeInt("1057606368816442565160785708391570537007643616741972009762060851887079378340076995648725044"));
 37     ASSERT_TRUE(LargeInt("954192432695477663723499042097201603919413555360689713661829088602959217878787223434311552") + LargeInt("226387186609600620340359682399651081786482111369021352322203714040503539539451799981711062") == LargeInt("1180579619305078284063858724496852685705895666729711065984032802643462757418239023416022614"));
 38     ASSERT_TRUE(LargeInt("159081732484283693027305819204958913526647361857113041000626059687431174259814946156991487") + LargeInt("607296653785492393814095820339544123542112630624402391780558294473355055442777790551171316") == LargeInt("766378386269776086841401639544503037068759992481515432781184354160786229702592736708162803"));
 39     ASSERT_TRUE(LargeInt("139147541271068341555293884977578205080996440601220020175921460066495430089336122981849567") + LargeInt("892180972584073297107261565710298902206316098010279689726259194144820500688492417818552639") == LargeInt("1031328513855141638662555450687877107287312538611499709902180654211315930777828540800402206"));
 40     ASSERT_TRUE(LargeInt("116785228056580095816504435282282841031172633992337639825592207404148305721411986815129793") + LargeInt("394487801468183326894306582005497679582918056500166734760068674565569620853737435246455104") == LargeInt("511273029524763422710811017287780520614090690492504374585660881969717926575149422061584897"));
 41     ASSERT_TRUE(LargeInt("844852395463050512026867645679452885872822753204216870402457378671054172615663676374785945") + LargeInt("547838934214664547216262847838148511716558682549380880764379359051604813447772405175101120") == LargeInt("1392691329677715059243130493517601397589381435753597751166836737722658986063436081549887065"));
 42     ASSERT_TRUE(LargeInt("275141714031209520604973970742576227485319758367418960045022144173634368618083548742091834") + LargeInt("60708932652357674899327172843508390274129399311843942141215298428161051906668385937564862") == LargeInt("335850646683567195504301143586084617759449157679262902186237442601795420524751934679656696"));
 43     ASSERT_TRUE(LargeInt("879260774271639437552341899355862746715432383620626199161504635267627775346672772231504409") + LargeInt("382414776872199526767784167368394646074830900780739045719107795673512283640305821499095611") == LargeInt("1261675551143838964320126066724257392790263284401365244880612430941140058986978593730600020"));
 44     ASSERT_TRUE(LargeInt("366136028972040716341414267444732433811592046495707765975881766669354445808159876122910928") + LargeInt("199106085598684016477263034848083049042971448100014525037786814303114855626712683705995993") == LargeInt("565242114570724732818677302292815482854563494595722291013668580972469301434872559828906921"));
 45     ASSERT_TRUE(LargeInt("380417239327155285845131677335193485646928256300438765935736864841776648580779674192478801") + LargeInt("729608679567471010271699624056995634097930174211926571093533762109539303132694470716089275") == LargeInt("1110025918894626296116831301392189119744858430512365337029270626951315951713474144908568076"));
 46     ASSERT_TRUE(LargeInt("550216146983431198548026175093021827667632821933149710362584065553640516394520258329729608") + LargeInt("381845755439701464623356259624137274528264532742710593890038544614089697257929848919226564") == LargeInt("932061902423132663171382434717159102195897354675860304252622610167730213652450107248956172"));
 47     ASSERT_TRUE(LargeInt("665330516382963632978499305779684960375294369630150865146207457075019397308464929242442095") + LargeInt("525464950522651614034513165107151370693113211015280255669987717557129814903586778111161082") == LargeInt("1190795466905615247013012470886836331068407580645431120816195174632149212212051707353603177"));
 48     ASSERT_TRUE(LargeInt("440775331640041058205527223938407373635005738906252150709548111440532287535834246139414839") + LargeInt("604449452636050530894109968373258278553181381238251438304708192891750682732806532238244565") == LargeInt("1045224784276091589099637192311665652188187120144503589014256304332282970268640778377659404"));
 49     ASSERT_TRUE(LargeInt("600558343743059271487287883444676939802102717720004440447259731481199577317937097766945991") + LargeInt("535084539163017807076370677244708673171160762364807209157521482124118094275454851211111910") == LargeInt("1135642882906077078563658560689385612973263480084811649604781213605317671593391948978057901"));
 50     ASSERT_TRUE(LargeInt("784929645424376084169750406504991196320502984406923641629512610907081645958959153022700693") + LargeInt("80405061745725954392171165622532745413547125168996265695129367435142738188481742610873915") == LargeInt("865334707170102038561921572127523941734050109575919907324641978342224384147440895633574608"));
 51     ASSERT_TRUE(LargeInt("849543398022673918780098204950456085090376128926457766341159356626327182755368747237856072") + LargeInt("819035811791686189139689516110436676769181040496198947730274590549892787280614971291827811") == LargeInt("1668579209814360107919787721060892761859557169422656714071433947176219970035983718529683883"));
 52     ASSERT_TRUE(LargeInt("657229656406100111894271811313167477065970273024222421253870322653467795728790816729307614") + LargeInt("904833771075909191380400787385430043427953110907350605779687631020908246524288065509239788") == LargeInt("1562063427482009303274672598698597520493923383931573027033557953674376042253078882238547402"));
 53     ASSERT_TRUE(LargeInt("241735890183714604948403227488483590001381421339388844907903866594233760843182467012188716") + LargeInt("321417952682767202454084022199837641094507625494592749074398222665045107816931830216773616") == LargeInt("563153842866481807402487249688321231095889046833981593982302089259278868660114297228962332"));
 54     ASSERT_TRUE(LargeInt("310869735686522353675993494630667436612734806740792450096736670848800267081855089444208758") + LargeInt("852439047338738884855442579228292016063143634691777501090517484756471455889581230154814534") == LargeInt("1163308783025261238531436073858959452675878441432569951187254155605271722971436319599023292"));
 55     ASSERT_TRUE(LargeInt("676012565774504887153385590820031578875080544947307297458515234597510287985340696460296720") + LargeInt("479623201099041390899561674549813969491502357554909777863494432332809195632153901025490543") == LargeInt("1155635766873546278052947265369845548366582902502217075322009666930319483617494597485787263"));
 56     ASSERT_TRUE(LargeInt("166001813374012569415337665871342965732748748087740223696859604492575467502870544052234847") + LargeInt("421833526430047274192002357556267770616151562704312333671506692123428357905175651033788461") == LargeInt("587835339804059843607340023427610736348900310792052557368366296616003825408046195086023308"));
 57     ASSERT_TRUE(LargeInt("418766915606870825566677881703387350918278155203176250192672222328838429917179583107061042") + LargeInt("421840409116021565186278040786840511792668810850685937793880937735187556578103843183802197") == LargeInt("840607324722892390752955922490227862710946966053862187986553160064025986495283426290863239"));
 58     ASSERT_TRUE(LargeInt("812340012666956399523749904627317181727233224387947849705201659579660666271647005753395251") + LargeInt("195837010869311174572547987000346371006293920137345065326951410276651157286850648547239816") == LargeInt("1008177023536267574096297891627663552733527144525292915032153069856311823558497654300635067"));
 59     ASSERT_TRUE(LargeInt("548299906529123757110519941656967856301926867020764931389348741626291642635117857253288100") + LargeInt("453992302612841438897947881977188014660658335767102463101155912780359139840462572827388530") == LargeInt("1002292209141965196008467823634155870962585202787867394490504654406650782475580430080676630"));
 60     ASSERT_TRUE(LargeInt("656736678608804343350906076674254678674628690704682283411751066224185688888003090580433753") + LargeInt("456506499371858908949479117904767891218095212573600437242809446988497243178073774491860469") == LargeInt("1113243177980663252300385194579022569892723903278282720654560513212682932066076865072294222"));
 61     ASSERT_TRUE(LargeInt("806436641886889639456726899041164937547312937237850413241138688567944756665125173801288379") + LargeInt("667882297696929625766083143103462703645494470335904131305028446974064417436632873549062334") == LargeInt("1474318939583819265222810042144627641192807407573754544546167135542009174101758047350350713"));
 62     ASSERT_TRUE(LargeInt("514776267835812188382859172103778880068212193615416325844800349240617885165182899576221056") + LargeInt("346328473751365260337941544791368942566119938148350796822192887589007369775876648761298198") == LargeInt("861104741587177448720800716895147822634332131763767122666993236829625254941059548337519254"));
 63     ASSERT_TRUE(LargeInt("196108224722331470881377755388034242591830592248764006691695046667114611544091191281036508") + LargeInt("499988886355003596942337227251466432430444330058526960069078811225799883795763563838422442") == LargeInt("696097111077335067823714982639500675022274922307290966760773857892914495339854755119458950"));
 64     ASSERT_TRUE(LargeInt("402451283261954162130377467750530068140087710082527138471632717639727054400044083451106471") + LargeInt("932860130182067553594498435467947777383906971829817007532705538066655152037993807411614842") == LargeInt("1335311413444021715724875903218477845523994681912344146004338255706382206438037890862721313"));
 65     ASSERT_TRUE(LargeInt("113919594237689800737158809384515432523437533272122596725344108702141780076085417414289724") + LargeInt("981883724999686722702941404950401397601305311762090269773152015658230160545567748997221101") == LargeInt("1095803319237376523440100214334916830124742845034212866498496124360371940621653166411510825"));
 66     ASSERT_TRUE(LargeInt("317087244657300497673534502269741940286537949636344723269033116908266527755920818816478723") + LargeInt("276817993321699401147492593778040590338659089266073443672468422365624595385661692463474889") == LargeInt("593905237978999898821027096047782530625197038902418166941501539273891123141582511279953612"));
 67     ASSERT_TRUE(LargeInt("832096102304550988896146028698457130783741987379151607024988357817347657350114734820744183") + LargeInt("842885298365505569532975048394695527664272801665685120223424254437968773432887418033102329") == LargeInt("1674981400670056558429121077093152658448014789044836727248412612255316430783002152853846512"));
 68     ASSERT_TRUE(LargeInt("547779793745112067024792450087018558634106807342414748463231054518825901276410764499371842") + LargeInt("684262396527828901757735217241147413528931510683206755540960014150463491808469824277295983") == LargeInt("1232042190272940968782527667328165972163038318025621504004191068669289393084880588776667825"));
 69     ASSERT_TRUE(LargeInt("356175202258095051286505071667590808835785349473255458742600534881951203117517695857504664") + LargeInt("25584264975252234108328737681528624863677575135289165146838267132944520448039649130669309") == LargeInt("381759467233347285394833809349119433699462924608544623889438802014895723565557344988173973"));
 70     ASSERT_TRUE(LargeInt("187447509937564318862061360856264652370612350214347071070139640594012755410766011390373297") + LargeInt("639135906167045348596450161752835691467622922781010698862210715440564291470930156279400674") == LargeInt("826583416104609667458511522609100343838235272995357769932350356034577046881696167669773971"));
 71     ASSERT_TRUE(LargeInt("720486300907995565811792470182632336322818475092890370115623414126997632744277928386794569") + LargeInt("836752389871630183384409770311795738522105375237224735371692241365357704517229975840239960") == LargeInt("1557238690779625749196202240494428074844923850330115105487315655492355337261507904227034529"));
 72     ASSERT_TRUE(LargeInt("595288584259577478107779587692348050286919227597484164316432258301056515310691585060695970") + LargeInt("527999618822306808441664420820876036694282974778941165567811095925366677787875793942708209") == LargeInt("1123288203081884286549444008513224086981202202376425329884243354226423193098567379003404179"));
 73     ASSERT_TRUE(LargeInt("460661050496033321382469569403899967077711568362968650243578899018393620084455605214396145") + LargeInt("878255844712684723654873410318836491645923025179064324377948950418616374997760696648761803") == LargeInt("1338916895208718045037342979722736458723634593542032974621527849437009995082216301863157948"));
 74     ASSERT_TRUE(LargeInt("469255874721885441530772372918227833647645994701546319685402031456677334906234672521407484") + LargeInt("644344730378026994055646010063007028311603179384564961453027405824225534765877548684831128") == LargeInt("1113600605099912435586418382981234861959249174086111281138429437280902869672112221206238612"));
 75     ASSERT_TRUE(LargeInt("275331095652206255466139193170734342725456267699856910628887163005585046073688947689357891") + LargeInt("611928265913296310813122869957494937528337828584755590023309004563875584377449411550651852") == LargeInt("887259361565502566279262063128229280253794096284612500652196167569460630451138359240009743"));
 76     ASSERT_TRUE(LargeInt("764289666249700927930362037265548814523704353928510771549112646150910734950918716878753372") + LargeInt("600063490837913132127323193968041334285698135425943255862999803408526761939004461119239670") == LargeInt("1364353157087614060057685231233590148809402489354454027412112449559437496889923177997993042"));
 77     ASSERT_TRUE(LargeInt("280366118161095541285896422586462443892788231037727122839747384744761310734752505357433287") + LargeInt("798120803475723384150398807138206190138810637643768714932890220025665979768251071218150889") == LargeInt("1078486921636818925436295229724668634031598868681495837772637604770427290503003576575584176"));
 78     ASSERT_TRUE(LargeInt("285132082781395394205775462594024350752434337917365516128541167404623088806297305006279259") + LargeInt("208204924269360430069835397302552903718233782889641902049341987610949378467002883051498231") == LargeInt("493337007050755824275610859896577254470668120807007418177883155015572467273300188057777490"));
 79     ASSERT_TRUE(LargeInt("118145993343481625514614532259073654796309080408420038865376348910235254750823207860139593") + LargeInt("824109657465705577903094391983065276562527663575500021601339145323157690891178534019500768") == LargeInt("942255650809187203417708924242138931358836743983920060466715494233392945642001741879640361"));
 80     ASSERT_TRUE(LargeInt("332853891779618798412470055829732722704986087864842362185960426309694354736262347452145722") + LargeInt("489035735260065389940755532083075916370328237663452234140152510916630059509650898365917037") == LargeInt("821889627039684188353225587912808639075314325528294596326112937226324414245913245818062759"));
 81     ASSERT_TRUE(LargeInt("800280058280435147712843919157328846987322733523089942821097787689634574087837302681663148") + LargeInt("892906593332739839436066190655214205699094517800080597213387905212131958428642166133563498") == LargeInt("1693186651613174987148910109812543052686417251323170540034485692901766532516479468815226646"));
 82     ASSERT_TRUE(LargeInt("719694180381494850253863808492551182859840831827125529341264235965063847775809674173145998") + LargeInt("25120507580637520525147108708546511751082826278838419796701449556751129227858853035322402") == LargeInt("744814687962132370779010917201097694610923658105963949137965685521814977003668527208468400"));
 83     ASSERT_TRUE(LargeInt("39520081458236987583684970105788831658602352187190581591618412987893020171068238179986951") + LargeInt("386823787692232526842141036898815711959515502792791488918939147124622383312844058469338359") == LargeInt("426343869150469514425826007004604543618117854979982070510557560112515403483912296649325310"));
 84     ASSERT_TRUE(LargeInt("163556974251412475054457237639255810088116709200655282321955990813197960712966307484443718") + LargeInt("963096565579730567579862013953129867675646481656683610033249880599785656219051552561438706") == LargeInt("1126653539831143042634319251592385677763763190857338892355205871412983616932017860045882424"));
 85     ASSERT_TRUE(LargeInt("420307233077035882458834428805113433903028539384464113594022723180789520417261246589554678") + LargeInt("167727371273510290087918800447974941666290492293121959285447261477744529470911799512367004") == LargeInt("588034604350546172546753229253088375569319031677586072879469984658534049888173046101921682"));
 86     ASSERT_TRUE(LargeInt("125564451471132220004111150857704158352361812840958542358205468043404472401606810385447896") + LargeInt("275126741284858261265083252876602201080248478969071323162743019225942940406445612560965468") == LargeInt("400691192755990481269194403734306359432610291810029865520948487269347412808052422946413364"));
 87     ASSERT_TRUE(LargeInt("250265229160666570673915812466825087670904844084853817315107918711878966769803208887256578") + LargeInt("54603592801292173381580899858557895423006723182720329569778865644719602284781382902462897") == LargeInt("304868821961958744055496712325382983093911567267574146884886784356598569054584591789719475"));
 88     ASSERT_TRUE(LargeInt("105079000249000034019040901017096353694494726320336557524479996499749843588691255055903378") + LargeInt("299296031047045960085826472198782377096869880115748944444823790911398080478655689802220861") == LargeInt("404375031296045994104867373215878730791364606436085501969303787411147924067346944858124239"));
 89     ASSERT_TRUE(LargeInt("248544978569432963825678493923778991875618290314182248999504080468110139681010898191184827") + LargeInt("694447047630732044741173512525278215176398227460842474383631904472437883758920847122024100") == LargeInt("942992026200165008566852006449057207052016517775024723383135984940548023439931745313208927"));
 90     ASSERT_TRUE(LargeInt("44406140236882449811606432464244207736431814507482870124487452453278565858813519018121807") + LargeInt("687277845452146366300898290829638012838277882367561066246659305329224255427338805945196272") == LargeInt("731683985689028816112504723293882220574709696875043936371146757782502821286152324963318079"));
 91     ASSERT_TRUE(LargeInt("138465242700735299847658033431194658290761926284112434725460164592786395996965243763182582") + LargeInt("710831078408604639370718828803257034662120965416088991431460893913261863669923765381551304") == LargeInt("849296321109339939218376862234451692952882891700201426156921058506048259666889009144733886"));
 92     ASSERT_TRUE(LargeInt("277742755172775967895942647171302114581677218204277323114804416888795671284205066776046543") + LargeInt("216702964679985054863223614661035581852067916084748538142016208121528342373516135593795055") == LargeInt("494445719852761022759166261832337696433745134289025861256820625010324013657721202369841598"));
 93     ASSERT_TRUE(LargeInt("387732721658142758772034019562572190379126398201639234821168613371388742102871452050427532") + LargeInt("423466458600686639632304256469402116011899447766989322100018992603304692510580141302283789") == LargeInt("811199180258829398404338276031974306391025845968628556921187605974693434613451593352711321"));
 94     ASSERT_TRUE(LargeInt("696437958795319974887318944537313620385840708066655738675633369755498852716576301624565774") + LargeInt("137949617041854079109889075089461986539278880498897055146561195569682214668561003095344300") == LargeInt("834387575837174053997208019626775606925119588565552793822194565325181067385137304719910074"));
 95     ASSERT_TRUE(LargeInt("396994689338950618360251074319583712480049461648544141200560147373636932177930220702147381") + LargeInt("713829101013553638708659118494851852551885119750128635800639309617768141220461149869808297") == LargeInt("1110823790352504257068910192814435565031934581398672777001199456991405073398391370571955678"));
 96     ASSERT_TRUE(LargeInt("294211820299582475366294381174890667788564158975139406906105996104314099305814779980832677") + LargeInt("577408309296269165109112437620791137438535956359504739780684468250068014450836502310345711") == LargeInt("871620129595851640475406818795681805227100115334644146686790464354382113756651282291178388"));
 97     ASSERT_TRUE(LargeInt("496102546657024784587910120779530534785505611470073760501534969344070683343079962428633874") + LargeInt("462177552163829670934875141945554494912068504461333054936480263043407047674424327328789829") == LargeInt("958280098820854455522785262725085029697574115931406815438015232387477731017504289757423703"));
 98     ASSERT_TRUE(LargeInt("340389338772262131336210727281907748360174400586574704826510406930409139837529130614812608") + LargeInt("585031121252766151916589357948827265707485851810281184730569608507600269549754816742912246") == LargeInt("925420460025028283252800085230735014067660252396855889557080015438009409387283947357724854"));
 99     ASSERT_TRUE(LargeInt("116503466972556965563804207026774732208477473689902592445904044836127588094531062363235987") + LargeInt("743085954852406752078536868271810333643410666153578602282665699525009456473428619852246965") == LargeInt("859589421824963717642341075298585065851888139843481194728569744361137044567959682215482952"));
100     ASSERT_TRUE(LargeInt("311650429791205890406484253543633043223116288406866186991391986562809145375881183868029089") + LargeInt("351670451916278414089059928292955758907110822727850249931604740456642805213102106219759926") == LargeInt("663320881707484304495544181836588802130227111134716436922996727019451950588983290087789015"));
101     ASSERT_TRUE(LargeInt("15787459973509201823441944794398857944325150041324892451269410963937321847911799863405115") + LargeInt("35261365049264017714706459736973435423023617420374581637404175205998949080354551153654055") == LargeInt("51048825022773219538148404531372293367348767461699474088673586169936270928266351017059170"));
102     ASSERT_TRUE(LargeInt("233080790602456617109669824808083905098805736057836692433585744875263271271575590164725008") + LargeInt("83594096017818099586678283064128077127131013207863704887108743464771677114303549732617050") == LargeInt("316674886620274716696348107872211982225936749265700397320694488340034948385879139897342058"));
103     ASSERT_TRUE(LargeInt("292024708380316321881275441104958299742681948260084325908696198177891676841865869253229434") + LargeInt("290999151537937429976906170339153033413986841217034341757886063592473027880560328530910101") == LargeInt("583023859918253751858181611444111333156668789477118667666582261770364704722426197784139535"));
104     ASSERT_TRUE(LargeInt("975190640869256821325853345850558526984966901258765861218310171018213095177162338018859683") + LargeInt("943976628081215232440636429193034647697705334405703926865923381743585864918763786444051013") == LargeInt("1919167268950472053766489775043593174682672235664469788084233552761798960095926124462910696"));
105     ASSERT_TRUE(LargeInt("476995936622305374483873135947085762317829642003275617882033978983552171325482677217282412") + LargeInt("925167983881748027515584169536631631843620794306794661712334405964302134680889124207257607") == LargeInt("1402163920504053401999457305483717394161450436310070279594368384947854306006371801424540019"));
106     ASSERT_TRUE(LargeInt("321874781408788864356974262428986520368433865826826460007537043252281697545463344972251154") + LargeInt("750859914639930032432689194649330451721515023968701791660922781631329579886661923557386179") == LargeInt("1072734696048718896789663457078316972089948889795528251668459824883611277432125268529637333"));
107     ASSERT_TRUE(LargeInt("437233855432011014173609215466893679929951034341117704733460176978482809134670998472881651") + LargeInt("415926136096427280727910964828589165632327825609838483156052840894870704564390031055235700") == LargeInt("853159991528438294901520180295482845562278859950956187889513017873353513699061029528117351"));
108     ASSERT_TRUE(LargeInt("829830102241250826304836291382790093186714257658081162153404311969178748624429224103875506") + LargeInt("771422505687936758304015177287950012515067092909012564953526632634936666625382227671552588") == LargeInt("1601252607929187584608851468670740105701781350567093727106930944604115415249811451775428094"));
109     ASSERT_TRUE(LargeInt("640710236224566377875495874418793455905334136979431088178583291443950556612585502792253409") + LargeInt("196324876203275433317467306749467294267826838026929247375339478292487084468416943548083390") == LargeInt("837035112427841811192963181168260750173160975006360335553922769736437641081002446340336799"));
110 }
111 
112 void testAdd_10_5()
113 {
114     ASSERT_TRUE(LargeInt("805996717667777904242221922752338083857026183409072340317763541473607890234864311648302534") + LargeInt("592393599902694932407253911885300592877393903") == LargeInt("805996717667777904242221922752338083857026184001465940220458473880861802120164904525696437"));
115     ASSERT_TRUE(LargeInt("29551854608440355814686922908671355120273079453882100642201103380735834224043461806999863") + LargeInt("546010597281223226810806966421033501823364213") == LargeInt("29551854608440355814686922908671355120273079999892697923424330191542800645076963630364076"));
116     ASSERT_TRUE(LargeInt("135711401530164764370882028063200332606597412458174510289529587668545422209386083975179007") + LargeInt("445562589398060800195907248610178591002634950") == LargeInt("135711401530164764370882028063200332606597412903737099687590387864452670819564674977813957"));
117     ASSERT_TRUE(LargeInt("490890062164926355480182497987170807999431734764512174649763469083905103942839739325202006") + LargeInt("612917384257568086002522130724986415331204429") == LargeInt("490890062164926355480182497987170807999431735377429558907331555086427234667826154656406435"));
118     ASSERT_TRUE(LargeInt("237577606920333067581410890908220144685837211902686266918304693751299901799072639012711401") + LargeInt("471286339260216463760804792619397514481583148") == LargeInt("237577606920333067581410890908220144685837212373972606178521157512104694418470153494294549"));
119     ASSERT_TRUE(LargeInt("47797604720146292292339618458219471719462391780773210467744126398245736593680237734339943") + LargeInt("201483432406060850419730420299202150682804862") == LargeInt("47797604720146292292339618458219471719462391982256642873804976817976156892882388417144805"));
120     ASSERT_TRUE(LargeInt("931187858947440347505537233826250944078236853276601460241100981703466854842419341176281920") + LargeInt("777265133942052836202058852544955235091912973") == LargeInt("931187858947440347505537233826250944078236854053866594183153817905525707387374576268194893"));
121     ASSERT_TRUE(LargeInt("183050359500476240419510253856288914276091633854737821582243384290436352320659449166479009") + LargeInt("524514493069038109850145485330949565655786874") == LargeInt("183050359500476240419510253856288914276091634379252314651281494140581837651609014822265883"));
122     ASSERT_TRUE(LargeInt("585096445108719476704563294676161604675201826714794938313147835112316582910541525924683104") + LargeInt("879054979408552820353606786905662458328008108") == LargeInt("585096445108719476704563294676161604675201827593849917721700655465923369816203984252691212"));
123     ASSERT_TRUE(LargeInt("864873322802683056519497377106102323087199485492035148132546982273328493196816470436389743") + LargeInt("718528281731757226815941531135168573016859068") == LargeInt("864873322802683056519497377106102323087199486210563429864304209089270024331985043453248811"));
124     ASSERT_TRUE(LargeInt("81568253533869159329012150759340677990256474245735409571501875982949465536571398037410788") + LargeInt("436022669318270886909345077514861250093288066") == LargeInt("81568253533869159329012150759340677990256474681758078889772762892294543051432648130698854"));
125     ASSERT_TRUE(LargeInt("908083094499749189608298716308589838770143534728063137790954296783177729350586288358355502") + LargeInt("890659211314858007760640380721048451305113261") == LargeInt("908083094499749189608298716308589838770143535618722349105812304543818110071634739663468763"));
126     ASSERT_TRUE(LargeInt("787039780237618167020303526272397116460115365392471384987016543505328694800504350119244775") + LargeInt("102534763228181772103832512099078592556099622") == LargeInt("787039780237618167020303526272397116460115365495006148215198315609161206899582942675344397"));
127     ASSERT_TRUE(LargeInt("78622524670558561410774751968149230842146870027204380240521684678066710044805507986277667") + LargeInt("639006620989164538359962905703790485477117456") == LargeInt("78622524670558561410774751968149230842146870666211001229686223038029615748595993463395123"));
128     ASSERT_TRUE(LargeInt("240245901264117120260726992849327533022923305392466703338044638111954733582867147888936032") + LargeInt("955999397660831968524121395331377503127967434") == LargeInt("240245901264117120260726992849327533022923306348466100998876606636076128914244651016903466"));
129     ASSERT_TRUE(LargeInt("376520216825246123715801122680980126571196292552153727151655996336624615580716382379218994") + LargeInt("536266707038273820365633379120708424520612909") == LargeInt("376520216825246123715801122680980126571196293088420434189929816702257994701424806899831903"));
130     ASSERT_TRUE(LargeInt("796765989179445257772515003141354437912289439221063433594630872506796268589400040665339957") + LargeInt("238114827604504364510238377161078775652141658") == LargeInt("796765989179445257772515003141354437912289439459178261199135237017034645750478816317481615"));
131     ASSERT_TRUE(LargeInt("481633601782966608571039260367103314855105209107437791291490120308767705617945905940957104") + LargeInt("360142991051127819805720599591638188973917268") == LargeInt("481633601782966608571039260367103314855105209467580782342617940114488305209584094914874372"));
132     ASSERT_TRUE(LargeInt("817156469474995253328941435232492543503658190183969255328586862406466165196136998430915861") + LargeInt("722311342548315472285239231893032785068235195") == LargeInt("817156469474995253328941435232492543503658190906280597876902334691705397089169783499151056"));
133     ASSERT_TRUE(LargeInt("815643025204177337045629742981476791378320840335790830297172782867286986825020408577435051") + LargeInt("391992531130759489639148068165062513473942611") == LargeInt("815643025204177337045629742981476791378320840727783361427932272506435054990082922051377662"));
134     ASSERT_TRUE(LargeInt("792877390688318791403495230997209859035981342740931485140607481388011154531448343656671315") + LargeInt("4785502397353601202950901960664250318513221") == LargeInt("792877390688318791403495230997209859035981342745716987537961082590962056492112593975184536"));
135     ASSERT_TRUE(LargeInt("404337170583479901395803987444712456643866270255991900774724944671640882274749959975268682") + LargeInt("413420926545046656122406371228089179857699840") == LargeInt("404337170583479901395803987444712456643866270669412827319771600794047253502839139832968522"));
136     ASSERT_TRUE(LargeInt("263965370041040819840662123132819489677848721315320437621585013611199338246342562585522793") + LargeInt("930901422187218567664550139453841766442746022") == LargeInt("263965370041040819840662123132819489677848722246221859808803581275749477700184329028268815"));
137     ASSERT_TRUE(LargeInt("464326336691247004426556059021872814997030422931993883075840724680174543876554290229504406") + LargeInt("472902557869119422626927561284981814144467497") == LargeInt("464326336691247004426556059021872814997030423404896440944960147307102105161536104373971903"));
138     ASSERT_TRUE(LargeInt("280037877141801542095887098389159221432923049774271687710808776570325524934201342794088011") + LargeInt("10467535682949116064498875512457357199650816") == LargeInt("280037877141801542095887098389159221432923049784739223393757892634824400446658699993738827"));
139     ASSERT_TRUE(LargeInt("246899045474098546131316983882397977112147798568459201521696876912763433977028349955405893") + LargeInt("540916623064976411033523444085361497477633745") == LargeInt("246899045474098546131316983882397977112147799109375824586673287946286878062389847433039638"));
140     ASSERT_TRUE(LargeInt("813852509851547256182541818253814539151933299625766090081399264265263228025145529742282637") + LargeInt("786304080769064179638625692127370706861809360") == LargeInt("813852509851547256182541818253814539151933300412070170850463443903888920152516236604091997"));
141     ASSERT_TRUE(LargeInt("370458056157593336698003593558795127481776807028229216671248037805288552131889437515028779") + LargeInt("816832942500936778485841518516342839740033134") == LargeInt("370458056157593336698003593558795127481776807845062159172184816291130070648232277255061913"));
142     ASSERT_TRUE(LargeInt("401095652259126209293822133082383980383720519961917771239284494305955712356629118624540823") + LargeInt("895529060430396808047425014672807776318043209") == LargeInt("401095652259126209293822133082383980383720520857446831669681302353380727029436894942584032"));
143     ASSERT_TRUE(LargeInt("14809395124657200894233284237555978240584135812430405806084039118110512920807389067476685") + LargeInt("977147443909803465709707408597840559219450769") == LargeInt("14809395124657200894233284237555978240584136789577849715887504827817921518647948286927454"));
144     ASSERT_TRUE(LargeInt("458008226933524903344123052153930990699039647087175216558359305725244918385834271119735526") + LargeInt("75040908523347299467373756297189659177605419") == LargeInt("458008226933524903344123052153930990699039647162216125081706605192618674683023930297340945"));
145     ASSERT_TRUE(LargeInt("793045505501538503455698143903460429882260896924033441299950036311681419982863270809601569") + LargeInt("239683823626481682207468470313093018189993080") == LargeInt("793045505501538503455698143903460429882260897163717264926431718519149890295956288999594649"));
146     ASSERT_TRUE(LargeInt("21972586387054592969117517712905253079998322923498126102603821360760260510007539877034061") + LargeInt("502413175603514295295768684204666464267040378") == LargeInt("21972586387054592969117517712905253079998323425911301706118116656528944714674004144074439"));
147     ASSERT_TRUE(LargeInt("453286698221644162096662512927448851097200997314783900472215166083686705141346276962676839") + LargeInt("766424347458672547601541398016160199663078454") == LargeInt("453286698221644162096662512927448851097200998081208247930887713685228103157506476625755293"));
148     ASSERT_TRUE(LargeInt("247708719975941179344172048522801152431328152237244332047360375095043232296949356293993953") + LargeInt("424729405584477277683856121553556005782263169") == LargeInt("247708719975941179344172048522801152431328152661973737631837652778899353850505362076257122"));
149     ASSERT_TRUE(LargeInt("489651400649316907155372214400168794876925563494424361892704935038885288413505209850064994") + LargeInt("961675900379056737026262766229017439848484504") == LargeInt("489651400649316907155372214400168794876925564456100262271761672065148054642522649698549498"));
150     ASSERT_TRUE(LargeInt("812929487280620019913271426218708561229442340672477424091957993884830280144986950691154719") + LargeInt("136011671014520494657932300556787539480510991") == LargeInt("812929487280620019913271426218708561229442340808489095106478488542762580701774490171665710"));
151     ASSERT_TRUE(LargeInt("185496661784280392058039812941642468874979299895370046417950816053713287649426799461818096") + LargeInt("915677078376329871627450251403603562964819371") == LargeInt("185496661784280392058039812941642468874979300811047124794280687681163539053030362426637467"));
152     ASSERT_TRUE(LargeInt("923946337566903221271025547481908990581065342097422407925154287047425178499802245502418284") + LargeInt("731511245309726325012302547558100728844127652") == LargeInt("923946337566903221271025547481908990581065342828933653234880612059727726057902974346545936"));
153     ASSERT_TRUE(LargeInt("448786273049777140409110929260701963243109907203355963014366029824474919188942758332517405") + LargeInt("902762012163287129427082669148730185253813159") == LargeInt("448786273049777140409110929260701963243109908106117975177653159251557588337672943586330564"));
154     ASSERT_TRUE(LargeInt("813696093818381886234397434291685711446010046037752594422091939260740021861462141180081579") + LargeInt("403217936427471893654018419668952884404232334") == LargeInt("813696093818381886234397434291685711446010046440970530849563832914758441530415025584313913"));
155     ASSERT_TRUE(LargeInt("232467222607231349296612385957712507747210829311613234603145159453454206070093801480000616") + LargeInt("968690182833827944542094930589822316795983297") == LargeInt("232467222607231349296612385957712507747210830280303417436973103995549136659916118275983913"));
156     ASSERT_TRUE(LargeInt("106313033659313509852770042063065651157175948854469567918034110822476070909177160363490800") + LargeInt("746943667901943848101129469983342864268135654") == LargeInt("106313033659313509852770042063065651157175949601413235819977958923605540892520024631626454"));
157     ASSERT_TRUE(LargeInt("700980859919970913604946112786859958060847762418203068650025348533571175758445722651967581") + LargeInt("410649425214824219814663598320355253877384839") == LargeInt("700980859919970913604946112786859958060847762828852493864849568348234774078800976529352420"));
158     ASSERT_TRUE(LargeInt("406455826153786635876818953166985804957327832033211140390240592125128682714827505244694334") + LargeInt("80969185319678560411598362648387242248175635") == LargeInt("406455826153786635876818953166985804957327832114180325709919152536727045363214747492869969"));
159     ASSERT_TRUE(LargeInt("535693449650111683625170323708651719557089874662920071110334111852166958593620683001174502") + LargeInt("303200109924752254984765879905937552138981581") == LargeInt("535693449650111683625170323708651719557089874966120181035086366836932838499558235140156083"));
160     ASSERT_TRUE(LargeInt("878492432723968499531482898636121030161042939239698310867369131743917807332998075135759889") + LargeInt("25892531442043607981055888532573114525604833") == LargeInt("878492432723968499531482898636121030161042939265590842309412739724973695865571189661364722"));
161     ASSERT_TRUE(LargeInt("791614335790284488791942418601935523376884715047025073984120746556489825464941648284906274") + LargeInt("816538822118152227349624889703318098366787195") == LargeInt("791614335790284488791942418601935523376884715863563896102272973906114715168259746651693469"));
162     ASSERT_TRUE(LargeInt("995760349597882402509655924789534526236542585430467666994293691418087988394078255940594631") + LargeInt("749595595376856432499223720356441822073970926") == LargeInt("995760349597882402509655924789534526236542586180063262371150123917311708750520078014565557"));
163     ASSERT_TRUE(LargeInt("481224336079831208953735348707595566153830014653648818014126412101672607874971382713050616") + LargeInt("825416246826269431119820679272710263588079734") == LargeInt("481224336079831208953735348707595566153830015479065064840395843221493287147681646301130350"));
164     ASSERT_TRUE(LargeInt("208111876783525841480194741125151624038322635588308677047814719539409180866589794894625141") + LargeInt("430988512121384467765385198701041758201306992") == LargeInt("208111876783525841480194741125151624038322636019297189169199187304794379567631553095932133"));
165     ASSERT_TRUE(LargeInt("505351925492226099964018490787530576193406994996609562172557820988828346560876465132518215") + LargeInt("898417370447935367810452727240687069737509773") == LargeInt("505351925492226099964018490787530576193406995895026932620493188799281073801563534870027988"));
166     ASSERT_TRUE(LargeInt("673654244030700535274631773188227232622044130292509910376642806934600987122784332240117957") + LargeInt("550701530324994037582292551360328297066556070") == LargeInt("673654244030700535274631773188227232622044130843211440701636844516893538483112629306674027"));
167     ASSERT_TRUE(LargeInt("139129647626368487262692248120204904006558697678475276522339745307583499921309930656509658") + LargeInt("314086819661278913885392928636330683606044456") == LargeInt("139129647626368487262692248120204904006558697992562096183618659192976428557640614262554114"));
168     ASSERT_TRUE(LargeInt("210973072157076831152962074551046741832482978455443703000633081871473759073957330787108100") + LargeInt("175170634201326411081378624764505498460935601") == LargeInt("210973072157076831152962074551046741832482978630614337201959492952852383838462829248043701"));
169     ASSERT_TRUE(LargeInt("971106870029651158432860872803257234055634829050298554968726800923814313386356630558650132") + LargeInt("386146274188142873904170446323836424971460027") == LargeInt("971106870029651158432860872803257234055634829436444829156869674827984759710193055530110159"));
170     ASSERT_TRUE(LargeInt("757681096251879588478365136646447744446332120619431435741351753579107240783081984503901849") + LargeInt("411073667119067650039235556846806544745594085") == LargeInt("757681096251879588478365136646447744446332121030505102860419403618342797629888529249495934"));
171     ASSERT_TRUE(LargeInt("224353468393490581465245942698489817497776543398075236320046612653334830808336284057794767") + LargeInt("567504747173589167906816087721384858517479204") == LargeInt("224353468393490581465245942698489817497776543965579983493635780560150918529721142575273971"));
172     ASSERT_TRUE(LargeInt("701802038678571274812490048323266921525536451218623055550942170980286664794025925201842612") + LargeInt("936345548720139687012547900280157683335513238") == LargeInt("701802038678571274812490048323266921525536452154968604271081857992834565074183608537355850"));
173     ASSERT_TRUE(LargeInt("263713847585784179335106105817302020232938992307529172068282040718490640851402182694146889") + LargeInt("843846491772062275388924620804133671152547755") == LargeInt("263713847585784179335106105817302020232938993151375663840344316107415261655535853846694644"));
174     ASSERT_TRUE(LargeInt("340921201919358270790909662881609073048134904736288526972393749105819376314092770808504445") + LargeInt("426314863251719470645387502514855753079761621") == LargeInt("340921201919358270790909662881609073048134905162603390224113219751206878828948523888266066"));
175     ASSERT_TRUE(LargeInt("298713709183779589192622687983002536936336907502159408761148330811163145078858687293520923") + LargeInt("415799970258588798061980790699181851811448008") == LargeInt("298713709183779589192622687983002536936336907917959379019737128873143935778040539104968931"));
176     ASSERT_TRUE(LargeInt("956948163210992700466911106211087777063857258520859736571990833987807358481758288373852753") + LargeInt("614445602038386593362958356755969045884272642") == LargeInt("956948163210992700466911106211087777063857259135305338610377427350765715237727334258125395"));
177     ASSERT_TRUE(LargeInt("8666983939814060228395059446502997965303400272567824399068374054560657204424949961338607") + LargeInt("746906466016497440335522363347741649351709456") == LargeInt("8666983939814060228395059446502997965303401019474290415565814390083020552166599313048063"));
178     ASSERT_TRUE(LargeInt("114127242640448027238239163808208979565831297313380599817850855398503605714895843472084157") + LargeInt("961215632990100059772379397667082152476642817") == LargeInt("114127242640448027238239163808208979565831298274596232807950915170883003381977995948726974"));
179     ASSERT_TRUE(LargeInt("207151475627405024556858894555689575455401711575672508005672048017584580730882557814449086") + LargeInt("112738243591786939669639053681943175935472619") == LargeInt("207151475627405024556858894555689575455401711688410751597458987687223634412825733749921705"));
180     ASSERT_TRUE(LargeInt("402316204224811078159385771990286408865426474193039090654402878664929913731925795271668635") + LargeInt("554712906748201842968674690500044234955634887") == LargeInt("402316204224811078159385771990286408865426474747751997402604721633604604231970030227303522"));
181     ASSERT_TRUE(LargeInt("922858242894677347013544114221806371859732015958151134831166500528341026503608281614854699") + LargeInt("474472315036559872598377696308541787108022417") == LargeInt("922858242894677347013544114221806371859732016432623449867726373126718722812150068722877116"));
182     ASSERT_TRUE(LargeInt("488151477782174904580782425559664038720366636671809305469830081559497721363852201006306632") + LargeInt("531313961756077657503694751543560085504671225") == LargeInt("488151477782174904580782425559664038720366637203123267225907739063192472907412286510977857"));
183     ASSERT_TRUE(LargeInt("205569863138289399498464805402352252410580118168202668067649529551638358542526414948405764") + LargeInt("312278129011777652666618212604581048542418159") == LargeInt("205569863138289399498464805402352252410580118480480797079427182218256571147107463490823923"));
184     ASSERT_TRUE(LargeInt("534376501767087773707261597721496756301729766759122674383240594450490488913300217213074638") + LargeInt("522733718820933859628497881272650492950512188") == LargeInt("534376501767087773707261597721496756301729767281856393204174454078988370185950710163586826"));
185     ASSERT_TRUE(LargeInt("662864957100626793481133470187491688361825783697389258580271140468598989206066562644409213") + LargeInt("430605605087501934485367755110136744286261708") == LargeInt("662864957100626793481133470187491688361825784127994863667773074953966744316203306930670921"));
186     ASSERT_TRUE(LargeInt("147691451629761969689345568155111727432206909090502211608967873395265631531729196509483585") + LargeInt("861261158941609211752685963378288354812982817") == LargeInt("147691451629761969689345568155111727432206909951763370550577085147951594910017551322466402"));
187     ASSERT_TRUE(LargeInt("312053863625146949039466474273861783386039550703025909538012112386305023964628923980630415") + LargeInt("832612119449566902833125340735559312496121128") == LargeInt("312053863625146949039466474273861783386039551535638028987579015219430364700188236476751543"));
188     ASSERT_TRUE(LargeInt("72156161832167938467129332593840009476389146301842329620053368704234243753017112219314847") + LargeInt("517723361704152394528153186012433559900440027") == LargeInt("72156161832167938467129332593840009476389146819565691324205763232387429765450672119754874"));
189     ASSERT_TRUE(LargeInt("908084624061100284473781455118998385017033661061702312548228202954030964618457780224338056") + LargeInt("725504707097088380955645852848496521316712478") == LargeInt("908084624061100284473781455118998385017033661787207019645316583909676817466954301541050534"));
190     ASSERT_TRUE(LargeInt("570853782922628080482830475632421240422801317452181478836001820878049715598044556054453981") + LargeInt("822986078626973576753828872598497530793584265") == LargeInt("570853782922628080482830475632421240422801318275167557462975397631878588196542086848038246"));
191     ASSERT_TRUE(LargeInt("887630610210443834622129489193738000826625685991159539360596551547520420655784274785873511") + LargeInt("742254410153767195731234002596710796937894653") == LargeInt("887630610210443834622129489193738000826625686733413949514363747278754423252495071723768164"));
192     ASSERT_TRUE(LargeInt("337192808780510056117168753421816517730953770916556661504655952293494082961403433954596287") + LargeInt("643493403601955635804091746911879275987454054") == LargeInt("337192808780510056117168753421816517730953771560050065106611588097585829873282709942050341"));
193     ASSERT_TRUE(LargeInt("406045750168729428422928944911396907339221085598460970828765202633462865066431713069578838") + LargeInt("943471000691363196526322923403853596670400530") == LargeInt("406045750168729428422928944911396907339221086541931971520128399159785788470285309739979368"));
194     ASSERT_TRUE(LargeInt("136036615487606570901950943192949860009642348597365659643859793566774931850484979990585763") + LargeInt("197261697585715393859876456984699604433220076") == LargeInt("136036615487606570901950943192949860009642348794627357229575187426651388835184584423805839"));
195     ASSERT_TRUE(LargeInt("890154396282354926458276721809864666931142902759767956439963870564550032419194006466957082") + LargeInt("608930963372526874778966060471294682395091777") == LargeInt("890154396282354926458276721809864666931142903368698919812490745343516092890488688862048859"));
196     ASSERT_TRUE(LargeInt("470577212037409887416827306889604431188152337186489013362546765502755798006207808584594473") + LargeInt("926128618899077574922057277150555764740900334") == LargeInt("470577212037409887416827306889604431188152338112617632261624340424813075156763573325494807"));
197     ASSERT_TRUE(LargeInt("745758534344476883093615773284396690967988159168505174044505129872373098278110789403300022") + LargeInt("997795468980498792222452931918455453234292207") == LargeInt("745758534344476883093615773284396690967988160166300643025003922094826030196566242637592229"));
198     ASSERT_TRUE(LargeInt("880766899125987262622337030657379127647334968229292947688285030071159180682576838616820850") + LargeInt("89662269281565818676040032267540423169243672") == LargeInt("880766899125987262622337030657379127647334968318955216969850848747199212950117261786064522"));
199     ASSERT_TRUE(LargeInt("224651021568030366461174590267718918209419462487248767044708374369055914175729549497397293") + LargeInt("914045114119161817177105942046659549081358254") == LargeInt("224651021568030366461174590267718918209419463401293881163870191546161856222389098578755547"));
200     ASSERT_TRUE(LargeInt("520828522609839915571595903364432026429883664775313134023578071936684121021195469370486052") + LargeInt("102134721613244209218474012229603649656456917") == LargeInt("520828522609839915571595903364432026429883664877447855636822281155158133250799119026942969"));
201     ASSERT_TRUE(LargeInt("360700458621798329692565995634639516970135707764330665530869598397349555754001495911887622") + LargeInt("623979624806680935293975096195179599545061180") == LargeInt("360700458621798329692565995634639516970135708388310290337550533691324651949181095456948802"));
202     ASSERT_TRUE(LargeInt("271188415630632872732714587933529140589697843972456523729045279849325095955184642059420320") + LargeInt("392447999928222982323560041676465095743837943") == LargeInt("271188415630632872732714587933529140589697844364904523657268262172885137631649737803258263"));
203     ASSERT_TRUE(LargeInt("203528636501575233785192347417254266257244412625787796781878254901627495603684933652554140") + LargeInt("329592705984024797816171550521737089333079308") == LargeInt("203528636501575233785192347417254266257244412955380502765903052717799046125422022985633448"));
204     ASSERT_TRUE(LargeInt("483016583913728762173373585167736804650423364742360894508252229566366312101778105827147471") + LargeInt("605213968051593935417088933758649323274496682") == LargeInt("483016583913728762173373585167736804650423365347574862559846164983455245860427429101644153"));
205     ASSERT_TRUE(LargeInt("975505906974295777092091908942906218518077591445045757981262274087904116790559580397096761") + LargeInt("7177125783759635195852517912391663472286075") == LargeInt("975505906974295777092091908942906218518077591452222883765021909283756634702951243869382836"));
206     ASSERT_TRUE(LargeInt("608334546487016140516804789070460781697585153380239004923105548183249377850938768986720667") + LargeInt("561201056789768040695063321842911144323133760") == LargeInt("608334546487016140516804789070460781697585153941440061712873588878312699693849913309854427"));
207     ASSERT_TRUE(LargeInt("313554156565733532879005988103550384071165971484311352812129863022546355912370004248677845") + LargeInt("118354600005663133069310528171673195421022731") == LargeInt("313554156565733532879005988103550384071165971602665952817792996091856884084043199669700576"));
208     ASSERT_TRUE(LargeInt("560091410956832314493458643249002770962243734024055225703399964938698300776850839765914850") + LargeInt("86029473753931481736105708407107462302480776") == LargeInt("560091410956832314493458643249002770962243734110084699457331446674804009183958302068395626"));
209     ASSERT_TRUE(LargeInt("651003647570124614953326775707737162602699049940750829000679989685663064136434460766631046") + LargeInt("726685785822315783799387532666410301926804897") == LargeInt("651003647570124614953326775707737162602699050667436614822995773485050596802844762693435943"));
210     ASSERT_TRUE(LargeInt("558408904328547396362749521877546626823774999910550591963117106496812966502843261866184921") + LargeInt("770786634772107438602718020698258140289744748") == LargeInt("558408904328547396362749521877546626823775000681337226735224545099530987201101402155929669"));
211     ASSERT_TRUE(LargeInt("153908665876316628189186547841629461868740994429947883263407859377217003390537518521743905") + LargeInt("907596307513607538742743138366063817565044343") == LargeInt("153908665876316628189186547841629461868740995337544190777015398119960141756601336086788248"));
212     ASSERT_TRUE(LargeInt("559030978236039221183313250902935150994760197531342126726354141037536323484236580064267243") + LargeInt("509890177084090385511364050062538169582259935") == LargeInt("559030978236039221183313250902935150994760198041232303810444526548900373546774749646527178"));
213     ASSERT_TRUE(LargeInt("270415670929576476649353533248917383359406517221035373323371426082757160105283044262787679") + LargeInt("559475539977216101277259736409683467049636570") == LargeInt("270415670929576476649353533248917383359406517780510913300587527360016896514966511312424249"));
214 }
215 
216 void testSub_10_10()
217 {
218     ASSERT_TRUE(LargeInt("828606505843123267783924511609436790898298893859115483424894152526046679070056571207236370") - LargeInt("569930080690061003825439030901067475489689441230011434127418591431264786676858408142939220") == LargeInt("258676425153062263958485480708369315408609452629104049297475561094781892393198163064297150"));
219     ASSERT_TRUE(LargeInt("757522057854897391509261663212639811144848534551187780101262384369627309415205234286378438") - LargeInt("110285315185156617436114692462245170330584299521765160248553822172255077215404739068237298") == LargeInt("647236742669740774073146970750394640814264235029422619852708562197372232199800495218141140"));
220     ASSERT_TRUE(LargeInt("790636448317133345542437399478629252748096888711661398220922074291656979035072620053835539") - LargeInt("302102577847624944400195372923684037832767375776862822481528265044071574913069512795732478") == LargeInt("488533870469508401142242026554945214915329512934798575739393809247585404122003107258103061"));
221     ASSERT_TRUE(LargeInt("794566818096370597595514658008685967679785692900079148448657521339827367599720269631457119") - LargeInt("693205561655797728851856136733295116554869733960560207323523830690820162075872163783571917") == LargeInt("101361256440572868743658521275390851124915958939518941125133690649007205523848105847885202"));
222     ASSERT_TRUE(LargeInt("925335652888894954673949766038743380045711280680126661634568039731488022528582690382765660") - LargeInt("371973354858251401252477916573880834455885838737987001559269363522925173053108731238322123") == LargeInt("553362298030643553421471849464862545589825441942139660075298676208562849475473959144443537"));
223     ASSERT_TRUE(LargeInt("843489104207569315423208748495724834287289782637889808000357014214840627806439003403442868") - LargeInt("755322802084549849478783856067260966294525636137892552683710260696331678677245240310973829") == LargeInt("88166302123019465944424892428463867992764146499997255316646753518508949129193763092469039"));
224     ASSERT_TRUE(LargeInt("835268008953089350123005113720499829212925143177648716961631642425023505662226754025085366") - LargeInt("123794470245701184143782345103558150004285719328895973106488340944555745828618275254623667") == LargeInt("711473538707388165979222768616941679208639423848752743855143301480467759833608478770461699"));
225     ASSERT_TRUE(LargeInt("674340654353150165197060381467994160190257065245095279680280305235704814217148528892053944") - LargeInt("606239973747522941002946346810246199411638472735938303013159933635195239440067315987171489") == LargeInt("68100680605627224194114034657747960778618592509156976667120371600509574777081212904882455"));
226     ASSERT_TRUE(LargeInt("732070105121591865876246778440728813320300512716293896112634875496880687113806096965757000") - LargeInt("400004193796362705527920860106358929977748330761049656623818369127984988283542788130320890") == LargeInt("332065911325229160348325918334369883342552181955244239488816506368895698830263308835436110"));
227     ASSERT_TRUE(LargeInt("829191686975609340857679381191097374731122393862887259062282940034631339026169973582189810") - LargeInt("271192328132446322636372429042827753310939619075832354358365898121084808449027408701006705") == LargeInt("557999358843163018221306952148269621420182774787054904703917041913546530577142564881183105"));
228     ASSERT_TRUE(LargeInt("948184048432148397499887030410164901957174254551826461638380867011546834931680058317346563") - LargeInt("196923662260852945946562015269723789154270387345576284807824587467148618786337806178871114") == LargeInt("751260386171295451553325015140441112802903867206250176830556279544398216145342252138475449"));
229     ASSERT_TRUE(LargeInt("593340829426572930234450214887778568168095797577524430512954556740327830404941471720151948") - LargeInt("375346875715765251305100371279493048479927156167916192492046417678787932095906776483407870") == LargeInt("217993953710807678929349843608285519688168641409608238020908139061539898309034695236744078"));
230     ASSERT_TRUE(LargeInt("564556247538401399959958544953290155231631985414959230920239510831715020533358149156545498") - LargeInt("406696350625417246051916697304524159666775681146583868136616156785795258507612346210741554") == LargeInt("157859896912984153908041847648765995564856304268375362783623354045919762025745802945803944"));
231     ASSERT_TRUE(LargeInt("871499427844768782581429617198169875479323349872746807498223563857279507244543493121149186") - LargeInt("380224340728120135368092388557212134349303298096707451418718407714329101125954139205370407") == LargeInt("491275087116648647213337228640957741130020051776039356079505156142950406118589353915778779"));
232     ASSERT_TRUE(LargeInt("970773313354598193181499460308236238669774069531914043398683612228025056626232071415132961") - LargeInt("171837160196941627111196340433492711713066163767720111345216848465195970538167880787004230") == LargeInt("798936153157656566070303119874743526956707905764193932053466763762829086088064190628128731"));
233     ASSERT_TRUE(LargeInt("850407941375700565196238146332324310609456386554658480147332681025551799733568346351492471") - LargeInt("442254897965804904872295252391331851885408150269705462254882680826600895187304177691205537") == LargeInt("408153043409895660323942893940992458724048236284953017892450000198950904546264168660286934"));
234     ASSERT_TRUE(LargeInt("928462701992614107947883964459962097379750576469907437764793284774838422712682728995458308") - LargeInt("265754039229572341118008000695426786625548098100861710456968599418926399728645537943509980") == LargeInt("662708662763041766829875963764535310754202478369045727307824685355912022984037191051948328"));
235     ASSERT_TRUE(LargeInt("763673737644999172516296598139257244421414569970879606380164320246520608640212962648232843") - LargeInt("28300291600372614831780664125179380676485877759589274714550775705601614098268369930526309") == LargeInt("735373446044626557684515934014077863744928692211290331665613544540918994541944592717706534"));
236     ASSERT_TRUE(LargeInt("713707930452659597592848944770259304334998754678439899343291064170344808626111365711069180") - LargeInt("526732926717599340872567664641022063304232546917224575055764313692837653655726794773700417") == LargeInt("186975003735060256720281280129237241030766207761215324287526750477507154970384570937368763"));
237     ASSERT_TRUE(LargeInt("889393979928080744970713078272339035571315766560615875065885501855287500779894105032873920") - LargeInt("736794282127406475940954871956885314495820677256114112638205503860468870777331674356116765") == LargeInt("152599697800674269029758206315453721075495089304501762427679997994818630002562430676757155"));
238     ASSERT_TRUE(LargeInt("869594359451312700336926608337829261348179321390759734170389867711845797698370829964990023") - LargeInt("230093330955209729664222435350891145134980009071699036254106633587904989238358893469142461") == LargeInt("639501028496102970672704172986938116213199312319060697916283234123940808460011936495847562"));
239     ASSERT_TRUE(LargeInt("670939108218997727694210929168587950699685688680626326358169620727692423991629840507555991") - LargeInt("215031333729880512111755347320241588002514474513320503800425700497226996765374458793639883") == LargeInt("455907774489117215582455581848346362697171214167305822557743920230465427226255381713916108"));
240     ASSERT_TRUE(LargeInt("898775120661966741601785394051532967764396556981250969674584357402715374204114952731410791") - LargeInt("353525232940071857839604982400709259683026095209940460465199681243761170240477738806033657") == LargeInt("545249887721894883762180411650823708081370461771310509209384676158954203963637213925377134"));
241     ASSERT_TRUE(LargeInt("947396313746089735737709850370198222440436700935386718468869248205711234247200698829853022") - LargeInt("15004766420993143544152793028398438816561135295402560109224420850295391653479076796926599") == LargeInt("932391547325096592193557057341799783623875565639984158359644827355415842593721622032926423"));
242     ASSERT_TRUE(LargeInt("702570516178082888137812647804483014944239122972353381516813249978005368533771970474291795") - LargeInt("641464142089596674843047850120459437582864861557003508490270255000039177583845706040943778") == LargeInt("61106374088486213294764797684023577361374261415349873026542994977966190949926264433348017"));
243     ASSERT_TRUE(LargeInt("164872022752536420471263761699174483994314045454503716142748750114549428386059432059161401") - LargeInt("32559352909068533030340724496697532792214704482749340863253364250653173001967848559998025") == LargeInt("132312669843467887440923037202476951202099340971754375279495385863896255384091583499163376"));
244     ASSERT_TRUE(LargeInt("457561032304460953266624026688948441563552592787405624867536712529522035713597643294495579") - LargeInt("372878874214929723656445786942650543435537573463686439033481341102057522064440191573844675") == LargeInt("84682158089531229610178239746297898128015019323719185834055371427464513649157451720650904"));
245     ASSERT_TRUE(LargeInt("908689516089722178676921270070153586929140128506827962842874185579579383252843618798052568") - LargeInt("214172040256403573630395603885051203241921993534010766058319803896894100848055812000203386") == LargeInt("694517475833318605046525666185102383687218134972817196784554381682685282404787806797849182"));
246     ASSERT_TRUE(LargeInt("986774012638459397750013141913951064448625773774238635187510233855254430858617382458557499") - LargeInt("421041958895568812404586109236370250613757507651795538788360932313572848964391118416629593") == LargeInt("565732053742890585345427032677580813834868266122443096399149301541681581894226264041927906"));
247     ASSERT_TRUE(LargeInt("918722346695918652421260531454828548400799975538134506339335035760524518244247342526338331") - LargeInt("101615631708346602104743486836421647030925474086679378175297137684406514827953786815127179") == LargeInt("817106714987572050316517044618406901369874501451455128164037898076118003416293555711211152"));
248     ASSERT_TRUE(LargeInt("847503310733754568771210965367855366768462691329299162672797803925602572123423169400925517") - LargeInt("686968259469453530437500043995371978890560628922176177870673404505335743878911369188371310") == LargeInt("160535051264301038333710921372483387877902062407122984802124399420266828244511800212554207"));
249     ASSERT_TRUE(LargeInt("907592852821065881907322386597319297678477258367150000804023612623689938919185808100104638") - LargeInt("153665063000986733348400621593460994793044779053237224621013744908329405112218306842058968") == LargeInt("753927789820079148558921765003858302885432479313912776183009867715360533806967501258045670"));
250     ASSERT_TRUE(LargeInt("802522552166329568686698459007930174228338017799100562432008107853295551850499397003834041") - LargeInt("527687050928100836277172188494357101826479154818230612223278979615075437384793022506353965") == LargeInt("274835501238228732409526270513573072401858862980869950208729128238220114465706374497480076"));
251     ASSERT_TRUE(LargeInt("780791537585650214931851800749487616838813479197082054541892748181903403372998788912716265") - LargeInt("415033509434749956081588067258946582910359146495343792352653911630713283944047175234737789") == LargeInt("365758028150900258850263733490541033928454332701738262189238836551190119428951613677978476"));
252     ASSERT_TRUE(LargeInt("109798888859578855559353844879519850010794481788542795013556810451762521435706241395157813") - LargeInt("89880281529252489865254349161070364376840041397042398176052485441615814203424544160248102") == LargeInt("19918607330326365694099495718449485633954440391500396837504325010146707232281697234909711"));
253     ASSERT_TRUE(LargeInt("764980962253758594934855357263969723138702366116788790042821846255633516326841928661060163") - LargeInt("339227838229138762724508070780110366031639762695934564804975086892810053613107954075830494") == LargeInt("425753124024619832210347286483859357107062603420854225237846759362823462713733974585229669"));
254     ASSERT_TRUE(LargeInt("881303464708078887236351907461719294013275471373606863907605660459823453431740297387887353") - LargeInt("87321209442811688497809827357693798062644722720695511559653956591921378350635275014002081") == LargeInt("793982255265267198738542080104025495950630748652911352347951703867902075081105022373885272"));
255     ASSERT_TRUE(LargeInt("98783075307587279457381141529627452045259328152075254527009524661843701439111343469016039") - LargeInt("81497850779912768590286934936241166678404824679351173773108292070656351099868194266111195") == LargeInt("17285224527674510867094206593386285366854503472724080753901232591187350339243149202904844"));
256     ASSERT_TRUE(LargeInt("402541144505898680904553802923865289394268293251799939210083680646701117291890226513400314") - LargeInt("161897613655358857488227797228422240690396408021313701611576203348270018931806376158164301") == LargeInt("240643530850539823416326005695443048703871885230486237598507477298431098360083850355236013"));
257     ASSERT_TRUE(LargeInt("612861257479089898865394302190769696933096632454207235528257094005238725348723626282143467") - LargeInt("328538429006525934407817358401498475092531812980728864809141028713043790257795772844540500") == LargeInt("284322828472563964457576943789271221840564819473478370719116065292194935090927853437602967"));
258     ASSERT_TRUE(LargeInt("869549755087123220356164064776651528044096600802374658181502491194993992546861742603404354") - LargeInt("262090604074195351322528234252086698672159905831632543036893582496317546944713998616038749") == LargeInt("607459151012927869033635830524564829371936694970742115144608908698676445602147743987365605"));
259     ASSERT_TRUE(LargeInt("893763159013032295053102593511702325560275496761268769707550894560482473978001332384085615") - LargeInt("609708595724848948501484178793871514425223450707668093860079785613213812061995087870056903") == LargeInt("284054563288183346551618414717830811135052046053600675847471108947268661916006244514028712"));
260     ASSERT_TRUE(LargeInt("750940602634977664461407910976265736450970408505333425927741139230947410546634533498431160") - LargeInt("354277384659456239086128867482443008264542536962404673303085660964792502262526265375422477") == LargeInt("396663217975521425375279043493822728186427871542928752624655478266154908284108268123008683"));
261     ASSERT_TRUE(LargeInt("249174764675448190139975931253316997527150910565773726933643011921835964550747236874068477") - LargeInt("43972722203956634762272821812681694311914995942997663292752409333089413808948935289566819") == LargeInt("205202042471491555377703109440635303215235914622776063640890602588746550741798301584501658"));
262     ASSERT_TRUE(LargeInt("862019638512609663970054648760225837103765930354103165007809883031937667099310100720081376") - LargeInt("491453092304387069428278421668954006735239858374045350127901697625802994572839823109040579") == LargeInt("370566546208222594541776227091271830368526071980057814879908185406134672526470277611040797"));
263     ASSERT_TRUE(LargeInt("649875531589192733920523148481340663557697409972133883649268871385718665101787885426649844") - LargeInt("532423999427237867969695185306958493757250960844541718154727132106013363823810349809480332") == LargeInt("117451532161954865950827963174382169800446449127592165494541739279705301277977535617169512"));
264     ASSERT_TRUE(LargeInt("976912086621399719769939574302368741727145459665439046488101873350611979737472654943445943") - LargeInt("537163979786663551119553258939513625882999030536300404519649985925393764073365249402909637") == LargeInt("439748106834736168650386315362855115844146429129138641968451887425218215664107405540536306"));
265     ASSERT_TRUE(LargeInt("199814580316141327299147202015515340175547493800890581469787345650904361602910332157921100") - LargeInt("76544095405751225179701342813202946492712306112543261137495177153160823424440650457533844") == LargeInt("123270484910390102119445859202312393682835187688347320332292168497743538178469681700387256"));
266     ASSERT_TRUE(LargeInt("783425089233966743480715226850235860773270343380070340772046990975360486679056854563760473") - LargeInt("415163576730902007303766415410191505559851791175631574440559660333467432999597991546464742") == LargeInt("368261512503064736176948811440044355213418552204438766331487330641893053679458863017295731"));
267     ASSERT_TRUE(LargeInt("678879516894121713261486901697218151127151041826860892615703573773628897824220275679664576") - LargeInt("208440127163289788938175208715271247995196977881326339628362664176501833688134552127522249") == LargeInt("470439389730831924323311692981946903131954063945534552987340909597127064136085723552142327"));
268     ASSERT_TRUE(LargeInt("203328939433371708891481478124116474002089514779955980044621702917085675357127977993485307") - LargeInt("190649247582988647351908975960143092898230202615270495352843379415014338497539402284541848") == LargeInt("12679691850383061539572502163973381103859312164685484691778323502071336859588575708943459"));
269     ASSERT_TRUE(LargeInt("663893641144101321239911145218572397462973015114812116659833892936787086165099332116836220") - LargeInt("268821041131912153287728711763659539440967798905722292300367815778601995380178864296871638") == LargeInt("395072600012189167952182433454912858022005216209089824359466077158185090784920467819964582"));
270     ASSERT_TRUE(LargeInt("122616235143822652197962505235829327329576571605370798910833503587985769522058766803615765") - LargeInt("117060219975777896648490462798558093640661481273588871918812015348981196944414068915953732") == LargeInt("5556015168044755549472042437271233688915090331781926992021488239004572577644697887662033"));
271     ASSERT_TRUE(LargeInt("879798634043870515416903458914243582000438051273286817258074006901095800948614924567780736") - LargeInt("320052299154084188816930192399613503421464928013139496230814810250025370677390769488718209") == LargeInt("559746334889786326599973266514630078578973123260147321027259196651070430271224155079062527"));
272     ASSERT_TRUE(LargeInt("648283590750310746484011345974392904678373108770067866633079609635172110916199138527652323") - LargeInt("545468934449380320321240587183012207083072725776166804611432108432273606086258076999252871") == LargeInt("102814656300930426162770758791380697595300382993901062021647501202898504829941061528399452"));
273     ASSERT_TRUE(LargeInt("164637895633004729627025016851977348200510268685420295593676216788461567888525800722950657") - LargeInt("111168172058202087408032073841351100314115375146114011101982303362964673402747857112594420") == LargeInt("53469723574802642218992943010626247886394893539306284491693913425496894485777943610356237"));
274     ASSERT_TRUE(LargeInt("785041253289485447322169106732312752655348612247046126088876001551991973734488537077607907") - LargeInt("47394828900829351979902819998072487682443750804576066433930080840281763135628509133311630") == LargeInt("737646424388656095342266286734240264972904861442470059654945920711710210598860027944296277"));
275     ASSERT_TRUE(LargeInt("413499709356620700366056217799856358365059245948259060031501477349805026454177562102206397") - LargeInt("327741185790758349506578153027255192022915790540108022590214545191462170155956047889437627") == LargeInt("85758523565862350859478064772601166342143455408151037441286932158342856298221514212768770"));
276     ASSERT_TRUE(LargeInt("893104761512678673918718387184138957400074960658251534579062683586094646348815628179659684") - LargeInt("264252300933441867500104361501771393386490139716752788560296999417621282975359357818195205") == LargeInt("628852460579236806418614025682367564013584820941498746018765684168473363373456270361464479"));
277     ASSERT_TRUE(LargeInt("860859361323117611894374549118693595357680524324860299590314526390760167049102753297426753") - LargeInt("280973814407201309282748339503861491569750993065392548711220227232647888940285413954472023") == LargeInt("579885546915916302611626209614832103787929531259467750879094299158112278108817339342954730"));
278     ASSERT_TRUE(LargeInt("868956650690730700372618873093560093699230224033562277724989255095051740643270167474100872") - LargeInt("555171883167239591902680156373666594786847893816346912290311966305067599687672371702415967") == LargeInt("313784767523491108469938716719893498912382330217215365434677288789984140955597795771684905"));
279     ASSERT_TRUE(LargeInt("901645122714891443724488643154982150610984784279757514637542607357678910126600518017393760") - LargeInt("144881849733986097639539266516009628829587496982727404596634476197514726898900087358450394") == LargeInt("756763272980905346084949376638972521781397287297030110040908131160164183227700430658943366"));
280     ASSERT_TRUE(LargeInt("809150291315269769845790822528165623253500134416341315143289298524991991063915527603154355") - LargeInt("474868638280037833079130105556153641515805344358665846224786524202464754523308677259159979") == LargeInt("334281653035231936766660716972011981737694790057675468918502774322527236540606850343994376"));
281     ASSERT_TRUE(LargeInt("889052495848220700982207317831158788241795023799367361755645686670782147896940226151672908") - LargeInt("79078478042715449671271657742261950125709276497302395389710931110917803960548822595367588") == LargeInt("809974017805505251310935660088896838116085747302064966365934755559864343936391403556305320"));
282     ASSERT_TRUE(LargeInt("993894288050822394899892337372457126109044528106178820454169705794950771790269194336739353") - LargeInt("219772458309909526659923632665547890540934662802523411192503378485514178551975641274352429") == LargeInt("774121829740912868239968704706909235568109865303655409261666327309436593238293553062386924"));
283     ASSERT_TRUE(LargeInt("743492757744252657449251479870086432853541638309563659413855302355350696248498255815278050") - LargeInt("433930937849915695079042554296859326023277304315273206746375322350914519728598263607657405") == LargeInt("309561819894336962370208925573227106830264333994290452667479980004436176519899992207620645"));
284     ASSERT_TRUE(LargeInt("931269117239275352296785321375156493405679613519922821912684246081599171803786336054247439") - LargeInt("596356254522745235186313337776317288710061427026983622187700793342895217635998795110200373") == LargeInt("334912862716530117110471983598839204695618186492939199724983452738703954167787540944047066"));
285     ASSERT_TRUE(LargeInt("961539156105095114659933251956077758610174022719397482630128006108043738270829026465916896") - LargeInt("442504310407595050342465507807969463374900340698843772242627071004152944886113375730725276") == LargeInt("519034845697500064317467744148108295235273682020553710387500935103890793384715650735191620"));
286     ASSERT_TRUE(LargeInt("450069783605360001653176721188396026331556654921709488344716057740733138699072810790673014") - LargeInt("205356464813969664822890448511470696259387287736136958735733750223102759183048865210642914") == LargeInt("244713318791390336830286272676925330072169367185572529608982307517630379516023945580030100"));
287     ASSERT_TRUE(LargeInt("909367715070747841401487726851336854484062747087697918245405364525809070145090374264948259") - LargeInt("807458176731537066821554675211234125608071719221812101908734861778501418251302200457195174") == LargeInt("101909538339210774579933051640102728875991027865885816336670502747307651893788173807753085"));
288     ASSERT_TRUE(LargeInt("606972460010489048067708599288287397302908028314848609700015331217214590185417595008982217") - LargeInt("325490585339567347192919087467196503580491733176023126642304120195945428442685222542711528") == LargeInt("281481874670921700874789511821090893722416295138825483057711211021269161742732372466270689"));
289     ASSERT_TRUE(LargeInt("584711654729067706669146410914344560366777650689188608743131974883010768664261114275314745") - LargeInt("460708774427482522259998563983349315354125189733397755722024002171711384171748859853353756") == LargeInt("124002880301585184409147846930995245012652460955790853021107972711299384492512254421960989"));
290     ASSERT_TRUE(LargeInt("889896807296696511483532149419083293433949701795579155223380214769743851148177852030146481") - LargeInt("742356494566868154596678006606604876680637806590699509623012147954734297325038131344822767") == LargeInt("147540312729828356886854142812478416753311895204879645600368066815009553823139720685323714"));
291     ASSERT_TRUE(LargeInt("355528232184699050535659512698993639845552977354712234136081976108716065205043329482215799") - LargeInt("39647202866650945658752909557675588947649724520793272592633535679469636282744717338689657") == LargeInt("315881029318048104876906603141318050897903252833918961543448440429246428922298612143526142"));
292     ASSERT_TRUE(LargeInt("939217193991522507343741735725982030318214903986667660742214527642743661366550153000451641") - LargeInt("136608441677736580888969294945644340392285010545194516480381625967013938137139106962745741") == LargeInt("802608752313785926454772440780337689925929893441473144261832901675729723229411046037705900"));
293     ASSERT_TRUE(LargeInt("238977306426055010630186511264896815448225192199499770945744509110234219029124213779522938") - LargeInt("28676052880603143503432072224531091862456892704291931224379974876452885894593632653426251") == LargeInt("210301253545451867126754439040365723585768299495207839721364534233781333134530581126096687"));
294     ASSERT_TRUE(LargeInt("949251269530024480522699625891171955053579572069615063018347137973640707056701864307785559") - LargeInt("433253318580218904621519849250163799833681506060743026484065549731926321228797120075599519") == LargeInt("515997950949805575901179776641008155219898066008872036534281588241714385827904744232186040"));
295     ASSERT_TRUE(LargeInt("22125286388735120585042381855508938929939300233172244637162530209767439779903314244144653") - LargeInt("1435068444948559465967510793385203257167811409085255561678112552163270638204874207006581") == LargeInt("20690217943786561119074871062123735672771488824086989075484417657604169141698440037138072"));
296     ASSERT_TRUE(LargeInt("977099910152438886842561695509832268412437340378088896221817735505033498973124076805624715") - LargeInt("944907475086037234923998255974450076823246979196277850986643582232434496424493460646587134") == LargeInt("32192435066401651918563439535382191589190361181811045235174153272599002548630616159037581"));
297     ASSERT_TRUE(LargeInt("108594307436355954922720838539483368508016330000846370885758841121762021253210379504378940") - LargeInt("103520267677152867285300619435740490149367305955202600643654813649289762550594127236166990") == LargeInt("5074039759203087637420219103742878358649024045643770242104027472472258702616252268211950"));
298     ASSERT_TRUE(LargeInt("814640013573453937243512633150635939727915196538942876973591668883150792391316965478040240") - LargeInt("590063201237916382851675949558405872510736970324987180890040707592494734175238556616067758") == LargeInt("224576812335537554391836683592230067217178226213955696083550961290656058216078408861972482"));
299     ASSERT_TRUE(LargeInt("785000139953270509912854660936795051975948332664446471947222755573190279301234729352542293") - LargeInt("245392114718993760604109143777111898059552988553430585071085993014780446549700892540741226") == LargeInt("539608025234276749308745517159683153916395344111015886876136762558409832751533836811801067"));
300     ASSERT_TRUE(LargeInt("999996179310089177704912193990174647972767821929892385000021735356738318454166560443575438") - LargeInt("393517371884869104046277605025355253123851842695926977781599856023228143591209426929109") == LargeInt("999602661938204308600865916385149292719643970087196458022240135500715090310575351016646329"));
301     ASSERT_TRUE(LargeInt("845110286539501399259246228890300110904744976403173091442929422440859680984300433847028523") - LargeInt("790739285060038825387554077663233269533611088318307074814567277607227903693008542006947584") == LargeInt("54371001479462573871692151227066841371133888084866016628362144833631777291291891840080939"));
302     ASSERT_TRUE(LargeInt("248447107721682306055683634576533766451538266195229654288808613791656504850466479916099578") - LargeInt("71551495172952960499263503132740636596699228258858275541953650239584796028516774084629611") == LargeInt("176895612548729345556420131443793129854839037936371378746854963552071708821949705831469967"));
303     ASSERT_TRUE(LargeInt("447118918284169948202545606566802386370666890634531817998329624604911358523640384189782525") - LargeInt("429903049857362798129431413606019013947702868689313327362683138767292422101310836262716788") == LargeInt("17215868426807150073114192960783372422964021945218490635646485837618936422329547927065737"));
304     ASSERT_TRUE(LargeInt("399306692681174554564732896642033714837925278590609380603845260583833615378958593170864077") - LargeInt("65139309196410194039364398991891129691101760816600977110301693341300533734419116327858883") == LargeInt("334167383484764360525368497650142585146823517774008403493543567242533081644539476843005194"));
305     ASSERT_TRUE(LargeInt("659648769927915113652471522589560613165700204004838199814819165317520628008876485594987203") - LargeInt("56811857925598968023315590418003865780377568655151009851566451099178120086494669209169466") == LargeInt("602836912002316145629155932171556747385322635349687189963252714218342507922381816385817737"));
306     ASSERT_TRUE(LargeInt("458333937109550421375959750814436592597589797182276860839902520638538353261785448371675425") - LargeInt("17682160392175966681071530425914179331402463596206752722803894947662491649386017522978116") == LargeInt("440651776717374454694888220388522413266187333586070108117098625690875861612399430848697309"));
307     ASSERT_TRUE(LargeInt("698206643917077416173538984656111562186967638718838066103850221989613766482299466835748432") - LargeInt("400603090149380773917876754695368852201059368483948628514403744612081126749634931997331126") == LargeInt("297603553767696642255662229960742709985908270234889437589446477377532639732664534838417306"));
308     ASSERT_TRUE(LargeInt("299201677212311848926486701936896489622608758457423259702736062022183031052585695315658699") - LargeInt("277046731097801167366165611898379104443651387395533931998883563672487488936622446202764750") == LargeInt("22154946114510681560321090038517385178957371061889327703852498349695542115963249112893949"));
309     ASSERT_TRUE(LargeInt("640102973719485112088610122718999853288539124652512133927176408547351030008849723718819138") - LargeInt("561626871727664033087227343285615242559436643555767855761313395243387622047612820565967288") == LargeInt("78476101991821079001382779433384610729102481096744278165863013303963407961236903152851850"));
310     ASSERT_TRUE(LargeInt("600292177326320339027320258284023475441527690347009383037417784388884719984070703535026022") - LargeInt("515797277572538489454696732173550180883094153792347352474542622700587709212908246212510041") == LargeInt("84494899753781849572623526110473294558433536554662030562875161688297010771162457322515981"));
311     ASSERT_TRUE(LargeInt("762721487622568947975054908969139150378379342018140173753409364969426387534944921147027069") - LargeInt("153642811383028668448944168952766726070516694891586416017951016090544970503564003163385100") == LargeInt("609078676239540279526110740016372424307862647126553757735458348878881417031380917983641969"));
312     ASSERT_TRUE(LargeInt("776447141922481605535337428475173901750462566496772904575110112907240622450856928974048171") - LargeInt("427491907855920187584336467981948789215354431382715885860507571359128235271146545654722959") == LargeInt("348955234066561417951000960493225112535108135114057018714602541548112387179710383319325212"));
313     ASSERT_TRUE(LargeInt("282018540885598285627481186287951922429844747359827404214173173954878264791256064755689213") - LargeInt("92357086648504776438243442935301397994201153844056993731473271267128392409935473414571765") == LargeInt("189661454237093509189237743352650524435643593515770410482699902687749872381320591341117448"));
314     ASSERT_TRUE(LargeInt("982327422210508749277577686137277959399596289302231287906804379064322500807256128324577883") - LargeInt("590788529649176129001527149271235716903815568164738747126735149894649190984836881304735290") == LargeInt("391538892561332620276050536866042242495780721137492540780069229169673309822419247019842593"));
315     ASSERT_TRUE(LargeInt("506072879231164517970929865849882811160536009236694263224446562810737461456248183132607047") - LargeInt("28839507386298740884599271064211828998492262492034708370033763014613221732665959622633125") == LargeInt("477233371844865777086330594785670982162043746744659554854412799796124239723582223509973922"));
316     ASSERT_TRUE(LargeInt("506609131617665295870947551993955342364505993432895029602430779673052721115499212762975476") - LargeInt("320912489402580046609976770500776357078915015582996524740803759175591278845774794475549147") == LargeInt("185696642215085249260970781493178985285590977849898504861627020497461442269724418287426329"));
317     ASSERT_TRUE(LargeInt("700132221140714831974697599075971234772862697788185479099071768464641011357774350146596499") - LargeInt("247006420971150133123952721055716609315001733315372254984410378256701584784080389237131094") == LargeInt("453125800169564698850744878020254625457860964472813224114661390207939426573693960909465405"));
318 }
319 
320 void testSub_10_5()
321 {
322     ASSERT_TRUE(LargeInt("959239416058762022947954257042460574456903334075781304110994867945262467312555939820404631") - LargeInt("492967921183934241281024619602081374022272672") == LargeInt("959239416058762022947954257042460574456903333582813382927060626664237847710474565798131959"));
323     ASSERT_TRUE(LargeInt("952406952321091354450702949059515004290969948241246993965994797615463922957662874574027378") - LargeInt("750162099704659035321787630530790389362532893") == LargeInt("952406952321091354450702949059515004290969947491084894261335762293676292426872485211494485"));
324     ASSERT_TRUE(LargeInt("903816634561399157667846490264438303367588043110427029510455999380887729827362577265793719") - LargeInt("678898516653009670312425620869767035123351457") == LargeInt("903816634561399157667846490264438303367588042431528512857446329068462108957595542142442262"));
325     ASSERT_TRUE(LargeInt("655833405562851331704515293673904720941343185231100246114390396971539700837721708185676940") - LargeInt("660913708675255724821083539728055645436417806") == LargeInt("655833405562851331704515293673904720941343184570186537439134672150456161109666062749259134"));
326     ASSERT_TRUE(LargeInt("28559920474320681511630476279268624273292533910604268296303528294817463923371535880174276") - LargeInt("114848283395539881076449372745338981097673081") == LargeInt("28559920474320681511630476279268624273292533795755984900763647218368091178032554782501195"));
327     ASSERT_TRUE(LargeInt("843286968605075840006035454645236728631580515620665691025127272902599083056182276996690244") - LargeInt("118131311268523956348020522708375253305805532") == LargeInt("843286968605075840006035454645236728631580515502534379756603316554578560347807023690884712"));
328     ASSERT_TRUE(LargeInt("546748130580248985513713117024686697517868149719979166280991450610301705244605467320270307") - LargeInt("759291496101046107760945970692045024366258531") == LargeInt("546748130580248985513713117024686697517868148960687670179945342849355734552560442954011776"));
329     ASSERT_TRUE(LargeInt("542574822829163505811835421029463267119642057682246923228782497182273324460627551752077423") - LargeInt("204545981235274266909934723974985631883860981") == LargeInt("542574822829163505811835421029463267119642057477700941993508230272338600485641919868216442"));
330     ASSERT_TRUE(LargeInt("989386448083843506106783007195690533865167739786268887202217517542588371057320589789107648") - LargeInt("811458253802776173690935694177048123237216204") == LargeInt("989386448083843506106783007195690533865167738974810633399441343851652676880272466551891444"));
331     ASSERT_TRUE(LargeInt("267886346438590941173692761802530448208867275674618324873557586230060165506704455489881047") - LargeInt("114350924787357955725110343639162565584667545") == LargeInt("267886346438590941173692761802530448208867275560267400086199630504949821867541889905213502"));
332     ASSERT_TRUE(LargeInt("53003095415955860122386381415246817129863802743247517229892653733834002825722929115073788") - LargeInt("155619214844349827884708570202792563922890873") == LargeInt("53003095415955860122386381415246817129863802587628302385542825849125432622930365192182915"));
333     ASSERT_TRUE(LargeInt("780731125048263880037974504697117122494410478981601438299785868599319468746297240340912857") - LargeInt("677414050989487651941074279038871028454509052") == LargeInt("780731125048263880037974504697117122494410478304187387310298216658245189707426211886403805"));
334     ASSERT_TRUE(LargeInt("663509053577846109178564375033886079540904689001726892214341585675108817268899152169259289") - LargeInt("280780932322126039648775139910869309825770746") == LargeInt("663509053577846109178564375033886079540904688720945959892215546026333677358029842343488543"));
335     ASSERT_TRUE(LargeInt("529276935617304285498614393449657837279300527932700029287173651681417849397285623701151621") - LargeInt("934099220440616015647133964524195234053448609") == LargeInt("529276935617304285498614393449657837279300526998600808846557636034283884873090389647703012"));
336     ASSERT_TRUE(LargeInt("691592933928073856370163462936089681374866870454577720478182206494796584892465403268297762") - LargeInt("876442186062129261356714296101145974240180940") == LargeInt("691592933928073856370163462936089681374866869578135534416052945138082288791319429028116822"));
337     ASSERT_TRUE(LargeInt("867395485574522716893835410025007460411829216611200997319673407494949014067349246636221525") - LargeInt("527932572230516597855534894870790424961661674") == LargeInt("867395485574522716893835410025007460411829216083268425089156809639414119196558821674559851"));
338     ASSERT_TRUE(LargeInt("758870773559854054308380572400709013699504875246150696740555910376272552086339134620552354") - LargeInt("211223652455103544747205021408101899816321525") == LargeInt("758870773559854054308380572400709013699504875034927044285452365629067530678237234804230829"));
339     ASSERT_TRUE(LargeInt("585304178737349069809291566646852717298926695062624011166043796407437347894120242407471221") - LargeInt("61313596001021194578287422707190217075567417") == LargeInt("585304178737349069809291566646852717298926695001310415165022601829149925186930025331903804"));
340     ASSERT_TRUE(LargeInt("816447725505463308478877269310695448179182772765887472216766514294419474117607795936396140") - LargeInt("145099386712897099892793158627733292043318950") == LargeInt("816447725505463308478877269310695448179182772620788085503869414401626315489874503893077190"));
341     ASSERT_TRUE(LargeInt("236978870141937861079723899594520335191459780092757552297508352540735967821527397553384687") - LargeInt("947059127638645499669186536712635850888162466") == LargeInt("236978870141937861079723899594520335191459779145698424658862852871549431108891546665222221"));
342     ASSERT_TRUE(LargeInt("476376744141885433622374730396478326944015820757071120118485348008918274793830304574511650") - LargeInt("201748012648484863324837173543973560166410986") == LargeInt("476376744141885433622374730396478326944015820555323107470000484684081101249856744408100664"));
343     ASSERT_TRUE(LargeInt("858324012105284581825083234719179426485571682413362572759884695803364379785132569022024417") - LargeInt("334134490191522475729261383918859692113186919") == LargeInt("858324012105284581825083234719179426485571682079228082568362220074102995866272876908837498"));
344     ASSERT_TRUE(LargeInt("353150282204848353147056323347553353723559899707328240159861585354860968165289691262328663") - LargeInt("299320162699882005649059923827760904661084998") == LargeInt("353150282204848353147056323347553353723559899408008077459979579705801044337528786601243665"));
345     ASSERT_TRUE(LargeInt("864955565649808045887850503363914030532471254915506763285538086847924432519785137570935785") - LargeInt("948779507153819721868147211977443669052624647") == LargeInt("864955565649808045887850503363914030532471253966727256131718364979777220542341468518311138"));
346     ASSERT_TRUE(LargeInt("840932073308861594309991539942905746094780267224058945479408016838086492797695281861005009") - LargeInt("620568493874343210996382625338293182820795620") == LargeInt("840932073308861594309991539942905746094780266603490451605064805841703867459402099040209389"));
347     ASSERT_TRUE(LargeInt("331716073157445281106118273926334600875080734369265338345736801007049522719012958614545914") - LargeInt("169434031223622767368099078150302762939212685") == LargeInt("331716073157445281106118273926334600875080734199831307122114033638950444568710195675333229"));
348     ASSERT_TRUE(LargeInt("181857314554563633894466737489609122742196021958819958978420843465742929708167818025285462") - LargeInt("350819911751999108160366959685720193642960404") == LargeInt("181857314554563633894466737489609122742196021608000047226421735305375970022447624382325058"));
349     ASSERT_TRUE(LargeInt("62847361703073230955004505776928066996327614340883386338011114103142345023749702309308201") - LargeInt("361132653946573125818150989008606196175067715") == LargeInt("62847361703073230955004505776928066996327613979750732391437988284991356015143506134240486"));
350     ASSERT_TRUE(LargeInt("525654820247660853443924647299668912538943373697987490883754844939118561889359830451073307") - LargeInt("498028574139103990184832223135210031457866107") == LargeInt("525654820247660853443924647299668912538943373199958916744650854754286338754149798993207200"));
351     ASSERT_TRUE(LargeInt("262613161324771057762660887424014973637160768342415979370644138135265765488041858280357941") - LargeInt("517029721554358152090371220727773508410205357") == LargeInt("262613161324771057762660887424014973637160767825386257816285986044894544760268349870152584"));
352     ASSERT_TRUE(LargeInt("197189260758355620226633684306762425927591554226824402834289503630175574579813722021847358") - LargeInt("393614392729941565184843483121244220903914688") == LargeInt("197189260758355620226633684306762425927591553833210010104347938445332091458569501117932670"));
353     ASSERT_TRUE(LargeInt("742957308592881779168151921622100588458420291995750388087602378964904627605946880220568852") - LargeInt("28412414587525926724020748971198291173885540") == LargeInt("742957308592881779168151921622100588458420291967337973500076452240883878634748589046683312"));
354     ASSERT_TRUE(LargeInt("157099570096109480842565320860472051421924769767993229496441714390822091116135337768853352") - LargeInt("102710033149587291473445525848919979329354242") == LargeInt("157099570096109480842565320860472051421924769665283196346854422917376565267215358439499110"));
355     ASSERT_TRUE(LargeInt("403004742690725362788994774982323544110942253660437252503527642168718691511913656043123715") - LargeInt("416789515524985225705204996336648712664052364") == LargeInt("403004742690725362788994774982323544110942253243647736978542416463513695175264943379071351"));
356     ASSERT_TRUE(LargeInt("43582506844795119844986927798715699990973674023854874040376058628724373353420610124967616") - LargeInt("174047807839099332077642536633289138681190559") == LargeInt("43582506844795119844986927798715699990973673849807066201276726551081836720131471443777057"));
357     ASSERT_TRUE(LargeInt("203518873015476097417822683855128879423820425409340581392128013312268449130678681767565491") - LargeInt("899742737808054516063861910916518434420107337") == LargeInt("203518873015476097417822683855128879423820424509597843584073497248406538214160247347458154"));
358     ASSERT_TRUE(LargeInt("135483649539247870497945213900045541893700343256587124494805881526166244090014043680950838") - LargeInt("624034030733568273327719996904291152829553246") == LargeInt("135483649539247870497945213900045541893700342632553093761237608198446247185722890851397592"));
359     ASSERT_TRUE(LargeInt("917339285954310169536129805254911929929301932687462932764877497365580968532612594762497015") - LargeInt("861189622264821669517597846765561803265603866") == LargeInt("917339285954310169536129805254911929929301931826273310500055827847983121767050791496893149"));
360     ASSERT_TRUE(LargeInt("477102556588063581263011235081537660768492378264601451569807222011875200129367206615023385") - LargeInt("837463649375894481572774408302290795720051797") == LargeInt("477102556588063581263011235081537660768492377427137802193912740439100791827076410894971588"));
361     ASSERT_TRUE(LargeInt("800932727338857083492250613545019962915491098131791462142595179905857710135363530359237908") - LargeInt("860064994134585694049933143460473757052889085") == LargeInt("800932727338857083492250613545019962915491097271726468008009485855924566674889773306348823"));
362     ASSERT_TRUE(LargeInt("243806597472811509187133703650082736258405930821009868190559648396770236511710123511365934") - LargeInt("849837924299586673118532514011482290534745") == LargeInt("243806597472811509187133703650082736258405930820160030266260061723651703997698641220831189"));
363     ASSERT_TRUE(LargeInt("950451304392513821877726880541861648781671268154407511119277292668766352008180299099146721") - LargeInt("242207961258758441491617804811509078998747974") == LargeInt("950451304392513821877726880541861648781671267912199549860518851177148547196671220100398747"));
364     ASSERT_TRUE(LargeInt("295349984837729207208391141014724425892719033600953930243812399186410471470314282806743036") - LargeInt("322474425465305761331183409902501597574337286") == LargeInt("295349984837729207208391141014724425892719033278479504778506637855227061567812685232405750"));
365     ASSERT_TRUE(LargeInt("312099993178812680019296973719870559346320233144255581695446143560477027785948304880095114") - LargeInt("472881996830825021542781576913720865108272158") == LargeInt("312099993178812680019296973719870559346320232671373584864621122017695450872227439771822956"));
366     ASSERT_TRUE(LargeInt("739137621094877352192711433144835802850983870972188247288131824433501727957612078016788891") - LargeInt("16556929639155225581264466885474225765217252") == LargeInt("739137621094877352192711433144835802850983870955631317648976598852237261072137852251571639"));
367     ASSERT_TRUE(LargeInt("51563530624751958629592445852763989108856800510138047855976803663186756321689602754575812") - LargeInt("217817000901666893740711800430904815005460639") == LargeInt("51563530624751958629592445852763989108856800292321046954309909922474955890784787749115173"));
368     ASSERT_TRUE(LargeInt("416535235649889241333467147725843697918436654991766957746483424238820212930059221142258835") - LargeInt("15808493973825355411651944875060239131557379") == LargeInt("416535235649889241333467147725843697918436654975958463772658068827168268054998982010701456"));
369     ASSERT_TRUE(LargeInt("538011197563341052923069063846645126440373848303927450659514611424329563960511702449221086") - LargeInt("801725105648719770496634045316390648550561587") == LargeInt("538011197563341052923069063846645126440373847502202345010794840927695518644121053898659499"));
370     ASSERT_TRUE(LargeInt("123349196740572651427082112501434457582623234674615348445989383962934912391748337838013460") - LargeInt("461989030039116319639315027430259690811631918") == LargeInt("123349196740572651427082112501434457582623234212626318406873064323619884961488647026381542"));
371     ASSERT_TRUE(LargeInt("511167536814314259141974930415775429004297166598799165463167339616082225046911001888938191") - LargeInt("152947040675875149556678659190008218213181100") == LargeInt("511167536814314259141974930415775429004297166445852124787292190059403565856902783675757091"));
372     ASSERT_TRUE(LargeInt("688964193922533527292978570304764554025413726015851644310638069568896902511736941798555726") - LargeInt("615117052453937508381042313344896515209363342") == LargeInt("688964193922533527292978570304764554025413725400734591856700561187854589166840426589192384"));
373     ASSERT_TRUE(LargeInt("130544155610539071568780145045583218377008014601666899708297971841807981669461455665771816") - LargeInt("718474514007067943891065002073009359885543") == LargeInt("130544155610539071568780145045583218377008014600948425194290903897916916667388446305886273"));
374     ASSERT_TRUE(LargeInt("657154915298886298564051220477293221921661988445594418848990969256805512407182444989072589") - LargeInt("551135660607182996538766219907775154626494228") == LargeInt("657154915298886298564051220477293221921661987894458758241807972718039292499407290362578361"));
375     ASSERT_TRUE(LargeInt("339155263040783234051444322515545737645151011812336370853187427613536196387724821056419268") - LargeInt("472066913478294263667257570583887526196586061") == LargeInt("339155263040783234051444322515545737645151011340269457374893163946278625803837294859833207"));
376     ASSERT_TRUE(LargeInt("25602051899631291178607168734549425366768025066502731695177693631284026463591832030311896") - LargeInt("143354773795930734541540692495939347310625620") == LargeInt("25602051899631291178607168734549425366768024923147957899246959089743333967652484719686276"));
377     ASSERT_TRUE(LargeInt("90127937935894007145704731106211214935901881871226970892187890175765767760729878643143335") - LargeInt("686553394159797343710888935610927413338299735") == LargeInt("90127937935894007145704731106211214935901881184673576732390546464876832149802465304843600"));
378     ASSERT_TRUE(LargeInt("704600620815031602372691643254901465949510365905491120390633195556384010044927164574770762") - LargeInt("177061060747149608769079174147839659683866375") == LargeInt("704600620815031602372691643254901465949510365728430059643483586787304835897087504890904387"));
379     ASSERT_TRUE(LargeInt("263593166506155003948103371412611269727900331243467506974474261730473095236548617544427711") - LargeInt("261478443206611316006302117752480012531005887") == LargeInt("263593166506155003948103371412611269727900330981989063767862945724170977484068605013421824"));
380     ASSERT_TRUE(LargeInt("781453054343012800572183046861102208424561118327281125669388937848519286168834637294984965") - LargeInt("851425284787619949199548462614824930898416039") == LargeInt("781453054343012800572183046861102208424561117475855840881768988648970823554009706396568926"));
381     ASSERT_TRUE(LargeInt("459222645683728994128233344868828311979569910834944932959874474283427065421405658659604496") - LargeInt("459260700723397685546689777276264237973814650") == LargeInt("459222645683728994128233344868828311979569910375684232236476788736737288145141420685789846"));
382     ASSERT_TRUE(LargeInt("598472148517751729840194790019147472177895592351837984289250527419481997402054005630497867") - LargeInt("207504355644091466953400082303466074281598838") == LargeInt("598472148517751729840194790019147472177895592144333628645159060466081915098587931348899029"));
383     ASSERT_TRUE(LargeInt("344393262339404027387087589995864187064197964946191121954391081042796973086365428445455878") - LargeInt("105953978501221973863799853968683177989828220") == LargeInt("344393262339404027387087589995864187064197964840237143453169107178997119117682250455627658"));
384     ASSERT_TRUE(LargeInt("865991720009421418514171944821421154915886096522038781643406494760797857539344568176993192") - LargeInt("473462237177371950504821935912482609003316782") == LargeInt("865991720009421418514171944821421154915886096048576544466034544255975921626861959173676410"));
385     ASSERT_TRUE(LargeInt("757103752701821018121887827918445626178362635112190277008773260397088087303517809106177328") - LargeInt("194631012262317614038690864512279498227561591") == LargeInt("757103752701821018121887827918445626178362634917559264746455646358397222791238310878615737"));
386     ASSERT_TRUE(LargeInt("266566237814205996634720932077466778155353089903733769943309746722107501336385624085294476") - LargeInt("177602067506789012481721185842930472992214198") == LargeInt("266566237814205996634720932077466778155353089726131702436520734240386315493455151093080278"));
387     ASSERT_TRUE(LargeInt("499829061048343522879688540036950146795748358528096366018935566779522704769521221791459924") - LargeInt("850556600413521872711470100559500679736458789") == LargeInt("499829061048343522879688540036950146795748357677539765605413694068052604210020542055001135"));
388     ASSERT_TRUE(LargeInt("583849907604141957082537953819598656611064494675636679640139826271352647339288904631331076") - LargeInt("856085193236501979960387654739386845117643842") == LargeInt("583849907604141957082537953819598656611064493819551486403637846310964992599902059513687234"));
389     ASSERT_TRUE(LargeInt("151601822200824603008533512037079545576166735729560612451556204128909089293159995142523370") - LargeInt("284200814775674363781063256895931540222043891") == LargeInt("151601822200824603008533512037079545576166735445359797675881840347845832397228454920479479"));
390     ASSERT_TRUE(LargeInt("971023821295472085403677372067524972614830347550157990266986197778138799561067102762951744") - LargeInt("547013325410481392903622007856220444588589529") == LargeInt("971023821295472085403677372067524972614830347003144664856504804874516791704846658174362215"));
391     ASSERT_TRUE(LargeInt("211855839186717567081145595884913901107022231257122483586844659887553546867766632284130911") - LargeInt("593961684714487734961270978711965095915021613") == LargeInt("211855839186717567081145595884913901107022230663160798872356924926282568155801536369109298"));
392     ASSERT_TRUE(LargeInt("648884115032034272508835894603638565067808744763577761142344547202720499160628056580636658") - LargeInt("923993608924389343628144765092278959748267099") == LargeInt("648884115032034272508835894603638565067808743839584152217955203574575734068349096832369559"));
393     ASSERT_TRUE(LargeInt("317987862370578905217470550124806489453916590765338108571461648731541455033846115485442004") - LargeInt("970025019912511018855672029723395738322285866") == LargeInt("317987862370578905217470550124806489453916589795313088658950629875869425310450377163156138"));
394     ASSERT_TRUE(LargeInt("995550439738169557572063762113560186480362569312379386418810081145299563887195232385050870") - LargeInt("959004229544367123506537788851723367169448888") == LargeInt("995550439738169557572063762113560186480362568353375156874442957638761775035471865215601982"));
395     ASSERT_TRUE(LargeInt("773314364590133742150462093840508829945619300096692154271454322095875905390610809852301600") - LargeInt("420835684229120184378798338233513465876573052") == LargeInt("773314364590133742150462093840508829945619299675856470042334137717077567157097343975728548"));
396     ASSERT_TRUE(LargeInt("47835104009746101923257800073653298264295945562522886078469826769462937425054553572842677") - LargeInt("166107227484048406392913719933212610927143900") == LargeInt("47835104009746101923257800073653298264295945396415658594421420376549217491841942645698777"));
397     ASSERT_TRUE(LargeInt("981754280241853878917899548463649503917112221876937628419108187038811781917976065040125480") - LargeInt("744628748352508592487721972484333846461837245") == LargeInt("981754280241853878917899548463649503917112221132308880066599594551089809433642218578288235"));
398     ASSERT_TRUE(LargeInt("35059104541474141394910782878282222745296612948840139244641329195851869122493087977024133") - LargeInt("444566320028489433217161031469182694533471018") == LargeInt("35059104541474141394910782878282222745296612504273819216151895978690837653310393443553115"));
399     ASSERT_TRUE(LargeInt("488454473731916527550653782012162274323746667716857396502413975229571286931443140415956158") - LargeInt("265491823504082906369798788120671610196530767") == LargeInt("488454473731916527550653782012162274323746667451365572998331068859772498810771530219425391"));
400     ASSERT_TRUE(LargeInt("392730629842738500148679294974405653165753034002597121572460010256014383068437390322699349") - LargeInt("981728376229042249513889431643419586499171814") == LargeInt("392730629842738500148679294974405653165753033020868745343417760742124951425017803823527535"));
401     ASSERT_TRUE(LargeInt("194465025755654034931870484535075657093870320629745357179013775356965566043275742214998372") - LargeInt("430407879470298590865986824259200656719682168") == LargeInt("194465025755654034931870484535075657093870320199337477708715184490978741784075085495316204"));
402     ASSERT_TRUE(LargeInt("336584162962932481652358757391551081111737541842978458038896981335150523653242609274535292") - LargeInt("695049848446410632071283223914580665233535776") == LargeInt("336584162962932481652358757391551081111737541147928609592486349263867299738661944040999516"));
403     ASSERT_TRUE(LargeInt("34828577149962130802736477726284458539677104835428427352949538840508025500835059464950814") - LargeInt("126039040676632877675522836467094453190096278") == LargeInt("34828577149962130802736477726284458539677104709389386676316661164985189033740606274854536"));
404     ASSERT_TRUE(LargeInt("917386139780483369306958346389702399427898020964289907432716455325619478444992614149757593") - LargeInt("769200492629285802679861362240691688584784129") == LargeInt("917386139780483369306958346389702399427898020195089414803430652645758116204300925564973464"));
405     ASSERT_TRUE(LargeInt("648961575747041873996367237301590126424432586039153038794533281314292279963741944598844151") - LargeInt("196470824045118051312549424913901854202810496") == LargeInt("648961575747041873996367237301590126424432585842682214749415230001742855049840090396033655"));
406     ASSERT_TRUE(LargeInt("763582380438816686488031317025278001008116015344590235228455057305751032607930316097148644") - LargeInt("154727350674879630918996360799881200273522164") == LargeInt("763582380438816686488031317025278001008116015189862884553575426386754671808049115823626480"));
407     ASSERT_TRUE(LargeInt("111617509919707658631060012589190844088936928028771666361261161870262121495390237681933208") - LargeInt("790064820636011723018435177792741103321532785") == LargeInt("111617509919707658631060012589190844088936927238706845725249438851826943702649134360400423"));
408     ASSERT_TRUE(LargeInt("629135297622912346894685383905454934766595843481303081670883827964937332598080206630248489") - LargeInt("456680805474244685782689608822972150639069049") == LargeInt("629135297622912346894685383905454934766595843024622276196639142182247723775108055991179440"));
409     ASSERT_TRUE(LargeInt("85399471763823723957761579282382788013401676716215288081855586463386207433337316353975257") - LargeInt("341150004940001717420490388762011721009073785") == LargeInt("85399471763823723957761579282382788013401676375065283141853869042895818671325595344901472"));
410     ASSERT_TRUE(LargeInt("252596020670345036395683504316665562625402898013460721826727063724369884833461053825480720") - LargeInt("918371425681134607311209470772284145686958210") == LargeInt("252596020670345036395683504316665562625402897095089296145592456413160414061176908138522510"));
411     ASSERT_TRUE(LargeInt("382888509078889911424547493595286092470866764351366436472989207770730806197192323111678179") - LargeInt("506806631775083159217630738077391997433527014") == LargeInt("382888509078889911424547493595286092470866763844559804697906048553100068119800325678151165"));
412     ASSERT_TRUE(LargeInt("998957616262589014328186955524471077223077838095675377567971835342233309216782047236015274") - LargeInt("273662573412855666338485043090430615292977982") == LargeInt("998957616262589014328186955524471077223077837822012804155116169003748266126351431943037292"));
413     ASSERT_TRUE(LargeInt("762257854472173794704537613177738777171166183706845669915505678256786534530281541898859461") - LargeInt("600488723405978077309038182225528445853649684") == LargeInt("762257854472173794704537613177738777171166183106356946509527600947748352304753096045209777"));
414     ASSERT_TRUE(LargeInt("590075568703262679794600119643568576982023761061927062863689154552891558934885546136133477") - LargeInt("239556662908973125072779893398984275200834648") == LargeInt("590075568703262679794600119643568576982023760822370399954716029480111665535901270935298829"));
415     ASSERT_TRUE(LargeInt("533855710638055471068152080313840863690033486396307100017969274463107313219846427621924570") - LargeInt("237200689605364638195582010415962438177119569") == LargeInt("533855710638055471068152080313840863690033486159106410412604636267525302803883989444805001"));
416     ASSERT_TRUE(LargeInt("767855927370859775413581889807674642183696601092376700384435160236178415483778635269950590") - LargeInt("933905417188572086498945092857166542211005821") == LargeInt("767855927370859775413581889807674642183696600158471283195863073737233322626612093058944769"));
417     ASSERT_TRUE(LargeInt("909820185856609139150626750876322824007214055512333635024066080169629708643203491991430111") - LargeInt("244508317135237680358395851743439739376659586") == LargeInt("909820185856609139150626750876322824007214055267825317888828399811233856899763752614770525"));
418     ASSERT_TRUE(LargeInt("245115882254107200323545837970878453674849005824952088122524581978662927218316490944315887") - LargeInt("889699346312644069829404836220689582878056822") == LargeInt("245115882254107200323545837970878453674849004935252741809880512149258090997626908066259065"));
419     ASSERT_TRUE(LargeInt("240699389060481201063803287796533649939860826754831192049382395631764798139304423176447922") - LargeInt("738625023825552882784837084508449837433516145") == LargeInt("240699389060481201063803287796533649939860826016206168223829512846927713630854585742931777"));
420     ASSERT_TRUE(LargeInt("884899973847208188604863513851249741766574681248501944759891667967364076404203300118722966") - LargeInt("795686968988214980620279472682892339295626854") == LargeInt("884899973847208188604863513851249741766574680452814975771676687347084603721310960823096112"));
421     ASSERT_TRUE(LargeInt("971419474052825046594475553409737349580661488047542929331887290982721898395154295160648869") - LargeInt("602076091424167433383014385991288090794411104") == LargeInt("971419474052825046594475553409737349580661487445466837907719857599707512403866204366237765"));
422 }
423 
424 void testMul_10_10()
425 {
426     ASSERT_TRUE(LargeInt("348748350720730964968486955482904362528059380007978601270074690238257410552853598549656644") * LargeInt("192155339011431152116631766066230124579323034951224959502343918940233885133267669178325933") == LargeInt("67013857562419548348829856516800718054526682467289452748589146382441589354156981564375621570916378187125114449056107324519052838748485122431442745043269212158125470017803870948852"));
427     ASSERT_TRUE(LargeInt("152537027336769704578891333398482157247814316846447106300334658524803641845794029983814625") * LargeInt("86829931535621915845078739783709672051780225533448508513202938227102855274332451944458016") == LargeInt("13244779640299002030909256448128859739142572630172020573384200399481928263910784981070429909407834376819984448590117143874477624177195021673151036304529782134938909053947839284000"));
428     ASSERT_TRUE(LargeInt("722085092767953715329017932857598312048167349888470969218695375855496821504082616765776225") * LargeInt("188858057740574212762336819462145789088969592377715811532715504820165110353381419720089463") == LargeInt("136371588143578089667015717101652576729564203648794849035756029893154170057835031247469720969292125066442670507232686208263748095327931196292779974353403013514646841465873638417175"));
429     ASSERT_TRUE(LargeInt("160315970851516303602647009095643113236189528552740584327750194472578944467893965799327182") * LargeInt("960926840619744990066485337248039604492386194325958674155292203462082026110268344240097289") == LargeInt("154051919371234690592244130535096977605162345583565598316480958634330359697086600476834297590995093924317295404772790979383568223007018168464720458121377876938065401203782422209598"));
430     ASSERT_TRUE(LargeInt("496984777609839760579056132284627357846688386778364241922530272041153223046137009981997589") * LargeInt("626755214251454107993558999157680070875247484791873697967005241358216610508224099093842884") == LargeInt("311487800770566391587694639756198891252725915018972632212662012677796314246332552983633642243288615506005018484123337117878179381387716326162523532866688824952782965544752832806676"));
431     ASSERT_TRUE(LargeInt("433810143536195256795393406438052461580599997362298745154218878245877014048648563616169687") * LargeInt("472796247507125085820090294110646898178358264081078932930768699095538527953601888307672674") == LargeInt("205103807994440432342481957832197865240084325134672861831680228238738552925603118968402731940673227987830705595431932539673316339290619332294982504565062778381839505615093237033038"));
432     ASSERT_TRUE(LargeInt("60894573646594378770723887969280386039042978096484295790165165532918958101885801402117001") * LargeInt("724302788664896370047684911739871255463977443006332864044404711096939910066490150650730238") == LargeInt("44106109506788216221985342511183760404487982150602491618163323023231829300258450140242591311751847424294768555266542618015943916137135825231032324374659544859055509260479764576238"));
433     ASSERT_TRUE(LargeInt("374733808044815317784312465792624605374980226682732904986825619097480337324906751622026564") * LargeInt("899391949754574530432337213980601198446584790635431108673525465636801059981011584990207686") == LargeInt("337032570256382915249625258142559548759947475079606476161434553926961970195562132768435372235259414549583125737274505431537282582259181501657997169603251995345469529141046568970904"));
434     ASSERT_TRUE(LargeInt("840833167207665254860722669843203618723109944104676654016280988071503522650458332146558196") * LargeInt("112242922941066219735603076980970961763617168169246939524259782870882840274445353612778389") == LargeInt("94377572393182619095874009729907923495707982564962572758614668005766028330988404508563779123334492035002766193067083140854758446938571277915332643063847953082918720658031239626244"));
435     ASSERT_TRUE(LargeInt("596285895607662078983225361256225795636778099607263676293032189318537118421629933192729770") * LargeInt("613876788989972254545905487750791905294019756471381858373820798875437451661000356159323627") == LargeInt("366046070915641397664266361330079727323037561252427404195548973835960841207977667707480732101095841606025006675193554306509365564264277072594678305191637562329460789831516987275790"));
436     ASSERT_TRUE(LargeInt("13094870505899465934386684675342642363024888891884191427846946564849453428494434627097490") * LargeInt("679741990865548581841961452265693563230030557619803463912365306930471848367430132063039445") == LargeInt("8901133347806656309962625527264457386627121928058068845326931632501606563789715858846798586945012441517475507726312571654213530655981165862630090624861125446957872049687730493050"));
437     ASSERT_TRUE(LargeInt("246253771691345599275482299804446136931900667095874097383256923105214866096029140761144941") * LargeInt("438879149067758748028121227153063391542257986877950808232343605826154597257029490318964956") == LargeInt("108075645774623894541927066795985515731747061363278601307736350686415186775530600400286600444914577447017124708540047188067249258569215741625958593263181200284899658906492615687596"));
438     ASSERT_TRUE(LargeInt("12536873857434975414497042120887299636234706841381354959216334577602439576677371000169348") * LargeInt("348768635984009546006622362194478665518637002306704382619762523526798240841623845696439669") == LargeInt("4372468394761184529369575193650190014908104556401350784864556063148699225895974331429287203533701856533093335748412482998931613744221815031257264983335366375230694051199665065812"));
439     ASSERT_TRUE(LargeInt("294194593863632216039723697561927277455020728253910978752854064024250476331699173025569702") * LargeInt("931923580374886012603795012594525308371768102820222936799825824899171073077944077903712912") == LargeInt("274166879240331604798202712255736062551795827834198170827695807798733922203848909337330085185257581344731689510642613086245195154300562389895964799073087849878511384484499853392224"));
440     ASSERT_TRUE(LargeInt("646628358213508057639606671929498957745286223194137406765553858315485712155007054675958893") * LargeInt("486107585274947782271654956445718732834662502229702007218008254808367777439218620822780130") == LargeInt("314330949781472349321995321015731180850611384416444879635211313980138968585107006544940187575898535975851670519717792696209823824705213490619959435681507582869357757390225857196090"));
441     ASSERT_TRUE(LargeInt("50198770402611252819614025626334682122649570523601147886023046480697801929708713966223255") * LargeInt("377899232075035630487589707437587241674763660969463715202892582942924553630446278515402372") == LargeInt("18970076786257819621951667595365044391983519988076379715646896213458929563723641070325292811366265457874076634201255765813358290149974287207940404384305493010132279055883508560860"));
442     ASSERT_TRUE(LargeInt("612733287927884020172449024540035032517548924228515216039054186341652834130308641975398500") * LargeInt("125101403574964280308009604787940320182631365051713174314724316971653028866333525553627341") == LargeInt("76653794336881007659069940352980242156156990511579326301607743759203303419106125410199062995183662324111718857930156509878150281489753725044395747488225276844766750873358970388500"));
443     ASSERT_TRUE(LargeInt("109353901103887005460176071813262208818449201898196344126320358068272065233892185690682746") * LargeInt("592976942900317977853107888969119631657250852926146079921855821570045732855473358929401838") == LargeInt("64844341970806623923512801159169218844910083439251244133830774294596601989006329964398214887669930439778241067942343399861239892334441323937292934192627938543287308038911607287148"));
444     ASSERT_TRUE(LargeInt("357065475362449391952283550498319487977238281204455400251080225272832496198178276453193912") * LargeInt("103823198179687193056015705308339474358204242514788991458862281269433705215213991542609989") == LargeInt("37071679611679797990732004903677758198384672012139692292241886723067914497334446304241215076438211905916545080241803599134864268613092782232111125643003359533202904729299605186968"));
445     ASSERT_TRUE(LargeInt("623579355979386044226248711964182012181877461319900711999376616323884582836494093411643876") * LargeInt("44923816222584324914731824260686993291078928220246372485168476876967519436456768193220668") == LargeInt("28013564388215428425222741961977713938061268428249090528674351272578706203000846595558136827671267142684619568679797553787349046560267022710851350541719559368547193004996698829168"));
446     ASSERT_TRUE(LargeInt("26574113372570474880479666392885538332679326576316818496156290830707152349326007557239710") * LargeInt("330959424458565892927582492434847962590049963129061000531503959703440003270027655300628726") == LargeInt("8794953267282603793301609695907451664787453066693885241423863720432979957776753016930660831139411677012570991334656528736841233433856594764724730991829815178631774779396093909460"));
447     ASSERT_TRUE(LargeInt("501204554546922986229474787363017110565996390757840998400172154999806771931603698310344170") * LargeInt("862686096963147382589702970309060684447056142722777879260656289700020658645510059339833772") == LargeInt("432382200942237894656874249331922170596120677094145524489280439497511384856174858039287747079386102944609150825656411540640411610239569579941346772547785927452936292960315909309240"));
448     ASSERT_TRUE(LargeInt("849793990834902781622772975670323211379671942174614659507073057464422850862977721508478563") * LargeInt("537116912921306592624152574579767140797628038433998492424968926867031426871841260132097811") == LargeInt("456438724976320090014018793199311945665668008212966819116187562005854980286866137612032301346909146011646261815478346196233416794184089299654648675158430617580707001947016112725593"));
449     ASSERT_TRUE(LargeInt("187856896853009261543530210492623828881984047677725176879673115002829888172061078026454956") * LargeInt("916742438774156726878195988572633457891519138095062733463088370954669823093202851651276638") == LargeInt("172216389761572918453216054699893907791305431931761557888799269183775051355020297273412126637211114723202147687829158245153304208406659375263388880844343234807747750004814802117928"));
450     ASSERT_TRUE(LargeInt("394048731804800920673794403115329766695420658197035374070921905702835540661083532817977792") * LargeInt("189773025635330377953015317842906017736089181446515622194825012593641729918790083253889306") == LargeInt("74779820082361909948501538835440824707455667752562357912685110550337080705003880706557225003559184804529328975256091455189041192640364359570169736063254364822686759021341934292352"));
451     ASSERT_TRUE(LargeInt("815636320962025468393039550501326524363703010156480710097110389883069050205709754309232251") * LargeInt("621484802439633017298761310621044062637016930038447961802510052376757543572294457618166709") == LargeInt("506905577795673504546201618562697318713780464496980191475875969129724726419602084230375391962631586835375038401168245131152972950127735238749356139473148830544146003469375917331959"));
452     ASSERT_TRUE(LargeInt("220769367866581693568045890788694012613179643204740632204393624598428945519115186564287735") * LargeInt("582585501334557485574154868386696270538300003584129413824017557879077997966652653862530635") == LargeInt("128617032857865841710007687174540041145682704444477000622384032188916687649194630698615180045806450229002139179713841944564200806583033996633543889858464501408315598549523392261725"));
453     ASSERT_TRUE(LargeInt("272799364112976448191347131753645016848348229523727500417530095178836820484746258760103131") * LargeInt("339264661914060694823801495617565499196277795858675163475306992347868813870884732057789517") == LargeInt("92551184036159696705219918586951338599719615334255339513887544794738046992551668386959770526298088101789624486890459710749726358967529835978546459399244064477762694599270810677727"));
454     ASSERT_TRUE(LargeInt("596989329488676248489375702227854353616189306670950443391531066195308466686281342496066954") * LargeInt("965420175892494718600849408967926014805857074751881673365714172997117023926524155265911229") == LargeInt("576345543480900307964662454457815902480651625384968208032019753283990550331979077620716355630207890144126240337282146017567331762350279355645304573321057740246596601172961404426466"));
455     ASSERT_TRUE(LargeInt("438031061664775068468726064421645689224582004374372875523445915600478754072960708085680803") * LargeInt("256069306417702513969709746711332243303316758253762872346644293283109986562952211080156096") == LargeInt("112166310149908832083086665558341028557630574041804392932107208192905183495910303351727025335541547469563931953961919568625209937180026051042058749872816528190973010649239670625088"));
456     ASSERT_TRUE(LargeInt("619524404745342361802708526263105558756925568696068715594702179843634278625918774857516330") * LargeInt("912598521654454059734309314766754324561020028265917661724040703409102626193865192396568045") == LargeInt("565377055899455082809869406018062652895316082469518150723410104133906423520038610945030978513452754077273629038243996201723402868590249288374766085516387474705650832625764543674850"));
457     ASSERT_TRUE(LargeInt("655953609741684823958295127160570288517869624688829710588550046544342328681331666128564240") * LargeInt("502446684759421836965831644593001414198869476380153959750291227131174836651216518566607861") == LargeInt("329581716570685131645367669352459436992023819333810748741552065633068210296078278209651684753424609873808611858480332210649078785812123177184677791752236822735070688788255027490640"));
458     ASSERT_TRUE(LargeInt("574981996877714840157846002732968613543633328515795418218108079926792253372637006481264765") * LargeInt("356590393426196774834786079306174534013206574145090197161418406220559571040609360618683147") == LargeInt("205033056479604580451165592360410627969273082050243528281690562165414551548165821132082108898207096367496407664339342764190626510275150063834373056152557383140255955688681350415455"));
459     ASSERT_TRUE(LargeInt("545448106379267538362756028005439202481034960606812817053935826580061398436477501539028845") * LargeInt("410531773364308030945820145008623764259181912628718389054420738653584444657467683001744759") == LargeInt("223923778390084438583564946157713747384618616596058114686415493557314135127538676863143774076045930824036303924564858111446699807837334446201397356701608923256038841423869428573355"));
460     ASSERT_TRUE(LargeInt("831266093779824983247275476497838728033082583823850954594322271988593119615578811572262403") * LargeInt("245718771462366240511895429777856256889968547269969630808651962440494706769697528492642823") == LargeInt("204257683321898718124602498880777342252408481448782303247113128730543972517554359183294119709175992017312716008551708170996593241153858110601920798291470766482103468384202710683669"));
461     ASSERT_TRUE(LargeInt("528001389719779423320717698242694574959715377470435533600723366844592283053424723442661424") * LargeInt("566210521476506680789447875948140543209559495713151991157378133688222624431906898710078620") == LargeInt("298959942213556540951090916966732881012262239642951091752881038224566709768833012859975260610947222916324375199663318020499609695683826777250447193528634160709566400149425081154880"));
462     ASSERT_TRUE(LargeInt("44698620552230495165939720906768558479580400249459480313533154304468656591418721625169789") * LargeInt("266345358556950347335815559041204936151718181769132465519965298209922037732869250296614099") == LargeInt("11905270117984901175486082527103282708417061473061783303187128137119324310737776417553191997431585081755456043076124646243046149617139919491523476782251779741232633669802686255111"));
463     ASSERT_TRUE(LargeInt("118996300479869305219052568627582341569435902311944186455763885039233803418811404751169919") * LargeInt("486979230311327014534791362653926170660332939441001972497937559066341076518260309718861138") == LargeInt("57948726817582147725291872788289811974574280949042453183507185393477111763974336275571667771484777107742347975662944929099106750448757643163648235035087298073291359249585803707822"));
464     ASSERT_TRUE(LargeInt("220430263545025668318237071706961412978402218063946612748643689627783104425775683342991439") * LargeInt("313562128787761930354231644800735892830467063574047230606795923616100059728073955125885110") == LargeInt("69118582686425642291210034606251837269968052124737665992642796154100530337110320410942583750966746282188893067707909493355330346356170285736681378537380675534558256828890027573290"));
465     ASSERT_TRUE(LargeInt("74542008746938561855642772541517806763713809304580533428242911530268189844529677728574891") * LargeInt("606401064630696320733173410678725657309075623237401856769531127521653484351429909554945526") == LargeInt("45202353463854221308645772693368996413097057725189298149481792714049919852088372886137259891678545132260528379528800680356154583059689494261103201234389571363024873509397116387666"));
466     ASSERT_TRUE(LargeInt("767695967762031251403311233250177637468587828116785975370694673775754896400683993341223084") * LargeInt("729739895985983393016851383745392176308272273734195495794410195680149513792868155309432427") == LargeInt("560218375663523545485133871187526168721292103574016913671731813511660513637578779385767871156824227673007001414683323258491690635505702204102928660701053295843136574116518030544868"));
467     ASSERT_TRUE(LargeInt("300218350152049579004903634557510890252607320956250372904609351287510147931552199395937736") * LargeInt("817221709956350778419192616501434327930329571401820103101730583928006331249350565246333592") == LargeInt("245344953471532419670756216511294012668059990915278086147167296666020463000100129409625347946970650635087653215297475617532891332724024764570825100793004412606972589122412717227712"));
468     ASSERT_TRUE(LargeInt("209837536510912446646806420273769412003828887177656641584144743507095455917801672219206311") * LargeInt("575878300035254825719950137141042511121023118116868077343163884003984970508192508889111464") == LargeInt("120840883809489977002999473821568791767714701980620339576140856723903997460166271107455825661417658508768207646715679266519072965698473718330213835584503423642159404984640091249304"));
469     ASSERT_TRUE(LargeInt("795735468268572084538239063976165023985465454924575802068944118742585151633553035907057395") * LargeInt("693125687019488897441990605557364681710511149625265017524181486241932154064002926574537298") == LargeInt("551544693129428733536629600164856691682949766169540678352836169268364701823666566571209274077664068790074533775298577381803236500977115036236377052679814002675414719675504854218710"));
470     ASSERT_TRUE(LargeInt("295463511271186116167061360387933827761397581440397941442198198777964644629155356328640803") * LargeInt("55033084542174671859655834760375476952618528486605489254472490244058172221679794391784144") == LargeInt("16260268394914964580612701615090818202514521080339950045741216823147225313060044327706119225118456262099870229749609669171662749281615939339425571827265768019634231266101686827632"));
471     ASSERT_TRUE(LargeInt("943420729613431679426536080011451866959507625186309114661061071974850402345739155111034019") * LargeInt("233766796556214315364398819203305073571321357554939996482396957996629081013726889549461469") == LargeInt("220540441766458357486956973057262156176681997785330902849300029278237628544911674984960310661059620268013774225846989529043135819796085790327826283727804449000367712164501188713911"));
472     ASSERT_TRUE(LargeInt("270114456258856959353638792808649452731472864450833480218788831890714955575650181260254517") * LargeInt("375498962792528693087549368889217413791775548067971192251074253852995460298865047090225833") == LargeInt("101427698160468648546653483466391460797358105390501685565130788099149601225417593901549095827891695754200501340795201179990617987727938076361425278981307755768337575974752588337661"));
473     ASSERT_TRUE(LargeInt("391221077315744087463246723912308929461815635160202441801651953191507281255812433130436880") * LargeInt("435195787548645220553799688151318965541866099814682178826892538509748904569078192147930034") == LargeInt("170257764848054669883356026533843366141993895124838767415338352993939161549988293400908736047218410042917210021781348833649387430893163099369996233494238185589335771129214093253920"));
474     ASSERT_TRUE(LargeInt("568555757682295021019573532623596605496271236502899767794963513769582746213183491216299984") * LargeInt("129398493592678132707508267205264971959701965467989899572176629466339413254657783441022030") == LargeInt("73570258567532713304581300082338382305597746364249468087807768065072540872392952939656819326408918561377941378048228750940527120597820614354560457269214803725315447075260032647520"));
475     ASSERT_TRUE(LargeInt("918286301527608509699965456041323401034731974668587261373917370412494765133444125428380798") * LargeInt("713777847495732140091312278991398966594586145396239947116005930627562725029268644311368743") == LargeInt("655452419689193246585337409742392496956054290805287545728610802302720660735436814758631227393235836661861562567557502361685689042937013983901399898966861045289899668467177598596914"));
476     ASSERT_TRUE(LargeInt("71430738730941117675893312650425442700483884612562109804539701935907703763847726804076367") * LargeInt("550798654563174060894329163517390176364018210457378671446170904789517859938671837198606789") == LargeInt("39343954787455974972923594536597921862150008870624598240178095924070683852699865863725178638066948482016679577286863960383749108449207051683327796767526498695766805683018360655563"));
477     ASSERT_TRUE(LargeInt("20522101251421710025591465717572686848100685318230023427879808962451549735082894334055975") * LargeInt("382560239704481825769455732878415696890379694017240755109374887045719089831111047844940769") == LargeInt("7850939973983535835406165823342129854477850493448935347704947458891261427189359950159259192241019662192045669088207566230681647974891516191491797140347352177091156218823405544775"));
478     ASSERT_TRUE(LargeInt("638671268867293346172272230976331405534939550540742229642229412283067569791872070177260704") * LargeInt("200083038530663079042473971258092897452029582762238654266098443878116444846108709076224632") == LargeInt("127787288097202133572415533930012078965477927397446668262412805436032358451175000815532925046523656102811035426457909957935366384464413520762218353679872386775796558211007930460928"));
479     ASSERT_TRUE(LargeInt("440572375240576700098226673950061665371448296609318066006858219460588479274875300573664311") * LargeInt("518596382360369051279427090758832607379998727494548025614690795436286804599459986293932686") == LargeInt("228479239967678105149809776915688263086454121604952304307610978691793505179209979405133129216708462558976858992610875587382055918743878547131456982646894502606073253434137794569346"));
480     ASSERT_TRUE(LargeInt("670487372301066683196014983505411154952365515122245119342445422423863685409238857291982989") * LargeInt("702970831226925609039844134271941479001558941847444331473023232125224025466196573785660102") == LargeInt("471333065433637983785660666166720856042243059911795902120155913176701545893242209737494420682884066264405964694837014746144526883964230756135029110206246234787767208479495920004878"));
481     ASSERT_TRUE(LargeInt("422239091047327315289816882755460368016934425945163719808806469651036269205448583787637358") * LargeInt("345904006187014154597379920311921071644884961150948858545403881460215587712532747259564276") == LargeInt("146054193162033940602154757143992806406211577313286401723180815978358124169478376954009841416278555108471641573217597720591209742735222688108516472609596694617414241625854579822808"));
482     ASSERT_TRUE(LargeInt("410937552957675491898185270335154149359383303550715661667246789277455055272979595965511970") * LargeInt("107619318561540131807402354286408393992498927443804560339172532146897539897307695937744689") == LargeInt("44224819420651846955861705129834135445717873768824818454607897546961904660831084078231462626196062986989643626500086228261261761749708931538028396086619824324736617633827033427330"));
483     ASSERT_TRUE(LargeInt("419453938760961645273474838443661807015063195151517644560748688012399876496210022688674541") * LargeInt("596264208273380289286062204852080850694004904058696749584797076807961058958806677924613773") == LargeInt("250105370702455735858015333011166381720429706219611709497374218176374814785593563442586004464116398137326852720842115800743033613984376557610554320674058304141789469301228723053193"));
484     ASSERT_TRUE(LargeInt("439769128792106051464506732742141950080125436645585328852204722595119113522364787083142886") * LargeInt("966037968923231991275220250702282776260066728697118944205733440620365394006412444035043221") == LargeInt("424833675973465352873380373074550804317559908707123954227626966841870818951462295562398442559117329875656560918150696060039531161349905221649717318804146792917978776845905528675806"));
485     ASSERT_TRUE(LargeInt("257151786453343146735298410100845777821519365756624816371946163042923025240151683517546612") * LargeInt("851367670976947993861725788572468950142982927067145268011906691156626706133669094886711353") == LargeInt("218930717520344240440051615469942080470569368717547887368905257239011057653153506766861658035549365480655824639612459332914615146314901178193791087427791782933309945881083567086036"));
486     ASSERT_TRUE(LargeInt("156146477295457600628451271849407429576104130245423937602205179724727678959353410455030444") * LargeInt("161042823476182295532440643291269686347850576287118890402499711912153564283365378615030595") == LargeInt("25146269579520085079867491097877453585048732633740043096351136227748103042723665502910341276502214732501184745911993314391979506207764501705836381873591615621378613004426716434180"));
487     ASSERT_TRUE(LargeInt("622156298985776956868101007011840888400832797810688503265861104591919453221292910145857458") * LargeInt("649067900609655804998943598458395372518866237178433376301243123856188691339486214619452371") == LargeInt("403821682833771578556106184925565634509332376680215314839752882060395141818705991803410050203420221081830940902354316861260629879688261165036858989313977027020295075425370186132918"));
488     ASSERT_TRUE(LargeInt("907196989352192939182893746381445309686639693138078419255958342194460088191145371729310560") * LargeInt("898302051627758583805065751809631226013260606018076988699400655404264811635777962315790937") == LargeInt("814936916765600775883663670205841928908744666024384096358361197914625840522422462765145013581843281983803163637447951710523052530368222782338654213153135041482075543491012106394720"));
489     ASSERT_TRUE(LargeInt("725042886358612926607774249022650767643812303236388891427098118997796799749610187718644526") * LargeInt("901180490554101309715950824509907311693728127797753190058647073495339186718008829443823629") == LargeInt("653394504001416325852268753894795034191738719516686972168933574387548719380954600781114435757538021860712493320671287755578674809813290012766313060074097291988258429180098490304854"));
490     ASSERT_TRUE(LargeInt("683069579691850541260325883410237634895273202794901242662968377909197568143608046656756180") * LargeInt("407728892334935262137875658198144380547818905107398047917547937931572600128563930138278898") == LargeInt("278507203115448011350171464198790161650964001018034688661561721525755443664539805619431273256294816949563771467182513385771590236285962486902436689072760813661961988216228825089640"));
491     ASSERT_TRUE(LargeInt("407401287028142990417327183476430997528918187652262035516082900977746895198814934455782939") * LargeInt("590303435934853586834346601430379616091415191064827645047318593516729005253642842863600515") == LargeInt("240490379536994303373708956687708118293011517467670070754406374825615880871309659486661086491638280338928167787766353581572292391859510328544227969341558806201807768778028848613585"));
492     ASSERT_TRUE(LargeInt("698330947321966019468910490694995099060713389405209035333711724496718981549011941677629208") * LargeInt("855904791721197578476365931958929392891935259670500925110311717286470051525391412110693853") == LargeInt("597704804020073923786348316512076688163380761619358966415627328601154319822644850242894700761989756461415973938516745464909970562465831213781915014883241943616906570869756938858424"));
493     ASSERT_TRUE(LargeInt("374527882647624388713749681540783158763519101463670804436487290085438325704915468613721298") * LargeInt("508926282567264420284680926289021139682517239506863049410594394484629807617288974530012170") == LargeInt("190607083033644138511165045499986081647061239772111207528368341400119627572313753627362800254537973325998837451468253285936030202078407979879693153053470986851735550893568928196660"));
494     ASSERT_TRUE(LargeInt("657812417966174098694670517103666802684369040739254790547124100173837687432982463378804664") * LargeInt("637648729640286830452178242989545029052142821632788013319673936638845807984352437036337330") == LargeInt("419453252657736307157022338558892448922837979744221980013883872245737269397998418617021428067148057727025135339442295829494349839891548275849398396188275688322609811374708081307120"));
495     ASSERT_TRUE(LargeInt("344401800294346021711169736283068109582687373129865180680178099174603012954926713859936975") * LargeInt("417652068388523054732876520819755141418849629711204684029335317067103614084135462781941670") == LargeInt("143840124249664664181104347509392435777856781322488984072344671251679541795362049279036393705816231529666102139437378451543301675821497484452088294361181618482280045758714326248250"));
496     ASSERT_TRUE(LargeInt("858367139037069524354314316917752157925324647613187471406672534976736566052207465978237506") * LargeInt("993011878296714371402850354937694050717249381727582949108755539742989969599655986680967509") == LargeInt("852368765003377386087891533474780232175517968549332495678758860128973790894562077011069210934817575446827460643033272549801870633950936366873628463899241079104462261013558671192554"));
497     ASSERT_TRUE(LargeInt("902967189791212507210839190552158762272677393133410598134134285048781243589352321945061069") * LargeInt("764289675722901771298165856752637493879551740492889574501534303263841868998346647965313409") == LargeInt("690128500673945705916302068888056713482494681273444362293651335632998423034933546244985410394080513714519779810994854164975984122119207151303347003609101879050214445238054229574221"));
498     ASSERT_TRUE(LargeInt("808637389511162427345801976249465447013826659941307229239045924826001866824613402466574776") * LargeInt("128537359579739766232760896236125703902779905959476746434779211876274656231054436532657858") == LargeInt("103940114905218370593330089294193493905087782022342189694098613116842201752181356888057279971917179252431322475082457342646543569114535838853084316724437049432336356443972780989808"));
499     ASSERT_TRUE(LargeInt("312454560551089199338046948063808375443642360546980939787999595614673571258437042427694938") * LargeInt("488260681564027053720055673351043867954196981683267750301016370692304531974351304996515879") == LargeInt("152559276692463372969565128103593921547862141921576176888268845439136405149005500613659503724764480490815460579071862283777183577857651374651920520663537915162492055493867084920502"));
500     ASSERT_TRUE(LargeInt("968890523429645518974773264742159184277671425664028879091492502839242966666299464210525369") * LargeInt("272395253461959763034486500581051153229201691998374090249663780945362875491842301899527412") == LargeInt("263921179706509155451368298785906117308377951829181180971841680475090874901911919971086443495011776861588493722508928004352068479969270558379172627062593575186445566114577336915028"));
501     ASSERT_TRUE(LargeInt("247724651792623842413822391578941353086830904828591269398118941595955720897092837355030219") * LargeInt("638931755983684994740705075597514117576429010887425798035300660108719464970057953565131258") == LargeInt("158279146770308070484077157512351348906956386757396425882529087271906434557864187264164102794591531501273229951758865172746377090198732171635735475946788831936128213519327291485502"));
502     ASSERT_TRUE(LargeInt("33019289473738492747270623425140953545797375582396004025510144726329929577384581735939813") * LargeInt("617908456519698890431773607219522883954354603869452408673892304679904632239991706917777377") == LargeInt("20402898194094892703580625689717562151136247409390596451721979838982006154230263490000509453455115241627034119179350515809861578538762218919048387505082124945193181043926205010501"));
503     ASSERT_TRUE(LargeInt("9300528538451251368761689267261989375223339692994020542885124424447984951093460159105578") * LargeInt("360933688073236150811095474716120220467761085628840676204583712926211200313774016929537212") == LargeInt("3356874066413594875407117723279165379108090027062852600910803792049199647520662937900880695236115137919183839692532138505477033277428747721770608249547481989527484789323387768536"));
504     ASSERT_TRUE(LargeInt("743859758528728560708815843529705733870961935834458578686761076893165865260552325835717615") * LargeInt("595240477961717183665302688907251360511702136780261031399740153346601648273892068446668263") == LargeInt("442775438203127918694039954303368075621185394007491490755722449135553498639287840555437537503587112916646039317082628653370682536559967795130668024889666573806995638027830450552745"));
505     ASSERT_TRUE(LargeInt("187396686277841356036161318243626728863345950421110810355225260258834075983901224110880987") * LargeInt("984918415596822036018836011118677648225335164270334247506084139684547293984590138889337481") == LargeInt("184570447336866229856111034109658876073553894155518493418058341611316627177185193572143114420708668892056116274671669558262931396103344365915035120107801654204740495493567669373747"));
506     ASSERT_TRUE(LargeInt("493326261047816840662545064284553970624815016694301599048071808369674392062140879420266152") * LargeInt("883767560388623584207105333615065622099689773596237455226366229605508979612555332264828827") == LargeInt("435985746201870352351138910722019665109091958944205847604220408739794182212815261593205808406809122739856320663748154638701167259204242728076593040340800251586788472339989061963704"));
507     ASSERT_TRUE(LargeInt("160964057114093071928279149569033099945097255067679191452383957705510813346158123382825604") * LargeInt("702425426570123835596956839392740563053836870966284551773725908768280987990806175553318466") == LargeInt("113065246480824602288004492588288722332395289497893497508409658407360703488608381142478813180288052643666223167189449343799348497114755375268060664441470051215185214928493950803464"));
508     ASSERT_TRUE(LargeInt("131464088928964207020251682460636660371832843178286789228240011037912918274783442278494830") * LargeInt("140605575572579470927047543626169747036686526258693665252418982016936759549761052179628691") == LargeInt("18484583890981784967354178478369825069706558276485608434112909775646762359023730697172068728132846250114245939052469903727830577420294134808349671625156999351892762321243763167530"));
509     ASSERT_TRUE(LargeInt("86161528296280420490372597614954596867487018777602280291401569527709345929913588544709729") * LargeInt("983833634264738596614679981568776221444809127128731394196261156996135072749844038587406899") == LargeInt("84768609517533676857424651893546626526563417811471215346117649771770279603805877339579881813991437155667143721832431642616521719024484605889035739179436807959987116255566767020371"));
510     ASSERT_TRUE(LargeInt("840329159018887258513287114342318474109782576346324509634163391132828591062309429341872714") * LargeInt("107780443797523159944757215339069515600496624990656500257019169580019244742193479895573550") == LargeInt("90571049695055080384080949887279181336421410665675426031233718613207696393546880920608571383943738125842210134969075829596065870122217080987926545068659095428132813007116125114700"));
511     ASSERT_TRUE(LargeInt("539075984121581162449054889443084462031343051731774495280803499592317613162490651014910760") * LargeInt("433816517638312542011820363948674206754993586869130136768145865617248591676602643885572965") == LargeInt("233860066174070606188630365270496950124518520212373391306276875867920871636709112753273367452323819722388076688244511047300273407605774178966704305171549450248285229193460943603400"));
512     ASSERT_TRUE(LargeInt("757541322038541251764704182764661917643698103257601723588475412759203392166847814007545364") * LargeInt("188140171548114476737887136741049892500470479929609220370327456009520363836703058975501881") == LargeInt("142523954283116585034047783807202455517571975298046768873638588119931486267476974751119819520489970488117366450474349645920724923801022650328798148651421925316281537621762774829684"));
513     ASSERT_TRUE(LargeInt("106027946472009428234742508305059620105034410299851437482733765562285661153748093579689356") * LargeInt("541865463751030273282973636643643914232352714237112562070197809717874532263053956920446349") == LargeInt("57452882385624802985289763293257173007000943217334620293185489533625778717852603616060918517897136070924979551897567231321120315527192122888577035629434291495438748027744284361244"));
514     ASSERT_TRUE(LargeInt("685674507683001745438870488096653378824953739186375338788708997192586509308141770336313291") * LargeInt("783539045769365661223228509260404323053459642173865702734785463890748077529748586229644962") == LargeInt("537252749458318771341950002653604114595324725318035938714169248357466616308205406199589440499766266616594405635896052880281783598981920262343668288949016962770980499751918931789942"));
515     ASSERT_TRUE(LargeInt("471369662601048508816440549946403667043798274267635610582011449224218696122412325110859007") * LargeInt("773788405353456016737307048752170795988398952462325884249494110502301609178058612088158917") == LargeInt("364740379556061920318476949073036053156542046664300117537379053373196036585010280073457148928342932535160762244931858784227313962011713743888106012778483710478533923343518996815419"));
516     ASSERT_TRUE(LargeInt("93064502744150753160719174050906107838155461583641058771808318345622657276402765619156156") * LargeInt("904383118182993598792136989098611343539642723712783269690416182587011703302779052651344673") == LargeInt("84165965183904822682492416521544061081342612061943603023286715951353868265910387558324230767090174866179606434090568136121722147379491200878259698706718585929591942149020965756988"));
517     ASSERT_TRUE(LargeInt("387300219688551812759993382243280085383889896625702850195313755350784303882295529719132522") * LargeInt("930711059440725280274061534855785877842450389383120754054621802229124003843731806385143922") == LargeInt("360464597787957705702665756751618230626792991972128322752264525296228571285243622283339701276329293037958502036121228250896640973812753949006162814109324417043048219488989960831284"));
518     ASSERT_TRUE(LargeInt("75614780195117388604205305963926875363199731605854212106862889580462154635803521740934741") * LargeInt("289902627548283027929186175973241581183233400442671121869247283939737624270190350045834337") == LargeInt("21920923460050404171317802347088486718104967576969496534533238231711318678121758137486922548761943621285868932294778508224213740832575869156057762843627128134681879210179614001717"));
519     ASSERT_TRUE(LargeInt("797616781914216371142053566991682743916279941801535364993584836272367211051890472248965250") * LargeInt("216125894184796391314489492816570597547460993492227528587451780031240986980982187394503864") == LargeInt("172385640208009747472135482348321477462141188612303340770039862962299230614612591725663058766356028759268319283531688609016004630870978359551662273738619027863535239003311126726000"));
520     ASSERT_TRUE(LargeInt("102775293419761774167095614822477745664651581035989109216463617733625554002864751696954980") * LargeInt("759896090419011103798721098039591433315347760727873748742092285922021614561435111039513674") == LargeInt("78098543661343690060090782562311843252877179783429650710160491346191037908770515071652632012830039281022953257218299005131626642387067164850877801686934710843670422947205872396520"));
521     ASSERT_TRUE(LargeInt("577696752214405992651568886297756227464543697515791879734467312306924187638069630262525591") * LargeInt("952428331679281051837600945476493939107805139693154302644832358626167032659319345985180099") == LargeInt("550214753928105711224899644790643025783196182587549680170198831154727925758922387264444374663037455340443137626989471528410706922247494073766463279685263392364477214786252731413509"));
522     ASSERT_TRUE(LargeInt("861364116068683164971704833653270305367345117904484491384162867910242822078487902254819759") * LargeInt("673571248171835360456455172974865985152738836853358911599000716171584368682962264928563695") == LargeInt("580190102790812586515499172464791284239352367060784166874616870756321823395388956139649397360269130849771625181347378317821637242844457444957615860991753938918026049108642976049505"));
523     ASSERT_TRUE(LargeInt("812240694833213188069396987135019693857112942432308312624014981221174944674829319837424741") * LargeInt("592244743108873020952850399224857735368572622579917139109019080758127863527806105930239251") == LargeInt("481045281654068870619704871238200292375014437325722114965393117088346121519650890825318486172156494834852913808607821383394280408011765326143407787525607035128533816249237836708991"));
524     ASSERT_TRUE(LargeInt("862090308595277515280824778885245918537708121777860802455160496308323632356668228352286128") * LargeInt("315634999095193252751858487057498972818046397070577691276915698627248991757479077909354092") == LargeInt("272105873773445290581423547452058975761452468728939998620085433529358557590928258799112460312214961767957924090299720634244604168589638540836985676107783482651632015885664051635776"));
525     ASSERT_TRUE(LargeInt("442804227830214268821421432224116771146469237290355481997088205147022744798021160555263336") * LargeInt("640499277500023859431152730519534900723778121327863653207608663608762057345646189368786713") == LargeInt("283615787999208196907299256859392929322047160612127549220976085589499078144196305549711847346937643635526351716841038710764863498545605468697809212024927277626120685447324532854568"));
526 }
527 
528 void testMul_10_5()
529 {
530     ASSERT_TRUE(LargeInt("156837869978382264947629487941498932138396950288908138081967464478528444094429628546568435") * LargeInt("830485162085747848678997725086614270798646884") == LargeInt("130251523870180241745001639472449603293687319272165766116872330963442703853220610134289681949240207996325164046126985598561779505506540"));
531     ASSERT_TRUE(LargeInt("524264698861937431932409112164615110827023598836489147748695943644421643056143280275721259") * LargeInt("600515026292944420682010326185755439407223075") == LargeInt("314828829421538945839402747586406622570680895518770150643015619530829514341318946349395002196124344800882090492112141741643759932851425"));
532     ASSERT_TRUE(LargeInt("895257236836328326133179298286465431591459178211719542439091237424503223329429986063753011") * LargeInt("591183957113951410421233398400514537237662900") == LargeInt("529261715907802566021915246852512470795407096059465193678990780977628627372582798575164620047477676725613051914321853517892032477991900"));
533     ASSERT_TRUE(LargeInt("532042102843090260136434336041726720875881217721711635756847910678432001427164041875236202") * LargeInt("194313669920725919167402316228348314331596784") == LargeInt("103383053555781153921236869324848837145444331991645331229077563291010175557127100523794078709191756197980973861410423604733081823574368"));
534     ASSERT_TRUE(LargeInt("575921021470234704821502108928121892140467012563805049345461614240321294669910351841853909") * LargeInt("574849939398613289092109040443794082412798411") == LargeInt("331068164290551883007860897155578387143203287909384380826425181931471203881280296106885314103597365691196056565391687475534754929338599"));
535     ASSERT_TRUE(LargeInt("564934890630589438408412376388987904856160734045887826075294110728074668408853278160756172") * LargeInt("930047836383833833917051894277256292194100953") == LargeInt("525416472728717507580448757645910688951818193901518202475759163249284598252661069035781427143279128292372576873003019093011084185831916"));
536     ASSERT_TRUE(LargeInt("793250004100002690338369246672119138687177745481816751629952914500555041758825106744488075") * LargeInt("971880251744021893560453317561114230796181270") == LargeInt("770944013680657013904050937810240334039875694595213932526514336630745379169053701119075337844520213311627712428740415143519331053355250"));
537     ASSERT_TRUE(LargeInt("973039604925271005227667324553738919203461933139350143667883802271268962170895197443384558") * LargeInt("37351684423258419872115734402908667974221850") == LargeInt("36344668254500771855284146435578732956813602538072515364037394301911058156798978447844973286464053964004709616760987641573560356192300"));
538     ASSERT_TRUE(LargeInt("809471375296229866557345694458381931395454119175504618552707682206756370412051109219822330") * LargeInt("704316003891076112664820292459970533707910201") == LargeInt("570123644312854166995303444022799345125839902761855010436316647572162678853417601562223096708745572202432737686228804845479268814588330"));
539     ASSERT_TRUE(LargeInt("706674884730543436096687816096563876735124450057961042600758107694188777395354180072726429") * LargeInt("128113841664571642897877103804777621959462327") == LargeInt("90534834290698258755729901210565727105158405116946778332478627522310122676583812018470231682412313969481035610421090116200537802740283"));
540     ASSERT_TRUE(LargeInt("865669839424535504953952738227659334998562455011836906418829605944973134251705063547714732") * LargeInt("387053013501144754774283815515836767061570192") == LargeInt("335060120046318552711806327031641338565655601373412290496584992246952029122498525878140415353611042216430766753364554683156441210468544"));
541     ASSERT_TRUE(LargeInt("37882984334718089435750039604506231421382309498409312511495118066275580602961123807876") * LargeInt("266868662377292333076666164518533300252770471") == LargeInt("10109781356266136218467532005676890026266463769634111001189093129563633368903818792410956002501525645469434932279455530406130029596"));
542     ASSERT_TRUE(LargeInt("978655323606828816467868815804137482329375527449894908965179528620463270089338995681699795") * LargeInt("471941367255714209266752871669367482254524621") == LargeInt("461867931495090234399656496255398807771611669984078955563747916250014221541509302032313470340717901936506002724139354275471466958152695"));
543     ASSERT_TRUE(LargeInt("243074099222622549100530272243638570385935707966363496330741810754062554887631334989751329") * LargeInt("868508692454820420309288550642476559868998157") == LargeInt("211111968085473190903742220383390707201617860507242763405186088875344315352374616531970931744932173207959785631837656323140429789300653"));
544     ASSERT_TRUE(LargeInt("572962949666779560376599869192984888993906087144499515892075981617957904924616841350604679") * LargeInt("177464985844586947701653455617302591668310929") == LargeInt("101680861752087818485741339932188170213678079851511975748336699098854601957770855797307104843191648577945658730544508975491516734236791"));
545     ASSERT_TRUE(LargeInt("537660267090793339861943352537675882859906372703322654047621497027664626010848923036075277") * LargeInt("388357924809681859944662297581805034841595400") == LargeInt("208804625579999786058228223429804829101723776134764125496124370836961124985603985162610793068077742416970492065049232483659405176925800"));
546     ASSERT_TRUE(LargeInt("267199443164449811965145123928085759742658568344140180200953033342227932441283915510903426") * LargeInt("915662122671423181992430044871121401925660280") == LargeInt("244664409304582410142586128447667162045911481433743066914131891022751027632099860464605825019774364235696914030974520024139034364119280"));
547     ASSERT_TRUE(LargeInt("936138222666157584257865249421633937079462728361280003650250909130771963821569333364040514") * LargeInt("200542825826369211280704314295199632198086917") == LargeInt("187735804537546078556600822772212887289283324027026113591522468819595767241173786989779056460712895913811107765577685113718872081355338"));
548     ASSERT_TRUE(LargeInt("576703225315157258168328005513213080099555846923784070370511704664783507929019774360957549") * LargeInt("732849940654901961245545771566067283365603254") == LargeInt("422636924447703551054752058563148988865517365524019356205449830356530553508507403452231650266597945434681952897640010577481217470264446"));
549     ASSERT_TRUE(LargeInt("962786682730455169255497979575544307189465825128657723518568919011610074078999577641532056") * LargeInt("314631436154538168095712790625958704211542287") == LargeInt("302922956697946801052593160053468144117403721768798154451856587824102515040862819010478893155536429651074404814148011674539181310052072"));
550     ASSERT_TRUE(LargeInt("551108774016739888891095046596022347569605721771276958541059186214381112329177959624998983") * LargeInt("555575811042048327384937717262237192321611132") == LargeInt("306182704096739193501287556945898327206984297383762114591865893520368177452751587733712015710390810149062837659296997529221954421478756"));
551     ASSERT_TRUE(LargeInt("782528872853613125276570203684604696978617402907388750238606764823558385105237795116144371") * LargeInt("603177169010609293296555329329912250386235143") == LargeInt("472003550196905394650690792842206339974076020082287672149572865021480448990034306954152979696879905384972420565179849607133472741830053"));
552     ASSERT_TRUE(LargeInt("707938615455510434228307731794058261776047588990366116396225740855335852316639201997161977") * LargeInt("472066265684156435924093399502102406021392120") == LargeInt("334193938531694844357764709800678079277837823046082606864838686554133191423012329539133222364352925713788459029244680629244190671421240"));
553     ASSERT_TRUE(LargeInt("475451137576106593439437245777879243452061594088779594845653035792720168210789260608375880") * LargeInt("703094676055462486320492786825396571557073309") == LargeInt("334287163554273792869642401896744282796489892081802356390996542779161108971305279804823330549920538637170843842401488139878784587386920"));
554     ASSERT_TRUE(LargeInt("794711685030733734122581977847779126827229276776692846620411312391722786013098956490149162") * LargeInt("293588550497522687314569931648413975099755553") == LargeInt("233318251671616915613915090554985973933389811686253412773741187685884831313106678423357941181085544280236473657614840123736718707796586"));
555     ASSERT_TRUE(LargeInt("499548996590482785445673589554061552826944953220040636323056311444640857470748168751385794") * LargeInt("305890008568985341466082004560108384952954592") == LargeInt("152807046847690808367913860612399994807024277641184987006263134867962616139390806786340824125040823696689565632516143925120894755866048"));
556     ASSERT_TRUE(LargeInt("416040139159820797448769120491496824585182118484824859147480942856206648142575098338195095") * LargeInt("790744186854408996834090254178204768469607177") == LargeInt("328981321538727658326755611393257374364702853472624637707916225489373663220278752011969415006218016886361491974906357884310149838196815"));
557     ASSERT_TRUE(LargeInt("742347728880933048476299745109317084187697209122560221124689682814101259237863177678630217") * LargeInt("907136275587820680815784000917757883309719622") == LargeInt("673410553968126871512026080490425413953606932754330143288082925742007256630682618697232944358322242819130074615995513772094799287017974"));
558     ASSERT_TRUE(LargeInt("16737416682234116417299509433568577339262564144515822096461849384840623405450277120957032") * LargeInt("448022593370772965274554593025152774225886048") == LargeInt("7498740828301767484650137067735862295186245071811239074887733411526878688137482940236849279422330375770730410822243648964569936289536"));
559     ASSERT_TRUE(LargeInt("799409652172319725169750338538680461563471112502144439897588331466458594624454907919060409") * LargeInt("230766141109334310848881040947259392095106870") == LargeInt("184476680597361393401808131488164484149818347651490344525906410189207474140989602902005385433776149825202037140901239988931376840909830"));
560     ASSERT_TRUE(LargeInt("308215613494755224400446045598607073546791980787145119028221894387778091139419016403647533") * LargeInt("282254700597609779097851266984487473184345397") == LargeInt("86995305706470752131689954064530022366547338210966217972201571924869904313595594981940079012058164605214227428197666674134025718955601"));
561     ASSERT_TRUE(LargeInt("777183306670747984659961295190547002545441630722142961701581300779110405640591780781032595") * LargeInt("958221770972184118505074351138853772857926049") == LargeInt("744713964488062208997360960608577281096366994655151007849700096291066029606426349085600193415161288490589578149134547378043768368567155"));
562     ASSERT_TRUE(LargeInt("307885803169882245809751714416722166658326889739966956341846587429821168250418544577203068") * LargeInt("86911324585545274444451417868751237504397961") == LargeInt("26758762974578940022078023542147059121690332291913532351818039152461794775662251694762943121464777866862465698681214606523950582144348"));
563     ASSERT_TRUE(LargeInt("458606036613290067706162662618300260329674230842864484999568681158388618034920273892099413") * LargeInt("783284195660204283472855125741974442831530280") == LargeInt("359218860513555106783320250257806297157683423475533998988259203607251656108026720725817092395172581609145502085509560296376660679725640"));
564     ASSERT_TRUE(LargeInt("128797203674681703062671595415777140281125893695166773685952899886725492578004233979788302") * LargeInt("465446109298913321257848482713520390202815341") == LargeInt("59948157338960300423136552256755674863970526577622169769618993402797171752617911921718137058310838136696952953568263174532331577940982"));
565     ASSERT_TRUE(LargeInt("438621355918756554093739753765283494303531282496859048542848233134200526360747676137045143") * LargeInt("200893435788708760802684239909624366292572014") == LargeInt("88116151200821091168930283334884313243344848236912732150850268679792651424479037124852024626765077262811192786958232467989375496428002"));
566     ASSERT_TRUE(LargeInt("645295794796839297000473071807700303332738822493497718677056931277291800308208531508826773") * LargeInt("164710522118469744265531236434501896749282007") == LargeInt("106287007281840312344265227687565167506914468236985250140663844163917802282325892671511805123567531154820094908120108667518070688773411"));
567     ASSERT_TRUE(LargeInt("785508793460710890586544375015521847574270197367442291570121466600393400059560416568372542") * LargeInt("713400590915418720304476862669324483731238750") == LargeInt("560382437424128745661583789980132686121738354086827386354897927710667449310982095331547658380312972293452984429816674386481813146402500"));
568     ASSERT_TRUE(LargeInt("417093217388829881373882163105503764732579228236925510152535025097761257407039736619249324") * LargeInt("786693885819390709382986532353491549590442234") == LargeInt("328124683936530442257174026600912600812866296868489372013091511131916278928676517724225364603699132049100844266256424174204054265549816"));
569     ASSERT_TRUE(LargeInt("268261730416213927090465840053399223358835077082366829675643191989944808978506049766269515") * LargeInt("174901613384863907405561397877460537583727729") == LargeInt("46919409459211234976548302859215549857213434633313150758757299692083321800980307378203901680015751635298707047934174361455039792881435"));
570     ASSERT_TRUE(LargeInt("386341907812033653152576380558770409407788598617489754340045794183125073266101015256880045") * LargeInt("942590314005266642074072952411190795884051616") == LargeInt("364162140197938578650314530754791117200603268172800935246952107343044825173855994104751493456441111286549477207841475480271233900402720"));
571     ASSERT_TRUE(LargeInt("23135987551332161880428895202990015186682317069069093255918471960054562784328564695130577") * LargeInt("103826659111816003668339276650896993449946767") == LargeInt("2402132292707383036202498527467597718834849924424997722617639954655806013738739698636566995439705863942335510115862261979304763994559"));
572     ASSERT_TRUE(LargeInt("445109967290506088583297459068924069135634264351583304447328833348206974622258784071909758") * LargeInt("383344190856937332796251687680357162016295585") == LargeInt("170630320253336899388985531114575482040363634204804310519737586372456857093572239468293279297651588802495079832546933780827247573818430"));
573     ASSERT_TRUE(LargeInt("211184513099617715772585736228596136037047272601313914544199134225007435243256872805934742") * LargeInt("366830418822926942924493182909463772146327482") == LargeInt("77468903389248668075128809467983740423705358913693555945949447248839612391601287178263366867175878871450334653362514122053529453179644"));
574     ASSERT_TRUE(LargeInt("490074038273457591634532948261266306528955319588063996036083343028791467609187701270233122") * LargeInt("984605628147758922069665025831789664797167066") == LargeInt("482529656293146559372300715497920326202681878615692541535687366275496275471442330224430506253574430096544175312307826214927219000760052"));
575     ASSERT_TRUE(LargeInt("697005045490319599515857729459686264809721668472691754057658003301499449241901213857639513") * LargeInt("845736495421813935199747957304584485122616129") == LargeInt("589482604464304895616696261778981675352256931882153767908272771587791688597420607222379586953874930699724440569602846826380719161505177"));
576     ASSERT_TRUE(LargeInt("903372679560229742485418716256413601086707962944546755309916850341658697524881525406526798") * LargeInt("164955894938079660589456408362837600976532704") == LargeInt("149016648819468760644720107763703802604065916834412030396243087755034983450173550755776284092404668748777950806755455006885113299401792"));
577     ASSERT_TRUE(LargeInt("415216594722651490436146471795962614450850518464591189909806702917355717114201191365473338") * LargeInt("235419534505249016594655622296510867871326663") == LargeInt("97750097448461249280284400122382549872546798023580995996329270821271385685546205756809009488366665340262440174104563298866343015011094"));
578     ASSERT_TRUE(LargeInt("853560613969673145811736515838620977577405164751351506413511252535087587143700285580279463") * LargeInt("267380482456176254494891751463424880837408377") == LargeInt("228225448768801222974644063350372694075081081664092841750230530847813871693997711095744769553260400372699836017268575429457768317261551"));
579     ASSERT_TRUE(LargeInt("18742519463134755436480621630117195238481105655502951647502254297312487804069157283453414") * LargeInt("281370550627904248340246614288554005521978849") == LargeInt("5273593021496438456780113697984175707581887349866355494468954830864802502640535706047476756952924463625421148650155075840049784840486"));
580     ASSERT_TRUE(LargeInt("887133460887112916881748542470844354820377560834304313478536068554755900557697002729872608") * LargeInt("952876972028639853551295042934279209601862153") == LargeInt("845329045995399962460628676157122685163906633973197909972044812308348769658799851808618425305896272214734657353255175657655077266605024"));
581     ASSERT_TRUE(LargeInt("985953335929952956795609266971789122357803939234760987034144455535884612456090653645025751") * LargeInt("569049257381179425460637236845109628753493393") == LargeInt("561056013623436260230272682902003100271756260133253752752559704465550961741515347270586028933987345074413430621718602608608898693363143"));
582     ASSERT_TRUE(LargeInt("854146347451849615611326029912561909489091891857621439496491815236640285591734476416585142") * LargeInt("902487819245896115369378150122048103125608412") == LargeInt("770856674428667235904406948232053545742046532735133346377265318546312389345276708771048505318096101607221394884194002227424336149414504"));
583     ASSERT_TRUE(LargeInt("658945669057515372721379469573792861511163016203507795399800906389008192595851615490266828") * LargeInt("458263948465100104091290537233065831334834860") == LargeInt("301971044126274133043146345703007130797427376583536210535581028616403685810901925424781376968991158832770956625023158933011392716024080"));
584     ASSERT_TRUE(LargeInt("78690204511311265147746259171316306852428130761543935335901941012138982555373294063027234") * LargeInt("330302626930789757384893925681219636632312524") == LargeInt("25991581263807193947333965351212281964856915043904142616510192983206928538663347871476443843295036227006347400269880734753789411278616"));
585     ASSERT_TRUE(LargeInt("919915611871766682975257005725643857616257158737852096269124356839919696834998445447442075") * LargeInt("794272309082820397902289786796866852006027141") == LargeInt("730663497202723712207776462888402971258888399209902628506649729710767986049419235340973836967687858134017044189244637123090441475357575"));
586     ASSERT_TRUE(LargeInt("756659240039957885806135079481768705260743014179192126409199844101296521053093900146001267") * LargeInt("525368248276171477480256397543460819941523224") == LargeInt("397524739481771824730676403489118194463494624706542942414382926069933565761587609036602498884343730509972937985997911179054856613924808"));
587     ASSERT_TRUE(LargeInt("31628092147575877027172070500262753263505159988467715522306384813923065714550100721091739") * LargeInt("927165683768827057552781234377279641546482737") == LargeInt("29324481682310657840050989341230217984280751882467100513724836593449806161756814230510829328167496713904287447311458183673586156809643"));
588     ASSERT_TRUE(LargeInt("428421051835352442027233698149108755027203892236578651921332037788981033860520472088852366") * LargeInt("78965411379655019528310706526396975727861654") == LargeInt("33830444601883112715424327002857310743172505989625171796584662306800115184714840217602067351012436303468628924722648799445768078573364"));
589     ASSERT_TRUE(LargeInt("521962743572694506717513006363998387951608694773635668658528420496213831657590202922544102") * LargeInt("353094793382931853785336796676047296263460193") == LargeInt("184302327095388808304829661138782895059583708652549671913108452925014154275483756719362313925768261387092333653032654374730825163931686"));
590     ASSERT_TRUE(LargeInt("622381246217671276626552752705649704697619964763982448177915825994666110273050636955080537") * LargeInt("215713212263497352105819589079080146990970234") == LargeInt("134255857874172532619930743496413311038468424297272286049156349944226164864716030969248705073985715564895360172194850904943609239735658"));
591     ASSERT_TRUE(LargeInt("112591060005791994641489533741757968836089421886799980842497240012691983407984074009653144") * LargeInt("101543045539865828395225523122384106314545855") == LargeInt("11432839133549902652443971164360538464671887605115002564313199871614935878652771548097204056453634342184477818613711784278890432918120"));
592     ASSERT_TRUE(LargeInt("621412313047343571924459919805929604958385879104287389253532963439169935113457643511307761") * LargeInt("587900840540012724200718410447288458813802687") == LargeInt("365328821162446801723556038346291787530389653282661694898076401163746350002060111314322975280974603594615253468014044131312908785753807"));
593     ASSERT_TRUE(LargeInt("444177121578882764627270882091982008545995722514663760198566185782525893775741293148245657") * LargeInt("922397305430555012512500686381256222448043687") == LargeInt("409707780078261493142306398501332868413740456218283290608406254250472743815668852607347921140968736395228205204368807256015675744017359"));
594     ASSERT_TRUE(LargeInt("657196025846603279036290644169118919702956841040602960208261560411970053036682833712050115") * LargeInt("538263269128028174642637086563721140240246811") == LargeInt("353744481330140781091728933033331616764850723518351847870350665820230525743382590278577179172594024069433419297716129382694432400933265"));
595     ASSERT_TRUE(LargeInt("56145142442140400677270558408029960172536671384695203293407333820715302173016316395954764") * LargeInt("282393187079102751660017095946267691476568040") == LargeInt("15855005713246226108228309338078638349482475872126937465222564433622212631974331368936085198815866595406132262618263063569949808142560"));
596     ASSERT_TRUE(LargeInt("860760605616485450470544320945999935421849298442737126407750312748883568720398477061694923") * LargeInt("592080411030912513665016464890653906699749667") == LargeInt("509639493172625887873547479505618598513795158375168407762859158174591913482771428690942271966818534181044423845532708581547398824840641"));
597     ASSERT_TRUE(LargeInt("547540809359480001093556488038478871040832313530574681266273179668907150861974524813394115") * LargeInt("42353242796651022388322655027099665101548968") == LargeInt("23190128839876867056035071664466990754789866356218377155587517219509301717365330508758991992764266327356186017006316466562039955523320"));
598     ASSERT_TRUE(LargeInt("102448200091158128489107693110139265125295384927618813153355822846133774480884196868944000") * LargeInt("175772520787666367872544260206901718277281012") == LargeInt("18007578380182095623896432616958682284624315516398299731863626175024354815973469437366659503354022661943251228114079208420023691328000"));
599     ASSERT_TRUE(LargeInt("879176661733797131539738007792481161121142244142276322577425934362981401922458511381915724") * LargeInt("974455681168550454349541152797299545781660161") == LargeInt("856718692777299550319146336464839016549339918586135319065543923685820932411310618597818640138328896826560401606767405496154157310271564"));
600     ASSERT_TRUE(LargeInt("146562622625183206567449355555536446874645272380278550951626178782112868821443670019871387") * LargeInt("549950721864182330692474917593062517610259929") == LargeInt("80602220111027246021493188371679171780713238365171876953389067651205020934393711468043284586778848594627249376162771534327220219751523"));
601     ASSERT_TRUE(LargeInt("249633497466483407504972117119238743584004629829152142723308685011900746776847099729434471") * LargeInt("441271215103505302323506306654153522224512505") == LargeInt("110156076757572945632401775416661023345543599799392543773398579718628526157552376552754099957441749949130656996009550635097017317559855"));
602     ASSERT_TRUE(LargeInt("477971908398226042144290936310824967433220431441190803002067721003556047178225085387430381") * LargeInt("925956978850792080660136304810441053620413515") == LargeInt("442581424275968920988051087458470458021346050148553444759201176968182339638144751544624932585798821529419131372404271628222012493999215"));
603     ASSERT_TRUE(LargeInt("681773362071995036010080704050278668070824978167401591253600140483706884388353879420953180") * LargeInt("251347328157600697955088803362632994018453982") == LargeInt("171361912965820453640131452428985993154580326528235752482931247839832193754836462758318062473024041540775389968957541497685360406562760"));
604     ASSERT_TRUE(LargeInt("975792094552096221547995922155194248735765609347618546125894469730390845769395536357951405") * LargeInt("809590745628249615731498208001055542892218827") == LargeInt("789992249406583029750915289051523798684892334630438130271228912970460803732022409033234009335524527791760820275728582690263764692101935"));
605     ASSERT_TRUE(LargeInt("31934261862032621735439515670450556214742989221840343774482161946548712403321921064589203") * LargeInt("176581015519527290658846847019215271593516542") == LargeInt("5638984389464230853526920749690720615251012718011194681377141554553176605565512763499057710490130239967822380461766942370955415096026"));
606     ASSERT_TRUE(LargeInt("296860857088619952572252579258965081826458741345438595940775936863424661301365714927570347") * LargeInt("309077756553459093935056319201092061542877531") == LargeInt("91753087717487689066910094979081391242356888863409228243828808316964231349433774531781673317794755505238989340692946048644400808173257"));
607     ASSERT_TRUE(LargeInt("811601094584626804121182395634267882528692187873521492791954044567444782678736364420896494") * LargeInt("462865331167936574649004889795459691841623267") == LargeInt("375662009421173101006948511168078987452947830636309740171717451060464359484428291637889394034253951854125294921851995515840824349125898"));
608     ASSERT_TRUE(LargeInt("958616578278160995148687121592821992082805495050111129628934571016033406930765033628292535") * LargeInt("160331092363902184807767927872002103921625515") == LargeInt("153696043153483699332365181269033587168771098453155207380214227975773544507814872124887761866261381891245336189032649280868531140030525"));
609     ASSERT_TRUE(LargeInt("157947618551975289246504910629343521739117457211260769609360985205186885397119162744204384") * LargeInt("469970477409654114259451763809617824430366519") == LargeInt("74230717696589767756692071720324345102554075737301162144433301539768836126370756777251322151492822143223294483603720683758144166619296"));
610     ASSERT_TRUE(LargeInt("245339267534504475240186516194742468276802460602573939098767522961673973875678513283031193") * LargeInt("461719365828071623768046056923248606375448609") == LargeInt("113277891018755007538917327090217415042373562975780145013497195639838030683109016998760768367442527715648617004461677135069042715460537"));
611     ASSERT_TRUE(LargeInt("701409504408471371783634871996115823831327838201463266681757235176966649970645584299764723") * LargeInt("732365644112836169729868166976004273368982861") == LargeInt("513688223482975337141462171710691575341182266806627343892121539922266995060194557463203028062793780086426270260414474254605248119412503"));
612     ASSERT_TRUE(LargeInt("528754479308058767042487290951243666644465825737121518504698765168743279530297280710451891") * LargeInt("146139012869568926471323866249402480219977289") == LargeInt("77271657656442616792339745408355101180313078227256223997443824194134469327888186160184895132367398826933628987617458710846880947103499"));
613     ASSERT_TRUE(LargeInt("22495891625644739582473534953556820974589692638606449581080735031391016544099622172674566") * LargeInt("976993174176680518982436883898738985507257196") == LargeInt("21978332565273259728475822027904104628664859471150255693883147325777166331534412047144412809452270263709957596520396870125838169676936"));
614     ASSERT_TRUE(LargeInt("523420410689708871424868233630811444417082942383562369338901540464439847020229784111995600") * LargeInt("962794524995606761021155401330515349592456861") == LargeInt("503946305683003664301227207126300371069448281661088554694571867149932184676131855310444155691149426736308666873132022214164985621811600"));
615     ASSERT_TRUE(LargeInt("670495638264953925618087409726959194215017421359445932561778878249333234450743162555070534") * LargeInt("592762296289741844296043412974388130396546213") == LargeInt("397444534190190188106931240238466262479476549805601535833908306560503412518802285203244111703170190626170785954826543789218044205587742"));
616     ASSERT_TRUE(LargeInt("404575053750535406605665835910260790010616416505225567472448517194953259482743207189758433") * LargeInt("127748361434698257074002396762584234826497192") == LargeInt("51683800193985871787320961567390948366954308688322824969703258519609579610768232653929843287523386935561382110445328473754878032820136"));
617     ASSERT_TRUE(LargeInt("42188899340803766233688746642433466621019082912741908291729496763023206503218914402573600") * LargeInt("150393739524624400327578463752105582271200393") == LargeInt("6344946338291439686316144581321201229444765313539040805925498699793144016449669629722962369255672866797391094325725076846520531424800"));
618     ASSERT_TRUE(LargeInt("621008487688179183921801557186228319982786786448802404170706754041100135935221581877810960") * LargeInt("38097236771457458117507323654551582685664499") == LargeInt("23658707392541286161476334701117219468101299925685249399085566060141617743767307604099483998775603286748045063179376957175451105109040"));
619     ASSERT_TRUE(LargeInt("332415097064211543920588630479661369932752342770948691961126621829264587075487159869219642") * LargeInt("334865732862455571276298932898732156548696371") == LargeInt("111314425092951502097198988991542283772291054874160820473795313106317750645001928742440278541540838023113399224736098569545804167319182"));
620     ASSERT_TRUE(LargeInt("784430893487933155418198125675432592226860927486802401547184175423847525398191017921693986") * LargeInt("944194460706505234760079783257004090925161110") == LargeInt("740655304438361094752933007092625940885971510887025632847409911058475990976547976281154305052991107423068467146567286262867041168084460"));
621     ASSERT_TRUE(LargeInt("700268123534712920978816533100081495737581799770571518150699961018034716130505540432444231") * LargeInt("625021345699531582170175874047506491603553820") == LargeInt("437682524922152092458636527544729496360371784139988197830020872193725090447963824200627749340291964668964335061869179427169588557012420"));
622     ASSERT_TRUE(LargeInt("545905316508831872596168373121110302281298152146468801317048803202373600465247162588216092") * LargeInt("183107329297085337221761211182765372541401879") == LargeInt("99959264555012274147331290963165083808930482237290734024152877445974052381230318195167939987720111270996254185867296895444919466836868"));
623     ASSERT_TRUE(LargeInt("492377908465063391451165867326088820982822631759226390855576598142280092177225856076260807") * LargeInt("57270181402420382377024284088336005807910540") == LargeInt("28198572136338518803392393964733557432833047996069056020011230127344576853982912629638640872913937928467944367071360112990184764205780"));
624     ASSERT_TRUE(LargeInt("110895415239749620777025748399450585967176142608938029744581424132038646046406758001524107") * LargeInt("690206857611433333999205761326912306823544806") == LargeInt("76540776076142640688719282140338565928059296569032033986503950658760491565337209794674659564799849515486466909833344849414860403638242"));
625     ASSERT_TRUE(LargeInt("161027973512997295269272285306226215616890843152799067926054070168010865502829154141569204") * LargeInt("229556389775834040159730753818808966854127482") == LargeInt("36965000252562286938103732165653716130426311719728398951941593431779677176067880747524114204217296107881124834415638847811439741264328"));
626     ASSERT_TRUE(LargeInt("53971293717750480497848660353887943958924368672648299763720231761889275316467225109061385") * LargeInt("484520302922891948998987130167906838573846999") == LargeInt("26150187581264838020634274212101505314881941645125838034457277348672189913055424720983021015601140201637254304311244713942953489033615"));
627     ASSERT_TRUE(LargeInt("16750327826276504822502157983719885063465272619772934916583547434923344756601555071813828") * LargeInt("410638773793532185345539499242348324105425168") == LargeInt("6878334079221865344280264119486818558951901324619525036614023640217964795190176134802494347749739272788976643926590908331496881623104"));
628     ASSERT_TRUE(LargeInt("463000695057973367011220095810389143030751010910404818312393592346088078943002589636320134") * LargeInt("853083756084634820254948448843864915862439018") == LargeInt("394978372009852538282045907977056807271781777356180056364030586253120052150727707156800582701852529023429271687794834168103523500588412"));
629     ASSERT_TRUE(LargeInt("286749837089871089855754243906603702271748436026300832897518926889542656004166335523483966") * LargeInt("915032772629023318970917174637834239234117906") == LargeInt("262385498483265490714012404741123257467667962361743822770479377462250811286284577170023962066147334734719086272445895830763353944495196"));
630 }
631 
632 void testDiv_10_10()
633 {
634     ASSERT_TRUE(LargeInt("887464692352519446186053093964139961769793487074749366982687243812559087290520161058555647") / LargeInt("66791633979776984533191563977230080682608001261632835471259576001217051566029566376036194") == LargeInt("13"));
635     ASSERT_TRUE(LargeInt("372971856887627787157283280527311532633218938696001812507069950938396257307212675030466085") / LargeInt("76176398821212565778762264740794202618479333951524867074379559382782483854490155015635450") == LargeInt("4"));
636     ASSERT_TRUE(LargeInt("440305373324627202924450269077545579528287583336652515452973548211630219067749289917895806") / LargeInt("302489277521092697340657141032240396809095925314710590655338094781888364298544407800557360") == LargeInt("1"));
637     ASSERT_TRUE(LargeInt("958220719753701367054251685131868308480180824931511484812819204526069750024315595568575599") / LargeInt("857286335621460349054312942814649007173251799330737677544826431574984470047052308971598282") == LargeInt("1"));
638     ASSERT_TRUE(LargeInt("633043531353417252001188496909608841292738614205396998871288619286338771748028053442858248") / LargeInt("279253964598926807809507665709796753883698669034747209203655109645500882179432521790748054") == LargeInt("2"));
639     ASSERT_TRUE(LargeInt("628985594857393701260187346174456388108531030191184714491526082848051602308524778898741257") / LargeInt("125816963288833740944516650202109294925662381298754774533890645856713831722616718290822669") == LargeInt("4"));
640     ASSERT_TRUE(LargeInt("693913783005587412308567803502910510414317070223723763822174971618283714317508217853002895") / LargeInt("223396336096768791580742689020328652625881286852863511187521139549646124315217437080278982") == LargeInt("3"));
641     ASSERT_TRUE(LargeInt("974484305956875770701717432910335647134666098999645743901213847398450848756497293881704903") / LargeInt("190347842287081716815184043527281377219045226039249509745663942076497833794508329750899913") == LargeInt("5"));
642     ASSERT_TRUE(LargeInt("573204149912473082420142835071772238102180850317153146218488810868617443022102500702677286") / LargeInt("107309555540716980847623459861607836307841872048145357526607014082848313589565810649725183") == LargeInt("5"));
643     ASSERT_TRUE(LargeInt("952861755429565149032016658077948711015272589540146693647358727315095337095032436681778808") / LargeInt("894602528865585175350649163961303363190152035065308998389710002201277266247576305791470463") == LargeInt("1"));
644     ASSERT_TRUE(LargeInt("702844849248542606623703280852675003226590204017257696133677759135922752944969350846759016") / LargeInt("580977073772111509545612783654431192211328449739452399751010487405482169895785413569348682") == LargeInt("1"));
645     ASSERT_TRUE(LargeInt("902584273894806309043501953299779160020963573457527022843397289168369845756667452082464167") / LargeInt("798547025110173994345663340057812196761679272071097113866114226025995205410896839341400780") == LargeInt("1"));
646     ASSERT_TRUE(LargeInt("494389933934936805264568440602649094635965352002165587827684082108809198206032762141155328") / LargeInt("59850776948690184912758578928173414523204786983025195617707061756570946303975487514080255") == LargeInt("8"));
647     ASSERT_TRUE(LargeInt("631889783819587045029726586524581052863686196845545390684314465937922134194678118084819649") / LargeInt("160059834001281190872465381815918610077615990887304985617584652875864395135972429432054425") == LargeInt("3"));
648     ASSERT_TRUE(LargeInt("518511694525415261283084404264834663815055523249758225957622542646288585998812425561305623") / LargeInt("299914943348660411421347014626130523645627173558358040156806516998523539426655043359578893") == LargeInt("1"));
649     ASSERT_TRUE(LargeInt("754992015515355080713964449394303219247881353675221492703577495960889030892256370817090226") / LargeInt("389929400461732259073016740617939309963288011535254837028845040857424659029821235114589071") == LargeInt("1"));
650     ASSERT_TRUE(LargeInt("542624122193837169357946649802689566155405682780530220124746959473673704079506985148305747") / LargeInt("219014565210779178431083230404114079996757344075956642428347325289735251964510957956229717") == LargeInt("2"));
651     ASSERT_TRUE(LargeInt("796377550990832156477569305203137814719556613618339556852216777422938994060803039066116212") / LargeInt("234570468263094891324554797591031314360090650298207527795509677152731297507616470444784544") == LargeInt("3"));
652     ASSERT_TRUE(LargeInt("616756539639279052512333383500946110270602047975050360437301044571533591452769704651162467") / LargeInt("111594680558627336296694744984475870605722397558943672600030007992893619859544265692358486") == LargeInt("5"));
653     ASSERT_TRUE(LargeInt("625950558785736884032432932357523758732263766574398559546375942272206233254841258543880893") / LargeInt("367414198066697063655582675443435126728983434433315835294097078531100729413490176758568771") == LargeInt("1"));
654     ASSERT_TRUE(LargeInt("810077697406961373445670155408755683203204305386433009392926798934837430300118116590979421") / LargeInt("103820652911742727990820523139250358337970124277681301055397944947671593564509152755134138") == LargeInt("7"));
655     ASSERT_TRUE(LargeInt("729590223960710476641530633540881674224388817853194062866397666475490194806131459689770551") / LargeInt("374602023351255440178805263590205917757209024931202592520081595382036418176394184371653486") == LargeInt("1"));
656     ASSERT_TRUE(LargeInt("806315508157961413837012514488785415146641384862280667955403413680088116543398506401880476") / LargeInt("177655411865032646038692700844102458302278922110322028824128034355735002927069529567697711") == LargeInt("4"));
657     ASSERT_TRUE(LargeInt("326157877123774811731559258186721828258398501313571096423295611248536611074101679284141167") / LargeInt("231999897222626624445465980927323104053071536673085678060875187145671758435787301975276826") == LargeInt("1"));
658     ASSERT_TRUE(LargeInt("788388707694869006947062038402160754639377078446465873098948588903277784655378685406038942") / LargeInt("126663731766744225657131095181025446905786978231948538662671415960450161627063385996155032") == LargeInt("6"));
659     ASSERT_TRUE(LargeInt("941366954169097248701713040536786928000781382727990026087178912026357828296485566007553053") / LargeInt("155396483827215617401403258366167281049759839160977767098899983830703146370691741200246845") == LargeInt("6"));
660     ASSERT_TRUE(LargeInt("428172472335560365483479177600398650355860999631184295714252197896615262448006136464703108") / LargeInt("48199384764028924102515625891213393986990079902071610832378844317734516295984701374903301") == LargeInt("8"));
661     ASSERT_TRUE(LargeInt("429892675297875376125727723373445365384239284042217839591723247261019179134998399344738874") / LargeInt("88564859605478610047288910335472811274090935227350849475534697436911322863930439619731625") == LargeInt("4"));
662     ASSERT_TRUE(LargeInt("592093349652574021821253583116336711962893886440582474060714734666859881418634173329117238") / LargeInt("258191926821547697606144656594927058804353224571652380093473607947650932298943149751941602") == LargeInt("2"));
663     ASSERT_TRUE(LargeInt("232805590697969244422568137417589297324545564027641966301941377333682587607645777827682914") / LargeInt("11150706552792451662181705522907924392523953513631059890776102366686552246998967794592516") == LargeInt("20"));
664     ASSERT_TRUE(LargeInt("698513477377567379189171250472912527496595796877872340430864120888025503714943676860887670") / LargeInt("493068606540421757702539829510079355825387016705408853741661089038166430618941712334850409") == LargeInt("1"));
665     ASSERT_TRUE(LargeInt("638833710338246350472033407200674739756676675376455596005574884791018053338871076410762067") / LargeInt("426951960896385793542226434490628853779887288187786875927528522172404567603156262629750736") == LargeInt("1"));
666     ASSERT_TRUE(LargeInt("647120964447041294365315711337790776953325763507275299177149594462047446615536426800187345") / LargeInt("544073605817068474027824857208336979401812484906921964527131485846402309185713765272496176") == LargeInt("1"));
667     ASSERT_TRUE(LargeInt("951938705390337129985555261837576518858587375004269589547630876189683228067729061032722568") / LargeInt("409921179905766734379099107716194145395010249230407026366290316022806404091532402014421168") == LargeInt("2"));
668     ASSERT_TRUE(LargeInt("162830575795713035646962342584657376269813354500918790263471407807282715039070021426734284") / LargeInt("25588405892208666496356434842472322128437671048162309811923953341901932962469680021135364") == LargeInt("6"));
669     ASSERT_TRUE(LargeInt("390870739359995457725346373947181122401298280507405297401176878488278877175104474271966515") / LargeInt("191242903643374206292997371239073090392845266434118632111903320364839556508792511045988086") == LargeInt("2"));
670     ASSERT_TRUE(LargeInt("924127250944867154356538048788208747183595042040145851632281799516867877377370914450189973") / LargeInt("442336310807058350706429282727533904725677129750515020240113879411525363521725250883171911") == LargeInt("2"));
671     ASSERT_TRUE(LargeInt("996740966783861765592007882931864528753170658730475572968809409598133023863716381473295548") / LargeInt("652909825929530266619928112470846974672076809184047306750671294492437466049594252948023623") == LargeInt("1"));
672     ASSERT_TRUE(LargeInt("771650259597847511651807580291030651333768005523239389378443683675815764074679078495050178") / LargeInt("663161594943645440101980044364921655142411771312687148247611845519272682153946994436294922") == LargeInt("1"));
673     ASSERT_TRUE(LargeInt("992990633450894240518776855698124678463755248358485275596520762121575806816012891270593852") / LargeInt("495994908442179475381156301029048646598321070011169492878401935092456275190696667467514635") == LargeInt("2"));
674     ASSERT_TRUE(LargeInt("813665101023348282605242355375320933694001682887746619327229266105278728292254424184455017") / LargeInt("59713873086839944070037623161468490305771991636485171946991868856347647845104298990696010") == LargeInt("13"));
675     ASSERT_TRUE(LargeInt("601524476010201942474051374486094379638976445339859107641500856038244103521130571970457496") / LargeInt("245420415869138678537295805917856253135340164028663791969450944944759923322385425691854975") == LargeInt("2"));
676     ASSERT_TRUE(LargeInt("847861820915410829319489782256193848186730528680414679107824819516003083757502384302637695") / LargeInt("373854742493546349990211008173239053878771894726517965063670779915436189584504840484327356") == LargeInt("2"));
677     ASSERT_TRUE(LargeInt("549356875385389161028697892424545591166632577190598233814131889995322899719737799837839528") / LargeInt("14346275924407231861468280537506638115101646040563774271667811566114874890340384863369653") == LargeInt("38"));
678     ASSERT_TRUE(LargeInt("725767393460797792475867654266792652812588733924615112680207012477429283783131725258311243") / LargeInt("128469132979870272694910731384491593633736587425853601608399798796720604158158549329108251") == LargeInt("5"));
679     ASSERT_TRUE(LargeInt("826224290783192378985866952319914132900521769387968148576876210785110973672887324576425707") / LargeInt("17162147541143247846341549391690395772616153573960911404146746217539807688821386899759287") == LargeInt("48"));
680     ASSERT_TRUE(LargeInt("986660011769177747283385289464728362262507795452726917603040313982701362104577072401262934") / LargeInt("802646707978442079067908289410509869580680928248059788488181671942975748762974180402263052") == LargeInt("1"));
681     ASSERT_TRUE(LargeInt("880226562502986709125296518439270854587909361993918634147250494581496721382779695507414587") / LargeInt("662654422430338983733698468775462818167281292370443361515734755103756244989656452033288403") == LargeInt("1"));
682     ASSERT_TRUE(LargeInt("928761520500794759797521023655807806019790055753935796038507819729245984826750782178126582") / LargeInt("550305245475562802169273487925324124369872733090449754182271172345585630365150830438292523") == LargeInt("1"));
683     ASSERT_TRUE(LargeInt("907928419773928637206936762045754816413843294706945804136409785736624807900019371188690581") / LargeInt("221453225664315418203306014574098665346554355795908842442625704834461043170843215634289326") == LargeInt("4"));
684     ASSERT_TRUE(LargeInt("818358226371011462793710753186146572073100459535879524706888775101036441277071543468102054") / LargeInt("780386798755202779356405773285802181352572502178560898413816061932066880970732754317715469") == LargeInt("1"));
685     ASSERT_TRUE(LargeInt("965488314687859918510819187376711535121370230734688637418144882126257499651716672229665995") / LargeInt("704382048205901299401641145216757054927685473419583119352457948620009247229784935591362394") == LargeInt("1"));
686     ASSERT_TRUE(LargeInt("954474740214855805875596791386980467917231332151434733701932141327963477733827318200861547") / LargeInt("210612020598749015156309159208312921789221837243254536606504858108318968260952325994884362") == LargeInt("4"));
687     ASSERT_TRUE(LargeInt("707369156232173726176013305223637508340415191920633179309486474860853629391038954631915154") / LargeInt("350761869103867985457061929515635819343758786398769570015982653432644680531428412677057976") == LargeInt("2"));
688     ASSERT_TRUE(LargeInt("627015207831790353886962915216885243536207411850438959817269699129227097942631623923474340") / LargeInt("407308292571112780671238122398454098390989783283782411605700823414605515828217041308964750") == LargeInt("1"));
689     ASSERT_TRUE(LargeInt("731313040170628320611783878468467590014114516745613542552931662880544112988685952635413368") / LargeInt("493839678861974061973708314987643294958744944627604103860935057284919101251526726062864829") == LargeInt("1"));
690     ASSERT_TRUE(LargeInt("655985053812409339860010162733967874631389087072004818135477113561498634345990570158460467") / LargeInt("69858513492392120710553871765312485355370582694249972125972730506469858786874557198825058") == LargeInt("9"));
691     ASSERT_TRUE(LargeInt("571444361198805998889403888103144534552665947942334329245596387189087103896172715189763697") / LargeInt("459934334899517124501394647141272270417706516793732834042895105066632553680044492072975681") == LargeInt("1"));
692     ASSERT_TRUE(LargeInt("943551951760341862435472929786146091913087864342773545001812417393860827611790078221331452") / LargeInt("742962627185570907315445487062249336720500850882825829652447244630349439750604188916843884") == LargeInt("1"));
693     ASSERT_TRUE(LargeInt("707201231201106277305409666473650331431490444208143906584908713061792714268321361099781955") / LargeInt("85176530498994413023256023242045503556997491379296669810213657461174886765023044961446438") == LargeInt("8"));
694     ASSERT_TRUE(LargeInt("886989960177309469269116259564703741908852144428121347216131438416911860031710578860671980") / LargeInt("715697582312844104976522565258312811418714369966553119862791577131844407113825437292821057") == LargeInt("1"));
695     ASSERT_TRUE(LargeInt("675669037904199066797467900095903424342229692298735644641799894254757279354539183260177145") / LargeInt("328817478804787969412998614380591938005975186696896109302840791819527665200520397578671583") == LargeInt("2"));
696     ASSERT_TRUE(LargeInt("743248339186624439941396774457647737267547615718864569496320384944656289029207045508265413") / LargeInt("167594915290293837166641895398150460575049434095594873770288877605037432132174913000515684") == LargeInt("4"));
697     ASSERT_TRUE(LargeInt("888503325690174996157056138290899238472616677546299233271953875366607201808902593993415441") / LargeInt("258026628587407565144746326007478860398716185062625927716311328623183406010027068121647360") == LargeInt("3"));
698     ASSERT_TRUE(LargeInt("418384834054872292423390154250644839821009242485685467376963772062064987202709856223958750") / LargeInt("242811922356580235066354740050629520221105763792142082404338272662771734720077826376191939") == LargeInt("1"));
699     ASSERT_TRUE(LargeInt("851305600094029927556796003881102314853441248988158857102945499556543522715802182390791647") / LargeInt("318414962047839125538210866198581105849998750066817043772934062992753726671133154066163861") == LargeInt("2"));
700     ASSERT_TRUE(LargeInt("808050159030897619564408920480716751633990741374954083380086900501012073730047553628541319") / LargeInt("300002347873407017583685617642730993725950194077269084984845401289168348694514740306794635") == LargeInt("2"));
701     ASSERT_TRUE(LargeInt("458544415724934062509096858244019392146174547284917891889777931809366963198776637133460282") / LargeInt("374213539091940173566071647543895192189115673905384675999231744208778299793399551271144528") == LargeInt("1"));
702     ASSERT_TRUE(LargeInt("551479221493140038368181922327182174071925975980691042708129281080117140234967596461421546") / LargeInt("459539860412915527107708612673805341519923875744746383051601818580709472112578332362736421") == LargeInt("1"));
703     ASSERT_TRUE(LargeInt("659190482944689829938469601173804513562763309204163232029195932407264412033536806134876764") / LargeInt("169209549732679080009546046036387728692849578301741223029995373196210749721769193841298058") == LargeInt("3"));
704     ASSERT_TRUE(LargeInt("639777747032985987766822239921178013046505001822687805024026129994266890677157793146304507") / LargeInt("418685951379934998008508679701852611664742974860234707971352328200734702775267692845930359") == LargeInt("1"));
705     ASSERT_TRUE(LargeInt("896223577505249108856324912219065215542575656651189593776726695498941508951434045909546459") / LargeInt("630132013032524314351570807480684845760709765435366701220677718089994820293022660762914832") == LargeInt("1"));
706     ASSERT_TRUE(LargeInt("437096965070376441820676141715183395231685191831906375540922548029234672620302962744580837") / LargeInt("46659041353848944350715441199752094165073248540555389286842371141213137262275351212687910") == LargeInt("9"));
707     ASSERT_TRUE(LargeInt("590410916135965741536001575652862452525025738411486043856834499696933427412174455830562802") / LargeInt("468755303731226565420065536971609565851910639751228708711686414053538660214008181844963849") == LargeInt("1"));
708     ASSERT_TRUE(LargeInt("851203115232132043448495930064848623086558328561422714539821471860541173405453367308364921") / LargeInt("674152290664959330891524289797828122091541181904336968926617623025563339638482272161121348") == LargeInt("1"));
709     ASSERT_TRUE(LargeInt("948817217698262882357266101307036006594926111022482564670336166615880612277411987030596084") / LargeInt("811929180612860829602670899346770686618245256918965456917307884068005822263999225611288491") == LargeInt("1"));
710     ASSERT_TRUE(LargeInt("423348716884219464036135810475383914051250528948071772342860163310458834408416762288960292") / LargeInt("333692070598596277158321685175540625055291196784220778761875131238635211215212505260206823") == LargeInt("1"));
711     ASSERT_TRUE(LargeInt("799194217155696804513455791422472145830004288020092229862002878194809838686853860528620850") / LargeInt("464683104811623070189658725844484112335317254318710809435412685931867797557929558812158451") == LargeInt("1"));
712     ASSERT_TRUE(LargeInt("352636747469839143892584140454571326334478461261397405224676066864211134187818397683396380") / LargeInt("186033721385555374821067446614184466177713144438943012581124395020971843307883967910764484") == LargeInt("1"));
713     ASSERT_TRUE(LargeInt("801761259461408333553849762180599768956417531063484643216156147248955848448099036670477624") / LargeInt("111323198472302793969389464265591856113212492347381616825821493541229518086616534127017140") == LargeInt("7"));
714     ASSERT_TRUE(LargeInt("754878745065617061963821514933813480862942100365573555354656415885765453849504795806746664") / LargeInt("506892429531369995623925618180983627308845965787476619801429000463673736601894988657811644") == LargeInt("1"));
715     ASSERT_TRUE(LargeInt("783331010472966718641994499207128947531197648219670646918255566187520777455364991211704819") / LargeInt("444381209155991257964466091288857589459341648924224113951861678296533020252166413921192648") == LargeInt("1"));
716     ASSERT_TRUE(LargeInt("338769801838686905349266142692139494970338006566165036776666285719955335074853040057032611") / LargeInt("165493343644396906101168336876621248534782530124920617500182907127291045101042057767235870") == LargeInt("2"));
717     ASSERT_TRUE(LargeInt("352342212825596370032998594900981806382191434985214761063841923992068789265193013283855144") / LargeInt("20602671548759241372895064488673608268083873998612682169735567223617444357890730420009694") == LargeInt("17"));
718     ASSERT_TRUE(LargeInt("863030819171079660029370814410569951199713654186511622696236402812070176546256933172287143") / LargeInt("79024726845480294036642403851187499962549043289097242500153497731275512279516784323849138") == LargeInt("10"));
719     ASSERT_TRUE(LargeInt("788489177409243922566674193403170707916871524707247671633137687199202219982179613829451835") / LargeInt("730244478869671852853803021849204845464980049521663964525667783006010528722896168360754816") == LargeInt("1"));
720     ASSERT_TRUE(LargeInt("468315935394259866904813707383216205594004243227828656019120900170004896615293353008610961") / LargeInt("219746135201727230100792330300274011036168088285220670595025857314859353701579252748910412") == LargeInt("2"));
721     ASSERT_TRUE(LargeInt("125565063924732018935276260291580399689798101309389096633681557659866458542796514070487596") / LargeInt("116865936695262153153087904010068704639970883973990363962749793451326941162515833815913522") == LargeInt("1"));
722     ASSERT_TRUE(LargeInt("533885404072449249468152243097279233496742583767525950767155419802963085022099785157471173") / LargeInt("484201759891429159682756288033319669503705077981336002398724205978282909601868062237422829") == LargeInt("1"));
723     ASSERT_TRUE(LargeInt("652589417759316097812121410271233882812706811625111316542154583740728711241528320090274060") / LargeInt("65440880682389291931279193559876366788032607170651904607917861454824868307819185488169282") == LargeInt("9"));
724     ASSERT_TRUE(LargeInt("550577908289485039648110174749375719630478584243042014641290686900489989898511557766116418") / LargeInt("48990903411279281757639648783662748244186694410025282976303968206384105249135992661597632") == LargeInt("11"));
725     ASSERT_TRUE(LargeInt("773696249662407789983667899376433952049375125363742387813606771926735135612186165890018985") / LargeInt("199507381673138166355149882340959666676178071712098482056783142922956323122402403251311106") == LargeInt("3"));
726     ASSERT_TRUE(LargeInt("744870828452938267464895123124268132032489850424702822640600681841013066136644299941514785") / LargeInt("630684078475340827843857564409235066457984562370273859439137068728820838664827257924825807") == LargeInt("1"));
727     ASSERT_TRUE(LargeInt("973458312068905253804300708436089124561366168465129322641880083073572307998352539847375052") / LargeInt("894997229435035326926773081666216883443410969163340449123371444028970868709760925455877690") == LargeInt("1"));
728     ASSERT_TRUE(LargeInt("376801022984521693294090763798990257707413740730035684530239434901341699988495856452507115") / LargeInt("178195232152338001684428488935041177106194170903874925530980507626997423829324507263048559") == LargeInt("2"));
729     ASSERT_TRUE(LargeInt("409123640968477323127833691901324962766578107334727190381054409778272540354252694012863290") / LargeInt("241205233158402166507580589654995690837090201370923860157908289093743545064718025669513083") == LargeInt("1"));
730     ASSERT_TRUE(LargeInt("659472569456115434930646979950352780026173064780670695516297974960896105755585761874561673") / LargeInt("347285339377608717323727604085991200675467187259657405030963356883802162489256657640693096") == LargeInt("1"));
731     ASSERT_TRUE(LargeInt("822368217612470018373527924668253489724733920905073809228830069508738394721970345012753314") / LargeInt("732231320693835271984771037552802725014402443498992688674722849319248122310618801495307355") == LargeInt("1"));
732     ASSERT_TRUE(LargeInt("965112794383243378977622876882600739713559804678890510500088449942418494652285428897550312") / LargeInt("403780318326799221261472343827777299125004088540855328937217634342846096734084616939632854") == LargeInt("2"));
733     ASSERT_TRUE(LargeInt("63471144596526935130845693841573757540557477194940280866985114526637865987225101664287792") / LargeInt("14234886895203361549402622401515069006364936889134466312252336893713161319776271026816731") == LargeInt("4"));
734 }
735 
736 void testDiv_10_5()
737 {
738     ASSERT_TRUE(LargeInt("181100852664140301606887633260878875839175532673646744037387761233133504811049489083307310") / LargeInt("406543278878282327146238082981377290545416008") == LargeInt("445465125296933712180591411976754371634714977"));
739     ASSERT_TRUE(LargeInt("340390785705199812344649640728260479227928137804066638556144116072358432501837649668459489") / LargeInt("480894185637526468151587020452249326258977757") == LargeInt("707828865208549310806279444903327572056851142"));
740     ASSERT_TRUE(LargeInt("626718681857460291442150864412388530339620166605195171726280980634123785018895519926343962") / LargeInt("713701878702468097470136088530053694663055985") == LargeInt("878123906576866624759050786205590835943430824"));
741     ASSERT_TRUE(LargeInt("772215079512314092684281866535622481079886116589097903417077545681020075605094866129611776") / LargeInt("685473023645142402325021332269269624533137005") == LargeInt("1126543354552310670007382484957611823124059426"));
742     ASSERT_TRUE(LargeInt("375503654414585199945702075607126762937847080314840425545731397225929070815901503107303740") / LargeInt("796597191417657195478284924609090673757787395") == LargeInt("471384607503226843269489067702374914810627278"));
743     ASSERT_TRUE(LargeInt("796868644297185300737716432531373679429543128792637612949091252108889686857625569633987837") / LargeInt("46901865697399662582692595837967494428032081") == LargeInt("16990126777437882670878157111744882554499781733"));
744     ASSERT_TRUE(LargeInt("593663790029048995517595497811391482354559443703255331225480778086500376100868404304540443") / LargeInt("689785587241802532977550124416460413235363030") == LargeInt("860649745383766197882759260651863447882911175"));
745     ASSERT_TRUE(LargeInt("608580608696765937337653875745510162887456876446447469248267336056353296152115926751756105") / LargeInt("673321708427573865145017909232310371349839290") == LargeInt("903848191851708533424089716427428060941498965"));
746     ASSERT_TRUE(LargeInt("324191383294647610240213006833034028580563571700131153428383364427659762407160934742585640") / LargeInt("895807853044851029681321854733142867329787623") == LargeInt("361898349286312961843114362961181916957596324"));
747     ASSERT_TRUE(LargeInt("584475577109784893048743711749361138437859965104658157705694657027518966446512737277324495") / LargeInt("257721110902290947075990916841726289173511619") == LargeInt("2267860692760149608007568587479609226362655601"));
748     ASSERT_TRUE(LargeInt("635354567138844484925952207431990419083488192097642525883767816715105418074909210176636381") / LargeInt("583674585194980111163893644302155808656459308") == LargeInt("1088542457140909014611283502850710749336112922"));
749     ASSERT_TRUE(LargeInt("300505729840945695315723393692201113853027401391347016830570861706246397038254160680395952") / LargeInt("143014362762814550258013152812056429737654307") == LargeInt("2101227625223393223900321827607426454361894150"));
750     ASSERT_TRUE(LargeInt("885167059759351400701234373951307387622863134437461706704659454300636753016342246408714547") / LargeInt("89253298802251969009606327225321107734265006") == LargeInt("9917471641250054971766372976601994541413325854"));
751     ASSERT_TRUE(LargeInt("248568675105051255444314927979674480890556941977525369938301272204761516923077199554759164") / LargeInt("388408301598030043852125971986260644411151439") == LargeInt("639967462287402261025945425452680681737966273"));
752     ASSERT_TRUE(LargeInt("64662653497232004369850678624600172432207512468013327041187442199109764668710944837281085") / LargeInt("602605693118926600945506628378193020308298328") == LargeInt("107305082304409254340067202816675413412504059"));
753     ASSERT_TRUE(LargeInt("157230865648946971390416864561944810512316653238556573577956267278407511022316430227117804") / LargeInt("828029023066904727181449934801584628803119981") == LargeInt("189885693941723973655432511825969459868051348"));
754     ASSERT_TRUE(LargeInt("650073736393909894639559060808274823075661863526108007707607898443507215108059165536273480") / LargeInt("86680965635264916205019716395205368379764947") == LargeInt("7499613457575934692726883237464671210585929928"));
755     ASSERT_TRUE(LargeInt("173303554517953543409492914876892526794874383810062238867487790590515831315965595238818608") / LargeInt("781152386498010854395266455168413750366272515") == LargeInt("221856269677279988484300759906389939967221605"));
756     ASSERT_TRUE(LargeInt("395814034987366272381911191268365432004968947067381458334616316109954253712407948675145305") / LargeInt("49331467380154679192315312268818322288188988") == LargeInt("8023560944116501455172861846951227166859228257"));
757     ASSERT_TRUE(LargeInt("153211991446381169391330412386018418772535350951288863602165684399386057224859022598824674") / LargeInt("598951303243834992018286372559305901898480069") == LargeInt("255800414184937631632920576151907554092673427"));
758     ASSERT_TRUE(LargeInt("459212976086088158511970481252400020251615021147261850712813230756957743013833809836211777") / LargeInt("1169247280315020049518212134831335725467978") == LargeInt("392742394031796618843682688213088512552154598085"));
759     ASSERT_TRUE(LargeInt("838959359657672162890532418744183231424105676201478582011540017743181295687205916403698198") / LargeInt("984166863437518833272986410450296585616840402") == LargeInt("852456418546075783931555483863796846559136569"));
760     ASSERT_TRUE(LargeInt("476301262573900409987736945634365589165444359803904931778327248228803465130064187099834377") / LargeInt("373392562390083401928669227906015306782079315") == LargeInt("1275604579601422901565521692691264734737807564"));
761     ASSERT_TRUE(LargeInt("20840747282113559459410477578007283981095401861219117644486568196726350935536263758559018") / LargeInt("340894560918529193621762253050745345783564253") == LargeInt("61135464367512496157836150269708951506632036"));
762     ASSERT_TRUE(LargeInt("330437095028441372969949856507134921600121643837042033515125755016222570766047103813295685") / LargeInt("520782910990312640309498055690759590762804385") == LargeInt("634500649032602394630006610241215040646916093"));
763     ASSERT_TRUE(LargeInt("183606660992523315729045455135935913890188302313087512748523261617276933357920407572209625") / LargeInt("99922304648016458093796915587578286718866778") == LargeInt("1837494257556318909336884848255248253756162035"));
764     ASSERT_TRUE(LargeInt("563152737671334341459525859792547007567297409108798108854642576889844933893596493532422815") / LargeInt("938112117803884773284834337062880393424930765") == LargeInt("600304299436693936024437737856250067981367326"));
765     ASSERT_TRUE(LargeInt("55060458970901203511707896845616441680592542365376779646224864984638516000664150891454184") / LargeInt("442903782199972557030423428539742366432775238") == LargeInt("124316976245737318832733282474479916073747670"));
766     ASSERT_TRUE(LargeInt("822436427585295816886860936922529760821194833516884216741183397350169208755484518552807857") / LargeInt("420532769003533713225918859454989787231695027") == LargeInt("1955701168149359913027435397104788405883379218"));
767     ASSERT_TRUE(LargeInt("998744283025851491796194243743439251334158274568227636913169298073706564086451724019222942") / LargeInt("598703706864496390319423611708015700429737644") == LargeInt("1668177884276730587714563913012609374646092417"));
768     ASSERT_TRUE(LargeInt("155877084351622032146256862794579919328616492993800875679757896644812822182038842188480091") / LargeInt("543530361920813106215080333377672446295157422") == LargeInt("286786342166349396618158381279617120107136364"));
769     ASSERT_TRUE(LargeInt("212609300711360979979089475170647894591698216114277093431329584410677495646946222355765508") / LargeInt("272025042163242852996748502498443119449184893") == LargeInt("781579883310058086426799686274715510408096942"));
770     ASSERT_TRUE(LargeInt("812043104449037358119634876037977445047595108087746595272474165469659724474833171160879536") / LargeInt("632622744180635144808354841028743556565925028") == LargeInt("1283613515193458875902670747346170710964891818"));
771     ASSERT_TRUE(LargeInt("885122107298518865453287763478753112605720174845139217066815805987803018223467869305896944") / LargeInt("936699747174983097247293918258511419818213669") == LargeInt("944936848726586545090645794475498990237224789"));
772     ASSERT_TRUE(LargeInt("570077644381745673893159816626761216943159486011285625293642246591248237219515087444852944") / LargeInt("733692938722166342216413025646142665458471239") == LargeInt("776997588902272039048348893286247660526604144"));
773     ASSERT_TRUE(LargeInt("124409257078303444400477686141670851080792339936155977648376344719247508959608928474625216") / LargeInt("997945924020530866784224484337924984002642827") == LargeInt("124665329136355044760288716337797909931969116"));
774     ASSERT_TRUE(LargeInt("342279006693242318156410530040528541561733665041429513174215700029032952723060370917534463") / LargeInt("27826074242862180036636659963148084875534889") == LargeInt("12300657423173597557479114928411782209047048761"));
775     ASSERT_TRUE(LargeInt("682122466795223684505833444272868618290655548758240107140219306116324854176394162128388626") / LargeInt("483896517417429553365285180010394491730277858") == LargeInt("1409645331683170729038060425826804753133980812"));
776     ASSERT_TRUE(LargeInt("754894327877805532955289150381325768162187663892378400446272886385233589325526172021151885") / LargeInt("631931170425257829852253080282569887629316534") == LargeInt("1194583149569595839355816821719834445343145515"));
777     ASSERT_TRUE(LargeInt("113722546543855099262755971245185816896856315400289531105764197087371713562094724755985587") / LargeInt("327984335586730333251506579343278324779945038") == LargeInt("346731639913281616414987833545669083933228238"));
778     ASSERT_TRUE(LargeInt("267985414023249897190792552649954904192775386124571772948854751744957784078387854645458101") / LargeInt("113920172213102004577564369539426157915476640") == LargeInt("2352396496749930189467608448328006965765422651"));
779     ASSERT_TRUE(LargeInt("625124518371013344116973339866841223730276251466949224091284555275489294575286532704061646") / LargeInt("882966881214664921593469479944404441206957747") == LargeInt("707981841301966656283098477035217028851540452"));
780     ASSERT_TRUE(LargeInt("388677143899204881156994468392803990352965980005215842110481546889597637608357262883742813") / LargeInt("687360477380515769002273539413676746817538976") == LargeInt("565463329198715578178870841862310310468453962"));
781     ASSERT_TRUE(LargeInt("843968517671981424145921197927006937257084915852362376222143039216266106350215803453931333") / LargeInt("721322287681142521085243629702331020552453550") == LargeInt("1170029724695064673251183363946202639301074038"));
782     ASSERT_TRUE(LargeInt("52998893307930010298171019428652646192374374927366360378079634865120294862378077231688879") / LargeInt("406942573790388071061100113420560330328407848") == LargeInt("130236787009729767036085870946457843902111580"));
783     ASSERT_TRUE(LargeInt("379259918577933682890051506083196678466926920444783874061849433669599024793817160224492112") / LargeInt("307712276564166792207119052437474831714968803") == LargeInt("1232514746608906145648003854194710599845305429"));
784     ASSERT_TRUE(LargeInt("861916438093129829216005063544101675157628386446292832400373746618223364329921152205939228") / LargeInt("695829451411604523111490015192219104298753806") == LargeInt("1238689216653003876537844712240427758508323041"));
785     ASSERT_TRUE(LargeInt("441611866285367066062715810903096956285961584231893821698625474410999039880033748195460037") / LargeInt("90808816567333700975228631059206161054704888") == LargeInt("4863094608857906521176069863990375957340809498"));
786     ASSERT_TRUE(LargeInt("749128900322275762840589207632529724174881015173271049522411296872748921593147468609313044") / LargeInt("719021314763772723623325626926243174437296133") == LargeInt("1041873008407816930916908576756440991036027481"));
787     ASSERT_TRUE(LargeInt("480251690030838180097837753633492056561729999278411339884877867808059449870681866781469021") / LargeInt("591181277666307678410911922212786140524170207") == LargeInt("812359437238329267042013695619773327211957697"));
788     ASSERT_TRUE(LargeInt("522320858581178165070659979266381719283595809775173058741351245091208384166707439813383936") / LargeInt("669401784086171879124156242583714137764399269") == LargeInt("780280051530218160857497230249909519108369733"));
789     ASSERT_TRUE(LargeInt("287045327994838040848198646907898512846023779156861645444299757269943617727218361916542376") / LargeInt("211723684139829546800955462272245461965085238") == LargeInt("1355754454968124916231050273966383640275960083"));
790     ASSERT_TRUE(LargeInt("858795379285948542143970410931563606148172974069356663075666952619562334292400774994667282") / LargeInt("766957052033612895146316438423903819897346398") == LargeInt("1119743767931754687460307820971787386606695415"));
791     ASSERT_TRUE(LargeInt("465607023227002195692237984785556557206601939720809090309635971950394214386423390905085215") / LargeInt("165824811199501256582676299337660487344154696") == LargeInt("2807824835493631967698802580839903368238261342"));
792     ASSERT_TRUE(LargeInt("650040204002297628848227536460172654647077052527130016988259946762856278781168644175331120") / LargeInt("424597418996721275924283131149132270382187658") == LargeInt("1530956560071122836902146608874588140748520108"));
793     ASSERT_TRUE(LargeInt("149738396161754507206310743421715496020322788388719560387368415642277898098503026663588605") / LargeInt("178879031093520185777506215782444181272741717") == LargeInt("837093063655233062953094323145749531911068551"));
794     ASSERT_TRUE(LargeInt("405541294014910614523153536640779225588886201670276546244725742663927354953350472085699334") / LargeInt("984873987558827375492580169022465206373799295") == LargeInt("411769728044205535599060015566375366666428900"));
795     ASSERT_TRUE(LargeInt("215995031507174869604601611948984280158111107729005255580129744374703883579679576370983551") / LargeInt("161165394622236329050202672414390441895583990") == LargeInt("1340207257354821628901904122313568026387528007"));
796     ASSERT_TRUE(LargeInt("209161624887845930961725176951503830550584502477107893934402055037331711663774295607009730") / LargeInt("736724611073445285532343597153010749406755811") == LargeInt("283907476069092885668595701634363047951483818"));
797     ASSERT_TRUE(LargeInt("907619366956448029761480814824264552070787049043516198716362858634630926607123822497282100") / LargeInt("626040758831999708603193448837142426106060137") == LargeInt("1449776798318671379572822428040395204947839663"));
798     ASSERT_TRUE(LargeInt("713688422448925640087602830461717961669773503549807928402848887236556248769871701094618812") / LargeInt("55852915536249716488446626281299077553562813") == LargeInt("12777997631757053911471590257665623403450754668"));
799     ASSERT_TRUE(LargeInt("202088170569669942695090200368663096359401568820094915373999800485989997771486340545967637") / LargeInt("180774575193320714975868975666210144066623391") == LargeInt("1117901509952693422282596987638573524207281754"));
800     ASSERT_TRUE(LargeInt("570103125195981328697818420347280887788871335860864447489868348455438816530067695546112647") / LargeInt("50815563050373462850910714624505472479028996") == LargeInt("11219065399921637285666362974146316999103787933"));
801     ASSERT_TRUE(LargeInt("757561293328819964402021713642028964464944996646490769937408972818886638390330876147717605") / LargeInt("94661146308631750486508279378445358101973379") == LargeInt("8002874704885558170920448637595146053210726814"));
802     ASSERT_TRUE(LargeInt("864775053547461471705776345798768144912928755006652029825862455330271228830272284686326668") / LargeInt("263188723686727179207207054009951636953391780") == LargeInt("3285760276632523443577904341422711006798045001"));
803     ASSERT_TRUE(LargeInt("784915064287376336041997904110607487101011596198557981946807243269476776839112651777686809") / LargeInt("178122262108454456336535907846972255033381034") == LargeInt("4406608444089150478845371389723408569298079133"));
804     ASSERT_TRUE(LargeInt("899422200086172919069412843187928461178146357600627965468182017368878843892713895021157869") / LargeInt("406733634349403894453240776193461139199331165") == LargeInt("2211329784724726454183887025096408424322968095"));
805     ASSERT_TRUE(LargeInt("290241493186501007508442303663481969130095402110604510889665866642499578408409147609616824") / LargeInt("505304387887517019052900318049641543763133865") == LargeInt("574389417831673453527615333210186043436346240"));
806     ASSERT_TRUE(LargeInt("363064703664487472742229925141884957932796550762855767516740697479817186974360586115474873") / LargeInt("33126683473823621745727979694323142811159841") == LargeInt("10959886882469765420428901622030301604838709784"));
807     ASSERT_TRUE(LargeInt("188525891977448998849648740443990365447007788629449978494500179726863347413969296860286634") / LargeInt("933383474990490753214561745070200477987046247") == LargeInt("201981176042751011526802859638193781203723274"));
808     ASSERT_TRUE(LargeInt("583535601691370795612484936021086023496595809658706867354301640966572869657463232057403028") / LargeInt("703321167599375686750800818750821647323205788") == LargeInt("829685822883924785579543384003889045160060783"));
809     ASSERT_TRUE(LargeInt("589112756599128610559225056038796240660943680561888478049022535718768588751675661329131220") / LargeInt("812112286728746754520969154217823927553324893") == LargeInt("725408008505968937720245998588609144847003426"));
810     ASSERT_TRUE(LargeInt("374538686288579559741711215267371388120954470863683626393312766575047262222796333165424134") / LargeInt("270323930443243589279652615186734365585930331") == LargeInt("1385518054855363948341003608059244119125046036"));
811     ASSERT_TRUE(LargeInt("256177966389524347000077392646217752451274490824888883829451373725431673041864124058926251") / LargeInt("404227604778752081867583579924603029890103274") == LargeInt("633746838070941531927971199335751157724041139"));
812     ASSERT_TRUE(LargeInt("218983167605754246945079101927123553978507617749996209616917424088358907148773057784257863") / LargeInt("171831884156712790659635544638659192987996544") == LargeInt("1274403575799930740181220250220368384826723114"));
813     ASSERT_TRUE(LargeInt("975640793993422818895775325751252218335281684077237785748301341904562385289431680062284894") / LargeInt("786030250230513312301197302402288658467243295") == LargeInt("1241225504625685610078980346920528705118555644"));
814     ASSERT_TRUE(LargeInt("933755166999100760271009594233369655345583291462468255961089373525016415411403377767087349") / LargeInt("820781944437466804047043933970203260590173783") == LargeInt("1137640969477053458672212652476446505192068500"));
815     ASSERT_TRUE(LargeInt("238253488976305912846479371269925298198764356369793932191041162508065449377242283174635348") / LargeInt("215032498827134549683787170784384789580913596") == LargeInt("1107988282123990970225064145127170070150217626"));
816     ASSERT_TRUE(LargeInt("124408752034532632762687504105281671853569657733608696395292147882213056637095334057061421") / LargeInt("749980996662297671027388969434573012655352490") == LargeInt("165882539141923822060261466279959669992374114"));
817     ASSERT_TRUE(LargeInt("870489354961834453968336619699746418832350575270728550366158691787392940421725413644869566") / LargeInt("598263822486351856073025110303520995875306888") == LargeInt("1455025897009998221692913444127771113510004333"));
818     ASSERT_TRUE(LargeInt("997149780505199820801225964006693869043391053223096811440158870633460141669208586910645153") / LargeInt("667582252902540278553718780575734023537479433") == LargeInt("1493673290699015636721101183213722373806915335"));
819     ASSERT_TRUE(LargeInt("606256219515497205841461316368970749387778832471347183055034308892926077382792072429433901") / LargeInt("107077357871226191753238266575349497677835718") == LargeInt("5661852622891531651566528058278577573243991622"));
820     ASSERT_TRUE(LargeInt("114823530598453142474905778776935950785857072371883965426166621522759175358933104942789400") / LargeInt("849225127008672886278042719134778531928277319") == LargeInt("135209765875522055239171691211338793138792143"));
821     ASSERT_TRUE(LargeInt("523161767174880882473699151606968330452677868820725815493979312075117665619255387570105287") / LargeInt("396640654746937275429527529197223476525856007") == LargeInt("1318981705263334608163771051703207058141840582"));
822     ASSERT_TRUE(LargeInt("228278008528117830798579694927473874364741130183008772494777513358723309424084536200106395") / LargeInt("318702431142404116430076891737179363142957283") == LargeInt("716273194747352207608465375122103486664052905"));
823     ASSERT_TRUE(LargeInt("253448416295621269680224452883351800044286986789045353112569767959826392009813037050983736") / LargeInt("589117370951635193880650018797029066410421434") == LargeInt("430217183863058487825465971569415739054256720"));
824     ASSERT_TRUE(LargeInt("720858197088278058465947991050102926627257906494274183780623566840870500683843318436184719") / LargeInt("443714049519151676923644330928203240933173947") == LargeInt("1624600793843387708489413792293785678835793666"));
825     ASSERT_TRUE(LargeInt("969949272389464823534529309833965012670904073009496609981043772303253121508165846882690731") / LargeInt("490703145528459487681042298779481440431112824") == LargeInt("1976651833655731732057736201021364122899464996"));
826     ASSERT_TRUE(LargeInt("266967377307134242778402055262790477488352424923328397536221761794849131062675744429049618") / LargeInt("760779900482537768031811998974537583854735184") == LargeInt("350912763517813208651597400044282919377792574"));
827     ASSERT_TRUE(LargeInt("658405788515264624470594816059014377515599463012034022841975140638259934786913387203872873") / LargeInt("292206940106726773877378267269497977568588523") == LargeInt("2253217491257346559888750236112601888109455286"));
828     ASSERT_TRUE(LargeInt("584307603516894737707006720503239018233573975875259601482876260469367721973691868329418604") / LargeInt("677492804192689215489575288873583385720457239") == LargeInt("862455807502139616474791776365126818163925998"));
829     ASSERT_TRUE(LargeInt("119286339280209457065844708748591824462375366699081639782875389523013930524967333093266117") / LargeInt("578794661683615961616286097976905893287369823") == LargeInt("206094401308446130831947213151487080710345959"));
830     ASSERT_TRUE(LargeInt("278893493586494027526088169499926686227358333448046431704331737119253595675229773408459685") / LargeInt("876776725555759647808055359003463630619050526") == LargeInt("318089526623454453855861734552155098092031743"));
831     ASSERT_TRUE(LargeInt("810068958355455333097247384321568382224967624834209510063821714253033542485363740102052750") / LargeInt("663927218694638927181366725427916055135327056") == LargeInt("1220117108541127009172574302691911596584927851"));
832     ASSERT_TRUE(LargeInt("98348573601986876756234398509565144381377609432137657155024140229177568469929796944750653") / LargeInt("805808905955428647386891623333511182910205287") == LargeInt("122049499422418629896905590191993358059607872"));
833     ASSERT_TRUE(LargeInt("645297649459141555348890467145655300988908749316795325816011676233790849253381661278010990") / LargeInt("313086287160962992014655963317996526869990569") == LargeInt("2061085636520973032894420513331374527966864264"));
834     ASSERT_TRUE(LargeInt("623811855742613921298856043033655936954568246435782668850629898452868486106561761967353796") / LargeInt("956072495714067736523401332624293564511293302") == LargeInt("652473383074056250834199071338192889141959189"));
835     ASSERT_TRUE(LargeInt("797487144882639495333041814868884235193394955030865791153751981426744159976604497142408841") / LargeInt("569586251723918554791559148198965778702616317") == LargeInt("1400116562625857934862976918946141774142064046"));
836     ASSERT_TRUE(LargeInt("497617166613085650681940473812343382753175744287567924366531252700612612554416855412265021") / LargeInt("705036914556599630932684665252235163548323429") == LargeInt("705802996040340610555185474738764259868972753"));
837     ASSERT_TRUE(LargeInt("341263826107988936063127358577308253522389383567733118953964583977110770625590910482082125") / LargeInt("805397981169273382411204853384338016793598528") == LargeInt("423720736936220720081697020647040563233052709"));
838 }
839 
840 void testDiv_10_2()
841 {
842     ASSERT_TRUE(LargeInt("159176259380529959860876841622042738650159488090152241953776394833156803076349197765560225") / LargeInt("238575020521501145") == LargeInt("667195832290348626533624771091206613021482047734408424081187317000631685"));
843     ASSERT_TRUE(LargeInt("295863879690883552255430153914486275380344520632977292149459351326766741535240597033278457") / LargeInt("473101463171054338") == LargeInt("625370882828809070684849374477825613909221761519456074135105598786760316"));
844     ASSERT_TRUE(LargeInt("699320187040577498025488175482900840345188083836195723391513975608733021072597346199115731") / LargeInt("565708319230520217") == LargeInt("1236185085614079229825798360176253533508871664736317684964690743905667884"));
845     ASSERT_TRUE(LargeInt("518466305628845887919216386304517376317460946064415594821707369421201414554006404238713874") / LargeInt("483254866220097663") == LargeInt("1072863082961095792960942647507003166573674548303358645161697174861485221"));
846     ASSERT_TRUE(LargeInt("433866484721898175106671550433485808531783537188484085981976910603675531325665190438573878") / LargeInt("931871438163835757") == LargeInt("465586203153506789918655043382199885685725865751719417622137256411923136"));
847     ASSERT_TRUE(LargeInt("670484340059603977728203338830683285683062926205970727524443448368212271242208859090041636") / LargeInt("320023957584162082") == LargeInt("2095106707388541169522344060947274123979938107312147123178781771646504118"));
848     ASSERT_TRUE(LargeInt("889932913767268568587174345765446805720771747543295856138644043678169535418600002304018968") / LargeInt("938285160990879889") == LargeInt("948467428417445362129334582756447891294797145659666187377275774192913074"));
849     ASSERT_TRUE(LargeInt("706710994303864767328706336326905510616421690102062007172536451420188452850529844432946633") / LargeInt("712840891640253732") == LargeInt("991400749580619579667347135354802743303905232307862473637333088585590593"));
850     ASSERT_TRUE(LargeInt("774441987063550548515822724787486522862196580158816054205337117404382168641168842718058946") / LargeInt("684714632212625636") == LargeInt("1131043431277311625490226194037917633650079402988941705125286538911284224"));
851     ASSERT_TRUE(LargeInt("725866905565216464254084134873502402045832453653043541406922340786748706812056195273645816") / LargeInt("128587568302382315") == LargeInt("5644922873557198140269720913494914748051890921597265331333257288363649054"));
852     ASSERT_TRUE(LargeInt("757204271445298100107270776124439647919368125500778540890419126044454040443274273458189542") / LargeInt("907494109935590245") == LargeInt("834390287667036179562955067583001272480322411818104637347599259129490943"));
853     ASSERT_TRUE(LargeInt("498187614043121891316283776000542662226781898579090180919311557025188219306740253500095803") / LargeInt("918755189883315670") == LargeInt("542241959042857794365316269964512925827053247019545636441097803777022800"));
854     ASSERT_TRUE(LargeInt("97250714268337778703134456134835636537658553758939972341703553560773342857453086905871386") / LargeInt("179277019644412359") == LargeInt("542460570023029460960132078451273885312093920804640764393933951066618082"));
855     ASSERT_TRUE(LargeInt("172342265910873173127868186411506839254165310160838445134316194761135327897552662915622097") / LargeInt("415376695415963282") == LargeInt("414905958405508351758052881459362309078924166530986414139032357697516525"));
856     ASSERT_TRUE(LargeInt("89277150381553708645822904311717978018321605438679412638776228429690173810359600265711830") / LargeInt("772275769709802810") == LargeInt("115602682206514496989354477652836508579173156964080791131361540643685109"));
857     ASSERT_TRUE(LargeInt("680161729412907334923183018129476164990222247205193655260138031909338491428698036534168960") / LargeInt("444969583043682577") == LargeInt("1528557805593053291648057294406023355818726743622931471789769659215467207"));
858     ASSERT_TRUE(LargeInt("752436882525634809512864534814589585235679346736797460469500724143598780427374745992056025") / LargeInt("840909612853087754") == LargeInt("894789250859818994664457444458072861598307217432002318637361726832609358"));
859     ASSERT_TRUE(LargeInt("855957695178801907730208321071412155918100659490300883866055531365424876661844243788204368") / LargeInt("400192719831739419") == LargeInt("2138863734299535389707433393025356180010841871563445040865431465877268127"));
860     ASSERT_TRUE(LargeInt("418982559958587542935322298329539041999858188442985249975272248772974575761291314081549893") / LargeInt("241040851502498751") == LargeInt("1738222203194648764617675052207081428458531194313106161156052754981575095"));
861     ASSERT_TRUE(LargeInt("606812291743783345870735747587167837598415732392148294828684326720291598511327331756062477") / LargeInt("18180978580277119") == LargeInt("33376217295699281436036368643854090892185602617777063175927715368885368653"));
862     ASSERT_TRUE(LargeInt("43903713510428906461114152496037695202899586595398635187859725788433850918884167841364772") / LargeInt("210110911451030653") == LargeInt("208954942926233003223319279321352786972117037006206665747716301526523932"));
863     ASSERT_TRUE(LargeInt("150402690597738010048906008364873419107802571804185824896995423134778064580162758707874893") / LargeInt("229489369015819150") == LargeInt("655379773114328703875796858585447621463940615319328925917115842330614981"));
864     ASSERT_TRUE(LargeInt("103112924310496192961249750503752835672860911889670802123131818480436005444548298629155270") / LargeInt("640641290031523208") == LargeInt("160952667139863009074618159215413293013530741747913759565228849785188380"));
865     ASSERT_TRUE(LargeInt("713910625215064772393758508602443641460779876570915183966104899827791489232097247468061891") / LargeInt("440237348338028302") == LargeInt("1621649385065124879683879492443579684333040287790670529358706770483331847"));
866     ASSERT_TRUE(LargeInt("878371405388865906329210875609223229399238313239234533767815249843823951745789764305265572") / LargeInt("333732012997268243") == LargeInt("2631966281868367835133241360700459105848563941346705894991670167103234149"));
867     ASSERT_TRUE(LargeInt("363496587999082489434449233384756756576624815576311120628304294917286337665549857242010860") / LargeInt("183016072745388319") == LargeInt("1986145711392126677982755410946293229499609771750077674640182469317841096"));
868     ASSERT_TRUE(LargeInt("327508457536308448511444677293253891336693566706695568167790097962443673027428050503993808") / LargeInt("219498411337950956") == LargeInt("1492076664883281151355798123640089673858819239927797914687397995418887471"));
869     ASSERT_TRUE(LargeInt("868847619329611255640578575741582934637074778652454385921792496806109799143222715279835005") / LargeInt("822490780329837013") == LargeInt("1056361530254702823359622666264998581004314455956275601844989063207226854"));
870     ASSERT_TRUE(LargeInt("794484591341387983514994912870782387624300548464686242088569793163044527311191870510449817") / LargeInt("937330304436591216") == LargeInt("847603654315791408992170910988211424684856407775366629171236761472883306"));
871     ASSERT_TRUE(LargeInt("903632630337611450816786160850092770866806278879607204501680548576980443885840325757155017") / LargeInt("81029239190858896") == LargeInt("11151932800568025428872467315107909804129179749496792338468910059929674762"));
872     ASSERT_TRUE(LargeInt("780557236025831700635558778964997569021687940449501505545261742830939443341609589559618185") / LargeInt("976620744090364431") == LargeInt("799242941284082090944871729510871400061569998833410370027948076181622107"));
873     ASSERT_TRUE(LargeInt("578169966001563693240115690240094616072147221476530244264952826706918935431037532196048790") / LargeInt("878182359152410976") == LargeInt("658371191331595283615785446934963933952347999486577420728575650099245604"));
874     ASSERT_TRUE(LargeInt("677888758425709204093657427509422904899634342161188185544342982930343313223017981948251221") / LargeInt("10946112871793685") == LargeInt("61929633502365570749405842618519873355045581868035611716780655371419498563"));
875     ASSERT_TRUE(LargeInt("809559564956554751275993023432443612740462107126587494974221890297910810758997655525701751") / LargeInt("76926957248136137") == LargeInt("10523743482343045192707441690402474395695154500097832125372900225773647386"));
876     ASSERT_TRUE(LargeInt("373432921193513336350088892935038210108686165995140340208893871828391558571013240658631825") / LargeInt("701884568301964251") == LargeInt("532043213454516791569725190769207834474329414797402241421452633008796168"));
877     ASSERT_TRUE(LargeInt("567333051647118333219665961051411138000306858543991911323665155790294310214223361778917862") / LargeInt("951708706614609816") == LargeInt("596120480672304403906366487594713197707318122955497580496569936445293243"));
878     ASSERT_TRUE(LargeInt("778239096924517202653120246556195040912415954260704264360157041322078564653119604358271566") / LargeInt("18613657071050575") == LargeInt("41810112540157190274874050120402762728408524494606823587474391867673301634"));
879     ASSERT_TRUE(LargeInt("224111417185019682896829789410451217097777107059397021553883001478154765099801223134132127") / LargeInt("252488849691167374") == LargeInt("887609165549854389036426972098754335283574461818443773908470522193982031"));
880     ASSERT_TRUE(LargeInt("46524225333350744154911303542247835828652701353002251930140546710610131371005555272485707") / LargeInt("715252232753115591") == LargeInt("65045900177440708218091991504782789344949896820247612342957002299302400"));
881     ASSERT_TRUE(LargeInt("996912827397338088229387257969621206175637347751699359825054129150776810372679657050406400") / LargeInt("369457472761225521") == LargeInt("2698315505561926926424784922574216163575479094566353940837805227731638215"));
882     ASSERT_TRUE(LargeInt("701854911722948286862322652722981947818132335538385948575360806241186441856042510045420187") / LargeInt("10079843540523468") == LargeInt("69629544238590378814435072501705443067403959989122820496455311214240134227"));
883     ASSERT_TRUE(LargeInt("109838190783553006820126842366001411201589939299394987403895109938357176219888281723611696") / LargeInt("506966455910390333") == LargeInt("216657708814895697872390615311398320076564284690692291994800626855434447"));
884     ASSERT_TRUE(LargeInt("306770112232777669905570055151574776993164345364908444914487347117148657473864734508694670") / LargeInt("56985670207193759") == LargeInt("5383285150765000810724657822562854990519746562727310056294620815986976359"));
885     ASSERT_TRUE(LargeInt("543718820298608214748593856792356888474787397797563238113047091858138358065367373186441512") / LargeInt("352750839186443029") == LargeInt("1541367900222714749170876229592648780760049511829800878056955333524635418"));
886     ASSERT_TRUE(LargeInt("75321553945543589155177362098910935943344303972395885879293956436096410322709915312437356") / LargeInt("539473503106440685") == LargeInt("139620488331346810812975740503444876764921272564886438280576195413811932"));
887     ASSERT_TRUE(LargeInt("994727302383172279742442277144023471054162592362571816412145885464759775096251745105415318") / LargeInt("644768051222483283") == LargeInt("1542767667376143400440208687597180892315057350593583283360923660047638131"));
888     ASSERT_TRUE(LargeInt("309809346756399675271188053963643209229040500114653015917476110131528704603761608426322816") / LargeInt("277750064259967174") == LargeInt("1115424932778506246132205453660328686921839540834279093470635426657132150"));
889     ASSERT_TRUE(LargeInt("616444966759123167483964101741742541131726565592518270951542176925488706290877278514269818") / LargeInt("176770233854425475") == LargeInt("3487266794401484893815510389908806161196040594853233675235272437959593099"));
890     ASSERT_TRUE(LargeInt("286180114233542713033145412632209455609169197477743111580531382106862633897210672770721824") / LargeInt("581690932889466563") == LargeInt("491979671768277187651857309854377949365333431659498437519672251968970888"));
891     ASSERT_TRUE(LargeInt("760679000030300496955487951562941885922360406147017948804487427362511029543881731159597995") / LargeInt("938399202819786559") == LargeInt("810613433754572288541495034884689237575306521084215406775886761492494893"));
892     ASSERT_TRUE(LargeInt("97199382475854583964928174299240042853060005745977907861373706140319264794738001270798621") / LargeInt("830435934856659425") == LargeInt("117046214398985582961859721518076187785396015403577820018146743516062957"));
893     ASSERT_TRUE(LargeInt("389124502358976763509241650850355012888926949397981059588995106797355455239319218135901404") / LargeInt("858327488512655947") == LargeInt("453352021887668070819205138147541579146808351334774649798885963993633874"));
894     ASSERT_TRUE(LargeInt("686218294982736071237701442465041708763377963945555620160364100509839836107035554598436012") / LargeInt("458817217530975920") == LargeInt("1495624551047733348834955039738015167769627967699222285186258091854831320"));
895     ASSERT_TRUE(LargeInt("852086279598018141297041559448680983900607731007555079676435438541924853427109070493268040") / LargeInt("192409660984848442") == LargeInt("4428500498554055575483355010099209183528037527730547713526824625480702454"));
896     ASSERT_TRUE(LargeInt("577381820261914036706774536718127550706851265682954684602016705786336767647394457870470657") / LargeInt("670029182429810904") == LargeInt("861726377600572393203057781859533738817916543197854453708841344431642257"));
897     ASSERT_TRUE(LargeInt("703729827216936162619380587136244866139029399167763924352307743748661164279112326983468513") / LargeInt("47359695068839863") == LargeInt("14859255875571559822399391766901505713290632707223293764956406297808884828"));
898     ASSERT_TRUE(LargeInt("506635636306860354583905518755733289795128938560870959787137989438876185374469327341732098") / LargeInt("403384247742622628") == LargeInt("1255962867023297292034931514119015611881458673056298342579245347477916526"));
899     ASSERT_TRUE(LargeInt("182318357695214307472626489152231284747145851521115085520588389464155595832104039082854812") / LargeInt("624760910697133487") == LargeInt("291821006361899485241012145050271235213644328389287391384315924732348696"));
900     ASSERT_TRUE(LargeInt("688303440981787245896145406726310192040381668214887285408525535856880802788601430841688442") / LargeInt("3498260524782020") == LargeInt("196755912290059100060059846273856929889793442926113817694455396754053413495"));
901     ASSERT_TRUE(LargeInt("169759584571078504825779188451508909929616117601158956514982135424007038803545809560886715") / LargeInt("338789535607739915") == LargeInt("501076824189844347713317770305351149161831359886589308649016975526545403"));
902     ASSERT_TRUE(LargeInt("102405112643961233099570623697233810485785396799846503349509982667908696156152654561554156") / LargeInt("772673392277430348") == LargeInt("132533504670227361442840808439569901601832539909856691900417546672614131"));
903     ASSERT_TRUE(LargeInt("622930876734888069080600405980597329703779568186037692681085226128330676077912925812883538") / LargeInt("503084289278832181") == LargeInt("1238223673468028856774094342817650542444533349639935560129858138340443559"));
904     ASSERT_TRUE(LargeInt("331536803076171183235771475031617584929291537137693271422090043971126630716731653804508156") / LargeInt("42054998193790841") == LargeInt("7883410232202091280311627261550710235079607815801307869466109665428375900"));
905     ASSERT_TRUE(LargeInt("452710258297887242782209891981846020271786560566015339339271063532845280379900105560176922") / LargeInt("400842625852740168") == LargeInt("1129396499024537329245895677183606975929178642281857094957973446627316769"));
906     ASSERT_TRUE(LargeInt("163806054368202056341912093427702132874940578625312766220360413793492189229067871288138151") / LargeInt("319183043322281432") == LargeInt("513204124702846122450096042880441589241626656376496584105726329342596901"));
907     ASSERT_TRUE(LargeInt("911221003457865765721965066241291365463360411704854368793785267888169250334039941586544087") / LargeInt("175899735312058376") == LargeInt("5180343232701835903291383935522637596649462900315796012137187569915112197"));
908     ASSERT_TRUE(LargeInt("449950509471453224475827905542130587453043695396095928242083011103456241604901792880700579") / LargeInt("66340678471185327") == LargeInt("6782422487085152597422308558269494507275511592763343770975570113451646193"));
909     ASSERT_TRUE(LargeInt("185516189805842003184876927910843491133902870237954087762072942730603177187570713342074138") / LargeInt("112809825291504661") == LargeInt("1644503830463893296282466884758046753895614891889624324080250587413246965"));
910     ASSERT_TRUE(LargeInt("993949792629762226183688959550465216970838676729724549930173719089819184098829863120791925") / LargeInt("420045335301446591") == LargeInt("2366291704957160536999595804658103614646146282209909751457357520933642740"));
911     ASSERT_TRUE(LargeInt("192171159940383655116087732553120849863378560310061739187009870367709440659379898277985601") / LargeInt("39619861436849899") == LargeInt("4850374356979649856856836209744589820163974870457045611273381581135265354"));
912     ASSERT_TRUE(LargeInt("934508823209217809750692433654499511857154199342156292559053313145907531941640078111973374") / LargeInt("152639618719380959") == LargeInt("6122321524710159324418355277930733388081668804036486896808810792022888741"));
913     ASSERT_TRUE(LargeInt("803744752134902162049175677575257360205892714372206713760995093983437608803082578999048158") / LargeInt("79131364802872725") == LargeInt("10157094524240072536724756644121405747262039502279674712899792111810291353"));
914     ASSERT_TRUE(LargeInt("766173132379615997964476636134076277927530157239697520365536913467067664775238185128374610") / LargeInt("1825101223690494") == LargeInt("419797610365059881828299546370380362709373264756752364134812673097509793777"));
915     ASSERT_TRUE(LargeInt("653480433233243075739832370659909195402574909242845984766199806449618585365421898529456493") / LargeInt("858052130021133369") == LargeInt("761585934431685635652786914974104537972600257512671766964426149519001086"));
916     ASSERT_TRUE(LargeInt("766687868415368654174123730468460142967665541042742782307011941869995064823815692266458388") / LargeInt("885707341415479040") == LargeInt("865622122077139706004481360025033361224642152032423130426607507102680079"));
917     ASSERT_TRUE(LargeInt("353861206491092477578065525291001363532102927875562243263019018902736098341799364740918719") / LargeInt("243425569329311808") == LargeInt("1453673118506218854444926182302787945876935491432383058659102668492219660"));
918     ASSERT_TRUE(LargeInt("54952328093453762563763369536569909534684401982825762762481623484912229539275781073359896") / LargeInt("979289727627806617") == LargeInt("56114474136850334172017068657268144297308814564603794405368440441032362"));
919     ASSERT_TRUE(LargeInt("101084376700028478825323666959975550189103379010636482364291672272139203716360458212868879") / LargeInt("160587361473517163") == LargeInt("629466576774776510510125412324207022563498216162178664182768924817095343"));
920     ASSERT_TRUE(LargeInt("479522002499910514722207807732692438901555338075328067493481236640694616197457685868637717") / LargeInt("966975114659167352") == LargeInt("495899010461018004168821112701774934282572228579929009250294637122578932"));
921     ASSERT_TRUE(LargeInt("30702428398895712137761945316676015974879008390473238460612512068058603051374482298258861") / LargeInt("377936615079767071") == LargeInt("81236977773152983242720288978859951028459545201063895060634807969639028"));
922     ASSERT_TRUE(LargeInt("642544420391343049781053515479303028684382488121507013035400813389999815545511222266574738") / LargeInt("547496505513717639") == LargeInt("1173604605546188213019440920882822398489051852328069433263045817445062689"));
923     ASSERT_TRUE(LargeInt("96863950651952210886375848547886673565556783053784135705214562502638704848987637851127452") / LargeInt("459663901869510995") == LargeInt("210727773614578654451763912193253249985598754625333145097640128373514074"));
924     ASSERT_TRUE(LargeInt("467203266595392085163199634292996208584850830706035805461702352207177325948048823210653944") / LargeInt("608129677550036256") == LargeInt("768262566098743146326164950147782846268062834966245121012443205377767044"));
925     ASSERT_TRUE(LargeInt("50012710333287165846202461875663839025531568611348525503955770812310566488128479823382147") / LargeInt("381107992736233836") == LargeInt("131229759770221182906114553001128073467653060277383243694345515758955157"));
926     ASSERT_TRUE(LargeInt("188014421524952211202482273014230346076222186409037519594583558875948225088631281198514758") / LargeInt("93799144469583786") == LargeInt("2004436421975251366633475226264420653878983145773153624645403828582237251"));
927     ASSERT_TRUE(LargeInt("108461029300362419053573870353431943027656933811595142984280282361271080327952399559788820") / LargeInt("534837549355444874") == LargeInt("202792473024890169091499941296876020053673232785672996043896078951715374"));
928     ASSERT_TRUE(LargeInt("133916178973001917419274904824359740909549930211003799238460519427719358055609841701759347") / LargeInt("772397251595670246") == LargeInt("173377337498740264341742545732867879697032052262410642884881933930476387"));
929     ASSERT_TRUE(LargeInt("861659036963425294511711151727679531377308257151894198156387565579636612685563290650446153") / LargeInt("201145601143544614") == LargeInt("4283757795670186867585253860522085958403115113504764057906392005691389314"));
930     ASSERT_TRUE(LargeInt("29476326168064605332104776162930373824587005811974477745230392027851661181990050529256030") / LargeInt("699219748201553548") == LargeInt("42156026404974918758445015251706000211097510959514583729078749245384254"));
931     ASSERT_TRUE(LargeInt("634641874233106707836327711436694141673493230586155688486108945015716859808859078144846685") / LargeInt("953178631675310238") == LargeInt("665816304670676299146799471461199588792246359657806540556994517383611214"));
932     ASSERT_TRUE(LargeInt("862557663196252204390290134169101827726760902502623551842867395011951431706432086489988268") / LargeInt("463164805214729044") == LargeInt("1862312622817615848992521995611668327130545178994769091659526563032251380"));
933     ASSERT_TRUE(LargeInt("987996255644019444015817593646902705157967434719109046894585147856615924243167355206308727") / LargeInt("728069494534671895") == LargeInt("1357008174440097213930845250179205113479047574408572373848697817417803002"));
934     ASSERT_TRUE(LargeInt("809100044408836469878606395057573412390004226149108493438669428174033392591893658287827356") / LargeInt("636930751856920437") == LargeInt("1270310849413331499947461592252011000355508264030510275156322577764952670"));
935     ASSERT_TRUE(LargeInt("228826665242060964918219194636389518617157083384573945580443015185723854880895335966699272") / LargeInt("247174137105762136") == LargeInt("925771069422807124715717429653397962443716250209781192359725355040411938"));
936     ASSERT_TRUE(LargeInt("737386234534123803129751327067367657655786820999793735705474020185671375633590299792928833") / LargeInt("859597471009838301") == LargeInt("857827366183216980747961759955501317109918361353775910284232101112994205"));
937     ASSERT_TRUE(LargeInt("635438552930445346044195516372040291066544279580476188063313610770489333393918001161948219") / LargeInt("513805816756249255") == LargeInt("1236728998013463441720981431243301001909959254227896721537132454123661496"));
938     ASSERT_TRUE(LargeInt("412470683498687474653944140798903007178473420681496784914185042378979732859456693895080670") / LargeInt("127038170891807732") == LargeInt("3246824797642661380173245166414247530790318829063598620871833028930930417"));
939     ASSERT_TRUE(LargeInt("972700131596076017646832626899065546278016576138146289329952006170291581951896929696167737") / LargeInt("802948204795915087") == LargeInt("1211410805561619863770834051414073546124055788597815848100792062322329925"));
940     ASSERT_TRUE(LargeInt("291211817327829580883538950536726052560670225518485055679348663360876108493385291699831757") / LargeInt("178010482932754951") == LargeInt("1635925101320226430047648045066959442416389160096755780125173024424783986"));
941     ASSERT_TRUE(LargeInt("825738273700795525380857695940792711777921745026303815987751198974753413374216951792280153") / LargeInt("427595880642489559") == LargeInt("1931118401936127436363817240670333889239162126974375186913594398603877046"));
942 }
943 
944 #define FuncTest(name)\
945     do {\
946         clock_t sTime = clock();\
947         for (int loop = 0; loop < CYCLE_NUM; loop++) \
948         {\
949             name();\
950         }\
951         clock_t eTime = clock();\
952         printf("%s time %d, avg %.4lf ms.\n", #name, eTime - sTime, (eTime - sTime) * 1.0 / CYCLE_NUM / TEST_NUM);\
953     } while(0)
954 
955 #define CYCLE_NUM 1000
956 #define TEST_NUM 100
957 
958 void TESTCASES()
959 {
960     FuncTest(testAdd_10_10);
961     FuncTest(testAdd_10_5);
962     FuncTest(testSub_10_10);
963     FuncTest(testSub_10_5);
964     FuncTest(testMul_10_10);
965     FuncTest(testMul_10_5);
966     FuncTest(testDiv_10_10);
967     FuncTest(testDiv_10_5);
968     FuncTest(testDiv_10_2);
969 }
970 
971 #endif
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

 