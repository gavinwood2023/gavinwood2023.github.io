---
title: Linux 安装 MongoDB
order: 2
icon: pen-to-square
# 一个页面可以有多个分类
category:
  - linux
tag:
  - linux
article: true
timeline: true
dir:
  index: true
  order: 1
---

1、查看Liunx系统信息
```
cat /etc/os-release
```
确定系统和版本

![mongodb01](../../images/linux/mongodb01.png)

2、下载MongoDB
[官网地址](https://www.mongodb.com/try/download/community)

选择对应的系统和版本下载

![mongodb02](../../images/linux/mongodb02.png)

3、在linux系统`/usr/local/`目录下新建，`mongodb`文件夹，将下载的`mongodb-xxx-xxx.tgz`文件上传到此路径下

4、在`mongodb` 目录下创建`data目录`、`logs目录`和`conf目录`，以及`日志文件mongodb.log`

5、解压`mongodb-xxx-xxx.tgz`文件
```
tar -zxvf mongodb-xxx-xxx.tgz
```

6、将解压到的`mongodb-xxx-xxx`文件中的`所有子文件移动到/usr/local/mongodb`中

7、删除`mongodb-xxx-xxx`文件夹和`mongodb-xxx-xxx.tgz`文件（可以不删）

8、在`conf`目录下，新建`mongodb.conf`，内容如下
```
#指定数据库路径
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
```

9、设置环境变量，设置完后执行`source ~/.bashrc`刷新

![mongodb03](../../images/linux/mongodb03.png)

10、启动MongoDB
```
mongod -f /usr/local/mongodb/conf/mongodb.conf
```
11、关闭MongoDB
```
mongod --shutdown -f /usr/local/mongodb/conf/mongodb.conf
```

12、连接测试

未启用用户验证，MongoDB Compass 工具中 URI:
```
mongodb://your_ip:27017/
```
当前还没有启用用户验证，连接成功后，设置管理员账号，执行以下两条命令：
```
use admin
```
user: 管理员账号名字，一般为root或admin

pwd：管理员账号密码
```
db.createUser({
  user: "your_name",
  pwd: "your_password",
  roles: [{ role: "userAdminAnyDatabase", db: "admin" }]
})
```

管理员账号设置成功后，可以修改`mongodb.conf`, 开启用户认证 `auth=true`

修改`mongodb.conf`要关闭MongoDB, 再重新启动MongoDB

启用用户验证， MongoDB Compass 工具中 URI：
```
mongodb://your_username:your_password@your_ip:27017/
```

13、补充
一般阿里云，腾讯云，华为云，都有自己的安全组，在安全组里开放27107端口。

