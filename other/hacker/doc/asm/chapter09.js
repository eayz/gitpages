function fwLoadMenus() {
  if (window.fw_menu_0) return;

  window.fw_menu_0_1 = new Menu("9.1 ��Ķ��������",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0_1.addMenuItem("1 ��Ķ���","location='09-1.htm'");
  fw_menu_0_1.addMenuItem("2 �������","location='09-1-2.htm'");
  fw_menu_0_1.addMenuItem("3 ��Ĳ������ݷ�ʽ","location='09-1-2.htm#PARA'");
  fw_menu_0_1.addMenuItem("4 ���Ƕ�׶���","location='09-1-4.htm'");
  fw_menu_0_1.addMenuItem("5 �����ӳ��������","location='09-1-5.htm'");
  fw_menu_0_1.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0_1.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0_1.hideOnMouseOut=true;

  window.fw_menu_0_2 = new Menu("9.2 ����������������",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0_2.addMenuItem("1 ���������","location='09-2-1.htm'");
  fw_menu_0_2.addMenuItem("2 �ַ������崫�������","location='09-2-1.htm#STRING'");
  fw_menu_0_2.addMenuItem("3 �ַ�ת�������","location='09-2-3.htm'");
  fw_menu_0_2.addMenuItem("4 ������ʽ�����","location='09-2-3.htm#calc'");
  fw_menu_0_2.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0_2.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0_2.hideOnMouseOut=true;

  window.fw_menu_0_3 = new Menu("9.3 ����йص�αָ��",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0_3.addMenuItem("1 �ֲ����αָ��","location='09-3.htm'");
  fw_menu_0_3.addMenuItem("2 ȡ���궨��αָ��","location='09-3-3.htm'");
  fw_menu_0_3.addMenuItem("3 ��ֹ����չαָ��","location='09-3-3.htm#exitm'");
  fw_menu_0_3.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0_3.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0_3.hideOnMouseOut=true;

  window.fw_menu_0_4 = new Menu("9.4 �ظ����αָ��",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0_4.addMenuItem("1 αָ��REPT","location='09-4.htm'");
  fw_menu_0_4.addMenuItem("2 αָ��IRP","location='09-4-2.htm'");
  fw_menu_0_4.addMenuItem("3 αָ��IRPC","location='09-4-2.htm#IRPC'");
  fw_menu_0_4.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0_4.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0_4.hideOnMouseOut=true;

  window.fw_menu_0_5 = new Menu("9.5 �������αָ��",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0_5.addMenuItem("1 �������αָ��Ĺ���","location='09-5.htm'");
  fw_menu_0_5.addMenuItem("2 �������αָ��ľ���","location='09-5.htm#Example'");
  fw_menu_0_5.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0_5.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0_5.hideOnMouseOut=true;

  window.fw_menu_0_6 = new Menu("9.6 �������",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0_6.addMenuItem("1 �궨����ʽ","location='09-6.htm#FORM'");
  fw_menu_0_6.addMenuItem("2 �ظ�αָ��REPEAT","location='09-6.htm#REPEAT'");
  fw_menu_0_6.addMenuItem("3 ѭ��αָ��WHILE","location='09-6.htm#WHILE'");
  fw_menu_0_6.addMenuItem("4 ѭ��αָ��FOR","location='09-6-4.htm'");
  fw_menu_0_6.addMenuItem("5 ѭ��αָ��FORC","location='09-6-4.htm#FORC'");
  fw_menu_0_6.addMenuItem("6 ת��αָ��GOTO","location='09-6-6.htm'");
  fw_menu_0_6.addMenuItem("7 ������ľ���","location='09-6-6.htm#Example'");
  fw_menu_0_6.addMenuItem("8 ϵͳ����ĺ�","location='09-6-8.htm'");
  fw_menu_0_6.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0_6.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0_6.hideOnMouseOut=true;

  window.fw_menu_0 = new Menu("root",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0.addMenuItem("���µ�ѧϰ���ݺ�Ҫ��","window.open('chapter09.htm?1', '_blank');");
  fw_menu_0.addMenuItem(fw_menu_0_1,"location='09-1.htm'");
  fw_menu_0.addMenuItem(fw_menu_0_2,"location='09-2-1.htm'");
  fw_menu_0.addMenuItem(fw_menu_0_3,"location='09-3.htm'");
  fw_menu_0.addMenuItem(fw_menu_0_4,"location='09-4.htm'");
  fw_menu_0.addMenuItem(fw_menu_0_5,"location='09-5.htm'");
  fw_menu_0.addMenuItem(fw_menu_0_6,"location='09-6.htm'");
  fw_menu_0.addMenuItem("9.7 ϰ��","location='09-Exercise.htm'");
  fw_menu_0.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0.hideOnMouseOut=true;
  fw_menu_0.childMenuIcon="TextBookIMG\\arrows.gif";

  fw_menu_0.writeMenus();
} // fwLoadMenus()