function fwLoadMenus() {
  if (window.fw_menu_0) return;
  
  window.fw_menu_0 = new Menu("root",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0.addMenuItem("���µ�ѧϰ���ݺ�Ҫ��","window.open('chapter03.htm?1', '_blank');");
  fw_menu_0.addMenuItem("3.1 ����Ѱַ��ʽ","location='03-1.htm'");
  fw_menu_0.addMenuItem("3.2 �Ĵ���Ѱַ��ʽ","location='03-2.htm'");
  fw_menu_0.addMenuItem("3.3 ֱ��Ѱַ��ʽ","location='03-3.htm'");
  fw_menu_0.addMenuItem("3.4 �Ĵ������Ѱַ��ʽ","location='03-4.htm'");
  fw_menu_0.addMenuItem("3.5 �Ĵ������Ѱַ��ʽ","location='03-5.htm'");
  fw_menu_0.addMenuItem("3.6 ��ַ�ӱ�ַѰַ��ʽ","location='03-6.htm'");
  fw_menu_0.addMenuItem("3.7 ��Ի�ַ�ӱ�ַѰַ��ʽ","location='03-7.htm'");
  fw_menu_0.addMenuItem("3.8 32λ��ַ��Ѱַ��ʽ","location='03-8.htm'");
  fw_menu_0.addMenuItem("3.9 ������Ѱַ��ʽ��С��","location='03-8.htm#Ѱַ��ʽ��С��'");
  fw_menu_0.addMenuItem("3.10 ϰ��","location='03-Exercise.htm'");
  fw_menu_0.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0.hideOnMouseOut=true;

  fw_menu_0.writeMenus();
} // fwLoadMenus()

