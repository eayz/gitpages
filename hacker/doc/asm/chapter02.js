function fwLoadMenus() {
  if (window.fw_menu_0) return;

  window.fw_menu_0_1 = new Menu("2.1 �Ĵ�����",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0_1.addMenuItem("1 �Ĵ�����","location='02-1.htm#REGISTERS'");
  fw_menu_0_1.addMenuItem("2 ͨ�üĴ���������","location='02-1-1.htm'");
  fw_menu_0_1.addMenuItem("3 ר�üĴ���������","location='02-1-2.htm'");
  fw_menu_0_1.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0_1.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0_1.hideOnMouseOut=true;

  window.fw_menu_0_2 = new Menu("2.2 �洢���Ĺ���ģʽ",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0_2.addMenuItem("1 16λ΢�����ڴ����ģʽ","location='02-2.htm'");
  fw_menu_0_2.addMenuItem("2 32λ΢�����ڴ����ģʽ","location='02-2-4.htm'");
  fw_menu_0_2.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0_2.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0_2.hideOnMouseOut=true;

  window.fw_menu_0 = new Menu("root",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
  fw_menu_0.addMenuItem("���µ�ѧϰ���ݺ�Ҫ��","window.open('chapter02.htm?1', '_blank');");
  fw_menu_0.addMenuItem(fw_menu_0_1,"location='02-1.htm'");
  fw_menu_0.addMenuItem(fw_menu_0_2,"location='02-2.htm'");
  fw_menu_0.addMenuItem("2.3 ϰ��","location='02-Exercise.htm'");
  fw_menu_0.bgImageUp="TextBookIMG\\menu_up.gif";
  fw_menu_0.bgImageOver="TextBookIMG\\menu_over.gif";
  fw_menu_0.hideOnMouseOut=true;

  fw_menu_0.childMenuIcon="TextBookIMG\\arrows.gif";

  fw_menu_0.writeMenus();
} // fwLoadMenus()