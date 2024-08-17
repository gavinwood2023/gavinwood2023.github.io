import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as s,o as a,c as d,a as e,b as t,e as l,f as r}from"./app-cd2b6d67.js";const u={},v=e("h4",{id:"需求",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#需求","aria-hidden":"true"},"#"),t(" 需求")],-1),o=e("p",null,[t("1、实现HTTP发送网络请求"),e("br"),t(" 2、支持GET/POST")],-1),c=e("h4",{id:"实现",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#实现","aria-hidden":"true"},"#"),t(" 实现")],-1),m={href:"http://HttpUtils.gd",target:"_blank",rel:"noopener noreferrer"},b=r(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>extends Node

# Some headers
var headers = [
	&quot;User-Agent: Pirulo/1.0 (Godot)&quot;,
	&quot;Accept: */*&quot;,
	&quot;Content-Type: application/json&quot;,
]
#var content_json = &quot;Content-Type: application/json&quot;
#var content_bytestream = &quot;Content-Type: bytestream&quot;
#var content_text = &quot;Content-Type: text/plain&quot;
#headers.append(content_text)


func request(host, url, type=&quot;GET&quot;, body=&quot;&quot;, port=- 1, callback_class=null, callback_method=&quot;&quot;) -&gt; void:
	var err = 0
	var http = HTTPClient.new() # Create the Client.
	err = http.connect_to_host(host, port)
	assert(err == OK) # Make sure connection is OK.
	
	# Wait until resolved and connected.
	while http.get_status() == HTTPClient.STATUS_CONNECTING or http.get_status() == HTTPClient.STATUS_RESOLVING:
		http.poll()
		#print(&quot;Connecting...&quot;)
		if not OS.has_feature(&quot;web&quot;):
			OS.delay_msec(5)
		else:
			await Engine.get_main_loop()
			
	assert(http.get_status() == HTTPClient.STATUS_CONNECTED)

	if type == &quot;GET&quot;:
		err = http.request(HTTPClient.METHOD_GET, url, headers, body)
	elif type == &quot;POST&quot;:
		err = http.request(HTTPClient.METHOD_POST, url, headers, body)
		
	assert(err == OK) # Make sure all is OK.
	
	while http.get_status() == HTTPClient.STATUS_REQUESTING:
		# Keep polling for as long as the request is being processed.
		http.poll()
		#print(&quot;Requesting...&quot;)
		if OS.has_feature(&quot;web&quot;):
			# Synchronous HTTP requests are not supported on the web,
			# so wait for the next main loop iteration.
			await Engine.get_main_loop()
			pass
		else:
			OS.delay_msec(5)
			
	assert(http.get_status() == HTTPClient.STATUS_BODY or http.get_status() == HTTPClient.STATUS_CONNECTED) # Make sure request finished well.

	if http.has_response():
		# If there is a response...
		
		#headers = http.get_response_headers_as_dictionary() # Get response headers.
		#print(&quot;code: &quot;, http.get_response_code()) # Show response code.
		#print(&quot;**headers:\\\\n&quot;, headers) # Show headers.

		## Getting the HTTP Body
		#if http.is_response_chunked():
			## Does it use chunks?
			#print(&quot;Response is Chunked!&quot;)
		#else:
			## Or just plain Content-Length
			#var bl = http.get_response_body_length()
			#print(&quot;Response Length: &quot;, bl)

		# This method works for both anyway
		var rb = PackedByteArray() # Array that will hold the data.
		
		while http.get_status() == HTTPClient.STATUS_BODY:
			# While there is body left to be read
			http.poll()
			# Get a chunk.
			var chunk = http.read_response_body_chunk()
			if chunk.size() == 0:
				if not OS.has_feature(&quot;web&quot;):
					# Got nothing, wait for buffers to fill a bit.
					OS.delay_usec(10)
				else:
					await Engine.get_main_loop()
			else:
				rb = rb + chunk # Append to read buffer.
		
		var text = rb.get_string_from_utf8()
		if callback_class != null and callback_method != null and callback_method.length() &gt; 0:
			callback_class.call_deferred(callback_method, text)

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2、服务器PHP实现</p><h5 id="get-godot-get-test-php-有两种形式" tabindex="-1"><a class="header-anchor" href="#get-godot-get-test-php-有两种形式" aria-hidden="true">#</a> GET:（godot_get_test.php）有两种形式</h5><p>第一种：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;?php
    $name = $_GET[&#39;name&#39;];
    $age = $_GET[&#39;age&#39;];
    echo &quot;GET name = {$name}, age = {$age}&quot;;
?&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第二种：godot_post_test.php</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;?php
    // 获取请求体中的原始数据
    $json_data = file_get_contents(&quot;php://input&quot;);
    // 解析 JSON 数据
    $data = json_decode($json_data, true);
    // 提取 name 和 age 值
    $name = $data[&#39;name&#39;];
    $age = $data[&#39;age&#39;];
    echo &quot;name = {$name}, age = {$age}&quot;;
?&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="post" tabindex="-1"><a class="header-anchor" href="#post" aria-hidden="true">#</a> POST:</h5><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;?php
    // 获取请求体中的原始 JSON 数据
    $json_data = file_get_contents(&quot;php://input&quot;);
    // 解析 JSON 数据
    $data = json_decode($json_data, true);
    // 检查 JSON 数据是否成功解析
    if ($data !== null) {
        // 提取 name 和 age 值
        $name = $data[&#39;name&#39;];
        $age = $data[&#39;age&#39;];

        // 输出 name 和 age 值
        echo &quot;POST name: &quot; . $name . &quot;, age: &quot; . $age;
    } else {
        // 如果解析失败，输出错误信息
        echo &quot;POST Failed to parse JSON data.&quot;;
    }
?&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h4><h5 id="get" tabindex="-1"><a class="header-anchor" href="#get" aria-hidden="true">#</a> GET:</h5><p>第一种：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var params = &quot;?name=lisi&amp;age=18&quot;
HttpUtils.request(&quot;localhost&quot;, &quot;/godot_get_test.php&quot;+params,&quot;GET&quot;, &quot;&quot;, -1, self, &quot;_http_get_callback&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>第二种：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var body_json_data = {
	&quot;name&quot;:&quot;zhangsan&quot;,
	&quot;age&quot;:18
}
HttpUtils.request(&quot;localhost&quot;, &quot;/godot_get_test.php&quot;,&quot;GET&quot;, JSON.stringify(body_json_data), -1, self, &quot;_http_get_callback&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>回调函数，打印输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>func _http_get_callback(response):
	print(&quot;callback &quot;, response)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="post-1" tabindex="-1"><a class="header-anchor" href="#post-1" aria-hidden="true">#</a> POST</h5><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var body = {
    &quot;name&quot;:&quot;zhangsan&quot;,
    &quot;age&quot;:16
}
HttpUtils.request(&quot;localhost&quot;, &quot;/godot_post_test.php&quot;,&quot;POST&quot;, JSON.stringify(body), -1, self, &quot;_http_post_callback&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>回调函数，打印输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>func _http_post_callback(response):
	print(&quot;callback &quot;, response)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,21);function p(h,_){const n=s("ExternalLinkIcon");return a(),d("div",null,[v,o,c,e("p",null,[t("1、客户端Godot，"),e("a",m,[t("HttpUtils.gd"),l(n)]),t(" 设置为单例自动加载")]),b])}const T=i(u,[["render",p],["__file","(五)：HTTP发送网络请求.html.vue"]]);export{T as default};
