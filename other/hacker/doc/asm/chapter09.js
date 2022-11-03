function fwLoadMenus() {
  if (window.fw_menu_0) return;

  window.fw_menu_0_1 = new Menu("9.1 宏的定义和引用",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0_1.addMenuItem("1 宏的定义","location='09-1.htm'");
  fw_menu_0_1.addMenuItem("2 宏的引用","location='09-1-2.htm'");
  fw_menu_0_1.addMenuItem("3 宏的参数传递方式","location='09-1-2.htm#PARA'");
  fw_menu_0_1.addMenuItem("4 宏的嵌套定义","location='09-1-4.htm'");
  fw_menu_0_1.addMenuItem("5 宏与子程序的区别","location='09-1-5.htm'");
  fw_menu_0_1.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0_1.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0_1.hideOnMouseOut=true;

  window.fw_menu_0_2 = new Menu("9.2 宏参数的特殊运算符",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0_2.addMenuItem("1 连接运算符","location='09-2-1.htm'");
  fw_menu_0_2.addMenuItem("2 字符串整体传递运算符","location='09-2-1.htm#STRING'");
  fw_menu_0_2.addMenuItem("3 字符转义运算符","location='09-2-3.htm'");
  fw_menu_0_2.addMenuItem("4 计算表达式运算符","location='09-2-3.htm#calc'");
  fw_menu_0_2.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0_2.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0_2.hideOnMouseOut=true;

  window.fw_menu_0_3 = new Menu("9.3 与宏有关的伪指令",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0_3.addMenuItem("1 局部标号伪指令","location='09-3.htm'");
  fw_menu_0_3.addMenuItem("2 取消宏定义伪指令","location='09-3-3.htm'");
  fw_menu_0_3.addMenuItem("3 中止宏扩展伪指令","location='09-3-3.htm#exitm'");
  fw_menu_0_3.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0_3.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0_3.hideOnMouseOut=true;

  window.fw_menu_0_4 = new Menu("9.4 重复汇编伪指令",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0_4.addMenuItem("1 伪指令REPT","location='09-4.htm'");
  fw_menu_0_4.addMenuItem("2 伪指令IRP","location='09-4-2.htm'");
  fw_menu_0_4.addMenuItem("3 伪指令IRPC","location='09-4-2.htm#IRPC'");
  fw_menu_0_4.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0_4.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0_4.hideOnMouseOut=true;

  window.fw_menu_0_5 = new Menu("9.5 条件汇编伪指令",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0_5.addMenuItem("1 条件汇编伪指令的功能","location='09-5.htm'");
  fw_menu_0_5.addMenuItem("2 条件汇编伪指令的举例","location='09-5.htm#Example'");
  fw_menu_0_5.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0_5.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0_5.hideOnMouseOut=true;

  window.fw_menu_0_6 = new Menu("9.6 宏的扩充",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0_6.addMenuItem("1 宏定义形式","location='09-6.htm#FORM'");
  fw_menu_0_6.addMenuItem("2 重复伪指令REPEAT","location='09-6.htm#REPEAT'");
  fw_menu_0_6.addMenuItem("3 循环伪指令WHILE","location='09-6.htm#WHILE'");
  fw_menu_0_6.addMenuItem("4 循环伪指令FOR","location='09-6-4.htm'");
  fw_menu_0_6.addMenuItem("5 循环伪指令FORC","location='09-6-4.htm#FORC'");
  fw_menu_0_6.addMenuItem("6 转移伪指令GOTO","location='09-6-6.htm'");
  fw_menu_0_6.addMenuItem("7 宏扩充的举例","location='09-6-6.htm#Example'");
  fw_menu_0_6.addMenuItem("8 系统定义的宏","location='09-6-8.htm'");
  fw_menu_0_6.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0_6.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0_6.hideOnMouseOut=true;

  window.fw_menu_0 = new Menu("root",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0.addMenuItem("本章的学习内容和要求","window.open('chapter09.htm?1', '_blank');");
  fw_menu_0.addMenuItem(fw_menu_0_1,"location='09-1.htm'");
  fw_menu_0.addMenuItem(fw_menu_0_2,"location='09-2-1.htm'");
  fw_menu_0.addMenuItem(fw_menu_0_3,"location='09-3.htm'");
  fw_menu_0.addMenuItem(fw_menu_0_4,"location='09-4.htm'");
  fw_menu_0.addMenuItem(fw_menu_0_5,"location='09-5.htm'");
  fw_menu_0.addMenuItem(fw_menu_0_6,"location='09-6.htm'");
  fw_menu_0.addMenuItem("9.7 习题","location='09-Exercise.htm'");
  fw_menu_0.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0.hideOnMouseOut=true;
  fw_menu_0.childMenuIcon="TextBookIMG\\arrows.gif";

  fw_menu_0.writeMenus();
} // fwLoadMenus()