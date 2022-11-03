function fwLoadMenus() {
  if (window.fw_menu_0) return;

  window.fw_menu_0_1 = new Menu("8.1 输入输出的基本概念",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0_1.addMenuItem("1 I/O端口地址","location='08-1.htm#I/O地址'");
  fw_menu_0_1.addMenuItem("2 I/O指令","location='08-1-1.htm'");
  fw_menu_0_1.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0_1.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0_1.hideOnMouseOut=true;

  window.fw_menu_0_2 = new Menu("8.2 中断",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0_2.addMenuItem("1 中断的基本概念","location='08-2.htm'");
  fw_menu_0_2.addMenuItem("2 引起中断的指令","location='08-2-2.htm'");
  fw_menu_0_2.addMenuItem("3 中断返回指令","location='08-2-3.htm'");
  fw_menu_0_2.addMenuItem("4 中断和子程序的比较","location='08-2-3.htm#中断和子程序'");
  fw_menu_0_2.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0_2.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0_2.hideOnMouseOut=true;

  window.fw_menu_0_3 = new Menu("8.3 中断功能的分类",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0_3.addMenuItem("1 键盘输入的中断功能","location='08-3-1.htm'");
  fw_menu_0_3.addMenuItem("2 屏幕显示的中断功能","location='08-3-2.htm'");
  fw_menu_0_3.addMenuItem("3 打印输出的中断功能","location='08-3-3.htm'");
  fw_menu_0_3.addMenuItem("4 串行通信口的中断功能","location='08-3-4.htm'");
  fw_menu_0_3.addMenuItem("5 鼠标的中断功能","location='08-3-5.htm'");
  fw_menu_0_3.addMenuItem("6 目录和文件的中断功能","location='08-3-6.htm'");
  fw_menu_0_3.addMenuItem("7 内存管理的中断功能","location='08-3-7.htm'");
  fw_menu_0_3.addMenuItem("8 读取和设置中断向量","location='08-3-7.htm#中断向量'");
  fw_menu_0_3.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0_3.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0_3.hideOnMouseOut=true;

  window.fw_menu_0 = new Menu("root",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0.addMenuItem("本章的学习内容和要求","window.open('chapter08.htm?1', '_blank');");
  fw_menu_0.addMenuItem(fw_menu_0_1,"location='08-1.htm'");
  fw_menu_0.addMenuItem(fw_menu_0_2,"location='08-2.htm'");
  fw_menu_0.addMenuItem(fw_menu_0_3,"location='08-3.htm'");
  fw_menu_0.addMenuItem("8.4 习题","location='08-Exercise.htm'");
  fw_menu_0.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0.hideOnMouseOut=true;
  fw_menu_0.childMenuIcon="TextBookIMG\\arrows.gif";

  fw_menu_0.writeMenus();
} // fwLoadMenus()
