import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{r as a,o as r,c as l,a as e,b as n,e as d,f as t}from"./app-cd2b6d67.js";const c={},o=e("h4",{id:"需求",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#需求","aria-hidden":"true"},"#"),n(" 需求")],-1),v=e("p",null,"cocos打包微信小游戏，首屏加载出现cocos logo问题，去除cocos logo",-1),u={href:"https://blog.csdn.net/jzhangc/article/details/133635599",target:"_blank",rel:"noopener noreferrer"},m=t(`<p>修改<code>first-screen.js</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>第一处修改，注释 draw()
function tick() {
    rafHandle = requestAnimationFrame(() =&gt; {
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
    options.alpha = alpha === &#39;true&#39; ? true : false;
    options.antialias = antialias === &#39;false&#39; ? false : true;
    gl = window.canvas.getContext(&quot;webgl&quot;, options);
    initVertexBuffer();
    initProgressVertexBuffer();
    initTexture();
    // program = initShaders(VS_LOGO, FS_LOGO);
    // programProgress = initShaders(VS_PROGRESSBAR, FS_PROGRESSBAR);
  	// initShaders函数用于创建着色器程序。
		// loadShader函数用于加载和编译着色器代码进度条，所以咱们注释掉
    tick();
  	// return loadImage(&#39;splash.png&#39;).then(() =&gt; {
     //    updateVertexBuffer();
    //     updateTexture();
    //     return setProgress(0);
    // });
  	//替换为下面的函数返回 
    return new Promise((resolve, reject) =&gt; {
      afterTick = () =&gt; {
          resolve();
      };
  });
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function b(_,f){const i=a("ExternalLinkIcon");return r(),l("div",null,[o,v,e("p",null,[e("a",u,[n("参考"),d(i)])]),m])}const h=s(c,[["render",b],["__file","微信小游戏去除CocosLogo.html.vue"]]);export{h as default};
