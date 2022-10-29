function fwLoadMenus() {
  if (window.fw_menu_0) return;

  window.fw_menu_0_1 = new Menu("1.1 汇编语言的由来及其特点",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0_1.addMenuItem("1 机器语言","location='01-1.htm'");
  fw_menu_0_1.addMenuItem("2 汇编语言","location='01-1.htm#汇编语言'");
  fw_menu_0_1.addMenuItem("3 汇编程序","location='01-1.htm#汇编程序'");
  fw_menu_0_1.addMenuItem("4 汇编语言的主要特点","location='01-1-1.htm'");
  fw_menu_0_1.addMenuItem("5 汇编语言的使用领域","location='01-1-2.htm'");
  fw_menu_0_1.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0_1.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0_1.hideOnMouseOut=true;

  window.fw_menu_0_2 = new Menu("1.2 数据的表示和类型",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0_2.addMenuItem("1 数值数据的表示","location='01-2.htm'");
  fw_menu_0_2.addMenuItem("2 非数值数据的表示","location='01-2-2.htm'");
  fw_menu_0_2.addMenuItem("3 基本的数据类型","location='01-2-3.htm'");
  fw_menu_0_2.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0_2.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0_2.hideOnMouseOut=true;

  window.fw_menu_0 = new Menu("root",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0.addMenuItem("本章的学习内容和要求","window.open('chapter01.htm?1', '_blank');");
  fw_menu_0.addMenuItem(fw_menu_0_1,"location='01-1.htm'");
  fw_menu_0.addMenuItem(fw_menu_0_2,"location='01-2.htm'");
  fw_menu_0.addMenuItem("1.3 习题","location='01-Exercise.htm'");
  fw_menu_0.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0.hideOnMouseOut=true;
  fw_menu_0.childMenuIcon="TextBookIMG\\arrows.gif";

  fw_menu_0.writeMenus();
} // fwLoadMenus()
