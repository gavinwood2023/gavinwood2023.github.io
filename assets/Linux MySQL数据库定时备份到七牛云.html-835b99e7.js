import{_ as d}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o as c,c as s,a as e,b as l,e as r,f as n}from"./app-cd2b6d67.js";const o="/assets/qiniuyun01-15f381ea.png",u={},t=n(`<h3 id="需求" tabindex="-1"><a class="header-anchor" href="#需求" aria-hidden="true">#</a> 需求</h3><p>每天凌晨3点，备份数据库到七牛云</p><h3 id="实现" tabindex="-1"><a class="header-anchor" href="#实现" aria-hidden="true">#</a> 实现</h3><h4 id="一、编写数据备份脚本-上传到七牛云-usr-local-bin-backup-mysql-sh-位置可随意-并设置执行权限chmod-x-backup-mysql-sh" tabindex="-1"><a class="header-anchor" href="#一、编写数据备份脚本-上传到七牛云-usr-local-bin-backup-mysql-sh-位置可随意-并设置执行权限chmod-x-backup-mysql-sh" aria-hidden="true">#</a> 一、编写数据备份脚本，上传到七牛云 <code>/usr/local/bin/backup_mysql.sh</code>，位置可随意，并设置执行权限<code>chmod +x backup_mysql.sh</code></h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#!/bin/bash

# MySQL 配置
DB_USER=&quot;数据库用户名&quot;
DB_PASSWORD=&quot;数据库密码&quot;
DB_NAME=&quot;数据库名字&quot;
BACKUP_DIR=&quot;本机备份地址&quot;
DATE=$(date +%F)
BACKUP_FILE=&quot;$BACKUP_DIR/\${DB_NAME}_$DATE.sql.gz&quot;


# 七牛云配置
QINIU_BUCKET_NAME=&quot;your_bucket_name&quot;


# 创建备份目录（如果不存在）
mkdir -p $BACKUP_DIR

# 备份 MySQL 数据库
mysqldump -u $DB_USER -p$DB_PASSWORD $DB_NAME | gzip &gt; $BACKUP_FILE


# 上传到七牛云
# 注意：你需要安装并配置七牛云的命令行工具 \`qshell\` 
# --overwrite 表示覆盖上传

# 使用 qshell 工具
qshell rput $QINIU_BUCKET_NAME &quot;七牛云桶内文件夹路径/\${DB_NAME}_$DATE.sql.gz&quot; $BACKUP_FILE --overwrite

# 处理错误和清理本地文件（可选）
if [ $? -eq 0 ]; then
  echo &quot;Backup and upload successful&quot;
  rm -f $BACKUP_FILE
else
  echo &quot;Backup or upload failed&quot;
fi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="二、设置定时任务" tabindex="-1"><a class="header-anchor" href="#二、设置定时任务" aria-hidden="true">#</a> 二、设置定时任务</h4><p>使用 <code>cron</code> 设置每天凌晨3点执行备份脚本，可通过 <code>crontab -e</code> 命令添加；也可通过修改文件添加，文件位置 <code>/var/spool/cron/crontabs</code></p><p><code>crontab -e</code></p><p>添加以下行来调度备份任务：</p><p><code>0 3 * * * /usr/local/bin backup_mysql.sh</code></p><p>1）、/usr/local/bin： 脚本文件所在的路径</p><p>查看<code>crontab</code>设置:</p><p><code>crontab -l</code></p><h4 id="三、配置七牛云上传" tabindex="-1"><a class="header-anchor" href="#三、配置七牛云上传" aria-hidden="true">#</a> 三、配置七牛云上传</h4><h5 id="_1、安装-qshell-工具" tabindex="-1"><a class="header-anchor" href="#_1、安装-qshell-工具" aria-hidden="true">#</a> 1、安装 <code>qshell</code> 工具</h5>`,15),h={href:"https://developer.qiniu.com/kodo/1302/qshell",target:"_blank",rel:"noopener noreferrer"},_=n('<p>通过 <code>lscpu</code> 查看 <code>Architecture</code> 选择合适的版本，这里下载的是 <code>qshell-v2.13.0-linux-386.tar.gz</code></p><figure><img src="'+o+'" alt="qiniuyun01.png" tabindex="0" loading="lazy"><figcaption>qiniuyun01.png</figcaption></figure><h5 id="_2、下载后将-qshell-v2-13-0-linux-386-tar-gz-上传至服务器-usr-local-bin-目录下" tabindex="-1"><a class="header-anchor" href="#_2、下载后将-qshell-v2-13-0-linux-386-tar-gz-上传至服务器-usr-local-bin-目录下" aria-hidden="true">#</a> 2、下载后将 <code>qshell-v2.13.0-linux-386.tar.gz</code> 上传至服务器 <code>/usr/local/bin/</code> 目录下</h5><h5 id="_3、解压缩" tabindex="-1"><a class="header-anchor" href="#_3、解压缩" aria-hidden="true">#</a> 3、解压缩</h5><p><code>tar -zxvf qshell-v2.13.0-linux-386.tar.gz</code></p><h5 id="_4、配置-qshell-工具-输入你的七牛云账户信息" tabindex="-1"><a class="header-anchor" href="#_4、配置-qshell-工具-输入你的七牛云账户信息" aria-hidden="true">#</a> 4、配置 <code>qshell</code> 工具，输入你的七牛云账户信息：</h5><p><code>qshell account your_access_key your_secret_key your_name</code></p><p>1）、your_access_key：访问KEY，从<code>个人中心</code>-&gt;<code>秘钥管理</code>里获取，没有的话创建秘钥。</p><p>2）、your_secret_key： 访问秘钥，从<code>个人中心</code>-&gt;<code>秘钥管理</code>里获取。</p><p>3）、your_name：七牛云账户名</p><h5 id="_5、创建一个新的-qshell-配置文件-并将其上传配置为你的桶" tabindex="-1"><a class="header-anchor" href="#_5、创建一个新的-qshell-配置文件-并将其上传配置为你的桶" aria-hidden="true">#</a> 5、创建一个新的 <code>qshell</code> 配置文件，并将其上传配置为你的桶：</h5><p><code>qshell bucket your_bucket_name http://your_bucket_domain/</code></p><p>1）、your_bucket_name： 桶名字</p><p>2）、your_bucket_domain： 桶外链域名</p><h5 id="_6、使用-qshell-工具的-rput-命令将文件上传到七牛云。" tabindex="-1"><a class="header-anchor" href="#_6、使用-qshell-工具的-rput-命令将文件上传到七牛云。" aria-hidden="true">#</a> 6、使用 <code>qshell</code> 工具的 <code>rput</code> 命令将文件上传到七牛云。</h5><h4 id="四、验证备份和上传" tabindex="-1"><a class="header-anchor" href="#四、验证备份和上传" aria-hidden="true">#</a> 四、验证备份和上传</h4><h5 id="运行脚本以确保备份和上传过程正常工作" tabindex="-1"><a class="header-anchor" href="#运行脚本以确保备份和上传过程正常工作" aria-hidden="true">#</a> 运行脚本以确保备份和上传过程正常工作：</h5><p><code>backup_mysql.sh</code></p><p>正常的话，已经备份到七牛云对应的桶里。</p>',19);function v(b,p){const a=i("ExternalLinkIcon");return c(),s("div",null,[t,e("p",null,[e("a",h,[l("下载地址"),r(a)])]),_])}const f=d(u,[["render",v],["__file","Linux MySQL数据库定时备份到七牛云.html.vue"]]);export{f as default};
