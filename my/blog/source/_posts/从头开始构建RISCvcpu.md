# 项目详情

对于[菠萝ONE](https://hackaday.io/project/178826)

32位RISC-V自制CPU分立元件

[![菲利普·斯坎德拉](https://cdn.hackaday.io/images/resize/24x24/256061617607330998.jpg)菲利普·斯坎德拉](https://hackaday.io/Filip.szkandera) • 2021 年 4 月 5 日 15:48
<!--more-->
```

```

现在几乎每个电子设备都使用某种微控制器。问题是，这些芯片可能非常复杂，即使您可以非常便宜地购买它们（例如 Arduino），我仍然想更深入地研究它们并了解它们的内部工作原理。我很快意识到，我只有几个选择来做到这一点： 

1. 从数据表研究现有的微控制器
2. 制作某种模拟器（C / Python）
3. 从头开始构建我自己的 CPU 

你已经猜到我走了哪条路了。

**1.设计自己的CPU：**

我在 Youtube 上发现了 Ben Eater 自制的 CPU，我着迷了，几乎立即开始工作。我改进了他的设计并为自己构建了一个 8 位 CPU。不过这篇文章不是关于那个的。如果您愿意，可以在此[Twitter 帖子中](https://twitter.com/ten_filip/status/1340400266047332354?s=20)查看我的照片 。有一天我可能会写另一篇关于它的文章。 

在这一点上，我对一个真正基本的 CPU 有了很好的理解，但出于某种原因，这对我来说还不够。在那之后不久，我偶然发现了Robert Baruch的 [Youtube频道](https://www.youtube.com/watch?v=yLs_NRwu1Y4&list=PLEeZWGE3PwbansoxKjjMKHQqS_2cm8i60)，他开始使用32位RISC-V CPU进行工作，该CPU也仅使用了基本的逻辑组件。我对 RISC-V 做了一些研究，发现它是完全开源的，并且有据可查。

我就是我，我开始在一个名为 Logisim-Evolution 的程序中实现我自己的 RISC-V CPU。我再次设定了我的目标，在我的构建中不使用任何微控制器或 FPGA - 只使用基本的分立逻辑组件。那么，我到底要构建什么？我不需要为自己设定太高的目标，这样我就能在*相对*较短的时间内完成这个项目（2年够短吗？:-)）。编译器支持的最基本的 RISC-V CPU 必须包含扩展名“I”（整数），并且必须至少为 32 位。因此，现在我有了所需的所有信息，因此该开始构建了。哦，我有没有提到我还要安装一个 VGA 输出卡？（受 Ben Eater 启发的 VGA 卡； https://eater.net/vga）

经过 6 个月的 Logisim 摆弄，我有了一个有效的“模拟”。下一步是为所有模块创建原理图，设计所有 PCB 并从[JLCPCB](https://jlcpcb.com/)订购它们 。但是，由于这是我第一次订购 PCB，我不想搞砸一切 - 所以我将设计分成模块，一次选择几个，以免让自己不知所措。JLCPCB 对尺寸 < 100mm x 100mm 的 2 层 PCB 有折扣，我已经尽力适应这些尺寸以保持较低的成本（我已经设法适应了它！）。

所以，现在我有一个工作模拟，我的计划是一次使用几个模块，将它们转换成合适的原理图，制作一个电路板并订购它们。这不是最好的做事方式，否则对我来说就太过分了。（铺垫） 

我的 Logisim-Evolution 模拟的照片

[![img](https://cdn.hackaday.io/images/8406171617643156516.jpg)](https://cdn.hackaday.io/images/8406171617643156516.jpg)

两批后，只剩下几个模块，其中一个称为*立即生成器*。当我想办法将它从我的模拟转换成正确的原理图时，我意识到我犯了一个致命的错误，而且我完全不知道模拟是如何工作的。幸运的是，维修并不难，我能够轻松改装其中一块已经制造好的 PCB 以完全修复它。 

**2. 原型**

我知道这个项目会很大，我几乎肯定会犯一些错误（我们谈论的是 230 多个 IC），所以我决定从一个原型开始，在那里我可以访问所有信号并且可以轻松地调试整个事情 - 我（还）不是电气工程师，而且我只有 19 岁，所以这似乎是个好主意（而且确实如此）。 

收到PCB之后，我通过将Arduino连接到其输入并同时监视其输出并将其与预测进行比较，对它们中的每一个进行了测试。一旦我设置好了，一切都是自动的，并且要测试尽可能多的可能性，每个测试至少运行几个小时。 

当我准备好把它们放在一起时，我将我的模块隔开在一块木头上，并用 3D 打印的垫片固定它们。然后我上传了一个测试程序并开始测试。这就是乐趣的开始。  

我的原型照片：

[![img](https://cdn.hackaday.io/images/1829581617642970711.jpg)](https://cdn.hackaday.io/images/1829581617642970711.jpg)

*Arduino 仅用于调试目的（最终版本中不存在）*

毫不奇怪，即使我已经单独测试了每块 PCB，但它在第一次尝试时不起作用。花了很多功夫，直到我发现所有的小事情都错了。例如，有一个时间问题，很难找到。 

**3. 输入/输出**

我的 CPU 有两个 8 位输入和两个 8 位输出端口，您可以通过前面板上的 RJ50 连接器访问它们。您还可以注意到顶部模块上的 7 段显示器，它连接到一个可由程序访问的寄存器。为了连接 VGA 显示器，我构建了一个 VGA 卡，灵感来自 Ben Eater ( https://eater.net/vga )。VGA 输出分辨率为 200x150 像素，黑白（我尝试添加颜色，但我需要使用更大的 V-RAM，这非常昂贵）。 

在我订购那张 VGA 卡之前，我觉得有必要在此之前对其进行测试，以确保 - 所以我做到了！ 

此面板将显示存储在EEPROM（39SF010A）中的静态图像。我将在最终版本中使用双端口 SRAM。

| [![img](https://cdn.hackaday.io/images/1402111617724254757.jpg)](https://cdn.hackaday.io/images/1402111617724254757.jpg) | [![img](https://cdn.hackaday.io/images/8909091617724269540.jpg)](https://cdn.hackaday.io/images/8909091617724269540.jpg) |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
|                                                              |                                                              |

**
**

我还创建了一些用于演示的 I/O 模块（它们最后都有 RJ50 连接器）。  

| LED模组                                                      | 按钮模块                                                     | PS/2解码器                                                   |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| [![img](https://cdn.hackaday.io/images/6414381617726457094.jpg)](https://cdn.hackaday.io/images/6414381617726457094.jpg) | [![img](https://cdn.hackaday.io/images/6558191617726548175.jpg)](https://cdn.hackaday.io/images/6558191617726548175.jpg) | [![img](https://cdn.hackaday.io/images/4821751617726570009.jpg)](https://cdn.hackaday.io/images/4821751617726570009.jpg) |

*PS/2 解码器有一个商店购买的解码器 - 我没有时间开发自己的解码器*

**
**

**4. 最终版本**

让原型工作并不容易（就像 - 完全一样），但经过大约 5 个月的工作，我设法做到了。

然后我重新设计了我所有的 PCB 以修复我的错误并使它们可以堆叠成塔状结构，因此每个模块只能通过针头连接。与我已经完成的工作相比，这并不难。这次重新设计花了大约三个月的时间，然后我订购了我的最终 PCB。我设计了一个外壳并将其打印在 Prusa i3 3D 打印机上。

最终版本：（没有顶部）

[![img](https://cdn.hackaday.io/images/6936331617643325393.jpg)](https://cdn.hackaday.io/images/6936331617643325393.jpg)

最终版本：（带有顶部）

[![img](https://cdn.hackaday.io/images/274721617643361143.jpg)](https://cdn.hackaday.io/images/274721617643361143.jpg)

拆解最终版：

[![img](https://cdn.hackaday.io/images/4671701617869600710.jpeg)](https://cdn.hackaday.io/images/4671701617869600710.jpeg)

**框图：**

[![img](https://cdn.hackaday.io/images/6678211618846264646.jpg)](https://cdn.hackaday.io/images/6678211618846264646.jpg)

**5. 编程** 

终于，经过数百小时的设计、焊接和调试，我终于看到了隧道尽头的曙光。*Jan Vykydal*帮助我设置了一个正常工作的编译器，因此我可以用 C 编写我的程序（我也用汇编编写了一些函数）。 

```
// 两个数相加

int  main ( void ) {
     while ( 1 ){
         // 从端口 A 加载第一个操作数
        char操作数_A = SR->INPUT_A;

        // 从端口 B 加载第二个操作数
        char operand_B = SR->INPUT_B;

        // 将端口 A 和 B 的总和输出到端口 C
        SR->OUTPUT_C = 操作数_A + 操作数_B；
    }
} 
```

我创建了一个具有一些有用功能的库，例如：

```
// 打开屏幕上的特定像素
void  writePixel ( int x, int y) ;
// 关闭屏幕上的特定像素
void  clearPixel ( int x, int y) ;
// 在屏幕上写入 ASCII 字符
void  writeChar ( int x, int y, char arr[]) ;
// 清屏
void  VGA_clear () ;
// 打开/关闭 VGA 输出
void  VGA_power ( const  uint8_t state) ;
// 平方根
int32_t lib_math_sqrt( int32_t x);
//电源
int32_t lib_math_pow（int32_t base_i，int32_t exponent_i）; 
```

使用该库，我能够创建一个简单的 shell 程序，您可以通过连接到其中一个输入端口的 PS/2 键盘进行交互（我使用带有模块的 PS/2 键盘将输入信号解码为 8 位）。 

松壳：

[![img](https://cdn.hackaday.io/images/8486001617652029819.jpg)](https://cdn.hackaday.io/images/8486001617652029819.jpg)

目前支持的命令：

- 你好
- 你好
- PEEK <地址>
- 戳<地址> <数据>
- 系统信息
- 清除
- 跑蛇

是的，*RUN SNAKE*推出了一个非常简单的蛇游戏；)

**6. 详情**

该 CPU 不会打破任何速度记录，但是仅使用分立逻辑芯片您还能期待什么。它在 500 kHz 上运行相对稳定，上面的任何内容都会引入计算错误（无法弄清楚为什么 - 可能是寄生电容？即使在 500k 上，您有时也会看到小故障 :( - 仍然需要一些改进）。它有一个512kB 的程序存储器和 512kB 的 RAM - 这对于此类设备来说是可以的。 

**7. 演示 1**

<iframe src="https://www.youtube.com/embed/NUAVKNVrPh0" frameborder="0" allowfullscreen="" style="box-sizing: inherit; margin: 1em auto; padding: 0px; border: 0px; display: block; max-width: 100%; width: 500px; height: 281px;"></iframe>

*我在这个视频中使用了 VGA->HDMI 适配器，因此电视上的图像被裁剪*

**
**

**7. 结论**

我很高兴看到它终于运行起来，这并不容易，但我做到了。有很多事情可以改进，但我们会看到。 

# Build a RISC-V CPU From Scratch

## Use discrete logic chips to build a surprisingly capable CPU with the hottest new architecture

By Filip Szkandera

<iframe id="google_ads_iframe_/309482/f.site220.tmus/IEEE_0" title="3rd party ad content" name="google_ads_iframe_/309482/f.site220.tmus/IEEE_0" width="300" height="250" scrolling="no" marginwidth="0" marginheight="0" frameborder="0" sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-top-navigation-by-user-activation" allow="conversion-measurement 'src'" srcdoc="" data-google-container-id="1" data-load-complete="true" style="box-sizing: border-box; display: block; margin: auto; max-width: 100%; border: 0px; vertical-align: bottom;"></iframe>

Advertisement

Editor's Picks

[![Photo of a handheld ALU.](https://spectrum.ieee.org/image/MzA5MzkwMQ.jpeg)Explore the Guts of Computing With Arith-matic’s S1-AU Kit](https://spectrum.ieee.org/geek-life/hands-on/explore-the-guts-of-computing-with-arithmatics-s1au-kit)[![Illustration of old computer monitor, keyboard and joystick, with hand on keyboard.](https://spectrum.ieee.org/image/MzU5MjE5OA.jpeg)Build This 8-Bit Home Computer With Just 5 Chips](https://spectrum.ieee.org/geek-life/hands-on/build-this-8bit-home-computer-with-just-5-chips)[![Photo of Sam Zeloof](https://spectrum.ieee.org/image/Mjk5NjEzMA.jpeg)The High School Student Who’s Building His Own Integrated Circuits](https://spectrum.ieee.org/semiconductors/devices/the-high-school-student-whos-building-his-own-integrated-circuits)

##### **Suggested Wiley-IEEE Reading**

***\*[![img](https://ieeexplore.ieee.org/ebooks/8889859/8889859.jpg)\*\*Simulation and Computational Red Teaming for Problem Solving\*\*](https://www.wiley.com/en-us/Simulation+and+Computational+Red+Teaming+for+Problem+Solving-p-9781119527176?utm_source=ieee&utm_medium=partner&utm_campaign=spectrum)\****

![Illustration of Pineapple One ](https://spectrum.ieee.org/image/MzgyMTYzMQ.jpeg)

James ProvostThe Pineapple One is a complete computer with input/output, memory, and a homebrew 32-bit RISC-V CPU.

**It’s a certain** kind of itch that drives people to voluntarily build their own CPU. We start thinking about the papered-over gap in our understanding, the one that lurks between how logic gates and [flip-flops](https://en.wikipedia.org/wiki/Flip-flop_(electronics)) work individually and how machine code controls a fully assembled processor. What *exactly* happens in the magic zone where hardwired circuits start dancing to software’s ever-changing tune?

It turns out this itch afflicts enough people that there are [commercial kits for makers](https://gigatron.io/?page_id=86) who want to put a CPU together to see ([or hear](https://www.tindie.com/products/jhallen/single-board-relay-computer/)) it tick, and the Web is littered with home-brewed 4-bit and 8-bit CPUs with architectures that would be familiar to an engineer from the 1970s. I should know—I made one myself. But then I began to wonder: Could I build my own CPU featuring some of the *latest* technology? Could I design my own fully compliant 32-bit RISC-V central processing unit?

RISC-V is an open-source architecture that’s about 11 years old, and is now [starting to make inroads in a world dominated](https://spectrum.ieee.org/tech-talk/semiconductors/design/riscv-rises-among-chip-developers-worldwide) by the [*x*86](https://en.wikipedia.org/wiki/X86) and [ARM](https://en.wikipedia.org/wiki/ARM_architecture) CPU architectures. I was alerted to the possibilities of RISC-V by the work of [Robert Baruch](https://www.youtube.com/watch?v=YgXJf8c5PLo&list=PLEeZWGE3PwbZTypHq00G-yEX8TEI95lw4), who started a similar project about two years ago but hasn’t yet completed his processor, in part because he had to keep redesigning components he’d built early on to meet the needs of an evolving design.

![Illustraton of PCBs](https://spectrum.ieee.org/image/MzgyMTY5OQ.jpeg)

James ProvostThe modular nature of the RISC-V design let me build the Pineapple One as a stack of individually testable 10-by-10-centimeter PCBs with different functions [clockwise, from top left]: VGA driver; RAM; transport layer; shifter; ALU; register file; control unit; program counter; ROM.

Instead, I started out by building my complete design—which I dubbed [Pineapple One](https://hackaday.io/project/178826-pineapple-one)—in [Logisim Evolution](https://github.com/reds-heig/logisim-evolution), a logic-circuit simulator. After consulting the [official RISC-V ](https://riscv.org/wp-content/uploads/2017/05/riscv-spec-v2.2.pdf)manual and the first edition of David Patterson and John Hennessy’s book [*Computer Organization and Design, RISC-V Edition*](https://www.elsevier.com/books/computer-organization-and-design-risc-v-edition/patterson/978-0-12-812275-4) (Elsevier, 2017), and pushing Logisim to its outer limits, I had a working simulation of Pineapple One that met the requirements of a basic RISC-V CPU in six months.

In implementing the RISC-V architecture, I was amazed at how much more sense the architecture made compared to the conventional [complex instruction set](https://en.wikipedia.org/wiki/Complex_instruction_set_computer) I’d used in my earlier home-brew CPU. Redundancies had been eliminated, and the processor’s registers—the scratchpads that store the CPU’s working memory—were more flexible. Another big advantage was that RISC-V is a well-documented modular design, so I knew just what each block had to do. My goal was to design each block in my own way, but make sure it performed in compliance with the RISC-V standards. (This dictated that my CPU be 32-bit, as RISC-V instructions are at least that long by definition.)

Physically, the Pineapple One is distributed over a vertical stack of eight square printed circuit boards that are about 10 centimeters on a side, plus a card that handles a VGA display interface. It uses over 230 integrated circuits, mostly from the [74HCT series](https://en.wikipedia.org/wiki/7400-series_integrated_circuits) of logic chips. My biggest challenge was implementing a barrel shifter—a circuit that can shift around the bits in a register by a controllable amount. I first tried a fast implementation that would require over 80 components, but try as I might, I couldn’t get it to fit onto my PCBs. So instead I went with a low-component approach that essentially suspends the operation of the rest of the CPU until my shifter finishes cranking away. Due to the Pineapple One’s long traces, as compared to a single-chip CPU, I also struggled to manage [parasitic capacitance](https://en.wikipedia.org/wiki/Parasitic_capacitance) and impedance, which meant debugging some really strange behaviors.

[![img](https://spectrum.ieee.org/image/MzgyMTcwOQ.jpeg) ](https://spectrum.ieee.org/image/MzgyMTcwOQ.jpeg)

James ProvostWhile there are provisions for instructions that can range in length between 16 bits and a theoretically unlimited number, here are the fixed 32-bit formats of the four core types of RISC-V instructions. Some instructions combine an opcode with additional functional fields to define behavior, while others allow multiple source registers to be combined with so-called immediate data, with the results placed in the destination register.

I tested each individual board by using an Arduino microcontroller to simulate inputs from the rest of the computer, and to monitor outputs for correctness. I 3D-printed a nice case to hold the entire stack of PCBs and input/output connectors, so that it’s possible to hook up a keyboard and VGA display directly to the Pineapple One. There are four general-purpose I/O ports—two 8-bit inputs and two outputs.

My friend Jan Vykydal helped me set up a RISC-V-compliant compiler to work properly, so I wrote some system software and demo programs in C. The compiler produces machine code, and I use a Python script that takes the code and flashes it to the CPU’s memory. Even though Pineapple One runs at only 500 kilohertz, that’s still fast enough to play a simple computer game like [*Snake*](https://en.wikipedia.org/wiki/Snake_(video_game_genre)) in real time, and the 512 kilobytes of program memory and 512 kB of RAM are ample.

Ultimately, I would like to upgrade the processor a little bit so it can run more-complex programs. I’d also like to add more expansion boards, such as a sound card. You can find schematics and a bill of materials [on Hackaday,](https://hackaday.io/project/178826-pineapple-one) but ultimately it would be great to offer it as a kit to others interested in understanding contemporary CPU design.

*This article appears in the June 2021 print issue as “Build Your Own RISC-V CPU.”*