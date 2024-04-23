---
title: (三)：使用WebSocket
order: 3
icon: pen-to-square
# 一个页面可以有多个分类
category:
  - Godot
article: true
dir:
  index: true
  order: 1
---

实现内容：
WebSocket正常连接，发送消息，接收消息

#### 服务端
用nodejs实现一个简单的websocket服务器端

1、创建一个新的目录，并在该目录中初始化一个新的Node.js项目：
```angular2html
mkdir websocket-server
cd websocket-server
npm init -y
```
2、安装 ws 库：
```angular2html
npm install ws
```
3、创建一个名为 server.js 的文件，并添加以下代码：
```
const WebSocket = require('ws');

// 创建WebSocket服务器，监听在端口8080
const wss = new WebSocket.Server({ port: 9000 });

console.log('WebSocket服务器已启动...');

// 当有客户端连接时触发
wss.on('connection', function connection(ws) {
  console.log('新的连接已建立');

  // 当收到客户端发送的消息时触发
  ws.on('message', function incoming(message) {
    // 可以在此处解析自定义格式数据
    // const receivedMessage = message.toString('utf-8');
    // console.log('收到消息:', receivedMessage);
    // // 向客户端发送回复消息
    // ws.send('return -> ' + receivedMessage);

    console.log('收到消息:', message);
    // 向客户端发送回复消息
    ws.send('收到消息：' + message);
  });

  // 当连接断开时触发
  ws.on('close', function close() {
    console.log('连接已关闭');
  });
});

```

#### 客户端
1、编写`WebSocketUtils.gd`
```
extends Node

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

func connect_to_url(url) -> int:
	#socket.supported_protocols = PackedStringArray([])
	#socket.handshake_headers = PackedStringArray(["demo-chat"])
	var err = socket.connect_to_url(url, tls_options)
	if err != OK:
		return err
	last_state = socket.get_ready_state()
	return OK

func send(message) -> int:
	var state = socket.get_ready_state()
	if state != WebSocketPeer.STATE_OPEN:
		print("ready_state is not STATE_OPEN")
		return -1
	if typeof(message) == TYPE_STRING:
		return socket.send_text(message)
	return socket.send(var_to_bytes(message))


func get_message() -> Variant:
	if socket.get_available_packet_count() < 1:
		return null
	var pkt = socket.get_packet()
	if socket.was_string_packet():
		print("****** Received server message： ",pkt.get_string_from_utf8())
		return pkt.get_string_from_utf8()
	return bytes_to_var(pkt)


func close(code := 1000, reason := "") -> void:
	socket.close(code, reason)
	last_state = socket.get_ready_state()

func clear() -> void:
	socket = WebSocketPeer.new()
	last_state = socket.get_ready_state()
	
func get_socket() -> WebSocketPeer:
	return socket


func poll() -> void:
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


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	poll()

```
2、引用
```
var WebSocketUtils = load("res://WebSocketUtils.gd")
```
3、建立连接
```
WebSocketUtils.connect_to_url("ws://127.0.0.1:9001/")
```
4、发送数据
```
WebSocketUtils.send("hello websocket")
```


