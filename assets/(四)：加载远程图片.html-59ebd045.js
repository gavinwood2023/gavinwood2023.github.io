import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as d,f as n}from"./app-cd2b6d67.js";const a="/assets/loadRemoteImage-943f3791.png",t={},r=n(`<h4 id="需求" tabindex="-1"><a class="header-anchor" href="#需求" aria-hidden="true">#</a> 需求</h4><p>1、实现<code>TextureRect</code>和<code>Sprite2D</code>组件加载远程图片</p><p>2、固定节点显示大小，不因图片大小而改变</p><h4 id="实现" tabindex="-1"><a class="header-anchor" href="#实现" aria-hidden="true">#</a> 实现</h4><p>1、大小：</p><p>通过在编辑器中放置占位素材，调节大小，拼完整UI</p><p>1）、<code>TextureRect</code>在编辑器中，通过设置<code>Expand Mode</code>为<code>Ignore Size</code>和<code>Transform</code>中<code>Size</code>设置大小，可实现大小固定</p><p>2）、<code>Sprite2D</code>在编辑其中，通过设置<code>Scale</code>来实现固定大小</p><p>2、远程加载texture</p><p>编写<code>LoadRemoteImage.gd</code>脚本</p><div class="language-LoadRemoteImage line-numbers-mode" data-ext="LoadRemoteImage"><pre class="language-LoadRemoteImage"><code>extends Node

# 定义信号
#signal load_remote_image_texture_single(texture: Texture)

func _ready():
	pass


func _init():
	pass


func load_remote_image_texture(image_url: String) -&gt; void:
	# 创建一个 HTTP 请求节点并连接其完成信号。
	var http_request = HTTPRequest.new()
	add_child(http_request)
	http_request.request_completed.connect(self._http_request_completed)
	
	# 执行一个 HTTP 请求。下面的 URL 将写入作为一个 PNG 图像返回。
	var error = http_request.request(image_url)
	if error != OK:
		push_error(&quot;在HTTP请求中发生了一个错误&quot;,error)


# 当 HTTP 请求完成时调用。
func _http_request_completed(result, response_code, headers, body):
	if result != HTTPRequest.RESULT_SUCCESS:
		push_error(&quot;无法下载图像。尝试一个不同的图像&quot;)

	var image = Image.new()
	var error = image.load_png_from_buffer(body)
	if error != OK:
		push_error(&quot;无法加载图像&quot;)

	var texture = ImageTexture.create_from_image(image)
	#emit_signal(&quot;load_remote_image_texture_single&quot;, texture)
	get_parent().texture = texture
	
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h4><p>start.tscn场景和Start.gd脚本，如下</p><figure><img src="`+a+`" alt="loadRemoteImage.png" tabindex="0" loading="lazy"><figcaption>loadRemoteImage.png</figcaption></figure><p>在<code>_ready</code>函数中，给<code>$TextureRect512</code>，<code>$TextureRect128</code>，<code>$Sprite2D</code>绑定<code>LoadRemoteImage</code>脚本，<br> 之后调用<code>load_remote_image_texture</code>加载远程图片，即可正常显示</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var image_url = &quot;https://via.placeholder.com/512&quot;
var LoadRemoteImage = load(&quot;res://LoadRemoteImage.gd&quot;)	

# TextureRect指定显示大小，而不是根据原图片大小显示
# 编辑器中 
# Expand Mode： Ignore Size
# Transform -&gt; Size -&gt; 200*200
var LoadRemoteImage1 = LoadRemoteImage.new()
$TextureRect512.add_child(LoadRemoteImage1)
LoadRemoteImage1.load_remote_image_texture(image_url)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>加载本地图片，用法:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$TextureRectLocal.texture = load(&quot;res://game/images/demo.png&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,18),s=[r];function l(o,c){return i(),d("div",null,s)}const v=e(t,[["render",l],["__file","(四)：加载远程图片.html.vue"]]);export{v as default};
