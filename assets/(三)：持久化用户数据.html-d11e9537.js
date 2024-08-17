import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as d,o as a,c as t,a as n,b as e,e as s,f as r}from"./app-cd2b6d67.js";const v="/assets/storage01-820021d5.png",c={},u=n("h4",{id:"需求",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#需求","aria-hidden":"true"},"#"),e(" 需求：")],-1),o=n("p",null,"1、存储简单的数据，像是玩家金币，等级等",-1),m=n("p",null,"2、可选择加密/不加密存储",-1),b=n("p",null,"3、可以正常获取存储的值",-1),_=n("h4",{id:"参考",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#参考","aria-hidden":"true"},"#"),e(" 参考：")],-1),g={href:"https://docs.godotengine.org/zh-cn/4.x/tutorials/io/data_paths.html#accessing-persistent-user-data-user",title:"持久化用户数据",target:"_blank",rel:"noopener noreferrer"},f=n("p",null,[n("code",null,"user://"),e("路径位置：")],-1),p=n("figure",null,[n("img",{src:v,alt:"storage01.png",tabindex:"0",loading:"lazy"}),n("figcaption",null,"storage01.png")],-1),h=n("h4",{id:"实现",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#实现","aria-hidden":"true"},"#"),e(" 实现：")],-1),q={href:"https://docs.godotengine.org/zh-cn/4.x/classes/class_configfile.html#class-configfile",title:"ConfigFile",target:"_blank",rel:"noopener noreferrer"},S=n("br",null,null,-1),y=n("code",null,"user://storage.cfg",-1),k=r(`<p>编写<code>LocalStorage.gd</code>脚本，设置为单例自动加载，命名为<code>LocalStorage</code>同时勾选<code>Enable</code></p><p>代码如下：</p><div class="language-LocalStorage.gd line-numbers-mode" data-ext="LocalStorage.gd"><pre class="language-LocalStorage.gd"><code>extends Node

# 创建新的 ConfigFile 对象。
var config 

# 是否加密存储
var is_encrypted = false

# 文件路径
var file_path = &quot;user://storage.cfg&quot;

# 加密key
var password = &quot;secret_key&quot;


func _ready():
	_set_password()
	config = ConfigFile.new()

func _set_password():
    # 明文转成base64
	password = Marshalls.utf8_to_base64(password)
	# base64转明文
	# print(Marshalls.base64_to_utf8(password))
	

# 设置数据
# 参数:
#   - section: String, 小节名 
#	- key: String, 键
#	- value: String, 值
# 返回值:
#   PackedStringArray, 字符串数组
func set_value(section:String,  key:String, value:Variant ):
	config.set_value(section, key, value)
	# 设置完成后保存
	save_to_file() 


# 返回指定小节和键的当前值。如果该小节或键不存在，则该方法返回后备值 default。
# 参数:
#   - section: String, 小节名 
#	- key: String, 键
#	- default： Variant， 默认值
# 返回值:
#   Variant
func get_value(section:String,  key:String, default:Variant):
	return config.get_value(section,key,default)
	

# 将其保存到文件中（如果已存在则覆盖）
# 参数:
#   - path: String, 文件路径 
# 返回值:
#   void
func save_to_file(path:String = file_path):
	if is_encrypted :
		config.save_encrypted_pass(path,password)
	else:
		config.save(path)


# 从文件加载数据
# 参数:
#   - path: String, 文件路径 
# 返回值:
#   void
func load_data(path:String = file_path):
	var err
	if is_encrypted:
		err = config.load_encrypted_pass(path, password)
	else:
		err = config.load(path)
	if err != OK:
		print(&quot;[waring]: fail to read file : &quot; + path)


# 删除指定小节以及其中的所有键值对
# 参数:
#   - section: String, 小节名
# 返回值:
#   void
func erase_section(section:String):
	if config.has_section(section):
		config.erase_section(section)
		save_to_file()
	else:
		print(&quot;[waring]: no current section exists: &quot;, section)


# 删除小节中的指定键。
# 参数:
#   - section: String, 小节名 
#   - key: String, 键名
# 返回值:
#   void
func erase_section_key(section:String, key:String):
	if key in get_section_keys(section):
		config.erase_section_key(section, key)
		save_to_file()
	else:
		print(&quot;[waring]: no current key exists: &quot;, section,&quot; -&gt; &quot;, key)


# 返回指定小节中所有已定义键标识符的数组
# 参数:
#   - section: String, 小节名 
# 返回值:
#   PackedStringArray, 字符串数组 
func get_section_keys(section:String) -&gt; PackedStringArray:
	if config.has_section(section):
		return config.get_section_keys(section)
	else:
		print(&quot;[waring]: no current section exists: &quot;, section)
		return []


# 移除全部内容
# 参数:
#   无
# 返回值:
#   void
func clear():
	config.clear()
	save_to_file()
	

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h4><p>测试代码：</p><div class="language-angular2html line-numbers-mode" data-ext="angular2html"><pre class="language-angular2html"><code>func _test():
    LocalStorage.set_value(&quot;Player1&quot;,&quot;name&quot;,&quot;lisi&quot;)
    LocalStorage.set_value(&quot;Player1&quot;,&quot;age&quot;,&quot;20&quot;)

    LocalStorage.load_data()
    var value = LocalStorage.get_value(&quot;Player1&quot;,&quot;name&quot;,&quot;NULL&quot;)
    print(&quot;value ： &quot;,value)
    
    print(&quot;Player1 : &quot;,LocalStorage.get_section_keys(&quot;Section&quot;))

    LocalStorage.erase_section_key(&quot;Player1&quot;,&quot;age&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6);function x(L,w){const i=d("ExternalLinkIcon");return a(),t("div",null,[u,o,m,b,_,n("p",null,[n("a",g,[e("官网持久化用户数据文档"),s(i)])]),f,p,h,n("p",null,[e("用"),n("a",q,[e("ConfigFile"),s(i)]),S,e(" 将数据存储到"),y,e("文件中")]),k])}const N=l(c,[["render",x],["__file","(三)：持久化用户数据.html.vue"]]);export{N as default};
