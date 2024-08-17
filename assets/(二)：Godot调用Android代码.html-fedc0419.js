import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as a,o as t,c as r,a as e,b as i,e as d,f as s}from"./app-cd2b6d67.js";const o="/assets/android_plugin01-23a3c7bc.png",u="/assets/android_plugin02-396d0731.png",c="/assets/android_plugin04-fdcf7132.png",v="/assets/android_plugin03-6ce01ee2.png",m={},p=e("p",null,[i("实现内容："),e("br"),i(" 点击按钮，调用anroid层面代码，弹出一个android层的hello world提示")],-1),g=e("p",null,"1、下载Godot Android插件示例代码",-1),b={href:"https://github.com/m4gr3d/Godot-Android-Plugin-Template",target:"_blank",rel:"noopener noreferrer"},_={href:"https://docs.godotengine.org/zh-cn/4.x/tutorials/platform/android/android_plugin.html",target:"_blank",rel:"noopener noreferrer"},x=s('<p>2、导入到Android Studio</p><figure><img src="'+o+`" alt="android_plugin01" tabindex="0" loading="lazy"><figcaption>android_plugin01</figcaption></figure><p>3、修改<code>build.gradle.kts(Module:plugin)</code>中<code>pluginName</code>和<code>pluginPackageName</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// TODO: Update value to your plugin&#39;s name.
val pluginName = &quot;GodotTest&quot;

// TODO: Update value to match your plugin&#39;s package name.
val pluginPackageName = &quot;org.godotengine.plugin.android.template&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>4、修改<code>BuildConfig.java</code>中的<code>GODOT_PLUGIN_NAME</code>和<code>LIBRARY_PACKAGE_NAME</code>等</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ublic final class BuildConfig {
    public static final boolean DEBUG = Boolean.parseBoolean(&quot;true&quot;);
    public static final String LIBRARY_PACKAGE_NAME = &quot;org.godotengine.plugin.android.template&quot;;
    public static final String BUILD_TYPE = &quot;debug&quot;;
    // Field from default config.
    public static final String GODOT_PLUGIN_NAME = &quot;GodotTest&quot;;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>5、修改<code>GodotAndroidPlugin.java代码</code></p><figure><img src="`+u+`" alt="android_plugin02" tabindex="0" loading="lazy"><figcaption>android_plugin02</figcaption></figure><p>修改第一行的<code>package</code></p><p>底下的<code>helloWorld</code>方法是，GDScript中要调用的。可根据自身需求实现其它方法。</p><p>6、修改<code>Godot-Android-Plugin-Template-main/plugin/export_scripts_template/plugin.cfg</code><br> 包括：插件名字，插件描述，作者，版本，脚本</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[plugin]

name=&quot;GodotTest&quot;
description=&quot;Template used to build a Godot Android plugin&quot;
author=&quot;Fredia Huya-Kouadio&quot;
version=&quot;0.0&quot;
script=&quot;export_plugin.gd&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>7、修改<code>Godot-Android-Plugin-Template-main/plugin/export_scripts_template/export_plugin.gd</code><br> 主要是<code>_plugin_name</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@tool
extends EditorPlugin

# A class member to hold the editor export plugin during its lifecycle.
var export_plugin : AndroidExportPlugin

func _enter_tree():
	# Initialization of the plugin goes here.
	export_plugin = AndroidExportPlugin.new()
	add_export_plugin(export_plugin)


func _exit_tree():
	# Clean-up of the plugin goes here.
	remove_export_plugin(export_plugin)
	export_plugin = null


class AndroidExportPlugin extends EditorExportPlugin:
	# TODO: Update to your plugin&#39;s name.
	var _plugin_name = &quot;GodotTest&quot;

	func _supports_platform(platform):
		if platform is EditorExportPlatformAndroid:
			return true
		return false

	func _get_android_libraries(platform, debug):
		if debug:
			return PackedStringArray([_plugin_name + &quot;/bin/debug/&quot; + _plugin_name + &quot;-debug.aar&quot;])
		else:
			return PackedStringArray([_plugin_name + &quot;/bin/release/&quot; + _plugin_name + &quot;-release.aar&quot;])

	func _get_name():
		return _plugin_name
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>8、在<code>Godot-Android-Plugin-Template-main</code>目录下执行</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>./gradlew assemble
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>9、在Godot编辑器中打开demo项目<br><code>Godot-Android-Plugin-Template-main/plugin/demo</code><br><code>main.gd</code>代码如下，包括插件名字和调用的android代码的方法名<br><img src="`+c+'" alt="android_plugin04" loading="lazy"></p><p>10、选择<code>项目</code>-&gt;<code>安装Android构建模板</code></p><p>11、将插件下的<code>addone</code>目录，复制到项目目录下，选择<code>项目</code>-&gt;<code>项目设置</code>-&gt;<code>插件</code>-&gt;<code>启用</code><br><img src="'+v+`" alt="android_plugin03" loading="lazy"></p><p>12、打包测试，<br><code>项目</code>-&gt;<code>导出</code>-&gt;<code>添加Android</code>-&gt;勾选<code>使用Gradle构建</code></p><p>13、解决apk包体问题：</p><p>打开<code>android/build/AndroidManifest.xml</code>,在<code>application</code>标签内添加<code>android:extractNativeLibs=&quot;true&quot;</code></p><p>14、补充<code>GodotAndroidPlugin</code>代码，获取手机MCC<br><s>打包时需要<code>Read Phone State</code>权限</s></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    @UsedByGodot
    private fun showToast(str: String) {
        runOnUiThread {
            Toast.makeText(activity, str, Toast.LENGTH_LONG).show()
            Log.v(pluginName, str)
        }
    }

    @UsedByGodot
    private fun getMcc(): Int {
        var mcc = -1
        val telephonyManager = activity?.getSystemService(Context.TELEPHONY_SERVICE) as TelephonyManager
        val networkOperator = telephonyManager.networkOperator
        if (!TextUtils.isEmpty(networkOperator)) {
            mcc = networkOperator.substring(0, 3).toInt()
        }
        Log.i(&quot;NetworkOperatorMCC:&quot;, &quot;&quot; + mcc)
        return mcc
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>跳转到网页</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@UsedByGodot
private fun openLink(url: String){
    runOnUiThread {
        val intent = Intent(Intent.ACTION_VIEW)
        intent.data = Uri.parse(url)
        activity?.startActivity(intent)
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>复制文本到粘贴板；从粘贴板获取文本</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@UsedByGodot
private fun copyStr2Clipboard(str: String){
    var clipManager = activity?.getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager;
    val myClip = ClipData.newPlainText(&quot;text&quot;, str)
    clipManager.setPrimaryClip(myClip)
}

@UsedByGodot
private fun getStr4Clipboard(): String{
    var result = &quot;&quot;;
    var clipboardManager = activity?.getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager;
    // 检查剪贴板是否有内容
    if (clipboardManager.hasPrimaryClip()) {
        // 获取剪贴板的内容
        val clip = clipboardManager.primaryClip
        // 确保剪贴板内容不为空且有至少一条剪贴板内容
        if (clip != null &amp;&amp; clip.itemCount &gt; 0) {
            // 获取第一条剪贴板内容
            val clipItem = clip.getItemAt(0)
            // 将剪贴板内容转换为字符串
            val clipText = clipItem.text?.toString()
            // 判断剪贴板内容是否为空
            if (clipText.isNullOrEmpty()) {
                println(&quot;剪贴板内容为空&quot;)
            } else {
                result = clipText;
            }
        } else {
            println(&quot;剪贴板为空或无内容&quot;)
        }
    }
    return result;
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,28);function f(q,h){const n=a("ExternalLinkIcon");return t(),r("div",null,[p,g,e("p",null,[e("a",b,[i("插件示例代码地址"),d(n)])]),e("p",null,[e("a",_,[i("官方说明文档"),d(n)])]),x])}const G=l(m,[["render",f],["__file","(二)：Godot调用Android代码.html.vue"]]);export{G as default};
