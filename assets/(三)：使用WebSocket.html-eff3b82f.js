import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as n,c as i,f as s}from"./app-cd2b6d67.js";const d={},t=s(`<p>实现内容：<br> WebSocket正常连接，发送消息，接收消息</p><h4 id="服务端" tabindex="-1"><a class="header-anchor" href="#服务端" aria-hidden="true">#</a> 服务端</h4><p>用nodejs实现一个简单的websocket服务器端</p><p>1、创建一个新的目录，并在该目录中初始化一个新的Node.js项目：</p><div class="language-angular2html line-numbers-mode" data-ext="angular2html"><pre class="language-angular2html"><code>mkdir websocket-server
cd websocket-server
npm init -y
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2、安装 ws 库：</p><div class="language-angular2html line-numbers-mode" data-ext="angular2html"><pre class="language-angular2html"><code>npm install ws
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>3、创建一个名为 server.js 的文件，并添加以下代码：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const WebSocket = require(&#39;ws&#39;);

// 创建WebSocket服务器，监听在端口8080
const wss = new WebSocket.Server({ port: 9000 });

console.log(&#39;WebSocket服务器已启动...&#39;);

// 当有客户端连接时触发
wss.on(&#39;connection&#39;, function connection(ws) {
  console.log(&#39;新的连接已建立&#39;);

  // 当收到客户端发送的消息时触发
  ws.on(&#39;message&#39;, function incoming(message) {
    // 可以在此处解析自定义格式数据
    // const receivedMessage = message.toString(&#39;utf-8&#39;);
    // console.log(&#39;收到消息:&#39;, receivedMessage);
    // // 向客户端发送回复消息
    // ws.send(&#39;return -&gt; &#39; + receivedMessage);

    console.log(&#39;收到消息:&#39;, message);
    // 向客户端发送回复消息
    ws.send(&#39;收到消息：&#39; + message);
  });

  // 当连接断开时触发
  ws.on(&#39;close&#39;, function close() {
    console.log(&#39;连接已关闭&#39;);
  });
});

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="客户端" tabindex="-1"><a class="header-anchor" href="#客户端" aria-hidden="true">#</a> 客户端</h4><p>1、编写<code>WebSocketUtils.gd</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>extends Node

var handshake_headers: PackedStringArray
var supported_protocols: PackedStringArray
var tls_options: TLSOptions = null

var socket = WebSocketPeer.new()
var last_state = WebSocketPeer.STATE_CLOSED

signal connected_to_server()
signal connection_closed()
signal message_received(message: Variant)

# Called when the node enters the scene tree for the first time.
func _ready():
	pass # Replace with function body.

func connect_to_url(url) -&gt; int:
	#socket.supported_protocols = PackedStringArray([])
	#socket.handshake_headers = PackedStringArray([&quot;demo-chat&quot;])
	var err = socket.connect_to_url(url, tls_options)
	if err != OK:
		return err
	last_state = socket.get_ready_state()
	return OK

func send(message) -&gt; int:
	var state = socket.get_ready_state()
	if state != WebSocketPeer.STATE_OPEN:
		print(&quot;ready_state is not STATE_OPEN&quot;)
		return -1
	if typeof(message) == TYPE_STRING:
		return socket.send_text(message)
	return socket.send(var_to_bytes(message))


func get_message() -&gt; Variant:
	if socket.get_available_packet_count() &lt; 1:
		return null
	var pkt = socket.get_packet()
	if socket.was_string_packet():
		print(&quot;****** Received server message： &quot;,pkt.get_string_from_utf8())
		return pkt.get_string_from_utf8()
	return bytes_to_var(pkt)


func close(code := 1000, reason := &quot;&quot;) -&gt; void:
	socket.close(code, reason)
	last_state = socket.get_ready_state()

func clear() -&gt; void:
	socket = WebSocketPeer.new()
	last_state = socket.get_ready_state()
	
func get_socket() -&gt; WebSocketPeer:
	return socket


func poll() -&gt; void:
	if socket.get_ready_state() != socket.STATE_CLOSED:
		socket.poll()
	var state = socket.get_ready_state()
	if last_state != state:
		last_state = state
		if state == socket.STATE_OPEN:
			connected_to_server.emit()
		elif state == socket.STATE_CLOSED:
			connection_closed.emit()
	while socket.get_ready_state() == socket.STATE_OPEN and socket.get_available_packet_count():
		message_received.emit(get_message())


# Called every frame. &#39;delta&#39; is the elapsed time since the previous frame.
func _process(delta):
	poll()

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2、引用</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var WebSocketUtils = load(&quot;res://WebSocketUtils.gd&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>3、建立连接</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>WebSocketUtils.connect_to_url(&quot;ws://127.0.0.1:9001/&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>4、发送数据</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>WebSocketUtils.send(&quot;hello websocket&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,18),l=[t];function a(r,c){return n(),i("div",null,l)}const o=e(d,[["render",a],["__file","(三)：使用WebSocket.html.vue"]]);export{o as default};
