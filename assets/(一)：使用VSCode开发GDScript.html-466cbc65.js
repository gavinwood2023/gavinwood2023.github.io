import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o,c as i,f as t}from"./app-cd2b6d67.js";const n="/assets/vscode01-42061356.png",d="/assets/vscode02-d0588b25.png",s="/assets/vscode03-62a4f9f9.png",c="/assets/vscode04-55b018df.png",a="/assets/vscode05-75f55bb1.png",l="/assets/godot01-7fa89f24.png",r={},u=t('<h4 id="vscode设置" tabindex="-1"><a class="header-anchor" href="#vscode设置" aria-hidden="true">#</a> VSCode设置：</h4><p>1、VSCode中下载godot-tool插件</p><figure><img src="'+n+'" alt="vscode01.png" tabindex="0" loading="lazy"><figcaption>vscode01.png</figcaption></figure><p>2、下载完插件后，点击设置,选择<code>Extension Settings</code></p><figure><img src="'+d+'" alt="vscode02.png" tabindex="0" loading="lazy"><figcaption>vscode02.png</figcaption></figure><p>3、输入godot安装路径<code>/Applications/Godot_v4.2.1.app/Contents/MacOS/Godot</code>，windows指定到.exe文件</p><figure><img src="'+s+`" alt="vscode03.png" tabindex="0" loading="lazy"><figcaption>vscode03.png</figcaption></figure><p>即可在当前项目<code>.vscode</code>目录下生成<code>settings.json</code>文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
    &quot;godotTools.editorPath.godot4&quot;: &quot;/Applications/Godot_v4.2.1.app/Contents/MacOS/Godot&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>4、选择<code>Run and Debug</code></p><figure><img src="`+c+'" alt="vscode04.png" tabindex="0" loading="lazy"><figcaption>vscode04.png</figcaption></figure><p>点击<code>create a launch.json file</code>选择<code>GDScript Godot Debug</code></p><figure><img src="'+a+`" alt="vscode05.png" tabindex="0" loading="lazy"><figcaption>vscode05.png</figcaption></figure><p>即可在当前项目<code>.vscode</code>目录下生成<code>launch.json</code>文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    &quot;version&quot;: &quot;0.2.0&quot;,
    &quot;configurations&quot;: [
        {
            &quot;name&quot;: &quot;GDScript: Launch Project&quot;,
            &quot;type&quot;: &quot;godot&quot;,
            &quot;request&quot;: &quot;launch&quot;,
            &quot;project&quot;: &quot;\${workspaceFolder}&quot;,
            &quot;debug_collisions&quot;: false,
            &quot;debug_paths&quot;: false,
            &quot;debug_navigation&quot;: false,
            &quot;additional_options&quot;: &quot;&quot;
        }
    ]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>完成以上设置，则可以直接在<code>VSCode</code>中<code>F5</code>运行<code>godot</code>项目</p><h4 id="godot设置" tabindex="-1"><a class="header-anchor" href="#godot设置" aria-hidden="true">#</a> Godot设置：</h4><p>实现：双击gd脚本，用VSCode打开</p><p>编辑器-&gt;编辑器设置-&gt;文本编辑器-&gt;外部</p><figure><img src="`+l+'" alt="godot01.png" tabindex="0" loading="lazy"><figcaption>godot01.png</figcaption></figure><p>使用外部编辑器：选择启用</p><p>可执行文件路径：注意路径指定到Electron文件，windows指定到.exe文件</p><p><code>/Applications/Visual Studio Code.app/Contents/MacOS/Electron</code></p><p>执行参数：</p><p><code>{project} --goto {file}:{line}:{col}</code></p><p>完成后，双击脚本即可用VSCode打开</p>',26),p=[u];function g(v,m){return o(),i("div",null,p)}const _=e(r,[["render",g],["__file","(一)：使用VSCode开发GDScript.html.vue"]]);export{_ as default};
