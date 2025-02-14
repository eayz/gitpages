## Win-KeX

## 内容：

- [概述](https://www.kali.org/docs/wsl/win-kex/#overview)
- 安装
  - [先决条件](https://www.kali.org/docs/wsl/win-kex/#prerequisites)
  - [在WSL2中安装Kali Linux](https://www.kali.org/docs/wsl/win-kex/#install-kali-linux-in-wsl2)
  - [安装Win-Kex](https://www.kali.org/docs/wsl/win-kex/#install-win-kex)
- [运行Win-KeX](https://www.kali.org/docs/wsl/win-kex/#run-win-kex)
- [可选步骤](https://www.kali.org/docs/wsl/win-kex/#optional-steps)
<!--more-->
## 概述

#### Win-KeX为Linux的Windows子系统（WSL 2）提供了Kali桌面体验，具有以下功能：

- 窗口模式：在专用窗口中启动Kali Linux桌面
- 无缝模式：在Windows和Kali应用程序和菜单之间共享Windows桌面
- 声音支持
- 无特权和根会话支持
- 共享剪贴板，可在Kali Linux和Windows应用之间进行剪切和粘贴支持
- 多会话支持：根窗口和非私有窗口以及无缝会话同时进行

[![img](https://www.kali.org/docs/wsl/win-kex/win-kex-sl.jpg)](https://www.kali.org/docs/wsl/win-kex/win-kex-sl.jpg)

#### 本页详细介绍了在2分钟内安装Win-Kex的步骤。

## 安装

所有的安装步骤，直至我们安装Win-的Kex点，也由惊人的5分钟的视频手册的说明[NetworkChuck](https://twitter.com/NetWorkChuck)：

[5分钟内Windows上的Kali Linux（WSL2 GUI）](https://www.youtube.com/watch?v=AfVH54edAHU)

注意：您可以跳过xrdp的安装，而是按照[本指南的最后一步](https://www.kali.org/docs/wsl/win-kex/#install-win-kex)来安装Win-Kex。

### 先决条件

- 运行Windows 10版本2004或更高版本
- 使用[Windows终端机](https://www.microsoft.com/en-us/p/windows-terminal/9n0dx20hk701)

### 在WSL2中安装Kali Linux

- 以管理员身份打开PowerShell并运行：

```console
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
```

- 重新开始
- 以管理员身份打开PowerShell并运行：

```console
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
```

- 重新开始

- 从此处下载并安装WSL2 Linux内核：[https](https://aka.ms/wsl2kernel) ://aka.ms/wsl2kernel

- 以管理员身份打开PowerShell并运行： `wsl --set-default-version 2`

- 从Microsoft Store安装Kali Linux

  注意：要升级现有的WSL1 kali-linux安装，请输入： `wsl --set-version kali-linux 2`

- 运行Kali并完成初始设置

### 安装Win-KeX

- 通过以下方式安装win-kex：

```console
kali@kali:~$ sudo apt update
kali@kali:~$
kali@kali:~$ sudo apt install -y kali-win-kex
```

## 运行Win-KeX

#### Win-KeX支持三种模式：

- 窗口模式：[![img](https://www.kali.org/docs/wsl/win-kex/win-kex.jpg)](https://www.kali.org/docs/wsl/win-kex/win-kex.jpg)

  要在具有声音支持的窗口模式下启动Win-KeX，请运行

  `kex --win -s`

  有关更多信息，请参考[Win-KeX Win使用文档](https://www.kali.org/docs/wsl/win-kex-win/)。

- 增强的会话模式：[![img](https://www.kali.org/docs/wsl/win-kex/win-kex-2.jpg)](https://www.kali.org/docs/wsl/win-kex/win-kex-2.jpg)

- 要在具有声音支持和手臂解决方法的增强会话模式下启动Win-KeX，请运行

  `kex --esm --ip -s`

  有关更多信息，请参考[Win-KeX ESM使用文档](https://www.kali.org/docs/wsl/win-kex-esm/)。

- 无缝模式：

[![img](https://www.kali.org/docs/wsl/win-kex/win-kex-sl.jpg)](https://www.kali.org/docs/wsl/win-kex/win-kex-sl.jpg)

```
To start Win-KeX in Seamless mode with sound support, run

`kex --sl -s`

Refer to the [Win-KeX SL usage documentation](/docs/wsl/win-kex-sl/) for further information.
```

## 可选步骤：

- 如果有足够的空间，为什么不安装“ Kali with the lot”呢？： `sudo apt install -y kali-linux-large`

[![img](https://www.kali.org/docs/wsl/win-kex/win-kex-thelot.jpg)](https://www.kali.org/docs/wsl/win-kex/win-kex-thelot.jpg)

- 创建[Windows终端](https://www.microsoft.com/en-us/p/windows-terminal/9n0dx20hk701)快捷方式：

[![img](https://www.kali.org/docs/wsl/win-kex/win-kex-wt1.jpg)](https://www.kali.org/docs/wsl/win-kex/win-kex-wt1.jpg)

在以下选项中选择：

**窗口模式下基本的Win-KeX带有声音：**

```plaintext
{
      "guid": "{55ca431a-3a87-5fb3-83cd-11ececc031d2}",
      "hidden": false,
      "name": "Win-KeX",
      "commandline": "wsl -d kali-linux kex --wtstart -s",
},
```

**带有声音的窗口模式下的高级Win-KeX-Kali图标，并在kali主目录中启动：**

将kali-menu.jpg图标复制到Windows图片目录，然后将图标和开始目录添加到WT配置：

```plaintext
{
        "guid": "{55ca431a-3a87-5fb3-83cd-11ececc031d2}",
        "hidden": false,
        "icon": "file:///c:/users/<windows user>/pictures/icons/kali-menu.jpg",
        "name": "Win-KeX",
        "commandline": "wsl -d kali-linux kex --wtstart -s",
        "startingDirectory" : "//wsl$/kali-linux/home/<kali user>"
},
```

**基本Win-KeX在无缝模式下发出声音：**

```plaintext
{
      "guid": "{55ca431a-3a87-5fb3-83cd-11ececc031d2}",
      "hidden": false,
      "name": "Win-KeX",
      "commandline": "wsl -d kali-linux kex --sl --wtstart -s",
},
```

**带有声音的无缝模式下的高级Win-KeX-Kali图标，并在kali主目录中启动：**

将kali-menu.jpg图标复制到Windows图片目录，然后将图标和开始目录添加到WT配置：

```plaintext
{
        "guid": "{55ca431a-3a87-5fb3-83cd-11ececc031d2}",
        "hidden": false,
        "icon": "file:///c:/users/<windows user>/pictures/icons/kali-menu.jpg",
        "name": "Win-KeX",
        "commandline": "wsl -d kali-linux kex --sl --wtstart -s",
        "startingDirectory" : "//wsl$/kali-linux/home/<kali user>"
},
```

**在ESM模式下具有声音的基本Win-KeX：**

```plaintext
{
      "guid": "{55ca431a-3a87-5fb3-83cd-11ecedc031d2}",
      "hidden": false,
      "name": "Win-KeX",
      "commandline": "wsl -d kali-linux kex --esm --wtstart -s",
},
```

**在带声音的ESM模式下的高级Win-KeX-Kali图标，并在kali主目录中启动：**

将kali-menu.jpg图标复制到Windows图片目录，然后将图标和开始目录添加到WT配置：

```plaintext
{
        "guid": "{55ca431a-3a87-5fb3-83cd-11ecedd031d2}",
        "hidden": false,
        "icon": "file:///c:/users/<windows user>/pictures/icons/kali-menu.jpg",
        "name": "Win-KeX",
        "commandline": "wsl -d kali-linux kex --esm --wtstart -s",
        "startingDirectory" : "//wsl$/kali-linux/home/<kali user>"
},
```

[![img](https://www.kali.org/docs/wsl/win-kex/win-kex-wt1.jpg)](https://www.kali.org/docs/wsl/win-kex/win-kex-wt1.jpg)

[![img](https://www.kali.org/docs/wsl/win-kex/win-kex-wt2.jpg)](https://www.kali.org/docs/wsl/win-kex/win-kex-wt2.jpg)

[![img](https://www.kali.org/docs/wsl/win-kex/win-kex-full.jpg)](https://www.kali.org/docs/wsl/win-kex/win-kex-full.jpg)

### 帮助

有关更多信息，请通过以下途径寻求帮助：

```
kex --help
```

或通过以下方式查阅手册页：

```
man kex
```

[![img](https://www.kali.org/docs/wsl/win-kex/manpage.jpg)](https://www.kali.org/docs/wsl/win-kex/manpage.jpg)

或加入我们的[卡利论坛](https://forums.kali.org/)

#### 享受Win-KeX！



## Win-KeX

## Content:

- [Overview](https://www.kali.org/docs/wsl/win-kex/#overview)
- Installation
  - [Prerequisites](https://www.kali.org/docs/wsl/win-kex/#prerequisites)
  - [Install Kali Linux in WSL2](https://www.kali.org/docs/wsl/win-kex/#install-kali-linux-in-wsl2)
  - [Install Win-Kex](https://www.kali.org/docs/wsl/win-kex/#install-win-kex)
- [Run Win-KeX](https://www.kali.org/docs/wsl/win-kex/#run-win-kex)
- [Optional steps](https://www.kali.org/docs/wsl/win-kex/#optional-steps)

## Overview

#### Win-KeX provides a Kali Desktop Experience for Windows Subsystem for Linux (WSL 2) with the following features:

- Window mode: start a Kali Linux desktop in a dedicated window
- Seamless mode: share the Windows desktop between Windows and Kali apps and menus
- Sound support
- Unprivileged and Root session support
- Shared clipboard for cut and paste support between Kali Linux and Windows apps
- Multi-session support: root window & non-priv window & seamless sessions concurrently

[![img](https://www.kali.org/docs/wsl/win-kex/win-kex-sl.jpg)](https://www.kali.org/docs/wsl/win-kex/win-kex-sl.jpg)

#### This page details the steps to install Win-Kex in under 2 minutes.

## Installation

All installation steps, up to the point where we install Win-Kex, are also explained in the 5 minute video guide by the amazing [NetworkChuck](https://twitter.com/NetWorkChuck):

[Kali Linux on Windows in 5min (WSL2 GUI)](https://www.youtube.com/watch?v=AfVH54edAHU)

Note: You can skip the installation of xrdp and follow [the last step of this guide](https://www.kali.org/docs/wsl/win-kex/#install-win-kex) to install Win-Kex instead.

### Prerequisites

- Running Windows 10 version 2004 or higher
- Using [Windows Terminal](https://www.microsoft.com/en-us/p/windows-terminal/9n0dx20hk701)

### Install Kali Linux in WSL2

- Open PowerShell as administrator and run:

```console
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
```

- Restart
- Open PowerShell as administrator and run:

```console
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
```

- Restart

- Download and install the WSL2 Linux Kernel from here: https://aka.ms/wsl2kernel

- Open PowerShell as administrator and run: `wsl --set-default-version 2`

- Install Kali Linux from the Microsoft Store

  Note: to upgrade an existing WSL1 kali-linux installation, type: `wsl --set-version kali-linux 2`

- Run Kali and finish the initial setup

### Install Win-KeX

- Install win-kex via:

```console
kali@kali:~$ sudo apt update
kali@kali:~$
kali@kali:~$ sudo apt install -y kali-win-kex
```

## Run Win-KeX

#### Win-KeX supports three modes:

- Window Mode:[![img](https://www.kali.org/docs/wsl/win-kex/win-kex.jpg)](https://www.kali.org/docs/wsl/win-kex/win-kex.jpg)

  To start Win-KeX in Window mode with sound support, run

  `kex --win -s`

  Refer to the [Win-KeX Win usage documentation](https://www.kali.org/docs/wsl/win-kex-win/) for further information.

- Enhanced Session Mode:[![img](https://www.kali.org/docs/wsl/win-kex/win-kex-2.jpg)](https://www.kali.org/docs/wsl/win-kex/win-kex-2.jpg)

- To start Win-KeX in Enhanced Session Mode with sound support and arm workaround, run

  `kex --esm --ip -s`

  Refer to the [Win-KeX ESM usage documentation](https://www.kali.org/docs/wsl/win-kex-esm/) for further information.

- Seamless mode:

[![img](https://www.kali.org/docs/wsl/win-kex/win-kex-sl.jpg)](https://www.kali.org/docs/wsl/win-kex/win-kex-sl.jpg)

```
To start Win-KeX in Seamless mode with sound support, run

`kex --sl -s`

Refer to the [Win-KeX SL usage documentation](/docs/wsl/win-kex-sl/) for further information.
```

## Optional Steps:

- If you have the space, why not install “Kali with the lot”?: `sudo apt install -y kali-linux-large`

[![img](https://www.kali.org/docs/wsl/win-kex/win-kex-thelot.jpg)](https://www.kali.org/docs/wsl/win-kex/win-kex-thelot.jpg)

- Create a [Windows Terminal](https://www.microsoft.com/en-us/p/windows-terminal/9n0dx20hk701) Shortcut:

[![img](https://www.kali.org/docs/wsl/win-kex/win-kex-wt1.jpg)](https://www.kali.org/docs/wsl/win-kex/win-kex-wt1.jpg)

Choose amongst these options:

**Basic Win-KeX in window mode with sound:**

```plaintext
{
      "guid": "{55ca431a-3a87-5fb3-83cd-11ececc031d2}",
      "hidden": false,
      "name": "Win-KeX",
      "commandline": "wsl -d kali-linux kex --wtstart -s",
},
```

**Advanced Win-KeX in window mode with sound - Kali icon and start in kali home directory:**

Copy the kali-menu.jpg icon across to your windows picture directory and add the icon and start directory to your WT config:

```plaintext
{
        "guid": "{55ca431a-3a87-5fb3-83cd-11ececc031d2}",
        "hidden": false,
        "icon": "file:///c:/users/<windows user>/pictures/icons/kali-menu.jpg",
        "name": "Win-KeX",
        "commandline": "wsl -d kali-linux kex --wtstart -s",
        "startingDirectory" : "//wsl$/kali-linux/home/<kali user>"
},
```

**Basic Win-KeX in seamless mode with sound:**

```plaintext
{
      "guid": "{55ca431a-3a87-5fb3-83cd-11ececc031d2}",
      "hidden": false,
      "name": "Win-KeX",
      "commandline": "wsl -d kali-linux kex --sl --wtstart -s",
},
```

**Advanced Win-KeX in seamless mode with sound - Kali icon and start in kali home directory:**

Copy the kali-menu.jpg icon across to your windows picture directory and add the icon and start directory to your WT config:

```plaintext
{
        "guid": "{55ca431a-3a87-5fb3-83cd-11ececc031d2}",
        "hidden": false,
        "icon": "file:///c:/users/<windows user>/pictures/icons/kali-menu.jpg",
        "name": "Win-KeX",
        "commandline": "wsl -d kali-linux kex --sl --wtstart -s",
        "startingDirectory" : "//wsl$/kali-linux/home/<kali user>"
},
```

**Basic Win-KeX in ESM mode with sound:**

```plaintext
{
      "guid": "{55ca431a-3a87-5fb3-83cd-11ecedc031d2}",
      "hidden": false,
      "name": "Win-KeX",
      "commandline": "wsl -d kali-linux kex --esm --wtstart -s",
},
```

**Advanced Win-KeX in ESM mode with sound - Kali icon and start in kali home directory:**

Copy the kali-menu.jpg icon across to your windows picture directory and add the icon and start directory to your WT config:

```plaintext
{
        "guid": "{55ca431a-3a87-5fb3-83cd-11ecedd031d2}",
        "hidden": false,
        "icon": "file:///c:/users/<windows user>/pictures/icons/kali-menu.jpg",
        "name": "Win-KeX",
        "commandline": "wsl -d kali-linux kex --esm --wtstart -s",
        "startingDirectory" : "//wsl$/kali-linux/home/<kali user>"
},
```

[![img](https://www.kali.org/docs/wsl/win-kex/win-kex-wt1.jpg)](https://www.kali.org/docs/wsl/win-kex/win-kex-wt1.jpg)

[![img](https://www.kali.org/docs/wsl/win-kex/win-kex-wt2.jpg)](https://www.kali.org/docs/wsl/win-kex/win-kex-wt2.jpg)

[![img](https://www.kali.org/docs/wsl/win-kex/win-kex-full.jpg)](https://www.kali.org/docs/wsl/win-kex/win-kex-full.jpg)

### Help

For more information, ask for help via:

```
kex --help
```

or consult the manpage via:

```
man kex
```

[![img](https://www.kali.org/docs/wsl/win-kex/manpage.jpg)](https://www.kali.org/docs/wsl/win-kex/manpage.jpg)

or join us in the [Kali Forums](https://forums.kali.org/)

#### Enjoy Win-KeX!