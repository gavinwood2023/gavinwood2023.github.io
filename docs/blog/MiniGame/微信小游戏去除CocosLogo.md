---
title: 微信小游戏去除 Cocos Logo
icon: pen-to-square
# 一个页面可以有多个分类
category:
  - minigame
tag:
  - minigame
article: true
timeline: true
dir:
  index: true
  order: 1
---
#### 需求
cocos打包微信小游戏，首屏加载出现cocos logo问题，去除cocos logo

[参考](https://blog.csdn.net/jzhangc/article/details/133635599)

修改`first-screen.js`

```
第一处修改，注释 draw()
function tick() {
    rafHandle = requestAnimationFrame(() => {
        // draw(); // 注释掉着色器绘制方法，因为进度条的绘制是通过着色器绘制的，咱们把返回替换掉会导致此方法报错
        tick();
        if (afterTick) {
            afterTick();
            afterTick = null;
        }
    });
}
第二处修改
function start(alpha, antialias) {
    options.alpha = alpha === 'true' ? true : false;
    options.antialias = antialias === 'false' ? false : true;
    gl = window.canvas.getContext("webgl", options);
    initVertexBuffer();
    initProgressVertexBuffer();
    initTexture();
    // program = initShaders(VS_LOGO, FS_LOGO);
    // programProgress = initShaders(VS_PROGRESSBAR, FS_PROGRESSBAR);
  	// initShaders函数用于创建着色器程序。
		// loadShader函数用于加载和编译着色器代码进度条，所以咱们注释掉
    tick();
  	// return loadImage('splash.png').then(() => {
     //    updateVertexBuffer();
    //     updateTexture();
    //     return setProgress(0);
    // });
  	//替换为下面的函数返回 
    return new Promise((resolve, reject) => {
      afterTick = () => {
          resolve();
      };
  });
}

```