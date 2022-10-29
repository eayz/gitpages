function fwLoadMenus() {
  if (window.fw_menu_0) return;
  
  window.fw_menu_0 = new Menu("root",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0.addMenuItem("本章的学习内容和要求","window.open('chapter03.htm?1', '_blank');");
  fw_menu_0.addMenuItem("3.1 立即寻址方式","location='03-1.htm'");
  fw_menu_0.addMenuItem("3.2 寄存器寻址方式","location='03-2.htm'");
  fw_menu_0.addMenuItem("3.3 直接寻址方式","location='03-3.htm'");
  fw_menu_0.addMenuItem("3.4 寄存器间接寻址方式","location='03-4.htm'");
  fw_menu_0.addMenuItem("3.5 寄存器相对寻址方式","location='03-5.htm'");
  fw_menu_0.addMenuItem("3.6 基址加变址寻址方式","location='03-6.htm'");
  fw_menu_0.addMenuItem("3.7 相对基址加变址寻址方式","location='03-7.htm'");
  fw_menu_0.addMenuItem("3.8 32位地址的寻址方式","location='03-8.htm'");
  fw_menu_0.addMenuItem("3.9 操作数寻址方式的小结","location='03-8.htm#寻址方式的小结'");
  fw_menu_0.addMenuItem("3.10 习题","location='03-Exercise.htm'");
  fw_menu_0.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0.hideOnMouseOut=true;

  fw_menu_0.writeMenus();
} // fwLoadMenus()

