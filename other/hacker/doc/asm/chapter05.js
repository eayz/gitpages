function fwLoadMenus() {
   if (window.fw_menu_0) return;

   window.fw_menu_0_1 = new Menu("5.1 �������ָ���ʽ",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
   fw_menu_0_1.addMenuItem("1 ָ���ʽ","location='05-1.htm'");
   fw_menu_0_1.addMenuItem("2 �˽�ָ��ļ�������","location='05-1.htm#Aspect'");
   fw_menu_0_1.bgImageUp="TextBookIMG\\menu_up.gif";
   fw_menu_0_1.bgImageOver="TextBookIMG\\menu_over.gif";
   fw_menu_0_1.hideOnMouseOut=true;

   window.fw_menu_0_2_1 = new Menu("1 ���ݴ���ָ��",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
   fw_menu_0_2_1.addMenuItem("1 MOV","location='05-2.htm#MOVS'");
   fw_menu_0_2_1.addMenuItem("2 MOVSX/MOVZX","location='05-2-011.htm'");
   fw_menu_0_2_1.addMenuItem("3 XCHG","location='05-2-011.htm#XCHG'");
   fw_menu_0_2_1.addMenuItem("4 LEA","location='05-2-012.htm'");
   fw_menu_0_2_1.addMenuItem("5 LDS/LES/LFS/LGS/LSS","location='05-2-012.htm#LoadSeg'");
   fw_menu_0_2_1.addMenuItem("6 PUSH/POP","location='05-2-013.htm'");
   fw_menu_0_2_1.addMenuItem("7 XLAT","location='05-2-013.htm#XLAT'");
   fw_menu_0_2_1.bgImageUp="TextBookIMG\\menu_up.gif";
   fw_menu_0_2_1.bgImageOver="TextBookIMG\\menu_over.gif";
   fw_menu_0_2_1.hideOnMouseOut=true;

   window.fw_menu_0_2_2 = new Menu("2 ��־λ����ָ��",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
   fw_menu_0_2_2.addMenuItem("1 ��λCF����ָ��","location='05-2-02.htm'");
   fw_menu_0_2_2.addMenuItem("2 ����λDF����ָ��","location='05-2-02.htm#CLD_STD'");
   fw_menu_0_2_2.addMenuItem("3 �ж�����λIF����ָ��","location='05-2-02.htm#CLI_STI'");
   fw_menu_0_2_2.addMenuItem("4 ��ȡ��־λ����ָ��","location='05-2-02.htm#LSAHF'");
   fw_menu_0_2_2.addMenuItem("5 ��־λ��ջ����ָ��","location='05-2-02.htm#PushPop'");
   fw_menu_0_2_2.bgImageUp="TextBookIMG\\menu_up.gif";
   fw_menu_0_2_2.bgImageOver="TextBookIMG\\menu_over.gif";
   fw_menu_0_2_2.hideOnMouseOut=true;

   window.fw_menu_0_2_3 = new Menu("3 ��������ָ��",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
   fw_menu_0_2_3.addMenuItem("1 ADD/ADC/INC/XADD","location='05-2-03.htm'");
   fw_menu_0_2_3.addMenuItem("2 SUB/SBB/DEC/NEG","location='05-2-031.htm'");
   fw_menu_0_2_3.addMenuItem("3 MUL/IMUL","location='05-2-032.htm'");
   fw_menu_0_2_3.addMenuItem("4 DIV/IDIV","location='05-2-033.htm'");
   fw_menu_0_2_3.addMenuItem("5 CBW/CWD/CDWE/CDQ","location='05-2-034.htm'");
   fw_menu_0_2_3.bgImageUp="TextBookIMG\\menu_up.gif";
   fw_menu_0_2_3.bgImageOver="TextBookIMG\\menu_over.gif";
   fw_menu_0_2_3.hideOnMouseOut=true;
 
   window.fw_menu_0_2_4 = new Menu("5 ��λ����ָ��",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
   fw_menu_0_2_4.addMenuItem("1 ������λ:SAL/SAR","location='05-2-05.htm'");
   fw_menu_0_2_4.addMenuItem("2 �߼���λ:SHL/SHR","location='05-2-051.htm'");
   fw_menu_0_2_4.addMenuItem("3 ˫������λ:SHLD/SHRD","location='05-2-052.htm'");
   fw_menu_0_2_4.addMenuItem("4 ѭ����λ:ROL/ROR","location='05-2-053.htm'");
   fw_menu_0_2_4.addMenuItem("5 ����λѭ����λ:RCL/RCR","location='05-2-054.htm'");
   fw_menu_0_2_4.bgImageUp="TextBookIMG\\menu_up.gif";
   fw_menu_0_2_4.bgImageOver="TextBookIMG\\menu_over.gif";
   fw_menu_0_2_4.hideOnMouseOut=true;

   window.fw_menu_0_2_5 = new Menu("6 λ����ָ��",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
   fw_menu_0_2_5.addMenuItem("1 BSF/BSR","location='05-2-06.htm'");
   fw_menu_0_2_5.addMenuItem("2 BT/BTC/BTR/BTS","location='05-2-061.htm'");
   fw_menu_0_2_5.addMenuItem("3 TEST","location='05-2-061.htm#TEST'");
   fw_menu_0_2_5.bgImageUp="TextBookIMG\\menu_up.gif";
   fw_menu_0_2_5.bgImageOver="TextBookIMG\\menu_over.gif";
   fw_menu_0_2_5.hideOnMouseOut=true;

   window.fw_menu_0_2_6 = new Menu("8 ѭ��ָ��",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
   fw_menu_0_2_6.addMenuItem("1 LOOP","location='05-2-08.htm'");
   fw_menu_0_2_6.addMenuItem("2 LOOPE/LOOPZ","location='05-2-081.htm'");
   fw_menu_0_2_6.addMenuItem("3 LOOPNE/LOOPNZ","location='05-2-081.htm#LOOPNE'");
   fw_menu_0_2_6.addMenuItem("4 JCXZ/JECXZ","location='05-2-081.htm#JCXZ'");
   fw_menu_0_2_6.bgImageUp="TextBookIMG\\menu_up.gif";
   fw_menu_0_2_6.bgImageOver="TextBookIMG\\menu_over.gif";
   fw_menu_0_2_6.hideOnMouseOut=true;

   window.fw_menu_0_2_7 = new Menu("9 ת��ָ��",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
   fw_menu_0_2_7.addMenuItem("1 ������ת��ָ��(JMP)","location='05-2-09.htm'");
   fw_menu_0_2_7.addMenuItem("2 ����ת��ָ��","location='05-2-091.htm'");
   fw_menu_0_2_7.bgImageUp="TextBookIMG\\menu_up.gif";
   fw_menu_0_2_7.bgImageOver="TextBookIMG\\menu_over.gif";
   fw_menu_0_2_7.hideOnMouseOut=true;

   window.fw_menu_0_2_8 = new Menu("11 �ַ�������ָ��",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
   fw_menu_0_2_8.addMenuItem("1 LODS/STOS/MOVS","location='05-2-11.htm'");
   fw_menu_0_2_8.addMenuItem("2 INS/OUTS","location='05-2-111.htm'");
   fw_menu_0_2_8.addMenuItem("3 CMPS/SCAS","location='05-2-111.htm#CMPS'");
   fw_menu_0_2_8.addMenuItem("4 REP/REPE/REPNE","location='05-2-112.htm'");
   fw_menu_0_2_8.bgImageUp="TextBookIMG\\menu_up.gif";
   fw_menu_0_2_8.bgImageOver="TextBookIMG\\menu_over.gif";
   fw_menu_0_2_8.hideOnMouseOut=true;

   window.fw_menu_0_2_9 = new Menu("12 ASCII--BCD�����ָ��",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
   fw_menu_0_2_9.addMenuItem("1 AAA/AAS","location='05-2-12.htm'");
   fw_menu_0_2_9.addMenuItem("2 AAM/AAD","location='05-2-121.htm'");
   fw_menu_0_2_9.addMenuItem("3 DAA/DAS","location='05-2-122.htm'");
   fw_menu_0_2_9.bgImageUp="TextBookIMG\\menu_up.gif";
   fw_menu_0_2_9.bgImageOver="TextBookIMG\\menu_over.gif";
   fw_menu_0_2_9.hideOnMouseOut=true;

   window.fw_menu_0_2 = new Menu("5.2 ָ��ϵͳ",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
   fw_menu_0_2.addMenuItem(fw_menu_0_2_1,"location='05-2.htm'");
   fw_menu_0_2.addMenuItem(fw_menu_0_2_2,"location='05-2-02.htm'");
   fw_menu_0_2.addMenuItem(fw_menu_0_2_3,"location='05-2-03.htm'");
   fw_menu_0_2.addMenuItem("4 �߼�����ָ��","location='05-2-04.htm'");
   fw_menu_0_2.addMenuItem(fw_menu_0_2_4,"location='05-2-05.htm'");
   fw_menu_0_2.addMenuItem(fw_menu_0_2_5,"location='05-2-06.htm'");
   fw_menu_0_2.addMenuItem("7 �Ƚ�����ָ��","location='05-2-07.htm'");
   fw_menu_0_2.addMenuItem(fw_menu_0_2_6,"location='05-2-08.htm'");
   fw_menu_0_2.addMenuItem(fw_menu_0_2_7,"location='05-2-09.htm'");
   fw_menu_0_2.addMenuItem("10 ���������ֽ�ָ��","location='05-2-10.htm'");
   fw_menu_0_2.addMenuItem(fw_menu_0_2_8,"location='05-2-11.htm'");
   fw_menu_0_2.addMenuItem(fw_menu_0_2_9,"location='05-2-12.htm'");
   fw_menu_0_2.addMenuItem("13 ������ָ��","location='05-2-13.htm'");
   fw_menu_0_2.bgImageUp="TextBookIMG\\menu_up.gif";
   fw_menu_0_2.bgImageOver="TextBookIMG\\menu_over.gif";
   fw_menu_0_2.hideOnMouseOut=true;
   fw_menu_0_2.childMenuIcon="TextBookIMG\\arrows.gif";

   window.fw_menu_0 = new Menu("root",196,19,"Verdana, Arial, Helvetica, sans-serif",12,"#cc0099","#ffffff","#33ffcc","#000084");
   fw_menu_0.addMenuItem("���µ�ѧϰ���ݺ�Ҫ��","window.open('chapter05.htm?1', '_blank');");
   fw_menu_0.addMenuItem(fw_menu_0_1,"location='05-1.htm'");
   fw_menu_0.addMenuItem(fw_menu_0_2,"location='05-2.htm'");
   fw_menu_0.addMenuItem("5.3 ϰ��","location='05-Exercise.htm'");
   fw_menu_0.bgImageUp="TextBookIMG\\menu_up.gif";
   fw_menu_0.bgImageOver="TextBookIMG\\menu_over.gif";
   fw_menu_0.hideOnMouseOut=true;
   fw_menu_0.childMenuIcon="TextBookIMG\\arrows.gif";

   fw_menu_0.writeMenus();
} // fwLoadMenus()