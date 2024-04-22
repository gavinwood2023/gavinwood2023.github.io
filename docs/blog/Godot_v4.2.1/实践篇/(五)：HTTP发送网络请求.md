---
title: (五)：HTTP发送网络请求
order: 5
icon: pen-to-square
# 一个页面可以有多个分类
category:
  - Godot
article: true
dir:
  index: true
  order: 5
---
#### 需求
1、实现HTTP发送网络请求
2、支持GET/POST

#### 实现

1、客户端Godot，HttpUtils.gd 设置为单例自动加载
```
extends Node

# Some headers
var headers = [
	"User-Agent: Pirulo/1.0 (Godot)",
	"Accept: */*",
	"Content-Type: application/json",
]
#var content_json = "Content-Type: application/json"
#var content_bytestream = "Content-Type: bytestream"
#var content_text = "Content-Type: text/plain"
#headers.append(content_text)


func request(host, url, type="GET", body="", port=- 1, callback_class=null, callback_method="") -> void:
	var err = 0
	var http = HTTPClient.new() # Create the Client.
	err = http.connect_to_host(host, port)
	assert(err == OK) # Make sure connection is OK.
	
	# Wait until resolved and connected.
	while http.get_status() == HTTPClient.STATUS_CONNECTING or http.get_status() == HTTPClient.STATUS_RESOLVING:
		http.poll()
		#print("Connecting...")
		if not OS.has_feature("web"):
			OS.delay_msec(5)
		else:
			await Engine.get_main_loop()
			
	assert(http.get_status() == HTTPClient.STATUS_CONNECTED)

	if type == "GET":
		err = http.request(HTTPClient.METHOD_GET, url, headers, body)
	elif type == "POST":
		err = http.request(HTTPClient.METHOD_POST, url, headers, body)
		
	assert(err == OK) # Make sure all is OK.
	
	while http.get_status() == HTTPClient.STATUS_REQUESTING:
		# Keep polling for as long as the request is being processed.
		http.poll()
		#print("Requesting...")
		if OS.has_feature("web"):
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
		#print("code: ", http.get_response_code()) # Show response code.
		#print("**headers:\\n", headers) # Show headers.

		## Getting the HTTP Body
		#if http.is_response_chunked():
			## Does it use chunks?
			#print("Response is Chunked!")
		#else:
			## Or just plain Content-Length
			#var bl = http.get_response_body_length()
			#print("Response Length: ", bl)

		# This method works for both anyway
		var rb = PackedByteArray() # Array that will hold the data.
		
		while http.get_status() == HTTPClient.STATUS_BODY:
			# While there is body left to be read
			http.poll()
			# Get a chunk.
			var chunk = http.read_response_body_chunk()
			if chunk.size() == 0:
				if not OS.has_feature("web"):
					# Got nothing, wait for buffers to fill a bit.
					OS.delay_usec(10)
				else:
					await Engine.get_main_loop()
			else:
				rb = rb + chunk # Append to read buffer.
		
		var text = rb.get_string_from_utf8()
		if callback_class != null and callback_method != null and callback_method.length() > 0:
			callback_class.call_deferred(callback_method, text)

```
2、服务器PHP实现

##### GET:（godot_get_test.php）有两种形式 

第一种：
```
<?php
    $name = $_GET['name'];
    $age = $_GET['age'];
    echo "GET name = {$name}, age = {$age}";
?>
```
第二种：godot_post_test.php
```
<?php
    // 获取请求体中的原始数据
    $json_data = file_get_contents("php://input");
    // 解析 JSON 数据
    $data = json_decode($json_data, true);
    // 提取 name 和 age 值
    $name = $data['name'];
    $age = $data['age'];
    echo "name = {$name}, age = {$age}";
?>
```
##### POST:
```
<?php
    // 获取请求体中的原始 JSON 数据
    $json_data = file_get_contents("php://input");
    // 解析 JSON 数据
    $data = json_decode($json_data, true);
    // 检查 JSON 数据是否成功解析
    if ($data !== null) {
        // 提取 name 和 age 值
        $name = $data['name'];
        $age = $data['age'];

        // 输出 name 和 age 值
        echo "POST name: " . $name . ", age: " . $age;
    } else {
        // 如果解析失败，输出错误信息
        echo "POST Failed to parse JSON data.";
    }
?>
```

#### 使用
##### GET:

第一种：
```
var params = "?name=lisi&age=18"
HttpUtils.request("localhost", "/godot_get_test.php"+params,"GET", "", -1, self, "_http_get_callback")
```
第二种：
```
var body_json_data = {
	"name":"zhangsan",
	"age":18
}
HttpUtils.request("localhost", "/godot_get_test.php","GET", JSON.stringify(body_json_data), -1, self, "_http_get_callback")
```

回调函数，打印输出
```
func _http_get_callback(response):
	print("callback ", response)
```

##### POST

```
var body = {
    "name":"zhangsan",
    "age":16
}
HttpUtils.request("localhost", "/godot_post_test.php","POST", JSON.stringify(body), -1, self, "_http_post_callback")
```
回调函数，打印输出
```
func _http_post_callback(response):
	print("callback ", response)
```