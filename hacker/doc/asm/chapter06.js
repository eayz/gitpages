function fwLoadMenus() {
  if (window.fw_menu_0) return;

  window.fw_menu_0_1 = new Menu("6.1 ����Ļ������",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0_1.addMenuItem("1 �εĶ���","location='06-1.htm'");
  fw_menu_0_1.addMenuItem("2 �μĴ�����˵�����","location='06-1-2.htm'");
  fw_menu_0_1.addMenuItem("3 ��ջ�ε�˵��","location='06-1-3.htm'");
  fw_menu_0_1.addMenuItem("4 Դ����Ľṹ","location='06-1-4.htm'");
  fw_menu_0_1.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0_1.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0_1.hideOnMouseOut=true;

  window.fw_menu_0_2 = new Menu("6.2 ����Ļ����ṹ",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0_2.addMenuItem("1 ˳��ṹ","location='06-2-1.htm'");
  fw_menu_0_2.addMenuItem("2 ��֧�ṹ","location='06-2-2.htm'");
  fw_menu_0_2.addMenuItem("3 ѭ���ṹ","location='06-2-3.htm'");
  fw_menu_0_2.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0_2.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0_2.hideOnMouseOut=true;

  window.fw_menu_0_3 = new Menu("6.3 �εĻ�������",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0_3.addMenuItem("1 ��������","location='06-3-1.htm#ALIGN'");
  fw_menu_0_3.addMenuItem("2 �������(COMBINE)","location='06-3-1.htm#COMBINE'");
  fw_menu_0_3.addMenuItem("3 ���(CLASS)","location='06-3-2.htm'");
  fw_menu_0_3.addMenuItem("4 ����(GROUP)","location='06-3-2.htm#GROUP'");
  fw_menu_0_3.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0_3.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0_3.hideOnMouseOut=true;

  window.fw_menu_0_4 = new Menu("6.4 �򻯵Ķζ���",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0_4.addMenuItem("1 �洢ģ��˵��αָ��","location='06-4.htm'");
  fw_menu_0_4.addMenuItem("2 �򻯶ζ���αָ��","location='06-4-2.htm'");
  fw_menu_0_4.addMenuItem("3 �򻯶ζ���������","location='06-4-3.htm'");
  fw_menu_0_4.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0_4.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0_4.hideOnMouseOut=true;

  window.fw_menu_0_5 = new Menu("6.5 Դ����ĸ���˵��αָ��",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0_5.addMenuItem("1 ģ��������αָ��NAME","location='06-5.htm'");
  fw_menu_0_5.addMenuItem("2 ҳ�涨��αָ��PAGE","location='06-5.htm#PAGE'");
  fw_menu_0_5.addMenuItem("3 ���ⶨ��αָ��TITLE","location='06-5.htm#TITLE'");
  fw_menu_0_5.addMenuItem("4 �ӱ��ⶨ��αָ��SUBTTL","location='06-5.htm#SUBTTL'");
  fw_menu_0_5.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0_5.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0_5.hideOnMouseOut=true;

  window.fw_menu_0 = new Menu("root",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0.addMenuItem("���µ�ѧϰ���ݺ�Ҫ��","window.open('chapter06.htm?1', '_blank');");
  fw_menu_0.addMenuItem(fw_menu_0_1,"location='06-1.htm'");
  fw_menu_0.addMenuItem(fw_menu_0_2,"location='06-2-1.htm'");
  fw_menu_0.addMenuItem(fw_menu_0_3,"location='06-3-1.htm'");
  fw_menu_0.addMenuItem(fw_menu_0_4,"location='06-4.htm'");
  fw_menu_0.addMenuItem(fw_menu_0_5,"location='06-5.htm'");
  fw_menu_0.addMenuItem("6.6 ϰ��","location='06-Exercise.htm'");
  fw_menu_0.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0.hideOnMouseOut=true;
  fw_menu_0.childMenuIcon="TextBookIMG\\arrows.gif";

  fw_menu_0.writeMenus();
} // fwLoadMenus()
