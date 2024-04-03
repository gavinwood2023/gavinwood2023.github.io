import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,f as t}from"./app-68a01667.js";const p={},e=t(`<p>服务器PHP代码</p><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>

<span class="token comment">// 替换成你的小游戏 App Key 和 App Secret</span>
<span class="token variable">$app_key</span> <span class="token operator">=</span> <span class="token string single-quoted-string">&#39;******&#39;</span><span class="token punctuation">;</span>
<span class="token variable">$app_secret</span> <span class="token operator">=</span> <span class="token string single-quoted-string">&#39;******&#39;</span><span class="token punctuation">;</span>

<span class="token comment">// 通过 GET 方法获取用户授权登录后的 code</span>
<span class="token variable">$code</span> <span class="token operator">=</span> <span class="token variable">$_GET</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;code&#39;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token comment">// 构造 POST 请求的数据</span>
<span class="token variable">$postData</span> <span class="token operator">=</span> <span class="token function">json_encode</span><span class="token punctuation">(</span><span class="token keyword">array</span><span class="token punctuation">(</span>
    <span class="token string single-quoted-string">&#39;appid&#39;</span> <span class="token operator">=&gt;</span> <span class="token variable">$app_key</span><span class="token punctuation">,</span>
    <span class="token string single-quoted-string">&#39;secret&#39;</span> <span class="token operator">=&gt;</span> <span class="token variable">$app_secret</span><span class="token punctuation">,</span>
    <span class="token string single-quoted-string">&#39;code&#39;</span> <span class="token operator">=&gt;</span> <span class="token variable">$code</span>
<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 初始化一个 cURL 句柄</span>
<span class="token variable">$ch</span> <span class="token operator">=</span> <span class="token function">curl_init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 设置 cURL 选项</span>
<span class="token function">curl_setopt</span><span class="token punctuation">(</span><span class="token variable">$ch</span><span class="token punctuation">,</span> <span class="token constant">CURLOPT_URL</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">&#39;https://developer.toutiao.com/api/apps/v2/jscode2session&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">curl_setopt</span><span class="token punctuation">(</span><span class="token variable">$ch</span><span class="token punctuation">,</span> <span class="token constant">CURLOPT_RETURNTRANSFER</span><span class="token punctuation">,</span> <span class="token constant boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">curl_setopt</span><span class="token punctuation">(</span><span class="token variable">$ch</span><span class="token punctuation">,</span> <span class="token constant">CURLOPT_POST</span><span class="token punctuation">,</span> <span class="token constant boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">curl_setopt</span><span class="token punctuation">(</span><span class="token variable">$ch</span><span class="token punctuation">,</span> <span class="token constant">CURLOPT_POSTFIELDS</span><span class="token punctuation">,</span> <span class="token variable">$postData</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">curl_setopt</span><span class="token punctuation">(</span><span class="token variable">$ch</span><span class="token punctuation">,</span> <span class="token constant">CURLOPT_HTTPHEADER</span><span class="token punctuation">,</span> <span class="token keyword">array</span><span class="token punctuation">(</span>
    <span class="token string single-quoted-string">&#39;Content-Type: application/json&#39;</span><span class="token punctuation">,</span>
    <span class="token string single-quoted-string">&#39;Content-Length: &#39;</span> <span class="token operator">.</span> <span class="token function">strlen</span><span class="token punctuation">(</span><span class="token variable">$postData</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 执行 POST 请求</span>
<span class="token variable">$response</span> <span class="token operator">=</span> <span class="token function">curl_exec</span><span class="token punctuation">(</span><span class="token variable">$ch</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">echo</span> <span class="token variable">$response</span><span class="token punctuation">;</span>

<span class="token comment">// 关闭 cURL 句柄</span>
<span class="token function">curl_close</span><span class="token punctuation">(</span><span class="token variable">$ch</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token delimiter important">?&gt;</span></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),c=[e];function o(l,i){return s(),a("div",null,c)}const k=n(p,[["render",o],["__file","抖音小游戏通过code获取openid.html.vue"]]);export{k as default};
