function fwLoadMenus() {
  if (window.fw_menu_0) return;
  
  window.fw_menu_0 = new Menu("root",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0.addMenuItem("���µ�ѧϰ���ݺ�Ҫ��","window.open('chapter12.htm?1', '_blank');");
  fw_menu_0.addMenuItem("12.1 ������Ե�Ƕ��","location='12-1.htm'");
  fw_menu_0.addMenuItem("12.2 C���Գ���Ļ�����","location='12-2.htm'");
  fw_menu_0.addMenuItem("12.3 һ�����������","location='12-3.htm'");
  fw_menu_0.addMenuItem("12.4 ϰ��","location='12-Exercise.htm'");
  fw_menu_0.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0.hideOnMouseOut=true;

  fw_menu_0.writeMenus();
} // fwLoadMenus()
