function fwLoadMenus() {
  if (window.fw_menu_0) return;

  window.fw_menu_0_1 = new Menu("7.2 �ӳ���ĵ��úͷ���ָ��",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0_1.addMenuItem("1 ����ָ��","location='07-2.htm'");
  fw_menu_0_1.addMenuItem("2 ����ָ��","location='07-2-2.htm'");
  fw_menu_0_1.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0_1.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0_1.hideOnMouseOut=true;

  window.fw_menu_0_2 = new Menu("7.3 �ӳ���Ĳ�������",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0_2.addMenuItem("1 �Ĵ������ݲ���","location='07-3.htm'");
  fw_menu_0_2.addMenuItem("2 Լ���洢��Ԫ���ݲ���","location='07-3-2.htm'");
  fw_menu_0_2.addMenuItem("3 ��ջ���ݲ���","location='07-3-3.htm'");
  fw_menu_0_2.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0_2.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0_2.hideOnMouseOut=true;

  window.fw_menu_0_3 = new Menu("7.5 �ӳ������ȫ����",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0_3.addMenuItem("1 �ӳ�����ȫ�����ʽ","location='07-5-01.htm'");
  fw_menu_0_3.addMenuItem("2 �ӳ����λ��","location='07-5-02.htm'");
  fw_menu_0_3.addMenuItem("3 �ӳ������������","location='07-5-02.htm#Language'");
  fw_menu_0_3.addMenuItem("4 �ӳ���Ŀɼ���","location='07-5-04.htm'");
  fw_menu_0_3.addMenuItem("5 �ӳ������ʼ�ͽ�������","location='07-5-04.htm#��ʼ�ͽ�������'");
  fw_menu_0_3.addMenuItem("6 �Ĵ����ı����ͻָ�","location='07-5-06.htm'");
  fw_menu_0_3.addMenuItem("7 �ӳ���Ĳ�������","location='07-5-07.htm'");
  fw_menu_0_3.addMenuItem("8 �ӳ����ԭ��˵��","location='07-5-07.htm#proto'");
  fw_menu_0_3.addMenuItem("9 �ӳ���ĵ���αָ��","location='07-5-09.htm'");
  fw_menu_0_3.addMenuItem("10 �ֲ������Ķ���","location='07-5-10.htm'");
  fw_menu_0_3.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0_3.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0_3.hideOnMouseOut=true;

  window.fw_menu_0_4 = new Menu("7.6 �ӳ����",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0_4.addMenuItem("1 �������ļ�����","location='07-6.htm'");
  fw_menu_0_4.addMenuItem("2 �������ļ�����","location='07-6.htm#example'");
  fw_menu_0_4.addMenuItem("3 ���ļ���Ӧ��","location='07-6-3.htm'");
  fw_menu_0_4.addMenuItem("4 ���ļ��ĺô�","location='07-6-4.htm'");
  fw_menu_0_4.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0_4.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0_4.hideOnMouseOut=true;

  window.fw_menu_0 = new Menu("root",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0.addMenuItem("���µ�ѧϰ���ݺ�Ҫ��","window.open('chapter07.htm?1', '_blank');");
  fw_menu_0.addMenuItem("7.1 �ӳ���Ķ���","location='07-1.htm'");
  fw_menu_0.addMenuItem(fw_menu_0_1,"location='07-2.htm'");
  fw_menu_0.addMenuItem(fw_menu_0_2,"location='07-3.htm'");
  fw_menu_0.addMenuItem("7.4 �Ĵ����ı�����ָ�","location='07-4.htm'");
  fw_menu_0.addMenuItem(fw_menu_0_3,"location='07-5-01.htm'");
  fw_menu_0.addMenuItem(fw_menu_0_4,"location='07-6.htm'");
  fw_menu_0.addMenuItem("7.7 ϰ��","location='07-Exercise.htm'");
  fw_menu_0.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0.hideOnMouseOut=true;
  fw_menu_0.childMenuIcon="TextBookIMG\\arrows.gif";

  fw_menu_0.writeMenus();
} // fwLoadMenus()
