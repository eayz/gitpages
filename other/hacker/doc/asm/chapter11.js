function fwLoadMenus() {
  if (window.fw_menu_0) return;
  
  window.fw_menu_0_1 = new Menu("11.1 Э�����������ݸ�ʽ",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0_1.addMenuItem("1 �з�������","location='11-1.htm'");
  fw_menu_0_1.addMenuItem("2 BCD������","location='11-1.htm#BCD������'");
  fw_menu_0_1.addMenuItem("3 ������","location='11-1-2.htm'");
  fw_menu_0_1.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0_1.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0_1.hideOnMouseOut=true;
  
  window.fw_menu_0_2 = new Menu("11.3 Э��������ָ��ϵͳ",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0_2.addMenuItem("1 ����������������","location='11-3.htm'");
  fw_menu_0_2.addMenuItem("2 ���ݴ���ָ��","location='11-3-2.htm'");
  fw_menu_0_2.addMenuItem("3 ��ѧ����ָ��","location='11-3-3.htm'");
  fw_menu_0_2.addMenuItem("4 �Ƚ�����ָ��","location='11-3-4.htm'");
  fw_menu_0_2.addMenuItem("5 ��Խ��������ָ��","location='11-3-4.htm#��Խ��������ָ��'");
  fw_menu_0_2.addMenuItem("6 ��������ָ��","location='11-3-7.htm'");
  fw_menu_0_2.addMenuItem("7 Э����������ָ��","location='11-3-7.htm#����ָ��'");
  fw_menu_0_2.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0_2.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0_2.hideOnMouseOut=true;

  window.fw_menu_0 = new Menu("root",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0.addMenuItem("���µ�ѧϰ���ݺ�Ҫ��","window.open('chapter11.htm?1', '_blank');");
  fw_menu_0.addMenuItem(fw_menu_0_1,"location='11-1.htm'");
  fw_menu_0.addMenuItem("11.2 Э�������Ľṹ","location='11-2.htm'");
  fw_menu_0.addMenuItem(fw_menu_0_2,"location='11-3.htm'");
  fw_menu_0.addMenuItem("11.4 Э�������ı�̾���","location='11-4.htm'");
  fw_menu_0.addMenuItem("11.5 ϰ��","location='11-Exercise.htm'");
  fw_menu_0.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0.hideOnMouseOut=true;
  fw_menu_0.childMenuIcon="TextBookIMG\\arrows.gif";

  fw_menu_0.writeMenus();
} // fwLoadMenus()
