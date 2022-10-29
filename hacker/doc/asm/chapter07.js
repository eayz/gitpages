function fwLoadMenus() {
  if (window.fw_menu_0) return;

  window.fw_menu_0_1 = new Menu("7.2 子程序的调用和返回指令",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0_1.addMenuItem("1 调用指令","location='07-2.htm'");
  fw_menu_0_1.addMenuItem("2 返回指令","location='07-2-2.htm'");
  fw_menu_0_1.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0_1.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0_1.hideOnMouseOut=true;

  window.fw_menu_0_2 = new Menu("7.3 子程序的参数传递",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0_2.addMenuItem("1 寄存器传递参数","location='07-3.htm'");
  fw_menu_0_2.addMenuItem("2 约定存储单元传递参数","location='07-3-2.htm'");
  fw_menu_0_2.addMenuItem("3 堆栈传递参数","location='07-3-3.htm'");
  fw_menu_0_2.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0_2.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0_2.hideOnMouseOut=true;

  window.fw_menu_0_3 = new Menu("7.5 子程序的完全定义",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0_3.addMenuItem("1 子程序完全定义格式","location='07-5-01.htm'");
  fw_menu_0_3.addMenuItem("2 子程序的位距","location='07-5-02.htm'");
  fw_menu_0_3.addMenuItem("3 子程序的语言类型","location='07-5-02.htm#Language'");
  fw_menu_0_3.addMenuItem("4 子程序的可见性","location='07-5-04.htm'");
  fw_menu_0_3.addMenuItem("5 子程序的起始和结束操作","location='07-5-04.htm#起始和结束操作'");
  fw_menu_0_3.addMenuItem("6 寄存器的保护和恢复","location='07-5-06.htm'");
  fw_menu_0_3.addMenuItem("7 子程序的参数传递","location='07-5-07.htm'");
  fw_menu_0_3.addMenuItem("8 子程序的原型说明","location='07-5-07.htm#proto'");
  fw_menu_0_3.addMenuItem("9 子程序的调用伪指令","location='07-5-09.htm'");
  fw_menu_0_3.addMenuItem("10 局部变量的定义","location='07-5-10.htm'");
  fw_menu_0_3.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0_3.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0_3.hideOnMouseOut=true;

  window.fw_menu_0_4 = new Menu("7.6 子程序库",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0_4.addMenuItem("1 建立库文件命令","location='07-6.htm'");
  fw_menu_0_4.addMenuItem("2 建立库文件举例","location='07-6.htm#example'");
  fw_menu_0_4.addMenuItem("3 库文件的应用","location='07-6-3.htm'");
  fw_menu_0_4.addMenuItem("4 库文件的好处","location='07-6-4.htm'");
  fw_menu_0_4.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0_4.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0_4.hideOnMouseOut=true;

  window.fw_menu_0 = new Menu("root",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0.addMenuItem("本章的学习内容和要求","window.open('chapter07.htm?1', '_blank');");
  fw_menu_0.addMenuItem("7.1 子程序的定义","location='07-1.htm'");
  fw_menu_0.addMenuItem(fw_menu_0_1,"location='07-2.htm'");
  fw_menu_0.addMenuItem(fw_menu_0_2,"location='07-3.htm'");
  fw_menu_0.addMenuItem("7.4 寄存器的保护与恢复","location='07-4.htm'");
  fw_menu_0.addMenuItem(fw_menu_0_3,"location='07-5-01.htm'");
  fw_menu_0.addMenuItem(fw_menu_0_4,"location='07-6.htm'");
  fw_menu_0.addMenuItem("7.7 习题","location='07-Exercise.htm'");
  fw_menu_0.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0.hideOnMouseOut=true;
  fw_menu_0.childMenuIcon="TextBookIMG\\arrows.gif";

  fw_menu_0.writeMenus();
} // fwLoadMenus()
