function fwLoadMenus() {
  if (window.fw_menu_0) return;

  window.fw_menu_0_1 = new Menu("6.1 程序的基本组成",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0_1.addMenuItem("1 段的定义","location='06-1.htm'");
  fw_menu_0_1.addMenuItem("2 段寄存器的说明语句","location='06-1-2.htm'");
  fw_menu_0_1.addMenuItem("3 堆栈段的说明","location='06-1-3.htm'");
  fw_menu_0_1.addMenuItem("4 源程序的结构","location='06-1-4.htm'");
  fw_menu_0_1.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0_1.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0_1.hideOnMouseOut=true;

  window.fw_menu_0_2 = new Menu("6.2 程序的基本结构",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0_2.addMenuItem("1 顺序结构","location='06-2-1.htm'");
  fw_menu_0_2.addMenuItem("2 分支结构","location='06-2-2.htm'");
  fw_menu_0_2.addMenuItem("3 循环结构","location='06-2-3.htm'");
  fw_menu_0_2.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0_2.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0_2.hideOnMouseOut=true;

  window.fw_menu_0_3 = new Menu("6.3 段的基本属性",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0_3.addMenuItem("1 对齐类型","location='06-3-1.htm#ALIGN'");
  fw_menu_0_3.addMenuItem("2 组合类型(COMBINE)","location='06-3-1.htm#COMBINE'");
  fw_menu_0_3.addMenuItem("3 类别(CLASS)","location='06-3-2.htm'");
  fw_menu_0_3.addMenuItem("4 段组(GROUP)","location='06-3-2.htm#GROUP'");
  fw_menu_0_3.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0_3.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0_3.hideOnMouseOut=true;

  window.fw_menu_0_4 = new Menu("6.4 简化的段定义",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0_4.addMenuItem("1 存储模型说明伪指令","location='06-4.htm'");
  fw_menu_0_4.addMenuItem("2 简化段定义伪指令","location='06-4-2.htm'");
  fw_menu_0_4.addMenuItem("3 简化段段名的引用","location='06-4-3.htm'");
  fw_menu_0_4.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0_4.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0_4.hideOnMouseOut=true;

  window.fw_menu_0_5 = new Menu("6.5 源程序的辅助说明伪指令",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0_5.addMenuItem("1 模块名定义伪指令NAME","location='06-5.htm'");
  fw_menu_0_5.addMenuItem("2 页面定义伪指令PAGE","location='06-5.htm#PAGE'");
  fw_menu_0_5.addMenuItem("3 标题定义伪指令TITLE","location='06-5.htm#TITLE'");
  fw_menu_0_5.addMenuItem("4 子标题定义伪指令SUBTTL","location='06-5.htm#SUBTTL'");
  fw_menu_0_5.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0_5.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0_5.hideOnMouseOut=true;

  window.fw_menu_0 = new Menu("root",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0.addMenuItem("本章的学习内容和要求","window.open('chapter06.htm?1', '_blank');");
  fw_menu_0.addMenuItem(fw_menu_0_1,"location='06-1.htm'");
  fw_menu_0.addMenuItem(fw_menu_0_2,"location='06-2-1.htm'");
  fw_menu_0.addMenuItem(fw_menu_0_3,"location='06-3-1.htm'");
  fw_menu_0.addMenuItem(fw_menu_0_4,"location='06-4.htm'");
  fw_menu_0.addMenuItem(fw_menu_0_5,"location='06-5.htm'");
  fw_menu_0.addMenuItem("6.6 习题","location='06-Exercise.htm'");
  fw_menu_0.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0.hideOnMouseOut=true;
  fw_menu_0.childMenuIcon="TextBookIMG\\arrows.gif";

  fw_menu_0.writeMenus();
} // fwLoadMenus()
