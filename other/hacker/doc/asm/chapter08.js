function fwLoadMenus() {
  if (window.fw_menu_0) return;

  window.fw_menu_0_1 = new Menu("8.1 ��������Ļ�������",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0_1.addMenuItem("1 I/O�˿ڵ�ַ","location='08-1.htm#I/O��ַ'");
  fw_menu_0_1.addMenuItem("2 I/Oָ��","location='08-1-1.htm'");
  fw_menu_0_1.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0_1.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0_1.hideOnMouseOut=true;

  window.fw_menu_0_2 = new Menu("8.2 �ж�",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0_2.addMenuItem("1 �жϵĻ�������","location='08-2.htm'");
  fw_menu_0_2.addMenuItem("2 �����жϵ�ָ��","location='08-2-2.htm'");
  fw_menu_0_2.addMenuItem("3 �жϷ���ָ��","location='08-2-3.htm'");
  fw_menu_0_2.addMenuItem("4 �жϺ��ӳ���ıȽ�","location='08-2-3.htm#�жϺ��ӳ���'");
  fw_menu_0_2.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0_2.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0_2.hideOnMouseOut=true;

  window.fw_menu_0_3 = new Menu("8.3 �жϹ��ܵķ���",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0_3.addMenuItem("1 ����������жϹ���","location='08-3-1.htm'");
  fw_menu_0_3.addMenuItem("2 ��Ļ��ʾ���жϹ���","location='08-3-2.htm'");
  fw_menu_0_3.addMenuItem("3 ��ӡ������жϹ���","location='08-3-3.htm'");
  fw_menu_0_3.addMenuItem("4 ����ͨ�ſڵ��жϹ���","location='08-3-4.htm'");
  fw_menu_0_3.addMenuItem("5 �����жϹ���","location='08-3-5.htm'");
  fw_menu_0_3.addMenuItem("6 Ŀ¼���ļ����жϹ���","location='08-3-6.htm'");
  fw_menu_0_3.addMenuItem("7 �ڴ������жϹ���","location='08-3-7.htm'");
  fw_menu_0_3.addMenuItem("8 ��ȡ�������ж�����","location='08-3-7.htm#�ж�����'");
  fw_menu_0_3.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0_3.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0_3.hideOnMouseOut=true;

  window.fw_menu_0 = new Menu("root",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0.addMenuItem("���µ�ѧϰ���ݺ�Ҫ��","window.open('chapter08.htm?1', '_blank');");
  fw_menu_0.addMenuItem(fw_menu_0_1,"location='08-1.htm'");
  fw_menu_0.addMenuItem(fw_menu_0_2,"location='08-2.htm'");
  fw_menu_0.addMenuItem(fw_menu_0_3,"location='08-3.htm'");
  fw_menu_0.addMenuItem("8.4 ϰ��","location='08-Exercise.htm'");
  fw_menu_0.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0.hideOnMouseOut=true;
  fw_menu_0.childMenuIcon="TextBookIMG\\arrows.gif";

  fw_menu_0.writeMenus();
} // fwLoadMenus()
