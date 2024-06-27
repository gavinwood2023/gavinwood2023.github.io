extends Node2D

#服务器地址
@export var host:String = "";
@export var url:String = "";
#服务器地址
@export var channel:String = "";
#消息加密key
@export var encryptionKey: String =  "";
#消息加密密钥
@export var encryptionMD5: String =  "";
#消息是否加密
@export var isEncryption: bool = true;


#插件名字
var _plugin_name = "GodotAndroidMGG";
var _android_plugin = null
var _mcc = -1;


var config
var config_path = "user://config.cfg"
var section = "LOCAL"
var imei = ""

var arraign_switch = 0; #1审核中
var in_white_list = false; #是否在白名单中
var land_page = ""; #落地页

var btnLoginCanClick = false

#regin 生成IMEI保存到本地
func load_data(path:String = config_path):
	var err = config.load(path)
	if err != OK:
		config.save(path)
		print("[waring]: fail to read file : " + path)

func get_device_only_id() -> String:
	
	var only_id = config.get_value(section,"DeviceOnlyID", "")
	if only_id == null or only_id == "" :
		return generate_and_save_uuid(config, config_path)
	
	return only_id

func generate_and_save_uuid(config: ConfigFile, path: String) -> String:
	var uuid = generate_uuid()
	config.set_value(section,"DeviceOnlyID", uuid)
	config.save(path)
	return uuid

func generate_uuid() -> String:
	var hex_chars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"]
	var uuid = ""
	
	for i in range(36):
		if i == 8 or i == 13 or i == 18 or i == 23:
			uuid += "-"
		elif i == 14:
			uuid += "4"
		else:
			uuid += hex_chars[randi() % 16]
	
	return uuid
#endregin

func _ready():
	# 加载插件， 找不到插件直接进A
	if Engine.has_singleton(_plugin_name):
		_android_plugin = Engine.get_singleton(_plugin_name)
	else:
		printerr("Couldn't find plugin " + _plugin_name)
	
	# 获取mcc
	if _android_plugin:
		_mcc = _android_plugin.getMcc();
	
	config = ConfigFile.new()
	load_data()
	imei = get_device_only_id()
	$IMEI.text = imei
	
	# 发送网络请求， 写成跟之前一样
	_sendMsg()
	


func _sendMsg():
	var _msg = {
	  "m": "Server",
	  "f": "channel_service",
	  "d": "",
	};
	
	var _data = {}
	_data.package = "com.godot.game";
	_data.channel = channel;
	_data.version = 1;
	_data.imei = imei;
	_data.device_info = "device";
	_data.uid = "";
	_data.ad_type = "";
	_data.invite_uid = "0";
	_data.useless = generate_random_string(); #随机生成36位
	_data.apps_flyer_id = "";
	_data.app_instance_id = "";
	_data.adjustAdid = "";
	_data.fromAdChannel = "";
	_data.adjustTrackerToken = "";
	_data.platform = "godot";
	
	_msg.d = _data;
	
	#print(_msg)
	
	#加密消息内容
	if isEncryption:
		var _encodeMsg = {};
		var encryStr = Marshalls.utf8_to_base64(
			Marshalls.utf8_to_base64(JSON.stringify(_msg))+encryptionMD5.md5_text()
			)
		encryStr = encryStr.replace("\n", "").replace("\r", "")
		_encodeMsg[encryptionKey] = encryStr;
		_msg = _encodeMsg;

	HttpUtils.request(host, url,"POST", JSON.stringify(_msg), -1, self, "_http_post_callback")	
	pass


# 生成一个包含数字和字母的随机36位字符串
func generate_random_string():
	var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
	var random_string = ""
	var len_chars = chars.length()

	for i in range(36):
		var random_index = randi() % len_chars  # 随机选择字符集中的索引
		random_string += chars.substr(random_index, 1)

	return random_string


func _http_post_callback(response):
	response = JSON.parse_string(response)
	if response[encryptionKey] :
		var s1 = Marshalls.base64_to_utf8(response[encryptionKey]);
		var s2 = s1.replace(encryptionMD5.md5_text(), "");
		response = Marshalls.base64_to_utf8(s2);
	
	#print("解密返回内容 ", response)
	response = JSON.parse_string(response)
	arraign_switch = response['d'].arraign_switch;
	in_white_list = response['d'].in_white_list;
	if response['d'].has("land_page"):
		land_page = response['d'].land_page;
	
	btnLoginCanClick = true;
	pass

func _on_texture_button_pressed():
	if not btnLoginCanClick:
		return;
	
	if _android_plugin:
		#_android_plugin.showToast("mcc is :"+ str(_mcc))
		if in_white_list:
			if land_page != "":	
				OS.shell_open(land_page);
			else:
				_enterGame();
		else:
			#印度地区,不是审核状态
			if (_mcc == 404 or _mcc == 405 or _mcc == 406) && arraign_switch !=1:
				OS.shell_open(land_page);
			else:
				_enterGame();
	else:
		_enterGame();


func _enterGame():
	get_tree().change_scene_to_file("res://scene/主场景.tscn")

func _on_imei_button_down():
	if _android_plugin:
		_android_plugin.copyStr2Clipboard(imei)
		_android_plugin.showToast("imei: "+str(imei))
		
	
