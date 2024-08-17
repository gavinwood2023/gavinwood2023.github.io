import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as a,o as s,c as t,a as e,b as n,e as c,f as o}from"./app-cd2b6d67.js";const l="/assets/mongodb01-f698a002.png",r="/assets/mongodb02-2ab8ead3.png",u="/assets/mongodb03-d9dc0eb2.png",m={},g=o(`<p>1、查看Liunx系统信息</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cat /etc/os-release
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>确定系统和版本</p><figure><img src="`+l+'" alt="mongodb01" tabindex="0" loading="lazy"><figcaption>mongodb01</figcaption></figure>',4),p=e("br",null,null,-1),v={href:"https://www.mongodb.com/try/download/community",target:"_blank",rel:"noopener noreferrer"},b=o('<p>选择对应的系统和版本下载</p><figure><img src="'+r+`" alt="mongodb02" tabindex="0" loading="lazy"><figcaption>mongodb02</figcaption></figure><p>3、在linux系统<code>/usr/local/</code>目录下新建，<code>mongodb</code>文件夹，将下载的<code>mongodb-xxx-xxx.tgz</code>文件上传到此路径下</p><p>4、在<code>mongodb</code> 目录下创建<code>data目录</code>、<code>logs目录</code>和<code>conf目录</code>，以及<code>日志文件mongodb.log</code></p><p>5、解压<code>mongodb-xxx-xxx.tgz</code>文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>tar -zxvf mongodb-xxx-xxx.tgz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>6、将解压到的<code>mongodb-xxx-xxx</code>文件中的<code>所有子文件移动到/usr/local/mongodb</code>中</p><p>7、删除<code>mongodb-xxx-xxx</code>文件夹和<code>mongodb-xxx-xxx.tgz</code>文件（可以不删）</p><p>8、在<code>conf</code>目录下，新建<code>mongodb.conf</code>，内容如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#指定数据库路径
dbpath=/usr/local/mongodb/data
#指定MongoDB日志文件
logpath=/usr/local/mongodb/logs/mongodb.log
#使用追加的方式写日志
logappend=true
#端口号
port=27017
#暂时方便外网访问，外网所有ip都可以访问。
#正式上线，设置127.0.0.1只能本地访问
bind_ip=0.0.0.0
#以守护进程的方式运行MongoDB
fork=true
#启用用户验证，第一次先关闭，创建了管理员账号后再设置为true
auth=false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>9、设置环境变量，设置完后执行<code>source ~/.bashrc</code>刷新</p><figure><img src="`+u+`" alt="mongodb03" tabindex="0" loading="lazy"><figcaption>mongodb03</figcaption></figure><p>10、启动MongoDB</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mongod -f /usr/local/mongodb/conf/mongodb.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>11、关闭MongoDB</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mongod --shutdown -f /usr/local/mongodb/conf/mongodb.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>12、连接测试</p><p>未启用用户验证，MongoDB Compass 工具中 URI:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mongodb://your_ip:27017/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当前还没有启用用户验证，连接成功后，设置管理员账号，执行以下两条命令：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>use admin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>user: 管理员账号名字，一般为root或admin</p><p>pwd：管理员账号密码</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>db.createUser({
  user: &quot;your_name&quot;,
  pwd: &quot;your_password&quot;,
  roles: [{ role: &quot;userAdminAnyDatabase&quot;, db: &quot;admin&quot; }]
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>管理员账号设置成功后，可以修改<code>mongodb.conf</code>, 开启用户认证 <code>auth=true</code></p><p>修改<code>mongodb.conf</code>要关闭MongoDB, 再重新启动MongoDB</p><p>启用用户验证， MongoDB Compass 工具中 URI：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mongodb://your_username:your_password@your_ip:27017/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>13、补充<br> 一般阿里云，腾讯云，华为云，都有自己的安全组，在安全组里开放27107端口。</p>`,29);function x(_,f){const d=a("ExternalLinkIcon");return s(),t("div",null,[g,e("p",null,[n("2、下载MongoDB"),p,e("a",v,[n("官网地址"),c(d)])]),b])}const y=i(m,[["render",x],["__file","Linux 安装MongoDB.html.vue"]]);export{y as default};
