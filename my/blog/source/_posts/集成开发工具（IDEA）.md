# IntelliJ IDEA （2019.3）

## 学习目标

1. IDEA的介绍、安装、设置
2. 讲解IDEA中多种项目的创建
3. 模板的使用
4. 断点调试
5. 数据库的关联
6. 插件的下载
7. 版本控制工具的配置
<!--more-->
## 一. IDEA 介绍

### 1. IDEA 主要功能介绍

IDEA 全称 IntelliJ IDEA，是java编程语言开发的集成环境。IntelliJ在业界被公认为最好的java开发工具，尤其在智能代码助手、代码自动提示、重构、JavaEE支持、各类版本工具([git](https://baike.baidu.com/item/git/12647237)、[svn](https://baike.baidu.com/item/svn/3311103)等)、JUnit、CVS整合、代码分析、 创新的GUI设计等方面的功能可以说是超常的。

### 2. IDEA的优势（与Eclipse对比）

一线互联网公司普遍使用IDEA

① 强大的整合能力。比如：Git、Maven、Spring 等

② 提示功能的快速、便捷

③ 提示功能的范围广

④ 好用的快捷键和代码模板 

⑤ 精准搜索

## 二. IDEA安装（Windows）

[IDEA官网](	https://www.jetbrains.com/idea/)

IDEA 分为两个版本：旗舰版(Ultimate)和社区版(Community)。

旗舰版收费(限 30 天免费试用)，社区版免费

![image-20210228133744321](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210228133801.jpg)

### 1. 安装前准备

**硬件要求**

![image-20210228140023796](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210228140028.jpg)

个人建议配置：内存 8G 或以上，CPU 最好 i5 以上，最好安装块固态硬盘(SSD)，将 IDEA安装在固态硬盘上，这样流畅度会加快很多。

### 2. 具体安装过程

自行安装 

链接：https://pan.baidu.com/s/16mpIZ5OKLFQvzbLy7xvbvA 
提取码：38ji 

### 3. 查看目录结构

#### 安装目录结构

![image-20210228141256201](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210228141256.jpg)

​	**bin目录**

![image-20210228142633680](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210228142633.jpg)

**默认配置文件**

![image-20210228142715873](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210228142715.jpg)

**调整配置文件**

1. 大家根据电脑系统的位数，选择 32 位的 VM 配置文件或者 64 位的 VM 配置文件

2. 32 位操作系统内存不会超过 4G，所以没有多大空间可以调整，建议不用调整了

3. 64 位操作系统中 8G 内存以下的机子或是静态页面开发者是无需修改的。

4. 64 位操作系统且内存大于 8G 的，如果你是开发大型项目、Java 项目或是 Android 项目， 建议进行修改，常修改的就是下面 3 个参数：

   | -Xms128m                       | 16 G 内存的机器可尝试设置为  -Xms512m                    | 设置初始的内存数，增加该值可以提高 Java 程序的启动速度。     |
   | ------------------------------ | -------------------------------------------------------- | ------------------------------------------------------------ |
   | -Xmx750m                       | 16 G 内存的机器可尝试设置为-Xmx1500m                     | 设置最大内存数，提高该值，可以减少内存 Garage 收集的频率，提高程序性能 |
   | -XX:ReservedCodeCacheSize=240m | 16G 内存的机器可尝试设置为-XX:ReservedCodeCacheSize=500m | -XX:ReservedCodeCacheSize=240m                               |
   


#### 设置目录结构

![image-20210228143331262](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210228143331.jpg)

**config 目录**

是 IntelliJ IDEA 个性化化配置目录

这个目录主要记录了：IDE 主要配置功能、自定义的代码模板、自定义的文件模板、自定义的快捷键、Project 的 tasks 记录等

**system 目录**

是 IntelliJ IDEA 系统文件目录

是 IntelliJ IDEA 与开发项目一个桥梁目录，里面主要有：缓存、索引、容器文件输出等

## 三. 简单使用

### 	1 创建java工程

![image-20210228144746934](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210228144747.jpg)



Create New Project:创建一个新的工程

Import Project:导入一个现有的工程

Open:打开一个已有工程。比如：可以打开 Eclipse 项目。

Get from Version Control:可以通过服务器上的项目地址打开Github上面项目或其他 Git 托管服务器上的项目

![image-20210228145148442](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210228145148.jpg)

选择指定目录下的 JDK 作为 Project SDK。

如果要创建 Web 工程，则需要勾选上面的 Web Application。如果不需要创建 Web工程的话，则不需要勾选。

这里先不勾选，只是创建简单的 Java 工程。

![image-20210228145254638](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210228145254.jpg)

这里不用勾选。选择 Next，进入下一个页面

![image-20210228145352513](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210228145352.jpg)

给创建的工程起一个名字，点击 finish。

![image-20210228145650447](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210228145650.jpg)

- 工程下的 src 类似于 Eclipse 下的 src 目录，用于存放代码。

- 工程下的.idea 和 HelloWord.iml 文件都是 IDEA 工程特有的。类似于 Eclipse 工程下的.settings、.classpath、.project 等。

### 2. 创建package 和class

![image-20210228150031380](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210228150031.jpg)

![image-20210228150134419](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210228150134.jpg)

不管是创建 class，还是 interface，还是 annotation，都是选择 new – java class,然后在下拉框中选择创建的结构的类型。

![image-20210228150203095](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210228150203.jpg)

![image-20210228150227124](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210228150227.jpg)

### 3. 运行程序

![image-20210228150352538](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210228150352.jpg)

### 	4. 模块（Module）

1. 在 Eclipse 中我们有 Workspace（工作空间）和 Project（工程）的概念，在 IDEA中只有 Project（工程）和 Module（模块）的概念。这里的对应关系为：
   
> IDEA 官网说明：
   > An Eclipse workspace is similar to a project in IntelliJ IDEA
   > An Eclipse project maps to a module in IntelliJ IDEA
   > 翻译：
   > Eclipse 中 workspace	相当于	IDEA 中的 Project
   > Eclipse 中 Project	相当于	IDEA 中的 Module

这个地方刚开始用的时候会很容易理不清它们之间的关系。

2. 从 Eclipse 转过来的人总是下意识地要在同一个窗口管理 n 个项目，这在IntelliJ IDEA 是无法做到的。IntelliJ IDEA 提供的解决方案是打开多个项目实例， 即打开多个项目窗口。即：一个 Project 打开一个 Window 窗口。

3. 在 IntelliJ IDEA 中 Project 是最顶级的级别，次级别是 Module。一个 Project可以有多个 Module。

![image-20210228205446995](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210228205447.jpg)

4.  相比较于多 Module 项目，小项目就无需搞得这么复杂。只有一个 Module 的结构 IntelliJ IDEA 也是支持的，并且 IntelliJ IDEA 创建项目的时候，默认就是单Module 的结构的

**创建模块**

![image-20210228150618277](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210228150618.jpg)

![image-20210228150701337](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210228150701.jpg)

**删除模块**

![image-20210228150813540](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210228150813.jpg)

​	![image-20210228150853069](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210228150853.jpg)

![image-20210228150929613](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210228150929.jpg)

### 5. 查看项目配置

![image-20210228151201851](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210228151201.jpg)

## 四. 常用配置

![image-20210228155709012](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210308111504.jpg)

### 1. Appearance & Behavior 外观和行为

#### 4.1.1 设置主题

![image-20210228155830412](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210308111517.jpg)

这里默认提供了三套主题：IntelliJ，Darcula，High contrast。

设置编辑区主题

![image-20210228160244215](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210308111521.jpg)

### 2. Editor 编辑器

#### 2.1 General

##### 2.1.1 设置鼠标滚轮修改字体大小(可忽略)

![image-20210228160512547](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210308111525.jpg)

勾选此设置后，增加 Ctrl + 鼠标滚轮 快捷键来控制代码字体大小显示。

##### 2.1.2 设置鼠标悬浮提示

![image-20210228160708354](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210308111528.jpg)

##### 2.1.3 设置自动导包功能

手动导包为 alt+enter

![image-20210228160825579](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210308111532.jpg)

Add unambiguous imports on the fly：自动导入不明确的结构

Optimize imports on the fly：自动帮我们优化导入的包

##### 2.1.4 设置显示行号和方法间的分隔符

![image-20210307232155891](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210307232156.jpg)

如上图红圈所示，可以勾选 Show line numbers：显示行数。

如上图红圈所示，可以勾选 Show method separators： 显示方法分隔线。这种线有助于我们区分开方法

##### 2.1.5 忽略大小写提示

![image-20210228161157356](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210308111539.jpg)

IntelliJ IDEA 的代码提示和补充功能有一个特性：区分大小写。如上图标注所示，默认就是 First letter 区分大小写的。

区分大小写的情况是这样的：比如我们在 Java 代码文件中输入 stringBuffer， IntelliJ IDEA 默认是不会帮我们提示或是代码补充的，但是如果我们输入

StringBuffer 就可以进行代码提示和补充。

如果想不区分大小写的话，取消勾选

#### 2.2 Font

##### 2.2.1 设置默认的字体、字体大小、字体行间距

![image-20210228161521202](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210308111542.jpg)

##### 2.2.2 修改当前主题的字体、字体大小、字体行间距

![image-20210228161628152](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210308111545.jpg)

##### 2.2.3修改代码中注释的字体颜色

![image-20210228161816129](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210308111548.jpg)

Doc Comment – Text：修改文档注释的字体颜色

Block comment：修改多行注释的字体颜色

Line comment：修改当行注释的字体颜色

#### 2.3 File and Code Templates

 修改类头的文档注释信息

![image-20210228210517573](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210228210517.jpg)

```java
#if (${PACKAGE_NAME} && ${PACKAGE_NAME} != "")package ${PACKAGE_NAME};#end
#parse("File Header.java")
/**
 * Description：
 * @author jiaoqianjin
 * Date: ${DATE} ${TIME}
 **/

public class ${NAME} {
}
```

#### 2.4 Editor – File Encodings

设置项目文件编码

![image-20210228162150865](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210308111556.jpg)

说明：Transparent native-to-ascii conversion 主要用于转换 ascii，一般都要勾选， 不然 Properties 文件中的注释显示的都不会是中文。

## 五. 模板

(Editor – Live Templates 和 Editor – General – Postfix Completion)

### 1. Live Templates(实时代码模板)功能介绍

它的原理就是配置一些常用代码字母缩写，在输入简写时可以出现你预定义的固定模式的代码，使得开发效率大大提高，同时也可以增加个性化。最简单的例子就是在 Java 中输入 sout 会出现 System.out.println();

### 2. 已有的常用模板
##### 2.1 Postfix Completion

![image-20210228162845922](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210308111600.jpg)

##### 2.2 Live Templates

![image-20210228162954970](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210308111603.jpg)

二者的区别：Live Templates 可以自定义，而 Postfix Completion 不可以

### 3. 自定义模板

##### 3.1 定义模板组

![image-20210228163534664](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\image-20210228163534664.jpg)

![image-20210228163653302](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210308111606.jpg)

##### 3.2  在选定的模板组中，创建新的模板

![image-20210228163721647](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210308111609.jpg)

创建一个通用方法注释模块

![image-20210228171531158](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210228171531.jpg)

```java
*
 *功能描述:
 * @params $params$
 * @return $return$
 * @author jiaoqianjin
 * @date $date$
*/
```

第五步 Edit variables

![image-20210228171614943](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210228171615.jpg)

可以看到生成模板的参数时，不是很好，是数组的，要做一下修改

![image-20210228211228738](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210228211228.jpg)

```java
*
 *功能描述:
params $params$
 * @return $return$
 * @author jiaoqianjin
 * @date $date$
*/
```

添加 $params$ 参数分割

```java
groovyScript("def result=''; def params=\"${_1}\".replaceAll('[\\\\[|\\\\]|\\\\s]', '').split(',').toList(); for(i = 0; i < params.size(); i++) {result+=' * @param ' + params[i] + ((i < params.size() - 1) ? '\\n':'')}; return result", methodParameters())
```

![image-20210228171316093](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210228171316.jpg)

![image-20210228211410951](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210228211411.jpg)

## 六. 关联数据库

### 1. 关联方式

![image-20210228201425124](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210228201425.jpg)

![image-20210228201647856](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210228201647.jpg)

表面上很多人认为配置 Database 就是为了有一个 GUI 管理数据库功能，但是这并不是 IntelliJ IDEA 的 Database 最重要特性。数据库的 GUI 工具有很多， IntelliJ IDEA 的 Database 也没有太明显的优势。IntelliJ IDEA 的 Database 最大特性就是对于 Java Web 项目来讲，常使用的 ORM 框架，如 Hibernate、Mybatis 有很好的支持，比如配置好了 Database 之后，IntelliJ IDEA 会自动识别 domain 对象与数据表的关系，也可以通过 Database 的数据表直接生成 domain 对象等等

### 2. 常用操作

![image-20210228201855625](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210228201855.jpg)

图标 1：同步当前的数据库连接。这个是最重要的操作。配置好连接以后或通过其他工具操作数据库以后，需要及时同步。

图标 2：配置当前的连接。

图标 3：断开当前的连接。

图标 4：显示相应数据库对象的数据

图标 5：编辑修改当前数据库对象

## 七. 版本控制

### 1.   提前安装好 Git 的客户端

[Windows系统Git安装教程](https://blog.csdn.net/huangqqdy/article/details/83032408?spm=1001.2014.3001.5502

### 2. 关联git

![image-20210228202305261](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210228202305.jpg)

### 3. 新建一个仓库

![image-20210302140032145](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210302140040.jpg)

### 4. 克隆项目到本地

![image-20210302140239087](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210302140239.jpg)

### 5. 在IDEA中打开该项目

可以发现已经加入到git版本控制

![image-20210302140518111](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210302140518.jpg)

### 6. 添加一个测试文件，并添加到git版本管理中

![image-20210302141104770](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210302141104.jpg)

### 7. 提交到本地仓库

![image-20210302141212308](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210302141212.jpg)

![image-20210302141416858](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210302141416.jpg)

### 8. 推送到远程仓库

**如果为协同开发，推送前要执行 git pull 先拉取远程最新代码**

![image-20210302141521125](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210302141521.jpg)

### 9. 查看远程仓库

![image-20210302141607801](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210302141607.jpg)

### **没有使用** **Git** **时本地历史记录的查看**

![image-20210228203012434](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210228203012.jpg)

![image-20210228203037044](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210228203037.jpg)

即使我们项目没有使用版本控制功能，IntelliJ IDEA 也给我们提供了本地文件历史记录

## 八. 断点调试

### 前言

大家在开发的过程肯定会遇到bug，那大家是怎么找出bug的呢，System.out.println()？呃，这种也是一种方式，但是如果我们想更便捷的开发，不得不了解Debug调试工具了。当你对各种可能出现的bug的数据进行输出时，会debug的童鞋已经拿到了运行期间所有的数据，并且能对数据进行操作，可以说不会Debug的程序猿不是一个合格的程序猿。

古人云：工欲善其事必先利其器，那下面就跟着小编来学习Debug吧。

### 1. 由来

> DEBUG是计算机排除故障的意思。马克2号（Harvard Mark II）编制程序的格蕾丝·霍珀（Grace Hopper）是一位美国海军准将及计算机科学家，同时也是世界最早的一批程序设计师之一。有一天，她在调试设备时出现故障，拆开继电器后，发现有只飞蛾被夹扁在触点中间，从而“卡”住了机器的运行。于是，霍珀诙谐地把程序故障统称为“臭虫（BUG）”，把排除程序故障叫DEBUG，那这个词也就这么来了.
>
> 那到了今天Debug究竟是什么意思呢？其实从本质上来说， **Debug是一种程序，一种调试工具，说白了就是供程序员检查修改问题的工具。**

### 2. 启动 debug 模式

#### 1. 启动debug模式，方便随时调试代码

###### ![image-20210119145007410](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210119145009.jpg)

#### 2. 设置debug窗口

勾选 Show debug wndow on beakpint 之后，运行到第一个断点会直接激活debug窗口

![image-20210119145624095](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210119145624.jpg)

### 3. 设置断点

在想要设置断点的所在行的左边行号栏点击左键

###### ![image-20210119145925723](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210119145925.jpg)

或者在想要设置断点的所在行使用快捷键 Ctrl + F8 设置/取消断点

### 4. 调试按钮&服务按钮

#### 1. 调试按钮

###### ![image-20210119150339452](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210119150339.jpg)

①**Show Execution Point (Alt + F10)：**如果你的光标在其它行或其它页面，点击这个按钮可跳转到当前代码执行的行；

② **Step Over (F8)：**步过，一行一行地往下走，执行行存在方法也不跳入；

③  **Step Into (F7)：**步入，如果当前行有方法，可以进入方法内部，一般用于进入自定义方法内，不会进入官方类库的方法。

④ **Force Step Into (Alt + Shift + F7)：**强制步入，能进入任何方法，查看底层源码的时候可以用这个进入官方类库的方法。

⑤ **Step Out (Shift + F8)：**步出，从步入的方法内退出到方法调用处，此时方法已执行完毕，只是还没有完成赋值。

⑥ **Drop Frame（无快捷键）：**回退断点，有时候当我们步入方法体之后，还想回退到方法体外，点这个按钮后，断点重新回到方法体之外。在继续还是可以再次进到方法内

⑦ **Run to Cursor (Alt + F9)：**运行到光标处，你可以将光标定位到你需要查看的那一行，然后使用这个功能，代码会运行至光标行，而不需要打断点。前提是在光标定位和执行行之间没有断点

⑧ **Evaluate Expression (Alt + F8)：**计算表达式，可以计算想要查看代码的值。

 这个表达式不仅可以是一般变量或参数，也可以是方法，当你的一行代码中调用了几个方法时，就可以通过这种方式查看查看某个方法的返回值。

![image-20210119162839769](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210119162839.jpg) 

#### 2. 服务按钮

###### ![image-20210119155509131](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210119155509.jpg)

① **Rerun ‘xxx’(Ctrl + F5)：** 重新运行程序，会关闭服务后重新启动程序

②

③ **Roggle auto-test：**切换自动化测试

④ **Resume Program (F9)：**遇到断点停下，没有断点则运行完整个流程；

⑤ **Pause Program**：暂停程序，启用Debug

⑥ **Stop 'xxx' (Ctrl + F2)：**连续按两下，关闭程序。

⑦ **View Breakpoints (Ctrl + Shift + F8)：**查看所有断点

⑧ **Mute Breakpoints：**哑的断点，选择这个后，所有断点变为灰色，失效。如果只想使某一个断点失效，可以在断点上右键取消Enabled，如图下图，则该行断点失效，断点失效后变为空心圆圈。

![image-20210119164435202](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210119164435.jpg) 

### 5. 变量查询

#### 1. 在需要查看的变量上，鼠标悬停 2s 左右

###### ![image-20210119161014112](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210119161014.jpg)

#### 2. Alter + 鼠标左键

点啥看啥，非常滴方便

###### ![image-20210119161301091](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210119161301.jpg)

#### 3. 在 Variables 中查看

Variables中显示已运行程序的所有变量

![image-20210119161538713](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210119161538.jpg) 

#### 4. 在 Watches 中查看

可以点击 加号，输入要查看的变量，也可以直接同 Variables 中拖入 Watches 中查看

点击 Variables 操作栏中的![img](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210119162231.jpg)图标，调出Watches栏

![image-20210119162402664](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210119162402.jpg) 

![image-20210119161950672](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210119161950.jpg) 

#### 5. 利用计算表达式查看

![image-20210119162632290](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210119162632.jpg) 

### 6. 变量修改

在调试代码的时候，实时的修改运行状态的代码变量的值

在 variables 中选中需要修改的字段，右键 Set Value (F2)

![image-20210119163506167](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210119163506.jpg) 

### 7. 断点条件设置

通过设置断点条件，在满足条件时，才停在断点处，否则直接运行

**场景举例：**如果我们遍历一个比较大的集合或者数组是，在循环体内部设置了一个断点，如果没有断点条件设置，我们就需要一个一个的查看变量的值，这样肯定不是我们想看到的。

这时候就可以用到断点条件设置，在断点上右键 在 **Conditions**下方的框中设置条件，设置之后，只有满足条件的情况下断点才会有效，否则直接跳过。

![image-20210119194645501](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210119194645.jpg) 

## 九. 其他配置

### 插件的使用

![image-20210228203807796](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210228203807.jpg)

推荐安装

![image-20210228203921900](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210228203922.jpg)



![image-20210228203932970](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210228203933.jpg)

