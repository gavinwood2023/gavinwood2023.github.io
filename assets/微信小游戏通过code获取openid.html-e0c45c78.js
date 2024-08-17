import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,f as p}from"./app-cd2b6d67.js";const e={},t=p(`<p>服务器PHP代码</p><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token comment">// 小程序的 AppID 和 AppSecret</span>
<span class="token variable">$appId</span> <span class="token operator">=</span> <span class="token string single-quoted-string">&#39;******&#39;</span><span class="token punctuation">;</span>
<span class="token variable">$appSecret</span> <span class="token operator">=</span> <span class="token string single-quoted-string">&#39;******&#39;</span><span class="token punctuation">;</span>
<span class="token comment">// 通过 GET 方法获取用户授权登录后的 code</span>
<span class="token variable">$code</span> <span class="token operator">=</span> <span class="token variable">$_GET</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;code&#39;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token comment">// 构建请求的 URL</span>
<span class="token variable">$url</span> <span class="token operator">=</span> <span class="token string double-quoted-string">&quot;https://api.weixin.qq.com/sns/jscode2session?appid=<span class="token interpolation"><span class="token punctuation">{</span><span class="token variable">$appId</span><span class="token punctuation">}</span></span>&amp;secret=<span class="token interpolation"><span class="token punctuation">{</span><span class="token variable">$appSecret</span><span class="token punctuation">}</span></span>&amp;js_code=<span class="token interpolation"><span class="token punctuation">{</span><span class="token variable">$code</span><span class="token punctuation">}</span></span>&amp;grant_type=authorization_code&quot;</span><span class="token punctuation">;</span>

<span class="token comment">// 初始化 cURL</span>
<span class="token variable">$ch</span> <span class="token operator">=</span> <span class="token function">curl_init</span><span class="token punctuation">(</span><span class="token variable">$url</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 设置 cURL 选项</span>
<span class="token function">curl_setopt</span><span class="token punctuation">(</span><span class="token variable">$ch</span><span class="token punctuation">,</span> <span class="token constant">CURLOPT_RETURNTRANSFER</span><span class="token punctuation">,</span> <span class="token constant boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">curl_setopt</span><span class="token punctuation">(</span><span class="token variable">$ch</span><span class="token punctuation">,</span> <span class="token constant">CURLOPT_SSL_VERIFYPEER</span><span class="token punctuation">,</span> <span class="token constant boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 如果你没有配置 SSL 证书，可以暂时关闭 SSL 验证</span>

<span class="token comment">// 执行请求并获取返回数据</span>
<span class="token variable">$response</span> <span class="token operator">=</span> <span class="token function">curl_exec</span><span class="token punctuation">(</span><span class="token variable">$ch</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 关闭 cURL 资源</span>
<span class="token function">curl_close</span><span class="token punctuation">(</span><span class="token variable">$ch</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">echo</span> <span class="token variable">$response</span><span class="token punctuation">;</span>
<span class="token delimiter important">?&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),c=[t];function o(l,i){return s(),a("div",null,c)}const d=n(e,[["render",o],["__file","微信小游戏通过code获取openid.html.vue"]]);export{d as default};
