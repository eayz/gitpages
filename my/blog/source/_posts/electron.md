---
title:  "通过Electron用Web技术搭建跨平台桌面软件"
layout: post
tags: javascript
---

Electron框架，开发者不但可以使用Web技术如HTML、CSS和Javascript来在Windows、Mac和Linux上提供一致使用体验的图形用户界面，还能借助Node.js的API与操作系统交互。Atom、Visual Studio Code和Whatsapp就是成功的例子。

## 快速入门
<!--more-->
### 运行与部署

为了尽快把

```bash
git clone https://github.com/electron/electron-quick-start
cd electron-quick-start
apt install npm
npm install
sudo chown root node_modules/electron/dist/chrome-sandbox
sudo chmod 4755 node_modules/electron/dist/chrome-sandbox
```

```bash
npm start
```

例如适用于Debian的安装包会放到`out/make/deb/x64/electron-quick-start_1.0.0_amd64.deb`。

```bash
npx @electron-forge/cli import
npm run make
```

### 程序结构

以下我们分析上述例子的结构。

`package.json`给出了项目的元信息：

```json
{
  "name": "electron-quick-start",
  "version": "1.0.0",
  "description": "A minimal Electron application",
  "main": "main.js",
  "scripts": {
    "start": "electron-forge start",
    "package": "electron-forge package",
    "make": "electron-forge make"
  },
  "repository": "https://github.com/electron/electron-quick-start",
  "keywords": [
    "Electron",
    "quick",
    "start",
    "tutorial",
    "demo"
  ],
  "author": "GitHub",
  "license": "CC0-1.0",
  "devDependencies": {
    "@electron-forge/cli": "^6.0.0-beta.53",
    "@electron-forge/maker-deb": "^6.0.0-beta.53",
    "@electron-forge/maker-zip": "^6.0.0-beta.53",
    "electron": "^10.1.3"
  },
  "config": {
    "forge": {
      "packagerConfig": {},
      "makers": [
        {
          "name": "@electron-forge/maker-zip",
          "platforms": [
            "darwin"
          ]
        },
        {
          "name": "@electron-forge/maker-deb",
          "config": {}
        }
      ]
    }
  }
}
```

`main.js`给出了主线程：

```javascript
// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
```

可见主线程要求创建一个浏览器窗口并先在相应的渲染器线程中执行`preload.js`:

```javscript
// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})
```

再显示网页`index.html`：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <meta http-equiv="X-Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <title>Hello World!</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    We are using Node.js <span id="node-version"></span>,
    Chromium <span id="chrome-version"></span>,
    and Electron <span id="electron-version"></span>.

    <!-- You can also require other files to run in this process -->
    <script src="./renderer.js"></script>
  </body>
</html>
```

## Electron



## Node.js

Node是一个基于Chrome V8引擎的Javascript运行时。Node采用事件驱动的异步模型，事件处理器在单一的主线程的事件循环中运行，而容易造成阻塞的操作在小型线程池中运行。由于大部分容易造成阻塞的操作如I/O、压缩、加密和进程创建都有被封装为异步的API，这为开发者免去了自行管理线程带来的复杂性（如死锁）和性能开销（如上下文切换），从而使开发高并发和低延迟的可伸缩系统变得容易。

一个简单的Node程序`hello_node.js`实现了一个服务器，代码如下所示：

```javascript
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

通过命令`node hello_node.js`即可把程序运行起来：在浏览器中输入网址`http://127.0.0.1:3000/`即可看到“Hello, World!”。一般来说，`node`命令可以运行脚本文件或脚本字符串，也可以启动交互式的REPL。

```bash
node [选项] [V8选项] [脚本文件 | -e "脚本" | -] [--] [参数]
node inspect [脚本文件 | -e "脚本" | 主机:端口] … #调试
node --v8-options #列出V8选项
```

Node.js提供的内置模块包括：

模块|用途
---|---
`assert`|不变式断言
`buffer`|提供缓冲区API
`child_process`|生成子进程
`cluster`|管理子进程
`console`|记录调试信息
`crypto`|密码学操作
`dns`|DNS解析
`events`|提供事件API
`fs`|操作文件系统
`http`|支持HTTP
`http2`|支持HTTP2
`https`|支持HTTPS
`net`|创建TCP服务器/客户端
`os`|与操作系统交互
`path`|操作文件路径
`perf_hooks`|测量性能
`process`|管理Node.js进程
`querystring`|解析和格式化URL查询字符串
`readline`|读取一行
`repl`|REPL
`stream`|提供操作流式数据的API
`string_decoder`|解码缓冲区为文本
`timers`|利用计时器编排任务
`tls`|提供TLS/SSL实现
`tty`|控制终端
`dgram`|使用UDP套接字
`url`|URL解析
`util`|杂项
`v8`|使用V8引擎的底层功能
`vm`|编译和运行代码
`wasi`|Web汇编
`worker_threads`|多线程
`zlib`|压缩

## NPM

[NPM](https://www.npmjs.com/)是最大的Javascript库仓库。

## 总结




