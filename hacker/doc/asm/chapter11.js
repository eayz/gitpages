function fwLoadMenus() {
  if (window.fw_menu_0) return;
  
  window.fw_menu_0_1 = new Menu("11.1 协处理器的数据格式",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0_1.addMenuItem("1 有符号整数","location='11-1.htm'");
  fw_menu_0_1.addMenuItem("2 BCD码数据","location='11-1.htm#BCD码数据'");
  fw_menu_0_1.addMenuItem("3 浮点数","location='11-1-2.htm'");
  fw_menu_0_1.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0_1.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0_1.hideOnMouseOut=true;
  
  window.fw_menu_0_2 = new Menu("11.3 协处理器的指令系统",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0_2.addMenuItem("1 操作符的命名规则","location='11-3.htm'");
  fw_menu_0_2.addMenuItem("2 数据传送指令","location='11-3-2.htm'");
  fw_menu_0_2.addMenuItem("3 数学运算指令","location='11-3-3.htm'");
  fw_menu_0_2.addMenuItem("4 比较运算指令","location='11-3-4.htm'");
  fw_menu_0_2.addMenuItem("5 超越函数运算指令","location='11-3-4.htm#超越函数运算指令'");
  fw_menu_0_2.addMenuItem("6 常数操作指令","location='11-3-7.htm'");
  fw_menu_0_2.addMenuItem("7 协处理器控制指令","location='11-3-7.htm#控制指令'");
  fw_menu_0_2.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0_2.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0_2.hideOnMouseOut=true;

  window.fw_menu_0 = new Menu("root",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0.addMenuItem("本章的学习内容和要求","window.open('chapter11.htm?1', '_blank');");
  fw_menu_0.addMenuItem(fw_menu_0_1,"location='11-1.htm'");
  fw_menu_0.addMenuItem("11.2 协处理器的结构","location='11-2.htm'");
  fw_menu_0.addMenuItem(fw_menu_0_2,"location='11-3.htm'");
  fw_menu_0.addMenuItem("11.4 协处理器的编程举例","location='11-4.htm'");
  fw_menu_0.addMenuItem("11.5 习题","location='11-Exercise.htm'");
  fw_menu_0.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0.hideOnMouseOut=true;
  fw_menu_0.childMenuIcon="TextBookIMG\\arrows.gif";

  fw_menu_0.writeMenus();
} // fwLoadMenus()
