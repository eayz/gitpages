function fwLoadMenus() {
  if (window.fw_menu_0) return;

  window.fw_menu_0_1 = new Menu("10.8 程序段前缀及其应用",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0_1.addMenuItem("1 程序段前缀的字段含义","location='10-8.htm'");
  fw_menu_0_1.addMenuItem("2 程序段前缀的应用","location='10-8-2.htm'");
  fw_menu_0_1.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0_1.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0_1.hideOnMouseOut=true;

  window.fw_menu_0 = new Menu("root",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0.addMenuItem("本章的学习内容和要求","window.open('chapter10.htm?1', '_blank');");
  fw_menu_0.addMenuItem("10.1 字符串的处理程序","location='10-1.htm'");
  fw_menu_0.addMenuItem("10.2 数据的分类统计程序","location='10-2.htm'");
  fw_menu_0.addMenuItem("10.3 数据转换程序","location='10-3.htm'");
  fw_menu_0.addMenuItem("10.4 文件操作程序","location='10-4.htm'");
  fw_menu_0.addMenuItem("10.5 动态数据的编程","location='10-5.htm'");
  fw_menu_0.addMenuItem("10.6 COM文件的编程","location='10-6.htm'");
  fw_menu_0.addMenuItem("10.7 驻留程序","location='10-7.htm'");
  fw_menu_0.addMenuItem(fw_menu_0_1,"location='10-8.htm'");
  fw_menu_0.addMenuItem("10.9 习题","location='10-Exercise.htm'");
  fw_menu_0.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0.hideOnMouseOut=true;
  fw_menu_0.childMenuIcon="TextBookIMG\\arrows.gif";

  fw_menu_0.writeMenus();
} // fwLoadMenus()
