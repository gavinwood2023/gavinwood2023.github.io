import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as d,o as r,c,a as e,b as n,e as s,w as v,f as i}from"./app-cd2b6d67.js";const o="/assets/UiManager01-8c3012ec.png",u={},m=i(`<h4 id="需求" tabindex="-1"><a class="header-anchor" href="#需求" aria-hidden="true">#</a> 需求</h4><p>1、任何场景或界面，可以直接调用UiManager中的方法<br> 2、可以添加面板/场景，如果有_on_open方法则调用，并可传入任意参数<br> 3、可以移除面板/场景，如果有_on_close方法则调用<br> 4、可以切换场景</p><h4 id="实现" tabindex="-1"><a class="header-anchor" href="#实现" aria-hidden="true">#</a> 实现</h4><h5 id="_1、uipanelitem-gd-定义一个面板-场景格式-包含一个名字和路径" tabindex="-1"><a class="header-anchor" href="#_1、uipanelitem-gd-定义一个面板-场景格式-包含一个名字和路径" aria-hidden="true">#</a> 1、<code>UIPanelItem.gd</code> 定义一个面板/场景格式，包含一个名字和路径</h5><div class="language-UIPanelItem.gd line-numbers-mode" data-ext="UIPanelItem.gd"><pre class="language-UIPanelItem.gd"><code>class_name UIPanelItem

var name: String
var path:String

# 构造函数
func _init(p_name: String, p_path: String):
	name = p_name
	path = p_path

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),_={id:"_2、uimanager-gd-设置为单例自动加载-名字为uimanager-如何设置请参考-一-创建单例自动加载-md",tabindex:"-1"},b=e("a",{class:"header-anchor",href:"#_2、uimanager-gd-设置为单例自动加载-名字为uimanager-如何设置请参考-一-创建单例自动加载-md","aria-hidden":"true"},"#",-1),h=e("code",null,"UIManager.gd",-1),p=i(`<div class="language-UIManager.gd line-numbers-mode" data-ext="UIManager.gd"><pre class="language-UIManager.gd"><code>extends Node

var UIPanelItem = preload(&quot;res://UIPanelItem.gd&quot;)

# 当前场景
var current_scene = null

# 定义一个列表以跟踪显示的节点， key(name):value（path）格式
var show_node_list = {}

# 当节点第一次进入场景树时调用。
func _ready():
	var root = get_tree().root
	current_scene = root.get_child(root.get_child_count() - 1)


# 获取显示的节点列表
func get_show_node_list():
	return show_node_list


# 显示面板/场景
func show_panel(panel_item:UIPanelItem, params:Variant=null):
	if panel_item.name in show_node_list:
		print(&quot;[waring]: already add panel name: &quot;,panel_item.name,&quot;, path: &quot;,panel_item.path)
		return
	
	# 通过路径加载场景
	var scene = load(panel_item.path)
	# 实例化场景
	var node = scene.instantiate()
	# 添加节点
	add_child(node)
	# 将节点添加到显示的节点列表中
	show_node_list[panel_item.name] = node
	
	# 调用面板/场景的on_open函数
	if node.has_method(&quot;_on_open&quot;):
		if params:
			node._on_open(params)
		else:
			node._on_open()


# 关闭面板/场景
func close_panel(panel_name:String):
	# 按名称在显示的节点列表中查找节点
	var node = null
	if panel_name in show_node_list:
		node = show_node_list[panel_name];
	if node == null:
		print(&quot;[waring]: not found panel name: &quot;, panel_name)
		return
		
	## 调用面板/场景的_on_close函数
	if node.has_method(&quot;_on_close&quot;):
		node._on_close()
	
	# 从显示的节点列表中删除该节点
	show_node_list.erase(panel_name)
	# 从UIManager中删除节点
	node.queue_free()


# 切换场景
func replace_scene(panel_item:UIPanelItem):
	# This function will usually be called from a signal callback,
	# or some other function in the current scene.
	# Deleting the current scene at this point is
	# a bad idea, because it may still be executing code.
	# This will result in a crash or unexpected behavior.

	# The solution is to defer the load to a later time, when
	# we can be sure that no code from the current scene is running:

	call_deferred(&quot;_deferred_goto_scene&quot;, panel_item.path)

func _deferred_goto_scene(path):
	# It is now safe to remove the current scene.
	current_scene.free()

	# Load the new scene.
	var s = ResourceLoader.load(path)

	# Instance the new scene.
	current_scene = s.instantiate()

	# Add it to the active scene, as child of root.
	get_tree().root.add_child(current_scene)

	# Optionally, to make it compatible with the SceneTree.change_scene_to_file() API.
	get_tree().current_scene = current_scene

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3、使用" tabindex="-1"><a class="header-anchor" href="#_3、使用" aria-hidden="true">#</a> 3、使用</h4><h5 id="_1、新建test01-tscn和test02-tscn场景" tabindex="-1"><a class="header-anchor" href="#_1、新建test01-tscn和test02-tscn场景" aria-hidden="true">#</a> 1、新建Test01.tscn和Test02.tscn场景</h5><p>Test01.tscn<br><img src="`+o+'" alt="UiManager01.png" loading="lazy"></p><p>Test02.tscn</p><h5 id="_2、新建test01-gd和test02-gd脚本-分别绑在对应场景的根节点上" tabindex="-1"><a class="header-anchor" href="#_2、新建test01-gd和test02-gd脚本-分别绑在对应场景的根节点上" aria-hidden="true">#</a> 2、新建Test01.gd和Test02.gd脚本，分别绑在对应场景的根节点上</h5><h5 id="_3、使用-1" tabindex="-1"><a class="header-anchor" href="#_3、使用-1" aria-hidden="true">#</a> 3、使用</h5>',7),g={id:"test01-gd",tabindex:"-1"},f=e("a",{class:"header-anchor",href:"#test01-gd","aria-hidden":"true"},"#",-1),q={href:"http://Test01.gd",target:"_blank",rel:"noopener noreferrer"},x=i(`<p>1）、<code>open Test02 panel</code> 按钮事件中的代码</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var params = {&quot;a&quot;:&quot;v_a&quot;,&quot;b&quot;:&quot;v_b&quot;}
params.c = &quot;v_c&quot;
var panel_item = UIPanelItem.new(&quot;Test02&quot;, &quot;res://Test02.tscn&quot;)
# 无参
# UiManager.show_panel(panel_item)
# 传参
UiManager.show_panel(panel_item, params) 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2）、<code>close Test02 panel</code> 按钮事件中的代码</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>UiManager.close_panel(&quot;Test02&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>3、<code>replace Test02 Scene</code> 按钮事件中的代码</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var panel_item = UIPanelItem.new(&quot;Test02&quot;, &quot;res://Test02.tscn&quot;)
UiManager.replace_scene(panel_item)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,6),I={id:"test02-gd",tabindex:"-1"},U=e("a",{class:"header-anchor",href:"#test02-gd","aria-hidden":"true"},"#",-1),w={href:"http://Test02.gd",target:"_blank",rel:"noopener noreferrer"},T=i(`<p>_on_open：打开面板的时候调用，接收参数则可以定义为 <code>func _on_open(params)</code>，不接受参数定义为 <code>func _on_open()</code><br> _on_close：关闭面板的时候调用</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>func _on_open():
	print(&quot;Test02 on_open&quot;)
	#if params != null:
		#print(params)
		#print(params[&quot;a&quot;], &quot;, &quot;, params.a)
		#print(params.c)
	
func _on_close():
	print(&quot;Test02 on_close&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function E(B,M){const t=d("RouterLink"),a=d("ExternalLinkIcon");return r(),c("div",null,[m,e("h5",_,[b,n(" 2、"),h,n(" 设置为单例自动加载，名字为UiManager，"),s(t,{to:"/blog/Godot_v4.2.1/%E5%AE%9E%E8%B7%B5%E7%AF%87/(%E4%B8%80)%EF%BC%9A%E5%88%9B%E5%BB%BA%E5%8D%95%E4%BE%8B%E8%87%AA%E5%8A%A8%E5%8A%A0%E8%BD%BD.html"},{default:v(()=>[n("如何设置请参考 (一)：创建单例自动加载.md")]),_:1})]),p,e("h6",g,[f,n(),e("a",q,[n("Test01.gd"),s(a)])]),x,e("h6",I,[U,n(),e("a",w,[n("Test02.gd"),s(a)])]),T])}const k=l(u,[["render",E],["__file","(二)：UI管理器.html.vue"]]);export{k as default};
