function fwLoadMenus() {
  if (window.fw_menu_0) return;

  window.fw_menu_0_1 = new Menu("4.2 简单内存变量的定义",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0_1.addMenuItem("1 内存变量定义的一般形式","location='04-1.htm#简单变量的定义'");
  fw_menu_0_1.addMenuItem("2 字节变量","location='04-2-2.htm'");
  fw_menu_0_1.addMenuItem("3 字变量","location='04-2-3.htm'");
  fw_menu_0_1.addMenuItem("4 双字变量","location='04-2-3.htm#DD'");
  fw_menu_0_1.addMenuItem("5 六字节变量","location='04-2-4.htm'");
  fw_menu_0_1.addMenuItem("6 八字节变量","location='04-2-4.htm#DQ'");
  fw_menu_0_1.addMenuItem("7 十字节变量","location='04-2-4.htm#DT'");
  fw_menu_0_1.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0_1.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0_1.hideOnMouseOut=true;

  window.fw_menu_0_2 = new Menu("4.3 调整偏移量伪指令",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0_2.addMenuItem("1 偶对齐伪指令EVEN","location='04-3.htm'");
  fw_menu_0_2.addMenuItem("2 对齐伪指令ALIGN","location='04-3.htm#ALIGN'");
  fw_menu_0_2.addMenuItem("3 调整偏移量伪指令ORG","location='04-3-3.htm'");
  fw_menu_0_2.addMenuItem("4 偏移量计数器的值","location='04-3-3.htm#偏移量计数器的值'");
  fw_menu_0_2.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0_2.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0_2.hideOnMouseOut=true;

  window.fw_menu_0_3 = new Menu("4.4 复合内存变量的定义",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0_3.addMenuItem("1 重复说明符DUP","location='04-4.htm'");
  fw_menu_0_3.addMenuItem("2 结构类型的定义","location='04-4-2.htm'");
  fw_menu_0_3.addMenuItem("3 联合类型的定义","location='04-4-3.htm'");
  fw_menu_0_3.addMenuItem("4 记录类型的定义","location='04-4-4.htm'");
  fw_menu_0_3.addMenuItem("5 数据类型的自定义","location='04-4-5.htm'");
  fw_menu_0_3.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0_3.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0_3.hideOnMouseOut=true;

  window.fw_menu_0_4 = new Menu("4.6 内存变量和标号的属性",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0_4.addMenuItem("1 段属性操作符","location='04-56.htm#SEG'");
  fw_menu_0_4.addMenuItem("2 偏移量属性操作符","location='04-56.htm#OFFSET'");
  fw_menu_0_4.addMenuItem("3 类型属性操作符","location='04-6-3.htm'");
  fw_menu_0_4.addMenuItem("4 长度属性操作符","location='04-6-3.htm#length'");
  fw_menu_0_4.addMenuItem("5 容量属性操作符","location='04-6-3.htm#size'");
  fw_menu_0_4.addMenuItem("6 强制属性操作符","location='04-6-6.htm'");
  fw_menu_0_4.addMenuItem("7 存储单元别名操作符","location='04-6-7.htm'");
  fw_menu_0_4.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0_4.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0_4.hideOnMouseOut=true;

  window.fw_menu_0_5 = new Menu("4.7 表达式",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0_5.addMenuItem("1 进制伪指令RADIX","location='04-7.htm'");
  fw_menu_0_5.addMenuItem("2 数值表达式","location='04-7-1.htm'");
  fw_menu_0_5.addMenuItem("3 地址表达式","location='04-7-2.htm'");
  fw_menu_0_5.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0_5.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0_5.hideOnMouseOut=true;

  window.fw_menu_0_6 = new Menu("4.8 符号定义语句",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0_6.addMenuItem("1 等价语句","location='04-8.htm'");
  fw_menu_0_6.addMenuItem("2 等号语句","location='04-8-1.htm'");
  fw_menu_0_6.addMenuItem("3 符号名定义语句","location='04-8-1.htm#LABEL'");
  fw_menu_0_6.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0_6.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0_6.hideOnMouseOut=true;

  window.fw_menu_0 = new Menu("root",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0.addMenuItem("本章的学习内容和要求","window.open('chapter04.htm?1', '_blank');");
  fw_menu_0.addMenuItem("4.1 标识符","location='04-1.htm'");
  fw_menu_0.addMenuItem(fw_menu_0_1,"location='04-1.htm#简单变量的定义'");
  fw_menu_0.addMenuItem(fw_menu_0_2,"location='04-3.htm'");
  fw_menu_0.addMenuItem(fw_menu_0_3,"location='04-4.htm'");
  fw_menu_0.addMenuItem("4.5 标号","location='04-56.htm'");
  fw_menu_0.addMenuItem(fw_menu_0_4,"location='04-56.htm#变量和标号的属性'");
  fw_menu_0.addMenuItem(fw_menu_0_5,"location='04-7.htm'");
  fw_menu_0.addMenuItem(fw_menu_0_6,"location='04-8.htm'");
  fw_menu_0.addMenuItem("4.9 习题","location='04-Exercise.htm'");
  fw_menu_0.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0.hideOnMouseOut=true;
  fw_menu_0.childMenuIcon="TextBookIMG\\arrows.gif";

  fw_menu_0.writeMenus();
} // fwLoadMenus()

